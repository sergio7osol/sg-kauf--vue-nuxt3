import {
    computed,
    ShallowUnwrapRef
} from 'vue';

import SgKaufState from "@/types/SgKaufState";

export default function useActiveDateBuys() {
    const store = inject('store') as { state: ShallowUnwrapRef<SgKaufState>, methods: { setActiveDate: Function, setLoadingDate: Function } }; // TODO: set correct type
    const activeDate = computed(() => store.state.activeDate);
    const loadingDate = computed(() => store.state.loadingDate);
    const setActiveDate = (newDate: string) => {
        store.methods.setActiveDate(newDate);
    };
    const setLoadingDate = (newDate: string) => {
        store.methods.setLoadingDate(newDate);
    };

    return {
        activeDate,
        setActiveDate,
        loadingDate,
        setLoadingDate
    };
}
