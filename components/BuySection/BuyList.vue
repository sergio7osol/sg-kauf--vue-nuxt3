<template>
  <h3>Buy list</h3>
  <ul class="list-group list-group-flush buy-list__items">
    <li class="buy" v-for="buy in activeDate.buys" :key="buy.date">
      <Buy :buyData="buy" />
    </li>
    <!-- @save-product="(event) => $attrs.onSaveProduct(constructProductDataForIdentification(buy.date, buy.time, event))" -->
    <!-- @remove-product="(event) => $attrs.onRemoveProduct(constructProductDataForIdentification(buy.date, buy.time, event))" -->
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import useActiveDateBuys from '@/composables/useActiveDateBuys';

export default defineComponent({
  name: 'BuyList',
  setup() {
    const { activeDate } = useActiveDateBuys();

    return {
      activeDate
    }
  },
  // props: {}
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
