<template>
    <div>
        <h1>Information</h1>
        <p>{{user.name}}</p>
        <router-link :to="{name: 'ChangePw', params: {loginId: this.user.loginId}}">change password</router-link>
    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {

    data(){
        return{
            user:{}
        }
    },
    mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      console.log(res.data)
      this.user = res.data.user
    })
  },
  method:{
    logout(){
      localStorage.clear();
      this.$router.push('/')
    },
  },
    components: {
      Slide
    }
}
</script>
