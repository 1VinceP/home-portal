<script>
import { mapMutations } from 'vuex';
import Input from '@/components/BaseInput.vue';

export default {
  name: 'family-form',
  data: () => ({}),

  props: ['user', 'isNew'],

  methods: {
    ...mapMutations( 'users', 'editUser' ),
  },

  components: { Input },
};
</script>

<template>
<div class="family-form">
  <div class="grid-image"><div /></div>

  <div class="grid-input">
    <Input label="Name" v-model="user.name" />
  </div>
  <div class="grid-input">
    <Input label="Password" />
  </div>
  <div class="grid-input">
    <Input label="Points" :value="user.points" />
  </div>

  <h1 class="divider">Auth Level</h1>
  <div class="grid-toggle">Admin <input type="checkbox" /></div>
  <div class="grid-toggle">Manager <input type="checkbox" /></div>

  <h1 class="divider">Permissions</h1>
  <div class="grid-toggle">Can Edit Self<input type="checkbox" /></div>
</div>
</template>

<style lang="scss" scoped>
.family-form {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px;
  & .grid-image {
    grid-row: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: center;
    & div {
      height: 200px;
      width: 200px;
      background: var(--grey);
      border-radius: 10px;
    }
  }
  & .grid-input {
    width: 100%;
    grid-column: 2 / span 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .divider {
    margin: 16px 0;
    color: var(--navy);
  }
  & .grid-toggle {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
