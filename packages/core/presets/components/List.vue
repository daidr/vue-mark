<script setup lang="ts">
import { type List } from 'mdast';

defineProps<{
    item: List;
}>();
</script>

<template>
    <ol v-if="item.ordered" :start="item.start">
        <slot />
    </ol>
    <ul v-else>
        <slot />
    </ul>
</template>
