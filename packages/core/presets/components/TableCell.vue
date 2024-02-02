<script setup lang="ts">
defineProps<{
  align?: 'center' | 'left' | 'right'
  isHead?: boolean
}>()
</script>

<template>
  <component :is="isHead ? 'th' : 'td'" :align="align">
    <slot />
  </component>
</template>
