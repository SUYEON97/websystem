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
    </div>    
</template>

<script>
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
        signup(){
            if(this.user.name=='' || this.user.id=='' || this.user.password=='') alert("fill")
            else if(this.Isuniq==2) alert("check dup")
            else if(this.Isuniq==1) alert("dup")
            else if(this.Isuniq==0){
                this.$http.post('http://localhost:8000/login/signup', {user: this.user}).then((response) => {
                    if(response.data.result == 1){
                        alert('success');
                        this.$router.push('/');
                    }
                },(error)=>{
                console.log('err')
                alert(error.response.data.error)    
                })
            }
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

