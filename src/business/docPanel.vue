<template>
      <div class="audioItem" @click="activate">
          <div class="hd">
              <img :src="item.docAvatar">
    </div>
          <div class="bd" ref="bd">
              <p class="l">{{item.docName}}</p>
              <p class="font-hide m">{{item.snsKnowledge.description}}</p>
              <div class="Bubble">
              <bubble ref="bubble" :src="item.snsKnowledge.knowUrl"></bubble>
                  <div class="supplement"></div>
    </div>
              <div class="ft">
                  <p class="s light">{{item.snsKnowledge.createTime | getMyDay}}</p>
                  <p class="right s light">{{item.snsKnowledge.readNum}}人听过</p>
                  <p class="s last light" ref="thumb" @click="setColor"><img class="icon" src="../../static/img/rec_off.png">{{item.snsKnowledge.likes}}</p>
    </div>
    </div>
    </div>
</template>

<script>
    import {getMyDay} from "../lib/filter.js";
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
      filters:{
          getMyDay
      },
    mounted() {
        this.$refs.bubble.$el.addEventListener("click",(e)=>{
                e._flag=true;
            })
        
        this.$refs.thumb.addEventListener("click",(e)=>{
            e._flag=true;
        },false);
        this.$refs.bd.addEventListener("click",(e)=>{
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
                    border-radius:2rem;
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
                        left:0rem;
                        top:0rem;
                    }
        
                }
                
            }
        }
    .Bubble{
        margin:0.8rem 0;
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
