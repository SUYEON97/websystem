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
        </Slide>
        <h1>Change Password</h1>
        <form v-on:submit.prevent='change'>
            present : <input type="password" name="presentpw" v-model="password.present"><br>
            change : <input type="password" name="changepw" v-model="password.change">
            <input type="submit" value="change">
        </form>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
    data(){
        return{
            name: this.$route.params.name,
            password:{
                present:'',
                change:''
            }
        }
    },
    methods:{
        change(){
            this.$http.post('http://localhost:8000/user/changepw', {presentpw: this.password.present, changepw: this.password.change, name: this.name}).then((res)=>{
                if(res.data.result == 1){
                    alert('success');
                    this.$router.push({name: 'Information', params: {name: this.name}});
                }
            })
        }
    },
    components : {
      Slide
    }
}
</script>
