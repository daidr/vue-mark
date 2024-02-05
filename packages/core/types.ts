import type {
  Blockquote,
  Break,
  Code,
  Delete,
  Emphasis,
  FootnoteDefinition,
  FootnoteReference,
  Heading,
  Image,
  ImageReference,
  InlineCode,
  Link,
  LinkReference,
  List,
  ListItem,
  Paragraph,
  Parent,
  Strong,
  Table,
  TableCell,
  TableRow,
  Text,
  ThematicBreak,
} from 'mdast'
import type { Component, VNode } from 'vue'

export type FootnoteDefinitionMap = Map<
  string,
  {
    node: FootnoteDefinition
    index: number
    render: () => VNode | string | null | (VNode | string | null)[]
  }
  >

export interface ParentPartTypeMap {
  paragraph: Paragraph
  link: Link
  list: List
  listItem: ListItem
  heading: Heading
  blockquote: Blockquote
  table: Table
  tableRow: TableRow
  tableCell: TableCell
  delete: Delete
  strong: Strong
  emphasis: Emphasis
  linkReference: LinkReference
}

export interface LeafPartTypeMap {
  image: Image
  code: Code
  inlineCode: InlineCode
  thematicBreak: ThematicBreak
  break: Break
  text: Text
  footnoteReference: FootnoteReference
  imageReference: ImageReference
}

export interface CustomDirective extends Parent {
  type: 'containerDirective' | 'leafDirective' | 'textDirective'
  name: string
  attributes: Record<string, string>
}

export type PartTypeMap = ParentPartTypeMap & LeafPartTypeMap

export type PresetConfig = {
  [key in keyof PartTypeMap]: Component | string | null;
} & {
  footnoteContainer: Component | string | null
} & {
  [key in `directive_${string}`]: Component | string | null;
}
