<script>
import { mapMutations } from 'vuex';
import ky from 'ky';
import Input from '@/components/BaseInput.vue';

export default {
  name: 'login',
  data: () => ({
    loginOrCreate: 'login',
    email: '',
    password: '',
    password2: '',
    validating: false,
    apiError: '',
    navError: '',
  }),

  computed: {
    canCreate() {
      return (this.password === this.password2) && this.password && this.email && !this.validating;
    },
    canLogin() {
      return this.email && this.password && !this.validating;
    },
  },

  methods: {
    ...mapMutations(['setNewFamily', 'setFamily']),

    async createFamily() {
      const { email, password } = this;
      this.validating = true;

      const res = await ky.post( '/auth/family/create', { json: { email, password } } );
      this.validating = false;

      // TODO: try/catch?
      if (!res.ok) {
        this.apiError = 'There was a problem';
      } else {
        const family = await res.json();
        this.setNewFamily( family[0] );
        this.$router.push( '/family' );
      }
    },

    async loginFamily() {
      const { email, password } = this;
      this.validating = true;

      const res = await ky.post( '/auth/family/login', { json: { email, password } } );
      this.validating = false;

      // TODO: try/catch?
      if (!res.ok) {
        this.apiError = 'There was a problem loggin you in';
      } else {
        const family = await res.json();
        this.setFamily( family[0] );
        this.$router.push( '/dashboard' );
      }
    },

    switchMode() {
      this.loginOrCreate = this.loginOrCreate === 'login' ? 'create' : 'login';
    },
  },

  beforeRouteEnter( to, from, next ) {
    if (to.query.redirectFrom) {
      next(vm => {
        // eslint-disable-next-line no-param-reassign
        vm.navError = 'You must be logged in to view that page.';
      });
    }

    next();
  },

  components: { Input },
};
</script>

<template>
  <div class="login">
    <div v-if="loginOrCreate === 'login'" class="card">
      <Input :placeholder="'Email'" v-model="email" />
      <Input :placeholder="'Password'" v-model="password" :isPassword="true" />
      <button :disabled="!canLogin" @click="loginFamily()">Login to your Family Account</button>
    </div>
    <div v-else class="card">
      <Input :placeholder="'Email'" v-model="email" />
      <Input :placeholder="'Password'" v-model="password" :isPassword="true" />
      <Input :placeholder="'Confirm Password'" v-model="password2" :isPassword="true" />
      <button :disabled="!canCreate" @click="createFamily()">
        Create Family Account
      </button>
    </div>
    <button @click="switchMode()">{{ loginOrCreate === 'login' ? 'Create' : 'Login' }}</button>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: var(--shadow);
}
</style>
