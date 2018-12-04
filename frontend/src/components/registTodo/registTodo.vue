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
          <span><router-link :to="{name: 'Login'}">log out</router-link></span>
        </a>
      </Slide>
        <div>
          <h2>!과제 등록을 해주세요!</h2>
          
        </div>

        <div>
            <!--v-on:submit.prevent="doctorRegister"-->
                  <span>과를 선택해주세요!</span><br>
                  <select v-model="selected" name="items1" v-on:change="filter">
                    <option v-for="majorlist in majorList" :key="majorlist.id" v-if="majorlist.majorNameId==1">{{majorlist.majorName}}</option>
                  </select><br>
        </div>
        <div>
                <span>과목을 선택해주세요!</span><br>
                <select v-model="selected2" name="items2">
                  <option v-for="subjectlist in subjectList" :key="subjectlist.id">{{subjectlist.subjectName}}</option>
                </select><br>
        </div>

        <form v-on:submit.prevent="writeHwname">
            <span>과제이름을 적어주세요!</span><br>
                <input type="text" name="hwName" v-model="hwName"><br>
            <span>데드라인을 적어주세요!</span><br>
            <!--<input type="text" name="date" v-model="deadlineDate">-->
                <input type="text" name="date" v-model="deadlineYear"><input type="text" name="date" v-model="deadlineMonth"><input type="text" name="date" v-model="deadlineDate">
                <input type="submit" value="확인">
        </form>

  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
    export default{
        name: 'app',
        components: {

        },
        data: function () {
            return{
                majorList:[],
                subjectList:[],
                selected: '과를 선택해주세요',
                selected2: '과목을 선택해주세요',
                hwName:"",
                deadlineYear:"",
                deadlineMonth:"",
                deadlineDate:"",
                name: this.$route.params.name
            }
        },
        methods:{
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
                    {hw_name: this.hwName,subject_name:this.selected2 ,major_name: this.selected, deadlineYear: this.deadlineYear, deadlineMonth:this.deadlineMonth, deadlineDate:this.deadlineDate}).then( (response)=> {
                    this.hwName="";
                    this.deadlineDate="";
                    this.deadlineMonth="";
                    this.deadlineYear="";
                    this.selected ="";
                    this.selected2="";
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error.response);
                })
            }
        },
        created: function () {
            this.callMajorList();
        },
        components: {
          Slide
        }

    }
</script>
<style>

</style>
