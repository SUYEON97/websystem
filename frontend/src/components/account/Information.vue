<template>
    <div>

      <Slide width='200'>
      <a id="home" href="#">
        <span><router-link :to="{name: 'Home'}">home</router-link></span>
      </a>
      <a href ="#">
        <span><router-link :to="{name: 'Information'}">information</router-link></span>
      </a>
      <a href ="#">
        <span><router-link :to="{name: 'regist'}">과제등록</router-link></span>
      </a>
      <a href ="#">
          <span><router-link :to="{name: 'history'}">히스토리</router-link></span>
      </a>
      <a href ="#">
        <span><router-link :to="{name: 'communiteHome'}">커뮤니티</router-link></span>
      </a>
      <a href ="#">
          <span><router-link v-on:click.native="logout" :to="{name: 'Logout'}">log out</router-link></span>
      </a>
    </Slide>

        <h1>Information</h1>
        <p>{{user.name}}</p>
        <router-link :to="{name: 'ChangePw', params: {loginId: this.user.loginId}}">change password</router-link>
    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {

    data(){
        return{
            user:{},
            fbdlist:{},
            wbdlist:{},
            cmtlist:{}
        }
    },
    mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      console.log(res.data)
      this.user = res.data.user
    })
    this.$http.post('http://localhost:8000/board',{userId: this.user.loginId}).then((result) => {
      this.fbdlist = result.data.filter(c=>c.boardId==this.boardId)
    })
    this.$http.post('http://localhost:8000/workBoard',{userId: this.user.loginId}).then((result) => {
      this.wbdlist = result.data.filter(c=>c.boardId==this.boardId)
    })
    this.$http.post('http://localhost:8000/workComment/list',{userId: this.user.loginId}).then((result) => {
      this.cmtlist = result.data.filter(c=>c.boardId==this.boardId)
    })
    this.$http.post('http://localhost:8000/comment/list',{userId: this.user.loginId}).then((result) => {
      this.cmtlist = result.data.filter(c=>c.boardId==this.boardId)
    })            
  },
  method:{
    logout(){
      localStorage.clear();
      this.$router.push('/')
    },
  },
    components: {
      Slide
    }
}
</script>
