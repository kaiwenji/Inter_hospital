<template>
    <div>
        <top>
            <div>常用就诊人</div>
            <span slot="right" class="add"@click="saveEdit">保存修改</span>
        </top>
      <div class="wrap">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label></div>
            <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patName.$error }">
              <input  @blur="$v.patName.$touch()" class="weui-input" type="text" v-model="patName"  placeholder="请输入姓名"/>
            </div>
          </div>
          <span class="form-group__message bf" v-if="!$v.patName.minLength&&showNameError">姓名至少2位</span>
          <span class="form-group__message bf" v-if="!$v.patName.maxLength&&showNameError">姓名至多15位</span>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf" >身份证号</label></div>
            <div class="weui-cell__bd" :class="{ 'form-group--error':$v.patIdcard.$error }">
              <input @blur="getAge"  @input="$v.patIdcard.$touch()"   class="weui-input" type="number" v-model="patIdcard" placeholder="请输入身份证号"/>
            </div>
          </div>
        </div>
        <span class="form-group__message bf" v-if="!$v.patIdcard.cd&&showCd">请输入正确的身份证号</span>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">手机号</label></div>
            <div class="weui-cell__bd">
              {{mobile}}
            </div>
            <div class="arrow" @click="changePhone">
              &gt;
            </div>
          </div>
          <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
              <label  class="weui-label bf">性&nbsp;&nbsp;&nbsp;别</label>
            </div>
            <div class="weui-cell__bd">
              <select class="weui-select bf" name="select2">
                <option value="1">男</option>
                <option value="2">女</option>
              </select>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">年&nbsp;&nbsp;&nbsp;龄</label></div>
            <div class="weui-cell__bd bf">
              {{age}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../business/app-header.vue'
  import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
  import cd from '../../lib/regex'
  export default{
    components: {
      top
    },
    validations: {
      patName: {
        required,
        minLength:minLength(2),
        maxLength:maxLength(15)
      },patIdcard:{
        required,
        cd:cd(15,18)
      },
      mobile: {
        required,
        cd:cd(1)
      }
    },
    data(){
      return {
        patName:'',
        patIdcard:'',
        showNameError:false,
        showCd:false,
        mobile:'',
        patId:'',
        age:'',
        compatId:'',
        patDetail:{}
      }
    },
    mounted(){
      console.log(this.$route.params.patObj,565656)
      this.$set(this.$data,'patName',this.$route.params.patObj.compatName);
      this.$set(this.$data,'patIdcard',this.$route.params.patObj.compatIdcard);
      this.$set(this.$data,'mobile',this.$route.params.patObj.compatMobile);
      this.$set(this.$data,'age',this.$route.params.patObj.compatAge);
      this.$set(this.$data,'compatId',this.$route.params.patObj.compatId);
//      Api('nethos.pat.info.get',{
//        token:token
//      }).then(req=>{
//        console.log(req)
//      })
    },
    methods:{
      saveEdit(){
        if(this.$v.patName.$invalid){
          this.$set(this.$data,'showNameError',true)
        }else if(this.$v.patIdcard.$invalid){
          this.$set(this.$data,'showCd',true)
        } else {
          alert('成功');
        }
      },
      getAge(){
        var date = new Date;
        var year = date.getFullYear();
        var num = this.patIdcard.substring(6,10);
        var age = year-num;
        return this.$set(this.$data,'age',age)
      },
      bindCode(){
        Api('nethos.book.compat.bind',{
          token:token,
          compatId:this.compatId
        }).then(req=>{
          console.log(req,999999);
          if(req.succ){

          }else {
            this.$router.push('feedback')
          }
        })
      },
      deleteUser(){
        Api('nethos.pat.compat.delete',{
          token:token,
          compatId:this.compatId
        }).then(req=>{
          console.log(req,56565656);
          if(req.succ){
            this.$router.push('users')
          }
        })
      },
      changePhone(){
        this.$router.push('editPhone')
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .add{
    color: #0FBDFF;
  }
  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
  .arrow{
    color: gray;
    font-weight: 800;
  }
  .weui-cells{
    margin-top: 30rem/$rem;
  }
  .weui-label{
    width: 80px;
  }

</style>
