<script setup lang="ts">
import type { Code } from 'mdast'

defineProps<{
  item: Code
  index?: number
}>()
</script>

<template>
  <pre><code
      :class="{
        [`language-${item.lang}`]: item.lang,
      }" :meta="item.meta"
  >{{ item.value ? `${item.value}\n` : '' }}</code></pre>
</template>
