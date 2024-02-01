import type { Component } from 'vue'
import type { FootnoteDefinitionMap } from '../types'
import Text from './components/Text.vue'
import Paragraph from './components/Paragraph.vue'
import Heading from './components/Heading.vue'
import Delete from './components/Delete.vue'
import Blockquote from './components/Blockquote.vue'
import Strong from './components/Strong.vue'
import Emphasis from './components/Emphasis.vue'
import Link from './components/Link.vue'
import LinkReference from './components/LinkReference.vue'
import ThematicBreak from './components/ThematicBreak.vue'
import List from './components/List.vue'
import ListItem from './components/ListItem.vue'
import Code from './components/Code.vue'
import InlineCode from './components/InlineCode.vue'
import FootnoteReference from './components/FootnoteReference.vue'
import FootnoteContainer from './components/FootnoteContainer.vue'

export type InnerElement =
  | 'paragraph'
  | 'image'
  | 'link'
  | 'list'
  | 'listItem'
  | 'heading'
  | 'blockquote'
  | 'code'
  | 'inlineCode'
  | 'table'
  | 'tableRow'
  | 'tableCell'
  | 'thematicBreak'
  | 'break'
  | 'delete'
  | 'strong'
  | 'emphasis'
  | 'root'
  | 'text'
  | 'footnote'
  | 'footnoteDefinition'
  | 'definition'
  | 'footnoteReference'
  | 'linkReference'
  | 'imageReference'

export type ConfigItemValue = Component

export type PresetConfig = Record<string, ConfigItemValue> & {
  footnoteContainer: Component<{
    footnoteDefinitions: FootnoteDefinitionMap
    globalPrefix: string
  }>
}

export const PRESETS: PresetConfig = {
  text: Text,
  paragraph: Paragraph,
  heading: Heading,
  delete: Delete,
  blockquote: Blockquote,
  strong: Strong,
  emphasis: Emphasis,
  link: Link,
  linkReference: LinkReference,
  thematicBreak: ThematicBreak,
  list: List,
  listItem: ListItem,
  code: Code,
  inlineCode: InlineCode,
  footnoteReference: FootnoteReference,
  footnoteContainer: FootnoteContainer,
}
