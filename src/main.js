import Vue from 'vue';
import ElementUI from 'element-ui';
import moment from 'moment';
import Vuelidate from 'vuelidate';
import Viewer from 'v-viewer';
import VeRadar from 'v-charts/src/packages/radar';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperclip, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { DataTablesServer } from 'vue-data-tables';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import 'viewerjs/dist/viewer.css';
import '@/styles/index.scss';

import VuelidateError from './plugins/errors';

Vue.config.productionTip = false;

Vue.component(VeRadar.name, VeRadar);

library.add(faPaperclip);
library.add(faSmile);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(ElementUI);
Vue.use(Vuelidate);
Vue.use(VuelidateError);
Vue.use(Viewer);
Vue.use(DataTablesServer);

Vue.filter('dateTimeFilter', time => (Date.parse(time) ? moment(time).format('YYYY-MM-DD hh:mm:ss ') : ''));
Vue.filter('dateFilter', time => (Date.parse(time) ? moment(time).format('YYYY年MM月DD日') : '______'));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
