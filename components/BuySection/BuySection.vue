<template>
  <div class="buy-list">
    <h2>BuySection</h2>
    <AddNewBuy />
    <BuyList :buys="dateBuys" />
<!--        @save-product="(event) => $attrs.onSaveProduct(constructProductDataForIdentification(buy.date, buy.time, event))"-->
<!--        @remove-product="(event) => $attrs.onRemoveProduct(constructProductDataForIdentification(buy.date, buy.time, event))"-->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BuyInfo from '@/types/BuyInfo';
// import Buy from './Buy.vue';

export default defineComponent({
  name: 'BuySection',
  data() {
    return {
      // emptyBuy: {
      //   date: "",
      //   time: "00:00",
      //   currency: "EUR",
      //   country: "Germany",
      //   address: {
      //       city: "",
      //       index: "",
      //       street: "",
      //       houseNumber: ""
      //   },
      //   payMethod: "EC card",
      //   shopName: "REWE",
      //   products: []
      // }
    }
  },
  props: {
    dateBuys: {
      type: Array as PropType<BuyInfo[]>
    }
  },
  emits: [],
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
