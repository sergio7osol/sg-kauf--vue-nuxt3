<template>
  <table class="table table-striped product-list__items mt-3 buy-table">
    <caption class="buy-table__caption">
      {{ buyData.date }}
      {{ buyData.time }},
      {{ buyData.address.country }}
      {{ buyData.address.index }}
      {{ buyData.address.city }}
      {{ buyData.address.street }}
      {{ buyData.address.houseNumber }},
      {{ buyData.shopName }}
      - {{ buyData.payMethod }} -
      {{ buyData.currency }}
      <button class="btn btn--icon-remove" @click="remove(buyData)"></button>
    </caption>
    <thead class="product product--default buy-table__head">
    <tr class="buy-table__row buy-table__head-row--head">
      <th class="buy-table__cell buy-table__head-cell--head">Name</th>
      <th class="buy-table__cell buy-table__head-cell--head">Price</th>
      <th class="buy-table__cell buy-table__head-cell--head">Weight/Amount</th>
      <th class="buy-table__cell buy-table__head-cell--head">Measure</th>
      <th class="buy-table__cell buy-table__head-cell--head">Description</th>
      <th class="buy-table__cell buy-table__head-cell--head">Discount</th>
    </tr>
    </thead>
    <tbody class="product">
    <tr v-for="product in buyData.products" class="buy-table__row buy-table__head-row--body">
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.name }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.price }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.weightAmount }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.measure }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.description }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.discount }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ShallowUnwrapRef } from 'nuxt3/dist/app/compat/capi';
import SgKaufState from '@/types/SgKaufState';
import BuyInfo from '@/types/BuyInfo';

export default defineComponent({
  name: 'Buy',
  components: {},
  setup() {
    const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { removeBuy: Function } }; // TODO: set correct type
    const remove = (buy: BuyInfo) => store.methods.removeBuy(buy);

    return {
      remove
    }
  },
  props: {
    buyData: {
      type: Object as PropType<BuyInfo>,
    }
  }
})
</script>

<style lang="scss">
.buy-table {
  &__caption {
    caption-side: top;
  }
}
.buy-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &::before {
    content: counter(buy-counter) '.';
    margin-right: 1rem;
    font-size: 1.3rem;
    color: #ccc;
  }

  &__date-and-time {
    display: flex;
    margin-right: 1.5rem;
  }
  &__date {
    width: 10.5rem;
  }
  &__time {
    width: 8.3rem;
  }
  &__address {
    display: flex;
    align-items: center;
  }
  &__country {
    width: 9rem;
  }
  &__shop-name {
    margin-right: 1.5rem;
    width: 7rem;
  }
  &__city {
    width: 8rem;
  }
  &__index {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 6rem;
  }
  &__street {
    white-space: nowrap;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 11rem;
  }
  &__houseNumber {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 6rem;
    margin-right: 1.5rem;
  }
  &__currency {
    width: auto;
  }
  &__pay-method {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: 7.3rem;
    display: flex;
    margin-right: 1.5rem;

    &-check {
      padding-left: 0;
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__buttons {
    width: 10rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__btn-add {
    margin-left: .4rem;
  }
}

.buy--default .buy-info::before { content: none; }
.card {
  background-color: #ddd !important;
}
.btn {
  &--icon {
    &-remove {
      font-size: 1.7rem;
      color: #f00;
      padding-top: 0;
      padding-bottom: 0;
      line-height: 1.1;
      vertical-align: bottom;
      &:hover {
        color: lighten(#f00, 10%);
      }
      &:active {
        color: darken(#f00, 10%);
      }
      &::before {
        content: "\2718";
      }
    }
  }
}
</style>
