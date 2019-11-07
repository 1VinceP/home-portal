<script>
import { mapMutations } from 'vuex';
import Input from '@/components/BaseInput.vue';
import Toggle from '@/components/BaseToggle.vue';

export default {
  name: 'family-form',
  data: () => ({}),

  props: ['user', 'isNew', 'title'],

  methods: {
    ...mapMutations( 'users', ['editUser', 'editNewUser'] ),

    edit( value, prop, type ) {
      let v = value;
      if (type === 'number') v = Number(v);
      if (this.isNew) {
        this.editNewUser({ prop, value: v });
      } else {
        this.editUser({ prop, value: v });
      }
    },
  },

  components: { Input, Toggle },
};
</script>

<template>
<div class="family-form">
  <div class="title">{{ title }}</div>
  <div />
  <div />

  <div class="grid-image"><div /></div>

  <div class="grid-input">
    <Input name="name" label="Name" :value="user.name" @input="edit" />
  </div>
  <div class="grid-input">
    <Input
      name="password"
      label="Password"
      :value="user.password"
      @input="edit"
      autocomplete="off"
    />
  </div>
  <div class="grid-input">
    <Input type="number" name="points" label="Points" :value="user.points" @input="edit" />
  </div>

  <div class="spacer" />
  <h1 class="divider">Auth Level</h1>
  <div class="grid-toggle">
    <Toggle name="admin" label="Admin" :checked="user.admin" @change="edit" />
  </div>
  <div class="grid-toggle">
    <Toggle name="manager" label="Manager" :checked="user.manager" @change="edit" />
  </div>

  <div class="spacer" />
  <h1 class="divider">Permissions</h1>
  <h1 class="divider">Can Edit Own Properties</h1>
  <div class="grid-toggle three"><Toggle label="Name" /></div>
  <div class="grid-toggle three"><Toggle label="Password" /></div>
  <div class="grid-toggle three"><Toggle label="Image" /></div>
  <div class="grid-toggle three"><Toggle label="Settings" /></div>

  <div class="spacer" />
  <h1 class="divider two">Can Edit Other's Properties</h1>
  <div class="grid-toggle three"><Toggle label="Name" /></div>
  <div class="grid-toggle three"><Toggle label="Password" /></div>
  <div class="grid-toggle three"><Toggle label="Points" /></div>

  <div class="spacer" />
</div>
</template>

<style lang="scss" scoped>
.family-form {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  // grid-template-rows: 100px;
  & .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: var(--navy);
  }
  & .grid-image {
    grid-row: 2 / span 3;
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

.spacer {
  grid-column: 1 / span 3;
  height: 60px;
}

.two {
  grid-column: 2;
}

.three {
grid-column: 3;
margin: 16px 0;
}
</style>
