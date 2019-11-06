<script>
import Input from '@/components/BaseInput.vue';

export default {
  name: 'family-form',
  data: () => ({}),

  props: ['user', 'isNew'],

  components: { Input },
};
</script>

<template>
<div class="family-form">
  <Input label="Name" />
  <Input label="Password" />
  <Input label="Starting Points" />
</div>
</template>

<style lang="scss" scoped>
.family-form {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
