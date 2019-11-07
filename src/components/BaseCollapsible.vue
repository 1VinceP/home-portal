<script>
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';

export default {
  name: 'base-collapsible',
  data: () => ({
    isOpen: false,
  }),

  computed: {
    gridSize() {
      const childCount = this.$slots.default
        ? this.$slots.default.length
        : 0;
      const rows = this.rows || (Math.ceil(childCount / this.cols));
      return {
        height: this.isOpen ? `${rows * this.rowHeight}px` : 0,
        gridTemplateColumns: `repeat(${this.cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, ${this.rowHeight}px)`,
        transition: 'all .3s',
      };
    },
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },

  components: { ChevronUpIcon, ChevronDownIcon },

  props: {
    label: String,
    subtitle: String,
    rows: Number,
    cols: { type: Number, default: 1 },
    rowHeight: { type: Number, default: 50 },
    green: Boolean,
    orange: Boolean,
    red: Boolean,
  },
};
</script>

<template>
  <div class="collapsible">
    <div :class="['head', 'closed', { open: isOpen, green, orange, red }]" @click="toggle">
      <h1 :class="['title', { green, orange, red }]">{{ label }}</h1>
      <div class="subtitle">
        <p>{{ subtitle }}</p>
        <ChevronUpIcon v-if="isOpen" />
        <ChevronDownIcon v-else />
      </div>
    </div>

    <div :class="['container', isOpen ? 'open' : 'closed']" :style="gridSize">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$transition: all .3s ease-in-out;

.collapsible {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.head {
  height: 36px;
  width: 90%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border: 1px solid var(--grey);
  border-top: 2px solid var(--blue);
  border-radius: 10px;
  cursor: pointer;
  transition: $transition;
  &.green { border-top: 2px solid var(--green); }
  &.orange { border-top: 2px solid var(--orange); }
  &.red { border-top: 2px solid var(--red); }
  &.closed {
    border-radius: 10px;
  }
  &.open {
    border-radius: 10px 10px 0 0;
  }
  & .title {
    color: var(--blue);
    &.green { color: var(--green); }
    &.orange { color: var(--orange); }
    &.red { color: var(--red); }
  }
  & .subtitle {
    height: 100%;
    display: flex;
    align-items: center;
    color: var(--navy);
    font-size: 14px;
    & p { margin-right: 8px; }
  }
}

.container {
  width: 90%;
  display: grid;
  border: 1px solid var(--grey);
  border-top: none;
  transition: $transition;
  &.closed {
    min-height: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
  }
  &.open {
    min-height: 50px;
    visibility: visible;
    opacity: 1;
  }
}
</style>
