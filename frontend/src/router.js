import Vue from 'vue'
import Router from 'vue-router'

import SignUp from './components/login/SignUp'
import Login from './components/login/Login'

import Information from './components/account/Information'
import ChangePw from './components/account/ChangePw'

import Menu from './components/Menu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/changepw',
      name: 'ChangePw',
      component: ChangePw
    }
  ]
})
