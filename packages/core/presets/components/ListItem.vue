<script setup lang="ts">
import type { ListItem } from 'mdast'

type GfmListItem = ListItem & {
  checked?: boolean
}

defineProps<{
  item: GfmListItem
  index?: number
}>()
</script>

<template>
  <li
    class="vuemark-list-item" :class="{
      'vuemark-task-list-item': item.checked !== null,
    }"
  >
    <input v-if="item.checked !== null" type="checkbox" :checked="item.checked" disabled>
    <slot />
  </li>
</template>
