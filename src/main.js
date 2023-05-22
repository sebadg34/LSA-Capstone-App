import Vue from 'vue'
import App from './App.vue'
import VuejsModal from 'vue-js-modal'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'



Vue.config.productionTip = false

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/styles/main.scss';
import * as rules from "vee-validate/dist/rules";
import * as VeeValidate from "vee-validate";
import es from "vee-validate/dist/locale/es.json";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate';
import "@/helpers/validation/validators";
import router from './router'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize("es", es);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VuejsModal)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: "veeFields",
  // This is not required but avoids possible naming conflicts
  errorBagName: "veeErrors"
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


