import { ref, Ref } from 'vue';
import { readDate } from '@/services/ShoppingDateService';
import DetailedDateInfo from '@/types/DetailedDateInfo';
import BuyInfo from "@/types/BuyInfo";

export default function useActiveDateBuys(shoppingDates:  Ref<DetailedDateInfo[]>) {
    const activeDateBuys = ref<BuyInfo[]>([]);
    const activeDate = computed(() => {
        try {
            return activeDateBuys.value[0].date;
        } catch (error) {
            console.log('No date selected. Error: ', error);
            return false;
        }
    });
    const getDate = (newDate: string) => {
        const dateToSelect = shoppingDates.value.find(item => item.date === newDate);

        if (dateToSelect) {
            if (dateToSelect.buys) {
                activeDateBuys.value = dateToSelect.buys.slice();
                return true;
            }
            readDate(newDate)
                .then((data: BuyInfo[]) => {
                    if (data?.length) {
                        dateToSelect.buys = data;
                        activeDateBuys.value = dateToSelect.buys.slice();
                    }
                })
                .catch(err => console.log('Fetch Error :-S', err));
        } else {
            console.warn(`Chosen date ${newDate} for loading buys was not found.`)
        }
    };

    return {
        activeDateBuys,
        activeDate,
        getDate
    };
}
