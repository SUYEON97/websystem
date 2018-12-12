<template>
    <div>
        <h1>Information</h1>
        <p>{{user.name}}의 개인정보</p><router-link :to="{name: 'ChangePw'}">비밀번호 변경</router-link>
        
        <h2>내 글</h2>
        <ul class="paper">
          <li v-for="fpap in fbdlist" v-bind:key="fpap.boardId">
            <p class="inpaper"><strong>[자유]{{fpap.title}}</strong>    {{fpap.content}}</p>
          </li>
          <li v-for="wpap in wbdlist" v-bind:key="wpap.boardId">
            <p class="inpaper"><strong>[과제]{{wpap.title}}</strong>    {{wpap.content}}</p>
          </li>
          <li v-for="fcpap in fcmlist" v-bind:key="fcpap.boardId">
            <p class="inpaper">[댓글]{{fcpap.content}}</p>
          </li>
          <li v-for="wcpap in wcmlist" v-bind:key="wcpap.boardId">
            <p class="inpaper">[댓글]{{wcpap.content}}</p>
          </li>
        </ul>
        <router-link v-on:click='deluser'>ㅌㅌㅌㅌ</router-link>
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
            fcmlist:{},
            wcmlist:{}
        }
    },
    mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      this.user = res.data.user
      this.$http.post('http://localhost:8000/board',{userId: this.user.loginId}).then((result) => {this.fbdlist = result.data})
      this.$http.post('http://localhost:8000/workboard',{userId: this.user.loginId}).then((result) => {this.wbdlist = result.data})
      this.$http.post('http://localhost:8000/comment',{userId: this.user.loginId}).then((result) => {this.fcmlist=result.data;})
      this.$http.post('http://localhost:8000/workComment',{userId: this.user.loginId}).then((result) => {this.wcmlist = (result.data)})             
    })
    
  },
  method:{
    deluser(){
      localStorage.clear();
      this.$http.post('http://localhost:8000/auth/deluser', {user: this.user}).then((response) => {
        if(response.data.result == 1){
          alert('만들어봤네요');
          this.$router.push('/');
        }
      },(error)=>{
        console.log('err')
        alert(error.response.data.error)    
      })     
      this.$router.push('/')
    }
  },
    components: {
      Slide
    }
}
</script>
