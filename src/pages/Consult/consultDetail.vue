<template>
  <div class="module vertical">
      <app-header>
          <p>问医生</p>
          <div slot="left" @click="back" ref="backBtn"><font><span>&#xe600;</span></font></div>
          </app-header>
          <div class="patInfo" v-show='Got'>
              <p class="xl dark">患者资料 {{consultInfo.consulterName}} {{consultInfo.consulterGender|getGender}} {{consultInfo.consulterIdcard|getAge}}岁</p>
    </div>
      <div class="symptom">
          <my-post :info="info" v-show="Got"></my-post>
    </div>
      <div class="wrap" v-show="Got">
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
      <my-loading v-show="!Got" class="myLoading"></my-loading>
          <div class="ft">
              <div v-if="isEnded">
                  <p class="m light">该咨询已经结束</p>
                  <p class="m lightBlue">申请成为TA的患者</p>
    </div>
              <div v-else>
                  <my-battle @output="send"></my-battle>
    </div>
    </div>
    
  </div>
</template>

<script>
    import {getAge,getGender,goodTime} from "../../lib/filter.js";
    import Api from "../../lib/api.js";
    import AppHeader from "../../business/app-header.vue";
    import Bubble from "../../base/bubble.vue";
    import MyPost from "../../business/post.vue";
    import MyLoading from "../../base/loading/loading.vue";
    import MyBattle from "../../base/battle.vue";
  export default {
    data() {
      return {
          testList:[1,1,1,1,1,1],
          isEnded:false,
          consultInfo:{},
          replyList:[],
          hasPhoto:false,
          info:{},
          Got:false
      };
    },
      created(){
      },
    computed: {},
    components: {
        AppHeader,
        bubble:Bubble,
        MyPost,
        MyLoading,
        MyBattle
    },
    mounted() {
        Api("smarthos.consult.pic.details",{
            consultId:this.$route.params.id,
            token:window.localStorage['token']
        })
        .then((val)=>{
            this.Got=true;
            if(val.succ){
                console.log(val.obj);
                this.info=val.obj;
                this.consultInfo=val.obj.consultInfo;
                console.log(this.info);
                this.replyList=val.obj.consultMessage;
            }
            else{
                this.$weui.alert(val.msg);
            }
        },
             ()=>{
            this.Got=true;
            this.$weui.alert("网络错误");
        })
        
        this.$refs.backBtn.addEventListener("click",(e)=>{
            e.stopPropagation();
        })

    },
    beforeDestroy() {

    },
      filters:{
          getAge,
          getGender,
          goodTime
      },
    methods: {
        back(){
//            window.history.back();
            this.$router.push("/Consult");
        },
        send(res){
            var params={
                token:window.localStorage['token'],
                consultId:this.consultInfo.id,
                replyContent:res.msg||"",
                replyContentType:res.type
            };
            if(res.type=='AUDIO'){
                params.attaList=[]
                params.attaList.push(res.src);
            }
            Api("smarthos.consult.pic.reply",params)
            .then((val)=>{
                if(val.succ){
                    console.log(val);
                }
                else{
                    this.$weui.alert(val.msg);
                }
            },
                 ()=>{
                this.$weui.alert("网络错误");
            })
        }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../common/var.scss";
    @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_33qiq29sp5y7gb9.woff') format('woff'),
    }
    .module{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:2.3rem;
    }
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
        position:fixed;
        bottom:0px;
        width:100%;
        text-align:center;
/*        padding-bottom:0.8rem;*/
        p{
            padding-left:0.8rem;
        }
    }
</style>
