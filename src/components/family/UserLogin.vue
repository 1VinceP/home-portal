<script>
import { Button, Input } from '@/components';

export default {
  name: 'user-login',
  data: () => ({
    password: '',
    validationFailed: false,
  }),

  props: ['displayedUser'],

  components: { Input, Button },
};
</script>

<template>
  <div class="user-login">
    <h1>{{ displayedUser.name }}</h1>
    <Input
      placeholder="Password"
      v-model="password"
      errorMessage="Incorrect password"
      :validation="value => value === displayedUser.password"
    />
    <Button>Login</Button>
  </div>
</template>

<style lang="scss" scoped>
.user-login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
