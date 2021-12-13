import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store
}).$mount('#app')
