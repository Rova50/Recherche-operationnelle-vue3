import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import LocalStorageProductsService from './services/local-storage-products-service';

// import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    defaults:{
        VTextField:{
            density:"compact",
            variant: "outlined"
        }
    }
})


const app = createApp(App);
app.use(vuetify)
// We could easily change this to a RemoteProductsService
// app.provide('productsService', new LocalStorageProductsService());

app.mount('#app')
