<template>
    <div class="container">
        <h1>Login</h1>
        <form v-on:submit.prevent='login'>
            <input id="loginId" type="text" placeholder="ID" name="loginid" v-model="user.id"><br>
            <input type="password" name="loginpassword" placeholder="Password" v-model="user.password"><br>
            <input type="submit" value="login" id="form">

        <router-link to="/login/signup" id="link">Sign Up</router-link>
        </form>
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
<style>
<<<<<<< HEAD
html {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  height: 100vh;
  background: #F5F6F7;
  color: #5B5A5A;
  font-size:12px;
  font-weight: 200;
}

.container {
  position: relative;
  width: 380px;
  height: 680px;
  margin: 0 auto;
  border: 1px solid #EEEEEE;
  box-shadow: 0 0 8px 2px #ccc;
}

img.logo {
  display: block;
  margin: 0 auto;
  width: 60%;
  padding: 70px 0px;
}

h1 {
  text-align: center;
  font-weight: 100;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 10px;
}

a {
  text-decoration: none;
  color: inherit;
}

input[type="text"] {
  padding: 16px;
  border-radius: 4px 4px 0 0;
  background: transparent;
  border: 1px solid #CFD0D1;
  display: block;
  margin: 0 auto;
  width: 75%;
}

input[type="password"] {
  padding: 16px;
  border-radius: 0 0 4px 4px;
  border: 1px solid #CFD0D1;
  border-top: none;
  background: transparent;
  display: block;
  margin: 0 auto;
  margin-bottom: 12px;
  width: 75%;
}

input[type="submit"] {
  padding: 16px;
  border-radius: 50px;
  background: #129793;
  border: none;
  box-shadow: 0 8px 15px 0 rgba(18, 151, 147, .4);
  display: block;
  margin: 0 auto;
  margin-top: 12px;
  width: 80%;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1.05px;
}

form a{
  display: block;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 28px;
  text-align: right;
  color: #5B5A5A;
}

div.signup {
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: 20px;
}

div.signup p {
  padding: 0px;
  margin: 4px 0px;
}

div.signup a {
  color: #FF7260;
}
=======
    html {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        height: 100vh;
        background: #F5F6F7;
        color: #5B5A5A;
        font-size:12px;
        font-weight: 200;
    }

    .container {
        position: relative;
        width: 380px;
        height: 500px;
        margin: 0 auto;
        border: 1px solid #EEEEEE;
        box-shadow: 0 0 8px 2px #ccc;
    }

    h1 {
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: center;
        font-weight: 100;
        font-size: 24px;
        text-transform: uppercase;
        letter-spacing: 10px;
    }

    #link {
        text-decoration: none;
        color: inherit;
    }

    input[type="text"] {
        padding: 10px;
        margin-bottom: 7px;
        border-radius: 4px 4px 0 0;
        background: transparent;
        border: 1px solid #CFD0D1;
        display: block;
        margin: 0 auto;
        width: 75%;
    }

    input[type="password"] {
        padding: 10px;
        margin-bottom: 7px;
        border-radius: 0 0 4px 4px;
        border: 1px solid #CFD0D1;
        background: transparent;
        display: block;
        margin: 0 auto;
        margin-bottom: 12px;
        width: 75%;
    }

    input[type="submit"] {
        padding: 16px;
        border-radius: 50px;
        background: #129793;
        border: none;
        box-shadow: 0 8px 15px 0 rgba(18, 151, 147, .4);
        display: block;
        margin: 0 auto;
        margin-top: 12px;
        width: 60%;
        color: white;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1.05px;
    }

    form #link{
        display: block;
        width: 80%;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 28px;
        text-align: right;
        color: #5B5A5A;
    }

</style>

>>>>>>> origin/suyeob

</style>
