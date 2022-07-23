import { toRefs, inject } from 'vue';
import { getAllDates } from '@/services/ShoppingDateService';
import type SgKaufState from '@/types/SgKaufState';
import type DetailedDateInfo from '@/types/DetailedDateInfo';

export default function useShoppingDates() {
    const store = inject('store') as { state: SgKaufState, methods: { setShoppingDates: Function } };
    const { shoppingDates } = toRefs(store.state);
    const { setShoppingDates } = store.methods;
    const getShoppingDates = async ():Promise<void> => {
        try {
            const fetchedDates: DetailedDateInfo[] = await getAllDates();
            console.log("incoming short date info objects: ", fetchedDates.length);
            if (fetchedDates.length) {
                setShoppingDates(fetchedDates);
            }
        } catch (error) {
          console.log("Error on getting shopping dates: ", error);
        }
    };
    getShoppingDates();
    return {
        shoppingDates,
        getShoppingDates
    };
}
