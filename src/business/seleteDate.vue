<template>
  <!-- 选时间模块-->
  <my-popup :show="showPat" @activate="showPat=false">
    <div slot="contain" class="contain">
      <div class="title">
        <p class="m light">请选择预期就诊时间</p>
      </div>
      <div class="main">
        <div v-for="item in patList" @click="check(item.date,item.ampm)">
          <p class="dark">{{item.date | Getdate}}&nbsp;&nbsp; 周{{item.week | week}}&nbsp;&nbsp;{{item.ampm}}</p>
        </div>
      </div>
      <div class="ft">
        <p class="dark" @click="cancel">取消</p>
      </div>
    </div>
  </my-popup>
</template>
<script>
  import MyPopup from "../base/popup.vue";
  import {Getdate,week} from '../lib/filter'
  export default({
    components:{
      MyPopup
    },
    filters:{
      Getdate,
      week
    },
    data(){
      return {
        showPat:false
      }
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
    methods: {
      check(date,ampm){
        let now = new Date(date)
        let yy = now.getFullYear();
        let mm = now.getMonth() + 1     //月
        let dd = now.getDate()          //日
        let clock=''
        clock+=yy+"-"
        if(mm < 10) clock += "0"
        clock += mm + "-"
        if(dd < 10) clock += "0"
        clock += dd
        var obj = {
          visitingAmpm:ampm,
          visitingTime:clock
        }
        console.log(clock,ampm);
//        this.cancel()
        this.$emit("activate", obj);

      },
      cancel(){
        this.showPat = false;
      }
    }
  })
</script>
<style scoped lang="scss">
  @import "../common/var.scss";
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
    border-top:.5px solid silver;
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
</style>
