<!--问诊帖子列表-->


<template>
<div class="vertical app">
<div  v-show="!showDetail" class="vertical app">
    <app-header>
        <div class="left" @click="back">
          <slot name="left">
<!--            <font><span>&#xe600;</span></font>-->
          </slot>
         </div>
        <p class="headerTitle">Query List</p>
    </app-header>

        <div class="main nothing" v-if="consultList.length==0&&Got">
            <p class="xxl darker" >you do not have any question</p>
            <p class="m lightBlue">click button to ask!</p>
    </div>    

        <pull-up class="main" @pullUp="getMore" :list=consultList :flag="flag" v-show="Got" v-else>
            <div class="inner">
            <my-post v-for="item in consultList" :info="item" @activate="getDetail(item)":key="item.consultInfo.id"></my-post>
    </div>
    </pull-up>
    <div class="button" @click="addConsult">
        <p>Query</p>
    </div>
    <div id="toast" v-show="nothingMore">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <p class="weui-toast__content">nothing more</p>
        </div>
    </div>
<!--    <my-loading class="myLoading" v-show="!Got"></my-loading>-->
    </div>
<!--    <router-view @showList="showDetail=false" @showDetail="showDetail=true"></router-view>-->
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
          consultList:[{
              consultInfo:{
                  createTime:Date.parse( new Date()),
                  id:1,
                  hasAtta:true,
                  consultContent:"Views of Monument Valley"
              },
              attaList:[{
                  attaFileUrl:"../../../static/img/monument/test.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_1.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_1.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_2.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_3.jpg"
              }],
              docName:"kaiwenji"
          },{
              
              docName:"kaiwenji",
              consultInfo:{
                  id:2,
                  hasAtta:true,
                  consultContent:"Monument again!",
                  createTime:Date.parse(new Date())-1000000000   //to make the simulation dtime eariler 
              },
              userDocVo:{
              },
              attaList:[{
                  attaFileUrl:"../../../static/img/monument/test.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_4.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_5.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_6.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_7.jpg"
              }]
          },{
              consultInfo:{
                  id:2,
                  hasAtta:true,
                  consultContent:"Monument again!",
                  createTime:Date.parse(new Date())-1000000000   //to make the simulation dtime eariler 
              },
              attaList:[{
                  attaFileUrl:"../../../static/img/monument/test.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_4.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_5.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_6.jpg"
              },{
                  attaFileUrl:"../../../static/img/monument/test_7.jpg"
              }]          }],
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
            alert("back to home page");
//            this.$router.push("/patientIndex");
        },
        getDetail(item){
            alert("go to the detail of the query");
//            this.$router.push("/Consult/ConsultDetail/"+item.consultInfo.id);
        },
        addConsult(){
            alert("create a new query");
//            this.$router.push("/Consult/newConsult");
        },
        
//        pull-down freshing 
        getMore(){
            if(this.page==-1){
                this.nothingMore=true;
                setTimeout(()=>{
                    this.nothingMore=false;
                    this.flag=!this.flag;
                },1000);
                return;
            }
            this.Got=true;
            this.flag=!this.flag;
//            Api("smarthos.consult.pic.list.page",{
//                pageSize:10,
//                pageNum:this.page,
//                token:window.localStorage['token']
//            })
//            .then((val)=>{
//                this.Got=true;
//                this.flag=!this.flag;
//                if(val.succ){
//                    console.log(val);
//                    this.consultList.push(...val.list);
//                    if(this.page==val.page.pages){
//                        this.page=-1;
//                    }
//                    else{
//                        this.page++;
//                    }
//                }
//                else{
//                    this.$weui.alert(val.msg);
//                }
//                
//            },
//                 ()=>{
//                this.$weui.alert("网络错误");
//            })
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
        position:absolute;
        top:0;
        left:20rem;
        right:0;
        border-bottom:1px solid silver;
        width:20rem;
    }
    .main{
        position:absolute;
        top:2.34rem;
        left:20rem;
        right:0;
        bottom:0;
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
        position:absolute;
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
            left:0.4rem;
            top:1rem;
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
