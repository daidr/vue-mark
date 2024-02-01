import type { Node, Parent, Text } from 'mdast'

export function isParent(node: Node): node is Parent {
  return 'children' in node
}

export type ParentWithName = Parent & { name: string }

export function isCustomBlock(node: Parent): node is ParentWithName {
  return (
    node.type === 'containerDirective'
    || node.type === 'leafDirective'
    || node.type === 'textDirective'
  )
}

export function isTextNode(node: Node): node is Text {
  return node.type === 'text'
}

export function getNodeTextContent(node: Node | Parent): string {
  if (isParent(node)) {
    return node.children.map(getNodeTextContent).join('')
  }
  if (isTextNode(node)) {
    return node.value
  }
  return ''
}
