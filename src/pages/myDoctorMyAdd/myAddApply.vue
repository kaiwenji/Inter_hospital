<template>
  <div class="success">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="successContent" ref="success">
      <div>
        <div class="reasonWrap" :class="applyDetail.numStatus">
          <div class="refuseReason">
            <div class="wrapImg" v-if="applyDetail.numStatus == 'APPLYING'">
              <img src="../../../static/img/applying.png" alt="">
            </div>
            <div class="wrapImg" v-if="applyDetail.numStatus == 'REFUSED'">
              <img src="../../../static/img/addRefuse.png" alt="">
            </div>
            <div class="wrapImg" v-if="applyDetail.numStatus == 'AGREED'">
              <img src="../../../static/img/addSuccess.png" alt="">
            </div>
            <div class="wrapWord">
              <div>
                <span v-if="applyDetail.numStatus == 'APPLYING'">申请中</span>
                <span v-if="applyDetail.numStatus == 'REFUSED'">加号已拒绝</span>
                <span v-if="applyDetail.numStatus == 'AGREED'">加号已成功</span>
                <span>{{ applyDetail.resultDescription }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="remark" v-if="applyDetail.numStatus == 'AGREED'">备注</p>
        <div class="repeat" v-if="applyDetail.numStatus == 'AGREED'">
          <textarea></textarea>
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
                  <span class="subTitle">{{ applyDetail.docName }}</span>
                  <span class="myDoctor">我的医生</span>
                  <p>{{ applyDetail.hosName }}</p>
                  <p>{{ applyDetail.deptName }} {{ applyDetail.docTitle }}</p>
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
            <span>{{ applyDetail.compatName }}</span>
            <span>{{ applyDetail.compatIdcard }}</span>
            <span>{{ applyDetail.compatMobile }}</span>
            <span>{{ applyDetail.compatAge }}</span>
            <span  v-if="applyDetail.compatGender == 'M'">男</span>
            <span  v-else>女</span>
          </div>
        </div>
        <p class="repeatTitle">复诊需求描述</p>
        <div class="repeat">
          {{ applyDetail.description }}
        </div>
        <div class="upload">
          <div class="addPicture" v-for="item in applyDetail.attaList">
            <img :src="item.attaFileUrl" alt="">
          </div>
          <!--<div class="wordFor">-->
            <!--<span>添加图片</span>-->
            <!--<span>请上传患处图片,让医生更了解您的病情</span>-->
          <!--</div>-->
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return{
        title:'我的加号',
        rightTitle:'',
        applyDetail:{}
      }
    },
    computed:{
      ...mapGetters([
          "applyId"
      ])
    },
    created(){
      let that = this
      console.log(that.applyId)
      api("smarthos.appointment.detail",{
        token:"18268256860",
        id:that.applyId
      }).then((data)=>{
          that.applyDetail = data.obj
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
        console.log(this.success)
      }
    },
    components:{
      'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .success{
    width:100%;
    height:100%;
    top:0;
    bottom:0;
    z-index:100;
    position: fixed;
  }
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
    .remark,.doctorInfoTitle,.patientInfoTitle,.repeatTitle{
      width: 690rem/$rem;
      margin: 30rem/$rem auto;
      font-size: 32rem/$rem;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 28rem/$rem;
        color: #0FBDFF;
      }
    }
    .APPLYING{
      display: flex;
      align-items:center;
      .refuseReason{
        width:100%;
        height: 50px;
        display: flex;
        background-color: rgb(238,250,254);
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
            color: #0AACE9;
          }
        }
      }
    }
    .REFUSED{
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
    .AGREED{
      display: flex;
      align-items:center;
      .refuseReason{
        width:100%;
        height: 50px;
        display: flex;
        background-color: rgb(238,250,254);
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
            color: #4BCEC8;
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
        border-radius: 10px;
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
                font-size: 28rem/$rem;
                color: #999999;
              }
            }


            span{

            }
          }
          img{
            width: 80rem/$rem;
            height: 80rem/$rem;

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
          font-size: 28rem/$rem;
          color: #999999;
        }
      }
      .rightMatch{
        display: flex;
        flex-direction: column;
        span{
          font-size: 28rem/$rem;
          color: #333333;
        }
      }
    }
    .repeat{
      width: 690rem/$rem;
      height: 230rem/$rem;
      border-radius: 10px;
      margin:0 auto;
      font-size: 32rem/$rem;
      color: #cccccc;
      background-color: rgb(245,251,251);
      textarea{
        width: 690rem/$rem;
        border:none;
        resize: none;
        outline: medium;
        background-color: rgb(245,251,251);
      }
    }
    .upload{
      width: 690rem/$rem;
      height: 230rem/$rem;
      border-radius: 10px;
      margin: 30rem/$rem auto;
      display: flex;
      .addPicture{
        margin-right: 10px;
        img{
          width: 140rem/$rem;
          height: 140rem/$rem;
        }
      }
      .wordFor{
        span:first-child{
          font-size: 32rem/$rem;
          color: #333333;
          display: block;
        }
        span:last-child{
          font-size: 28rem/$rem;
          display: block;
          margin-top: 14.5px;
          color: #999999;
        }
      }
    }
  }
</style>
