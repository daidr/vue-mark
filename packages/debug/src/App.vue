<script setup lang="ts">
import VueMark from '@vuemark/core'
import { defineAsyncComponent, ref } from 'vue';

const md = ref(`---
layout: solar-system
---

# Hi ~~Mars~~Venus!

:::gallary
![p1](p1.png)
:::
`)

const config = {
    'block_gallary': defineAsyncComponent(() => import('./components/Gallary.vue')),
}
</script>

<template>
    <textarea v-model="md" name="" id="" cols="30" rows="10"></textarea>
    <VueMark :markdown="md" :custom-blocks="config" />
</template>

<style scoped></style>