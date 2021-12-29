<template>
  <div class="card buy-list__card--default" >
    <div class="card-body">
      <div class="buy buy--default">
        <!-- <span class="badge bg-primary rounded-pill buy__badge">{{item.products ? item.products.length: 0 }}</span> -->
        <form class="container-fluid">
          <div class="row">
            <div class="col buy-info">
              <h3>Add new buy</h3>
<!--              <div class="buy-info__date-and-time">-->
<!--                <input class="form-control buy-info__date" min="2018-11-01" v-model="convertDate" required type="date" />-->
<!--                <input class="form-control buy-info__time" v-model="localTime" type="time" />-->
<!--              </div>-->
<!--              <div class="buy-info__address">-->
<!--                <select class="form-control custom-select buy-info__country" v-model="localCountry">-->
<!--                  <option v-for="land in ValueCollection.countries" :key="land">{{ land }}</option>-->
<!--                </select>-->
<!--                <select class="form-control custom-select buy-info__shop-name" v-model="localShopName">-->
<!--                  <option v-for="name in ValueCollection.shopNames" :key="name">{{ name }}</option>-->
<!--                </select>-->
<!--                <select class="form-control custom-select buy-info__index" v-model="localIndex">-->
<!--                  <option v-for="i in ValueCollection.indexes" :key="i">{{ i }}</option>-->
<!--                </select>-->
<!--                <select class="form-control custom-select buy-info__city" v-model="localCity">-->
<!--                  <option v-for="place in ValueCollection.cities" :key="place">{{ place }}</option>-->
<!--                </select>-->
<!--                <select class="form-control custom-select buy-info__street" v-model="localStreet">-->
<!--                  <option v-for="str in ValueCollection.streets" :key="str">{{ str }}</option>-->
<!--                </select>-->
<!--                <select class="form-control custom-select buy-info__houseNumber" v-model="localHouseNumber">-->
<!--                  <option v-for="houseNr in ValueCollection.houseNumbers" :key="houseNr">-->
<!--                    {{ houseNr }}-->
<!--                  </option>-->
<!--                </select>-->
<!--              </div>-->
<!--              <select class="form-control custom-select buy-info__currency" v-model="localCurrency">-->
<!--                <option v-for="currencyValue in ValueCollection.currencies" :key="currencyValue">-->
<!--                  {{ currencyValue }}-->
<!--                </option>-->
<!--              </select>-->
<!--              <select class="form-control custom-select buy-info__pay-method" v-model="localPayMethod">-->
<!--                <option v-for="method in ValueCollection.payMethods" :key="method">{{ method }}</option>-->
<!--              </select>-->
<!--              <div class="buy-info__buttons">-->
<!--                <button class="btn btn&#45;&#45;icon-remove" v-show="!isDefault" @click="removeBuy"></button>-->
<!--                <button class="btn btn-primary btn-sm buy-info__btn-add" @click="saveBuy">Add buy</button>-->
<!--              </div>-->
            </div>
          </div>
          <!--    <div class="row" v-show="!isDefault">-->
          <!--        <product-list :buyProducts="localProducts" @save-product="$attrs.onSaveProduct" @remove-product="$attrs.onRemoveProduct" />-->
          <!--    </div>-->
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddNewBuy',
  setup() {


    return {

    }
  }
})
</script>

<style scoped lang="scss">
.buy {
  counter-increment: buy-counter;

  &--default {
    .buy-info::before {
      content: none;
    }
  }

  &__products {
    align-items: flex-start;
    margin-top: 1rem;
    font-size: .95rem;
    color: #565;
  }

  &__badge {
    color: #fff;
    position: absolute;
    top: 18px;
    right: 12px;
  }
}
.buy-list__card {
  &--default {
    background-color: #efefef;
    margin-bottom: 2rem;

    .card {
      &-header {
        text-align: left;
        font-weight: bold;
        color: #777;
      }
      &-body {
        padding: .8rem 0;
      }
    }
  }
}
/********************/
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
      font-size: 2rem;
      color: #f00;
      padding-top: 0;
      padding-bottom: 0;
      line-height: 1.1;
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
