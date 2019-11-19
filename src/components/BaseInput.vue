<script>
import EyeIcon from 'vue-material-design-icons/Eye.vue';
import EyeOffIcon from 'vue-material-design-icons/EyeOff.vue';
import { Button } from '@/components';

export default {
  name: 'base-input',
  data: () => ({
    showError: false,
    maskText: false,
  }),

  mounted() {
    if (this.type === 'password') this.maskText = true;
    if (this.autofocus) {
      this.$nextTick( () => this.$refs.input.focus() );
    }
  },

  methods: {
    changeMask() {
      this.maskText = !this.maskText;
    },

    onBlur() {
      if (!this.errorMessage || !this.errorOnBlur) return false;
      if (!this.validation) {
        console.error( 'You must provide a validation function to display an error' );
        return false;
      }

      this.showError = !this.validation(this.value);
      return null;
    },
  },

  components: { Button, EyeIcon, EyeOffIcon },

  props: {
    autocomplete: String,
    errorMessage: String,
    label: String,
    name: String,
    placeholder: String,
    type: String,
    value: [String, Number],
    buttonLabel: { type: String, default: 'Search' },
    autofocus: Boolean,
    textarea: Boolean,
    hasButton: Boolean,
    green: Boolean,
    orange: Boolean,
    red: Boolean,
    readonly: Boolean,
    isError: Boolean,
    errorOnBlur: { type: Boolean, default: true },
    validation: Function,
  },
};
</script>

<template>
  <div
    :class="[
      'input-container',
      { hasLabel: !!label, hasError: showError || isError }
    ]"
  >
    <div v-show="label" class="label">{{ label }}</div>

    <textarea v-if="textarea"
      :name="name"
      :class="[
        'textarea',
        {
          hasLabel: !!label,
          hasError: showError || isError,
          green,
          orange,
          red: red || showError,
          readonly,
        },
      ]"
      @input="$emit('input', $event.target.value, $event.target.name, $event.target.type)"
      @keyup.enter="$emit('enter', $event.target.value, $event.target.name)"
      @blur="onBlur"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
    />
    <input v-else
      ref="input"
      :name="name"
      :class="[
        'input',
        {
          hasButton: hasButton || type === 'password',
          hasIcons: type === 'password',
          hasLabel: !!label,
          hasError: showError || isError,
          green,
          orange,
          red: red || showError,
          readonly,
        },
      ]"
      @input="$emit('input', $event.target.value, $event.target.name, $event.target.type)"
      @keyup.enter="$emit('enter', $event.target.value, $event.target.name)"
      @blur="onBlur"
      :value="value"
      :placeholder="placeholder"
      :type="(type === 'password' && maskText) && 'password'"
      :autocomplete="autocomplete || (type === 'password' && 'off')"
      :readonly="readonly"
    />

    <div v-show="(showError || isError) && !readonly" class="errorMessage">
      {{ errorMessage }}
    </div>

    <span v-show="hasButton || type === 'password'" class="accessories">
      <Button v-show="hasButton && !readonly" @click="$emit('click', value)">
        {{ buttonLabel }}
      </Button>
      <span v-show="type === 'password'" class="icons" @click="changeMask">
        <EyeOffIcon v-if="maskText" />
        <EyeIcon v-else />
      </span>
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
  margin: 20px 0;
  &.hasLabel { margin-top: 30px; }
  &.hasError { margin-bottom: 30px; }
  & .label {
    // height: 20px;
    display: flex;
    align-items: center;
    position: absolute;
    top: -16px;
    left: 0px;
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
    &:focus { border: 2px solid var(--blue); }
    &.hasButton { padding-right: 80px; }
    &.hasIcons { padding-right: 100px; }
    &.hasLabel { border-top-left-radius: 0; }
    &.hasError {
      border: 1px solid var(--red);
      border-bottom-right-radius: 0;
    }
    &.hasLabel.hasError { border-radius: 0 20px; }
    &.green:focus { border: 2px solid var(--green); }
    &.orange:focus { border: 2px solid var(--orange); }
    &.red:focus { border: 2px solid var(--red); }
    &.readonly {
      border: none !important;
      cursor: default;
    }
  }
  & .textarea {
    height: 80px;
    width: 500px;
    max-width: 100%;
    border: 1px solid var(--grey);
    border-radius: 20px;
    padding: 4px 8px;
    font-size: 16px;
    outline: none;
    &:focus { border: 2px solid var(--blue); }
    &.hasLabel { border-top-left-radius: 0; }
    &.hasError {
      border: 1px solid var(--red);
      border-bottom-right-radius: 0;
    }
    &.hasLabel.hasError { border-radius: 0 20px; }
    &.green:focus { border: 2px solid var(--green); }
    &.orange:focus { border: 2px solid var(--orange); }
    &.red:focus { border: 2px solid var(--red); }
    &.readonly {
      border: none !important;
      cursor: default;
    }
  }
  & .accessories {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    & .icons {
      padding-top: 4px;
      margin-right: 16px;
      margin-left: -6px;
      color: var(--grey);
      cursor: pointer;
    }
  }
  & .errorMessage {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    right: 0px;
    bottom: -16px;
    color: var(--red);
    font-size: 13px;
  }
}
</style>
