<script>
import { mapMutations, mapActions } from 'vuex';
import ky from 'ky';
import { Input, Button } from '@/components';
import { NewFamily, Family } from '@/constants/authLevel.constants';

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
    validationError: false,
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
    ...mapMutations(['setAuthLevel']),
    ...mapActions(['setFamily']),

    setValidationError() {
      this.validationError = true;
    },

    async createFamily() {
      const { email, password } = this;

      if (this.canCreate) {
        this.validating = true;
        this.validationError = false;

        try {
          const res = await ky.post( '/auth/family/create', { json: { email, password } } );
          this.validating = false;
          const family = await res.json();
          this.setFamily( family );
          this.setAuthLevel( NewFamily );
          this.$router.push( '/family' );
        } catch (error) {
          this.validating = false;
          this.apiError = 'Failed to create family. Please try again';
        }
      }
    },

    async loginFamily() {
      const { email, password } = this;

      if (this.canLogin) {
        this.validating = true;
        this.validationError = false;

        try {
          const res = await ky.post( '/auth/family/login', { json: { email, password } } );
          this.validating = false;
          const family = await res.json();
          this.setFamily( family );

          if (family.users.length === 0) this.setAuthLevel( NewFamily );
          else this.setAuthLevel( Family );

          this.$router.push( '/family' );
        } catch (error) {
          this.validating = false;
          this.apiError = 'Username or password is incorrect';
        }
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

  components: { Input, Button },
};
</script>

<template>
  <div class="login">

    <div class="card">
      <header>Title</header>
      <div v-if="loginOrCreate === 'login'" class="inputs">
        <Input
          v-model="email"
          :placeholder="'Email'"
          errorMessage="Email must not be empty"
          :validation="value => !!value"
        />
        <Input
          v-model="password"
          :placeholder="'Password'"
          :validation="value => !!value"
          errorMessage="Password must not be empty"
          type="password"
          @enter="loginFamily"
        />
        <Button primary full :disabled="!canLogin" @click="loginFamily">Login</Button>
      </div>
      <div v-else class="inputs">
        <Input
          v-model="email"
          :placeholder="'Email'"
          :validation="value => !!value"
          errorMessage="Password must not be empty"
        />
        <Input
          v-model="password"
          :placeholder="'Password'"
          :validation="value => !!value"
          errorMessage="Password must not be empty"
          type="password"
        />
        <Input
          v-model="password2"
          :placeholder="'Confirm Password'"
          :validation="value => value === password"
          errorMessage="Passwords must match"
          type="password"
          @enter="createFamily"
        />
        <Button primary full :disabled="!canCreate" @click="createFamily">
          Create Family Account
        </Button>
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
  height: 600px;
  width: 400px;
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
