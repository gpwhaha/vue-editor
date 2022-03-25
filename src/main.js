import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import console from 'Console'
// import * as WPS from './static/jwps.es6'
import * as WPS from './static/web-office-sdk-v1.1.17.es'
import comFun from './comfun/index'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



Vue.prototype.console = console;
Vue.prototype.wps = WPS;

Vue.use(Element);
Vue.use(comFun);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

// default 分页参数
Vue.prototype.$page = 1;
Vue.prototype.$size = 10;
Vue.prototype.$PageSizeRange = [10,25,50];

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
