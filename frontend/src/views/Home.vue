<template>
    <div class="communiteHome" style="margin-top: 50px;">

        <h1>게시판</h1>
        <div class="inDiv">
        <ul>
            <li id=question v-for="Theme in list" v-bind:key="Theme.boardId">
                <router-link :to="{name : 'board', params: {boardId:Theme.boardId}}">
                    <p id="titleForm">{{Theme.title}}</p>
                    <p id="timeForm">{{Theme.time}}</p>
                </router-link>
            </li>

        </ul>
        <router-link to="/write" class="newWrite"><Zondicon icon="compose" class="w"></Zondicon></router-link>
    </div>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import Zondicon from 'vue-zondicons'


    export default {
        name: 'home',
        data: function () {
            return {
                list: [],
            }
        },components : {Zondicon}
        ,
        methods: {
            getList: function () {
                this.$http.get('http://localhost:8000/board/list').then((result) => {
                    this.list = result.data;
                })
            },
        }
        ,
        created: function () {
            this.getList()

        },
    }
</script>
<style>
    html {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif
    ;
        height: 100vh
    ;
        color: #5B5A5A
    ;
        font-size: 12px
    ;
        font-weight: 200
    ;
        font-family: "돋움";

    }
    .communiteHome {
        position: relative;
        width: 1200px;
        height: auto;
        margin: 0 auto;
        border: 1px solid #EEEEEE;
        box-shadow: 0 0 8px 2px #ccc;
        padding-bottom: 10px;

    }
    * {
    box-sizing: border-box;
    font-family: "Open Sans";
    }


    h1 {
        text-align: center;
        margin: 5%;
        padding: 0;
    }

    #titleForm {
        text-align: left;
        margin-top: 0.2em;
        margin-bottom: 0.2em;
        font-size: 15px;
    }

    #timeForm {
        margin-top: 0.2em;
        margin-bottom: 0.2em;
        font-size: 5px;
        text-align: right;
    }

    #question {
        margin: 0.3em auto;
        margin-left: 200px;
        margin-right: 220px;
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
        /*margin-top: 30px;*/
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

    ul{
        border: 2px solid #EEEEEE;
        margin-left: 100px;
        margin-bottom: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        width: 1000px;
        height: auto;
    }


</style>