import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'

Vue.use(Router)

const helloWorld = r => require.ensure([], () => r(require('@/pages/HelloWorld')), 'helloWorld')
const manage = r => require.ensure([], () => r(require('@/pages/Manage')), 'manage')

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
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    }
  ]
})
