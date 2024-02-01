<script setup lang="ts">
import type { Delete } from 'mdast'

defineProps<{
  item: Delete
  index?: number
}>()
</script>

<template>
  <del>
    <slot />
  </del>
</template>
