import { ref, onMounted } from 'vue';
import DetailedDateInfo from '~/types/DetailedDateInfo';

export default function useShoppingDates() {
    const shoppingDates = ref<DetailedDateInfo[]>([]);
    const getShoppingDates = ():void => {
        fetch('http://localhost:3030/list-dates')
            .then(response => {
                if (response.status !== 200) {
                    throw Error('Looks like there was a problem. Status Code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log('incoming short date info objects: ', data.length);
                if (data.length) {
                    shoppingDates.value = data;
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
