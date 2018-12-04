<template>
    <div id="write">
        <p id="title">
    제목 : <input v-model="newTitle" type="text">
        </p>
        <p id="context">
    내용 : <input v-model="newContent" type="text">
        </p>
        <button @click.prevent="newbutton">제출</button>
    </div>


</template>

<script>
    export default {
        name: "Write",
        data : function(){
            return {
          newTitle :"",
          newContent : "",

            }
        },
        methods : {
            newbutton : function() {
                this.$http.post('http://localhost:8000/write',{title:this.newTitle, content:this.newContent}).then((result) => {
                    this.newTitle=''
                    this.newContent=''
                    this.$router.push({name: "home"})
                })
            }
        }
    }
</script>

<style scoped>

</style>