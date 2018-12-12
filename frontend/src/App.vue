<template>
  <div id="app">
    <div id="nav">
      <b-navbar v-if='this.$route.name!="Login"' style="margin-bottom:50px; height:50px" toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>


      <b-navbar-brand style="margin-left: 130px" href="#"><span><router-link :to="{name: 'Home'}">Home</router-link></span></b-navbar-brand>
      <b-navbar-brand style="margin-left: 130px" href="#"><span><router-link :to="{name: 'regist'}">과제등록</router-link></span></b-navbar-brand>
      <b-navbar-brand style="margin-left: 130px" href="#"><span><router-link :to="{name: 'history'}">히스토리</router-link></span></b-navbar-brand>
      <b-navbar-brand style="margin-left: 130px" href="#"><span><router-link :to="{name: 'communiteHome'}">커뮤니티</router-link></span></b-navbar-brand>


      <b-collapse is-nav id="nav_collapse">

        <!-- <b-navbar-nav>
          <b-nav-item href="#"><span><router-link :to="{name: 'Home', params: {name: this.name}}">home</router-link></span></b-nav-item>
          <b-nav-item href="#"><span><router-link :to="{name: 'Information', params: {name: this.name}}">information</router-link></span></b-nav-item>
          <b-nav-item href="#"><span><router-link :to="{name: 'regist', params: {name: this.name}}">과제등록</router-link></span></b-nav-item>
          <b-nav-item href="#"><span><router-link :to="{name: 'communiteHome'}">커뮤니티</router-link></span></b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item v-on:click='logout'>Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    </div>

    <router-view/>
  </div>
</template>


<script>
import { Slide } from 'vue-burger-menu'
import DatePicker from 'v-cal-input'
import Zondicon from "vue-zondicons/src/components/Zondicon";
import Login from './components/login/Login'


    export default{
        name: 'app',
        components: {
            Login
        },
        created: function () {
            console.log(this.$route);
        },
        methods: {
          profile(){
            console.log('profile');
          },
          logout(){
            localStorage.clear();
            this.$router.push('/')
          }
        }

    }
</script>

<style scoped>
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
  color: white;
}
</style>
