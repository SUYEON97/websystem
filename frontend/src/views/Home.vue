<template>
  <ul>
    <li v-for="Theme in list" v-bind:key="Theme.boardId">
      <router-link :to="{name : 'board', params: {boardId:Theme.boardId}}">
        <p>{{Theme.title}}</p>
        <p>{{Theme.time}}</p>
      </router-link>
    </li>
    <router-link to="/write">글쓰기</router-link>

  </ul>

</template>

<script>


export default {
  name: 'home',
    data: function () {
        return {
            list: [],
        }
    },
    methods: {
        getList: function () {
            this.$http.get('http://localhost:8000/board/list').then((result) => {
                this.list = result.data;
            })
        },
    }
    ,
    // compo {
    //  Board,nent:
    //     // Write
    // },
    created: function () {
        this.getList()

    },
}
</script>
