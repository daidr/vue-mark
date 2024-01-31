<script setup lang="ts">
import { type Paragraph } from 'mdast';

defineProps<{
    item: Paragraph;
}>();
</script>

<template>
    <p>
        <slot />
    </p>
</template>
