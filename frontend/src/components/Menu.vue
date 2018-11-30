<template>
    <div>
        <h1>Menu</h1>
        <router-link :to="{name: 'Menu', params: {name: this.name}}">menu</router-link> |
        <router-link :to="{name: 'Information', params: {name: this.name}}">information</router-link> |
        <router-link :to="{name: 'Login'}">log out</router-link>
        <p>Hello {{name}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name: this.$route.params.name,
        }
    },
}
</script>
