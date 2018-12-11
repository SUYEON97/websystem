<template>
    <div>
        <h1>Information</h1>

        <h1>{{name}}</h1>
        <p>{{user.loginId}}</p>
        <router-link :to="{name: 'ChangePw', params: {name: this.name}}">change password</router-link>
    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {

    data(){
        return{
            name: this.$route.params.name,
            user:{}
        }
    },
    created(){
        this.$http.get('http://localhost:8000/user/'+this.name).then((res)=>{
            this.user = res.data
            console.log(this.user)
        })
    },
    components: {
      Slide
    }
}
</script>
