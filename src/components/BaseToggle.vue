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

  props: ['name', 'checked', 'label', 'full', 'spacing'],
};
</script>

<template>
<div :class="['toggle', { full, large: spacing === 'large' }]">
  <div class="label">{{ label }}</div>
  <div>
    <input
      :name="name"
      :id="id + '-switch'"
      class="checkbox"
      type="checkbox"
      :checked="checked"
      @input="$emit('change', !checked, $event.target.name)"
    />
    <label :for="id + '-switch'">Toggle</label>
  </div>
</div>
</template>

<style lang="scss" scoped>
.toggle {
  height: 20px;
  width: 120px;
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
  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    height: 16px;
    width: 16px;
    background: #fff;
    border-radius: 50%;
    transition: .3s;
  }
  &:active::after {
    width: 27px;
  }
}

.checkbox:checked {
  & + label {
    background: var(--orange);
  }
  & + label::after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
}
</style>
