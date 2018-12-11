<template>
<div class="home">
  <h1>Home</h1>

  <p>Hello {{this.user.loginId}}</p>


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
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Zondicon from 'vue-zondicons'

export default {
  data: function() {
    return {
      hwList: [],
      //user: {userId:0},
      //name: this.$route.params.name,
      user:{},
      color:''
    }
  },
  beforeMount(){
    axios.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      //console.log(res.data.user);
      this.user = res.data.user;
      console.log("bfmountid",this.user.loginId);
      axios.post('http://localhost:8000/home/deadlinelist',{userId: this.user.loginId}).then(res => {
      console.log("mountedid2",this.user.loginId);
      console.log(res.data);
      this.hwList = res.data
      this.splitDate();
      this.dayRemain();
      console.log(this.hwList)
    });
    });
  },
  // mounted(){
  //   axios.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
  //     console.log(res.data)
  //   })
  // },
  beforeRouteUpdate(){
    axios.post('http://localhost:8000/home/deadlinelist',{userId: this.user.loginId}).then(res => {
    console.log(this.user.loginId)
    this.hwList = res.data
    location.reload();
    })
    for(var i = 0; i<this.hwList.length; i++){
      if(this.hwList[i].status != 0){
        this.hwList.splice(i,1)
      }
    }
  },
  // created() {
  //   console.log(this.$route.name)
  //   axios.get('http://localhost:8000/home/deadlinelist').then(res => {
  //     console.log("get home")
  //     this.hwList = res.data
  //     console.log(res.data)
  //     //location.reload();
  //     this.splitDate();
  //     this.dayRemain();
  //   })
  //     // for(var i = 0; i<this.hwList.length; i++){
  //     //     if(this.hwList[i].status != 0){
  //     //         this.hwList.splice(i,1)
  //     //     }
  //     // }
  // },
  methods : {
    logout(){
      localStorage.clear();
      this.$router.push('/')
    },
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
