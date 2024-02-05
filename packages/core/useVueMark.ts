import type { Definition, FootnoteDefinition, List, Root, RootContent, Text } from 'mdast'
import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import {
  computed,
  defineComponent,
  h,
  provide,
  shallowRef,
  toValue,
  triggerRef,
  watch,
} from 'vue'
import type {
  Component,
  MaybeRefOrGetter,
  ShallowRef,
  VNode,
} from 'vue'
import { trimLines } from 'trim-lines'
import { normalizeUri } from 'micromark-util-sanitize-uri'
import type {
  CustomDirective,
  FootnoteDefinitionMap,
  PresetConfig,
} from './types'
import { PRESETS } from './presets'
import { getNodeTextContent, isCustomBlock, isParent, listItemLoose, listLoose } from './utils'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkDirective)
  .freeze()

export interface UseVueMarkOptions {
  customPresets?: Partial<PresetConfig>
  globalPrefix?: string
  dealWithTextNodes?: boolean
  debug?: boolean
  slugify?: (text: string) => string
}

export interface VueMarkToc {
  /**
   * Heading level
   */
  level: 1 | 2 | 3 | 4 | 5 | 6
  /**
   * Heading title
   */
  title: string
  /**
   * Heading slug
   */
  slug: string
}

export interface UseVueMarkReturn {
  toc: ShallowRef<VueMarkToc[]>
  hasFootnote: ShallowRef<boolean>
  frontmatter: ShallowRef<string>
  VueMarkContent: Component
  FootnoteContent: Component
}

export function useVueMark(
  value: MaybeRefOrGetter<string>,
  options?: UseVueMarkOptions,
): UseVueMarkReturn {
  const {
    customPresets = {},
    globalPrefix = 'vuemark',
    dealWithTextNodes = true,
    debug = false,
    slugify,
  }
    = options ?? {}

  function debugPrintLn(...args: any[]) {
    if (!debug) return
    // eslint-disable-next-line no-console
    console.log('%c VueMark ', 'color:white;background:#65B587;padding:3px 0;margin-bottom:5px;font-weight: bold;', ...args)
  }

  const _processStartTimes = new Map<string, number>()
  function startTimeRecord(key: string) {
    if (!debug) return
    _processStartTimes.set(key, performance.now())
  }

  function endTimeRecord(key: string) {
    if (!debug) return
    const startTime = _processStartTimes.get(key)
    if (startTime === undefined) {
      return
    }
    const endTime = performance.now()
    const duration = endTime - startTime
    debugPrintLn(`${key} took ${duration}ms`)
  }

  const computedValue = computed(() => toValue(value))
  const ast = computed(() => processor.parse(computedValue.value))

  const frontmatter = shallowRef('')
  const toc: ShallowRef<VueMarkToc[]> = shallowRef([])
  const hasFootnote = shallowRef(false)

  const tocSlugCountMap: Map<string, number> = new Map()
  const definitions: Map<string, Definition> = new Map()
  const footnoteDefinitions: ShallowRef<FootnoteDefinitionMap> = shallowRef(new Map())
  let footnoteDefinitionCount = 0

  const setDefinition = (node: Definition) => {
    definitions.set(node.identifier, node)
  }

  const setFootnoteDefinition = (
    node: FootnoteDefinition,
    render: () => VNode | string | null | (VNode | string | null)[],
  ) => {
    footnoteDefinitions.value.set(node.identifier, {
      node,
      index: ++footnoteDefinitionCount,
      render,
    })
  }

  const getRootComponent = (
    node: RootContent | CustomDirective,
    index?: number,
    inFootnote = false,
    context?: any,
  ): VNode | string | null => {
    if (node.type === 'html') {
      node = {
        ...node,
        type: 'text',
      } as Text
    }
    if (node.type === 'text' && !dealWithTextNodes) {
      return node.value
    }

    let element: string | Component | null

    if (isCustomBlock(node)) {
      element = customPresets[`directive_${node.name}`]
      || PRESETS[`directive_${node.name}`]

      if (element === undefined) {
        console.error(new Error(`No component found for directive name: ${node.name}`))
        return null
      }
    } else {
      element = customPresets[<keyof PresetConfig>node.type]
      || PRESETS[<keyof PresetConfig>node.type]

      if (element === undefined) {
        console.error(new Error(`No component found for node type: ${node.type}`))
        return null
      }
    }

    if (element === null) {
      return null
    }

    if (typeof element === 'string') {
      if (node.type === 'heading') {
        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote))
        const title = getNodeTextContent(node)
        let slug = slugify ? slugify(title) : title
        const count = tocSlugCountMap.get(slug) ?? 0
        tocSlugCountMap.set(slug, count + 1)
        if (count > 0) {
          slug += `-${count}`
        }
        toc.value.push({ level: node.depth, title, slug })
        return h(element, children)
      }
      if (isParent(node)) {
        return h(
          element,
          node.children.map((child, i) => getRootComponent(child, i, inFootnote)),
        )
      }
      return h(element)
    }

    switch (node.type) {
      case 'yaml':
      case 'definition':
      case 'footnoteDefinition': {
        return null
      }
      case 'paragraph':
      case 'delete':
      case 'blockquote':
      case 'strong':
      case 'emphasis': {
        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote))
        return h(element, () => children)
      }
      case 'break':
      case 'thematicBreak': {
        return h(element)
      }
      case 'text': {
        return h(element, { content: trimLines(node.value) })
      }
      case 'inlineCode': {
        return h(element, { code: node.value.replace(/\r?\n|\r/g, ' ') })
      }
      case 'code': {
        return h(element, { code: node.value ? `${node.value}\n` : '', lang: node.lang ?? undefined, meta: node.meta ?? undefined })
      }
      case 'link': {
        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote))
        return h(element, { href: normalizeUri(node.url || ''), title: node.title ?? undefined }, () => children)
      }
      case 'list': {
        const hasTaskItem = node.children.some(child => child.type === 'listItem' && typeof child.checked === 'boolean')
        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote, node))
        return h(element, { ordered: node.ordered ?? undefined, start: node.start ?? undefined, spread: node.spread ?? undefined, hasTaskItem }, () =>
          children)
      }
      case 'listItem': {
        const parent = context as List
        const loose = parent ? listLoose(parent) : listItemLoose(node)
        const childNodes: RootContent[] = []
        node.children.forEach((child) => {
          if (child.type === 'paragraph' && !loose) {
            childNodes.push(...child.children)
          } else {
            childNodes.push(child)
          }
        })

        const children = childNodes.map((child, i) => getRootComponent(child, i, inFootnote))

        return h(element, {
          checked: node.checked ?? undefined,
          spread: node.spread ?? undefined,
        }, () => children)
      }
      case 'image': {
        return h(element, { src: normalizeUri(node.url || ''), alt: node.alt ?? undefined, title: node.title ?? undefined })
      }
      case 'imageReference': {
        const def = definitions.get(node.identifier)
        if (!def) {
          console.error(new Error(`No definition found for identifier: ${node.identifier}`))
          return null
        }
        return h(element, { src: normalizeUri(def.url || ''), title: def.title ?? undefined, alt: node.alt ?? undefined })
      }
      case 'linkReference': {
        const def = definitions.get(node.identifier)
        if (!def) {
          console.error(new Error(`No definition found for identifier: ${node.identifier}`))
          return null
        }
        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote))
        return h(element, { href: normalizeUri(def.url || ''), title: def.title ?? undefined }, () => children)
      }
      case 'heading': {
        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote))
        const title = getNodeTextContent(node)
        if (inFootnote) {
          // 脚注内部的标题不提供 slug，不包含在 toc 中
          return h(element, { level: node.depth }, () => children)
        }
        let slug = slugify ? slugify(title) : title
        const count = tocSlugCountMap.get(slug) ?? 0
        tocSlugCountMap.set(slug, count + 1)
        if (count > 0) {
          slug += `-${count}`
        }
        toc.value.push({ level: node.depth, title, slug })
        return h(element, { level: node.depth, slug }, () => children)
      }
      case 'table': {
        const aligns = node.align ?? []
        const head = getRootComponent(node.children[0], 0, inFootnote, { aligns, isHead: true })
        const body = node.children.slice(1).map((child, i) =>
          getRootComponent(child, i + 1, inFootnote, { aligns, isHead: false }),
        )
        return h(
          element,
          null,
          {
            head: () => head,
            body: () => body,
          },
        )
      }
      case 'tableRow': {
        if (!context) return null
        const { aligns, isHead } = context

        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote, { align: aligns[i], isHead }))

        return h(
          element,
          () => children,
        )
      }
      case 'tableCell': {
        if (!context) return null
        const { align, isHead } = context

        const children = node.children.map((child, i) => getRootComponent(child, i, inFootnote))

        return h(element, { align, isHead }, () => children)
      }
      case 'footnoteReference': {
        const def = footnoteDefinitions.value.get(node.identifier)
        if (!def) {
          console.error(new Error(`No footnote definition found for identifier: ${node.identifier}`))
          return null
        }
        return h(element, { index: def.index })
      }
      default: {
        if (isParent(node)) {
          const children = node.children
          return h(element, { item: node, index }, () => children.map((child, i) => getRootComponent(child, i, inFootnote)))
        }
        return h(element, { item: node, index })
      }
    }
  }

  const markVNodes = shallowRef(processMarkVNodes(ast.value))

  function processMarkVNodes(root: Root) {
    debugPrintLn('Start processing with root:', root)
    startTimeRecord('processMarkVNodes')

    toc.value.length = 0
    definitions.clear()
    tocSlugCountMap.clear()
    footnoteDefinitionCount = 0
    hasFootnote.value = false
    frontmatter.value = ''
    footnoteDefinitions.value.clear()

    const tempMarkVNodes: (VNode | string | null)[] = []
    const deferred: [RootContent, number][] = []

    startTimeRecord('processMarkVNodes:collectReferences')
    root.children.forEach((node, index) => {
      if (node.type === 'yaml') {
        frontmatter.value = node.value
        return
      }

      if (node.type === 'definition') {
        setDefinition(node)
        return
      }

      if (node.type === 'footnoteDefinition') {
        hasFootnote.value = true

        setFootnoteDefinition(node, () => node.children.map((child, i) => getRootComponent(child, i, true)))
        return
      }

      deferred.push([node, index])
    })
    endTimeRecord('processMarkVNodes:collectReferences')

    startTimeRecord('processMarkVNodes:prepareVNodes')
    deferred.forEach(([node, index]) => {
      tempMarkVNodes.push(getRootComponent(node, index, false))
    })
    endTimeRecord('processMarkVNodes:prepareVNodes')

    triggerRef(toc)
    triggerRef(footnoteDefinitions)

    debugPrintLn('toc:', toc.value, '\nhasFootnote:', hasFootnote.value, '\nfrontmatter:', frontmatter.value)

    endTimeRecord('processMarkVNodes')
    return tempMarkVNodes
  }

  watch(ast, (newValue) => {
    markVNodes.value = processMarkVNodes(newValue)
  })

  const VueMarkContent: Component = defineComponent({
    name: 'VueMarkContent',
    setup() {
      provide('globalPrefix', globalPrefix)
      return () => h('div', markVNodes.value)
    },
  })

  const FootnoteContent: Component = defineComponent({
    name: 'FootnoteContent',
    setup() {
      provide('globalPrefix', globalPrefix)
      return () => {
        const element
          = customPresets.footnoteContainer ?? PRESETS.footnoteContainer

        if (element === null) {
          return null
        }

        if (typeof element === 'string') {
          return h(element, Object.values(footnoteDefinitions.value).map(item => item.render()))
        }

        return h(element, {
          footnoteDefinitions,
          globalPrefix,
        })
      }
    },
  })

  return {
    toc,
    hasFootnote,
    frontmatter,
    VueMarkContent,
    FootnoteContent,
  }
}
