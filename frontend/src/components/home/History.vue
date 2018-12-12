<template>
<div class="home">
  <h1>History</h1>
  <p>Hello {{this.user.loginId}}</p><br />
  <p style="font-size:20px">완료 목록</p>
  <div v-for='hw in hwList' :key="hw.id" >
    <div class="history" v-if="hw.status ==1">
        <ul class="list-group">
            <li class="list-group-item" style="border-color: blue; background-color: white; color:black">
                <label class="work2">
                    <p class="historyname" style="font-size:18px" >과제이름: {{hw.hw_name}}</p>
                    <p class="historydate" style="font-size:18px">데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일</p>
                </label>
                <label class="iconloc">
                    <Zondicon  icon="mood-happy-outline" class="historyicon"></Zondicon>
                </label>
                <b-button class="historybtn" v-on:click='deleteHw(hw.hwId)'><Zondicon icon="trash" class="hi"></Zondicon></b-button>
            </li>
        </ul>
    </div>
  </div><br>

    <p style="font-size:20px">미완성 목록</p>
    <div v-for='hw in hwList' :key="hw.id" >
    <div class="history"  v-if="hw.status ==2">
        <ul class="list-group">
            <li class="list-group-item" style="border-color: red; background-color: white; color:black;">
                <label class="work2">
                    <p class="historyname" style="font-size:18px">과제이름: {{hw.hw_name}}</p>
                    <p class="historydate" style="font-size:18px">데드라인: {{hw.year}}년 {{hw.month}}월 {{hw.day}}일</p>
                </label>
                <label class="iconloc">
                    <Zondicon style="color: blue;" icon="mood-sad-outline" class="historyicon"></Zondicon>
                </label>
                <b-button class="historybtn" v-on:click='deleteHw(hw.hwId)'><Zondicon icon="trash" class="hi"></Zondicon></b-button>
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
      user: {},
      name: this.$route.params.name,
      color:''
    }
  },
  beforeMount(){
    axios.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      this.user = res.data.user;
      console.log("bfmountid",this.user.loginId);
      axios.post('http://localhost:8000/home/deadlinelist',{userId: this.user.loginId}).then(res => {
      console.log("mountedid2",this.user.loginId);
      this.hwList = res.data
      this.splitDate();

      console.log(this.hwList)
    });
    });
  },
  beforeRouteUpdate(){
    axios.post('http://localhost:8000/home/deadlinelist',{userId: this.user.loginId}).then(res => {
    console.log(this.user.loginId)
    this.hwList = res.data
    location.reload();
    })
    for(var i = 0; i<this.hwList.length; i++){
      if(this.hwList[i].status == 0){
        this.hwList.splice(i,1)
      }
    }
  },
  // created() {
  //   console.log("created")
  //   axios.get('http://localhost:8000/home/deadlinelist').then(res => {
  //     console.log("get home")
  //     this.hwList = res.data
  //     console.log(res.data)
  //     //location.reload();
  //     this.splitDate();
  //   })
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
  },
  components: {
      Zondicon
  }
}
</script>
<style>
    .historyicon{
        width: 25px;
        height: 25px;
        float: right;
    }
    .iconloc{
        float: left;
        padding-top: 20px;
        padding-left: 8px;

    }
    .historybtn{
        background-color: white;
        float: right;
        margin-top: 17px;
    }
    .history{

        line-height: 1.5rem;
        padding: 10px 20px;
        margin: 0;
        width: 100%;
        left: auto;
        right: auto;
    }
    .historydate{
        margin:0px;
    }
    .historyname{
        margin-top: 5px;
    }
    .list-group-item{
        margin-left: 400px;
        margin-right: 400px;
        background-color: #de1d1d;
        padding-left: 0px;
        padding-right: 0px;
        /*width:750px;*/
        padding-top: 5px;
        padding-bottom: 5px;
        text-align: center;

    }
    ul{
        position : center;
        /*margin-left: 50px;*/
    }
    .work2{
        /*margin-left: 35px;*/
    }

</style>
