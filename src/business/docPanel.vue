<template>
      <div class="audioItem" @click="activate">
          <div class="hd">
              <img src="../../static/img/docProfile.png">
    </div>
          <div class="bd" ref="bd">
              <p class="l">{{item.name}}</p>
              <p class="font-hide m">{{item.desc}}</p>
              <div class="Bubble">
              <bubble ref="bubble" src="../../static/music/test.mp3"></bubble>
                  <div class="supplement"></div>
    </div>
              <div class="ft">
                  <p class="s light">2017-06-01</p>
                  <p class="right s light">2000人听过</p>
                  <p class="s last light" ref="thumb" @click="setColor"><img class="icon" src="../../static/img/rec_off.png">200</p>
    </div>
    </div>
    </div>
</template>

<script>
    import Bubble from "../base/bubble.vue"; 
  export default {
      props:{
          item:{
              type:Object,
              default:{},
              required:true
          }
      },
    data() {
      return {
          arrow:true

      };
    },
    computed:{

    },
    components:{
        bubble:Bubble

    },
    mounted() {
        this.$refs.bubble.$el.addEventListener("click",(e)=>{
                console.log(e.target);
                e._flag=true;
            })
        
        this.$refs.thumb.addEventListener("click",(e)=>{
            e._flag=true;
        },false);
        this.$refs.bd.addEventListener("click",(e)=>{
            console.log(e._flag);
            if(e._flag){
                e.stopPropagation();
            }
        },false)
    },
    beforeDestroy() {

    },
    methods: {
        setColor(){
            this.$emit("recommend")
        },
        activate(){
            console.log("activate")
            this.$emit("activate");
        }
    }
  };
</script>

<style scoped lang="scss">
    @import "../common/var.scss";
        .audioItem{
            border:1px solid lightgrey;
            display:flex;
            flex-direction:row;
            padding:1rem;
            background-color:white;
            .hd{
                width:3rem;
                flex:0 0 auto;
                img{
                    width:80%;
                    margin:0 auto;
                }
                
            }
            .bd{
                .ft{
                    display:flex;
                    flex-direction:row;
                    p{
                        flex:1 0 auto;
                        &.last{
                            position:relative;
                            text-align:center;
                        }
                    }
                    .icon{
                        height:0.8rem;
                        position:absolute;
                        left:0.3rem;
                        top:0rem;
                    }
        
                }
                
            }
        }
    .Bubble{
        display:flex;
        flex-direction:row;
        div{
            flex:0 0 auto;
            &.supplement{
                flex:1 1 auto;
            }
        }
    }
</style>
