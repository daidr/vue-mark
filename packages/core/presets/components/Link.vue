<script setup lang="ts">
defineProps<{
  href: string
  title?: string
}>()
</script>

<template>
  <a rel="nofollow noopener noreferrer" :href="href" :title="title" target="_blank">
    <slot />
  </a>
</template>
