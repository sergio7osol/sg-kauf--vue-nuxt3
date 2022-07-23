<template>
  <div class="border-primary mb-3 sum-calc">
    <!-- <div class="card-header">{{ from }} - {{ to }}</div> -->
    <div class="card-body text-info sum-calc__body">
      <div class="sum-calc__price">
        <h5 class="card-title sum-calc__title">
          {{ roundedSum }}</h5>
        <span class="sum-calc__currency">{{ currency }}</span></div>
      <div class="sum-calc__payment mt-2">
        <div class="sum-calc__cost-col">
          <span class="sum-calc__payment-name">Cost: </span>
          <span class="sum-calc__payment-value">{{ roundedCost }}</span>
        </div>
        <div class="sum-calc__cost-col">
          <span class="sum-calc__payment-name">Discount: </span>
          <span class="sum-calc__payment-value">{{ roundedDiscount }}</span>
        </div>
      </div>
      <div class="card-body sum-calc__controls">
        <div class="sum-calc__set-range">
          <p>from - to</p>
          <datepicker
              v-model="from"
              inputFormat="dd.MM.yyyy"
          />
          <!--
              :upperLimit="to"
              :locale="locale"
              :lowerLimit="from"
              :startingView="to.toString()"
          -->
          <datepicker
              v-model="to"
              :upperLimit="to"
              inputFormat="dd.MM.yyyy"
          />
        </div>
        <div class="sum-calc__buttons">
          <button class="btn btn-success mt-4 sum-calc__submit" @click="getCalcSum">Calculate Sum</button>
          <button class="btn btn-info mt-3 sum-calc__submit" @click="sendGetWholeSum">Get whole Sum</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from "vue";
import Datepicker from 'vue3-datepicker';
import { ShallowUnwrapRef } from "nuxt3/dist/app/compat/capi";
import PriceInfo from "@/types/PriceInfo";
import { Currency } from "@/types/StaticBuyInfoTypes";
import SgKaufState from "@/types/SgKaufState";

export default defineComponent({
  name: 'SumCalc',
  components: { Datepicker },
  setup() {
    const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { getRangeSum: Function, getWholeSum: Function } };
    // const dateRange: DateRange = reactive({
    // });
    const from = ref<Date>(new Date(2021, 0, 15));
    const to = ref<Date>(new Date());
    const currency: Currency = 'EUR'; // TODO: implement dynamic currency exchange / calculating different currencies separately
    const calculatedSum = ref<PriceInfo>({cost: 0, discount: 0});
    const roundedCost = computed(() => calculatedSum.value.cost ? calculatedSum.value.cost.toFixed(2) : 0);
    const roundedDiscount = computed(() => calculatedSum.value.discount ? calculatedSum.value.discount.toFixed(2) : 0);
    const roundedSum = computed(() => (calculatedSum.value.cost - calculatedSum.value.discount).toFixed(2));

    const sendGetWholeSum = () => {
      store.methods.getWholeSum()
          .then((result: any) => {
            calculatedSum.value = result;
          })
          .catch((err: Error) => {
            console.log('Fetch Error :-S', err);
          });
    };

    const getCalcSum = () => {
      const fromValue = getDateString(from.value);
      const toValue = getDateString(to.value);

      const urlSuffix = `from=${fromValue}&to=${toValue}`;
      store.methods.getRangeSum(urlSuffix)
          .then((data: PriceInfo) => {
            calculatedSum.value = data;
          })
          .catch(function(err: unknown) {
            console.log('Fetch Error :-S', err);
          });

      function getDateString(date: Date) {
        const day = String(date.getDate());
        const dayNormalized = day.length < 2 ? '0' + day : day;
        const month = String(date.getMonth() + 1);
        const monthNormalized = month.length < 2 ? '0' + month : month;
        const year = date.getFullYear();

        const dateNormalized = dayNormalized + '.' + monthNormalized + '.' + year;

        return dateNormalized;
      }
    };

    return {
      from,
      to,
      currency,
      roundedCost,
      roundedDiscount,
      roundedSum,
      getCalcSum,
      sendGetWholeSum
    };
  }
});
</script>

<style lang="scss">
@use '../assets/styles/variables';

.sum-calc {
  background-color: variables.$default-bg-color !important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px -4px 8px rgba(255, 255, 255, 0.8);
  border: 1px solid #efefef !important;
  margin-left: auto;
  &__body {
    display: flex;
    align-items: center;
  }
  &__price {
    padding-right: 1.5rem;
    border-right: 1px solid variables.$default-menu-separator-color;
  }
  &__payment {
    padding-left: 1.5rem;
  }
  &__set-range {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-right: 1px solid variables.$default-menu-separator-color;
    border-left: 1px solid variables.$default-menu-separator-color;
    input {
      max-width: 100%;
    }
  }
  &__controls {
    display: flex;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    padding-left: 1.5rem;
  }
  &__title {
    display: inline-block;
    font-size: 2rem;
  }
  &__currency {
    color: #ccc;
    font-size: 1.4rem;
    margin-left: .3rem;
    font-style: italic;
  }
}
</style>
