<script setup lang="ts">
import type { InlineCode } from 'mdast'

defineProps<{
  item: InlineCode
  index?: number
}>()
</script>

<template>
  <code>{{ item.value.replace(/\r?\n|\r/g, ' ') }}</code>
</template>
