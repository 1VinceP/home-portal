<script>
import { mapMutations } from 'vuex';
import { Input } from '@/components';

export default {
  name: 'user-login',
  data: () => ({
    password: '',
    mPassword: '',
    validationFailed: false,
    attempts: 0,
    showModal: false,
  }),

  methods: {
    ...mapMutations(['setUser']),

    login() {
      if (this.password === this.displayedUser.password) {
        this.validationFailed = false;
        this.setUser( this.displayedUser );
        this.$router.push( '/dashboard' );
      } else {
        this.attempts += 1;
        this.validationFailed = true;
      }
    },
  },

  props: ['displayedUser'],

  components: { Input },
};
</script>

<template>
  <div class="user-login">
    <h1>{{ displayedUser.name }}</h1>
    <Input
      hasButton
      v-model="password"
      placeholder="Password"
      errorMessage="Incorrect password"
      buttonLabel="Login"
      :isError="validationFailed"
      :errorOnBlur="false"
      @click="login"
      @enter="login"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  & h1 {
    margin-bottom: 30px;
    font-size: 24px;
  }
}
</style>
