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
    classObject() {
      return {
        success: this.type === 'success',
        warning: this.type === 'warning',
        error: this.type === 'error',
      };
    },
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

    <div :class="['modal', classObject]">
      <section class="head bar">
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
          :green="type === 'success'"
          :orange="type === 'warning'"
          :red="type === 'error'"
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
  border: 3px solid var(--blue);
  border-radius: 10px;
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
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  }
  & .head {
    font-size: 18px;
  }
  & .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    text-align: left;
    line-height: 124%;
    & .prompt {
      margin-top: 16px;
    }
  }
  & .foot {
    justify-content: flex-end;
    & .primary {
      margin-left: 10px;
    }
  }
}
</style>
