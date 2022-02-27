import {
    onMounted,
    toRefs,
    inject,
    ShallowUnwrapRef
} from 'vue';
import SgKaufState from '@/types/SgKaufState';
import Product from "@/types/Product";

export default function useCollectionDefaults() {
    const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { fetchProductNames: Function, fetchProductDescriptions: Function, fetchProductDefaults: Function } };
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
