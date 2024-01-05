<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'

const baseList = ['blue', 'gray', 'green', 'yellow', 'red']

function selectPrimaryColor(evt: MouseEvent) {
  const target = evt.target as HTMLElement

  [...target.parentNode.children].forEach(
    (el) => el.classList.remove('active')
  );
  target.classList.add('active')
}
</script>

<template>
  <TheHeader></TheHeader>
  <div class="wrapper">
    <main>
      <div class="box">
        <div
          v-for="(key, i) in baseList"
          class="color-item"
          tabindex="0"
          @focus="selectPrimaryColor"
          :class="{ active: i === 0 }"
          :style="{ '--color': `var(--x-${key})` }">
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  border-bottom: 1px dashed border();

  .color-item {
    width: 28px;
    height: 28px;
    margin: 8px;
    outline: 0;
    border-radius: 50%;
    background-color: var(--color);
    transition: all .3s;

    &:not(.active):hover {
      transform: scale(1.2);
    }
    &.active, &:focus {
      box-shadow: 0 0 0 2px bg('card'), 0 0 0 4px var(--color);
    }
  }
}

.wrapper {
  padding: 0 24px;
}
main {
  max-width: 1000px;
  height: 800px;
  margin: 0 auto 48px;

  background-color: bg('card');
  border-radius: 8px;
}
</style>
