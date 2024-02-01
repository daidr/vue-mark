<script setup lang="ts">
import type { FootnoteDefinitionMap } from '../../types'

defineProps<{
  footnoteDefinitions: FootnoteDefinitionMap
  globalPrefix: string
}>()
</script>

<template>
  <section class="vuemark-footnotes">
    <h2 id="footnote-label" class="sr-only">
      Footnotes
    </h2>
    <ol>
      <li
        v-for="footnote of (Object.values(footnoteDefinitions) as FootnoteDefinitionMap[string][])"
        :id="`user-content-${globalPrefix}-fn-${footnote.index + 1}`" :key="footnote.index"
      >
        <component :is="footnote.render" />
        <a
          class="vuemark-footnote-backref" :href="`#user-content-${globalPrefix}-fnref-${footnote.index + 1}`"
          :aria-label="`Back to reference ${footnote.index + 1}`"
        >↩</a>
      </li>
    </ol>
  </section>
</template>
