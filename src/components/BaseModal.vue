<script>
import { Button, Input } from '@/components';

export default {
  name: 'base-modal',
  data: () => ({
    // input value is sent on primary Click
    // or on input Enter
    inputValue: '',
  }),

  computed: {
    success() { return this.type === 'success'; },
    warning() { return this.type === 'warning'; },
    error() { return this.type === 'error'; },
  },

  components: {
    Button, Input,
  },

  props: {
    show: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'default',
      validator: value => [
        'default', 'success', 'warning', 'error',
      ].indexOf(value) >= 0,
    },
    title: String,
    primary: { type: String, default: 'Ok' },
    secondary: String,
    promptTitle: Boolean,
    top: Boolean,
    prompt: Boolean,
    loading: Boolean,
    cancel: Boolean,
  },
};
</script>

<template>
  <div :class="['modal-mask', show ? 'open' : 'closed', { top }]">

    <div :class="['modal', { success, warning, error }]">
      <section :class="['head', 'bar', { success, warning, error }]">
        <h1>{{ title }}</h1>
      </section>

      <section class="body">
        <div>
          <slot />
        </div>
        <Input
          v-if="prompt"
          type="password"
          class="prompt"
          v-model="inputValue"
          @enter="$emit('enter', inputValue)"
        />
      </section>

      <!-- Not a foobar joke. Its a bar that acts as a footer -->
      <section class="foot bar">
        <Button sm v-show="!!secondary" @click="$emit('onSecondary')">{{ secondary }}</Button>
        <Button
          primary
          sm
          :green="success"
          :orange="warning"
          :red="error"
          @click="$emit('onPrimary', inputValue)"
        >
          {{ primary }}
        </Button>
      </section>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.modal-mask {
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  &.open {
    visibility: visible;
  }
  &.closed {
    visibility: hidden;
  }
  &.top {
    align-items: flex-start;
    padding-top: 60px;
  }
}

.modal {
  width: 600px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid var(--blue);
  border-radius: 3px;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
  visibility: inherit;
  &.success {
    border-color: var(--green);
  }
  &.warning {
    border-color: var(--orange);
  }
  &.error {
    border-color: var(--red);
  }
  & .bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  }
  & .head {
    height: 40px;
    font-size: 18px;
    background: var(--blue);
    color: #efefef;
    &.success { background: var(--green); }
    &.warning { background: var(--orange); }
    &.error { background: var(--red); }
  }
  & .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 28px 16px 8px 16px;
    text-align: left;
    line-height: 124%;
    font-size: 15px;
    & .prompt {
      margin-top: 16px;
    }
  }
  & .foot {
    height: 60px;
    justify-content: flex-end;
    & .primary {
      margin-left: 10px;
    }
  }
}
</style>
