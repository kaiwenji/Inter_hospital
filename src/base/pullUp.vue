<template>
  <div id="wrapper" ref="wrapper" >
          <div id="scroller" ref="scroller">
              <slot><p>helloworld</p></slot>
    </div>
    </div>
</template>

<script>

    import BScroll from "better-scroll"
  export default {
    data() {
      return {
          topValue:0,
          interval:{},
          nothingMore:false,
          ban:false,
          timeBan:false,
          scroll:null,
          bottom:0
      };
    },
      
    computed:{

    },
    components:{

    },
    mounted() {
        
        this.scroll=new BScroll(document.getElementById("wrapper"),{
            startX:0,
            startY:0,
            scrollY:true,
            click:true,
            touch:true,
            probeType: 3

        })
        
            console.log(this.scroll);
        this.scroll.on("touchend",(pos)=>{
            if (pos.y<this.bottom+20&&!this.ban&&!this.timeBan){
                this.$emit("pullUp");
                this.ban=true;
                this.timeBan=true;
                setTimeout(()=>{
                    this.timeBan=false;
                },1000)
            }
        })
    },
    beforeDestroy() {

    },
    methods: {
        
        setScroll(){
            this.topValue = 0,// 上次滚动条到顶部的距离  
                this.interval = null;// 定时器  
            var _this=this;
            this.$refs.wrapper.onscroll = function() {
                if(_this.interval == null){ 
                    _this.interval = setInterval(_this.test, 100);
                }
                _this.topValue = _this.$refs.wrapper.scrollTop;
            }
        },
        test() {  
            // 判断此刻到顶部的距离是否和1秒前的距离相等  

            if(this.$refs.wrapper.scrollTop == this.topValue) {
                var target=this.$refs.wrapper.scrollHeight-this.$refs.wrapper.offsetHeight-30;
                clearInterval(this.interval);  
                this.interval = null;  
                if (this.topValue>target&&!this.ban){
                    this.$emit("pullUp");
                    this.ban=true;
                }
            }  
        }
    },
      props:{
          flag:{
              type:Boolean,
              default:true,
              required:true
          },
          list:{
              type:Array,
              default:()=>{
                  return [];
              },
              required:false
          }
      },
      watch:{
          flag(){
              this.ban=false;
          },
          list(){
              if(this.scroll){
                  setTimeout(()=>{
                      this.scroll.refresh();
                      this.bottom=this.$refs.wrapper.offsetHeight-this.$refs.wrapper.scrollHeight;
                  },100)
              }
              
          },
      }
  };
</script>

<style scoped lang="scss">
    #wrapper{
        position:absolute;
        height:100%;
        width:100%;
/*        flex:1 1 auto;*/
        overflow:auto;
    }
    #scroller{
    }
</style>
