import Vue from 'vue';



import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-vue/dist/bootstrap-vue.css';
import './app.scss'


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import hostFilter from './filters/HostFilter';
import domainFilter from './filters/Domain';

// Add all icons to the library so you can use it in your page


// import Axios from 'axios';
import Url from './components/Url.vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "toastify-js/src/toastify.css"

library.add(fas);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.filter('host', hostFilter);
Vue.filter('domain', domainFilter);

Vue.component('Url', Url);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
