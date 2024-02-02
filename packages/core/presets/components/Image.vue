<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  title?: string
}>()
</script>

<template>
  <img :src="src" :alt="alt" :title="title" class="vuemark-image">
</template>
