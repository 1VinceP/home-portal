<script>
import uuid from 'uuid/v4';

export default {
  name: 'base-toggle',
  data: () => ({
    id: null,
  }),

  computed: {
    size() {
      return { width: `${this.width}px` };
    },
  },

  mounted() {
    this.id = uuid();
  },

  props: {
    name: String,
    label: String,
    spacing: String,
    width: { type: Number, default: 140 },
    checked: Boolean,
    full: Boolean,
    disabled: Boolean,
    green: Boolean,
    orange: Boolean,
    red: Boolean,
  },
};
</script>

<template>
<div :class="['toggle', { full, large: spacing === 'large' }]" :style="size">
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
  // width: computed
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  &.full {
    width: 100%;
    justify-content: space-between;
  }
  &.large {
    width: 140px;
    justify-content: space-between;
  }
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
    &::after {
      height: 19px;
      width: 19px;
    }
  }
  &:checked {
    & + label {
      opacity: 0.6;
    }
  }
}
</style>
