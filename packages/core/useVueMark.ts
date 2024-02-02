import type { Definition, FootnoteDefinition, RootContent } from 'mdast'
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
import { getNodeTextContent, isCustomBlock, isParent } from './utils'

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
  hasFootnote: ComputedRef<boolean>
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
  const definitions: ShallowRef<Record<string, Definition>> = shallowRef({})
  const footnoteDefinitions: ShallowRef<FootnoteDefinitionMap> = shallowRef({})
  const hasFootnote = computed(() => Object.keys(footnoteDefinitions.value).length > 0)

  const setDefinition = (node: Definition) => {
    definitions.value = {
      ...definitions.value,
      [node.identifier]: node,
    }
  }

  const setFootnoteDefinition = (
    node: FootnoteDefinition,
    render: () => VNode | string | null | (VNode | string | null)[],
  ) => {
    footnoteDefinitions.value = {
      ...footnoteDefinitions.value,
      [node.identifier]: {
        node,
        index: Object.keys(footnoteDefinitions.value).length,
        render,
      },
    }
  }

  const getRootComponent = (
    node: RootContent,
    index?: number,
    context?: any,
  ): VNode | string | null => {
    // frontmatter
    if (node.type === 'yaml') {
      return null
    }

    // footnote definition
    if (node.type === 'footnoteDefinition') {
      setFootnoteDefinition(node, () =>
        (node).children.map(getRootComponent))
      return null
    }

    // link/image definition
    if (node.type === 'definition') {
      setDefinition(node)
      return null
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
        return h(element, { ordered: node.ordered ?? undefined, start: node.start ?? undefined, spread: node.spread ?? undefined }, () =>
          node.children.map(getRootComponent))
      }
      case 'listItem': {
        return h(element, {
          checked: node.checked ?? undefined,
          spread: node.spread ?? undefined,
        }, () => node.children.map(getRootComponent))
      }
      case 'image': {
        return h(element, { src: normalizeUri(node.url || ''), alt: node.alt ?? undefined, title: node.title ?? undefined })
      }
      case 'imageReference': {
        return h(element, { identifier: node.identifier, alt: node.alt ?? undefined })
      }
      case 'linkReference': {
        return h(element, { identifier: node.identifier }, () =>
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

  const markVNodes = shallowRef(ast.value.children.map(getRootComponent))

  watch(ast, (newValue) => {
    definitions.value = {}
    footnoteDefinitions.value = {}
    markVNodes.value = newValue.children.map(getRootComponent)
  })

  const VueMarkContent: Component = defineComponent({
    name: 'VueMarkContent',
    setup() {
      provide('definitions', definitions)
      provide('footnoteDefinitions', footnoteDefinitions)
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
          return h(element, Object.values(footnoteDefinitions.value).map(item => item.render()))
        }

        return h(element, {
          footnoteDefinitions: footnoteDefinitions.value,
          globalPrefix,
        })
      }
    },
  })

  return {
    toc,
    hasFootnote,
    VueMarkContent,
    FootnoteContent,
  }
}
