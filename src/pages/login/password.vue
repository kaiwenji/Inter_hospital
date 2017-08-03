<template>
    <div>
        <top>
            <div class="middle big">{{msg}}</div>
        </top>
      <div>
        <div class="weui-cells__title">请输入新密码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="password" v-model="patPassword" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-show="!$v.patPassword.minLength&&showPatPassWord">密码至少6位</span>
        <div class="weui-cells__title">请输入确认新密码</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" v-model="againPatPassword" type="password" placeholder="请输入"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-show="equal">俩次密码不一致</span>
      </div>
      <div class="btn">
        <a @click="editPassword" style="background: #30cfd0" href="javascript:;" class="weui-btn weui-btn_primary">确定</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    import api from '../../lib/api'
    export default{
        components: {
            top
        },
        data(){
            return {
              patPassword:'',
              showPatPassWord:false,
              againPatPassword:'',
              equal:false,
              captcha:'',
              cid:'',
              msg:''
            }
        },
      validations: {
        patPassword: {
          required,
          alphaNum,
          minLength:minLength(6)
        }
      },
      watch:{
        againPatPassword(){
          this.equal = (this.patPassword===this.againPatPassword?false:true)
        }
      },
        mounted(){
          this.$set(this.$data,'msg',this.$route.params.msg)
            this.$set(this.$data,'captcha',localStorage.getItem('captcha'))
            this.$set(this.$data,'cid',localStorage.getItem('cid'))
        },
      methods:{
        editPassword(){
          if(this.$v.patPassword.$invalid){
            this.$set(this.$data,'showPatPassWord',true)
          }else {
            var passWord = sha512(hex_md5(this.patPassword) + this.patPassword );
            api("smarthos.user.pat.passowrd.reset",{
              "cid": this.cid,
              "captcha": this.captcha,
              "patPassword": passWord
            }).then(res=>{
              console.log(res,999)
              if(res.succ){
                this.$router.push({
                  name:'succeed',
                  params:{
                    msg:'忘记密码'
                  }
                })
              }else {
                this.$weui.alert(res.msg)
              }
            })
          }
        }
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
    .form-group__message{
      color: red;
      box-sizing: border-box;
      padding-left: 15px;
      font-size: 12px;
    }
</style>
