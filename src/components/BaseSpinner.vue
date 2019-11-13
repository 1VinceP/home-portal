<script>
export default {
  name: 'base-spinner',
  computed: {
    style() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
      };
    },
  },

  props: {
    height: [String, Number],
    width: [String, Number],
    fill: Boolean, // fills the containing area
    full: Boolean, // fills the entire screen
  },
};
</script>

<template>
  <div :class="{ fill, full }" :style="style">
    <div :class="['spinner', { lg: fill || full }]" />
  </div>
</template>

<style lang="scss" scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.container {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 99;
}

.fill {
  @extend .container;
  height: 100%;
}

.full {
  @extend .container;
  height: 100vh;
  top: 0;
  left: 0;
}

.spinner {
  height: 24px;
  width: 24px;
  border: 2px solid #fff;
  border-top: 2px solid var(--blue);
  border-radius: 50%;
  animation: spin 1.15s cubic-bezier(0.38, 0.27, 0.48, 0.87) infinite;
  // animation: spin 1s linear infinite;
  &.lg {
    height: 60px;
    width: 60px;
    border-width: 6px;
  }
}
</style>
