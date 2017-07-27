<template>
<div class="app">
    <app-header>
        <p class="headerTitle">问医生</p>
        <p slot="right" class="lightBlue" @click="addNew">立即提问</p>
    </app-header>
    <div class="app" v-show="Got">

    <div class="wrap">
    <div class="notice inter">
        <div class="img">
            <img src="../../../static/img/docProfile.png">
    </div>
        <div class="word">
        <p class="s light">加号已拒绝</p>
        <p class="s light" >拒绝理由：医生近期停诊，请留意时间后再申请加号</p>
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
        <p class="xl dark">年龄：<span class="darker">{{patInfo.commpatIdcard|getAge}}</span></p>
        <p class="xl dark">性别：<span class="darker">{{patInfo.commpatGender|getGender}}</span></p>
    </div>
    </div>
    <div class="sub">
        <p class="l">复诊需求复述</p>
    </div>
    <div class="request inter">
        <textarea v-model="content" @focus="text_fade"></textarea>
    </div>
    <div class="picture">
        <my-upload @getAttaIdsList="getAttaIdsList"></my-upload>
    </div>
    </div>
        
<!-- 切换就诊人模块-->
        <set-pat @activate="check" :patList="patList" :showPat="showPat"></set-pat>
    <div v-show="showSuccess">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">已完成</p>
        </div>
    </div>
    <div v-show="showLoading">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">加载中</p>
        </div>
    </div>
    </div>
    <my-loading class="myLoading" v-show="!Got"></my-loading>
    </div>
</template>
<script>
    import Api from "../../lib/api.js";
    import AppHeader from "../../business/app-header.vue";
    import SetPat from "../../business/setPat.vue";
    import {getAge,getGender} from "../../lib/filter.js";
    import MyUpload from "../../business/upload.vue";
    import MyLoading from "../../base/loading/loading.vue";
  export default {
    data() {
      return {
          showPat:false,
          patList:[],
          showLoading:false,
          showSuccess:false,
          chosedIndex:0,
          content:"请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。",
          Got:false,
          attaList:[]
      };
    },
    computed: {
        patInfo(){
            if(this.patList.length>0){
                return this.patList[this.chosedIndex];
            }
            else{
                return {}
            }
        }
    },
      filters:{
          getAge,
          getGender
      },
    components: {
        AppHeader,
        SetPat,
        MyUpload,
        MyLoading
    },
    mounted() {
        Api("smarthos.user.commpat.list",{
            token:window.localStorage['token']
        })
        .then((val)=>{
            this.Got=true;
            if(val.succ){
                console.log(val.list);
                this.patList=val.list;
            }
            else{
                this.$weui.alert(val.msg);
            }
        },
             ()=>{
            this.$weui.alert("网络错误");
        })
    },
    beforeDestroy() {

    },
    methods: {
        getAttaIdsList(item){
            this.attaList=item;
        },
        text_fade(){
            if(this.content=="请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。"){
                this.content="";
            }
        },
        text_show(){
            if(this.content.length==0){
                this.content="请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。";
            }
        },
        setPat(){
            this.showPat=true;
        },
        check(item){
            console.log(item);
            this.showPat=false;
            this.chosedIndex=item;            
        },
        addNew(){
            this.showLoading=true;
            Api("smarthos.consult.pic.issue",{
                consulterName:this.patInfo.commpatName,
                consulterMobile:this.patInfo.commpatMobile,
                consulterIdcard:this.patInfo.commpatIdcard,
                consultContent:this.content,
                token:window.localStorage['token'],
                attaIdList:this.attaList
            })
            .then((val)=>{
                console.log(val);
                this.showLoading=false;
                this.addSuccess(val.obj.consultInfo.id);
            })
        },
        addSuccess(id){
            this.showSuccess=true;
            setTimeout(()=>{
                this.showSuccess=false;
                this.$router.push("/Consult/ConsultDetail/"+id);
            },1000)
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
        background:#e5e5e5;
        width:20rem;
        height:2.7rem;
        @include horizontal;
        img{
            width:1.5rem;
            padding:0.58rem 0.8rem;
        }
        .word{
            padding:0.56rem 0;
            p{
                line-height:1.3;
            }
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
        width:16.8rem;
        border:none;
        color:#999999;
        font-size:0.8rem;
        padding:0.8rem;
    }
    
/* 选择就诊人模块css   */
    .contain{
        background:rgb(238,238,238);
        display:flex;
        flex-direction:column;
        flex:1 1 auto;
        div{
            background:white;
            p{
                position:relative;
                border-top:.5px solid silver;
                @include letter;
                &:hover{
                    background-color:silver;
                }
                &:active{
                    background:white;
                }
                img{
                    position:absolute;
                    height:1rem;
                    left:13rem;
                    top:.8rem;
                }
            }
            flex:0 0 auto;
            text-align:center;
            padding:0 auto;
            &.title{
                border-bottom:.5px solid silver;
            }
            &.main{
                
                flex: 1 1 auto;
                overflow:auto;
            }
            &.ft{
                margin-top:.5rem;
            }
        }
    }
    
/*    */
    
    
    .picture{
        padding-left:0.8rem;
    }
</style>
