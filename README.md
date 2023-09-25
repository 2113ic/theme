# Theme

## Installation

```bash
pnpm add @icxy/theme
```

## Usage

Add the following script to your index.html head tag:

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
    html.setAttribute('theme', applyTheme)
  })()
</script>
```

In your vue toggle-theme component:

```vue
<script setup>
import { useTheme } from '@2113ic/theme'

const { toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">Toggle Theme</button>
</template>
```
