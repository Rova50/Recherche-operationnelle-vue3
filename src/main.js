import './assets/main.css'

import router from './router';

import { createApp } from 'vue'
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css'

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
app.use(router);
app.mount('#app')
