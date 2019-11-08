<script>
export default {
  name: 'base-input',
  data: () => ({
    showError: false,
  }),

  methods: {
    onBlur() {
      if (!this.errorMessage) return false;
      if (!this.validation) {
        console.error( 'You must provide a validation function to display an error' );
        return false;
      }
      this.showError = !this.validation(this.value);
      return true;
    },
  },

  props: {
    label: String,
    value: [String, Number],
    type: String,
    name: String,
    errorMessage: String,
    autocomplete: String,
    placeholder: String,
    isSearch: Boolean,
    green: Boolean,
    orange: Boolean,
    red: Boolean,
    validation: Function,
  },
};
</script>

<template>
  <div class="input-container">
    <div v-show="label" class="label">{{ label }}</div>
    <input
      :name="name"
      :class="[
        'input',
        {
          isSearch,
          hasLabel: !!label,
          hasError: !!showError,
          green,
          orange,
          red: red || showError,
        },
      ]"
      @input="$emit('input', $event.target.value, $event.target.name, $event.target.type)"
      @keyup.enter="$emit('enter', $event.target.value, $event.target.name)"
      @blur="onBlur"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      :autocomplete="autocomplete || (type === 'password' && 'off')"
    />
    <div v-show="showError" class="errorMessage">{{ errorMessage }}</div>

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
      border-top-left-radius: 0;
      margin-bottom: 16px;
    }
    &.hasError {
      border: 1px solid var(--red);
      border-bottom-right-radius: 0;
      margin-bottom: 6px;
    }
    &.hasLabel.hasError {
      border-radius: 0 20px;
    }
    &.green:focus { border: 2px solid var(--green); }
    &.orange:focus { border: 2px solid var(--orange); }
    &.red:focus { border: 2px solid var(--red); }
  }
  & .errorMessage {
    height: 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: var(--red);
    font-size: 13px;
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
