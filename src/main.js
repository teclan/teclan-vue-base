// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/bootstrap/css/bootstrap.css'
import '../static/bootstrap/css/bootstrap-theme.css'
import global_ from './global.js'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store/'

Vue.prototype.GLOBAL = global_

Vue.use(VueResource)
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局设置 http 请求头，现只有登录时走此配置，其余的在 fetch.js 中配置
Vue.http.interceptors.push((request, next) => {
  // request.credentials = true
  request.headers.set('token', window.localStorage.getItem('token'))
  request.headers.set('Access-Control-Allow-Origin', '*')
  request.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next(function (response) {
    return response
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
