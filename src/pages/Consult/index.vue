<template>
<div class="app">
    <app-header>
        <p class="headerTitle">问医生</p>
    </app-header>
    <div class="main">
        <div class="nothing" v-if="testList.length==0">
            <p class="xxl darker" >你还没有回答任何问题</p>
            <p class="m lightBlue">去回答</p>
    </div>
        <div v-else>
          <div class="panel" v-for="item in testList" @click="check">
              <p class="font-hide m">11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
              <div class="horizontal">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img src="../../../static/img/qr.png">
                  <img class="last" src="../../../static/img/qr.png">
    </div>
              <div class="ft">
                  <img src="../../../static/img/docProfile.png" class="icon">
                  <p class="lightBlue m">李逵<span class="light m">回答</span></p>
                  <p class="middle m light">1小时前创建</p>
                  <p class="right m light">28条评论</p>
                  
    </div>
    </div>
    </div>
    </div>
    <div class="button" @click="addConsult">
    </div>
    </div>
</template>

<script>
    import AppHeader from "../../business/app-header.vue";
  export default {
    data() {
      return {
          testList:[1,1,1,1,1,1,1,1,1,1]
      };
    },
    computed: {},
    components: {
        AppHeader
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        check(){
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
        padding:0.8rem;
        margin-bottom:0.5rem;
        margin-left:0.8rem;
        margin-right:0.8rem;
        background-color:#FFFFFF;
        border-radius:10px;
        height:8rem;
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
