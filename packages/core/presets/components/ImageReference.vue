<script setup lang="ts">
import type { Definition, ImageReference } from 'mdast'
import { type Ref, computed, inject } from 'vue'
import { normalizeUri } from 'micromark-util-sanitize-uri'

const props = defineProps<{
  item: ImageReference
  index?: number
}>()

const definitions = inject<Ref<Record<string, Definition>>>('definitions')!

const def = computed(() => definitions.value && definitions.value[props.item.identifier])
</script>

<template>
  <img v-if="def" :src="normalizeUri(def.url || '')" :alt="item.alt || undefined" :title="def.title || undefined" class="vuemark-image">
</template>
