<template>
    <div id="board">
        <p>
            {{this.listTitle}}
            </p>
        <p>
            {{this.listContent}}
        </p>
        <!--<comment v-for="co in commentList" v-bind:key="co.commentId" :context="co.content"></comment>-->
        <span id="comment">
        <ul>
            <li v-for="co in commentList" v-bind:key="co.commentId">
                {{co.content}}
            </li>
        </ul>
            댓글 쓰기 <input type="text" v-model="newComment">
            <button @click.prevent="newbutton">제출</button>

        </span>

    </div>

</template>

<script>
   // import comment from './Comment.vue'

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
        methods : {
            getCommentList : function () {
                this.$http.get('http://localhost:8000/comment/list').then((result) => {
                    //console.log(result)
                    //this.boardId = to.params.boardId
                   // console.log(this.boardId)
                    this.commentList = result.data.filter(c=>c.boardId==this.boardId)
                    // for(var i=0;i<this.commentContentList.length;i++){
                    // this.commentContentList[i]=this.commentList[i].content}
                    // //console.log(this.commentList)
                })

    },
            newbutton : function() {
                this.$http.post('http://localhost:8000/comment/create',{content:this.newComment, boardId:this.boardId}).then((result) => {
                    this.newComment=""
                    this.getCommentList()
                    this.$router.push({name: "board"})
                })
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

</style>