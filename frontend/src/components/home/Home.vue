<template>
<div class="home">
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
  <h1>Home</h1>

  <p>Hello {{name}}</p>
  <div v-for='hw in hwList' :key="hw.id" >
    <div id='short' v-if="hw.timeRemaining<4000000000">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.hw_date}}
    </div>
    <div id='long' v-if="hw.timeRemaining>4000000000">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.hw_date}}
    </div>

  </div>

  <br /><br /><br /><br /><br />



</div>
</template>

<script>
//import Vue from 'vue'
import axios from 'axios'
import { Slide } from 'vue-burger-menu'

export default {
  data: function() {
    return {
      hwList: [],
      //user: {userId:0},
      name: this.$route.params.name,
      color:''
    }
  },
  beforeRouteUpdate(){
    console.log("before")
    axios.get('http://localhost:8000/home/deadlinelist').then(res => {
      console.log("get home")
      this.hwList = res.data
      console.log(res.data)

    location.reload();
    })
  },
  created() {
    console.log("created")
    axios.get('http://localhost:8000/home/deadlinelist').then(res => {
      console.log("get home")
      this.hwList = res.data
      console.log(res.data)
      //location.reload();
    })


    //this.$http.get(`http://localhost:8000/user`).then(res => {
      //this.user = res.data
    //})
  },
  components: {
    Slide
  }
}
</script>


<style>
#short {
  color: red;
}
a {
    text-decoration: none;
    color: inherit;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
