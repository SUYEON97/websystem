<template>
    <ul>
      <Slide width='200'>
          <a id="home" href="#">
            <span><router-link :to="{name: 'Home', params: {name: this.name}}">home</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'Information', params: {name: this.name}}">information</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'regist', params: {name: this.name}}">과제등록</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'Login'}">log out</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'communiteHome'}">커뮤니티</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'history'}">히스토리</router-link></span>
          </a>
        </Slide>
        <li v-for="Theme in list" v-bind:key="Theme.boardId">
            <router-link :to="{name : 'board', params: {boardId:Theme.boardId}}">
                <p>{{Theme.title}}</p>
                <p>{{Theme.time}}</p>
            </router-link>
        </li>
        <router-link to="/write">글쓰기</router-link>
    </ul>
</template>

<script>
import { Slide } from 'vue-burger-menu'
    export default {
        name: 'home',
        data: function () {
            return {
                list: [],
            }
        },
        methods: {
            getList: function () {
                this.$http.get('http://localhost:8000/board/list').then((result) => {
                    this.list = result.data;
                })
            },
        }
        ,
        created: function () {
            this.getList()

        },
        components: {
          Slide
        }
    }
</script>

<style scoped>

</style>
