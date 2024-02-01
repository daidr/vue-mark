<script setup lang="ts">
import type { Delete } from 'mdast'

defineProps<{
  item: Delete
}>()
</script>

<template>
  <del>
    <slot />
  </del>
</template>
