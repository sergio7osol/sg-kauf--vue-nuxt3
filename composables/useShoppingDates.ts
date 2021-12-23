import { ref, onMounted } from 'vue';
import { getAllDates } from '@/services/ShoppingDateService';
import DetailedDateInfo from '@/types/DetailedDateInfo';

export default function useShoppingDates() {
    const shoppingDates = ref<DetailedDateInfo[]>([]);
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
