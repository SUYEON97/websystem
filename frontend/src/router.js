import Vue from 'vue'
import Router from 'vue-router'

import SignUp from './components/login/SignUp'
import Login from './components/login/Login'
import registTodo from './components/registTodo/registTodo'
import Information from './components/account/Information'
import ChangePw from './components/account/ChangePw'
import communiteHome from './components/communite/communiteHome.vue'
import Board from './components/communite/Board'
import Write from './components/communite/Write'
import Home from './components/home/Home'
import History from './components/home/History'

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
      path: '/regist',
      name: 'regist',
      component: registTodo
    },{
          path: '/board/:boardId',
          name: 'board',
          component: Board
      }, {
          path: '/write',
          name: 'write',
          component: Write
      },{
           path:'/communite',
          name:'communiteHome',
          component:communiteHome
      },
      {
        path: '/history',
        name: 'history',
        component:History
      }

  ]
})
