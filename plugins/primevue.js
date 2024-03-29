import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('Dialog', Dialog);
    nuxtApp.vueApp.component('InputNumber', InputNumber);
});