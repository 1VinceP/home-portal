<script>
export default {};
</script>

<template>
  <div class="family">
    <section class="family-list">
      Hello
    </section>

    <section class="details">
      <div class="title">Add Family Member</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.family {
  height: 100%;
  width: 100%;
  display: flex;
}

.family-list {
  height: 100%;
  width: 300px;
  border-right: 1px solid var(--navy);
}

.details {
  height: 100%;
  width: calc(100% - 300px);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  & .title {
    height: 60px;
    width: 100%;
    color: var(--navy);
    font-size: 30px;
  }
}
</style>
