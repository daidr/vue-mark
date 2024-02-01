<script setup lang="ts">
import type { Heading } from 'mdast'
import { getNodeTextContent } from '../../utils'

defineProps<{
  item: Heading
  index?: number
}>()
</script>

<template>
  <component :is="`h${item.depth}`" :id="getNodeTextContent(item)">
    <slot />
  </component>
</template>
