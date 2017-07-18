<template>
    <div>
        <top>
            <div class="middle big">账户相关</div>
        </top>
      <div class="wrap">
        <div>
          <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goChangePhone">
              <div class="weui-cell__bd">
                <p>修改绑定手机号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="changePassword">
              <div class="weui-cell__bd">
                <p>修改密码</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>

          </div>
        </div>
        <div class="btn" @click="quit">
          <a href="javascript:;" class="weui-btn weui-btn_primary">退出登录</a>
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
        goChangePhone(){
          this.$router.push('changePhone')
        },
        changePassword(){
          this.$router.push({
            name:'forgetPassword',
            params:{
              msg:'修改密码'
            }
          })
        },
//        quit(){
//          Api('nethos.pat.logout',{
//            token:token
//          }).then(req=>{
//            if(req.succ){
//              console.log(req);
//              this.$router.push('login')
//            }else {
//              alert(req.msg)
//            }
//
//          })
//        }
      }
    }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
.btn{
  box-sizing: border-box;
  text-align: center;
  margin: 142rem/$rem auto 0 auto;
  width: 670rem/$rem;
}
  .weui-cells{
    margin-top: 0px;
  }
  .weui-btn_primary{
    background: #0aace9;
  }
</style>
