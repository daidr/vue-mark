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
import type {
  FootnoteDefinitionMap,
  LeafPartTypes,
  ParentPartTypes,
  PresetConfig,
} from './types'
import { PRESETS } from './presets'
import { getNodeTextContent, isCustomBlock, isParent } from './utils'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm, { singleTilde: false })
  .use(remarkDirective)
  .freeze()

export interface UseVueMarkOptions {
  customPresets?: PresetConfig
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
  const { customPresets = {} as PresetConfig, globalPrefix = 'vuemark' }
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
  ): VNode | string | null => {
    if (isParent(node)) {
      const partName: ParentPartTypes = isCustomBlock(node)
        ? `directive_${node.name}`
        : (node.type as ParentPartTypes)

      if (partName === 'footnoteDefinition') {
        // 脚注定义part
        setFootnoteDefinition(node as FootnoteDefinition, () =>
          node.children.map(getRootComponent))
        return null
      }

      const element
        = (customPresets[partName] as Component)
        || (PRESETS[partName] as Component)

      if (element) {
        if (partName === 'table') {
          return (h(
            element,
            { item: node, index },
            {
              head: () => getRootComponent(node.children[0], 0),
              body: () =>
                node.children.slice(1).map((child, i) =>
                  getRootComponent(child, i + 1),
                ),
            },
          ))
        }

        return h(element, { item: node, index }, () =>
          node.children.map(getRootComponent))
      }

      // 未知parent part
      return h(
        'div',
        { class: ['unknown-parent-part', partName], index },
        node.children.map(getRootComponent),
      )
    }

    // if (isText(node)) {
    //     return node.value
    // }

    // 叶子元素
    const partName: LeafPartTypes = `${node.type}` as LeafPartTypes

    if (partName === 'definition') {
      // 链接定义
      setDefinition(node as Definition)
      return null
    }

    const element
      = (customPresets[partName] as Component)
      || (PRESETS[partName] as Component)

    if (element) {
      return h(element, { item: node, index })
    }

    // 未知叶子part
    return h('span', { class: ['unknown-leaf-part', node.type], index })
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
        const element: Component
          = customPresets.footnoteContainer ?? PRESETS.footnoteContainer!
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
