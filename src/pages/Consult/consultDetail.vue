<template>
  <div class="app vertical">
      <app-header>
          <p>问医生</p>
          
              <p slot="right"class="m lightBlue" v-show="!isEnded">结束咨询</p>
          </app-header>
          <div class="patInfo">
              <p class="xl dark">患者资料 {{consultInfo.consulterName}} {{consultInfo.consulterGender|getGender}} {{consultInfo.consulterIdcard|getAge}}岁</p>
    </div>
      <div class="symptom">
          <div class="panel">
              <p class="font-hide m">{{consultInfo.consultContent}}</p>
              <div class="horizontal" v-show="hasPhoto">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img class="last" src="../../../static/img/qr.png">
    </div>
              <div class="ft">
                  <p class="lightBlue l"><img src="../../../static/img/docProfile.png" class="icon">李逵<span class="l light">回答</span></p>
                  <p class="middle m light">{{consultInfo.createTime|goodTime}}创建</p>
                  <p class="right m light">{{consultInfo.replyCount||0}}条评论</p>
    </div>
    </div>
    </div>
      <div class="wrap">
          <div class="answer" v-for="item in replyList">
              <div class="img"><img src="../../../static/img/docProfile.png"></div>
              <div class="word">
                  <p class="xl darker">{{item.userDocVo&&item.userDocVo.docName}}<span class="m light"> &nbsp;&nbsp;{{item.userDocVo&&item.userDocVo.hosName}} &nbsp;&nbsp;|&nbsp;&nbsp; {{item.userDocVo&&item.userDocVo.deptName}}</span></p>
                  <p class="m light">{{item.userDocVo&&item.userDocVo.createTime|goodTime}}</p>
<!--                  <bubble src="../../../static/music/test.mp3" class="bubble"></bubble>-->
                  <p class="bubble font-hide m light">{{item.consultMessage&&item.consultMessage.replyContent}}</p>
                  
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
    import {getAge,getGender,goodTime} from "../../lib/filter.js";
    import Api from "../../lib/api.js";
    import AppHeader from "../../business/app-header.vue";
    import Bubble from "../../base/bubble.vue";
  export default {
    data() {
      return {
          testList:[1,1,1,1,1,1],
          isEnded:true,
          consultInfo:{},
          replyList:[],
          hasPhoto:false
      };
    },
    computed: {},
    components: {
        AppHeader,
        bubble:Bubble
    },
    mounted() {
        Api("smarthos.consult.pic.details",{
            consultId:this.$route.params.id,
            token:window.localStorage['token']
        })
        .then((val)=>{
            console.log(val);
            this.consultInfo=val.obj.consultInfo;
            this.replyList=val.obj.consultMessage;
            
        })

    },
    beforeDestroy() {

    },
      filters:{
          getAge,
          getGender,
          goodTime
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
       padding-bottom:0;
        margin-bottom:0.8rem;
        margin-left:0.8rem;
        margin-right:0.8rem;
        background-color:#FFFFFF;
        border-radius:10px;
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
            position:relative;
            .icon{
/*                display:none;*/
                position:absolute;
                flex:0 0 auto;
                display:block;
                height:0.8rem;
                width:0.8rem;
                left:-0.2rem;
                top:-0.5rem;
            }
            p{
                padding-top:0.13rem;
                padding-left:0.5rem;
                flex:0 0 auto;
                &.middle{
                    padding-top:0.1rem;
                    flex:1 1 auto;
                    text-align:right;
                }
                &.right{
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
