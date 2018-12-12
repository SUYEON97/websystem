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
    alert('로그인 하세요')
    next('/')
  }
  else{
    next();
  }
}
function login(to, from, next) {
  if(localStorage.token){
    next('/home')
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
      component: Login,
      beforeEnter: login
    },
    {
      path: '/login/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: login
    },
    {
      path: '/logout',
      name: 'Logout',
      redirect: '/'
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
      component: ChangePw,
      beforeEnter: loggedin
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
      component: registTodo,
      beforeEnter: loggedin
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: Board,
      beforeEnter: loggedin
    },
    {
      path: '/write',
      name: 'Write',
      component: Write,
      beforeEnter: loggedin
    },
    {
      path:'/communite',
      name:'communiteHome',
      component:communiteHome,
      beforeEnter: loggedin
    },
    {
      path: '/history',
      name: 'history',
      component:History,
      beforeEnter: loggedin
    },
    {
      path: '/workBoard',
      name: 'workBoardHome',
      component:workBoardHome,
      beforeEnter: loggedin
    },
    {
      path: '/writeWorkBoard',
      name: 'writeWorkBoard',
      component: writeWorkBoard,
      beforeEnter: loggedin
    },
    {
      path: '/workBoard/:boardId',
      name: 'workBoard',
      component: workBoard,
      beforeEnter: loggedin
    }
  ]
})
