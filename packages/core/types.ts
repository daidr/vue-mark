import type {
  Blockquote,
  Break,
  Code,
  Definition,
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

export type FootnoteDefinitionMap = Record<
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
  definition: Definition
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
  /**
   * 普通part组件
   * normal render components
   */
  [key in keyof PartTypeMap]?: Component<{
    item: PartTypeMap[key]
    index?: number
  }>;
} & {
  /**
   * 脚注组件
   * footnote render component
   */
  footnoteContainer?: Component<{
    footnoteDefinitions: FootnoteDefinitionMap
    globalPrefix: string
  }>
} & {
  /**
   * 自定义块组件
   * Custom directive components
   */
  [key in `directive_${string}`]?: Component<{
    item: CustomDirective
    index?: number
  }>;
}

/**
 * 可以作为父级的part类型
 */
export type ParentPartTypes =
  | keyof ParentPartTypeMap
  | 'footnoteDefinition'
  | `directive_${string}`
/**
 * 可以作为叶子的part类型
 */
export type LeafPartTypes = keyof LeafPartTypeMap
/**
 * 所有会在ast中出现的part类型
 */
export type PartTypes = ParentPartTypes | LeafPartTypes
/**
 * 可自定义的part类型，footnoteDefinition非可渲染part，会直接被内部处理，不允许自定义
 */
export type CustomizablePartTypes = Exclude<PartTypes, 'footnoteDefinition'>
