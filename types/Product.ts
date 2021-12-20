import { Measure } from '@/types/StaticBuyInfoTypes';

export default interface Product {
    name: string,
    price: number,
    weightAmount: number,
    measure: Measure,
    description: string,
    discount: number
}
