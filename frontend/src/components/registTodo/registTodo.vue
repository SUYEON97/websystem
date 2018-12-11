<template>

  <div id="app">
        <div style="margin-bottom: 20px;">
          <h2>ADD HOMEWORK</h2>
        </div>

      <div class="inputbox">
          <Zondicon icon="arrow-outline-down" class="bye"></Zondicon><span style="font-size:20px">과를 선택해주세요</span><br>
          <select class="custom-select" style="width:200px; height:40px" v-model="selected" name="items1" v-on:change="filter">
              <option v-for="majorlist in majorList" :key="majorlist.id" v-if="majorlist.majorNameId==1">{{majorlist.majorName}}</option>
          </select>
      </div>
        <div class="inputbox">
            <Zondicon icon="arrow-outline-down" class="bye"></Zondicon><span style="font-size:20px">과목을 선택해주세요</span><br>
                <select class="custom-select" style="width:200px; height:40px" v-model="selected2" name="items2">
                  <option v-for="subjectlist in subjectList" :key="subjectlist.id">{{subjectlist.subjectName}}</option>
                </select>
        </div>

        <form class="all" v-on:submit.prevent="writeHwname">
            <Zondicon icon="clipboard" class="bye"></Zondicon><span style="font-size:20px">과제이름을 적어주세요</span><br>
                <input style="width:200px" type="text" name="hwName" v-model="hwName"><br>

            <Zondicon icon="calendar" class="bye"></Zondicon><span style="font-size:20px">데드라인을 선택해주세요</span><br>
                <date-picker v-model="date"/>
                <input style="width:200px" type="text" name="date" v-model="date">
                <input class="hello" type="submit" value="확인">
        </form>
  </div>
</template>

<script>

import { Slide } from 'vue-burger-menu'
import DatePicker from 'v-cal-input'
import Zondicon from "vue-zondicons/src/components/Zondicon";


    export default{
        name: 'app',
        components: {
            Zondicon,
          Slide,
          DatePicker
        },
        data: function () {
            return{
                date: null,
                majorList:[],
                subjectList:[],
                selected: '과를 선택해주세요',
                selected2: '과목을 선택해주세요',
                hwName:"",
                user:{}
            }
        },
        mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      console.log(res.data)
      this.user = res.data.user
      console.log(this.user)
    })
  },
        methods:{
            logout(){
      localStorage.clear();
      this.$router.push('/')
    },
            callMajorList:function(){
                this.$http.get('http://localhost:8000/regist/subject',{user: this.user}).then((response)=> {
                    this.majorList = response.data;//모든 리스트 다 가져옴
                     console.log(response.data);
                }).catch((error)=> {
                    console.log(error.response);
                })
            },
            filter:function () {
                var k = 0;
                for (var i = 0; i < this.majorList.length; i++) {
                    // console.log(this.majorList[0].majorName)
                    if (this.majorList[i].majorName == this.selected) {
                        this.subjectList[k] = this.majorList[i];
                        k++
                    } //전공이름이 같을 경우

                }
                console.log(this.subjectList)
            },
            writeHwname:function () {
                console.log(this.user.loginId)
                this.$http.post('http://localhost:8000/regist/register',
                    {userId: this.user.loginId, hw_name: this.hwName,subject_name:this.selected2 ,major_name: this.selected, hdate:this.date}).then( (response)=> {
                    this.hwName="";
                    this.selected ="";
                    this.selected2="";
                    //console.log(this.date)
                    this.date=null;
                    this.$router.push({name:"Home"})
                    //console.log(response.data);
                }).catch(function (error) {
                    console.log(error.response);
                })
            },
        },
        created: function () {
            this.callMajorList();
        },
        mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      console.log(res.data)
      this.user = res.data.user
      console.log(this.user)
    })
    },

    }
</script>
<style>
    .bye{
        width: 25px;
        height: 25px;
    }
    #app {
        text-align: center;
    }
    .hello {
        padding: 16px;
        border-radius: 50px;
        background: #129793;
        border: none;
        box-shadow: 0 8px 15px 0 rgba(18, 151, 147, .4);
        display: block;
        margin: 0 auto;
        margin-top: 12px;
        width: 25%;
        color: white;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1.05px;
    }
    .all{
        margin-bottom: 50px;
    }
    .inputbox{
        margin-bottom: 20px;
    }
</style>
