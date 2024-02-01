<script setup lang="ts">
import type { Image } from 'mdast'

defineProps<{
  item: Image
  index?: number
}>()
</script>

<template>
  <img :src="item.url" :alt="item.alt || undefined" :title="item.title || undefined" class="vuemark-image">
</template>
