<template>
  <div class="main-container">
    <MainHeader />
    <div class="main-content">
      <div class="main-content__body col">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .main-content {
    &__body {
      background: url("/assets/images/road-bg.jpg") no-repeat center center transparent;
      background-size: cover;
    }
  }
</style>
