<script setup lang="ts">
import { useNameSpace } from '@/utils'

interface BtnProps {
  variant?: 'circle' | 'plain' | 'outline' | 'default'
}

const props = withDefaults(
  defineProps<BtnProps>(),
  {
    variant: 'default'
  }
)
const ns = useNameSpace('btn')
</script>

<template>
  <button :class="ns(props.variant)">
    <slot>button</slot>
  </button>
</template>

<style lang="scss">
@include ns('btn') {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  outline: 0;
  border: 0;
  padding: 4px 8px;
  background-color: get('bg-pop');
  color: inherit;
  border: 1px solid get('border-btn');
  border-radius: 4px;

  svg {
    vertical-align: bottom;
  }

  &:hover {
    background-color: get('hover-darker');
  }

  &._circle {
    padding: 6px;
    border-radius: 50%;
  }
}
</style>
