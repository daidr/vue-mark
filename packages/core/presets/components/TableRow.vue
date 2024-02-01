<script setup lang="ts">
import type { TableRow } from 'mdast'
import { computed, provide } from 'vue'

const props = defineProps<{
  item: TableRow
  index?: number
}>()

provide('tableRowIndex', computed(() => props.index))
</script>

<template>
  <tr>
    <slot />
  </tr>
</template>
