<template>
<div class="app">
    <app-header>
        <p class="headerTitle">问医生</p>
        <p slot="right" class="lightBlue" @click="addNew">立即提问</p>
    </app-header>
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
        <p class="xl dark">姓名：<span class="darker">王小李</span></p>
        <p class="xl dark">身份证号：<span class="darker">330702199406076039</span></p>
        <p class="xl dark">电话号码：<span class="darker">15558689977</span></p>
        <p class="xl dark">年龄：<span class="darker">24</span></p>
        <p class="xl dark">性别：<span class="darker">男</span></p>
    </div>
    </div>
    <div class="sub">
        <p class="l">复诊需求复述</p>
    </div>
    <div class="request inter">
        <textarea placeholder="请务必填写你的病史、主诉、症状、指标、治疗经过，相关的检查请拍照上传。"></textarea>
    </div>
    <div class="picture"></div>
    </div>
    <my-popup :show="showPat" @activate="showPat=false">
        <div slot="contain" class="contain">
        <div class="title">
            <p class="m light">请选择就诊人</p>
    </div>
        <div class="main">
        <div v-for="item in patList" @click="check(item)">
            <p class="dark">{{item}}</p>
    </div>
    </div>
        <div class="ft">
            <p class="dark">添加就诊人</p>
    </div>
    </div>
    </my-popup>
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
</template>
<script>
    import AppHeader from "../../business/app-header.vue";
    import MyPopup from "../../base/popup.vue";
  export default {
    data() {
      return {
          name:"李董良",
          date:"请选择你的就诊日期>",
          showPat:false,
          patList:["大周","小毛","老白","老邢","小郭"],
          showLoading:false,
          showSuccess:false
      };
    },
    computed: {},
    components: {
        AppHeader,
        MyPopup
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        setPat(){
            this.showPat=true;
        },
        check(item){
        },
        addNew(){
            this.showLoading=true;
            setTimeout(()=>{
                this.showLoading=false;
                this.addSuccess();
            },1000)
        },
        addSuccess(){
            this.showSuccess=true;
            setTimeout(()=>{
                this.showSuccess=false;
                this.$router.push("/Consult/ConsultDetail");
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
        height:6rem;
        background:rgb(238,250,254);
        width:100%;
        border:none;
        color:#cccccc;
        &::-webkit-input-placeholder {
            @include letter;
            font-size:0.85rem;
        }
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
</style>
