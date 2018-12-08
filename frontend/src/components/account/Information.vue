<template>
    <div>
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
        <h1>Information</h1>

        <h1>{{name}}</h1>
        <p>{{user.loginId}}</p>
        <router-link :to="{name: 'ChangePw', params: {name: this.name}}">change password</router-link>
    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {

    data(){
        return{
            name: this.$route.params.name,
            user:{}
        }
    },
    created(){
        this.$http.get('http://13.124.48.225:8000/user/'+this.name).then((res)=>{
            this.user = res.data
            console.log(this.user)
        })
    },
    components: {
      Slide
    }
}
</script>
