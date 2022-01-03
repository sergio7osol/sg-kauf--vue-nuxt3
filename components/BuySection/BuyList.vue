<template>
  <h4 class="buy-list__heading" v-show="activeDate.date">
    <div class="date-wrapper">
      {{ activeDate.date }}
      <svg class="bi bi-calendar2-event buy-list__heading-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
        <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
      </svg>
    </div>
    <Sum :date="activeDate.date" :amount="activeSum" :currency="activeCurrency" v-if="activeDate.date" /><!-- :date="activeDate" :amount="activeSum" :currency="activeCurrency" -->
  </h4>
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
  computed,
  defineComponent,
} from 'vue';
import useActiveDateBuys from '@/composables/useActiveDateBuys';
import { Currency } from '@/types/StaticBuyInfoTypes';

export default defineComponent({
  name: 'BuyList',
  setup() {
    const { activeDate } = useActiveDateBuys();
    const activeSum = computed(() => {
      if (!activeDate) return 0;
      const sum = activeDate?.value?.buys?.reduce((buySum, buy) => {
        const products = buy.products;
        let resultProductSum = null;
        if (products) {
          resultProductSum = products.reduce((productSum, product) => {
            const { price, weightAmount, discount } = product;
            let lastLetter = null;
            let discountNumber = null;
            let discountFactor = null;

            productSum.cost += price * weightAmount;

            if (typeof discount === 'string') {
              lastLetter = discount.slice(-1);
              if (lastLetter !== '%') {
                throw Error('The last symbol in the discount string value should be %. Program exits.');
              }
              discountNumber = Number(discount.slice(0, -1))
              discountFactor = (price/100) * discountNumber;
            } else if (typeof discount === 'number') {
              discountFactor = (price * discount/100);
            } else {
              throw Error('"discount" product prop should be either percentage of type "string" ("%" at the end) or "number". Program exits.');
            }
            productSum.discount += discountFactor * weightAmount;

            return productSum;
          }, {cost: 0, discount: 0});

          buySum.cost += resultProductSum.cost;
          buySum.discount += resultProductSum.discount;
        }

        return buySum;
      }, {cost: 0, discount: 0});

      return sum;
    });
    const activeCurrency = computed(() => { // TODO: make converting to one currency for all buys (in case they are different)
        const firstBuyCurrency: Currency | undefined = activeDate.value.buys && activeDate.value.buys[0].currency;
        return firstBuyCurrency ? firstBuyCurrency : '';
    });

    return {
      activeDate,
      activeSum,
      activeCurrency
    }
  },
  // props: {}
})
</script>

<style lang="scss">
@use '../../assets/styles/variables';

.buy-list {
  padding-top: 3.5rem;
  &__heading {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    &-icon {
      width: 1.5rem;
      height: 1.5rem;
      color: variables.$default-outline-color;
      margin-left: .5rem;
    }
  }
  &__items {
    counter-reset: buy-counter;
    align-items: stretch;
    list-style-type: none;

  }
}
</style>
