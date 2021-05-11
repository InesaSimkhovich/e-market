import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueTheMask from 'vue-the-mask';
import Notifications from 'vue-notification';
import store from './store';
import App from './App.vue';
import '@/assets/style.css';

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(Notifications);
Vue.use(VueTheMask);

Vue.filter('toFixed', value => +value.toFixed(2));

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
