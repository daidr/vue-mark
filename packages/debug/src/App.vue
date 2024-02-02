<script setup lang="ts">
import { useVueMark } from '@vuemark/core'
import { defineAsyncComponent, ref } from 'vue'

const pressure = true

const md = ref(pressure
  ? `---
layout: solar-system
---

# 测试文档

## 表格测试

| Syntax      | Description | Test Text     | hello |
| :---        |    :----:   |          ---: |-------|
| Header      | Title       | Here's this   | world |
| Paragraph   | Text        | And more      | test  |

## Task List 测试 （无样式）

*   [ ] to do
*   [x] done

## 图片引用测试

![The San Juan Mountains are beautiful!][img]

## 自定义组件测试

:::gallery
![p1](p1.png)
![p2](p2.png)
![p3](p3.png)
:::

## 代码块测试

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

## 各种内联样式测试

这是一段文本 **有加粗** __另一种加粗__ _斜体_ *另一种斜体* ~~删除线~~ ~~*又加粗又删除线*~~ ~另一种删除线~ ***加粗又斜体*** **_加粗又斜体_** ***_加粗又斜体_*** ~~***加粗又斜体又删除线***~~

## 引用测试

> #### 引用里有标题
>
> - 这是引用里的无序列表 111
> - 看起来不错 222
>
>  *内联样式* 看起来也应该没什么**问题**
>> 这是嵌套

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 脚注测试

这是一段话，你不用知道我讲了什么[^1] 但是你要知道脚注能够让你在不打断你的话题的情况下引用相关信息。比如这里有第二个脚注[^bignote]


[^1]: 这是第一个脚注。
[^bignote]: 要注意脚注固定显示为数字，不会因为你的脚注标记改变标签内容。

    脚注里面可以嵌入很多东西

    \`\`\`
    比如这是一个代码块
    \`\`\`

    也可以加入很多很多段落

这里有一段文字，但是不在脚注里。你会发现脚注默认是在文末显示的。

## 分隔线测试

_________________

## 图片测试

![这是图片的alt](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=200 "这个图片有title")

## 链接引用测试

[这是一个引用链接][1]

[这个引用链接有title][2]


## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)
## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)

## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)

[1]: https://www.google.com
[2]: https://www.baidu.com "title部分：百度一下"
[img]: https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=200 "这是图片的title"
`
  : `---
layout: solar-system
---

# 测试文档

## 表格测试

| Syntax      | Description | Test Text     | hello |
| :---        |    :----:   |          ---: |-------|
| Header      | Title       | Here's this   | world |
| Paragraph   | Text        | And more      | test  |

## Task List 测试 （无样式）

*   [ ] to do
*   [x] done

## 图片引用测试

![The San Juan Mountains are beautiful!][img]

## 自定义组件测试

:::gallery
![p1](p1.png)
![p2](p2.png)
![p3](p3.png)
:::

## 代码块测试

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

## 各种内联样式测试

这是一段文本 **有加粗** __另一种加粗__ _斜体_ *另一种斜体* ~~删除线~~ ~~*又加粗又删除线*~~ ~另一种删除线~ ***加粗又斜体*** **_加粗又斜体_** ***_加粗又斜体_*** ~~***加粗又斜体又删除线***~~

## 引用测试

> #### 引用里有标题
>
> - 这是引用里的无序列表 111
> - 看起来不错 222
>
>  *内联样式* 看起来也应该没什么**问题**
>> 这是嵌套

## 列表测试

1. 这是有序列表的第一个元素
2. 第二个元素
3. 第三个元素
    1. 嵌套一个有序列表
        1. 嵌套另一个有序列表
        2. 哈哈哈，有个emoji 😆
    2. 第二个元素
        * 嵌套一个无序列表
        * 第二个元素
4. 第四个元素
    - [ ] 嵌套一个任务列表，未完成
    - 这是一个普通的列表元素
    - [x] 嵌套一个任务列表，已完成

## 脚注测试

这是一段话，你不用知道我讲了什么[^1] 但是你要知道脚注能够让你在不打断你的话题的情况下引用相关信息。比如这里有第二个脚注[^bignote]


[^1]: 这是第一个脚注。
[^bignote]: 要注意脚注固定显示为数字，不会因为你的脚注标记改变标签内容。

    脚注里面可以嵌入很多东西

    \`\`\`
    比如这是一个代码块
    \`\`\`

    也可以加入很多很多段落

这里有一段文字，但是不在脚注里。你会发现脚注默认是在文末显示的。

## 分隔线测试

_________________

## 图片测试

![这是图片的alt](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=200 "这个图片有title")

## 链接引用测试

[这是一个引用链接][1]

[这个引用链接有title][2]

## 链接测试

[百度一下](https://www.baidu.com)

[带有title](https://www.baidu.com "这是title")

<https://www.baidu.com>

[百度**一下**](https://www.baidu.com)

[1]: https://www.google.com
[2]: https://www.baidu.com "title部分：百度一下"
[img]: https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=200 "这是图片的title"
`)

const customPresets
  = {
    directive_gallery: defineAsyncComponent(() => import('./components/Gallery.vue')),
  }

const { VueMarkContent, FootnoteContent, hasFootnote } = useVueMark(md, {
  customPresets,
  dealWithTextNodes: false,
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const viewRef = ref<HTMLDivElement | null>(null)

const textareaPositive = ref(true)

function onScroll() {
  if (!textareaPositive.value) return
  if (textareaRef.value && viewRef.value) {
    const textareaScrollPercentage = textareaRef.value.scrollTop / (textareaRef.value.scrollHeight - textareaRef.value.clientHeight)

    viewRef.value.scrollTop = (viewRef.value.scrollHeight - viewRef.value.clientHeight) * textareaScrollPercentage
  }
}

function onViewScroll() {
  if (textareaPositive.value) return
  if (textareaRef.value && viewRef.value) {
    const viewScrollPercentage = viewRef.value.scrollTop / (viewRef.value.scrollHeight - viewRef.value.clientHeight)

    textareaRef.value.scrollTop = (textareaRef.value.scrollHeight - textareaRef.value.clientHeight) * viewScrollPercentage
  }
}
</script>

<template>
  <div style="width: 50dvw; height: 100dvh; position: fixed; top: 0; left: 0;">
    <textarea ref="textareaRef" v-model="md" style="width: calc(100% - 20px); height: calc(100% - 20px)" name="" cols="100" rows="30" @pointerover="() => textareaPositive = true" @scroll.passive="onScroll" />
  </div>

  <div ref="viewRef" style="width: 50dvw; height: 100dvh; position: fixed; top: 0; right: 0; overflow: scroll;" @pointerover="() => textareaPositive = false" @scroll.passive="onViewScroll">
    <VueMarkContent />
    <FootnoteContent v-if="hasFootnote" />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}
</style>
