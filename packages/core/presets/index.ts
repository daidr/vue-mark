import type { PresetConfig } from '../types'
import Text from './components/Text.vue'
import Heading from './components/Heading.vue'
import Link from './components/Link.vue'
import LinkReference from './components/LinkReference.vue'
import List from './components/List.vue'
import ListItem from './components/ListItem.vue'
import Code from './components/Code.vue'
import InlineCode from './components/InlineCode.vue'
import Image from './components/Image.vue'
import FootnoteReference from './components/FootnoteReference.vue'
import FootnoteContainer from './components/FootnoteContainer.vue'
import Table from './components/Table.vue'
import TableRow from './components/TableRow.vue'
import TableCell from './components/TableCell.vue'
import ImageReference from './components/ImageReference.vue'

export const PRESETS: PresetConfig = {
  text: Text,
  paragraph: 'p',
  heading: Heading,
  delete: 'del',
  blockquote: 'blockquote',
  strong: 'strong',
  emphasis: 'em',
  link: Link,
  linkReference: LinkReference,
  thematicBreak: 'hr',
  list: List,
  listItem: ListItem,
  code: Code,
  inlineCode: InlineCode,
  image: Image,
  imageReference: ImageReference,
  break: 'br',
  footnoteReference: FootnoteReference,
  footnoteContainer: FootnoteContainer,
  table: Table,
  tableRow: TableRow,
  tableCell: TableCell,
}
