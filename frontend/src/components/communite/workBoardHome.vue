<template>
    <div class="workBoardHome" style="margin-top: 50px;">
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
        <router-link to="/communite" class="temp" style=" color : black;">자유게시판  |  </router-link><router-link to="/workBoard" class="temp" style=" color : black;">과제게시판</router-link>
        <div class="inDiv">
            <router-link to="/writeWorkBoard" class="newWrite"><Zondicon icon="compose" class="w"></Zondicon></router-link>
            <div class="clickBoard">과제게시판</div>
            <ul class="boardList">
                <li id=question v-for="Theme in calData" v-bind:key="Theme.boardId">
                    <router-link :to="{name : 'workBoard', params: {boardId:Theme.boardId}}">
                        <p id="titleForm">{{Theme.title}}</p>

                        <p id="timeForm">{{Theme.month}}.{{Theme.day}}   {{Theme.hour}}:{{Theme.min}}
                            <label id="what">{{Theme.major_name}} - {{Theme.subject_name}}</label></p>
                    </router-link>
                </li>
            </ul>
<div class="select-group">
            <select v-model="selected" class="select" name="items1" v-on:change="filter">
                <option v-for="majorlist in majorList" :key="majorlist.id" v-if="majorlist.majorNameId==1">{{majorlist.majorName}}</option>
            </select>
            <select v-model="selected2" class="select" name="items2">
                <option v-for="subjectlist in subjectList" :key="subjectlist.id">{{subjectlist.subjectName}}</option>
            </select>
        </div>
            <b-btn @click="find">찾기</b-btn>
            <div class="page">
                <p>Current page: {{ currentPage }}</p>
                <b-pagination align="center" size="md" :total-rows="100" v-model="currentPage" :length="numOfPages">
                </b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { Slide } from 'vue-burger-menu'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import Zondicon from 'vue-zondicons'

    export default {
        name: 'workBoard',
        data: function () {
            return {
                list: [],
                findList :[],
                userWant : "",
                currentPage:1,
                dataPerPage:10,
                majorList:[],
                subjectList:[],
                selected: "",
                selected2: "",
            }
        }
        ,
        methods: {
            getList: function () {
                this.$http.get('http://localhost:8000/workBoard/list').then((result) => {
                    this.list = result.data;
                    this.splitDate();
                })
            },splitDate(){
                var stDate = {
                    year: "",
                    month: "",
                    day: "",
                    time : "",
                    hour :"",
                    min :"",
                };
                var arr=[];
                var arr2=[];
                var arr3=[];
                for(var i=0; i<this.list.length; i++){
                    arr = this.list[i].time.split("-")
                    stDate.year = arr[0];
                    stDate.month = arr[1];
                    arr2 = arr[2].split("T");
                    stDate.day = arr2[0];
                    stDate.time = arr2[1];
                    arr3=arr2[1].split(":");
                    stDate.hour=arr3[0];
                    stDate.min=arr3[1];
                    this.list[i].year = stDate.year;
                    this.list[i].month = stDate.month;
                    this.list[i].day = stDate.day;
                    this.list[i].hour = stDate.hour;
                    this.list[i].min = stDate.min;


                }
            },
            find(){
                this.$http.get('http://localhost:8000/workBoard/list').then((result) => {
                    this.list = result.data.filter(c=>c.major_name={$regex:this.userWant})
                    this.splitDate();
            })
            },
            newbutton: function () {
                //console.log(this.selected)
                this.$http.post('http://localhost:8000/writeWorkBoard', {
                    title: this.newTitle,
                    content: this.newContent,
                    major_name:this.selected,
                    subject_name:this.selected2
                }).then((result) => {
                    this.newTitle = ''
                    this.newContent = ''
                    this.selected=''
                    this.selected2=''
                    this.$router.push({name: "workBoardHome"})
                })
            },
            returnButton: function (){
                this.$router.push({name: "workBoardHome"})
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
        }
        ,
        created: function () {
            this.getList()

        },
        computed:{
            startOffset(){
                return ((this.currentPage-1)*this.dataPerPage);
            },
            endOffset(){
                return (this.startOffset+this.dataPerPage);
            },
            numOfPages(){//내가 받아오는 list를 보여줄 페이지 수로 잘라서 계산(math.ceil:소수점 이하 올림)
                return Math.ceil(this.list.length/this.dataPerPage);
            },
            calData(){
                return this.list.slice(this.startOffset,this.endOffset)
                //page의 숫자와 page당 보여질 data의 갯수에 따라서 계산된 startOffset과 endOffset을 이용해
                //slice 하여 return.
            }
        },
        components: {
            Slide,
            Zondicon
        }
    }
</script>

<style scoped>
    /** {*/
        /*box-sizing: border-box;*/
        /*font-family: "Open Sans";*/
    /*}*/

    .temp {
        font-size: 30px;
        text-align: center;
        padding: 0;
    }
    .clickBoard{
        border: 2px solid #EEEEEE;
        margin:0 auto;
        width: 800px;
        font-size: 25px;
    }

    #titleForm {
        text-align: left;
        margin-top: 0.2em;
        margin-bottom: 0.2em;
        font-size: 20px;
    }

    #timeForm {
        margin-top: 0.2em;
        margin-bottom: 0.2em;
        font-size: 10px;
        text-align: left;
        margin-top: 5px;
    }

    #question {
        position: center;
        margin: 0.3em auto;
        margin-left: 150px;
        margin-right: 180px;
        margin-bottom: 5px;
        padding: 0.3em;
        padding-left: 20px;
        padding-right: 30px;
        background: rgb(200,191,231);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
        transition: all 0.1s, border 0.25s ease-out;
        list-style: none;
    }

    a:link {
        text-decoration: none;
        color: white;
    }

    a:visited {
        text-decoration: none;
        color: white;
    }

    a:hover {
        text-decoration: none;
        color: black;
    }
    .newWrite{

        margin-left: 1000px;
        margin-right: 500px;
        margin-bottom: 30px;
        padding: 0.3em;
        padding-left: 10px;
        padding-right: 10px;
        /*background: white;*/
        /*box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);*/
        transition: all 0.1s, border 0.25s ease-out;
        list-style: none;
    }
    .w{
        height: 25px;
        width : 40px;
    }

    .boardList{
        border: 2px solid #EEEEEE;
        margin:0 auto;
        margin-top: 20px;
        margin-bottom: 50px;
        padding-top: 15px;
        padding-bottom: 20%;
        width: 800px;
        height: auto;
    }
#what{
float: right;
    font-style: italic;
}

</style>
