<template>
  <div id="app">
    <transition :name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
        slide: "left"
      }
    },
    created(){
    },
    methods: {
      beforeEnter(el){
        console.log('beforeenter');
      }
    },
    watch: {
      $route(to, from){
        if (this.$router.isback) {
          this.slide = "right";
        } else {
          this.slide = "left";
        }
        this.$router.isback = false;
        //console.log(this.$router,from, to);
      }
    }

  }
</script>

<style>
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active {
    transition: all 0.3s ease;
  }

  .left-enter {
    transform: translate(100%, 0);
  }

  .right-enter {
    transform: translate(-100%, 0);
  }

  .left-enter-to, .right-enter-to {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .left-leave-to {
    transform: translate(-100%, 0);
  }

  .right-leave-to {
    transform: translate(100%, 0);
  }
</style>
