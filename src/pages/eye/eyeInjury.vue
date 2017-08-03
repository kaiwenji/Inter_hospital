<template>
  <div class="page">
    <div class="contain"v v-show="showContain">
      <top>
        <div class="middle big">眼底病快速通道</div>
        <span slot="right" class="step" @click="orderDetail">立即预约</span>
      </top>
      <div ref="wrapper" class="wrapper">
        <div>
          <div class="banner">
            <img :src="headerImg" alt="">
          </div>
          <div class="wrap">
            <div class="patMsg">
              <div class="msg mf">
                就诊人信息
              </div>
              <div class="toggle" @click="toggleUser">
                切换就诊人
              </div>
            </div>
            <div class="patDetail">
              <p>
                <span class="bfc">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                <span class="bf">{{patMsg.commpatName}}</span>
              </p>
              <p>
                <span class="bfc">身份证号：</span>
                <span class="bf">{{patMsg.commpatIdcard}}</span>
              </p>
              <p>
                <span class="bfc">电话号码：</span>
                <span class="bf">{{patMsg.commpatMobile}}</span>
              </p>
              <p>
                <span class="bfc">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</span>
                <span class="bf">18</span>
              </p>
              <p>
                <span class="bfc">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                <span class="bf">{{patMsg.commpatGender=='M'?'男':'女'}}</span>
              </p>
            </div>
            <div class="date">
              <div class="mf commom">预期就诊时间</div>
              <div class="weui-cells" >
                <a @click="visitingTime" class="weui-cell weui-cell_access" href="javascript:;">
                  <div class="weui-cell__bd">
                    <p class="mfc">{{visitingDate?visitingDate:'请选择预期就诊时间'}}</p>
                  </div>
                  <div class="weui-cell__ft">
                    {{injuryDetail.visitingTime}} {{injuryDetail.visitingAmpm}}
                  </div>
                </a>
              </div>

            </div>
            <div class="date">
              <div class="mf commom">病情描述</div>
              <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                  <div class="weui-cell__bd">
                    <textarea v-model="description" class="weui-textarea" placeholder="请务必填写您的病史，主诉，症状，指标，治疗经过，相关的检查报告请拍照上传。" rows="3"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="upLoad">-->
            <!--<div class="addImg">-->
            <!--<img src="../../../static/img/addImg.png" alt="">-->
            <!--</div>-->
            <!--<div class="hint">-->
            <!--<p class="bf">添加图片</p>-->
            <!--<p class="mfc">请上传患处图片，让医生更了解您</p>-->
            <!--</div>-->
            <!--</div>-->
            <upload v-on:getAttaIdsList="getAttaIdsList">
            </upload>
          </div>
        </div>
      </div>

    </div>
    <selete-date :showPat="showPat" :patList="dateList" @activate="activate"></selete-date>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../business/app-header.vue'
  import upload from '../../business/upload.vue'
  import seleteDate from '../../business/seleteDate.vue'
  import api from '../../lib/api'
  import BScroll from 'better-scroll'
//  var token = localStorage.getItem('token')
  export default{
    components: {
      top,
      upload,
      seleteDate
    },
    data(){
      return {
        token:localStorage.getItem('token'),
        patMsg:{},
        showContain:true,
        list:[],
        showArea:false,
        visitingDate:'',
        description:'',
        code:'',
        imgList:[],
        headerImg:'',
        userList:[],
        compatId:'',
        showPat:false,
        dateList:[],
        injuryDetail:{}
      }
    },
    mounted(){
      this.initScroll();
      this.getUsers();
      this.getImg()
    },
    watch:{
      userList(){
        console.log(121212)
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.initScroll()
          },50)
        })
      },
      imgList(){
        console.log(898989)
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
      },
      activate(value){
        console.log(value,555555);
        this.$set(this.$data,'injuryDetail',value)
        this.$set(this.$data,'showPat',false)
      },
      toggleUser(){
        var arr = [];
        for(var i=0;i<this.userList.length;i++){
          var userObj = {};
          userObj.label = this.userList[i].commpatName;
          userObj.value = this.userList[i].id;
          arr.push(userObj);
        };
        arr.push({
          label:'添加就诊人',
          value:0
        });
        var $this = this;
        this.$weui.picker(arr,{
          onConfirm: function (result) {
            console.log(result,99999);
            if(result[0].value==0){
              $this.$router.push({
                name:'addUser'
              })
            }else {
              function getObj(item) {
                return item.id==result[0].value
              }
              $this.userList.filter(getObj);
              $this.$set($this.$data,'patMsg', $this.userList.filter(getObj)[0])
            }
          },
        });
      },
      getUsers(){
        api('smarthos.user.commpat.list',{
          token:this.token
        }).then(res=>{
          console.log(res,55555)
          if(res.succ){
            this.$set(this.$data,'userList',res.list)
            this.$set(this.$data,'patMsg',res.list[0])
          }else {
            this.$weui.alert(res.msg)
          }
        })
      },
      getImg(){
        api('smarthos.appointment.fundus.img',{}).then(res=>{
          if(res.succ){
            this.$set(this.$data,'headerImg',res.obj)
          }else {
            this.$weui.alert(res,msg)
          }
        })
      },
      getAttaIdsList(value){
        console.log(value,3333);
        this.$set(this.$data,'imgList',value)
      },
      orderDetail(){
        api('smarthos.appointment.fundus.add',{
          "visitingTime":this.injuryDetail.visitingTime,
          "visitingAmpm":this.injuryDetail.visitingAmpm=='上午'?'am':'pm',
          "compatId":this.patMsg.id,
          "attaIdsList":this.imgList,
          "description":this.description,
          "token":this.token
        }).then(res=>{
          console.log(res,44444444);
          if(res.succ){
            this.$weui.alert('预约成功');
            this.$router.push({
              name:'eyeInjuryDetail'
            })
          }else {
            this.$weui.alert(res.msg)
          }
        })

      },
      visitingTime(){
        this.$set(this.$data,'visitingDate','')
        api('smarthos.appointment.fundus.scheme.list',{}).then(res=>{
          console.log(res,88888)
          if(res.succ){
            this.$set(this.$data,'dateList',res.list)
            console.log(this.showPat,9999999999999)
            this.$set(this.$data,'showPat',true)
          }else {
            this.$weui.alert(res.msg)
          }
        })



      }
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../common/public.scss';
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_33qiq29sp5y7gb9.woff') format('woff'),
  }
  span{
    font-family: 'iconfont';
    font-size: 18px;
  }
  .headers{
    height: 45px;
    line-height: 45px;
    background: white;
    text-align: center;
  }
  .middle{
    height: 45px;
    line-height: 45px;
  }
  .left{
    position: absolute;
    top:0px;
    left: 10px;
    height: 45px;
    line-height: 45px;
    z-index: 911;
  }
  .page{
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
  .wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top:88rem/$rem;
    bottom:0;
    overflow: auto;
    width: 100%;
  }
  .area{
    position: fixed;
    z-index: 20;
    width: 100%;
    height: 100%;
    background: white;
    flex: 1;
    overflow: auto;
  }
  .step {
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
  .banner{
    width: 100%;
    height: 200rem/$rem;
  img{
    width: 100%;
    height: 200rem/$rem;
  }
  }
  .contain{
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .wrap{
    flex: 1;
    padding: 30rem/$rem;
    background: white;
    /*overflow: auto;*/
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
    width: 140rem/$rem;
    height: 140rem/$rem;
  }

  }
  .hint{
    padding-left: 30rem/$rem;
    box-sizing: border-box;
  }
</style>
