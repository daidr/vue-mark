<script setup lang="ts">
import type { Image } from 'mdast'
import { normalizeUri } from 'micromark-util-sanitize-uri'

defineProps<{
  item: Image
  index?: number
}>()
</script>

<template>
  <img :src="normalizeUri(item.url || '')" :alt="item.alt || undefined" :title="item.title || undefined" class="vuemark-image">
</template>
