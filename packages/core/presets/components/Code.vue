<script setup lang="ts">
defineProps<{
  code: string
  lang?: string
  meta?: string
}>()
</script>

<template>
  <pre><code
      :class="{
        [`language-${lang}`]: lang,
      }" :meta="meta"
  >{{ code }}</code></pre>
</template>
