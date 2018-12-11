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
            <span><router-link :to="{name: 'Logout'}">log out</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'communiteHome'}">커뮤니티</router-link></span>
          </a>
          <a href ="#">
            <span><router-link v-on:click.native="logout" :to="{name: 'history'}">히스토리</router-link></span>
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
            user:{}
        }
    },
    mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      console.log(res.data)
      this.user = res.data.user
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
