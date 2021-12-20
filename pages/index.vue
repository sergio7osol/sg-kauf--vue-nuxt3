<template>
  <div class="main-content__left-menu">
    <LeftMenu :shoppingDates="shoppingDates" />
  </div>
  <div class="main-content__body col">
    <h1>Start page</h1>
    <!-- <buy-list :dateBuys="activeDateBuys" @save-product="saveProduct" @remove-product="removeProduct" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeftMenu from '@/components/LeftMenu/LeftMenu';
import useShoppingDates from '~/composables/useShoppingDates';

// :dates='shoppingDates' :selected-date='activeDate' @date-selected='getDate' :key='Date.now()'
export default defineComponent({
  name: 'main-page',
  components: { LeftMenu },
  setup() {
    const { shoppingDates, getShoppingDates } = useShoppingDates();

    return {
      shoppingDates,
      getShoppingDates,
    }
  },
  created: function () {
    // this.getAllShoppingDates();
    // this.getProductNames();
    // this.getProductDefaults();
  }
});
</script>

<style lang="scss">
@use 'assets/styles/variables' as *;

.main-content {
  &__left-menu {
    flex-grow: 0;
    height: 100%;
    overflow-y: auto;
    padding-right: 1.1rem;
    position: relative;
    z-index: 1;
    background-color: $default-menu-bg-color;
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
