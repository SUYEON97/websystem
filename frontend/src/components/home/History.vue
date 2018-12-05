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
  <h1>History</h1>
  <p>Hello {{name}}</p><br />
  <p>완료 목록</p>
  <div v-for='hw in hwList' :key="hw.id" >
    <div v-if="hw.status ==1">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일
    </div>
    <div id='long' v-if="hw.status ==2">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일
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
    deleteTodo(todo) {
      const todoIndex = this.hwList.indexOf(todo);
      this.hwList.splice(todoIndex, 1);
    }
  },
  components: {
    Slide
  }
}
</script>
