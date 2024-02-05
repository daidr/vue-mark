<script setup lang="ts">
import type { ShallowRef } from 'vue'
import type { FootnoteDefinitionMap } from '../../types'

defineProps<{
  footnoteDefinitions: ShallowRef<FootnoteDefinitionMap>
  globalPrefix: string
}>()
</script>

<template>
  <section class="vuemark-footnotes">
    <h2 id="footnote-label" class="sr-only">
      Footnotes
    </h2>
    <ol v-if="[...footnoteDefinitions.value.keys()].length > 0">
      <li
        v-for="footnote of footnoteDefinitions.value.values()"
        :id="`user-content-${globalPrefix}-fn-${footnote.index}`" :key="footnote.index"
      >
        <component :is="footnote.render" />
        <a
          class="vuemark-footnote-backref" :href="`#user-content-${globalPrefix}-fnref-${footnote.index}`"
          :aria-label="`Back to reference ${footnote.index}`"
        >↩</a>
      </li>
    </ol>
  </section>
</template>
