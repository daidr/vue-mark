<script setup lang="ts">
import type { Link } from 'mdast'
import { normalizeUri } from 'micromark-util-sanitize-uri'

defineProps<{
  item: Link
  index?: number
}>()
</script>

<template>
  <a rel="nofollow noopener noreferrer" :href="normalizeUri(item.url || '')" :title="item.title || undefined" target="_blank">
    <slot />
  </a>
</template>
