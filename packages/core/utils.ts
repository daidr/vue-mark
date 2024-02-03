import type { List, ListItem, Node, Parent, RootContent, Text } from 'mdast'

export function isParent(node: Node): node is Parent {
  return 'children' in node
}

export type ParentWithName = Parent & { name: string }

export function isCustomBlock(node: Node): node is ParentWithName {
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

export function getRawTextFromNode(raw: string, node: RootContent): string {
  if (!node.position) {
    return ''
  }
  return raw.slice(node.position.start.offset, node.position.end.offset)
}

export function listItemLoose(node: ListItem) {
  const spread = node.spread

  return spread === null || spread === undefined
    ? node.children.length > 1
    : spread
}

export function listLoose(node: List) {
  let loose = false
  if (node.type === 'list') {
    loose = node.spread || false
    const children = node.children
    let index = -1

    while (!loose && ++index < children.length) {
      loose = listItemLoose(children[index])
    }
  }

  return loose
}
