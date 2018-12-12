<template>
    <div class="write">
        <h3 style="text-align: left;margin-left: 50px;margin-top: 20px;">게시글 작성</h3>
        <div class="inDiv">
            <div class="input-group">
                <div class="select-group">
                    <select v-model="selected" class="select" name="items1" v-on:change="filter">
                        <option v-for="majorlist in majorList" :key="majorlist.id" v-if="majorlist.majorNameId==1">{{majorlist.majorName}}</option>
                    </select>
                    <select v-model="selected2" class="select" name="items2">
                        <option v-for="subjectlist in subjectList" :key="subjectlist.id">{{subjectlist.subjectName}}</option>
                    </select>
                </div>
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
                newTitle: "",
                newContent: "",
                majorList:[],
                subjectList:[],
                selected: "",
                selected2: "",
                user:{}
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
                //console.log(this.selected)
                this.$http.post('http://localhost:8000/writeWorkBoard', {
                    userId: this.user.loginId,
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
        }, created: function () {
            this.callMajorList();
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

    .select-group{
        margin-left: 50px;
        margin-top: 10px;
    }
    .select{
        height: 30px;
    }
</style>
