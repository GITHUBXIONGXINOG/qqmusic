import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//图片懒加载
import vueLazy from 'vue-lazyload'
Vue.use(vueLazy)

import './assets/css/style.scss'
Vue.config.productionTip = false

import http from "@/assets/js/http";
Vue.prototype.$http = http

import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont'
import '@/assets/css/rotation.scss'
import '@/assets/css/rotationtitle.scss'
import '@/assets/css/rotationcontent.scss'
import '@/assets/css/footer.scss'
import '@/assets/css/singershow.scss'
import '@/assets/css/digitalalbum.scss'
import '@/assets/css/paging.scss'

import $ from 'jquery'
//轮播图组件全局挂载
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import bus from "@/assets/js/bus";
Vue.prototype.$bus = bus
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

