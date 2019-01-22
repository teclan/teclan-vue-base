import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

Vue.use(Router)

const helloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'helloWorld')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/helloWorld',
      name: 'helloWorld',
      component: helloWorld
    }
  ]
})
