<script>
export default {
  name: 'base-button',

  props: {
    id: String,
    name: String,
    primary: Boolean,
    lg: Boolean,
    green: Boolean,
    orange: Boolean,
    red: Boolean,
    disabled: Boolean,
  },
};
</script>

<template>
  <button
    :id="id"
    :name="name"
    :class="['button', { primary, lg, green, orange, red }]"
    @click="$emit('click', $event.target.name)"
    :disabled="disabled"
  >
    <slot />
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
    &:active { background: var(--navy); }
    &[disabled] {
      background: var(--grey);
      color: #fff;
    }
  }
  &.lg {
    height: 46px;
    font-size: 18px;
  }
  &.green { color: var(--green); }
  &.orange { color: var(--orange); }
  &.red { color: var(--red); }
  &[disabled] {
    color: var(--grey);
    cursor: default;
  }
}
</style>
