import { reactive } from 'vue';

import {
  createBuy,
  readDate
} from '@/services/ShoppingDateService';
import SgKaufState from '@/types/SgKaufState';
import DetailedDateInfo from "@/types/DetailedDateInfo";
import BuyInfo from "@/types/BuyInfo";
import ResponseInfo from "@/types/ResponseInfo";

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
  },
  saveBuy(buy: BuyInfo) {
    const existingShoppingDate = state.shoppingDates.find((shoppingDate: DetailedDateInfo) => shoppingDate.date === buy.date);
    const existingBuy = existingShoppingDate && existingShoppingDate.buys?.find((buyItem: BuyInfo) => buyItem.time === buy.time);
    if (existingBuy) {
      if (confirm('The buy you try to add already exists, do you want to overwrite it with the new data?')) {
        console.log(`Confirmed prompt to overwrite the existing buy. The buy on ${buy.date} at ${buy.time} is going to be overwritten...`);
      } else {
        console.log(`Rejected prompt to overwrite the existing buy. The buy on ${buy.date} at ${buy.time} is NOT going to be overwritten...`);
        return false;
      }
    }
    let urlSuffix = `date=${buy.date}&time=${buy.time}`;
    urlSuffix += `&currency=${buy.currency}`;
    urlSuffix += `&country=${buy.address.country}`;
    urlSuffix += `&city=${buy.address.city}`;
    urlSuffix += `&index=${buy.address.index}`;
    urlSuffix += `&street=${buy.address.street}`;
    urlSuffix += `&houseNumber=${buy.address.houseNumber}`;
    urlSuffix += `&payMethod=${buy.payMethod}`;
    urlSuffix += `&shopName=${buy.shopName}`;

    return createBuy(urlSuffix)
        .then((data: ResponseInfo) => {
          if (data.success) {
            // TODO: implement response data validation (hash)?
            console.log('Saving buy. Success: ', data.success, ' Status: ', data.message);
            methods._addBuy(buy, existingBuy);
            methods.setActiveDate(buy.date);
            return new Promise((resolve, reject) => {
              resolve(true);
            });
          } else {
            throw Error(data.message);
          }
          // state.activeDate
          // thisApp.activeDateBuys = [...data];
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });

  },
  _addBuy(newBuy: BuyInfo, storeBuy: BuyInfo | undefined) {
    if (storeBuy) {
      storeBuy.currency = newBuy.currency;
      storeBuy.address.index = newBuy.address.index;
      storeBuy.address.country = newBuy.address.country;
      storeBuy.address.city = newBuy.address.city;
      storeBuy.address.street = newBuy.address.street;
      storeBuy.address.houseNumber = newBuy.address.houseNumber;
      storeBuy.payMethod = newBuy.payMethod;
      storeBuy.shopName = newBuy.shopName;
    } else {
      state.shoppingDates.push({
        date: newBuy.date,
        count: 0,
        buys: [newBuy]
      });
    }
  }
}

export default {
  state,
  methods
}

// export const modules = {}


