import type { Definition, FootnoteDefinition, List, Root, RootContent } from 'mdast'
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
  watch,
  watchEffect,
} from 'vue'
import type {
  Component,
  ComputedRef,
  MaybeRefOrGetter,
  ShallowRef,
  VNode,
} from 'vue'
import { trimLines } from 'trim-lines'
import { normalizeUri } from 'micromark-util-sanitize-uri'
import type {
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
}

export interface VueMarkToc {
  level: number
  title: string
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
  const { customPresets = {} as PresetConfig, globalPrefix = 'vuemark', dealWithTextNodes = true }
    = options ?? {}
  const computedValue = computed(() => toValue(value))
  const ast = computed(() => processor.parse(computedValue.value))

  watchEffect(() => {
    // eslint-disable-next-line no-console
    console.log(ast.value)
  })

  const frontmatter = shallowRef('')
  const toc: ComputedRef<VueMarkToc[]> = computed(() => {
    const toc: VueMarkToc[] = []

    ast.value.children.forEach((node) => {
      if (node.type === 'heading') {
        const level = node.depth
        const title = getNodeTextContent(node)

        const item: VueMarkToc = {
          level,
          title,
        }

        toc.push(item)
      }
    })

    return toc
  })
  let definitions: Record<string, Definition> = {}
  let footnoteDefinitions: FootnoteDefinitionMap = {}
  const hasFootnote = shallowRef(false)

  const setDefinition = (node: Definition) => {
    definitions[node.identifier] = node
  }

  const setFootnoteDefinition = (
    node: FootnoteDefinition,
    render: () => VNode | string | null | (VNode | string | null)[],
  ) => {
    footnoteDefinitions[node.identifier] = {
      node,
      index: Object.keys(footnoteDefinitions).length,
      render,
    }
  }

  const getRootComponent = (
    node: RootContent,
    index?: number,
    context?: any,
  ): VNode | string | null => {
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
      if (isParent(node)) {
        return h(
          element,
          node.children.map(getRootComponent),
        )
      }
      return h(element)
    }

    switch (node.type) {
      case 'paragraph':
      case 'delete':
      case 'blockquote':
      case 'strong':
      case 'emphasis': {
        return h(element, () => node.children.map(getRootComponent))
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
        return h(element, { href: normalizeUri(node.url || ''), title: node.title ?? undefined }, () =>
          node.children.map(getRootComponent))
      }
      case 'list': {
        const hasTaskItem = node.children.some(child => child.type === 'listItem' && typeof child.checked === 'boolean')
        return h(element, { ordered: node.ordered ?? undefined, start: node.start ?? undefined, spread: node.spread ?? undefined, hasTaskItem }, () =>
          node.children.map((child, i) => getRootComponent(child, i, node)))
      }
      case 'listItem': {
        const parent = context as List
        const loose = parent ? listLoose(parent) : listItemLoose(node)
        const children: RootContent[] = []
        node.children.forEach((child) => {
          if (child.type === 'paragraph' && !loose) {
            children.push(...child.children)
          } else {
            children.push(child)
          }
        })
        return h(element, {
          checked: node.checked ?? undefined,
          spread: node.spread ?? undefined,
        }, () => children.map(getRootComponent))
      }
      case 'image': {
        return h(element, { src: normalizeUri(node.url || ''), alt: node.alt ?? undefined, title: node.title ?? undefined })
      }
      case 'imageReference': {
        const def = definitions[node.identifier]
        if (!def) {
          console.error(new Error(`No definition found for identifier: ${node.identifier}`))
          return null
        }
        return h(element, { src: normalizeUri(def.url || ''), title: def.title ?? undefined, alt: node.alt ?? undefined })
      }
      case 'linkReference': {
        const def = definitions[node.identifier]
        if (!def) {
          console.error(new Error(`No definition found for identifier: ${node.identifier}`))
          return null
        }
        return h(element, { href: normalizeUri(def.url || ''), title: def.title ?? undefined }, () =>
          node.children.map(getRootComponent))
      }
      case 'heading': {
        // TODO: 使用另外的 slug 函数
        return h(element, { depth: node.depth, slug: getNodeTextContent(node) }, () =>
          node.children.map(getRootComponent))
      }
      case 'table': {
        return h(
          element,
          null,
          {
            head: () => getRootComponent(node.children[0], 0, { aligns: node.align ?? [], isHead: true }),
            body: () =>
              node.children.slice(1).map((child, i) =>
                getRootComponent(child, i + 1, { aligns: node.align ?? [], isHead: false }),
              ),
          },
        )
      }
      case 'tableRow': {
        if (!context) return null
        const { aligns, isHead } = context

        return h(
          element,
          () => node.children.map((child, i) => getRootComponent(child, i, { align: aligns[i], isHead })),
        )
      }
      case 'tableCell': {
        if (!context) return null
        const { align, isHead } = context

        return h(element, { align, isHead }, () => node.children.map(getRootComponent))
      }
      default: {
        if (isParent(node)) {
          return h(element, { item: node, index }, () =>
            node.children.map(getRootComponent))
        }
        return h(element, { item: node, index })
      }
    }
  }

  const markVNodes = shallowRef(processMarkVNodes(ast.value))

  function processMarkVNodes(root: Root) {
    definitions = {}
    footnoteDefinitions = {}
    hasFootnote.value = false
    frontmatter.value = ''

    const tempMarkVNodes: (VNode | string | null)[] = []
    const deferred: [RootContent, number][] = []

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
        setFootnoteDefinition(node, () => {
          hasFootnote.value = true
          return node.children.map(getRootComponent)
        })
        return
      }

      deferred.push([node, index])
    })

    deferred.forEach(([node, index]) => {
      tempMarkVNodes.push(getRootComponent(node, index))
    })

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
      return () => {
        const element
          = customPresets.footnoteContainer ?? PRESETS.footnoteContainer

        if (element === null) {
          return null
        }

        if (typeof element === 'string') {
          return h(element, Object.values(footnoteDefinitions).map(item => item.render()))
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
