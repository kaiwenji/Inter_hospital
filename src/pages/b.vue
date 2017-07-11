<template>
  <div class="">
    page B <br>
    <a @click="back">返回</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed: {},
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
