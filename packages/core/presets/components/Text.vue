<script setup lang="ts">
import type { Text } from 'mdast'
import { trimLines } from 'trim-lines'

defineProps<{
  item: Text
  index?: number
}>()
</script>

<template>
  {{ trimLines(item.value) }}
</template>
