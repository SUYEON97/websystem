<template>
    <div id="signup">
        <h1>Sign Up</h1>
        <form v-on:submit.prevent='signup'>
            name : <input type="text" name="signname" v-model="user.name">
            ID : <input type="text" name="signid" v-model="user.id">
            <input type="button" v-on:click="dupcheck" value="dup">
            password : <input type="password" name="signpassword" v-model="user.password">
            <input type="submit" value="Sign Up">
        </form>
        <input 
            type="text"
            name="id"
            v-model="user.id"
            placeholder="ID" />
        <input 
            type="password"
            name="password"
            v-model="user.password"
            placeholder="password" />
        <button @click="register">Register</button>
    </div>    
</template>

<script>
import authentication from '@/services/authentication'
export default {
    data() {
        return{
            user :{
                name:'',
                id:'',
                password:''
            },
            Isuniq:2
        }
    },
    methods:{
        async register(){
            const response = await authentication.register({
                id: this.user.id,
                password: this.user.password
            })
            console.log(response.data);
        },
        signup(){
            this.$http.post('http://localhost:8000/auth/signup', {user: this.user}).then((response) => {
                if(response.data.result==1){
                    alert('success');
                    this.$router.push('/');
                }
            },(error)=>{
            console.log('err')
            alert(error.response.data.error)    
            })
            
        },
        dupcheck(){
            if(this.user.id=='') alert('fill')
            else{
                this.$http.post('http://localhost:8000/login/signup/dupcheck', {id: this.user.id}).then((res)=>{
                if(res.data.result == 1) {
                    alert("uniq")
                    this.Isuniq=0
                }
            },(error)=>{
                console.log('err')
                alert(error.response.data.error)    
                })
            }
            
        }
    }
}
</script>

