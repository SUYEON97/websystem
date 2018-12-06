<template>

  <div id="app">
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
        <div>
          <h2>ADD HOMEWORK</h2>

        </div>

      <div class="inputbox">
          <span>과를 선택해주세요</span><br>
          <select class="custom-select" style="width:200px; height:40px" v-model="selected" name="items1" v-on:change="filter">
              <option v-for="majorlist in majorList" :key="majorlist.id" v-if="majorlist.majorNameId==1">{{majorlist.majorName}}</option>
          </select>
      </div>
        <div>
                <span>과목을 선택해주세요</span><br>
                <select class="custom-select" style="width:200px; height:40px" v-model="selected2" name="items2">
                  <option v-for="subjectlist in subjectList" :key="subjectlist.id">{{subjectlist.subjectName}}</option>
                </select>
        </div>

        <form v-on:submit.prevent="writeHwname">
            <span>과제이름을 적어주세요</span><br>
                <input style="width:200px" type="text" name="hwName" v-model="hwName"><br>

            <span>데드라인을 선택해주세요</span><br>
                <date-picker v-model="date"/>
                <input style="width:200px" type="text" name="date" v-model="date">
                <input type="submit" value="확인">
        </form>
  </div>
</template>

<script>

import { Slide } from 'vue-burger-menu'
import DatePicker from 'v-cal-input'


    export default{
        name: 'app',
        components: {
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
                name: this.$route.params.name
            }
        },
        methods:{
            goHome:function(){
                this.$router.push({name: "Home"})
            },
            callMajorList:function(){
                this.$http.get('http://localhost:8000/regist/subject').then((response)=> {
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
                this.$http.post('http://localhost:8000/regist/register',
                    {hw_name: this.hwName,subject_name:this.selected2 ,major_name: this.selected, hdate:this.date}).then( (response)=> {
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
        }

    }
</script>
<style>
    #app {
        text-align: center;
    }
    #form {
        padding: 16px;
        border-radius: 50px;
        background: #129793;
        border: none;
        box-shadow: 0 8px 15px 0 rgba(18, 151, 147, .4);
        display: block;
        margin: 0 auto;
        margin-top: 12px;
        width: 60%;
        color: white;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1.05px;
    }
</style>
