import { defineAsyncComponent } from 'vue'
import type { PresetConfig } from '../types'

export const PRESETS: PresetConfig = {
  text: defineAsyncComponent(() => import('./components/Text.vue')),
  paragraph: 'p',
  heading: defineAsyncComponent(() => import('./components/Heading.vue')),
  delete: 'del',
  blockquote: 'blockquote',
  strong: 'strong',
  emphasis: 'em',
  link: defineAsyncComponent(() => import('./components/Link.vue')),
  linkReference: defineAsyncComponent(() => import('./components/LinkReference.vue')),
  thematicBreak: 'hr',
  list: defineAsyncComponent(() => import('./components/List.vue')),
  listItem: defineAsyncComponent(() => import('./components/ListItem.vue')),
  code: defineAsyncComponent(() => import('./components/Code.vue')),
  inlineCode: defineAsyncComponent(() => import('./components/InlineCode.vue')),
  image: defineAsyncComponent(() => import('./components/Image.vue')),
  imageReference: defineAsyncComponent(() => import('./components/ImageReference.vue')),
  break: 'br',
  footnoteReference: defineAsyncComponent(() => import('./components/FootnoteReference.vue')),
  footnoteContainer: defineAsyncComponent(() => import('./components/FootnoteContainer.vue')),
  table: defineAsyncComponent(() => import('./components/Table.vue')),
  tableRow: defineAsyncComponent(() => import('./components/TableRow.vue')),
  tableCell: defineAsyncComponent(() => import('./components/TableCell.vue')),
}
