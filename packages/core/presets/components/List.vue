<script setup lang="ts">
defineProps<{
  ordered?: boolean
  spread?: boolean
  start?: number
  hasTaskItem: boolean
}>()
</script>

<template>
  <component
    :is="ordered ? 'ol' : 'ul'" :start="start || undefined" class="vuemark-list" :class="{
      'contains-task-list': hasTaskItem,
    }"
  >
    <slot />
  </component>
</template>
