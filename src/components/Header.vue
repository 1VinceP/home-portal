<script>
import Input from './BaseInput.vue';

export default {
  name: 'base-header',
  data: () => ({
    search: '',
  }),
  components: { Input },
};
</script>

<template>
  <header>
    <div class="title">Dashboard</div>
    <Input v-model="search" :isSearch="true" />
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-size: 36px;
  color: var(--navy);
}
</style>
