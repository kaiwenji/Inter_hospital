<template>
  <div class="top_bar main_head border-1px">
    <section class="goBack" @click="back()">
       <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="title">
      <span class="word">{{title}}</span>
    </section>
    <section class="nav"  @click="apply()">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
  </div>
</template>
<script>
  export default{
    props:{
      title:{
          type:String
      },
      rightTitle:{
          type:String
      }
    },
    methods:{
      back(){
        this.$router.back(-1)
      },
      apply(){
          this.$emit("on-apply")
      }
    },
    watch:{

    }
  }
</script>
<style scoped lang="scss">
  @import '../common/public.scss';
  @import '../common/mixin.scss';
  .top_bar{
    background-color: white;
    height: 50px;
    line-height: 50px;
    width:100%;
    top:0;
    position: fixed;
    display: flex;
    z-index:10;
    section{
      text-align: center;
      .word{
        font-size: 18px;
        color: #333333;
        font-family: PingFang SC;
      }
      span{
        display: block;
      }
    }
    .goBack{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 15px;
      img{
        height: 15px;
      }
    }
    .title{
      flex:2;
    }
    .nav{
      flex:1;
      .rightWord{
        font-size: 32rem/$rem;
        color: #0FBDFF;
      }
    }
  }
</style>
