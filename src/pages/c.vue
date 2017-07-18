<template>
  <div class="">
      <player src="../../static/music/test.mp3"></player>
  </div>
</template>

<script>
    import Player from "./player";
    import Bubble from "./bubble";
  export default {
    data() {
      return {
      };
    },
    computed: {
    },
    components: {
        bubble:Bubble,
        player:Player
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
    }
  };
</script>

<style scoped lang="scss">

</style>
