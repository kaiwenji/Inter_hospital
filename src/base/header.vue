<template>
  <div class="top_bar main_head border-1px">
    <section class="scanImg"  v-if="path == '/patientIndex'">
      <img :src="imgSrc" alt="">
    </section>
    <section class="goBack" @click="goIndex()" v-else-if="path == '/myAddList/myAddApply'">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" @click="back()" v-else>
       <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="title">
      <span class="word">{{title}}</span>
    </section>
    <section class="nav"  @click="myAdd()" v-if="path == '/addList'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav"  @click="apply()" v-else>
      <span class="rightWord">{{rightTitle}}</span>
    </section>
  </div>
</template>
<script>
  export default{
    data(){
        return{
          path:""
        }
    },
    props:{
      title:{
          type:String
      },
      rightTitle:{
          type:String
      },
      imgSrc:{
          default:"../../static/img/返回.png"
      }
    },
    mounted(){
      this.path = this.$route.path
      console.log(this.path)
    },
    methods:{
      back(){
        this.$router.back(-1)
      },
      apply(){
          this.$emit("on-apply")
      },
      myAdd(){
          this.$emit("on-addList")
      },
      goIndex(){
          this.$emit("go-index")
      }
    },
    watch:{
      "$route":function(){
        this.path = this.$route.path
      }
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
      img{
        height: 15px;
        padding-left: 30rem/$rem;
      }
    }
    .scanImg{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      /*padding-left: 15px;*/
      img{
        width:40rem/$rem;
        padding-left: 30rem/$rem;
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
