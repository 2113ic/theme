<script setup>
import Theme from './Theme.vue';
import LogoSvg from '@/assets/Theme.svg?raw'


</script>

<template>
  <header>
    <div class="head">
      <h1 v-html="LogoSvg"></h1>
      <Theme></Theme>
    </div>
  </header>
</template>

<style lang="scss">
header {
  padding: 0 24px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    height: 88px;
    margin: 0 auto;
  }
}

h1 {
  display: inline-block;
  margin: 0;
  font-size: 0;
}
</style>
