<template>
  <div class="">
    page A <br>
    <router-link to="/b">page B</router-link>
    <left-swipe :list="list"></left-swipe>
  </div>
</template>

<script>
  import leftSwipe from '../base/leftSwipe'
  export default {
    data() {
      return {
          list:[
            {"content":'第一条数据'},
            {"content":'第二条数据'},
            {"content":'第三条数据'}
          ]
      };
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {},
    components:{
        leftSwipe
    }
  };
</script>

<style scoped lang="scss">

</style>
