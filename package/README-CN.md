# Theme

> 为你的网站添加颜色主题

## 特性

- 黑暗模式
- CSS 类控制切换主题

## 用法

下面使用 Vue 应用作为例子。

当然你也可以在原生应用或其他框架中使用，这是允许的。

在你的 index.html head 标签中添加下面代码：

```html
<script>
  ;(function initTheme() {
    const html = document.documentElement
    const storedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const applyTheme = storedTheme || (systemTheme ? 'dark' : 'light')

    localStorage.setItem('theme', applyTheme)
    html.setAttribute('data-theme', applyTheme)
  })()
</script>
```

在你的 main.ts：

```ts
import { createApp } from 'vue'
import App from './App.vue'

// import theme
import '@icxy/theme/index.css'

createApp(App).mount('#app')
```

在你的切换主题按钮组件中：

```vue
<script setup>
import { useTheme } from '@icxy/theme'

const { toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">Toggle Theme</button>
</template>
```

## 自定义主题

如果你想自定义自己的主题，你可以使用 sass 的 `@forward` 指令修改默认主题。

```scss
@forward '@icxy/theme/src/vars' with (
  // 改变变量的前缀
  $prefix: 'o',
);
```

你可以在 [var.scss](<./src/_vars.scss>) 中查看可改变的内容。

## 工具

`@icxy/theme` 提供了一些 scss 工具给你。

### 获取 css 变量

`@icxy/theme` 会在 root 元素上挂载主题需要的 css 变量。这些变量都会可以某个前缀开头（默认：`x`）。

`get` 函数可以帮助你获取这些 css 变量，而你不需要关心变量的前缀。

例：

```scss
.box1 {
  width: 100px;
  height: 100px;
  border: 1px solid get('border');
  color: get('font');
}

.box2 {
  width: 100px;
  height: 100px;
  border: 1px solid get('bg-card');
  color: get('font-sub');

  &:hover {
    color: get('primary');
  }
}
```

你应该注意到了，某些变量会以 `bg`、`font`、`hover`、`border` 进行分类。所以 `@icxy/theme` 也提供了这些更直接的方法。

例如，上面的例子可以写成：

```scss
.box1 {
  width: 100px;
  height: 100px;
  border: 1px solid border();
  color: font();
}

.box2 {
  width: 100px;
  height: 100px;
  border: 1px solid bg('card');
  color: font('sub');

  &:hover {
    color: get('primary');
  }
}
```

### 命名空间

有时候，你想要在 css 类名中也使用相同的前缀。

`@icxy/theme` 提供了名为 `ns`、`ns-child` 的 scss mixin 帮助你创建 bem 风格的类名。

例：

```scss
@include ns('box') {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  @include ns-child('item') {
    // ...
  }
}
```

这等价于：

```css
.x-box {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .x-box__item {
    // ...
  }
}
```

利用它们你可以更轻松创建 bem 风格的类名，而又不需要关心类名的前缀。
