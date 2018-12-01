<template>
    <div id="login">
        <h1>Login</h1>
        <form v-on:submit.prevent='login'>
            ID : <input type="text" name="loginid" v-model="user.id">
            password : <input type="password" name="loginpassword" v-model="user.password">
            <input type="submit" value="login">
        </form>
        <router-link to="/login/signup">Sign Up</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user:{
                id:'',
                password:'',
            },
            name: ''
        }
    },
    methods:{
        login() {
            this.$http.post('http://localhost:8000/login/check',{user: this.user}).then((response)=>{
                alert('success')
                this.name = response.data.userName
                console.log(this.name)
                this.$router.push({name: "Home", params: {name: this.name}});
            },(error)=>{
                console.log('err')
                alert(error.response.data.error)
            }).catch(error=>{
                alert(error)
            })

        }
    }
}
</script>

