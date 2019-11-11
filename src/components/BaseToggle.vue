<script>
import uuid from 'uuid/v4';

export default {
  name: 'base-toggle',
  data: () => ({
    id: null,
  }),

  mounted() {
    this.id = uuid();
  },

  props: {
    name: String,
    label: String,
    checked: Boolean,
    full: Boolean,
    disabled: Boolean,
    sm: Boolean,
    lg: Boolean,
    green: Boolean,
    orange: Boolean,
    red: Boolean,
  },
};
</script>

<template>
<div :class="['toggle', { full, sm, lg }]">
  <div class="label">{{ label }}</div>
  <div>
    <input
      :name="name"
      :id="id + '-switch'"
      class="checkbox"
      type="checkbox"
      :checked="checked"
      @input="$emit('change', !checked, $event.target.name)"
      :disabled="disabled"
    />
    <label :class="{ green, orange, red }" :for="id + '-switch'">Toggle</label>
  </div>
</div>
</template>

<style lang="scss" scoped>
.toggle {
  height: 20px;
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  &.sm { width: 120px; }
  &.lg { width: 160px; }
  &.full { width: 100%; }
}

.label {
  margin-right: 8px;
}

.checkbox {
  display: none;
}

label {
  height: 20px;
  width: 40px;
  background: var(--grey);
  display: block;
  border-radius: 10px;
  position: relative;
  text-indent: -9999px;
  cursor: pointer;
  transition: background .3s;
  &::after {
    height: 20px;
    width: 20px;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    border: 1px solid var(--grey);
    border-radius: 50%;
    transition: .3s;
  }
}

.checkbox:checked {
  & + label {
    background: var(--blue);
    &::after {
      border: 1px solid var(--blue);
      left: calc(100%);
      transform: translateX(-100%);
    }
    &.green {
      background: var(--green);
      &::after { border: 1px solid var(--green) }
    }
    &.orange {
      background: var(--orange);
      &::after { border: 1px solid var(--orange) }
    }
    &.red {
      background: var(--red);
      &::after { border: 1px solid var(--red) }
    }
  }
}

.checkbox[disabled] {
  & + label {
    background: var(--grey-faded);
    cursor: default;
  }
  &:checked {
    & + label {
      opacity: 0.6;
    }
  }
}
</style>
