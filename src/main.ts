import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// GOOGLE OAUTH
app.use(vue3GoogleLogin, {
  clientId: '266772770444-37sihfe16m1365gu6es3l6fa86c70u10.apps.googleusercontent.com'
});


app.mount('#app')
