import { storeInjectionKey } from '~~/store/default';
import Product from "~~/types/Product";
import type SgKaufState from '~~/types/SgKaufState';
import type SgKaufMethods from '~~/types/SgKaufMethods';

export default function useCollectionDefaults() {
    const store = inject(storeInjectionKey) as {
        state: SgKaufState,
        methods: SgKaufMethods
    };
    const { ValueCollection } = toRefs(store.state);
    const { fetchProductNames, fetchProductDescriptions, fetchProductDefaults } = store.methods;
    const findDefaultValue = (event: Event): Product | string => {
        const target = event.target as HTMLInputElement;
        const currentValue = target.value;
        const foundDefault = ValueCollection.value.defaults.find((defaultProductInfo) => defaultProductInfo.name === currentValue);
        return foundDefault ? foundDefault : currentValue;
    };

    onMounted(() => {
        fetchProductNames();
        fetchProductDescriptions();
        fetchProductDefaults();
    }); // TODO: before?

    return {
        ValueCollection,
        findDefaultValue
    };
}
