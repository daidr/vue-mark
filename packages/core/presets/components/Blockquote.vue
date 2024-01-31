<script setup lang="ts">
import { type Blockquote } from 'mdast';

defineProps<{
    item: Blockquote;
}>();
</script>

<template>
    <blockquote>
        <slot />
    </blockquote>
</template>
