<template>
    <div>
        <h1>Information</h1>
        <p>{{user.name}}</p>
        <router-link :to="{name: 'ChangePw', params: {loginId: this.user.loginId}}">change password</router-link>
    </div>
</template>
<script>

export default {

    data(){
        return{
            user:{},
            fbdlist:{},
            wbdlist:{},
            cmtlist:{}
        }
    },
    mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      console.log(res.data)
      this.user = res.data.user
    })
    this.$http.post('http://localhost:8000/board',{userId: this.user.loginId}).then((result) => {
      this.fbdlist = result.data.filter(c=>c.boardId==this.boardId)
    })
    this.$http.post('http://localhost:8000/workBoard',{userId: this.user.loginId}).then((result) => {
      this.wbdlist = result.data.filter(c=>c.boardId==this.boardId)
    })
    this.$http.post('http://localhost:8000/workComment/list',{userId: this.user.loginId}).then((result) => {
      this.cmtlist = result.data.filter(c=>c.boardId==this.boardId)
    })
    this.$http.post('http://localhost:8000/comment/list',{userId: this.user.loginId}).then((result) => {
      this.cmtlist = result.data.filter(c=>c.boardId==this.boardId)
    })            
  },
  method:{
    logout(){
      localStorage.clear();
      this.$router.push('/')
    },
  },
    components: {
    }
}
</script>
