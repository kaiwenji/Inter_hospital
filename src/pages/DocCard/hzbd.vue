<template>
<div class="app">
    <app-header>
        <p class="headerTitle">患者报到</p>
        <p slot="right" class="headerWord" @click="appoint()">提交</p>
    </app-header>
    <div class="wrap">
    <div class="notice inter">
        <p class="s">温馨提示：请确认您曾在{{name}}医生处就诊过，否则医生将不通过您的请求</p>
    </div>
    <div class="sub">
        <p class="l">医生信息</p>
    </div>
    <div class="inter docInfo">
        <img src="../../../static/img/docProfile.png">
        <div>
            <p class="xl darker title" >{{docInfo.docName}}&nbsp;&nbsp;&nbsp;<span class="l dark">{{docInfo.docTitle}}</span></p>
            <p class="m light">{{docInfo.hosName}}</p>
            <p class="m light">{{docInfo.deptName}}</p>
    </div>
    </div>
    <div class="sub">
        <div>
        <p class="l">就诊人信息</p>
        <p style="color:#0fbdff" class="right l" @click="setPat()">切换就诊人></p>
    </div>
        
    </div>
    <div class="patInfo inter">
        <div>
        <p class="xl dark">姓名：<span class="darker">{{patInfo.commpatName}}</span></p>
        <p class="xl dark">身份证号：<span class="darker">{{patInfo.commpatIdcard}}</span></p>
        <p class="xl dark">电话号码：<span class="darker">{{patInfo.commpatMobile}}</span></p>
        <p class="xl dark">年龄：<span class="darker">{{patInfo.commpatIdcard | getAge}}</span></p>
        <p class="xl dark">性别：<span class="darker">男</span></p>
    </div>
    </div>
    <div class="sub">
        <p class="l">就诊日期</p>
    </div>
    <div class="dateChoose inter" @click="setDate">
        <p class="xl light">{{date}}</p>
    </div>
    <div class="sub">
        <p class="l">复诊需求复述</p>
    </div>
    <div class="request inter">
        <textarea class="xl"v-model="description" @focus="text_fade" @blur="text_show"></textarea>
    </div>
    <div class="picture"></div>
    </div>
    <my-popup :show="showPat" @activate="showPat=false">
        <div slot="contain" class="contain">
        <div class="title">
            <p class="m light">请选择就诊人</p>
    </div>
        <div class="main">
        <div v-for="item,index in patList" @click="check(index)">
            <p class="dark">{{item.commpatName}}</p>
    </div>
    </div>
        <div class="ft">
            <p class="dark">添加就诊人</p>
    </div>
    </div>
    </my-popup>
    <my-toast :start="showLoading" :success="showSuccess"></my-toast>
    </div>
</template>
<script>
    import Api from "../../lib/api.js";
    import AppHeader from "../../business/app-header.vue";
    import MyPopup from "../../base/popup.vue";
    import MyToast from "../../base/toast.vue";
  export default {
     data() {
      return {
          docInfo:{},
          name:"李董良",
          date:"请选择你的就诊日期>",
          showPat:false,
          patList:[],
          chosedIndex:0,
          description:"请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。",
          showLoading:false,
          showSuccess:false
      };
    },
    computed: {
        patInfo(){
            if(this.patList.length==0){
                return {};
            }
            return this.patList[this.chosedIndex];
        }
    },
      filters:{
          getAge(id){
              if(!id){
                  return "";
              }
            let year=parseInt(id.substring(6,10));
            var date=new Date();
            return date.getFullYear()-year; 
          },
          isBlank(str){
              if(str=="请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。"){
                  return "";
              }
          }
      },
    components: {
        AppHeader,
        MyPopup,
        MyToast
    },
    mounted() {
        Api("smarthos.user.doc.card.get",{docId:this.$route.params.id})
        .then((val)=>{
//            console.log(val);
            this.docInfo=val.obj.doc;
        })
        Api("smarthos.user.commpat.list",{token:window.localStorage['token']})
        .then((val)=>{
            console.log(val);
            this.patList=val.list;
        })

    },
    beforeDestroy() {

    },      
    methods: {
                appoint(){
            console.log(this.docInfo);
            this.showLoading=true;
            Api("smarthos.appiontment.add",{
                patId:this.patInfo.patId,
                docId:this.docInfo.id,
                compatId:this.patInfo.id,
                description:this.description,
                token:window.localStorage['token']
            })
            .then((val)=>{
                console.log(val);
                if(val.succ){
                    this.showLoading=false;
                    this.showSuccess=true;
                    setTimeout(()=>{
                        this.showSuccess=false;
                    },1000)
                }
            })
            
        },
        text_fade(){
            if(this.description=="请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。"){
                this.description="";
            }
        },
        text_show(){
            if(this.description==""){
                this.description="请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。";
            }
        },
        setPat(){
            this.showPat=true;
        },
        check(item){
            this.showPat=false;
            this.chosedIndex=item;
            
        },
        setDate(){
            var _this=this;
           weui.datePicker({
                start: new Date(),
                end: 2030,
                defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
                onConfirm: function(result){
                    _this.date=result[0].label+result[1].label+result[2].label;
                },
               onChange:function(result){
                   console.log(result);
               },
                id: 'ma_expect_date',
                className: 'ma_expect_date_picker'
            }); 
        }
    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";

    .headerWord{
        color:#0fbdff;
    }
    $wordPadding:0.8rem;
    @mixin letter{
        padding: 0.5rem 0.7rem;
    }
    .right{
        text-align:right;
    }
    p{
        font-family:$fontFamily;

    }
    .app{
        background-color:white;
        flex:1 1 auto;
        display:flex;
        flex-direction:column;
    }
    .inter{
        margin:0 auto;
        width:18.4rem;
        background-color:rgb(238,250,254);
    }
    .sub{
        padding:$wordPadding;
        div{
            width:100%;
            display:flex;
            flex-direction:row;
            p{
                flex:1 1 auto;
            }
        }
    }
    .notice{
        height:2.7rem;
        p{
            padding:0.5rem 0.7rem;
            color:#0AACE9;
            line-height:1rem;
        }
    }
    .docInfo{
        height:5.4rem;
        display:flex;
        flex-direction:row;
        img{
            height:3.7rem;
            display:block;
            padding:0.8rem;
            flex:0 0 auto;
        }
        div{
            flex:1 1 auto;
            .title{
                padding-top:0.8rem;
                padding-right:0.8rem;
            }
        }
    }
    .patInfo{
        div{
            padding:0.8rem;
        }
    }
    .wrap{
        overflow:auto;
    }
    textarea{
        height:5rem;
        background:rgb(238,250,254);
        width:16.4rem;
        border:none;
        color:#999999;
        padding:1rem;
    }
    .contain{
        display:flex;
        flex-direction:column;
        flex:1 1 auto;
        div{
            p{
                @include letter;
            }
            flex:0 0 auto;
            text-align:center;
            padding:0 auto;
            border-bottom:1px solid grey;
            &.main{
                flex: 1 1 auto;
                overflow:auto;
            }
        }
    }
    .dateChoose{
        p{
            padding:0.8rem;
        }
    }
</style>
