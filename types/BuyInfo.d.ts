import {
    Currency,
    PayMethod,
    ShopName
} from '@/types/StaticBuyInfoTypes';
import Address from '@/types/ShopAddress';
import Product from '@/types/Product';

export default interface BuyInfo {
    date: string,
    time: string,
    count?: number,
    currency: Currency,
    address: Address,
    payMethod: PayMethod,
    shopName: ShopName,
    products: Product[]
}
