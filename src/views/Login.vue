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
    ...mapMutations(['setFamily']),

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
        this.setFamily( family );
        this.$router.push( '/family' );
      }
    },

    async loginFamily() {
      const { email, password } = this;
      this.validating = true;

      try {
        const res = await ky.post( '/auth/family/login', { json: { email, password } } );
        this.validating = false;
        const family = await res.json();
        this.setFamily( family );
        this.$router.push( '/dashboard' );
      } catch (error) {
        this.validating = false;
        this.apiError = 'Username or password is incorrect';
      }
    },

    switchMode(mode) {
      this.loginOrCreate = mode;
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

    <div class="card">
      <header>Title</header>
      <div v-if="loginOrCreate === 'login'" class="inputs">
        <Input :placeholder="'Email'" v-model="email" />
        <Input :placeholder="'Password'" v-model="password" :isPassword="true" />
        <button :disabled="!canLogin" @click="loginFamily()">Login to your Family Account</button>
      </div>
      <div v-else class="inputs">
        <Input :placeholder="'Email'" v-model="email" />
        <Input :placeholder="'Password'" v-model="password" :isPassword="true" />
        <Input :placeholder="'Confirm Password'" v-model="password2" :isPassword="true" />
        <button :disabled="!canCreate" @click="createFamily()">
          Create Family Account
        </button>
      </div>

      <div>{{ apiError }}</div>

      <footer>
        <button
          @click="switchMode('login')"
          :class="['mode-button', loginOrCreate === 'login' ? 'active' : 'inactive']"
        >
          Login
        </button>
        <button
          @click="switchMode('create')"
          :class="['mode-button', loginOrCreate === 'create' ? 'active' : 'inactive']"
        >
          Sign Up
        </button>
      </footer>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  // background: linear-gradient(#fff 70%, #ffd900);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  height: 75%;
  width: 25%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  box-shadow: var(--shadow);
  & header {
    height: 60px;
    width: 100%;
    background: var(--orange);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .inputs {
    width: 100%;
    padding: 0 16px;
    & div {
      margin-bottom: 16px;
    }
  }
  & footer {
    height: 60px;
    width: 100%;
    & .mode-button {
      height: 100%;
      width: 50%;
      border: none;
      &.active {
        background: var(--orange);
      }
      &.inactive {
        background: #ffd37c;
        box-shadow: inset var(--shadow);
      }
    }
  }
}
</style>
