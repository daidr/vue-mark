<script setup lang="ts">
import type { Strong } from 'mdast'

defineProps<{
  item: Strong
  index?: number
}>()
</script>

<template>
  <strong>
    <slot />
  </strong>
</template>
