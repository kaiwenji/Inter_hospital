<template>
  <div class="apply">
    <v-header :title="title" :rightTitle="rightTitle" @on-apply="applying()"></v-header>
    <div class="applyContent" ref="apply">
      <div>
        <div class="reasonWrap">
          <div class="refuseReason">
            <div class="wrapWord">
              <div>
                <span>温馨提示：请确保您曾经在该医生处就诊过，否则您的申请不会通过</span>
              </div>
            </div>
          </div>
        </div>
        <p class="doctorInfoTitle">医生信息</p>
        <div class="doctorInfo">
          <router-link tag="div" :to="{name:'doctor',params:{id:id}}">
            <ul>
              <li>
                <div class="cancelImg">
                  <img :src="docAvatar" alt="">
                </div>
                <div class="cancelIntro">
                  <div class="introTitle">
                    <span class="subTitle">{{ docName }}</span>
                    <span class="myDoctor">我的医生</span>
                    <p>{{ hosName }}</p>
                    <p>{{ deptName }} {{ docTitle }}</p>
                  </div>
                  <div class="applyGoMore">
                    <span> <img src="../../../static/img/查看更多.png" alt=""> </span>
                  </div>
                </div>
              </li>
            </ul>
          </router-link>
        </div>
        <p class="patientInfoTitle">就诊人信息 <span @click="changePatient()">切换就诊人></span> </p>
        <div class="patientInfo">
          <div class="leftTitle">
            <span>姓&nbsp;&nbsp;名:</span>
            <span>身份证号:</span>
            <span>电话号码:</span>
            <span>年&nbsp;&nbsp;龄:</span>
            <span>性&nbsp;&nbsp;别:</span>
          </div>
          <div class="rightMatch" v-if="chosedIndex == 0">
            <span>{{ compatInfo.commpatName }}</span>
            <span>{{ compatInfo.commpatIdcard }}</span>
            <span>{{ compatInfo.commpatMobile }}</span>
            <span>{{ useage }}</span>
            <span v-if="compatInfo.commpatGender == 'M'">男</span>
            <span v-else>女</span>
          </div>
          <div class="rightMatch" v-else>
            <span>{{ patList[chosedIndex].commpatName }}</span>
            <span>{{ patList[chosedIndex].commpatIdcard }}</span>
            <span>{{ patList[chosedIndex].commpatMobile }}</span>
            <span>{{ useage }}</span>
            <span v-if="patList[chosedIndex].commpatGender == 'M'">男</span>
            <span v-else>女</span>
          </div>
        </div>
        <p class="applyRepeatTitle">复诊需求描述</p>
        <div class="applyRepeat">
          <textarea placeholder="请务必填写您的病史、主诉、症状、指标、治疗经过,相关的检查报告请拍照上传" v-model="description"></textarea>
        </div>
        <div class="upload">
          <div class="addPicture" v-for="(singleImage,index) in previewImg" v-if="previewImg.length != 0">
            <!--<span class="deleteImg">X</span>-->
            <img :src="singleImage" alt="" ref="replaceImg" @click="makeLarge(index)">
          </div>
          <div class="addPicture">
            <input type="file" name="upload" id="upload" ref="upload" @change="onFileChange">
            <img src="../../../static/img/添加图片.png" alt=""  @click="selectImg()">
          </div>
          <div class="wordFor" v-show="imageUrl.length == 0" >
            <span>添加图片</span>
            <span>请上传患处图片,让医生更了解您的病情</span>
          </div>
        </div>
      </div>
      <div class="loading-container" v-if="showDialog">
        <pop-up></pop-up>
      </div>
      <v-mask  :showList="showDialog"></v-mask>
      <div class="centerDisplay" transition="fade" v-if="largePreview">
        <button class='imgDelete' @touchend.prevent="deleteImg()">删除</button>
        <button class='leftClose' @touchend.prevent="closeDelete()">关闭</button>
        <div class="slider-wrapper" ref="sliderWrapper">
          <slider ref="slider" :popImg="largePreview" :index="goindex" :previewImg="previewImg">
            <div  v-for="singleImage in previewImg"  @click="makeSmall">
              <img :src="singleImage" alt="">
            </div>

          </slider>
        </div>
      </div>
      <div class="alertArea" v-if="showAlert">
         <div>
           <alert :alertTitle="alertTitle" :alertMsg="alertMsg" @on-set="closeAlert"></alert>
         </div>
      </div>
      <toggle-patient :patList="patList" :showPat="showPat" @activate="check" @toggleClosed="closePatient()"></toggle-patient>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import PopUp from '../../base/popup/popup'
  import VMask from '../../base/mask'
  import Slider from '../../base/slider'
  import Alert from '../../base/alert'
  import TogglePatient from '../../base/togglePatient'
  import {mapGetters,mapMutations} from 'vuex'
  export default{
    data(){
      return{
        title:'复诊加号',
        rightTitle:'申请加号',
        docAvatar:"",
        docName:"",
        hosName:'',
        deptName:"",
        docTitle:"",
        image:"",
        previewImg:[],
        imageUrl:[],
        imagesString:"",
        fileName:[],
        fileNameString:"",
        attaId:[],
        id:"",
        description:"",
        showDialog:false,
        compatInfo:"",
        useage:"",
        largePreview:false,
        goindex:"",
        showAlert:"",
        alertTitle:"温馨提示",
        alertMsg:"图片最多可以上传九张哦",
        showPat:false,
        patList:[],
        chosedIndex:0,

      }
    },
    mounted(){
      this._initApplyScroll()
//      console.log(this.imageUrl)
    },
    created(){
        this.compatInfo = JSON.parse(localStorage.getItem("commpat"))
        var date = new Date()
        var year = date.getFullYear()
        var birthdayYear = parseInt(this.compatInfo.commpatIdcard.substr(6,4))
        this.useage = year - birthdayYear
        this.id = this.$route.query.doctorId
        this.docAvatar = this.$route.query.docAvatar
        this.docName = this.$route.query.docName
        this.hosName = this.$route.query.hosName
        this.deptName = this.$route.query.deptName
        this.docTitle = this.$route.query.docTitle
        let that =this
        api("smarthos.user.commpat.list",{
          token:localStorage.getItem("token")
        }).then((data)=>{
            console.log(data.list)
            that.patList = data.list
           console.log(that.patList)
        })
    },
    computed:{
      ...mapGetters([
        "currentPageIndex"
      ]),

    },
    methods:{
      ...mapMutations([
        'SET_CURRENT_PAGE_INDEX'
      ]),
      makeLarge(index){
          this.largePreview = true
          this.goindex = index
      },
      makeSmall(){
        this.largePreview = false
      },
      deleteImg(){
        if(this.currentPageIndex == this.previewImg.length-1 && this.previewImg.length >1){
          this.previewImg.splice(this.currentPageIndex,1)
          this.attaId.splice(this.currentPageIndex,1)
          this.currentPageIndex = this.currentPageIndex -1
          this.SET_CURRENT_PAGE_INDEX(this.previewImg.length-1)
        }else if(this.currentPageIndex < this.previewImg.length-1 && this.previewImg.length >1){
          this.previewImg.splice(this.currentPageIndex,1)
          this.attaId.splice(this.currentPageIndex,1)
        }else if(this.currentPageIndex < this.previewImg.length && this.previewImg.length == 1){
          this.previewImg.splice(this.currentPageIndex,1)
          this.attaId.splice(this.currentPageIndex,1)
           this.largePreview = false
        }
      },
      closeDelete(){
        this.largePreview = false
      },
//      ...mapMutations([
//         'SET_APPLY_ID'
//      ]),
      _initApplyScroll(){
        this.apply = new BScroll(this.$refs.apply,{
          click:true
        })
      },
      closeAlert(){
        this.showAlert = false
      },
      selectImg(e){
           if(this.previewImg.length < 9){
             this.$refs.upload.click()
           }else{
               this.showAlert = true
//               console.log(this.showAlert)
//               alert("最多上传九张照片")
           }


      },
      check(item){
        this.showPat=false;
        this.chosedIndex=item;
      },
      onFileChange(e){
          var file = e.target.files[0]
          this.createImage(file)
      },
      createImage(file){
          if(typeof FileReader === "undefined"){
              alert("您的浏览器不支持图片上传，请升级您的浏览器")
              return false
          }
          let that = this
          let fileName = file.name
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function(){
//            console.log(that.$refs.replaceImg)
            that.previewImg.push(this.result)
//            that.$refs.replaceImg.src = this.result
//            console.log(fileName)
//            console.log(that.image)
            api("smarthos.system.file.upload.image.base64",{
              module:"PAT",
              fileType:"IMAGE",
              fileName:fileName,
              base64:this.result
            }).then((data)=>{
//              console.log(data)
//              console.log(data.obj.attaFileUrl)
              that.imageUrl.push(data.obj.attaFileUrl)
//              console.log(that.imageUrl)
              that.attaId.push(data.obj.id)
//              console.log(that.imageUrl)
            })
          }
//          var length = file.length
//          for(var i=0;i<length;i++){
//              that.fileName.push(file[i].name)
//              var reader = new FileReader()
//              reader.readAsDataURL(file[i])
//              reader.onload = function(){
//                that.images.push(this.result)
////                console.log(that.images.join(","))
//                that.imagesString = that.images.join(",")
//                that.fileNameString = that.fileName.join(",")
//
//              }
//          }
//         console.log(this.images)
//         this.images.join(",")
//         console.log(that.imagesString )

      },
      applying(){
//          console.log(this.applyId)
         if(this.description === ''){
           this.$weui.alert("请在下方填写您的复诊需求")
              return
         }else{
           let that = this
//          console.log(that.id)
           if(that.chosedIndex == 0){
             api("smarthos.appiontment.add",{
               patId: that.compatInfo.patId,
               docId:that.id,
               compatId:that.compatInfo.id,
               description:that.description,
               attaList:that.attaId,
               token:localStorage.getItem("token")
             }).then((data)=>{
//               console.log(data.obj.id)
               if(data.code == 0){
//              that.applyId = data.obj.id
//               that.SET_APPLY_ID(data.obj.id)
                 localStorage.setItem("applyId",data.obj.id)
                 that.showDialog = true
                 setTimeout(()=>{
                   that.showDialog = false
                   that.$router.push("/myAddList/myAddApply")
                 },1000)
               }

             })
           }else{
             api("smarthos.appiontment.add",{
               patId: that.patList[that.chosedIndex].patId,
               docId:that.id,
               compatId:that.patList[that.chosedIndex].id,
               description:that.description,
               attaList:that.attaId,
               token:localStorage.getItem("token")
             }).then((data)=>{
//               console.log(data.obj.id)
               if(data.code == 0){
//              that.applyId = data.obj.id
//               that.SET_APPLY_ID(data.obj.id)
                 localStorage.setItem("applyId",data.obj.id)
                 that.showDialog = true
                 setTimeout(()=>{
                   that.showDialog = false
                   that.$router.push("/myAddList/myAddApply")
                 },1000)
               }

             })
           }

         }

      },
      changePatient(){
        this.showPat=true;
      },
      closePatient(){
        this.showPat=false;
      }
    },
    components:{
      'VHeader':header,
       PopUp,
       VMask,
       Slider,
       Alert,
       TogglePatient
    },
    watch:{

    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .apply{
    width:100%;
    height: 100%;
    position: fixed;
    top:0;
    bottom:0;
  }
  .applyContent{
    width:100%;
    position: fixed;
    top: 50px;
    bottom:0;
    left:0;
    right:0;
    overflow: hidden;
    background-color: white;
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
      button.imgDelete{
        background-color:white;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 70px;
        right:10%;
        border:none;
        outline: medium;
        border-radius: 10px;
        /*opacity: 0.5;*/
        color: #0FBDFF!important;
      }
      button.leftClose{
        background-color:white;
        width: 50px;
        height: 50px;
        position: absolute;
        top: 70px;
        left:10%;
        border:none;
        outline: medium;
        border-radius: 10px;
        /*opacity: 0.5;*/
        color: #0FBDFF!important;
      }
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
    .alertArea{
      width:100%;
      height:100%;
      position: fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      display: flex;
      justify-content: center;
      align-items: center;
      /*background-color: #3CC51F;*/
    }
    .doctorInfoTitle,.patientInfoTitle,.applyRepeatTitle{
      width: 690rem/$rem;
      margin: 30rem/$rem auto;
      font-size: 32rem/$rem;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 28rem/$rem;
        display: inline-block;
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
        background-color: rgb(238,250,254);
        .wrapWord{
          height: 50px;
          width: 690rem/$rem;
          margin:0 auto;
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
            justify-content: space-between;
            align-items: center;
            /*line-height: 10px;*/
            .applyGoMore{
              margin-right: 25rem/$rem;
              span{
                img{
                  width:16rem/$rem;
                  height:24rem/$rem;
                }
              }
            }
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
            width: 120rem/$rem;
            height: 120rem/$rem;

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
    .applyRepeat{
      width: 690rem/$rem;
      height: 230rem/$rem;
      border-radius: 10px;
      margin:0 auto;
      background-color: rgb(245,251,251);
      textarea{
        width: 690rem/$rem;
        height:230rem/$rem;
        border:none;
        resize: none;
        outline: medium;
        font-size: 32rem/$rem;
        color: #cccccc;
        background-color: rgb(245,251,251);
      }
    }
    .upload{
      width: 690rem/$rem;
      height: 460rem/$rem;
      border-radius: 10px;
      word-break: break-all;
      position: relative;
      margin: 30rem/$rem auto;
      /*display: flex;*/
      .addPicture{
        float: left;
        margin-right: 16.2px;
        .deleteImg{
          position: absolute;
          top:0;
          left:0;
          background-color: #E64340;
        }
        >input{
          display: none;
        }
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
    .loading-container{
      position: absolute;
      /*background-color: #E64340;*/
      width:100%;
      top:50%;
      z-index:100;
      transform: translateY(-50%)
    }
  }
</style>
