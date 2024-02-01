import type { FootnoteDefinition } from 'mdast'
import type { VNode } from 'vue'

export type FootnoteDefinitionMap = Record<
string,
{
  node: FootnoteDefinition
  index: number
  render: () => VNode | string | null | (VNode | string | null)[]
}
>
