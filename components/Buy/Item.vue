
<script setup lang="ts">
  import { ShallowUnwrapRef } from 'vue';
  import SgKaufState from '~~/types/SgKaufState';
  import type BuyInfo from '~~/types/BuyInfo';

  const props = defineProps<{ 
    buyData: BuyInfo
  }>();

  const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { removeBuy: Function } }; // TODO: set correct type
  const remove = (buy: BuyInfo) => store.methods.removeBuy(buy);
</script>
 
<template>
  <table class="table table-striped product-list__items buy-table">
    <caption class="buy-table__caption">
      {{ props.buyData.time }},
      {{ props.buyData.address.country }}
      {{ props.buyData.address.index }}
      {{ props.buyData.address.city }}
      {{ props.buyData.address.street }}
      {{ props.buyData.address.houseNumber }},
      {{ props.buyData.shopName }}
      - {{ props.buyData.payMethod }} -
      {{ props.buyData.currency }}
      <button class="btn btn--icon-remove" @click="remove(props.buyData)"></button>
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
    <ProductAddNewItemTableRow :date="props.buyData.date" :time="props.buyData.time" :key="Date.now()" />
    <ProductItem v-for="(product, index) in props.buyData.products" 
      class="buy-table__row buy-table__head-row--body" 
      :date="props.buyData.date"
      :time="props.buyData.time"
      :shop-name="props.buyData.shopName"
      :product="product" 
      :index="index" 
      :key="product.name + index" 
    />
    </tbody>
  </table>
</template>

<style lang="scss"> 
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
