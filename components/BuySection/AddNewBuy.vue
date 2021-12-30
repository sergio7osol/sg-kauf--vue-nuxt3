<template>
  <div class="card buy-list__card--default" >
    <div class="card-body">
      <div class="buy buy--default">
        <!--        <span class="badge bg-primary rounded-pill buy__badge">{{ item.products ? item.products.length: 0 }}</span>-->
        <form class="container-fluid">
          <div class="row">
            <div class="col buy-info">
              <div class="buy-info__date-and-time">
                <input class="form-control buy-info__date" min="2018-11-01" v-model="convertedDate" required type="date" />
                <input class="form-control buy-info__time" v-model="newBuy.time" type="time" />
              </div>
              <div class="buy-info__address">
                <select class="form-control custom-select buy-info__country" v-model="newBuy.address.country">
                  <option v-for="country in StaticValueCollection.countries" :key="country">{{ country }}</option>
                </select>
                <select class="form-control custom-select buy-info__shop-name" v-model="newBuy.shopName">
                  <option v-for="shopName in StaticValueCollection.shopNames" :key="shopName">{{ shopName }}</option>
                </select>
                <select class="form-control custom-select buy-info__index" v-model="newBuy.address.index">
                  <option v-for="index in StaticValueCollection.indexes" :key="index">{{ index }}</option>
                </select>
                <select class="form-control custom-select buy-info__city" v-model="newBuy.address.city">
                  <option v-for="city in StaticValueCollection.cities" :key="city">{{ city }}</option>
                </select>
                <select class="form-control custom-select buy-info__street" v-model="newBuy.address.street">
                  <option v-for="street in StaticValueCollection.streets" :key="street">{{ street }}</option>
                </select>
                <select class="form-control custom-select buy-info__houseNumber" v-model="newBuy.address.houseNumber">
                  <option v-for="houseNr in StaticValueCollection.houseNumbers" :key="houseNr">
                    {{ houseNr }}
                  </option>
                </select>
              </div>
              <select class="form-control custom-select buy-info__currency" v-model="newBuy.currency">
                <option v-for="currencyValue in StaticValueCollection.currencies" :key="currencyValue">
                  {{ currencyValue }}
                </option>
              </select>
              <select class="form-control custom-select buy-info__pay-method" v-model="newBuy.payMethod">
                <option v-for="method in StaticValueCollection.payMethods" :key="method">{{ method }}</option>
              </select>
              <div class="buy-info__buttons">
                <!-- <button class="btn btn&#45;&#45;icon-remove"></button>  @click="removeBuy" -->
                <button class="btn btn-primary btn-md buy-info__btn-add" @click.prevent="addBuy">Add buy</button>  <!--@click="saveBuy"-->
              </div>
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
import {
  computed,
  defineComponent,
  reactive
} from 'vue';
import { ShallowUnwrapRef } from 'nuxt3/dist/app/compat/capi';
import SgKaufState from '@/types/SgKaufState';
import BuyInfo from '@/types/BuyInfo';

export default defineComponent({
  name: 'AddNewBuy',
  components: {},
  setup() {
    const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { saveBuy: Function } }; // TODO: set correct type
    const newBuy = reactive<BuyInfo>({
      date: "",
      time: "00:00",
      currency: "EUR",
      address: {
        country: "Germany",
        index: "",
        city: "Hamburg",
        street: "",
        houseNumber: ""
      },
      payMethod: "EC card",
      shopName: "Kaufland",
      products: []
    });
    const convertedDate = computed({
      get() {
        const currentDate = newBuy.date;
        const normalizedDate = currentDate.split('.').reverse().join('-');
        console.log('get: ', newBuy.date)

        return normalizedDate;
      },
      set(date: string) {
        const normalizedDate = date.split('-').reverse().join('.');
        newBuy.date = normalizedDate;
        console.log('set: ', date)
      }
    })
    const StaticValueCollection = { // TODO: move to server
      countries: ['Germany', 'Russia', 'online'],
      shopNames: ['REWE', 'ALDI', 'Kaufland', 'Lidl', 'PENNY', 'Amazon.de', 'Netflix.com', 'Edeka', 'ROHLFS BÄCKEREI KONDITOREI GmbH', 'Apotheke a.d. Friedenseiche Nikolaus Wendel', 'About you', 'Netflix', 'Innovativelanguage.com', 'Mango', 'OVB', 'Vodavone GmbH', 'Telekom Deutschland GmbH', 'Ernst Scholz', 'Sparkasse', 'Apotheke in der Marktplatz Galerie'],
      indexes: ['22307', '22529', '22299', '20251', '22761', '22301', '20249', '22525', '22041', '22177', '22179', 'online', ''],
      cities: ['Hamburg', 'Moscow', 'Saransk', 'online', ''],
      streets: ['Fuhlsbuettler Str.', 'Troplowitzstrasse', 'Osterfeldestrasse', 'Winterhuder Marktplatz', 'Eppendorfer Marktplatz', 'Stresemannstrasse', 'Nedderfeld', 'Dorotheenstrasse', 'Kümmellstraße', 'Kieler Straße', 'Grelckstraße', 'Walddörferstraße', 'Eppendorfer Baum', 'Bramfelder Chaussee', 'Bramfelder Dorfplatz', 'online', ''],
      houseNumbers: ['387', '8', '7', '13-15', '2', '39', '34',  '35', '300', '70', '116-122', '4-8', '30-40', '595', '579', '146', '230', '18', 'online', ''],
      currencies: ['EUR', 'RUB'],
      payMethods: ['EC card', 'Cash', 'N26 card', 'PayPal']
    };
    const addBuy = () => {
      store.methods.saveBuy(newBuy);
    };

    return {
      newBuy,
      convertedDate,
      StaticValueCollection,
      addBuy
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
  justify-content: center;

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
    //width: 10.5rem;
    width: auto;
  }
  &__time {
    width: 8.3rem;
  }
  &__address {
    display: flex;
    align-items: center;
  }
  &__country {
    //width: 9rem;
    width: auto;
  }
  &__shop-name {
    margin-right: 1.5rem;
    width: auto;
    max-width: 7rem;
  }
  &__city {
    width: 8rem;
  }
  &__index {
    padding-left: 1rem;
    padding-right: 1rem;
    //width: 6rem;
    width: auto;
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
