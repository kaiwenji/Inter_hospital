<template>
    <div id="onlinepage">
        <top>
            <div class="middle big">常用就诊人</div>
            <span slot="right" class="add" @click="goAddUser">添加</span>
        </top>
      <div class="wrap">
        <div class="patMassage">
          <div class="weui-cells" @click="goEditUser()">
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd">
                <div class="detail">
                  <div class="name">
                    <ul>
                      <li>李康飞 &nbsp;&nbsp;<span>男&nbsp;&nbsp;22</span></li>
                      <li>手机号 : 13522365145</li>
                      <li>身份证号 : 410425199212183539</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
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
            return {
              list:[],
              patId:""
            }
        },
        mounted(){

        },
      methods:{
        goAddUser(){
          this.$router.push({
            name:'addUser'
          })
        },
        goEditUser(){
          this.$router.push('/editUser')
        }
      }
    }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  #onlinepage{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .wrap{
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    margin-top: 30rem/$rem 10rem/$rem 20rem/$rem 10rem/$rem;

  }

  .name{
    color: gray;
  }
  .add{
    padding-right: 15px;
    color: #0FBDFF;
  }
</style>
