<template>
  <div class="main-container posts-page">
    <MainHeader />
    <div class="main-content">
      <div class="main-content__body col">
        <div class="post-page">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-blog',
  // components: { MainHeader, LeftMenu },
};
</script>

<style scoped>

</style>
