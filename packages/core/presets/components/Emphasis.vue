<script setup lang="ts">
import type { Emphasis } from 'mdast'

defineProps<{
  item: Emphasis
}>()
</script>

<template>
  <em>
    <slot />
  </em>
</template>
