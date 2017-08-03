<template>
  <div class="page">
    <top>
      <!--<div class="middle big">眼底快速通道</div>-->
      <span slot="right" class="step" @click="again">重新申请</span>
    </top>
    <div v-show="!showLoading" class="wrap" ref="wrapper">
      <div>
        <div class="hintMsg">
          <div class="succ">
            <img src="../../../static/img/succ.png" alt="">
          </div>
          <div class="text">
            <p class="sfc">预约成功</p>
            <p class="sfc">请前往浙二眼科医院，将页面展示给导医台护士，即可快速就诊眼底病专家</p>
          </div>
        </div>
        <div class="contain">
          <div class="patMsg">
            <div class="msg mf">
              就诊人信息
            </div>
            <!--<div class="toggle" @click="toggle">-->
            <!--切换就诊人-->
            <!--</div>-->
          </div>
          <div class="patDetail">
            <p>
              <span class="bfc">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
              <span class="bf">{{orderDetail.compatName}}</span>
            </p>
            <p>
              <span class="bfc">身份证号：</span>
              <span class="bf">{{orderDetail.compatIdcard}}</span>
            </p>
            <p>
              <span class="bfc">电话号码：</span>
              <span class="bf">{{orderDetail.compatMobile}}</span>
            </p>
            <p>
              <span class="bfc">年龄：</span>
              <span class="bf">{{orderDetail.compatAge}}</span>
            </p>
            <p>
              <span class="bfc">性别：</span>
              <span class="bf">{{orderDetail.compatGender=='M'?'男':'女'}}</span>
            </p>
          </div>
          <div class="date">
            <div class="mf commom">预期就诊时间</div>
            <div class="weui-cells" >
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                  <p class="mfc">{{orderDetail.visitingTime | Getdate}} {{orderDetail.visitingAmpm}}</p>
                </div>
              </a>
            </div>

          </div>
          <div class="date">
            <div class="mf commom">病情描述</div>
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell">
                <div class="weui-cell__bd weui-textarea mf">
                  {{orderDetail.description}}
                  <!--<textarea class="weui-textarea" placeholder="请务必填写您的病史，主诉，症状，指标，治疗经过，相关的检查报告请拍照上传。" rows="3"></textarea>-->
                </div>
              </div>
            </div>
          </div>
          <div class="upLoad">
            <div class="addImg">
              <img @click="bigImg(item.attaFileUrl)" v-for="item of orderDetail.attaList" :src="item.attaFileUrl" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <My-loading v-show="showLoading" class="myLoading"></My-loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../business/app-header.vue'
  import BScroll from 'better-scroll'
//  var token = localStorage.getItem('token');
  import api from '../../lib/api'
  import MyLoading from "../../base/loading/loading.vue";
  import {Getdate} from '../../lib/filter'
  export default{
    components: {
      top,
      MyLoading
    },
    filters:{
      Getdate
    },
    data(){
      return {
        token:localStorage.getItem('token'),
        orderDetail:{},
        id:'',
        showLoading:true
      }
    },
    mounted(){
      this.initScroll()
      this.getData()
    },
    watch:{
      orderDetail(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.initScroll()
          },50)
        })
      }
    },
    methods:{
      initScroll(){
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType: 1,
          bounce: true
        })
        console.log(this.scroll)
      },
      bigImg(url){
        this.$weui.gallery(url, {
        });
      },
      getData(){
        api("smarthos.appointment.fundus.detail",{
          token:this.token
        }).then(res=>{
          console.log(res,66666);
          if(res.succ){
            this.$set(this.$data,'showLoading',false)
            this.$set(this.$data,'orderDetail',res.obj)
            this.$set(this.$data,'id',res.obj.id)
          }else {
            this.$weui.alert(res.msg)
          }
        })
      },
      again(){
        var $this = this;
        this.$weui.dialog({
          title: '重新申请',
          content: '重新申请将放弃当前的预约，且就诊的资料不再保存',
          buttons: [{
            label: '取消',
            type: 'default',
            onClick: function () { console.log('取消')}
          }, {
            label: '重新申请',
            type: 'primary',
            onClick: function () {
              api("smarthos.appointment.fundus.giveup.modify",{
                id:$this.id,
                token:this.token
              }).then(res=>{
                console.log(res,666)
                if(res.succ){
                  $this.$router.push({
                    name:'eyeInjury'
                  })
                }else {
                  $this.$weui.alert(res.msg)
                }
              })
            }
          }]
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
  .page{
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }
  .wrap{
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right:0;
    top:88rem/$rem;
    bottom:0;
  }
  .hintMsg{
    padding: 20rem/$rem 30rem/$rem;
    background: #eefafe;
    display: flex;
  }
  .succ{
    box-sizing: border-box;
    padding: 0 20rem/$rem;
  img{
    width: 55rem/$rem;
    height: 55rem/$rem;
    box-sizing: border-box;
    margin-top: 20rem/$rem;
  }
  }
  .sfc{
    font-size: 22rem/$rem;
    color: #0fbdff;
  }
  .contain{
    box-sizing: border-box;
    padding: 30rem/$rem;
    background: white;
  }
  .patMsg{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: 30rem/$rem;
  }
  .msg{
    float: left;
  }
  .toggle{
    font-size: 28rem/$rem;
    color: #0fbdff;
    float: right;
  }
  .patDetail{
    width: 100%;
    height: 300rem/$rem;
    border-radius: 10rem/$rem;
    background: #f5fbfb;
    box-sizing: border-box;
    padding-left: 30rem/$rem;
  }
  .bfc{
    font-size: 32rem/$rem;
    color: #666666;
  }
  .weui-cells{
    background: #f5fbfb;
    border-radius: 10rem/$rem;
    margin-top: 0;
  }
  .weui-cells:before{
    border: none;
  }
  .weui-cells:after{
    border: none;
  }
  .commom{
    padding: 30rem/$rem 0;
  }
  .weui-textarea{
    background: #f5fbfb;
  }
  .upLoad{
    box-sizing: border-box;
    padding: 30rem/$rem 0;
    display: flex;
    align-items: center;
  img{
    width: 160rem/$rem;
    height: 160rem/$rem;
  }

  }
  .custom-classname{
    font-size: 26rem/$rem;
  }
  .addImg{
  img{
    padding: 5px 5px 0 0;
  }
  }
  /*.myLoading{*/
    /*height: 100%;*/
  /*}*/
</style>
