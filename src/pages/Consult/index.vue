<template>
<div class="app">
    <app-header>
        <div class="left" @click="back">
          <slot name="left">
            <font><span>&#xe600;</span></font>
          </slot>
         </div>
        <p class="headerTitle">问医生</p>
    </app-header>
    <pull-up @pullUp="getMore" :flag="flag" v-show="Got">
    <div class="main">
        <div class="nothing" v-if="consultList.length==0">
            <p class="xxl darker" >你还没有回答任何问题</p>
            <p class="m lightBlue">去回答</p>
    </div>
        <div v-else>
            <my-post v-for="item in consultList" :info="item" @activate="getDetail(item)":key="item.consultInfo.id"></my-post>
    
    </div>
    
    </div>
    </pull-up>
    <div class="button" @click="addConsult">
    </div>
    <div id="toast" v-show="nothingMore">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <p class="weui-toast__content">无更多内容</p>
        </div>
    </div>
    <my-loading class="myLoading" v-show="!Got"></my-loading>
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
          testList:[1,1,1,1,1,1,1,1,1,1],
          page:1,
          noReply:false,
          nothingMore:false,
          flag:true,
          Got:false
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
    methods: {
        back(){
            this.$router.push("/index/");
        },
        getDetail(item){
//            console.log(item);
            this.$router.push("/Consult/ConsultDetail/"+item.consultInfo.id);
        },
        addConsult(){
            this.$router.push("/Consult/newConsult");
        },
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
                    console.log(val);
                    this.consultList.push(...val.list);
                    if(this.page==val.page.total){
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
        display:none;
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
        background-image:url(../../../static/img/addRecord.png);
        background-size:cover;
        &:active{
            background-image:url(../../../static/img/addRecord_on.png);
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
