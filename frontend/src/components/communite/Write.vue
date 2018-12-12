<template>
    <div class="write">
        <h3 style="text-align: left;margin-left: 50px;margin-top: 20px;">게시글 작성</h3>
        <div class="inDiv">
            <div class="input-group">

                <input v-model="newTitle" type="text" class="form-control" placeholder="제목을 입력해주세요"
                       aria-describedby="sizing-addon2">

            </div>
            <div class="input-group input-group-sm">
            <textarea v-model="newContent" class="form-control" placeholder="내용을 입력해주세요"
                      aria-describedby="sizing-addon3"
                      style="height: 400px;"></textarea>
            </div>

            <b-button @click.prevent="newbutton" style="background-color: forestgreen">글쓰기</b-button>
            <b-button @click.prevent="returnButton">뒤로가기</b-button>
        </div>
    </div>


</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        name: "Write",
        data: function () {
            return {
                user:{},
                newTitle: "",
                newContent: "",
            }
        },
        mounted(){
            this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
                this.user = res.data.user
                console.log(this.user.loginId)
            })
        },
        methods: {
            newbutton: function () {
                if(this.newTitle==''||this.newContent=='')
                {
                    alert('양식이 올바르지 않습니다. 확인해주세요.')
                }
                else{
                console.log(this.user.loginId)
                this.$http.post('http://localhost:8000/write', {
                    userId: this.user.loginId,
                    title: this.newTitle,
                    content: this.newContent
                }).then((result) => {
                    this.newTitle = ''
                    this.newContent = ''
                    this.$router.push({name: "communiteHome"})
                })}
            },
            returnButton: function (){
                this.$router.push({name: "communiteHome"})
            }
        }
    }
</script>

<style scoped>
    html {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif
    ;
        height: 100vh
    ;
        background: #F5F6F7
    ;
        color: #5B5A5A
    ;
        font-size: 12px
    ;
        font-weight: 200
    ;
    }
    .write {
        position: relative;
        width: 1200px;
        height: auto;
        margin: 0 auto;
        border: 1px solid #EEEEEE;
        box-shadow: 0 0 8px 2px #ccc;
        margin-top: 50px;
    }
    button {
        margin-right: 8px;
        margin-top: 15px;
        margin-bottom: 30px;
        /*font-size: 15px;*/
        color: white;
    }
    input[type="text"] {
        margin-left: 50px;
        margin-right : 100px;
        margin-top: 10px;
    }
    textarea {
        margin-left: 50px;
        margin-right : 100px;
        margin-top: 10px;
    }
    h3{
        margin-bottom: 20px;
        margin-left: 50px;
    }
    .inDiv{
        border: 2px solid #EEEEEE;
        margin-left: 100px;
        margin-bottom: 50px;
        padding-top: 15px;
        width: 1000px;
        height: auto;
    }
</style>
