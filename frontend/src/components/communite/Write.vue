<template>
    <div id="write">
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
        </Slide>
        <p id="title">
            제목 : <input v-model="newTitle" type="text">
        </p>
        <p id="context">
            내용 : <input v-model="newContent" type="text">
        </p>
        <button @click.prevent="newbutton">제출</button>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
    export default {
        name: "Write",
        data : function(){
            return {
                newTitle :"",
                newContent : "",

            }
        },
        methods : {
            newbutton : function() {
                this.$http.post('http://localhost:8000/write',{title:this.newTitle, content:this.newContent}).then((result) => {
                    this.newTitle=''
                    this.newContent=''
                    this.$router.push({name: "communiteHome"})
                })
            }
        },
        components : {
          Slide
        }
    }
</script>

<style scoped>

</style>
