<script>
export default {
  name: 'home',
  data: () => ({
    search: '',
    // sIndex: 1,
    // sItems: ['Rewards', 'Users', 'Tasks', 'Meals'],
    sDisplay: '',
    // searchRotation: true,
  }),

  mounted() {
    // setInterval(() => {
    //   this.sDisplay = this.sItems[this.sIndex];
    //   this.sIndex = this.sIndex === this.sItems.length - 1 ? 0 : this.sIndex + 1;
    // }, 8000);
  },
};
</script>

<template>
  <div class="home">
    <div class="search-container">
      <!-- <input class="search" :placeholder="`Find ${this.sDisplay}`" :value="search" /> -->
      <input class="search" :value="search" />
      <span class="search-button">Search</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

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
    right: 12px;
    top: 7px;
    border: 1px solid transparent;
    color: var(--blue);
    font-size: 18px;
    padding: 3px;
    cursor: pointer;
    transition: all .03s ease-in-out;
    &:active {
      border: 1px solid var(--blue);
      border-radius: 3px;
    }
  }
}

</style>
