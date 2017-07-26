<template>
  <div>
    <top>
      <div class="middle big">病例详情</div>
      <span slot="right" class="step">保存</span>
    </top>
    <div class="wrap">
      <div class="weui-cells">
        <a @click="selectDate" class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p class="bf">日期</p>
          </div>
          <div class="weui-cell__ft bf">{{date | Getdate}}</div>
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
            <textarea class="weui-textarea" v-model="caseText" placeholder="请输入文本" rows="3"></textarea>
          </div>
        </div>
      </div>

    </div>
    <div class="addImg">
      <img src="" alt="">
      <upload>
        <div slot="title"></div>
      </upload>
    </div>
    <div class="btn">
      <div class="text mfc">2016/7/28由李康飞添加</div>
      <a style="background: #ff8588" href="javascript:;" class="weui-btn weui-btn_primary">删除</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../business/app-header.vue'
  import upload from '../../business/upload.vue'
  import {Getdate} from '../../lib/filter'
  export default{
    components: {
      top,
      upload
    },
    filters:{
      Getdate
    },
    data(){
      return {
        caseObj:{},
        date:'',
        caseText:'',
        imgList:[]
      }
    },
    mounted(){
      var caseObj = this.$route.params.caseObj;
      console.log(caseObj,5555)
      this.$set(this.$data,'caseObj',caseObj)
      this.$set(this.$data,'date',caseObj.medicalHistory.createTime)
      this.$set(this.$data,'caseText',caseObj.medicalHistory.medContent)
      this.$set(this.$data,'imgList',caseObj.medicalHistory.attaList)
    },
    methods:{
      selectDate(){

        var $this = this;
        this.$weui.datePicker({
          start: 2010,
          end: 2020,
          onConfirm: function(result){
            $this.$set(this.$data,'date','');
            console.log(result,6666);
            for(var i=0;i<result.length;i++){
              $this.date+=result[i].value+'-'
            }
            var s =  $this.date
            console.log( s.substring(0,s.length-1));
            $this.$set($this.$data,'date', s.substring(0,s.length-1))
          }
        });
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
  .weui-cells{
    margin-top: 0;
  }
  .addImg{
    box-sizing: border-box;
    background: white;
    /*padding:0 30rem/$rem;*/
  }
  .btn{
    position: fixed;
    bottom: 20rem/$rem;
    box-sizing: border-box;
    padding: 20rem/$rem;
    left: 0;
    width: 100%;
  }
  .text{
    text-align: center;
    box-sizing: border-box;
    padding-bottom: 20rem/$rem;
  }
  .addImg img{
    width: 140rem/$rem;
    height: 140rem/$rem;
    margin-right: 5px;
  }

</style>
