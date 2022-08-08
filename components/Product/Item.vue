<script setup lang="ts">
import { storeInjectionKey } from '~~/store/default';
import { ProductPriceChartDialog } from '../../.nuxt/components';
import type SgKaufState from "~~/types/SgKaufState";
import type SgKaufMethods from '~~/types/SgKaufMethods';
import type Product from "~~/types/Product";
import type { ShopName } from "~~/types/StaticBuyInfoTypes";

const { date, time, shopName } = defineProps<{
  date: string;
  time: string;
  shopName: ShopName;
  product: Product;
  index: number;
}>();
const store = inject(storeInjectionKey) as {
  state: SgKaufState,
  methods: SgKaufMethods
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
        @click.prevent="store.methods.removeProduct(date, time, product)"
      ></button>
      <Button 
        @click="graphShown = !graphShown;"
        icon="pi pi-chart-line"
        class="p-button-rounded p-button-text"
      />
      <ProductPriceChartDialog 
        :show-dialog="graphShown" 
        :product-name="product.name"  
        :measure="product.measure"
        :shop-name="shopName"      
        @@close-dialog="graphShown = false" 
      />
    </td>
  </tr>
</template>
