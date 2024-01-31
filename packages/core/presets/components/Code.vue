<script setup lang="ts">
import { type Code } from 'mdast';

defineProps<{
    item: Code;
}>();
</script>

<template>
    <pre :lang="item.lang || undefined" :meta="item.meta">
        <code>{{ item.value }}</code>
    </pre>
</template>
