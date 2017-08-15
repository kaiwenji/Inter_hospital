<template>
    <div>
        <top>
          <div slot="left"></div>
            <div>登录</div>
        </top>
      <div>
        <div class="weui-cells__title">请输入手机号</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input v-model="patMobile" class="weui-input" type="number" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <div class="weui-cells__title">请输入密码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input v-model="patPassword" class="weui-input" type="password" placeholder="请输入"/>
            </div>
          </div>
        </div>
      </div>
      <div class="btn" @click="login" >
        <a :class="{active:current==1}" style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">登录</a>
      </div>
      <div class="bottom">
        <div class="register" @click="register">注册</div>
        <div class="forget" @click="forgetPassword">忘记密码</div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import api from '../../lib/api'
    export default{
        components: {
            top
        },
        data(){
            return {
              patMobile:'13522365145',
              patPassword:'111111',
                current:''
            }
        },
        mounted(){
        },
      methods:{
        forgetPassword(){
          this.$router.push({
            name:'forgetPassword',
            params:{
              msg:'忘记密码'
            }
          })
        },
        register(){
          this.$router.push({
            name:'register'
          })
        },
        login(){
            this.$set(this.$data,'current','1')
          var passWord = sha512(hex_md5(this.patPassword) + this.patPassword );
          api('smarthos.user.pat.login',{
            "patMobile":this.patMobile,
            "patPassword":passWord
          }).then(res=>{
            console.log(res,2222);
            if(res.succ){
              localStorage.setItem('token',res.token)
              localStorage.setItem('patAvatar',res.obj.pat.patAvatar)
              localStorage.setItem('commpat',JSON.stringify(res.obj.commpat))
              console.log(JSON.stringify(res.obj.commpat))
              this.$router.push({
                name:'patientIndex'
              })
            }else {
              this.$weui.alert(res.msg)
            }

          })


//          this.$router.push({
//            name:'eyeIllness'
//          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';
    .active{
        background: gainsboro !important;
    }
    .btn{
      width: 100%;
      box-sizing: border-box;
      padding: 80rem/$rem 30rem/$rem 40rem/$rem 30rem/$rem;
    }
    .bottom{
      overflow: hidden;
      padding: 0 30rem/$rem;
      box-sizing: border-box;
    }
  .register{
    float: left;
    font-size: 32rem/$rem;
    color: #30cfd0;
  }
  .forget{
    float: right;
    font-size: 32rem/$rem;
    color: #30cfd0;
  }
</style>
