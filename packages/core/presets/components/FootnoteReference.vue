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
      :id="`user-content-${globalPrefix}-fnref-${index + 1}`"
      :href="`#user-content-${globalPrefix}-fn-${index + 1}`"
      class="vuemark-footnote-ref"
      aria-describedby="footnote-label"
    >
      {{ index + 1 }}
    </a>
  </sup>
</template>
