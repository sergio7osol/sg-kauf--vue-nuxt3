import { Measure, ShopName } from '~~/types/StaticBuyInfoTypes';

export interface ProductTimelineRequestInfo {
    name: string,
    measure: Measure,
    shopName: ShopName,
}

export default interface ProductTimelineInfo {
    name: string,
    measure: Measure,
    shopName: ShopName,
}