<template>
  <div class="app vertical">
      <app-header>
          <p>问医生</p>
          
              <p slot="right"class="m lightBlue" v-show="!isEnded">结束咨询</p>
          </app-header>
          <div class="patInfo">
              <p class="xl dark">患者资料 李逵 男 29岁</p>
    </div>
      <div class="symptom">
          <div class="panel">
              <p class="font-hide m">11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
              <div class="horizontal">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img class="last" src="../../../static/img/qr.png">
    </div>
              <div class="ft">
                  <img src="../../../static/img/docProfile.png" class="icon">
                  <p class="lightBlue m">李逵<span class="light m">回答</span></p>
                  <p class="middle m light">1小时前创建</p>
                  <p class="right m light">28条评论</p>
    </div>
    </div>
    </div>
      <div class="wrap">
          <div class="answer" v-for="item in testList">
              <div class="img"><img src="../../../static/img/docProfile.png"></div>
              <div class="word">
                  <p class="xl darker">武松<span class="m light"> &nbsp;&nbsp;浙江医科大学附属第二医院 &nbsp;&nbsp;|&nbsp;&nbsp; 眼科</span></p>
                  <p class="m light">1小时前</p>
<!--                  <bubble src="../../../static/music/test.mp3" class="bubble"></bubble>-->
                  <p class="bubble font-hide m light">11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
                  
    </div>
    </div>
    </div>
          <div class="ft" v-show="isEnded">
              <p class="m light">该咨询已经结束</p>
              <p class="m lightBlue">申请成为TA的患者</p>
    </div>
    
  </div>
</template>

<script>
    import AppHeader from "../../business/app-header.vue";
    import Bubble from "../../base/bubble.vue";
  export default {
    data() {
      return {
          testList:[1,1,1,1,1,1],
          isEnded:true
      };
    },
    computed: {},
    components: {
        AppHeader,
        bubble:Bubble
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
    @import "../../common/var.scss";
    p{
        word-break:break-all;
    }
    .patInfo{
        height:2.4rem;
        background:$mainColor;
        p{
            padding:0.8rem;
        }
    }
    header{
        border-bottom: 1px solid silver;
    }
    
    
   .panel{
        padding:0.8rem;
        margin-bottom:0.8rem;
        margin-left:0.8rem;
        margin-right:0.8rem;
        background-color:#FFFFFF;
        border-radius:10px;
        height:8rem;
        img{
            padding-top:0.8rem;
            padding-bottom:0.8rem;
            padding-right:0.6rem;
            display:block;
            height:3rem;
            flex:1 1 auto;
            &.last{
                padding-right:0;
            }
        }
        .ft{
            @include horizontal;
            .icon{
                flex:0 0 auto;
                display:block;
                height:0.8rem;
                width:0.8rem;
                padding:0;
                padding-top:0.2rem;
            }
            p{
                flex:0 0 auto;
                &.middle{
                    padding-top:0.1rem;
                    flex:1 1 auto;
                    text-align:right;
                }
                &.right{
                    padding-left:0.5rem;
                    padding-top:0.1rem;
                }
            }
        }
    }
    
    .answer{
        border-radius:10px;
        padding:0.8rem;
        margin-bottom:0.8rem;
        margin-right:0.8rem;
        margin-left:0.8rem;
        height:6.61rem;
        background:$mainColor;
        @include horizontal;
        .img{
            flex:0 0 auto;
            padding-right:0.5rem;
            img{
                height:1.3rem;
            }
            
        }
        .word{
            flex:1 1 auto;
            p{
                line-height:1.8;
            }
        }
    }
    
    .symptom{
        padding-top:0.8rem;
    }
    .bubble{
        margin-top:0.8rem;
    }
    
    
    .ft{
        text-align:center;
        padding-bottom:0.8rem;
        p{
            padding-top:.5rem;
        }
    }
</style>
