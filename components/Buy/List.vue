<script setup lang="ts">
  import { ShallowUnwrapRef } from 'vue';
  import SgKaufState from '@/types/SgKaufState';

  const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { getRangeSum: Function } };
  const { activeDate } = useActiveDateBuys();
</script> 
 
<template>
  <h4 class="buy-list__heading" v-show="activeDate.date">
    <div class="date-wrapper">
      {{ activeDate.date }}
      <SvgCalendar />
    </div>
    <Sum />
    <SumCalc /> 
  </h4>
  <ul class="buy-section__list item-list">
    <li class="buy" v-for="buy in activeDate.buys" :key="buy.date">
      <BuyItem :buy-data="buy" />
    </li>
  </ul>
</template>

<style lang="scss">
@use '../../assets/styles/variables';

.buy-list {
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
