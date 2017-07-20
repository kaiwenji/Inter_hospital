<template>
    <div class="page">
        <top>
            <div class="middle big">眼底病快速通道</div>
            <span slot="right" class="step" @click="orderDetail">立即预约</span>
        </top>
      <div class="banner">
        <img src="../../../static/img/test.jpg" alt="">
      </div>
      <div class="wrap">
        <div class="patMsg">
          <div class="msg mf">
            就诊人信息
          </div>
          <div class="toggle">
            切换就诊人
          </div>
        </div>
        <div class="patDetail">
          <p>
            <span class="bfc">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
            <span class="bf">李康飞</span>
          </p>
          <p>
            <span class="bfc">身份证号：</span>
            <span class="bf">410425199212183539</span>
          </p>
          <p>
            <span class="bfc">电话号码：</span>
            <span class="bf">13522365145</span>
          </p>
          <p>
            <span class="bfc">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</span>
            <span class="bf">18</span>
          </p>
          <p>
            <span class="bfc">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
            <span class="bf">男</span>
          </p>
        </div>
        <div class="date">
          <div class="mf commom">受伤时间</div>
          <div class="weui-cells" >
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p class="mfc">请选择受伤时间</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>

        </div>
        <div class="date">
          <div class="mf commom">预期就诊时间</div>
          <div class="weui-cells" >
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p class="mfc">请选择预期就诊时间</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>

        </div>
        <div class="date">
          <div class="mf commom">患者所在地</div>
          <div class="weui-cells" >
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <p class="mfc">请选择患者所在地点</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
          </div>

        </div>
        <div class="date">
          <div class="mf commom">病情描述</div>
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请务必填写您的病史，主诉，症状，指标，治疗经过，相关的检查报告请拍照上传。" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="upLoad">
          <div class="addImg">
            <img src="../../../static/img/addImg.png" alt="">
          </div>
          <div class="hint">
            <p class="bf">添加图片</p>
            <p class="mfc">请上传患处图片，让医生更了解您</p>
          </div>
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
        orderDetail(){
          this.$router.push({
            name:'orderDetail'
          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';
   .page{
      display: flex;
     flex: 1;
     flex-direction: column;
     }
    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
  .banner{
    width: 100%;
    height: 200rem/$rem;
    img{
      width: 100%;
      height: 200rem/$rem;
    }
  }
    .wrap{
      flex: 1;
      padding: 30rem/$rem;
      background: white;
      overflow: auto;
    }
  .patMsg{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: 30rem/$rem;
  }
  .msg{
    float: left;
  }
  .toggle{
    font-size: 28rem/$rem;
    color: #0fbdff;
    float: right;
  }
  .patDetail{
    width: 100%;
    height: 300rem/$rem;
    border-radius: 10rem/$rem;
    background: #f5fbfb;
    box-sizing: border-box;
    padding-left: 30rem/$rem;
  }
  .bfc{
    font-size: 32rem/$rem;
    color: #666666;
  }
    .weui-cells{
      background: #f5fbfb;
      border-radius: 10rem/$rem;
      margin-top: 0;
    }
    .weui-cells:before{
      border: none;
    }
    .weui-cells:after{
      border: none;
    }
  .commom{
    padding: 30rem/$rem 0;
  }
  .weui-textarea{
    background: #f5fbfb;
  }
  .upLoad{
    box-sizing: border-box;
    padding: 30rem/$rem 0;
    display: flex;
    align-items: center;
    img{
      width: 140rem/$rem;
      height: 140rem/$rem;
    }

  }
    .hint{
      padding-left: 30rem/$rem;
      box-sizing: border-box;
    }
</style>
