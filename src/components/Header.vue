<script>
import startCase from 'lodash/startCase';
import { Input } from '@/components';

export default {
  name: 'base-header',
  data: () => ({
    search: '',
  }),

  computed: {
    title() { return startCase(this.$route.name); },
  },

  components: { Input },
};
</script>

<template>
  <header>
    <div class="title">{{ title }}</div>
    <Input v-model="search" :isSearch="true" />
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-top: var(--padding);
  padding-right: var(--padding);
}

.title {
  padding-left: 16px;
  font-size: 36px;
  color: var(--navy);
}
</style>
