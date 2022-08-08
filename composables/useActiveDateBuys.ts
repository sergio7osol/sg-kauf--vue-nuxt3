import { storeInjectionKey } from '~~/store/default';
import SgKaufState from "~~/types/SgKaufState";
import SgKaufMethods from '~~/types/SgKaufMethods';

export default function useActiveDateBuys() {
    const store = inject(storeInjectionKey) as {
      state: SgKaufState;
      methods: SgKaufMethods
    }; // TODO: set correct type
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
