<template>
    <div class="communiteHome" style="margin-top: 50px;">
        <Slide width='200'>
          <a id="home" href="#">
            <span><router-link :to="{name: 'Home'}">home</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'Information'}">information</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'regist'}">과제등록</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'communiteHome'}">커뮤니티</router-link></span>
          </a>
          <a href ="#">
            <span><router-link :to="{name: 'history'}">히스토리</router-link></span>
          </a>
          <a href ="#">
            <span><router-link v-on:click.native="logout" :to="{name: 'Logout'}">log out</router-link></span>
          </a>
        </Slide>
        <router-link to="/communite" class="temp" style=" color : black;">자유게시판  |  </router-link><router-link to="/workBoard" class="temp" style=" color : black;">과제게시판</router-link>
        <div class="inDiv">
            <router-link to="/write" class="newWrite"><Zondicon icon="compose" class="w"></Zondicon></router-link>
            <div class="clickBoard">자유게시판</div>
            <ul>
                <li id=question v-for="Theme in list" v-bind:key="Theme.boardId">
                    <router-link :to="{name : 'board', params: {boardId:Theme.boardId}}">
                        <p id="titleForm">{{Theme.title}}</p>
                        <!--<p id="timeForm">{{Theme.time}}</p>-->
                        <p id="timeForm">{{Theme.month}}.{{Theme.day}}   {{Theme.hour}}:{{Theme.min}} </p>
                        <p id="commentNum"> <Zondicon icon="chat-bubble-dots" class="Num"></Zondicon>{{Theme.commentNum}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Slide } from 'vue-burger-menu'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import Zondicon from 'vue-zondicons'

    export default {
        name: 'home',
        data: function () {
            return {
                list: [],
                user:{}
            }
        },
        mouted(){
            this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
            console.log(res.data)
            this.user = res.data.user
            })
        },
        methods: {
            logout(){
      localStorage.clear();
      this.$router.push('/')
    },
            getList: function () {
                this.$http.get('http://localhost:8000/board/list').then((result) => {
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
        }
        ,
        created: function () {
            this.getList()

        },
        components: {
            Slide,
            Zondicon
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
        font-family: "Open Sans";
        /*font-size:30px;*/
    }
    .clickBoard{
        font-size: 25px;
        border: 2px solid #EEEEEE;
        margin:0 auto;
        width: 800px;
    }
    .temp {
        font-size: 30px;
        text-align: center;
        padding: 0;
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
    .Num{
        height: 20px;
        width : 30px;
    }

    ul{
        border: 2px solid #EEEEEE;
        margin:0 auto;
        margin-top: 20px;
        margin-bottom: 50px;
        padding-top: 15px;
        padding-bottom: 50%;
        width: 800px;
        height: auto;
    }
    #commentNum{
        text-align: right;
    }

</style>
