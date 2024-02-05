<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  index: number
}>()

const globalPrefix = inject<string>('globalPrefix')!
</script>

<template>
  <sup>
    <a
      :id="`user-content-${globalPrefix}-fnref-${index}`"
      :href="`#user-content-${globalPrefix}-fn-${index}`"
      class="vuemark-footnote-ref"
      aria-describedby="footnote-label"
    >
      {{ index }}
    </a>
  </sup>
</template>
