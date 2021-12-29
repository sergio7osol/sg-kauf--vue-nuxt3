import { reactive } from 'vue';

import { readDate } from '@/services/ShoppingDateService';
import SgKaufState from '@/types/SgKaufState';
import DetailedDateInfo from "@/types/DetailedDateInfo";
import BuyInfo from "@/types/BuyInfo";

const state = reactive<SgKaufState>({
  shoppingDates: [] as DetailedDateInfo[],
  activeDate: {} as DetailedDateInfo,
  loadingDate: '' // TODO: make dependent of activeDate
});

const methods = {
  setShoppingDates (newShoppingDates: DetailedDateInfo[]) {
    state.shoppingDates = newShoppingDates;
  },
  setActiveDate (newDate: string) {
    const dateToSelect = state.shoppingDates.find(item => item.date === newDate);
    if (!dateToSelect) {
      console.error(`Chosen date ${newDate} for loading buys was not found.`)
      return false;
    }
    if (dateToSelect.buys) {
      state.activeDate = dateToSelect;
      methods.setLoadingDate('');
    } else {
      readDate(newDate)
          .then((data: BuyInfo[]) => {
            if (data?.length) {
              dateToSelect.buys = data;
              state.activeDate = dateToSelect;
              methods.setLoadingDate('');
            }
          })
          .catch(err => console.log('Fetch Error :-S', err));
    }
  },
  setLoadingDate (newDate: string) {
    state.loadingDate = newDate;
  }
}

export default {
  state,
  methods
}

// export const modules = {}

// state: {
//   emptyBuy: {
//     date: "",
//     time: "00:00",
//     currency: "EUR",
//     country: "Germany",
//     address: {
//       city: "",
//       index: "",
//       street: "",
//       houseNumber: ""
//     },
//     payMethod: "EC card",
//     shopName: "REWE",
//     products: []
//   }
// },

