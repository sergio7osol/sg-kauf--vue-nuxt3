import {
    onMounted,
    toRefs,
    inject,
    ShallowUnwrapRef
} from 'vue';
import { getAllDates } from '@/services/ShoppingDateService';
import SgKaufState from '@/types/SgKaufState';

export default function useShoppingDates() {
    const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState> };
    const { shoppingDates } = toRefs(store.state) ;
    const getShoppingDates = ():void => {
        getAllDates()
            .then(fetchedDates => {
                console.log('incoming short date info objects: ', fetchedDates);
                if (fetchedDates.length) {
                    shoppingDates.value = fetchedDates;
                }
            })
            .catch(function(err) {
                console.log('Fetch Error :-S in useShoppingDates: ', err);
            });
    };
    onMounted(getShoppingDates);
    return {
        shoppingDates,
        getShoppingDates
    };
}
