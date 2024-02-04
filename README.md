# Vue Mark

提供了一个便捷的API，将 markdown 快速转换为 VNodes，支持使用自定义 Vue.js (3.0+) 组件。

## 安装

```bash
# use npm
npm install @vue-mark/core

# use yarn
yarn add @vue-mark/core

# use pnpm
pnpm add @vue-mark/core
```

## 开箱即用

```vue
<script setup lang="ts">
const markdownText = ref('# Hello, Vue Mark!')

const { VueMarkContent, FootnoteContent, hasFootnote } = useVueMark(markdownText)
</script>

<template>
  <div>
    <VueMarkContent />
    <FootnoteContent v-if="hasFootnote" />
  </div>
</template>
```

## 贡献

如果你有任何问题或者建议，欢迎提 [Issue](https://github.com/daidr/vue-mark/issues) 或者 [PR](https://github.com/daidr/vue-mark/pulls)。

### 开发

> [!WARNING]
> 请使用 `pnpm` 作为你的包管理器。

> [!TIP]
> 建议使用 VS Code 进行开发，并安装推荐插件，默认情况下会自动启动 ESLint 并根据规则进行代码格式化。

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 构建
pnpm build
```

### 测试

TODO

### 规范

TODO

## 自定义组件

TODO

## API

TODO

## License

[MIT License](LICENSE)
