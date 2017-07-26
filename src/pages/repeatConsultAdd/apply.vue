<template>
  <div class="apply">
    <v-header :title="title" :rightTitle="rightTitle" @on-apply="applying()"></v-header>
    <scroll class="applyContent" ref="success">
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
          <textarea placeholder="请务必填写您的病史、主诉、症状、指标、治疗经过,相关的检查报告请拍照上传" v-model="description"></textarea>
        </div>
        <div class="upload">
          <div class="addPicture" v-for="image in imageUrl" v-show="imageUrl.length != 0">
            <img :src="image" alt="" ref="replaceImg">
          </div>
          <div class="addPicture">
            <input type="file" name="upload" id="upload" ref="upload" @change="onFileChange">
            <img src="../../../static/img/添加图片.png" alt="" @click="selectImg()">
          </div>
          <div class="wordFor" v-show="imageUrl.length == 0">
            <span>添加图片</span>
            <span>请上传患处图片,让医生更了解您的病情</span>
          </div>
        </div>
      </div>
      <div class="loading-container" v-if="showDialog">
        <pop-up></pop-up>
      </div>
      <v-mask  :showList="showDialog"></v-mask>
    </scroll>
  </div>
</template>
<script>
  import header from '../../base/header'
  import Scroll from "../../base/scroll"
  import api from '../../lib/api'
  import PopUp from '../../base/popup/popup'
  import VMask from '../../base/mask'
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
        imageUrl:[],
        imagesString:"",
        fileName:[],
        fileNameString:"",
        attaId:[],
        id:"",
        description:"",
        showDialog:false
      }
    },
    mounted(){
//      this._initSuccessScroll()
//      console.log(this.imageUrl)
    },
    created(){
        this.id = this.$route.query.doctorId
        this.docAvatar = this.$route.query.docAvatar
        this.docName = this.$route.query.docName
        this.hosName = this.$route.query.hosName
        this.deptName = this.$route.query.deptName
        this.docTitle = this.$route.query.docTitle
    },
    computed:{
      ...mapGetters([
          "applyId"
      ])
    },
    methods:{
//      _initSuccessScroll(){
//        this.success = new BScroll(this.$refs.success,{
//          click:true
//        })
//        console.log(this.success)
//      }

      ...mapMutations([
         'SET_APPLY_ID'
      ]),
      selectImg(e){
          this.$refs.upload.click()
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
            that.image = this.result
//            console.log(fileName)
//            console.log(that.image)
            api("smarthos.system.file.upload.image.base64",{
              module:"CONSULT",
              fileType:"IMAGE",
              fileName:fileName,
              base64:this.result
            }).then((data)=>{
//              console.log(data)
              that.imageUrl.push(data.obj.attaFileUrl)
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
          console.log(this.applyId)
           let that = this
//          console.log(that.id)
          api("smarthos.appiontment.add",{
            patId:"595c77bad2a4661d4f953878",
            docId:that.id,
            compatId:"595c901dd2a4cf2c6f685b40",
            description:that.description,
            attaList:that.attaId,
            token:"18268256860"
          }).then((data)=>{
//               console.log(data.obj.id)
            if(data.code == 0){
//              that.applyId = data.obj.id
              that.SET_APPLY_ID(data.obj.id)
              that.showDialog = true
              setTimeout(()=>{
                that.showDialog = false
                that.$router.push("/myAddList/myAddApply")
              },1000)
            }

          })
      }
    },
    components:{
      'VHeader':header,
       Scroll,
       PopUp,
       VMask
    },
    watch:{
//       "$route":this.$refs.success.refresh()
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
    .doctorInfoTitle,.patientInfoTitle,.repeatTitle{
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
        font-size: 32rem/$rem;
        color: #cccccc;
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
