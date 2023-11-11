<script setup lang="ts">
  import { storeInjectionKey } from '~~/store/default';
  import type BuyInfo from '~~/types/BuyInfo';
  import type SgKaufState from '~~/types/SgKaufState';
  import type SgKaufMethods from '~~/types/SgKaufMethods';

  const store = inject(storeInjectionKey) as {
    state: SgKaufState,
    methods: SgKaufMethods
  };
  const initState: BuyInfo = {
      date: '',
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
      shopName: "",
      products: []
  };
  const state = ref<BuyInfo>(initState);
  const convertedDate = computed({
    get() {
      const currentDate = state.value.date;
      const normalizedDate = currentDate.split('.').reverse().join('-');
      console.log('get: ', state.value.date)

      return normalizedDate;
    },
    set(date: string) {
      const normalizedDate = date.split('-').reverse().join('.');
      state.value.date = normalizedDate;
      console.log('set: ', date)
    }
  });
  const StaticValueCollection = { // TODO: move to server
    countries: ['Germany', 'Russia', 'online'],
    shopNames: ['REWE', 'ALDI', 'Kaufland', 'Lidl', 'PENNY', 'Amazon.de', 'Netflix.com', 'Edeka', 'IKEA', 'BAUHAUS', 'OBI', 'ROHLFS BÄCKEREI KONDITOREI GmbH', 'Apotheke a.d. Friedenseiche Nikolaus Wendel', 'About you', 'Netflix', 'Innovativelanguage.com', 'Mango', 'OVB', 'Vodavone GmbH', 'Telekom Deutschland GmbH', 'Ernst Scholz', 'Sparkasse', 'Apotheke in der Marktplatz Galerie', 'easyApotheke', 'Fahrschule Altona', ''],
    indexes: ['22307', '22529', '22299', '20251', '22761', '22765', '22301', '20249', '22459', '22525', '22041', '22177', '22179', '22457', 'online', ''],
    cities: ['Hamburg', 'Moscow', 'Saransk', 'online', ''],
    streets: ['Alte Kollaustraße', 'Fuhlsbuettler Str.', 'Lobuschstraße', 'Troplowitzstrasse', 'Osterfeldestrasse', 'Wunderbrunnen', 'Winterhuder Marktplatz', 'Eppendorfer Marktplatz', 'Stresemannstrasse', 'Nedderfeld', 'Dorotheenstrasse', 'Kümmellstraße', 'Kieler Straße', 'Grelckstraße', 'Tibarg', 'Walddörferstraße', 'Eppendorfer Baum', 'Bramfelder Chaussee', 'Bramfelder Dorfplatz', 'online', ''],
    houseNumbers: ['1', '2', '4-8', '7', '8', '18', '13-15', '14', '30-40', '32', '34', '35', '39', '44/46', '70', '100', '116-122', '146', '230', '300', '595', '387', '579', 'online', ''],
    currencies: ['EUR', 'RUB'],
    payMethods: ['EC card', 'Cash', 'N26 card', 'PayPal', 'Amazon VISA']
  };
  const addBuy = () => {
    const buyToAdd = JSON.parse(JSON.stringify(state.value));
    store.methods.saveBuy(buyToAdd)
        .then((result: boolean) => {
          if (result) {
            console.log('Buy saved. Resetting Edit Panel...');
            state.value = initState as BuyInfo;
          }
        })
        .catch(function (err: Error) {
          console.log('Fetch Error :-S', err);
        });
  };
</script>

<template>
  <div class="card buy-list__card--default" >
    <div class="card-body">
      <div class="buy buy--default">
        <!-- <span class="badge bg-primary rounded-pill buy__badge">{{ item.products ? item.products.length: 0 }}</span> -->
        <form class="container-fluid" @submit.prevent="addBuy">
          <div class="row">
            <div class="col buy-info">
              <div class="buy-info__date-and-time">
                <input class="form-control buy-info__date" min="2018-11-01" v-model="convertedDate" required type="date" />
                <input class="form-control buy-info__time" v-model="state.time" type="time" />
              </div>
              <div class="buy-info__address">
                <select class="form-control custom-select buy-info__country" v-model="state.address.country">
                  <option v-for="country in StaticValueCollection.countries" :key="country">{{ country }}</option>
                </select>
                <select class="form-control custom-select buy-info__shop-name" v-model="state.shopName">
                  <option v-for="shopName in StaticValueCollection.shopNames" :key="shopName">{{ shopName }}</option>
                </select>
                <select class="form-control custom-select buy-info__index" v-model="state.address.index">
                  <option v-for="index in StaticValueCollection.indexes" :key="index">{{ index }}</option>
                </select>
                <select class="form-control custom-select buy-info__city" v-model="state.address.city">
                  <option v-for="city in StaticValueCollection.cities" :key="city">{{ city }}</option>
                </select>
                <select class="form-control custom-select buy-info__street" v-model="state.address.street">
                  <option v-for="street in StaticValueCollection.streets" :key="street">{{ street }}</option>
                </select>
                <select class="form-control custom-select buy-info__houseNumber" v-model="state.address.houseNumber">
                  <option v-for="houseNr in StaticValueCollection.houseNumbers" :key="houseNr">
                    {{ houseNr }}
                  </option>
                </select>
              </div>
              <select class="form-control custom-select buy-info__currency" v-model="state.currency">
                <option v-for="currencyValue in StaticValueCollection.currencies" :key="currencyValue">
                  {{ currencyValue }}
                </option>
              </select>
              <select class="form-control custom-select buy-info__pay-method" v-model="state.payMethod">
                <option v-for="method in StaticValueCollection.payMethods" :key="method">{{ method }}</option>
              </select>
              <div class="buy-info__buttons">
                <button class="btn btn-primary btn-md buy-info__btn-add">Add buy</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use '../../assets/styles/variables';
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
      // width: 9rem;
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
      background-color: variables.$default-select-button-bg;
    }
  }
  .buy--default .buy-info::before { content: none; }
  .card {
    background-color: #ddd !important;
  }
</style>
