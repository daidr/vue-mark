<script setup lang="ts">
import type { Text } from 'mdast'

defineProps<{
  item: Text
  index?: number
}>()
</script>

<template>
  {{ item.value }}
</template>
