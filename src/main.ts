import './assets/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
