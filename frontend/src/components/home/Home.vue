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
      <a href ="#">
        <span><router-link :to="{name: 'history'}">히스토리</router-link></span>
      </a>
    </Slide>
  <h1>Home</h1>

  <p>Hello {{name}}</p>

  <div v-for='hw in hwList' :key="hw.id" >
    <div class = 'deadline' id='short' v-if="hw.timeRemaining<604800000 && hw.status==0">
      <ul class="list-group">
            <li class="list-group-item">
                <label>
                    <p class="deadlinename" >과제이름: {{hw.hw_name}}</p>
                    <p class="deadlinedate">데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일</p>
                </label>
                <b-button-group vertical class="button-group">
                    <b-button class="btn" v-on:click='deleteHw(hw.hwId)'><Zondicon icon="trash" class="hi"></Zondicon></b-button>
                    <b-button class="btn" v-on:click='completeHw(hw.hwId)'><Zondicon icon="checkmark" class="hi"></Zondicon></b-button>
                </b-button-group>
            </li>
        </ul>
    </div>


    <div id='long' v-if="hw.timeRemaining>604800000 && hw.timeRemaining<2592000000 && hw.status==0">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일
      <input class= 'btDelete' type = 'submit' value = 'Delete' v-on:click='deleteHw(hw.hwId)'/>
      <input class= 'btComplete' type = 'submit' value = 'Complete' v-on:click='completeHw(hw.hwId)'/>
    </div>


    <div id='verylong' v-if="hw.timeRemaining>2592000000 && hw.status==0">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일
      <input class= 'btDelete' type = 'submit' value = 'Delete' v-on:click='deleteHw(hw.hwId)'/>
      <input class= 'btComplete' type = 'submit' value = 'Complete' v-on:click='completeHw(hw.hwId)'/>
    </div>

  </div>

  <br /><br /><br /><br /><br />




</div>
</template>

<script>
//import Vue from 'vue'
import axios from 'axios'
import { Slide } from 'vue-burger-menu'
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
      this.splitDate();
    })
  },
  methods : {
    splitDate(){
      var stDate = {
        year: "",
        month: "",
        day: "",
      };
      var arr=[];
      var arr2=[];
      for(var i=0; i<this.hwList.length; i++){
        arr = this.hwList[i].hw_date.split("-")
        stDate.year = arr[0];
        stDate.month = arr[1];
        arr2 = arr[2].split("T");
        stDate.day = arr2[0];
        this.hwList[i].year = stDate.year;
        this.hwList[i].month = stDate.month;
        this.hwList[i].day = stDate.day;
      }
    },
    deleteHw(deleteId) {
      console.log('deleteHw');
      console.log(deleteId);
      axios.post('http://localhost:8000/home/delete', {hwId: deleteId})

      for(var i = 0; i<this.hwList.length; i++){
        if(this.hwList[i].hwId == deleteId){
          this.hwList.splice(i,1)
        }
      }
    },
    completeHw(id){
      axios.post('http://localhost:8000/home/complete', {hwId: id})

      for(var i = 0; i<this.hwList.length; i++){
        if(this.hwList[i].hwId == id){
          this.hwList.splice(i,1)
        }
      }

    }
  },
  components: {
    Slide,
    Zondicon
  }
}
</script>


<style>
#verylong{
  color: blue;
}
.button-group{
        float: right;
        heigth:15px;

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
    .deadline{

        line-height: 1.5rem;
        padding: 10px 20px;
        margin: 0;
        width: 100%;
        left: auto;
        right: auto;
    }
    .btn{
        background-color: #e26666;
        border-style: none;
    }
    .hi{
        width: 15px;
        height: 15px;
    }
    .deadlinedate{
        margin:0px;
    }
    .deadlinename{
        margin-top: 5px;
    }
.btDelete {
    padding: 16px;
    display: block;
    border-radius: 50px;
    background: #129793;
    border: none;
    box-shadow: 0 8px 15px 0 rgba(18, 151, 147, .4);
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 12%;
    color: white;
    text-transform: uppercase;
    text-align: center;
    font-weight: 700;
    font-size:10px;
    letter-spacing: 0.5px;
}

#short {
  color: white;
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
