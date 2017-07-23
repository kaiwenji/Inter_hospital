<template>
    <div class="page">
        <top>
            <div class="middle big">眼底快速通道</div>
            <span slot="right" class="step" @click="again">重新申请</span>
        </top>
      <div class="wrap">
        <div class="hintMsg">
          <div class="succ">
            <img src="../../../static/img/succ.png" alt="">
          </div>
          <div class="text">
            <p class="sfc">预约成功</p>
            <p class="sfc">请前往浙二眼科医院，将页面展示给导医台护士，即可快速就诊眼底病专家</p>
          </div>
        </div>
        <div class="contain">
          <div class="patMsg">
            <div class="msg mf">
              就诊人信息
            </div>
            <div class="toggle" @click="toggle">
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
                  <p class="mfc">2016-12-25</p>
                </div>
              </a>
            </div>

          </div>
          <div class="date">
            <div class="mf commom">预期就诊时间</div>
            <div class="weui-cells" >
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p class="mfc">2017-06-23</p>
                </div>
              </a>
            </div>

          </div>
          <div class="date">
            <div class="mf commom">患者所在地</div>
            <div class="weui-cells" >
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p class="mfc">杭州市上城区</p>
                </div>
              </a>
            </div>

          </div>
          <div class="date">
            <div class="mf commom">病情描述</div>
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell">
                <div class="weui-cell__bd weui-textarea mf">
                  请务必填写您的病史，主诉，症状，指标，治疗经过，相关的检查报告请拍照上传
                  <!--<textarea class="weui-textarea" placeholder="请务必填写您的病史，主诉，症状，指标，治疗经过，相关的检查报告请拍照上传。" rows="3"></textarea>-->
                </div>
              </div>
            </div>
          </div>
          <div class="upLoad">
            <div class="addImg">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
              <img src="../../../static/img/addImg.png" alt="">
            </div>
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
        again(){
          this.$weui.dialog({
            title: '重新申请',
            content: '重新申请将放弃当前的预约，且就诊的资料不再保存',
            buttons: [{
              label: '取消',
              type: 'default',
              onClick: function () { alert('取消') }
            }, {
              label: '重新申请',
              type: 'primary',
              onClick: function () { alert('确定') }
            }]
          });
        },
        toggle(){
          this.$weui.actionSheet([
            {
              label: '选择就诊人',
              onClick: function () {
                console.log('拍照');
              }
            }, {
              label: '从相册选择',
              onClick: function () {
                console.log('从相册选择');
              }
            }, {
              label: '添加就诊人',
              onClick: function () {
                console.log();
              }
            }
          ], [
            {
              label: '取消',
              onClick: function () {
                console.log('取消');
              }
            }
          ],
            {
              className: 'custom-classname'
            })
        },
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';
    .step {
        padding-right: 5px;
        color: #3CC51F;
        box-sizing: border-box;
    }
  .page{
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }
  .wrap{
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
  }
  .hintMsg{
    padding: 20rem/$rem 30rem/$rem;
    background: #eefafe;
    display: flex;
  }
  .succ{
    box-sizing: border-box;
    padding: 0 20rem/$rem;
    img{
      width: 55rem/$rem;
      height: 55rem/$rem;
      box-sizing: border-box;
     margin-top: 20rem/$rem;
    }
  }
    .sfc{
      font-size: 22rem/$rem;
      color: #0fbdff;
    }
  .contain{
    box-sizing: border-box;
    padding: 30rem/$rem;
    background: white;
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
      width: 160rem/$rem;
      height: 160rem/$rem;
    }

    }
 .custom-classname{
   font-size: 26rem/$rem;
 }
</style>
