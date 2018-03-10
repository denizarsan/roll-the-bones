import Vue from 'vue';
import Vuetify from 'vuetify';
import VueClipboard from 'vue-clipboard2';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import App from './App';

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base,
    secondary: colors.pink.base,
    error: colors.red.darken1,
  },
});
Vue.use(VueClipboard);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
