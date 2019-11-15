<script>
import Spinner from './BaseSpinner.vue';

export default {
  name: 'base-button',

  components: { Spinner },

  props: {
    id: String,
    name: String,
    primary: Boolean,
    full: Boolean,
    lg: Boolean,
    sm: Boolean,
    green: Boolean,
    orange: Boolean,
    red: Boolean,
    disabled: Boolean,
    loading: Boolean,
  },
};
</script>

<template>
  <button
    :id="id"
    :name="name"
    :class="['button', { primary, full, lg, sm, green, orange, red }]"
    @click="$emit('click', $event.target.name)"
    :disabled="disabled || loading"
  >
    <Spinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
.button {
  height: 40px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 3px;
  padding: 0 20px;
  color: var(--blue);
  font-size: 16px;
  cursor: pointer;
  &:active {
    background: var(--blue-faded);
  }
  &.primary {
    background: var(--blue);
    color: #fff;
    &:hover { background: #1ebdfc; }
    &:active { background: var(--blue); }
    &[disabled] {
      background: var(--grey);
      color: #fff;
    }
  }
  &.full {
    width: 100%;
  }
  &.lg {
    height: 46px;
    font-size: 18px;
  }
  &.sm {
    height: 30px;
    font-size: 14px;
  }
  &.green {
    background: var(--green);
    color: #fff;
    &:hover { background: lighten(#17AE82, 2%); }
    &:active { background: var(--green); }
    &[disabled] {
      background: var(--grey);
      color: #fff;
    }
  }
  &.orange {
    background: var(--orange);
    color: #fff;
    &:hover { background: #ff9100; }
    &:active { background: var(--orange); }
    &[disabled] {
      background: var(--grey);
      color: #fff;
    }
  }
  &.red {
    background: var(--red);
    color: #fff;
    &:hover { background: #db4256; }
    &:active { background: var(--red); }
    &[disabled] {
      background: var(--grey);
      color: #fff;
    }
  }
  &[disabled] {
    color: var(--grey);
    cursor: default;
  }
}
</style>
