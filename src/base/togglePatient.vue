<template>
  <!-- 切换就诊人模块-->
  <my-popup :show="showPat" @activate="close">
    <div slot="contain" class="contain">
      <div class="title">
        <p class="m light border-1px">请选择就诊人</p>
      </div>
      <div class="main">
        <div v-for="(item,index) in patList" @click="check(index)">
          <p class="dark border-1px">{{item.commpatName}}</p>
        </div>
        <p class="lightBlue border-1px" @click="addPat()">添加就诊人<span><img src="../../static/img/add.png"></span></p>
      </div>
      <div class="ft">
        <p class="dark cancel" @click="closeToggle()">取消</p>
      </div>
    </div>
  </my-popup>
</template>
<script>
  import MyPopup from "../base/popup.vue";

  export default({
    components:{
      MyPopup
    },
    props:{
      showPat:{
        type:Boolean,
        default:false,
        required:true
      },
      patList:{
        type:Array,
        default:[],
        required:true
      }
    },
    methods:{
      check(index){
        this.$emit("activate",index);
      },
      addPat(){
        this.$router.push("/users/");
      },
      close(){
        this.$emit("close");
      },
      closeToggle(){
        this.$emit("toggleClosed")
      },
      close(){
        this.$emit("toggleClosed")
      }
    }
  })
</script>
<style scoped lang="scss">
  @import "../common/var.scss";
  @import '../common/mixin.scss';
  @mixin letter{
    padding: 0.5rem 0.7rem;
  }
  .contain{
    background:rgb(238,238,238);
    display:flex;
    flex-direction:column;
    flex:1 1 auto;
    div{
      background:white;
      p{
        position:relative;
        /*border-top:1px solid silver;*/
        @include letter;
        &:hover{
          background-color:silver;
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
        /*border-bottom:.5px solid silver;*/
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
</style>
