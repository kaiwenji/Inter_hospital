<template>
  <div class="success">
    <v-header :title="title" :rightTitle="rightTitle" @go-index="goIndex"></v-header>
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
                <span v-else-if="applyDetail.numStatus == 'REFUSED'">加号已拒绝</span>
                <span v-else>加号已成功</span>
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
        <p class="patientInfoTitle">就诊人信息</p>
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
          <div class="addPicture" v-for="(item,index) in applyDetail.attaList" ref="addPicture">
            <img :src="item.attaFileUrl" alt="" @click="enlarge(index)">
          </div>
          <!--<div class="wordFor">-->
          <!--<span>添加图片</span>-->
          <!--<span>请上传患处图片,让医生更了解您的病情</span>-->
          <!--</div>-->
        </div>
      </div>

    </div>
    <div class="centerDisplay" transition="fade" v-if="popImg" @click="enSmall">
      <div class="slider-wrapper" ref="sliderWrapper">
        <slider ref="slider" :popImg="popImg" :index="goindex">
          <div class="largePicture" v-for="(item,index) in applyDetail.attaList"  @click="enSmall">
            <img :src="item.attaFileUrl" alt="" @click="closeOnImg(index)">
          </div>

        </slider>
      </div>

    </div>

  </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import Scroll from '../../base/scroll'
  import api from '../../lib/api'
  import {mapGetters,mapMutations} from 'vuex'
  import slider from '../../base/slider'
  export default{
    data(){
      return{
        title:'我的加号',
        rightTitle:'',
        applyDetail:{},
        popImg:false,
        goindex:"",
        applyId:"",
        id:""
      }
    },
    computed:{
      ...mapGetters([
        "currentPageIndex"
      ])
    },
    mounted(){
//      console.log(this.$refs.addPicture.children.length)
//       this.$nextTick(()=>{
//           setTimeout(()=>{
//             if(this.applyDetail != ''){
//                 for(var i=0;i<this.$refs.addPicture.length;i++){
//                     this.$refs.addPicture[i].click(()=>{
//                         this.popImg = true
//                         this.pageIndex = i
//                     })
//
//                 }
//               console.log(this.applyDetail)
//               console.log(this.$refs.addPicture.length)
//
//             }
//
//           },1000)
//       })
    },
    created(){
      this.id = this.$route.query.id
      console.log(this.id)
      let that = this
      api("smarthos.appointment.detail",{
        token:localStorage.getItem("token"),
        id:that.id
      }).then((data)=>{
//          console.log(data)
        that.applyDetail = data.obj
        console.log(that.applyDetail)
      })
    },
//    mounted(){
////       setTimeout(()=>{
////         this.$nextTick(()=>{
////           this._initSuccessScroll()
////         })
////       },20000)
//
//    },
    methods:{
      ...mapMutations([
        'SET_CURRENT_PAGE_INDEX'
      ]),
      _initSuccessScroll(){
        this.success = new BScroll(this.$refs.success,{
          click:true
        })
//        console.log(this.success)
      },
      enlarge(index){


        this.popImg = true
//             console.log(this.popImg)
//             this.pageIndex = index
        this.goindex = index
        this.SET_CURRENT_PAGE_INDEX(index)
//        this.$refs.slider.gotoPage()
//        this.$nextTick(()=>{
//          this.$refs.slider.gotoPage()
//        })

      },
      enSmall(){
        this.popImg = false
      },
      closeOnImg(){
        this.popImg = false
      },
      goIndex(){
        this.$router.push({
          name:"patientIndex"
        })
      }
    },
    components:{
      'VHeader':header,
      slider
    },
    watch:{
      applyDetail(){
        setTimeout(()=>{
          this._initSuccessScroll()
        },20)
      }
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
    left:0;
    right:0;
    z-index:100;

    /*word-break: break-all;*/
    position: fixed;
    .centerDisplay{
      width:100%;
      height:100%;
      position: fixed;
      display: flex;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index:90;
      background-color: rgba(0,0,0,.3);
      justify-content: center;
      align-items: center;
    }
    .fade-transition{
      transition: all 0.5s;
      opacity: 1;
      background: rgba(7, 17, 27, 0.6);
    }
    .fade-enter,.fade-leave{
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    .slider-wrapper{
      position: relative;
      width:100%;
      top:0;
      z-index:100;

      /*background-color: #E64340;*/
      overflow: hidden;
    }
    /*.largePicture{*/
    /*!*overflow: hidden;*!*/
    /*width:100%;*/
    /*display: inline-block;*/
    /*!*display: flex;*!*/
    /*!*justify-content: center;*!*/
    /*!*align-items: center;*!*/
    /*img{*/
    /*width: 100%;*/
    /*!*height: 500px;*!*/
    /*border:1px solid red;*/
    /*display: inline-block;*/
    /*}*/
    /*}*/
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
      word-break: break-all;
      /*white-space: pre-wrap;*/
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
      height: 460rem/$rem;
      border-radius: 10px;
      /*word-break: break-all;*/
      word-wrap: break-word;
      margin: 30rem/$rem auto;
      /*display: flex;*/
      .addPicture{
        display: inline-block;
        width: 140rem/$rem;
        height: 140rem/$rem;
        margin-right: 16.2px;
        img{
          display: inline-block;
          word-wrap: break-word;
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
