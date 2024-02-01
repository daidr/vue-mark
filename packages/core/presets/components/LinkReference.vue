<script setup lang="ts">
import type { Definition, LinkReference } from 'mdast'
import { type Ref, computed, inject } from 'vue'

const props = defineProps<{
  item: LinkReference
}>()

const definitions = inject<Ref<Record<string, Definition>>>('definitions')!

const def = computed(() => definitions && definitions.value[props.item.identifier])
</script>

<template>
  <a v-if="def" rel="nofollow noopener noreferrer" :href="def.url" :title="def.title || undefined" target="_blank">
    <slot />
  </a>
</template>
