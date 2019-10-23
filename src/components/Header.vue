<script>
import Search from './BaseSearch.vue';

export default {
  name: 'header',
  data: () => ({
    search: '',
  }),
  components: { Search },
};
</script>

<template>
  <header>
    <div class="title">Dashboard</div>
    <Search :value="search" />
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
