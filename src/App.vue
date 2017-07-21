<template>
  <div id="app">
    <transition :name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>


<script type="text/ecmascript-6">

  import urlHistory from "./lib/urlHistory"
  export default {
    name: 'app',
    data(){
      return {
        slide: "left"
      }
    },
    created(){
      this.urlObj = new urlHistory();

    },

    methods: {
      beforeEnter(el){
        console.log('beforeenter');
      }
    },
//    watch: {
//      $route(to, from){
//        if (this.$router.isback) {
//          this.slide = "right";
//        } else {
//          this.slide = "left";
//        }
//        this.$router.isback = false;
//      }
//    },


    watch: {
      $route(to, from){
        console.log(this.urlObj.history)
        let routeLength = this.urlObj.history.length;
        console.log(routeLength, '一开始的空')
        if (routeLength === 0) {
          this.slide = 'left'
          if (to.path === from.path && to.path === '/') {
            this.urlObj.history = to.path;
          } else {
            this.urlObj.history = from.path;
            this.urlObj.history = to.path;
            console.log(this.urlObj.history,1111)
          }
        } else if (routeLength === 1) {
          this.slide = 'left'
          this.urlObj.history = to.path;
          console.log(this.urlObj.history, 9999)
        } else {
          console.log(this.urlObj.history, 9999)
          let lastBeforeRoute = this.urlObj.history[routeLength - 2];
          if (lastBeforeRoute === to.path) {
            console.log('后退的')
            this.urlObj.back;
            this.slide = 'right'
          } else {
            this.urlObj.history = to.path;
            console.log('倩倩进的')
            console.log(this.urlObj.history)
            this.slide = 'left'
          }
        }
      }
    },

  }
</script>


<style scoped  lang="scss">
  @import './common/public.scss';


  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
background: #f5f5f5;
      display:flex;
      flex-direction:column;
  }

  .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active {
    transition: all 0.3s ease;

    display: flex;
    flex-direction: column;
  }

  .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active {
    transition: all .3s ease;
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
