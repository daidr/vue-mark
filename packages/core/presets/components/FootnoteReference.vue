<script setup lang="ts">
import type { FootnoteReference } from 'mdast'
import { type ShallowRef, inject } from 'vue'
import type { FootnoteDefinitionMap } from '../../types'

defineProps<{
  item: FootnoteReference
  index?: number
}>()

const globalPrefix = inject<string>('globalPrefix')!
const footnoteDefinitions = inject<ShallowRef<
    FootnoteDefinitionMap
>>('footnoteDefinitions')!
</script>

<template>
  <sup>
    <a
      :id="`user-content-${globalPrefix}-fnref-${footnoteDefinitions[item.identifier].index + 1}`"
      :href="`#user-content-${globalPrefix}-fn-${footnoteDefinitions[item.identifier].index + 1}`"
      class="vuemark-footnote-ref"
      aria-describedby="footnote-label"
    >
      {{ footnoteDefinitions[item.identifier].index + 1 }}
    </a>
  </sup>
</template>
