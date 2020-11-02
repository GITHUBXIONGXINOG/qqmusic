import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style.scss'
Vue.config.productionTip = false

import http from "@/http";
Vue.prototype.$http = http

import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont'
import '@/assets/css/rotation.scss'
import $ from 'jquery'
//轮播图组件全局挂载
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

