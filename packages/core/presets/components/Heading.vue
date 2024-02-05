<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  level: 1 | 2 | 3 | 4 | 5 | 6
  slug: string
}>()

const globalPrefix = inject<string>('globalPrefix')!
</script>

<template>
  <component :is="`h${level}`" :id="`user-content-${globalPrefix}-${slug}`">
    <slot />
  </component>
</template>
