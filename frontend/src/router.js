import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Board from './components/Board'
import Write from './components/Write'



Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
          path: '/',
          name: 'home',
          component : Home
        },
        {
            path: '/board/:boardId',
            name: 'board',
            component: Board
        }, {
            path: '/write',
            name: 'write',
            component: Write
        },
        // {
        //     path : '/comment',
        //     name : 'comment',
        //     component:Comment
        // }

    ]
})
