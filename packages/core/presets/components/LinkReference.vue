<script setup lang="ts">
import { type LinkReference, type Definition } from 'mdast';
import { inject, computed, type Ref } from 'vue';

const props = defineProps<{
    item: LinkReference;
}>();

const definitions = inject<Ref<Record<string, Definition>>>('definitions')!;

const def = computed(() => definitions.value[props.item.identifier]);
</script>

<template>
    <a v-if="def" rel="nofollow noopener noreferrer" :href="def.url" :title="def.title || undefined" target="_blank">
        <slot />
    </a>
</template>
