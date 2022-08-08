import BuyInfo from "./BuyInfo";
import DetailedDateInfo from "./DetailedDateInfo";
import Product, { ProductWithDate } from "./Product";
import { ProductTimelineRequestInfo } from "./ProductTimelineInfo";

export default interface SgKaufMethods {
    setShoppingDates: (newShoppingDates: DetailedDateInfo[]) => void,
    setActiveDate: (newDate: string) => boolean,
    setLoadingDate: (newDate: string) => void,
    saveBuy: (buy: BuyInfo) => void,
    removeBuy: (buy: BuyInfo) => void, 
    fetchProductNames: () => void,
    fetchProductDescriptions: () => void,
    fetchProductDefaults: () => void,
    saveProduct: (date: string, time: string, productInfo: Product, toDefault: boolean) => Promise<boolean>,
    removeProduct: (date: string, time: string, productInfoForRemove: Product) => void,
    getProductTimelineInfo: (productRequestInfo: ProductTimelineRequestInfo) => Promise<false | ProductWithDate[]>,
    getRangeSum: (dataSuffix: string) => void,
    getWholeSum: () => void,
}