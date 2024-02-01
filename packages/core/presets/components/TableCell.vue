<script setup lang="ts">
import type { Table, TableCell } from 'mdast'
import type { ComputedRef } from 'vue'
import { inject } from 'vue'

defineProps<{
  item: TableCell
  index?: number
}>()

const tableData = inject<ComputedRef<Table>>('tableData')!
const tableRowIndex = inject<ComputedRef<number>>('tableRowIndex')!
</script>

<template>
  <component :is="tableRowIndex === 0 ? 'th' : 'td'" :align="tableData?.align?.[index ?? -1]">
    <slot />
  </component>
</template>
