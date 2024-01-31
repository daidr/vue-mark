<script setup lang="ts">
import { type Link } from 'mdast';

defineProps<{
    item: Link;
}>();
</script>

<template>
    <a rel="nofollow noopener noreferrer" :href="item.url" :title="item.title || undefined" target="_blank">
        <slot />
    </a>
</template>
