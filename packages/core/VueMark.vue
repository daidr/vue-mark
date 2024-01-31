
<script setup lang="ts" generic="CustomBlockList extends Partial<Record<`block_${string}` | InnerElement, Component>>">
import { type InnerElement, type ConfigItemValue, PRESETS } from './presets'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import { unified } from 'unified'
import { type VNode, type Component, computed, h, watchEffect } from 'vue'
import type { Node, Parent, Text } from 'mdast'


const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkDirective)


const props = defineProps<{
    markdown: string
    customBlocks?: CustomBlockList
}>()

const ast = computed(() => {
    return processor.parse(props.markdown)
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

const getSlotOrName = (config: ConfigItemValue, node: any) => {
    if (typeof config === 'string') {
        return config
    }

    if (config.type === 'tag') {
        return typeof config.value === 'function' ? config.value(node) : config.value
    }

    return config.value
}

const getRootComponent = (node: Parent | Node): VNode | string => {
    if (isParent(node)) {
        const slotName: InnerElement | `block_${string}` = isCustomBlock(node) ? `block_${node.name}` : node.type as InnerElement
        if (props.customBlocks && (slotName in props.customBlocks)) {
            // props自定义块
            const element = props.customBlocks[slotName]!
            return h(element, { item: node }, () => node.children.map(getRootComponent))
        }

        if (PRESETS[slotName]) {
            const slot = getSlotOrName(PRESETS[slotName], node)
            // 预设块
            if (typeof slot === 'string') {
                return h(slot, node.children.map(getRootComponent))
            } else {
                return h(slot, { item: node }, () => node.children.map(getRootComponent))
            }
        }


        // 未知块
        return h('div', { class: ['remaining-block', slotName] }, node.children.map(getRootComponent))

    }

    if (isText(node)) {
        return node.value
    }

    // 内联元素
    const slotName = `${node.type}`
    if (props.customBlocks && slotName in props.customBlocks) {
        // props自定义内联元素
        return h(props.customBlocks[slotName], { item: node })
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