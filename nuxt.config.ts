import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    css: [
        '@/node_modules/bootstrap/scss/bootstrap.scss',
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        '@/assets/styles/main.scss'
    ],
    typescript: {
        shim: false
    },
    modules: [
        // Simple usage
        'nuxt-highcharts',
        // With options: -> ['nuxt-highcharts', { /* module options */ }]
      ],
      highcharts: { /* module options */ }
    // link: [ 
    //     // <link rel="stylesheet" href="https://myawesome-lib.css">
    //     { rel: 'stylesheet', href: 'https://awesome-lib.css' }
    // ]
})
