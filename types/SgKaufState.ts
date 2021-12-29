import DetailedDateInfo from '@/types/DetailedDateInfo';

export default interface SgKaufState {
  shoppingDates: DetailedDateInfo[];
  activeDate: DetailedDateInfo;
  loadingDate: string;
}
