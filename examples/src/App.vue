<script setup lang="ts">
import { useTheme } from '@icxy/theme'

const { toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">toggle theme</button>
</template>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
