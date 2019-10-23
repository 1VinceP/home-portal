<script>
export default {
  name: 'search',
  props: ['value'],
};
</script>

<template>
  <div class="search-container">
    <input class="search" :value="value" />
    <span class="search-button">Search</span>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  height: 40px;
  width: 500px;
  align-self: flex-end;
  position: relative;
  & .search {
    height: 40px;
    width: 500px;
    border: 1px solid var(--grey);
    border-radius: 50px;
    padding: 0 80px 0 16px ;
    font-size: 16px;
    outline: none;
    transition: all .15s ease-in-out;
    &:focus {
      border: 2px solid var(--orange);
    }
  }
  & .search-button {
    position: absolute;
    right: 16px;
    top: 11px;
    color: var(--blue);
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
