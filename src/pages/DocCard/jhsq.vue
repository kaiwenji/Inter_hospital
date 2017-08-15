<template>
<div class="app">
    <app-header>
        <p class="headerTitle">加号申请</p>
        <p slot="right" class="headerWord" @click="appoint">申请加号</p>
    </app-header>
    <div class="wrap" v-show="docGot&&patGot" :class="{'stand':showPat}">
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
        <p style="color:rgb(248,198,19)" class="right l" @click="setPat()">切换就诊人></p>
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
        <p class="l">复诊需求复述</p>
    </div>
    <div class="request inter">
        <textarea class="xl"v-model="description" @focus="text_fade" @blur="text_show"></textarea>
    </div>
    <div class="picture">
        <my-upload @getAttaIdsList="getAttaIdsList"></my-upload></div>
    </div>
    
<!-- 选择就诊人模块   -->
    <set-pat @activate="check" :patList="patList" :showPat="showPat" @close="showPat=false"></set-pat>
    <my-toast :start="showLoading" :success="showSuccess"></my-toast>
    <my-loading class="myLoading" v-show="!patGot||!docGot"></my-loading>
    </div>
</template>
<script>
    import Api from "../../lib/api.js";
    import AppHeader from "../../business/app-header.vue";
    import SetPat from "../../business/setPat.vue";
    import MyToast from "../../base/toast.vue";
    import MyUpload from "../../business/upload.vue";
    import MyLoading from "../../base/loading/loading.vue";
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
          showSuccess:false,
          patGot:false,
          docGot:false,
          attaList:[]
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
          
          /*获取年龄*/
          getAge(id){
              if(!id){
                  return "";
              }
              var year;
              if(id.length==18){
                  year=parseInt(id.substring(6,10));
              }
              else{
                  year=1900+parseInt(id.substring(7,9));
              }
              var date=new Date();
              return date.getFullYear()-year; 
          }
      },
    components: {
        AppHeader,
        MyToast,
        MyUpload,
        MyLoading,
        SetPat
    },
    mounted() {
        /**
        获取医生信息
        **/
        Api("smarthos.user.doc.card.get",{docId:this.$route.params.id})
        .then((val)=>{
            this.docGot=true;
            if(val.succ){
//                console.log(val);
                this.docInfo=val.obj.doc;
            }
            else{
                this.$weui.alert(val.msg);
            }
        },
             ()=>{
            this.docGot=true;
            this.$weui.alert("网络错误");
        })
        /*获取病人列表*/
        Api("smarthos.user.commpat.list",{token:window.localStorage['token']})
        .then((val)=>{
            this.patGot=true;
            if(val.succ){
                this.patList=val.list;
                
            }
            else{
                this.$weui.alert(val.msg);
            }
        },
        ()=>{
            this.patGot=true;
            this.$weui.alert("网络错误");
        })

    },
    beforeDestroy() {

    },
    methods: {

        getAttaIdsList(item){
            this.attaList=item;
        },
        /**提交预约**/
        appoint(){
            let desc=this.isBlank(this.description);
            console.log(desc);
            this.showLoading=true;
            Api("smarthos.appiontment.add",{
                patId:this.patInfo.patId,
                docId:this.docInfo.id,
                compatId:this.patInfo.id,
                description:desc,
                token:window.localStorage['token'],
                attaList:this.attaList
            })
            .then((val)=>{
                this.showLoading=false;
                console.log(val);
                if(val.succ){
                    
                    this.showSuccess=true;
                    setTimeout(()=>{
                        this.showSuccess=false;
                        window.history.back();
                    },1000)
                }
                else{
                    this.$weui.alert(val.msg);
                }
            },
                 ()=>{
                this.showLoading=false;
                    this.$weui.alert("网络错误");
                     this.$router.push("/")
                     })
            
        },       
        /*检查textarea是否为默认值*/
          isBlank(str){
              if(str=="请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。"){
                  return "";
              }
              else{
                  return str;
              }
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
            
        }
    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";

    .headerWord{
        color:#0fbdff;
    }
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
        padding:0.8rem;
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
    .picture{
        padding-left:0.8rem;
    }
    .stand{
        overflow:hidden;
    }
</style>
