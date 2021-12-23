import {
    ref,
    computed,
    Ref
} from 'vue';
import convertDateToMills from '@/utils/convertDateToMills';
import DetailedDateInfo from '~/types/DetailedDateInfo';
import SortOrder from '@/types/SortOrder';

export default function useSortShoppingDates(shoppingDates:  Ref<DetailedDateInfo[]>, order: SortOrder = 'ascend') {
    const sortOrder = ref(order);
    const sortedShoppingDates = computed<DetailedDateInfo[]>(datesSortedUp);

    function datesSortedUp(): DetailedDateInfo[] {
        const datesCopy = shoppingDates.value.slice();
        datesCopy.sort((a, b) => {
            const aDate: number = convertDateToMills(a.date);
            const bDate: number = convertDateToMills(b.date);

            if (sortOrder.value === 'ascend') {
                return aDate - bDate;
            } else if (sortOrder.value === 'descend') {
                return bDate - aDate;
            } else {
                return 0;
            }
        });

        return datesCopy;
    }
    function changeSortOrder(order: SortOrder) {
        sortOrder.value = order;
    }

    return {
        sortOrder,
        sortedShoppingDates,
        changeSortOrder
    }
}
