<script setup lang="ts">
import type { Table } from 'mdast'
import { computed, provide } from 'vue'

const props = defineProps<{
  item: Table
  index?: number
}>()

provide('tableData', computed(() => props.item))
</script>

<template>
  <table>
    <thead>
      <slot name="head" />
    </thead>
    <tbody>
      <slot name="body" />
    </tbody>
  </table>
</template>
