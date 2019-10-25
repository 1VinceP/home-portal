<script>
export default {
  name: 'base-input',
  props: ['value', 'isSearch', 'isPassword', 'placeholder'],
};
</script>

<template>
  <div class="input-container">
    <input
      :class="['input', { isSearch }]"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      :type="isPassword && 'password'"
    />
    <span v-show="isSearch" class="search-button">Search</span>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  height: 40px;
  width: 500px;
  max-width: 100%;
  position: relative;
  & .input {
    height: 40px;
    width: 500px;
    max-width: 100%;
    border: 1px solid var(--grey);
    border-radius: 50px;
    padding: 0 16px;
    font-size: 16px;
    outline: none;
    transition: all .15s ease-in-out;
    &:focus {
      border: 2px solid var(--orange);
    }
    &.isSearch {
      padding-right: 80px;
    }
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
