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
        <div class="weui-cells__title">请输入短信验证码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入"/>
            </div>
            <div class="weui-cell__ft">
              <button class="weui-vcode-btn">获取验证</button>
            </div>
          </div>
        </div>
      </div>
      <div class="btn" @click="password">
        <a style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">下一步</a>
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
        password(){
          this.$router.push({
            name:'password'
          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';
    .weui-vcode-btn{
      height: auto;
      line-height: 1;
      color: white;
      border: none;
      padding: 5px 3px;
    }
    .weui-cell__ft{
      background: #30cfd0;
      width: auto;
    }
    .btn{
      width: 100%;
      box-sizing: border-box;
      padding: 80rem/$rem 30rem/$rem 40rem/$rem 30rem/$rem;
    }
</style>
