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
import workBoardHome from './components/communite/workBoardHome.vue'
import writeWorkBoard from './components/communite/writeWorkBoard.vue'
import workBoard from './components/communite/workBoard.vue'

Vue.use(Router)

function loggedin(to, from, next) {
  if(!localStorage.token){
    next('/')
  }
  else{
    next();
  }
}
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
      component: SignUp,

    },
    {
      path: '/information',
      name: 'Information',
      component: Information,
      beforeEnter: loggedin
    },

    {
      path: '/changepw',
      name: 'ChangePw',
      component: ChangePw
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: loggedin
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
      },
      {
          path: '/workBoard',
          name: 'workBoardHome',
          component:workBoardHome
      },
      {
          path: '/writeWorkBoard',
          name: 'writeWorkBoard',
          component: writeWorkBoard
      },
      {
          path: '/workBoard/:boardId',
          name: 'workBoard',
          component: workBoard
      }

  ]
})
