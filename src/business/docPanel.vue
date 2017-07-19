<template>
      <div class="audioItem">
          <div class="hd">
              <img src="../../static/img/docProfile.png">
    </div>
          <div class="bd">
              <p class="l">{{item.name}}</p>
              <p class="font-hide m">{{item.desc}}</p>
              <bubble src="../../static/music/test.mp3"></bubble>
              <div class="ft">
                  <p class="s">2017-06-01</p>
                  <p class="right s">2000人听过</p>
                  <p class="right s"><a @click="setColor"><img class="icon" src="../../static/img/rec_off.png"></a>200</p>
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

    },
    beforeDestroy() {

    },
    methods: {
        setColor(){
            this.$emit("recommend")
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
                    }
                    .icon{
                        height:1rem;
                        position:relative;
                        left:-0.2rem;
                        top:0rem;
                    }
        
                }
                
            }
        }
</style>
