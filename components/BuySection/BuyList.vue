<template>
  <h3>Buy list</h3>
  <ul class="list-group list-group-flush buy-list__items">
    <li class="buy" v-for="(buy, index) in buys">
      <Buy :buyData="buy" :key="buy.date" />
    </li>
    <!--        @save-product="(event) => $attrs.onSaveProduct(constructProductDataForIdentification(buy.date, buy.time, event))"-->
    <!--        @remove-product="(event) => $attrs.onRemoveProduct(constructProductDataForIdentification(buy.date, buy.time, event))"-->
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BuyInfo from '@/types/BuyInfo';

export default defineComponent({
  name: 'BuyList',
  setup() {

    return {
    }
  },
  props: {
    buys: {
      type: Array as PropType<BuyInfo[]>,
    }
  }
})
</script>

<style lang="scss">
.buy-list {
  padding-top: 3.5rem;
  &__items {
    counter-reset: buy-counter;
    align-items: stretch;
    list-style-type: none;

  }
}
</style>
