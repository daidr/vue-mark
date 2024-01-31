
<script setup lang="ts" generic="CustomBlockList extends Partial<Record<`block_${string}` | InnerElement, Component>>">
import { type InnerElement, PRESETS } from './presets'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import { unified } from 'unified'
import { type VNode, type Component, computed, h, watchEffect, provide, ref } from 'vue'
import type { Node, Parent, Text, Definition, FootnoteDefinition } from 'mdast'

const processor = unified({ position: false })

    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkDirective)


const props = defineProps<{
    markdown: string
    customBlocks?: CustomBlockList
}>()

const definitions = ref<Record<string, Definition>>({})
provide('definitions', definitions)
const setDefinition = (node: Definition) => {
    definitions.value[node.identifier] = node
}

const footnoteDefinitions = ref<Record<string, FootnoteDefinition>>({})
provide('footnoteDefinitions', footnoteDefinitions)
const setFootnoteDefinition = (node: FootnoteDefinition) => {
    footnoteDefinitions.value[node.identifier] = node
}

let st = 0

const ast = computed(() => {
    definitions.value = {}
    footnoteDefinitions.value = {}
    st = Date.now()
    const ast = processor.parse(props.markdown)
    console.log('parse', Date.now() - st, 'ms')
    return ast
})

watchEffect(() => {
    console.log(ast.value)
})

const isParent = (node: Node): node is Parent => {
    return 'children' in node
}

type ParentWithName = Parent & { name: string }

const isCustomBlock = (node: Node): node is ParentWithName => {
    return node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
}

const isText = (node: Node): node is Text => {
    return node.type === 'text'
}

const getRootComponent = (node: Parent | Node): VNode | string | null => {
    if (isParent(node)) {
        const slotName: InnerElement | `block_${string}` = isCustomBlock(node) ? `block_${node.name}` : node.type as InnerElement
        if (props.customBlocks && (slotName in props.customBlocks)) {
            // props自定义块
            const element = props.customBlocks[slotName]!
            return h(element, { item: node }, () => node.children.map(getRootComponent))
        }

        if (PRESETS[slotName]) {
            // 预设块
            return h(PRESETS[slotName], { item: node }, () => node.children.map(getRootComponent))
        }


        // 未知块
        return h('div', { class: ['unknown-block', slotName] }, node.children.map(getRootComponent))

    }

    // if (isText(node)) {
    //     return node.value
    // }

    // 内联元素
    const slotName: InnerElement = `${node.type}` as InnerElement
    if (props.customBlocks && slotName in props.customBlocks) {
        // props自定义内联元素
        const element = props.customBlocks[slotName]!
        return h(element, { item: node })
    }

    if (slotName === 'definition') {
        // 链接定义
        setDefinition(node as Definition)
        return null
    }

    if (slotName === 'footnoteDefinition') {
        // 脚注定义
        setFootnoteDefinition(node as FootnoteDefinition)
        return null
    }

    if (PRESETS[slotName]) {
        // 预设内联元素
        return h(PRESETS[slotName], { item: node })
    }

    // 未知内联元素
    return h('span', { class: ['unknown-inline', node.type] })
}
</script>

<template>
    <Component :is="getRootComponent(ast)" />
</template>