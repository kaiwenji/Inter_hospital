<template>
    <div class="page">
        <top>
            <div class="middle big">健康档案</div>
        </top>
      <div class="wrap">
        <div class="patMsg">
          <div class="patImg">
            <img src="../../../static/img/psb.jpg" alt="">
          </div>
          <div class="patDetail">
            <p class="bf">刘琦</p>
            <p class="mfc">姓名：&nbsp; 无名氏</p>
            <p class="mfc">男 &nbsp;&nbsp;&nbsp;23</p>
          </div>
        </div>
        <div class="basic">
          <div class="weui-cells__title title">基本情况</div>
          <div class="weui-cells bf">
            <a @click="goCaseDetail" class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p>所患疾病</p>
              </div>
              <div class="weui-cell__ft mfc">未填写</div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p>既往史</p>
              </div>
              <div class="weui-cell__ft mfc">无</div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p>家族史</p>
              </div>
              <div class="weui-cell__ft mfc">无</div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p>过敏史</p>
              </div>
              <div class="weui-cell__ft mfc">无</div>
            </a>
          </div>
        </div>
        <div class="record">
          <div class="weui-cells__title title">诊疗记录</div>
          <div class="recordDetail" v-for="item of 5">
            <div class="recordDate" >
              <span class="mf">6/28 </span>
            </div>
            <div class="recordContain">
              <span class="mf">今天去验光了一下，小护士长得还不错，人也很热心，就是不怎爱说话，不过最后给我微信了</span>
              <p class="recordImg">
                <img src="../../../static/img/psb.jpg" alt="">
                <img src="../../../static/img/psb.jpg" alt="">
                <img src="../../../static/img/psb.jpg" alt="">
                <img src="../../../static/img/psb.jpg" alt="">
                <img src="../../../static/img/psb.jpg" alt="">
                <img src="../../../static/img/psb.jpg" alt="">
              </p>
            </div>
          </div>
        </div>


      </div>
      <div class="btn">
        <div class="btnImg" @click="goAddCase">
          <img  src="../../../static/img/btn.png" alt="">
        </div>
      </div>
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

        },
      methods:{
        goAddCase(){
          this.$router.push({
            name:'addCase'
          })
        },
        goCaseDetail(){
          this.$router.push({
            name:'caseDetail'
          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';

    .page{
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }
    .wrap{
      flex: 1;
      overflow-y: auto;
    }
   .patMsg{
     padding: 20rem/$rem 30rem/$rem;
     height: 160rem/$rem;
     width: 100%;
     display: flex;
     align-items: center;
     box-sizing: border-box;
     background: white;
   }
  .patImg{
    box-sizing: border-box;
    padding-right: 30rem/$rem;
    img{
      display: block;
      width: 120rem/$rem;
      height: 120rem/$rem;
    }
  }
    .weui-cells__title{
      padding: 0;
    }
  .weui-cells:before{
    border: none;
  }
  .title{
    box-sizing: border-box;
    padding: 10rem/$rem 30rem/$rem;
    font-size: 32rem/$rem;
    color: black;
  }
   .recordDetail{
     padding: 30rem/$rem;
     background: white;
     display: flex;
   }
  .recordDate{
    padding-right: 20rem/$rem;
  }
  .circle{
    display: inline-block;
    width: 20rem/$rem;
    height: 20rem/$rem;
    background: #0fbdff;
    border-radius: 10rem/$rem;
  }
  .recordImg{
    box-sizing: border-box;
    padding-top: 20rem/$rem;
    img{
      width: 140rem/$rem;
      height: 140rem/$rem;
    }
  }
    .btn{
      position: fixed;
      bottom: 90rem/$rem;
      right: 30rem/$rem;
    }
  .btnImg{
    img{
      width: 110rem/$rem;
      height: 110rem/$rem;
    }

  }
</style>
