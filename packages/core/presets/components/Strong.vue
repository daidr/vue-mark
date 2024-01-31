<script setup lang="ts">
import { type Strong } from 'mdast';

defineProps<{
    item: Strong;
}>();
</script>

<template>
    <strong>
        <slot />
    </strong>
</template>
