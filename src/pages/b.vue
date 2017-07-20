<template>
  <div class="">
    page B <br>
    <a @click="back">返回</a>
    <input v-model="key"/>
    <div v-for="d in showlist">{{d}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          key:"",
          list:['a','b']
      };
    },
    computed: {
        showlist(){
              return this.list.filter((res)=>{
                  return res.indexOf(this.key)>=0? true:false;
              })
        }
    },
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        back(){
            this.$router.goBack();
        }
    }
  };
</script>

<style scoped lang="scss">

</style>
