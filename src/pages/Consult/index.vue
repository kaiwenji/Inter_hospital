<!--问诊帖子列表-->


<template>
<div>
<div class="app" v-show="!showDetail">
    <app-header>
        <div class="left" @click="back">
          <slot name="left">
            <font><span>&#xe600;</span></font>
          </slot>
         </div>
        <p class="headerTitle">问医生</p>
    </app-header>

    <div class="main">
        <div class="nothing" v-if="consultList.length==0&&Got">
            <p class="xxl darker" >你还没有回答任何问题</p>
            <p class="m lightBlue">点击右下角按钮立即提问</p>
    </div>    
        <div v-else>

        <pull-up @pullUp="getMore" :list=consultList :flag="flag" v-show="Got">
            <div class="inner">
            <my-post v-for="item in consultList" :info="item" @activate="getDetail(item)":key="item.consultInfo.id"></my-post>
    </div>
    </pull-up> 
    </div>
    </div>
    <div class="button" @click="addConsult">
        <p>立即</p>
        <p>询问</p>
    </div>
    <div id="toast" v-show="nothingMore">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <p class="weui-toast__content">无更多内容</p>
        </div>
    </div>
    <my-loading class="myLoading" v-show="!Got"></my-loading>
    </div>
    <router-view @showList="showDetail=false" @showDetail="showDetail=true"></router-view>
    </div>
</template>

<script>
    import PullUp from "../../base/pullUp.vue";
    import MyPost from "../../business/post.vue";
    import {goodTime} from "../../lib/filter.js";
    import Api from "../../lib/api.js";
    import AppHeader from "../../business/app-header.vue";
    import MyLoading from "../../base/loading/loading.vue";
  export default {
    data() {
      return {
          consultList:[],
          page:1,
          noReply:false,
          nothingMore:false,
          flag:true,
          Got:false,
          showDetail:false
      };
    },
    computed: {},
    components: {
        AppHeader,
        MyPost,
        PullUp,
        MyLoading
    },
    mounted() {
        this.getMore();
    },
    beforeDestroy() {

    },
      filters:{
          goodTime
      },
      watch:{
          showDetail(){
              if (!this.showDetail&&this.consultList.length==0){
                  this.getMore();
              }
          },
      },
    methods: {
        back(){
            this.$router.push("/patientIndex");
        },
        getDetail(item){
            this.$router.push("/Consult/ConsultDetail/"+item.consultInfo.id);
        },
        addConsult(){
            this.$router.push("/Consult/newConsult");
        },
        
//        下拉刷新列表
        getMore(){
            if(this.page==-1){
                this.nothingMore=true;
                setTimeout(()=>{this.nothingMore=false},1000);
                return;
            }
            Api("smarthos.consult.pic.list.page",{
                pageSize:10,
                pageNum:this.page,
                token:window.localStorage['token']
            })
            .then((val)=>{
                this.Got=true;
                this.flag=!this.flag;
                if(val.succ){
                    this.consultList.push(...val.list);
                    if(this.page==val.page.pages){
                        this.page=-1;
                    }
                    else{
                        this.page++;
                    }
                }
                else{
                    this.$weui.alert(val.msg);
                }
                
            },
                 ()=>{
                console.log(this.consultList.length);
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
    .inner,.wrap{
        background:rgb(248,248,248);
    }
      span{
    font-family: 'iconfont';
    font-size: 18px;
  }
    p{
        word-break:break-all;
    }

    header{
        border-bottom:1px solid silver
    }
    .app{
        @include vertical;
    }
    .main{
        @include wrap;
        padding-top:0.8rem;
    }
    .nothing{
        text-align:center;
        padding-top:11rem;
        p{
            padding-bottom:0.8rem;
        }
    }
    
    
    .button{
        position:fixed;
        z-index:1000;
        bottom:0.8rem;
        right:0.8rem;
        width:3rem;
        height:3rem;
        border-radius:50%;
        background-color:rgb(15,189,255);
        color:white;
        p{
            position:relative;
            left:0.7rem;
            top:.4rem;
            line-height:1.4em;
            font-size:0.8rem;
        }
    }
        #toast{
        p{
            position:absolute;
            left:1.3em;
            top:3em;
        }
    }
</style>
