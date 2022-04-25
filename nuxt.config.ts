import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
    css: [
        '@/node_modules/bootstrap/scss/bootstrap.scss',
        '@/assets/styles/main.scss'
    ],
    typescript: {
        shim: false
    }
    // link: [ 
    //     // <link rel="stylesheet" href="https://myawesome-lib.css">
    //     { rel: 'stylesheet', href: 'https://awesome-lib.css' }
    // ]
})
