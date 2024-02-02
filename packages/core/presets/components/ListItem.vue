<script setup lang="ts">
defineProps<{
  spread: boolean
  checked?: boolean
}>()
</script>

<template>
  <li
    class="vuemark-list-item" :class="{
      'vuemark-task-list-item': typeof checked === 'boolean',
    }"
  >
    <input v-if="typeof checked === 'boolean'" type="checkbox" :checked="checked" disabled>
    <slot />
  </li>
</template>
