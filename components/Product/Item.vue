<script setup lang="ts">
import { ShallowUnwrapRef } from "vue";
import type SgKaufState from "~~/types/SgKaufState";
import type Product from "~~/types/Product";
import type { ProductTimelineRequestInfo } from "~~/types/ProductTimelineInfo";
import { ShopName } from "~~/types/StaticBuyInfoTypes";
import { ProductPriceChartDialog } from '../../.nuxt/components';

const { date, time, shopName } = defineProps<{
  date: string;
  time: string;
  shopName: ShopName;
  product: Product;
  index: number;
}>();

const store = inject("store") as {
  state: ShallowUnwrapRef<SgKaufState>;
  methods: {
    removeProduct: (
      date: string,
      time: string,
      productInfoForRemove: Product
    ) => Promise<boolean> | void;
  };
}; // TODO: set correct type
const sendProductToRemove = (
  date: string,
  time: string,
  productInfoForRemove: Product
) => {
  store.methods.removeProduct(date, time, productInfoForRemove);
};

const graphShown = ref(false);
</script>

<template>
  <tr class="buy-table__row buy-table__head-row--body">
    <th scope="row" class="buy-table__cell buy-table__head-cell--body">
      {{ index + 1 }}
    </th>
    <td class="buy-table__cell buy-table__head-cell--body">{{ product.name }}</td>
    <td class="buy-table__cell buy-table__head-cell--body">{{ product.price }}</td>
    <td class="buy-table__cell buy-table__head-cell--body">{{ product.weightAmount }}</td>
    <td class="buy-table__cell buy-table__head-cell--body">{{ product.measure }}</td>
    <td class="buy-table__cell buy-table__head-cell--body">{{ product.description }}</td>
    <td class="buy-table__cell buy-table__head-cell--body">{{ product.discount }}</td>
    <td class="buy-table__cell buy-table__cell--actions buy-table__head-cell--body"> 
      <button
        class="btn btn--icon-remove"
        @click.prevent="sendProductToRemove(date, time, product)"
      ></button>
      <Button 
        @click="graphShown = !graphShown;"
        icon="pi pi-chart-line"
        class="p-button-rounded p-button-text"
      />
      <ProductPriceChartDialog 
        :showDialog="graphShown" 
        :productName="product.name"  
        :measure="product.measure"
        :shopName="shopName"      
        @@close-dialog="graphShown = false" />
    </td>
  </tr>
</template>
