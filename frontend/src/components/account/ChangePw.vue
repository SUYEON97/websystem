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
            user:{},
            password:{
                present:'',
                change:''
            }
        }
    },
    mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      console.log(res.data)
      this.user = res.data.user
    })
  },
    methods:{
        logout(){
      localStorage.clear();
      this.$router.push('/')
    },
        change(){
            
            this.$http.post('http://localhost:8000/user/changepw', {presentpw: this.password.present, changepw: this.password.change, name: this.user.loginId}).then((res)=>{
                if(res.data.result == 1){
                    alert('로그인 다시');
                    this.logout();
                    //토큰 삭제 재 로그인
                }
            })
        }
    },
    components : {
      Slide
    }
}
</script>
