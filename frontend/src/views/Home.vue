<template>
<div class="home">

  <div v-for='hw in hwList' :key="hw.id" >
    <div id='short' v-if="user.userId==hw.userId && hw.timeRemaining<400000000">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.hw_date}}
    </div>
    <div id='long' v-if="user.userId==hw.userId && hw.timeRemaining>400000000">
      과제이름: {{hw.hw_name}}
      데드라인: {{hw.hw_date}}
    </div>

  </div>

  <br /><br /><br /><br /><br />



</div>
</template>

<script>
//import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {

  },
  data: function() {
    return {
      hwList: [],
      user: {userId:0}
    }
  },
  created() {
    axios.get(`http://localhost:8000/home`).then(res => {
      this.hwList = res.data
    })

    axios.get(`http://localhost:8000/user`).then(res => {
      this.user = res.data
    })
  }
}
</script>


<style>
#short {
  color: red;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
