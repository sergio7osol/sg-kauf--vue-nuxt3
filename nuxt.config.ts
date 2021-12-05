import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/node_modules/bootstrap/scss/bootstrap.scss',
        '@/assets/styles/main.scss'
    ]
    // link: [
    //     // <link rel="stylesheet" href="https://myawesome-lib.css">
    //     { rel: 'stylesheet', href: 'https://awesome-lib.css' }
    // ]
})
