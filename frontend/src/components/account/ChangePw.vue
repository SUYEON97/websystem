<template>
    <div>
        <h1>Change Password</h1>
        <form v-on:submit.prevent='change'>
            present : <input type="password" name="presentpw" v-model="password.present"><br>
            change : <input type="password" name="changepw" v-model="password.change">
            <input type="submit" value="change">
        </form>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
    data(){
        return{
            name: this.$route.params.name,
            password:{
                present:'',
                change:''
            }
        }
    },
    methods:{
        change(){
            this.$http.post('http://localhost:8000/user/changepw', {presentpw: this.password.present, changepw: this.password.change, name: this.name}).then((res)=>{
                if(res.data.result == 1){
                    alert('success');
                    this.$router.push({name: 'Information', params: {name: this.name}});
                }
            })
        }
    },
    components : {
      Slide
    }
}
</script>
