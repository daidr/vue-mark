<script setup lang="ts">
defineProps<{
  depth: 1 | 2 | 3 | 4 | 5 | 6
  slug: string
}>()
</script>

<template>
  <component :is="`h${depth}`" :id="`user-content-${slug}`">
    <slot />
  </component>
</template>
