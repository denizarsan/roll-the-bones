import Vue from 'vue';
import Vuetify from 'vuetify';
import VuetifyColors from 'vuetify/es5/util/colors';
import VueClipboard from 'vue-clipboard2';

import 'vuetify/dist/vuetify.min.css';
import 'mdi/css/materialdesignicons.min.css';

import App from './App';
import store from './store/store';

const VuetifyTheme = {
  primary: VuetifyColors.teal.base,
  secondary: VuetifyColors.pink.base,
  error: VuetifyColors.red.darken1,
};

Vue.use(Vuetify, { theme: VuetifyTheme });
Vue.use(VueClipboard);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
});
