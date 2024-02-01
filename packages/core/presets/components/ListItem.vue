<script setup lang="ts">
import type { ListItem } from 'mdast'

defineProps<{
  item: ListItem
}>()
</script>

<template>
  <li>
    <slot />
  </li>
</template>
