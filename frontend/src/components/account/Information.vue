<template>
    <div>
        <h1>Information</h1>
        <router-link :to="{name: 'Menu', params: {name: this.name}}">menu</router-link>
        <h1>{{name}}</h1>
        <p>{{user.loginId}}</p>
        <router-link :to="{name: 'ChangePw', params: {name: this.name}}">change password</router-link>
    </div>
</template>
<script>
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
    }
}
</script>

