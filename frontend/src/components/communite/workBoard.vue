<template>
    <div class="board" style="margin-top: 50px;">

        <h1>과제게시판</h1>
        <div class="inDiv">
            <div class="collectBoard">
                <div class="annoy"><Zondicon icon="user-solid-square" class="image"></Zondicon><strong>{{this.collectList[0].userId}}</strong></div>
                <p class="title">
                    <strong> {{this.listTitle}}</strong>
                </p>
                <p class="content">
                    {{this.listContent}}
                </p>

            </div>
            <!--<comment v-for="co in commentList" v-bind:key="co.commentId" :context="co.content"></comment>-->

            <ul class="commentL">
                <li v-for="co in commentList" v-bind:key="co.commentId">
                    <p class="annoy2"><Zondicon icon="user" class="image2"></Zondicon><strong>{{co.userId}}</strong></p>
                    <p id="commentTimeForm">{{co.month}}.{{co.day}}   {{co.hour}}:{{co.min}} </p>
                    {{co.content}}
                </li>
            </ul>

            <div class="newComment" style="margin-left: 50px;">
                <b-input-group>
                    <b-form-input type="text" v-model="newComment" class="form-control" placeholder="댓글을 입력해주세요"
                                  aria-describedby="sizing-addon2"></b-form-input>
                    <b-btn @click.prevent="newbutton">작성</b-btn>
                </b-input-group>
            </div>
            <p class="List"><b-btn @click="listView" style="font-size: 15px"><Zondicon icon="list-bullet" class="bullet"></Zondicon> 글 목록</b-btn></p>
        </div>
    </div>

</template>

<script>
    // import comment from './Comment.vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import Zondicon from 'vue-zondicons'

    export default {
        name: "board",
        data: function () {
            return {
                collectList: [],
                listTitle: "",
                listContent: "",
                commentList :[],
                newComment : "",
                boardId: this.$route.params.boardId,
                user:{}
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.$http.get('http://localhost:8000/workBoard/' + this.boardId).then((result) => {
                // console.log(result)
                this.boardId = to.params.boardId
                this.collectList = result.data.filter(c=>c.boardId==this.boardId)
                this.listTitle = this.collectList[0].title
                this.listContent = this.collectList[0].content
                next()
            })
        },
        components : {
            Zondicon
        },
        methods : {
            getCommentList : function () {
                this.$http.get('http://localhost:8000/workComment/list').then((result) => {
                    this.commentList = result.data.filter(c=>c.boardId==this.boardId)
                    this.splitDate()
                })

            },
            newbutton : function() {
                this.$http.post('http://localhost:8000/workComment/create',{userId: this.user.loginId, content:this.newComment, boardId:this.boardId}).then((result) => {
                    this.newComment=""
                    this.getCommentList()
                    this.$router.push({name: "workBoard"})
                })
            },
            listView : function () {
                this.$router.push({name: "workBoardHome"})
            },
            splitDate(){
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
                for(var i=0; i<this.commentList.length; i++){
                    arr = this.commentList[i].time.split("-")

                    stDate.year = arr[0];
                    stDate.month = arr[1];
                    arr2 = arr[2].split("T");

                    stDate.day = arr2[0];
                    stDate.time = arr2[1];
                    arr3=arr2[1].split(":");

                    stDate.hour=arr3[0];
                    stDate.min=arr3[1];
                    this.commentList[i].year = stDate.year;
                    this.commentList[i].month = stDate.month;
                    this.commentList[i].day = stDate.day;
                    this.commentList[i].hour = stDate.hour;
                    this.commentList[i].min = stDate.min;
                    // console.log(this.commentList[i].month)

                }

            }},
        mounted() {
            this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
                this.user = res.data.user
            })
            this.$http.get('http://localhost:8000/workBoard/' + this.boardId).then((result) => {

                this.collectList = result.data.filter(c=>c.boardId==this.boardId)
                this.listTitle = this.collectList[0].title
                this.listContent = this.collectList[0].content
                
            }),
                this.$http.get('http://localhost:8000/workComment/list').then((result) => {
                    this.commentList = result.data.filter(c=>c.boardId==this.boardId)
                })



        },
        // component :{
        //     comment
        // }

    }

</script>

<style scoped>
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

    * {
        box-sizing: border-box;
        font-family: "Open Sans";
    }
    h1 {
        text-align: center;
        padding: 0;
    }
    .inDiv{
        border: 2px solid #EEEEEE;
        margin:0 auto;
        margin-bottom: 50px;
        padding-top: 15px;
        padding-bottom: 50%;
        width: 1000px;
        height: auto;
    }
    .image{
        height: 30px;
        width : 40px;
    }
    .image2{
        height: 15px;
        width : 25px;
    }
    .title{
        font-size: 30px;
        margin: 0 50px;
        text-align: left;
    }
    .content{
        font-size: 15px;
        margin: 20px 50px;
        text-align: left;
    }
    .List{
        float:left;
        margin-left: 60px;
    }
    .annoy{
        text-align: left;
        font-size: 16px;
        margin-left: 47px;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .annoy2{
        text-align: left;
        font-size: 9px;
    }

    .collectBoard{
        border:1px solid rgb(214,214,214);
        width: 600px;
        margin-left: 50px;
        margin-right: 100px;
    }
    .newComment {
        text-align: left;
        width:600px;

        margin-bottom: 20px;
        /*margin-right: 500px;*/
    }

    .commentL{
        margin-left: 50px;
    }
    h1 {
        text-align: center;
        margin: 3%;
        padding: 0;
    }
    ul{
        width:600px;
        border:0;
        padding:0;
        list-style: none;
    }
    li{
        border:1px solid rgb(214,214,214);
        text-align: left;
        padding-left: 50px;
        padding-top: 10px;
        padding-bottom: 10px;

    }
    .bullet{
        height: 20px;
        width : 20px;

    }

</style>