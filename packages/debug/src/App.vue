<script setup lang="ts">
import { useVueMark } from '@vuemark/core'
import { defineAsyncComponent, ref } from 'vue'

const md = ref(`---
layout: solar-system
---

\`\`\`js
console.log('hello world')
\`\`\`

\`\`\`js copy
console.log('hello world')
\`\`\`

\`\`\`
pure
\`\`\`

这是一段普通的文本，里面有\`内联代码\`嵌入。

# Hi ~~Mars~~Venus!

hello **world** __test__ _test_ *test* 111

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
>> 嵌套

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
        * one
        * two
4. Fourth item

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

Using footnotes is fun![^1] They let you reference relevant information without disrupting the flow of what you’re trying to say.[^bignote]

[^1]: This is the first footnote.
[^bignote]: Here’s one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    \`\`\`
    my code
    \`\`\`

    Add as many paragraphs as you like.

Text here and here and here.
[Learn more about markdown and footnotes in markdown](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes)

_________________

![The San Juan Mountains are beautiful!](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080 "San Juan Mountains")

> :warning: **Warning:** Do not push the big red button.

[hobbit-hole][1]

[hobbit-hole2][2]

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)

:::gallery
![p1](p1.png)
:::

[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle
[2]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"
`)

const customBlocks = {
  block_gallery: defineAsyncComponent(() => import('./components/Gallery.vue')),
}

const { VueMarkContent, FootnoteContent } = useVueMark(md, {
  customBlocks,
})
</script>

<template>
  <textarea id="" v-model="md" name="" cols="100" rows="30" />
  <VueMarkContent />
  <FootnoteContent />
</template>

<style scoped></style>
