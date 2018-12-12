<template>
    <div>
        <h1>Information</h1>
        <p id="privatelabel">{{user.name}}의 개인정보</p>
        <p id="myinfo">
          <label>이름   :   {{user.name}} </label><br>
          <label> 아이디   :   {{user.loginId}} </label><br>
          </p>
          <p id="changepw">
          <router-link :to="{name: 'ChangePw'}">비밀번호 변경</router-link>
        </p>
        <h3>내가 작성한 자유게시판 글</h3>

        <div id="blank"><ul class="paper">
          <li v-for="fpap in fbdlist" v-bind:key="fpap.boardId" id="location1" >
            <router-link :to="{name : 'board', params: {boardId:fpap.boardId}}" >
              <Zondicon icon="clipboard" class="clipboard"></Zondicon><br>
              <strong>{{fpap.title}}</strong> <br> </router-link>
          </li>
        </ul>
        </div>
        <h3>내가 작성한 과제게시판 글</h3>
        <div id="blank">

        <ul>
          <li v-for="wpap in wbdlist" v-bind:key="wpap.boardId" id="location2" >
            <router-link :to="{name : 'workBoard', params: {boardId:wpap.boardId}}">
              <Zondicon icon="clipboard" class="clipboard"></Zondicon><br>
              <strong>{{wpap.title}}</strong>    {{wpap.content}}</router-link>
          </li>
          </ul>
        </div>
         <h3>내가 작성한 자유게시판 댓글</h3>
        <div id="blank">

          <ul>
          <li v-for="fcpap in fcmlist" v-bind:key="fcpap.boardId" id="location3">
                        <router-link :to="{name : 'board', params: {boardId:fcpap.boardId}}">
                          <Zondicon icon="conversation" class="clipboard"></Zondicon><br>
                          <strong></strong>    {{fcpap.content}}</router-link>
          </li>
          </ul>
        </div>
        <h3>내가 작성한 과제게시판 댓글</h3>
        <div id="blank">

          <ul>
          <li v-for="wcpap in wcmlist" v-bind:key="wcpap.boardId" id="location4">
                        <router-link :to="{name : 'workBoard', params: {boardId:wcpap.boardId}}">
                          <Zondicon icon="conversation" class="clipboard"></Zondicon><br>
                          <strong></strong>    {{wcpap.content}}</router-link>
          </li>
        </ul><br><br><br><br><br><br><br><br><br><br>
        </div>
        <router-link v-on:click='deluser'>ㅌㅌㅌㅌ</router-link>
    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
import Zondicon from 'vue-zondicons'
export default {

    data(){
        return{
            user:{},
            fbdlist:{},
            wbdlist:{},
            fcmlist:{},
            wcmlist:{}
        }
    },
    mounted(){
    this.$http.get('http://localhost:8000/',{'headers': {authorization: `Bearer ${localStorage.token}`}}).then(res => {
      this.user = res.data.user
      this.$http.post('http://localhost:8000/board',{userId: this.user.loginId}).then((result) => {this.fbdlist = result.data})
      this.$http.post('http://localhost:8000/workboard',{userId: this.user.loginId}).then((result) => {this.wbdlist = result.data})
      this.$http.post('http://localhost:8000/comment',{userId: this.user.loginId}).then((result) => {this.fcmlist=result.data;})
      this.$http.post('http://localhost:8000/workComment',{userId: this.user.loginId}).then((result) => {this.wcmlist = (result.data)})
    })

  },
  method:{
    deluser(){
      localStorage.clear();
      this.$http.post('http://localhost:8000/auth/deluser', {user: this.user}).then((response) => {
        if(response.data.result == 1){
          alert('만들어봤네요');
          this.$router.push('/');
        }
      },(error)=>{
        console.log('err')
        alert(error.response.data.error)
      })
      this.$router.push('/')
    }
  },
    components: {
      Slide,
      Zondicon
    }
}
</script>
<style>

#privatelabel{
margin-top: 30px;
font-size: 15px;
}
#myinfo{
  margin-top: 30px;
  font-size: 20px;
}
#blank{
  overflow: hidden;
  width: auto;
  height: auto;
  margin-left:10%;
  margin-right: 10%;
  margin-bottom: 50px;
}
ul{
  height: auto;
}
#changepw{
  font-size: 20px;
  color: red;
  font-style: italic;
  margin-top:20px;
  margin-bottom: 50px;
}

h3{
  width: 100%;
  height: 100%;
  margin-top: 50px;
  text-align: center;
}
#location1{
  display: flex;
  flex-direction: colunm;
  justify-content: center;
  border: 2px solid red;
  padding: 10px 10px;
  width: 140px;
  height: 120px;
  box-shadow: 0 2px 2px 0 black;
  font-size:15px;
  margin-left: 1%;
  margin-bottom: 1%;
  margin-top: 1%;
  list-style:none;
  float:left;
}
#location2{
  display: flex;
  flex-direction: colunm;
  justify-content: center;
  border: 2px solid yellow;
  padding: 10px 10px;
  width: 140px;
  height: 120px;
  box-shadow: 0 2px 2px 0 black;
  font-size:15px;
  margin-left: 1%;
   margin-bottom: 1%;
  margin-top: 1%;
  list-style:none;
  float:left;
}
#location3{
  display: flex;
  flex-direction: colunm;
  justify-content: center;
  border: 2px solid green;
  padding: 10px 10px;
  width: 140px;
  height: 120px;
  box-shadow: 0 2px 2px 0 black;
  font-size:15px;
  margin-left: 1%;
    margin-bottom: 1%;
  margin-top: 1%;
  list-style:none;
  float:left;
}
#location4{
  display: flex;
  flex-direction: colunm;
  justify-content: center;
  border: 2px solid blue;
  padding: 10px 10px;
  width: 140px;
  height: 120px;
  box-shadow: 0 2px 2px 0 black;
  font-size:15px;
  margin-left: 1%;
   margin-bottom: 1%;
  margin-top: 1%;
  list-style:none;
  float:left;
}

.clipboard{
  width: 30px;
  height:30px;
  margin-bottom: 20px;

}
</style>
