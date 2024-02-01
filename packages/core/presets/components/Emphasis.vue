<script setup lang="ts">
import type { Emphasis } from 'mdast'

defineProps<{
  item: Emphasis
  index?: number
}>()
</script>

<template>
  <em>
    <slot />
  </em>
</template>
