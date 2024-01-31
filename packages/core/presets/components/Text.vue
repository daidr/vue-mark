<script setup lang="ts">
import { type Text } from 'mdast';

defineProps<{
    item: Text;
}>();
</script>

<template>
    {{ item.value }}
</template>
