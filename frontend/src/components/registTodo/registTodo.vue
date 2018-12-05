<template>
  <div id="app">
        <div>
          <h2>!과제 등록을 해주세요!</h2>
          <router-link :to="{name: 'Home', params: {name: this.name}}">home</router-link>
        <!--</div>-->

        <!--<div>-->
                  <!--<span>과를 선택해주세요!</span><br>-->
                  <!--<b-form-select v-model="selected" class="mb-3" v-on:change="filter" >-->
                  <!--&lt;!&ndash;<select  v-model="selected" name="items1" v-on:change="filter">&ndash;&gt;-->
                    <!--<option v-for="majorlist in majorList" v-if="majorlist.majorNameId==1">{{majorlist.majorName}}</option>-->
                  <!--</b-form-select>-->
            <!--<br>-->
        <!--</div>-->
      <!--<div>-->
          <span>과를 선택해주세요!</span><br>

              <select  v-model="selected" name="items1" v-on:change="filter">
              <option v-for="majorlist in majorList" v-if="majorlist.majorNameId==1">{{majorlist.majorName}}</option>
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
            <span>데드라인을 선택해주세요!</span><br>
                <date-picker v-model="date"/>
                <input type="text" name="date" v-model="date">
                <input type="submit" value="확인">
        </form>

  </div>
</template>

<script>
     import DatePicker from 'v-cal-input'
    // import dropdown from 'vue-dropdowns';
     import 'bootstrap/dist/css/bootstrap.css'
     import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default{
        name: 'app',
        components: {
            DatePicker,
            // 'dropdown' : dropdown
        },
        data: function () {
            return{
                date: null,
                majorList:[],
                subjectList:[],
                selected: '',
                selected2: '',
                hi:'',
                hwName:"",
                name: this.$route.params.name,
                arrayOfObjects: [],
                object: {
                    name: 'Object Name',
                }
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
            },methodToRunOnSelect(payload) {
                this.object = payload;
            },
            filter:function () {
                var k = 0;
                for (var i = 0; i < this.majorList.length; i++) {
                    // console.log(this.majorList[0].majorName)
                    console.log(this.selected)
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

                    //console.log(response.data);
                }).catch(function (error) {
                    console.log(error.response);
                })
            }
        },
        created: function () {
            this.callMajorList();
        }

    }
</script>
<style>

</style>
