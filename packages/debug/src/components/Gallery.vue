<script setup lang="ts">
import type { CustomDirective } from '@vuemark/core'

defineProps<{
  item: CustomDirective
  index?: number
}>()
</script>

<template>
  {{ item }}
</template>

<style scoped></style>
