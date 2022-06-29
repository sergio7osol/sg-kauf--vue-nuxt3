
<script setup lang="ts">
  import { ShallowUnwrapRef } from 'vue';
  import SgKaufState from '@/types/SgKaufState';
  import BuyInfo from '@/types/BuyInfo';
  import Product from '@/types/Product';

  defineProps<{ 
    buyData: BuyInfo
  }>();

  const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { removeBuy: Function, removeProduct: Function } }; // TODO: set correct type
  const remove = (buy: BuyInfo) => store.methods.removeBuy(buy);
  const sendProductToRemove = (date: string, time: string, productInfoForRemove: Product) => {
    store.methods.removeProduct(date, time, productInfoForRemove);
  };

  const graph = () => {
    console.log('GRAPH.');
  };
</script>
 
<template>
  <table class="table table-striped product-list__items buy-table">
    <caption class="buy-table__caption">
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
      <th scope="col" class="buy-table__cell buy-table__head-cell--head">#</th>
      <th scope="col" class="buy-table__cell buy-table__head-cell--head">Name</th>
      <th scope="col" class="buy-table__cell buy-table__head-cell--head">Price</th>
      <th scope="col" class="buy-table__cell buy-table__head-cell--head">Weight/Amount</th>
      <th scope="col" class="buy-table__cell buy-table__head-cell--head">Measure</th>
      <th scope="col" class="buy-table__cell buy-table__head-cell--head">Description</th>
      <th scope="col" class="buy-table__cell buy-table__head-cell--head">Discount</th>
      <th scope="col" class="buy-table__cell buy-table__cell--actions buy-table__head-cell--head">Actions</th>
    </tr>
    </thead>
    <tbody class="product">
    <ProductAddNewItemTableRow :date="buyData.date" :time="buyData.time" :key="Date.now()" />
    <tr v-for="(product, index) in buyData.products" class="buy-table__row buy-table__head-row--body" :key="product.name + index">
      <th scope="row" class="buy-table__cell buy-table__head-cell--body">{{ index + 1 }}</th>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.name }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.price }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.weightAmount }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.measure }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.description }}</td>
      <td class="buy-table__cell buy-table__head-cell--body">{{ product.discount }}</td>
      <td class="buy-table__cell buy-table__cell--actions buy-table__head-cell--body">
        <button
          class="btn btn--icon-remove"
          @click.prevent="sendProductToRemove(buyData.date, buyData.time, product)"
        ></button>
        <Button @click="graph()" icon="pi pi-chart-line" class="p-button-rounded p-button-text" />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@use 'assets/styles/variables';

.buy-table {
  background-color: variables.$default-table-bg-color;
  &__caption {
    caption-side: top;
  }
  &__cell {
    &--actions {
      display: flex;
      justify-content: center;
    }
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
