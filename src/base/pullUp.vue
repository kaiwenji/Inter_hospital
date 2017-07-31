<template>
  <div id="wrapper" ref="wrapper">
      helloworld
          <div id="scroller" ref="scroller">
      <slot></slot>
    </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
//          topValue:0,
//          interval:{},
//          nothingMore:false,
//          ban:false
      };
    },
    computed:{

    },
    components:{

    },
    mounted() {
//        this.setScroll();
    },
    beforeDestroy() {

    },
    methods: {
//        setScroll(){
//            this.topValue = 0,// 上次滚动条到顶部的距离  
//                this.interval = null;// 定时器  
//            var _this=this;
//            this.$refs.wrapper.onscroll = function() {
//                if(_this.interval == null){ 
//                    _this.interval = setInterval(_this.test, 100);
//                }
//                _this.topValue = _this.$refs.wrapper.scrollTop;
//            }
//        },
//        test() {  
//            // 判断此刻到顶部的距离是否和1秒前的距离相等  
//
//            if(this.$refs.wrapper.scrollTop == this.topValue) {
//                var target=this.$refs.wrapper.scrollHeight-this.$refs.wrapper.offsetHeight-30;
//                clearInterval(this.interval);  
//                this.interval = null;  
//                if (this.topValue>target&&!this.ban){
//                    this.$emit("pullUp");
//                    this.ban=true;
//                }
//            }  
//        }
    },
      props:{
//          flag:{
//              type:Boolean,
//              default:true,
//              required:true
//          }
      },
      watch:{
//          flag(){
//              this.ban=false;
//          }
      }
  };
</script>

<style scoped lang="scss">
    #wrapper{
        height:100%;    
        overflow:auto;
    }
    #scroller{
    }
</style>
