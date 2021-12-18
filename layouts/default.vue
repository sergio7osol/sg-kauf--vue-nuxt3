<template>
  <div class="main-container">
    <MainHeader />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.main-content {
  padding-top: 3.5rem;
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
