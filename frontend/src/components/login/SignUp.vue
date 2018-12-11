<template>
    <div class="container" style="  width: 380px;">
        <h1>Sign Up</h1>
        <form v-on:submit.prevent='signup'>
            <label style="font-size: 20px">Name :</label><input type="text" name="signname" v-model="user.name">
            <label style="font-size: 20px">ID : </label><input type="text" name="signid" v-model="user.id">
            <input class="duplicate" type="button" v-on:click="dupcheck" value="중복확인"><br>
            <label style="font-size: 20px">Password: </label> <input type="password" name="signpassword" v-model="user.password">
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
<style>
    .duplicate{
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 50px;
        background: white;
        border: none;
        /*box-shadow: 0 8px 15px 0 rgba(18, 151, 147, .4);*/
        display: block;
        margin: 0 auto;
        /*margin-top: 12px;*/
        width: 25%;
        color: rgba(54, 54, 54, 0.51);
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1.05px;
    }
</style>

