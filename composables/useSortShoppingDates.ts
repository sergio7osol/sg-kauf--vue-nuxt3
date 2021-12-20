import {
    ref,
    computed,
    Ref
} from 'vue';
import convertDateToMills from '@/utils/convertDateToMills';
import ShortDateInfo from '@/types/ShortDateInfo';
import SortOrder from '@/types/SortOrder';

export default function useSortShoppingDates(shoppingDates:  Ref<ShortDateInfo[]>, order: SortOrder = 'ascend') {
    const sortOrder = ref(order);
    const sortedShoppingDates = computed<ShortDateInfo[]>(datesSortedUp);

    function datesSortedUp(): ShortDateInfo[] {
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