<template>
    <div>
        <top>
            <div class="middle big">忘记密码</div>
        </top>
      <div>
        <div class="weui-cells__title">请输入手机号</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <div class="weui-cells__title">请输入密码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入"/>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <a style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">登录</a>
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
    .btn{
      width: 100%;
      box-sizing: border-box;
      padding: 80rem/$rem 30rem/$rem 40rem/$rem 30rem/$rem;
    }
</style>
