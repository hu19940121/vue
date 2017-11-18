import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/stylus/index.styl'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
