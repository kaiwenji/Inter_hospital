<template>
    <div>
        <top>
            <div class="middle big">完善个人信息</div>
        </top>
      <div>
        <div class="weui-cells__title">请输入真实姓名</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <div class="weui-cells__title">请输入身份证号码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <div class="weui-cells__title">性别</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <div class="weui-cells__title">年龄</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入"/>
            </div>
          </div>
        </div>

      </div>
      <div class="mfc  text">
        您的个人信息一经确认将无法修改，提交前请仔细核对，如提交错误，请联系客服，谢谢！
      </div>
      <div class="btn" @click="success">
        <a style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">确定</a>
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

        }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';
.text{
  box-sizing: border-box;
  margin-top: 30rem/$rem;
  padding: 10rem/$rem 20rem/$rem;
}
    .btn{
      width: 100%;
      box-sizing: border-box;
      padding: 80rem/$rem 30rem/$rem 40rem/$rem 30rem/$rem;
    }
</style>
