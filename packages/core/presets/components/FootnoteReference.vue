<script setup lang="ts">
import type { FootnoteReference } from 'mdast'
import { type ShallowRef, computed, inject } from 'vue'
import type { FootnoteDefinitionMap } from '../../types'

const props = defineProps<{
  item: FootnoteReference
  index?: number
}>()

const globalPrefix = inject<string>('globalPrefix')!
const footnoteDefinitions = inject<ShallowRef<
    FootnoteDefinitionMap
  >>('footnoteDefinitions')!

const def = computed(() => footnoteDefinitions.value && footnoteDefinitions.value[props.item.identifier])
</script>

<template>
  <sup v-if="def">
    <a
      :id="`user-content-${globalPrefix}-fnref-${def.index + 1}`"
      :href="`#user-content-${globalPrefix}-fn-${def.index + 1}`"
      class="vuemark-footnote-ref"
      aria-describedby="footnote-label"
    >
      {{ def.index + 1 }}
    </a>
  </sup>
</template>
