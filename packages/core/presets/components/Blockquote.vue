<script setup lang="ts">
import type { Blockquote } from 'mdast'

defineProps<{
  item: Blockquote
  index?: number
}>()
</script>

<template>
  <blockquote>
    <slot />
  </blockquote>
</template>
