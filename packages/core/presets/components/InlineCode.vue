<script setup lang="ts">
import { type InlineCode } from 'mdast';

defineProps<{
    item: InlineCode;
}>();
</script>

<template>
    <code>{{ item.value }}</code>
</template>
