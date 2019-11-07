<script>
export default {
  name: 'base-input',

  props: {
    label: String,
    value: [String, Number],
    type: String,
    name: String,
    autocomplete: String,
    placeholder: String,
    isSearch: Boolean,
    green: Boolean,
    orange: Boolean,
    red: Boolean,
  },
};
</script>

<template>
  <div class="input-container">
    <div v-show="label" class="label">{{ label }}</div>
    <input
      :name="name"
      :class="['input', { isSearch, hasLabel: !!label, green, orange, red }]"
      :value="value"
      @input="$emit('input', $event.target.value, $event.target.name, $event.target.type)"
      :placeholder="placeholder"
      :type="type"
      :autocomplete="autocomplete || (type === 'password' && 'off')"
    />
    <span v-show="isSearch" class="search-button" @click="$emit('click', value)">
      Search
    </span>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  & .label {
    height: 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--navy);
  }
  & .input {
    height: 40px;
    width: 500px;
    max-width: 100%;
    border: 1px solid var(--grey);
    border-radius: 50px;
    padding: 0 16px;
    font-size: 16px;
    outline: none;
    &:focus {
      border: 2px solid var(--blue);
    }
    &.isSearch {
      padding-right: 80px;
    }
    &.hasLabel {
      border-radius: 0 50px 50px 50px;
      margin-bottom: 16px;
    }
    &.green:focus { border: 2px solid var(--green); }
    &.orange:focus { border: 2px solid var(--orange); }
    &.red:focus { border: 2px solid var(--red); }
  }
  & .search-button {
    position: absolute;
    right: 16px;
    top: 10px;
    color: var(--blue);
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
