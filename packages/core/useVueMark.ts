import type { Definition, FootnoteDefinition, Node, Parent } from 'mdast'
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
} from 'vue'
import type {
  Component,
  ComputedRef,
  MaybeRefOrGetter,
  ShallowRef,
  VNode,
} from 'vue'
import type { FootnoteDefinitionMap } from './types'

import type { InnerElement } from './presets'
import { PRESETS } from './presets'
import { getNodeTextContent, isCustomBlock, isParent } from './utils'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkDirective)
  .freeze()

export interface UseVueMarkOptions {
  customBlocks?: Record<string, Component>
  globalPrefix?: string
}

export interface VueMarkToc {
  level: number
  title: string
}

export interface UseVueMarkReturn {
  toc: ShallowRef<VueMarkToc[]>
  VueMarkContent: Component
  FootnoteContent: Component
}

export function useVueMark(
  value: MaybeRefOrGetter<string>,
  options?: UseVueMarkOptions,
): UseVueMarkReturn {
  const { customBlocks = {}, globalPrefix = 'vuemark' } = options ?? {}
  const ast = computed(() => processor.parse(toValue(value)))

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

  const getRootComponent = (node: Parent | Node): VNode | string | null => {
    if (isParent(node)) {
      const slotName: InnerElement | `block_${string}` = isCustomBlock(node)
        ? `block_${node.name}`
        : (node.type as InnerElement)

      if (slotName === 'footnoteDefinition') {
        // 脚注定义
        setFootnoteDefinition(node as FootnoteDefinition, () =>
          node.children.map(getRootComponent))
        return null
      }

      if (slotName in customBlocks) {
        // props自定义块
        const element = customBlocks[slotName]!
        return h(element, { item: node }, () =>
          node.children.map(getRootComponent))
      }

      if (PRESETS[slotName]) {
        // 预设块
        return h(PRESETS[slotName], { item: node }, () =>
          node.children.map(getRootComponent))
      }

      // 未知块
      return h(
        'div',
        { class: ['unknown-block', slotName] },
        node.children.map(getRootComponent),
      )
    }

    // if (isText(node)) {
    //     return node.value
    // }

    // 内联元素
    const slotName: InnerElement = `${node.type}` as InnerElement

    if (slotName === 'definition') {
      // 链接定义
      setDefinition(node as Definition)
      return null
    }

    if (slotName in customBlocks) {
      // props自定义内联元素
      const element = customBlocks[slotName]!
      return h(element, { item: node })
    }

    if (PRESETS[slotName]) {
      // 预设内联元素
      return h(PRESETS[slotName], { item: node })
    }

    // 未知内联元素
    return h('span', { class: ['unknown-inline', node.type] })
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
          = customBlocks.footnoteContainer ?? PRESETS.footnoteContainer
        return h(element, {
          footnoteDefinitions: footnoteDefinitions.value,
          globalPrefix,
        })
      }
    },
  })

  return {
    toc,
    VueMarkContent,
    FootnoteContent,
  }
}
