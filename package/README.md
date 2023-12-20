# Theme

> Add color themes to your website.

## Features

- Dark mode
- CSS class control for theme switching

## install

```bash
pnpm add @icxy/theme
```

## Usage

Here is an example using a Vue application.

Of course, you can also use it in native applications or other frameworks; it is allowed.

Add the following code to the head tag of your index.html:

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

In your main.ts:

```ts
import { createApp } from 'vue'
import App from './App.vue'

// import theme
import '@icxy/theme/index.css'

createApp(App).mount('#app')
```

In your theme-switching button component:

```vue
<script setup>
import { useTheme } from '@icxy/theme'

const { toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">Toggle Theme</button>
</template>
```

## Custom Themes

If you want to customize your own theme, you can use the `@forward` directive in Sass to modify the default theme.

```scss
@forward '@icxy/theme/src/vars' with (
  // Change the variable prefix
  $prefix: 'o',
);
```

You can see the customizable content in [var.scss](<./src/_vars.scss>).

## Tools

`@icxy/theme` provides some SCSS tools for you.

### Get CSS Variables

`@icxy/theme` will mount the CSS variables needed for the theme on the root element. These variables will all start with a certain prefix (default: `x`).

The `get` function can help you retrieve these CSS variables without worrying about the prefix.

Example:

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

You should notice that some variables are classified with `bg`, `font`, `hover`, `border`. So `@icxy/theme` also provides these more direct methods.

For example, the above example can be written as:

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

### Namespace

Sometimes, you want to use the same prefix in CSS class names.

`@icxy/theme` provides SCSS mixins named `ns` and `ns-child` to help you create BEM-style class names.

Example:

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

This is equivalent to:

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

Using these, you can easily create BEM-style class names without worrying about the class name prefix.
