<script setup lang="ts">
import type { Image } from 'mdast'

defineProps<{
  item: Image
}>()
</script>

<template>
  <img :src="item.url" :alt="item.alt || undefined" :title="item.title || undefined" vuemark-image>
</template>
