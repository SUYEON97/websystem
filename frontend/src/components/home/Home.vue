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
          <span><router-link :to="{name: 'history'}">히스토리</router-link></span>
      </a>
      <a href ="#">
          <span><router-link :to="{name: 'communiteHome'}">커뮤니티</router-link></span>
      </a>
      <a href ="#">
          <span><router-link :to="{name: 'Login'}">log out</router-link></span>
      </a>
    </Slide>
  <h1>Home</h1>

  <p>Hello {{name}}</p>
  <div v-for='hw in hwList' :key="hw.id" >
    <div class = 'deadline' id='short' v-if="hw.timeRemaining<604800000 && hw.timeRemaining>0 && hw.status==0">
      <ul class="list-group">
            <li class="list-group-item">
                <label>
                    <p class="deadlinename" style="font-size:18px">과제이름: {{hw.hw_name}}</p>
                    <p class="deadlinedate" style="font-size:18px">데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일</p>
                </label>
                <label style="padding-left: 20px;">
                    {{hw.dayRm}}일 남음
                </label>



                <b-button-group vertical class="button-group">
                    <b-button class="btn" style="background-color: #de1d1d" v-on:click='deleteHw(hw.hwId)'><Zondicon icon="trash" class="hi"></Zondicon></b-button>
                    <b-button class="btn" style="background-color: #de1d1d" v-on:click='completeHw(hw.hwId)'><Zondicon icon="checkmark" class="hi"></Zondicon></b-button>
                </b-button-group>
            </li>
        </ul>
    </div>

    <div class = 'deadline2' id='long' v-if="hw.timeRemaining>604800000 && hw.timeRemaining<2592000000 && hw.status==0">
        <ul class="list-group">
            <li class="list-group-item" style="background-color: #e26666; color:white">
                <label>
                    <p class="deadlinename" style="font-size:18px" >과제이름: {{hw.hw_name}}</p>
                    <p class="deadlinedate" style="font-size:18px">데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일</p>
                </label>
                <label style="padding-left: 20px;">
                    {{hw.dayRm}}일 남음
                </label>

                <b-button-group vertical class="button-group">
                    <b-button class="btn" v-on:click='deleteHw(hw.hwId)'><Zondicon icon="trash" class="hi"></Zondicon></b-button>
                    <b-button class="btn" v-on:click='completeHw(hw.hwId)'><Zondicon icon="checkmark" class="hi"></Zondicon></b-button>
                </b-button-group>
            </li>
        </ul>
    </div>


    <div class = 'deadline3' id='verylong' v-if="hw.timeRemaining>2592000000 && hw.status==0">
        <ul class="list-group">
            <li class="list-group-item" style="background-color: white; color:black">
                <label>
                    <p class="deadlinename" style="font-size:18px">과제이름: {{hw.hw_name}}</p>
                    <p class="deadlinedate" style="font-size:18px">데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일</p>
                </label>
                <label style="padding-left: 20px;">
                    {{hw.dayRm}}일 남음
                </label>

                <b-button-group vertical class="button-group">
                    <b-button class="btn" style="background-color: white" v-on:click='deleteHw(hw.hwId)'><Zondicon icon="trash" class="hi"></Zondicon></b-button>
                    <b-button class="btn" style="background-color: white" v-on:click='completeHw(hw.hwId)'><Zondicon icon="checkmark" class="hi"></Zondicon></b-button>
                </b-button-group>
            </li>
        </ul>
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
    axios.get('http://13.124.48.225:8000/home/deadlinelist').then(res => {
      console.log("get home")
      this.hwList = res.data
      console.log(res.data)
    location.reload();
    })
      for(var i = 0; i<this.hwList.length; i++){
          if(this.hwList[i].status != 0){
              this.hwList.splice(i,1)
          }
      }
  },
  created() {
    console.log("created")
    axios.get('http://13.124.48.225:8000/home/deadlinelist').then(res => {
      console.log("get home")
      this.hwList = res.data
      console.log(res.data)
      //location.reload();
      this.splitDate();
      this.dayRemain();
    })
      for(var i = 0; i<this.hwList.length; i++){
          if(this.hwList[i].status != 0){
              this.hwList.splice(i,1)
          }
      }
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
      axios.post('http://13.124.48.225:8000/home/delete', {hwId: deleteId})
      for(var i = 0; i<this.hwList.length; i++){
        if(this.hwList[i].hwId == deleteId){
          this.hwList.splice(i,1)
        }
      }
    },
    completeHw(id){
      axios.post('http://13.124.48.225:8000/home/complete', {hwId: id})
      for(var i = 0; i<this.hwList.length; i++){
        if(this.hwList[i].hwId == id){
          this.hwList.splice(i,1)
        }
      }
    },
    dayRemain(){
      for(var i=0; i<this.hwList.length; i++){
        var dayRm = (this.hwList[i].timeRemaining)/86400000
        var arr=[];
        arr = dayRm.toString().split(".")
        this.hwList[i].dayRm = Number(arr[0])+1;
      }
    },
  },
  components: {
    Slide,
    Zondicon
  }
}
</script>


<style>
/*#verylong{*/
  /*color: blue;*/
/*}*/
.button-group{
        float: right;
        heigth:15px;
    }
.deadline3{
    line-height: 1.5rem;
    padding: 10px 20px;
    margin: 0;
    width: 100%;
    left: auto;
    right: auto;
}
.deadline2{
    line-height: 1.5rem;
    padding: 10px 20px;
    margin: 0;
    width: 100%;
    left: auto;
    right: auto;
}
    .list-group-item{
        margin-left: 400px;
        margin-right: 400px;
        background-color: #de1d1d;
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
