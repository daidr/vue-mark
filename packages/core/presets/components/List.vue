<script setup lang="ts">
defineProps<{
  ordered?: boolean
  spread?: boolean
  start?: number
}>()
</script>

<template>
  <ol v-if="ordered" :start="start || undefined">
    <slot />
  </ol>
  <ul v-else>
    <slot />
  </ul>
</template>
