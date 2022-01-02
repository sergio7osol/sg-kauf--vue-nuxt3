import { reactive } from 'vue';

import {
  createBuy,
  deleteBuy,
  readDate,
  getProductNames,
  getProductDefaults
} from '@/services/ShoppingDateService';
import SgKaufState from '@/types/SgKaufState';
import DetailedDateInfo from "@/types/DetailedDateInfo";
import BuyInfo from "@/types/BuyInfo";
import ResponseInfo from "@/types/ResponseInfo";
import Product from "@/types/Product";

const state = reactive<SgKaufState>({
  shoppingDates: [] as DetailedDateInfo[],
  activeDate: {} as DetailedDateInfo,
  loadingDate: '', // TODO: make dependent of activeDate
  ValueCollection: {
    names: [],
    defaults: [],
    measures: ["piece", "kg"]
  }
});

const methods = {
  setShoppingDates (newShoppingDates: DetailedDateInfo[]) {
    state.shoppingDates = newShoppingDates;
  },
  setActiveDate (newDate: string) {
    const dateToSelect = state.shoppingDates.find(item => item.date === newDate);
    if (!dateToSelect) {
      console.warn(`Chosen date ${newDate} for loading buys was not found. No date is selected.`)
      state.activeDate = {} as DetailedDateInfo;
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
    const existingBuy = existingShoppingDate && existingShoppingDate.buys?.find((buyItem: BuyInfo) => {
      return buyItem.time === buy.time;
    });
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
            methods._addBuy(buy, existingShoppingDate, existingBuy);
            methods.setActiveDate(buy.date);
            return new Promise(resolve => {
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
  removeBuy(buy: BuyInfo) {
    const existingShoppingDate = state.shoppingDates.find((shoppingDate: DetailedDateInfo) => shoppingDate.date === buy.date);
    const existingBuy = existingShoppingDate && existingShoppingDate.buys?.find((buyItem: BuyInfo) => buyItem.time === buy.time);
    if (!existingBuy) {
      console.log(`Buy for deleting on ${buy.date} at ${buy.time} was not found.`);
      return false;
    }

    if (confirm('Are you sure, you want to delete this buy?')) {
      console.log(`Prompted deleting of the buy. Confirmed. The buy on ${buy.date} at ${buy.time} is going to be deleted...`);
    } else {
      console.log(`Prompted deleting of the buy. Rejected. The buy on ${buy.date} at ${buy.time} is NOT going to be deleted.`);
      return false;
    }
    const urlSuffix = `date=${buy.date}&time=${buy.time}`;

    deleteBuy(urlSuffix) // TODO: make no response from server -> do it locally
        .then((newArray: BuyInfo[]) => {
          if (newArray) {
            console.log(`The buy on ${buy.date} at ${buy.time} was successfully removed. ${newArray.length} buys left for this date.`);
            if (newArray.length) {
              if (existingShoppingDate && existingShoppingDate.buys) {
                existingShoppingDate.buys = newArray;
              }
            } else if (existingShoppingDate) {
              console.log(`Date ${buy.date} with no buys left is going to be removed...`);
              const indexOfDateToDelete = state.shoppingDates.indexOf(existingShoppingDate);
              console.log('index of date to delete: ', indexOfDateToDelete);
              state.shoppingDates.splice(indexOfDateToDelete, 1);
              methods.setActiveDate('');

              // TODO: add another possibility for deleting date - separately
              //   if (confirm(`There are no buys left for date ${buy.date}, do you want to delete this shopping date completely?`)) {
              //     console.log(`Prompted deleting of the date. Confirmed. The date ${buy.date} is going to be deleted...`);
              //     const indexOfDateToDelete = state.shoppingDates.find(shoppingDate => shoppingDate === existingShoppingDate);
              //     console.log('indexOfDateToDelete > ', indexOfDateToDelete);
              //   } else {
              //     console.log(`Prompted deleting of the date. Rejected. The date ${buy.date} is NOT going to be deleted.`);
              //     return false;
              //   }
            }
          }
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
  },
  fetchProductNames() {
    getProductNames()
        .then((productNames: string[]) => {
          if (!productNames || !productNames.length) {
            console.error("Product names should be an Array of Strings. Got no products. Returning...");
            return false;
          }
          methods._setCollectionProductNames(productNames);
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
  },
  fetchProductDefaults() {
    getProductDefaults()
        .then((productDefaults: Array<string | Product>) => {
          if (!productDefaults || !productDefaults.length) {
            console.log('Product defaults should be an Array of product names or objects. Got no product defaults. Returning...');
            return false;
          }
          methods._setCollectionProductDefaults(productDefaults);
        })
        .catch(function (err) {
          console.log("getProductDefaults, Fetch Error :-S", err);
        });
  },
  _addBuy(newBuy: BuyInfo, storedDate: DetailedDateInfo | undefined, storedBuy: BuyInfo | undefined) {
    if (!storedDate) {
      storedDate = {
        date: newBuy.date,
        count: 0,
        buys: []
      };
      state.shoppingDates.push(storedDate);
    }
    if (storedBuy) {
      storedBuy.currency = newBuy.currency;
      storedBuy.address.index = newBuy.address.index;
      storedBuy.address.country = newBuy.address.country;
      storedBuy.address.city = newBuy.address.city;
      storedBuy.address.street = newBuy.address.street;
      storedBuy.address.houseNumber = newBuy.address.houseNumber;
      storedBuy.payMethod = newBuy.payMethod;
      storedBuy.shopName = newBuy.shopName;
    } else {
      storedDate?.buys?.push(newBuy);
    }
  },
  _setCollectionProductNames(names: string[]) {
    state.ValueCollection.names = names;
  },
  _setCollectionProductDefaults(defaults: (string | Product)[]) {
    state.ValueCollection.defaults = defaults as [];
  }
}

export default {
  state,
  methods
}

// export const modules = {}


