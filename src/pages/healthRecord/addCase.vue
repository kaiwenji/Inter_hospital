<template>
    <div>
        <top>
            <div class="middle big">添加病例</div>
            <span slot="right" class="step">保存</span>
        </top>
      <div class="wrap">
        <div class="weui-cells">
          <a @click="selectDate" class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p class="bf">日期</p>
            </div>
            <div class="weui-cell__ft bf">2016-03-26</div>
          </a>
        </div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p class="bf">请输入病例详情</p>
            </div>
          </div>
        </div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" placeholder="请输入文本" rows="3"></textarea>
            </div>
          </div>
        </div>
        <div class="addImg">
          <upload></upload>
        </div>

      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import upload from '../../business/upload.vue'
    export default{
        components: {
            top,
          upload
        },
        data(){
            return {}
        },
        mounted(){

        },
      methods:{
        selectDate(){
          this.$weui.datePicker({
            start: 2000,
            end: 2020,
            defaultValue: [2017, 7, 20],
            onChange: function(result){
              console.log(result);
            },
            onConfirm: function(result){
              console.log(result);
            },
            id: 'datePicker'
          });
        }
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
  .weui-cells{
    margin-top: 0;
  }
  .addImg{
    box-sizing: border-box;
    background: white;
    padding: 30rem/$rem;
  }
</style>
