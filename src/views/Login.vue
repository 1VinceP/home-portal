<script>
import { mapMutations } from 'vuex';
import ky from 'ky';
import Input from '@/components/BaseInput.vue';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    password2: '',
    apiError: '',
    navError: '',
  }),

  computed: {
    canCreate() {
      return (this.password === this.password2) && this.password;
    },
  },

  methods: {
    ...mapMutations(['setNewFamily']),

    async createFamily() {
      const { name, email, password } = this;
      const res = await ky.post( '/auth/family/create', { json: { name, email, password } } );
      console.log(res);
      if (!res.ok) {
        this.apiError = 'There was a problem';
      } else {
        const family = await res.json();
        this.setNewFamily( family[0] );
        console.log(family);
        this.$router.push( '/family' );
      }
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
    <div class="login-card">
      <Input :placeholder="'Email'" v-model="email" />
      <Input :placeholder="'Password'" v-model="password" :isPassword="true" />
      <Input :placeholder="'Password'" v-model="password2" :isPassword="true" />
      <button :disabled="!canCreate" @click="createFamily()">
        Create Family Account
      </button>
    </div>
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

.login-card {
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: var(--shadow);
}
</style>
