<template>
  <div class="success">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="successContent" ref="success">
      <div>
        <div class="reasonWrap">
          <div class="refuseReason">
            <div class="wrapImg">
              <img src="../../../static/img/聊天界面-添加.png" alt="">
            </div>
            <div class="wrapWord">
              <div>
                <span>加号已拒绝</span>
                <span>拒绝理由:{{ refuseReason }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="doctorInfoTitle">医生信息</p>
        <div class="doctorInfo">
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div class="introTitle">
                  <span class="subTitle">王小仙</span>
                  <span class="myDoctor">主任医生</span>
                  <p>浙江大学附属第二人民医院</p>
                  <p>急诊外科 副主任医生</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p class="patientInfoTitle">就诊人信息 <span>切换就诊人></span> </p>
        <div class="patientInfo">
          <div class="leftTitle">
            <span>姓&nbsp;&nbsp;名:</span>
            <span>身份证号:</span>
            <span>电话号码:</span>
            <span>年&nbsp;&nbsp;龄:</span>
            <span>性&nbsp;&nbsp;别:</span>
          </div>
          <div class="rightMatch">
            <span>王小李</span>
            <span>6583265742960754-053476</span>
            <span>3416536423857</span>
            <span>28</span>
            <span>男</span>
          </div>
        </div>
        <p class="repeatTitle">复诊需求描述</p>
        <div class="repeat">
          <textarea placeholder="请务必填写您的病史、主诉、症状、指标、治疗经过,相关的检查报告请拍照上传"></textarea>
        </div>
        <div class="upload">
          <div class="addPicture">
            <img src="../../../static/img/添加图片.png" alt="">
          </div>
          <div class="wordFor">
            <span>添加图片</span>
            <span>请上传患处图片,让医生更了解您的病情</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  export default{
    data(){
      return{
        title:'我的加号',
        rightTitle:'',
        refuseReason:""
      }
    },
    created(){
        let that = this
      api("smarthos.system.dictionary.list",{
        dicName:"加号拒绝理由"
      }).then((data)=>{
          that.refuseReason = data.list[1].dicValue
      })
      api("smarthos.appointment.refused.modify",{
          id:"595eff4ad2a45e3faa575a2a",
          refuseReason:"that.refuseReason",
          token:"18297912203"
      }).then((data)=>{
            console.log(data)
      })
    },
    mounted(){
      this._initSuccessScroll()
    },
    methods:{
      _initSuccessScroll(){
        this.success = new BScroll(this.$refs.success,{
          click:true
        })
      }
    },
    components:{
      'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .successContent{
    width:100%;
    position: fixed;
    top: 50px;
    bottom:0;
    left:0;
    right:0;
    z-index:10;
    overflow: hidden;
    background-color: white;
    .doctorInfoTitle,.patientInfoTitle,.repeatTitle{
      width: 690rem/$rem;
      margin: 30rem/$rem auto;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 14px;
        color: #0FBDFF;
      }
    }
    .reasonWrap{
      display: flex;
      align-items:center;
      .refuseReason{
        width:100%;
        height: 50px;
        display: flex;
        background-color: rgb(238,238,238);
        .wrapImg{
          height: 50px;
          width: 70px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 15px;
          img{
            width: 30px;
            height: 30px;
          }
        }
        .wrapWord{
          height: 50px;
          display: flex;
          align-items: center;
          span{
            display: block;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
    .doctorInfo{
      ul{
        padding:0;
        margin:0 auto;
        width: 690rem/$rem;
        height: 204rem/$rem;
        border-radius: 12px;
        background-color: rgb(245,251,251);
        li{
          list-style-type: none;
          height: 204rem/$rem;
          display: flex;
          .cancelImg{
            width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            /*padding-left: 15px;*/
          }
          .cancelIntro{
            flex:2;
            display: flex;
            align-items: center;
            /*line-height: 10px;*/
            .introTitle{
              .subTitle{
                font-size: 16px;
                color: #333333;
              }
              .myDoctor{
                width: 120rem/$rem;
                height: 36rem/$rem;
                display: inline-block;
                font-size: 28rem/$rem;
                /*line-height: 18px;*/
                color: #666666;
                text-align: center;
              }
              p{
                margin:0;
                font-size: 14px;
                color: #999999;
              }
            }


            span{

            }
          }
          img{
            width: 40px;
            height: 40px;

          }
        }
      }
    }
    .patientInfo{
      width: 690rem/$rem;
      border-radius: 10px;
      margin:0 auto;
      background-color: rgb(245,251,251);
      display: flex;
      .leftTitle{
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          font-size: 14px;
          color: #999999;
        }
      }
      .rightMatch{
        display: flex;
        flex-direction: column;
        span{
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .repeat{
      width: 690rem/$rem;
      height: 230rem/$rem;
      border-radius: 10px;
      margin:0 auto;
      background-color: rgb(245,251,251);
      textarea{
        width: 690rem/$rem;
        border:none;
        resize: none;
        outline: medium;
        font-size: 16px;
        color: #cccccc;
        background-color: rgb(245,251,251);
      }
    }
    .upload{
      width: 690rem/$rem;
      height: 230rem/$rem;
      border-radius: 10px;
      margin: 15px auto;
      display: flex;
      .addPicture{
        margin-right: 10px;
        img{
          width: 140rem/$rem;
          height:140rem/$rem;
        }
      }
      .wordFor{
        span:first-child{
          font-size: 16px;
          color: #333333;
          display: block;
        }
        span:last-child{
          font-size: 14px;
          display: block;
          margin-top: 14.5px;
          color: #999999;
        }
      }
    }
  }
</style>
