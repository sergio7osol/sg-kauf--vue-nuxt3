import BuyInfo from '@/types/BuyInfo';

export default interface DetailedDateInfo {
    date: string;
    count: number;
    buys?: BuyInfo[]
}
