<template>
  <div id="main-container" class="main-container">
    <MainHeader />
    <main class="main-content">
      <slot />
    </main>
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
