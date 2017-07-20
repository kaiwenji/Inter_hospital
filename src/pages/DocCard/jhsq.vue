<template>
<div class="app">
    <app-header>
        <p class="headerTitle">加号申请</p>
        <p slot="right" class="headerWord">申请加号</p>
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
            <p class="xl darker title" >王小仙&nbsp;&nbsp;&nbsp;<span class="l dark">主任医生</span></p>
            <p class="m light">浙江大学附属第二人民医院</p>
            <p class="m light">眼科</p>
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
          patList:["大周","小毛","老白","老邢","小郭"]
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
