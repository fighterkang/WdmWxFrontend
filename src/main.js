// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Helper from './lib/helper'
import vueResorce from 'vue-resource'
import VueWeChatTitle from 'vue-wechat-title'

import FastClick from 'fastclick'
import limitNum from './directive/onlyNum'

Vue.directive('limitNum', limitNum)
FastClick.attach(document.body)

Vue.use(vueResorce)
Vue.use(VueWeChatTitle)
Vue.prototype.$Helper = Helper

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App },
})
