<script setup lang="ts">
  import store, { storeInjectionKey } from '@/store/default';

  provide(storeInjectionKey, store); 
</script>  

<template>
  <div class="main-content__left-menu">
    <LeftMenu />
  </div>
  <div class="main-content__body col">
    <BuySection />
  </div>
</template>


 
<style lang="scss">
@use 'assets/styles/variables';

.main-content {
  padding-top: 3.5rem;
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.main-content {
  &__left-menu {
    flex-grow: 0;
    height: 100%;
    overflow-y: auto;
    padding-right: 1.1rem;
    position: relative;
    z-index: 1;
    background-color: variables.$default-menu-bg-color;
    //&::before {
    //  content: "";
    //  position: absolute;
    //  background-color: #343a40;
    //  top: 0;
    //  bottom: 0;
    //  right: 0; /* 1rem */
    //  left: 0;
    //}
  }
  &__body {
    flex-grow: 1;
    padding: .5rem 1rem;
    overflow: auto;
    background: url(~~/assets/images/dotted-bg.webp) no-repeat top left transparent;
    background-size: cover;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -1.1rem;
      width: 1.1rem;
      bottom: 0;
      background-color: #fff;
      z-index: 0;
    }
  }
}
</style>
