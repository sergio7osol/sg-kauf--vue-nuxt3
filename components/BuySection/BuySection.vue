<template>
  <div class="buy-list">
    <AddNewBuy />
    <BuyList /> <!--:buys="dateBuys" -->
<!--        @save-product="(event) => $attrs.onSaveProduct(constructProductDataForIdentification(buy.date, buy.time, event))"-->
<!--        @remove-product="(event) => $attrs.onRemoveProduct(constructProductDataForIdentification(buy.date, buy.time, event))"-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddNewBuy from '@/components/BuySection/AddNewBuy';
import BuyList from '@/components/BuySection/BuyList';
// import Buy from './Buy.vue';

export default defineComponent({
  name: 'BuySection',
  components: { AddNewBuy, BuyList },
  setup() {

    return {};
  },
  // props: {},
  // emits: [],
  // methods: {
  //   constructProductDataForIdentification(date, time, product) {
  //     // product data + date + time - for full identification of the product
  //     return {
  //       date,
  //       time,
  //       product
  //     };
  //   }
  // },
});
</script>

<style scoped lang="scss">
  .buy-list {
    padding-top: 3.5rem;

    &__items {
      counter-reset: buy-counter;
      align-items: stretch;
      list-style-type: none;

    }
  }
</style>
