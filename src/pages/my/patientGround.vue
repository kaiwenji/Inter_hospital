<template>
    <div>
        <top>
            <div class="middle big">群发消息</div>
            <span slot="right" class="step"></span>
        </top>
      <div class="weui-cell weui-cell_access mfc" style="background: white">
        <div class="weui-cell__bd" style="display: flex">
          <div class="title" style="vertical-align: middle"  ><img  src="../../../static/img/xin.png" alt=""></div>
          <!--<div class="test" style="vertical-align: middle"><img src="../../../static/img/xin.png" alt=""></div>-->
        </div>
        <div class="weui-cell__ft"> 申请复诊患者 <span class="weui-badge" style="margin-right: 5px;">8</span></div>
      </div>

      <div class="mfc">复诊患者</div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){

        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';

    .title{
      height: 50rem/$rem;
      line-height: 50rem/$rem;
      img{
        width: 50rem/$rem;
        height: 50rem/$rem;
        border-radius: 25rem/$rem;
        /*transform: translateX(10px);*/
      }
    }
    .test{
      height: 50rem/$rem;
      line-height: 50rem/$rem;
    img{
      width: 50rem/$rem;
      height: 50rem/$rem;
      border-radius: 25rem/$rem;

    }
    }
    .step {

        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
</style>
