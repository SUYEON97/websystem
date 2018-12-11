<template>
    <div class="board" style="margin-top: 50px;">

        <h1>게시판</h1>
        <div class="inDiv">
            <div class="collectBoard">
                <div class="annoy"><Zondicon icon="user-solid-square" class="image"></Zondicon><strong>익명</strong></div>
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
                    <p class="annoy2"><Zondicon icon="user" class="image2"></Zondicon><strong>익명</strong></p>
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
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.$http.get('http://localhost:8000/board/' + this.boardId).then((result) => {
                // console.log(result)
                this.boardId = to.params.boardId
                this.collectList = result.data.filter(c=>c.boardId==this.boardId)
                console.log(this.collectList[0])
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
                this.$http.get('http://localhost:8000/comment/list').then((result) => {
                    this.commentList = result.data.filter(c=>c.boardId==this.boardId)
                })
            },
            newbutton : function() {
                this.$http.post('http://localhost:8000/comment/create',{content:this.newComment, boardId:this.boardId}).then((result) => {
                    this.newComment=""
                    this.getCommentList()
                    this.$router.push({name: "board"})
                })
            },
            listView : function () {
                this.$router.push({name: "communiteHome"})
            }
        },
        created: function () {
            this.getCommentList()
        },
        mounted() {
            this.$http.get('http://localhost:8000/board/' + this.boardId).then((result) => {
                // console.log(result)
                this.collectList = result.data.filter(c=>c.boardId==this.boardId)
                // console.log(this.collectList[0])
                this.listTitle = this.collectList[0].title
                this.listContent = this.collectList[0].content
            }),
                this.$http.get('http://localhost:8000/comment/list').then((result) => {
                    //console.log(result)
                    //this.boardId = to.params.boardId
                    // console.log(this.boardId)
                    this.commentList = result.data.filter(c=>c.boardId==this.boardId)
                    //  for(var i=0;i<this.commentContentList.length;i++){
                    //      this.commentContentList[i]=this.commentList[i].content}
                    // console.log(this.commentContentList)
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