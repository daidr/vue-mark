import type { PresetConfig } from '../types'
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
import Image from './components/Image.vue'
import Break from './components/Break.vue'
import FootnoteReference from './components/FootnoteReference.vue'
import FootnoteContainer from './components/FootnoteContainer.vue'
import Table from './components/Table.vue'
import TableRow from './components/TableRow.vue'
import TableCell from './components/TableCell.vue'
import ImageReference from './components/ImageReference.vue'

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
  image: Image,
  imageReference: ImageReference,
  break: Break,
  footnoteReference: FootnoteReference,
  footnoteContainer: FootnoteContainer,
  table: Table,
  tableRow: TableRow,
  tableCell: TableCell,
}
