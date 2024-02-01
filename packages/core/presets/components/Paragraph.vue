<script setup lang="ts">
import type { Paragraph } from 'mdast'

defineProps<{
  item: Paragraph
  index?: number
}>()
</script>

<template>
  <p>
    <slot />
  </p>
</template>
