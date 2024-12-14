import { createApp } from 'vue'
import './style.css'

// Vuetify
// @ts-ignore: Unreachable code error
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'; 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//router
// @ts-ignore: Unreachable code error
import router from './router/router'

//firebase
// @ts-ignore: Unreachable code error
import { firebaseApp } from "@/firebaseConfig";
import { VueFire, VueFireAuth } from "vuefire";

//pinia 
import { createPinia } from 'pinia'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(router)
  .use(createPinia())
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],})
  .mount('#app')