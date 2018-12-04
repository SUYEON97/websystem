import Vue from 'vue'
import Router from 'vue-router'

import SignUp from './components/login/SignUp'
import Login from './components/login/Login'
import registTodo from './components/registTodo/registTodo'
import Information from './components/account/Information'
import ChangePw from './components/account/ChangePw'

import Home from './components/home/Home'

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
      path: '/changepw',
      name: 'ChangePw',
      component: ChangePw
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
<<<<<<< HEAD
      path: '/home',
      name: 'home',
      component: Home
=======
      path: '/regist',
      name: 'regist',
      component: registTodo
>>>>>>> 8ec70af51aecb82082550664037b9a9b9a36f51a
    }
  ]
})
