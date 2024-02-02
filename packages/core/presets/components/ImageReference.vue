<script setup lang="ts">
import type { Definition } from 'mdast'
import { type Ref, computed, inject } from 'vue'
import { normalizeUri } from 'micromark-util-sanitize-uri'

const props = defineProps<{
  identifier: string
  alt?: string
}>()

const definitions = inject<Ref<Record<string, Definition>>>('definitions')!

const def = computed(() => definitions.value && definitions.value[props.identifier])
</script>

<template>
  <img v-if="def" :src="normalizeUri(def.url || '')" :alt="alt" :title="def.title || undefined" class="vuemark-image">
</template>
