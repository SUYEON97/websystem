<template>
<div class="home" >
  <h1>Home</h1>
  <router-link :to="{name: 'Home', params: {name: this.name}}">home</router-link> |
  <router-link :to="{name: 'Information', params: {name: this.name}}">information</router-link> |
  <router-link :to="{name: 'regist', params: {name: this.name}}">과제등록</router-link>|
  <router-link :to="{name: 'Login'}">log out</router-link>
  <p>Hello {{name}}</p>
  <div class="deadline" v-for='hw in hwList' :key="hw.id" >
    <div id='short' v-if="hw.timeRemaining<4000000000">
      <ul class="list-group">
        <li class="list-group-item">
         <label>
           <p class="deadlinename" >과제이름: {{hw.hw_name}}</p>
           <p class="deadlinedate">데드라인: {{hw.hw_date}}</p>
         </label>
          <b-button-group vertical class="button-group">
          <b-button class="btn"><Zondicon icon="trash" class="hi"></Zondicon></b-button>
          <b-button class="btn" ><Zondicon icon="checkmark" class="hi"></Zondicon></b-button>
          </b-button-group>

        </li>
      </ul>
    </div>
    <div class="list-group" id='long' v-if="hw.timeRemaining>4000000000">
      과제이름: {{hw.hw_name}}<br>
      데드라인: {{hw.hw_date}}
    </div>


  </div>

  <br /><br /><br /><br /><br />



</div>
</template>

<script>
//import Vue from 'vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Zondicon from 'vue-zondicons'

export default {
  data: function() {
    return {
      hwList: [],
      //user: {userId:0},
      name: this.$route.params.name,
      color:''
    }
  },
    components:{
      Zondicon
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
  }
}
</script>


<style>
  html {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    height: 100vh;
    /*background: #F5F6F7;*/
    color: #5B5A5A;
    font-size: 12px;
    font-weight: 200;
    font-family: "돋움";
  }
  .home {
    position: relative;
    width: 1200px;
    height: auto;
    margin: 0 auto;
    border: 1px solid #EEEEEE;
    box-shadow: 0 0 8px 2px #ccc;

  }
  .btn{
    background-color: #e26666;
    border-style: none;
  }
  .hi{
    width: 15px;
    height: 15px;
  }
#short {
  color: white;
}
.list-group-item{
  margin-left: 300px;
  margin-right: 300px;
  background-color: #e26666;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
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
.deadline{
  background-color: #fff;
  line-height: 1.5rem;
  padding: 10px 20px;
  margin: 0;
  width: 100%;
  left: auto;
  right: auto;
}

  .button-group{
      float: right;
      heigth:15px;

  }
  .deadlinedate{
    margin:0px;
  }
  .deadlinename{
    margin-top: 5px;
  }

</style>
