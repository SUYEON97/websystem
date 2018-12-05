<template>
    <div id="board">
        <p>
            {{this.listTitle}}
        </p>
        <p>
            {{this.listContent}}
        </p>
        <span id="comment">
        <ul>
            <li v-for="co in commentList" v-bind:key="co.commentId">
                {{co.content}}
            </li>
        </ul>
            댓글 쓰기 <input type="text" v-model="newComment">
            <button @click.prevent="newbutton">제출</button>

        </span>
       <br> <router-link :to="{name: 'communiteHome'}">댓글 리스트 보기</router-link>

    </div>
</template>

<script>
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
                this.boardId = to.params.boardId
                this.collectList = result.data.filter(c=>c.boardId==this.boardId)
                this.listTitle = this.collectList[0].title
                this.listContent = this.collectList[0].content
                next()
            })
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
            }
        },
        created: function () {
            this.getCommentList()
        },
        mounted() {
            this.$http.get('http://localhost:8000/board/' + this.boardId).then((result) => {

                this.collectList = result.data.filter(c=>c.boardId==this.boardId)
                this.listTitle = this.collectList[0].title
                this.listContent = this.collectList[0].content
            }),
                this.$http.get('http://localhost:8000/comment/list').then((result) => {

                    this.commentList = result.data.filter(c=>c.boardId==this.boardId)

                })

        },
    }

</script>

<style scoped>

</style>
