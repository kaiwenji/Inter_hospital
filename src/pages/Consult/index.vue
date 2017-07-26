<template>
<div class="app">
    <app-header>
        <p class="headerTitle">问医生</p>
    </app-header>
    <div class="main">
        <div class="nothing" v-if="consultList.length==0">
            <p class="xxl darker" >你还没有回答任何问题</p>
            <p class="m lightBlue">去回答</p>
    </div>
        <div v-else>
          <div class="panel" v-for="item in consultList" @click="getDetail(item)">
              <p class="font-hide m content">{{ item.consultInfo.consultContent}}</p>
              <div class="horizontal">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img class="last" src="../../../static/img/qr.png">
    </div>
              <div class="ft">
                  <p v-if="!item.userDocVo" class="light m">暂无医生回答</p>
                  <img :src="item.userDocVo&&item.userDocVo.docAvatar" class="icon" v-if="item.userDocVo">
                  <p class="lightBlue m" v-if="item.userDocVo">{{item.userDocVo&&item.userDocVo.docName}}<span class="light m">回答</span></p>
                  <p class="middle m light">{{item.consultInfo.createTime | goodTime}}</p>
                  <p class="right m light">{{item.consultInfo.replyCount||0}}条评论</p>
                  
    </div>
    </div>
    </div>
    </div>
    <div class="button" @click="addConsult">
    </div>
    </div>
</template>

<script>
    import {goodTime} from "../../lib/filter.js";
    import Api from "../../lib/api.js";
    import AppHeader from "../../business/app-header.vue";
  export default {
    data() {
      return {
          consultList:[],
          testList:[1,1,1,1,1,1,1,1,1,1],
          page:1,
          noReply:false
      };
    },
    computed: {},
    components: {
        AppHeader
    },
    mounted() {
        Api("smarthos.consult.pic.list.page",{
            pageSize:10,
            pageNum:1,
            token:window.localStorage['token']
        })
        .then((val)=>{
            console.log(val.list);
            this.consultList=val.list;
        })
    },
    beforeDestroy() {

    },
      filters:{
          goodTime
      },
    methods: {
        getDetail(item){
//            console.log(item);
            this.$router.push("/Consult/ConsultDetail/"+item.consultInfo.id);
        },
        addConsult(){
            this.$router.push("/Consult/newConsult");
        }
    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";
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
    .panel{
        .content{
            min-height:2rem;
        }
        padding:0.8rem;
        margin-bottom:0.5rem;
        margin-left:0.8rem;
        margin-right:0.8rem;
        background-color:#FFFFFF;
        border-radius:10px;
/*        height:8rem;*/
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
            .icon{
                border-radius:1rem;
                flex:0 0 auto;
                display:block;
                height:0.8rem;
                width:0.8rem;
                padding:0;
                padding-top:0.2rem;
            }
            p{
                flex:0 0 auto;
                &.middle{
                    padding-top:0.1rem;
                    flex:1 1 auto;
                    text-align:right;
                }
                &.right{
                    padding-left:0.5rem;
                    padding-top:0.1rem;
                }
            }
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
    
</style>
