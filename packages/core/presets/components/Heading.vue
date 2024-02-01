<script lang="ts">
import { h } from 'vue'
import type { Heading } from 'mdast'
import { getNodeTextContent } from '../../utils'

export default {
  name: 'Heading',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { item } = props as { item: Heading }
    const Tag = `h${item.depth}`
    return () => h(Tag, {
      id: getNodeTextContent(item),
    }, slots.default?.())
  },
}
</script>
