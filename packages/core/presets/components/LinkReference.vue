<script setup lang="ts">
import type { Definition } from 'mdast'
import { type Ref, computed, inject } from 'vue'
import { normalizeUri } from 'micromark-util-sanitize-uri'

const props = defineProps<{
  identifier: string
}>()

const definitions = inject<Ref<Record<string, Definition>>>('definitions')!

const def = computed(() => definitions.value && definitions.value[props.identifier])
</script>

<template>
  <a v-if="def" rel="nofollow noopener noreferrer" :href="normalizeUri(def.url || '')" :title="def.title || undefined" target="_blank">
    <slot />
  </a>
</template>
