<template>
  <div class="card border-primary sum" style="max-width: 18rem;">
    <!-- <div class="card-header">{{date}}</div>-->
    <div class="card-body text-primary sum__body">
      <div class="sum__price-per-day">
        <div class="sum__actual-price">
          <h5 class="card-title sum__quantity">
            {{ roundedSum }}</h5>
          <span class="sum__currency">{{ currency }}</span>
        </div>
        <p class="card-text sum__period">Day</p>
      </div>
      <div class="sum__payment mt-2">
        <div class="sum__cost-col">
          <span class="sum__payment-name">Cost: </span>
          <span class="sum__payment-value">{{roundedCost}}</span>
        </div>
        <div class="sum__cost-col">
          <span class="sum__payment-name">Discount: </span>
          <span class="sum__payment-value">{{roundedDiscount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent
} from "vue";

export default defineComponent({
  name: 'Sum',
  components: {},
  setup(props) {
    const roundedCost = computed(() => props.amount.cost.toFixed(2));
    const roundedDiscount = computed(() => props.amount.discount.toFixed(2));
    const roundedSum = computed(() => {
      const resultCost = props.amount.cost - props.amount.discount;
      const fixedResultCost = resultCost.toFixed(2);
      return fixedResultCost;
    });

    return {
      roundedCost,
      roundedDiscount,
      roundedSum
    };
  },
  props: {
    date: {
      type: String
    },
    amount: {
      type: Object
    }, // TODO: validate
    currency: {
      type: String
    }
  }
})
</script>

<style scoped lang="scss">
@use '../assets/styles/variables';

.sum {
  background-color: variables.$default-bg-color !important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px -4px 8px rgba(255, 255, 255, 0.8);
  border: 1px solid #efefef !important;
  margin-left: 1.5rem;
  &__body {
    display: flex;
    flex-direction: column;
  }
  &__actual-price {

  }
  &__price-per-day {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__quantity {
    display: inline-block;
    font-size: 2rem;
  }
  &__currency {
    color: #aaa;
    font-size: 1.4rem;
    margin-left: .3rem;
    font-style: italic;
  }
  &__payment {
    display: flex;
    justify-content: space-between;
    border: 1px solid #aaa;
    padding: .1rem .4rem;
    margin-top: .7rem;

    &-name {
      font-size: .9rem;
      color: #aaa;
    }
  }
  &__cost-col {
    &:last-child {
      margin-left: 1rem;
    }
  }
  &__period {
    margin-right: 1rem;
  }
}
</style>
