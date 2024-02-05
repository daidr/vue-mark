<script setup lang="ts">
import type { CustomDirective } from '@vuemark/core'
import type { Image, Node, Parent } from 'mdast'
import { isParent } from '@vuemark/core'
import { computed } from 'vue'

const props = defineProps<{
  item: CustomDirective
  index?: number
}>()

function getAllImageNodes(node: Node | Parent): Image[] {
  const images: Image[] = []
  if (isParent(node)) {
    for (const child of node.children) {
      images.push(...getAllImageNodes(child))
    }
  } else {
    if (node.type === 'image') {
      images.push(node as Image)
    }
  }

  return images
}

const images = computed(() => getAllImageNodes(props.item))
</script>

<template>
  <div style="background: #89AC52; color: white;">
    这是一个图廊，里面有 {{ images.length }} 张图片，分别是：
    <ul>
      <li v-for="image in images" :key="image.url">
        <p>
          {{ image.url }}
          <template v-if="image.alt">
            (alt: {{ image.alt }})
          </template>
          <template v-if="image.title">
            (title: {{ image.title }})
          </template>
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
