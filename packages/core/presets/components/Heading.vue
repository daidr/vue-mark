<script lang="ts">
import { h } from 'vue';

export default {
    name: 'Heading',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    setup(props, { slots }) {
        const { item } = props;
        const Tag = `h${item.depth}`;
        return () => h(Tag, slots.default?.());
    },
};
</script>