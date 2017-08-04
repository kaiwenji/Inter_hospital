<template>
    <div class="chat">
      <v-header :title="docName" :rightTitle="rightTitle"></v-header>
      <scroll :class="seeMore ? 'conversationUp':'conversation'" @make-blur="inputHide()" ref="list"  :data="chatText" :data1="seeMore" @scroll = "scroll" :listen-scroll="listenScroll" :probe-type="probeType">
          <section class="conversationList" ref="slideList" >
            <div class="loadTip" v-if="loadingStatus">
                <span class="pullMore">
                   <img src="../../../static/img/loading.gif" alt="">
                   加载中...
                </span>
            </div>
            <ul>
              <li v-for="(item,index) in chatText" ref="chatLi">
                <div :class="{timeLog:chatTime[index] != ''}" ref="myLog" v-if="chatTime[index] != ''">{{chatTime[index]}}</div>
                <div class="other" :class="{mysay:item.msgSenderType == 'PAT'}">
                  <img :src="patAvatar" alt="" v-if="item.msgSenderType == 'PAT'">
                  <img :src="docAvatar" alt="" v-else>
                  <div class="whatsay">
                    <div class="whatsay_svg">
                      <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="item.msgSenderType == 'PAT'? '#trigon-right':'#trigon-left'"></use>
                      </svg>
                    </div>
                    <div class="whatsay_text" v-if="item.msgType == 'TEXT'">
                      {{item.msgContent}}
                    </div>
                    <div class="whatsay_text" v-else>
                      <img :src="item.msgContent" alt="">
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
      </scroll>
      <footer :class="{footshow:seeMore}" ref="footer">
        <section class="foot_top">
          <div class="chatInput" @touchstart.prevent="forceFocused()">
            <input type="text" @focus="focused" @blur="blured" maxlength="100" @input="whatInput" v-model="inputInfo"  :class="{greenBorder:light}" @keyup.enter="enterThing" ref="inputFocus">
          </div>
          <div class="chatSend">
            <div class="send" @touchstart.prevent="send()" v-if="light">
              <span>发送</span>
            </div>
            <div v-else @click="upMore" class="addmore">
               <img src="../../../static/img/聊天界面-添加.png" alt="">
            </div>
          </div>
        </section>
        <section class="foot_bottom">
            <!--<div class="camera">-->
                <!--<img src="../../../static/img/拍照.png" alt="">-->
                <!--<span>拍照</span>-->
            <!--</div>-->
            <div class="picture">
              <input type="file" name="picture" id="upPicture" ref="picture" @change="sendPicture">
              <img src="../../../static/img/图片.png" alt="" @click="uploadPicture">
              <span>图片</span>
            </div>
        </section>
      </footer>
    </div>
</template>
<script>
  import header from '../../base/header'
  import Scroll from '../../base/scroll'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import {getCurrentTime} from '../../utils/format.js'
  import { formatDate,formDateHour } from '../../utils/formatTimeStamp.js'
  export default{
      data(){
        return{
          rightTitle:'',
          seeMore:false,
          light:false,
          inputInfo:'',
          time:[],
          chatText:[],
          chatTime: [],
          preventRepeatRequest:false,
          ratingOffset:1,
          loadingStatus:false,
          dataLength:"",
          imgSrc:"",
          displayUrl:"",
          timeReverse:[],
          docAvatar:"",
          patAvatar:"",
          docName:"",
          followId:""
        }
      },
      created(){
        this.listenScroll = true
        this.patAvatar = localStorage.getItem('patAvatar')
        this.docAvatar = this.$route.query.docAvatar
        this.docName = this.$route.query.docName
        this.followId = this.$route.query.followId
        this.probeType = 3
        let that = this
        let token = localStorage.getItem("token")
        api("smarthos.follow.message.detail.list",{
          token:token,
          followId:"5978419de4b04f855903517d",
          pageNum:"1",
          pageSize:"10"
        }).then((data)=>{
            if(data.code == 0){
              that.chatText = data.list
            }else{
               this.$weui.alert("网络错误")
            }
//           console.log(data.list)
           that.aboutTime()
//          console.log(that.chatTime)
//          let dtCur = new Date();
//          let sCur = dtCur.getSeconds();
//          that.time.push(sCur)
//          let position = that.time.indexOf(sCur)
//          if((that.time[position] - that.time[position-1])<5){
//            that.chatTime.push("")
//          }else{
//            that.chatTime.push(formatDate (new Date(data.obj.createTime)))
//          }


//           for(var i=0;i<data.list.length;i++){
//            var d = new Array()
//            d[i] = formatDate (new Date(data.list[i].createTime))
//            data.list[i].createTime = d[i]
//
//            var destination
//            if(data.list[i].numStatus == "APPLYING"){
//              pathArray.push("/myAddList/myAddApply")
//            }else if(data.list[i].numStatus == "AGREED"){
//              pathArray.push("/myAddList/myAddSuccess")
//            }else{
//              pathArray.push("/myAddList/myAddRefuse")
//            }
//
//          }
//






          var o = document.getElementById("app");
          var h = o.offsetHeight;  //高度
          var content = (h)
            this.$nextTick(()=>{
                this.$refs.list.scrollTo(0,content - this.$refs.slideList.offsetHeight-400)

            })
        })

      },
      mounted(){

      },
      methods:{
          aboutTime(){
             var currentTime = new Date()
             var firstLog = currentTime.getTime() - (new Date(this.chatText[0].createTime)).getTime()
             var firstLogDay = Math.floor(firstLog/(12*3600*1000))
             if(firstLogDay >=1){
               this.chatTime.unshift(formatDate (new Date(this.chatText[0].createTime)))
             }else{
               this.chatTime.unshift(formDateHour (new Date(this.chatText[0].createTime)))
             }

            for(var i=0;i<this.chatText.length;i++){
//              console.log(this.chatText[i].createTime)
              if(i <=8){
                var sumInter = Math.abs((new Date( this.chatText[i].createTime)).getTime() - (new Date(this.chatText[i+1].createTime)).getTime())
                var inter = sumInter%(24*3600*1000)
                var inter2 = inter%(3600*1000)
                var interMinutes = Math.floor(inter2/(60*1000))
//                console.log(interMinutes)
                if(interMinutes < 5){
                  this.chatTime.push("")
                }else{
                  this.chatTime.push(formDateHour (new Date(this.chatText[i+1].createTime)))

                  var date2 = new Date()
//                  console.log(new Date(this.chatText[i].createTime))
                  var date3 = Math.abs(date2.getTime() - (new Date(this.chatText[i+1].createTime)).getTime())
                  var days = Math.floor( date3/(12*3600*1000))
//                  console.log(this.days[i])
//                  console.log("时间已经大于5 分钟")
                  if(days >=1){
//                    console.log("时间已经大于 1 天")
                    this.chatTime.push(formatDate (new Date(this.chatText[i+1].createTime)))
                  }
                }
              }
            }
//            console.log(this.chatTime)
          },
          loadMore(){
            if (this.preventRepeatRequest) {
              return
            }
            this.loadingStatus = true
            this.preventRepeatRequest = true;
            this.ratingOffset +=1;
            let that = this
            let token = localStorage.getItem("token")
            api("smarthos.follow.message.detail.list",{
              token:token,
              followId:that.followId,
              pageNum:that.ratingOffset,
              pageSize:"10"
            }).then((data)=>{

              var currentTime = new Date()
              var firstLog = currentTime.getTime() - (new Date(data.list[0].createTime)).getTime()
              var firstLogDay = Math.floor(firstLog/(12*3600*1000))
              if(firstLogDay > 0){
                that.timeReverse.unshift(formatDate (new Date(data.list[0].createTime)))
              }else{
                that.timeReverse.unshift(formDateHour (new Date(data.list[0].createTime)))
              }

//              that.timeReverse.unshift(formatDate (new Date(data.list[0].createTime)))
                 for(var i=0;i<data.list.length;i++){
                   that.chatText.unshift(data.list[i])

//              console.log(this.chatText[i].createTime)
                     if(i <=data.list.length-2){
                       var sumInter = Math.abs((new Date( data.list[i].createTime)).getTime() - (new Date(data.list[i+1].createTime)).getTime())
                       var inter = sumInter%(24*3600*1000)
                       var inter2 = inter%(3600*1000)
                       var interMinutes = Math.floor(inter2/(60*1000))
//                       console.log(interMinutes)
                       if(interMinutes < 5){
                         that.timeReverse.unshift("")
                       }else{


                         var date2 = new Date()
//                  console.log(new Date(that.chatText[i].createTime))
                         var date3 = Math.abs(date2.getTime() - (new Date(data.list[i+1].createTime)).getTime())
                         var days = Math.floor( date3/(12*3600*1000))
                         if(days >=1){
                           that.timeReverse.unshift(formatDate (new Date(data.list[i+1].createTime)))
                         }else{
                           that.timeReverse.unshift(formDateHour (new Date(data.list[i+1].createTime)))
                         }
                       }
                     }

                 }
                 for(var j=0;j<that.timeReverse.length;j++){
                     that.chatTime.unshift(that.timeReverse[j])

                 }
              that.timeReverse = []

              this.loadingStatus = false
              that.dataLength = data.list.length
              if(data.list.length >= 10){
                this.preventRepeatRequest = false;
              }
            })
          },
        scroll(pos) {
          this.scrollY = pos.y
          if(this.scrollY == 0 && this.dataLength >=10) {
            this.loadMore()

            const scrollPosition = this.$refs.slideList.offsetHeight - this.lastPageHeight;
            this.lastPageHeight = this.$refs.slideList.offsetHeight;
            var o = document.getElementById("app");
            var h = o.offsetHeight;  //高度
            var content = (h)
             if (this.ratingOffset > 2) {
                this.$nextTick(() => {
                  this.$refs.list.scrollTo(0, -scrollPosition)
                })

              }

          }else if(this.scrollY == 0 && this.dataLength == ""){
            this.loadMore()
            const scrollPosition = this.$refs.slideList.offsetHeight - this.lastPageHeight;
            this.lastPageHeight = this.$refs.slideList.offsetHeight;
            var o = document.getElementById("app");
            var h = o.offsetHeight;  //高度
            var content = (h)
            if (this.ratingOffset == 2) {
              this.$nextTick(() => {
                this.$refs.list.scrollTo(0, -1573)
              })

            }
          }else{
              return
          }
        },
        upMore(){
            if(this.$refs.footer.style.bottom != 0 + 'px'){
              this.$refs.footer.style.bottom=0 + 'px'
            }else{
              this.$refs.footer.style.bottom=-160 + 'px'
            }

            this.seeMore = !this.seeMore
        },
        inputHide(e){
          this.seeMore = false
          this.$refs.inputFocus.blur()
          this.$refs.footer.style.bottom=-160 + 'px'
        },
        enterThing(){
          if(this.light){
              this.send()
          }
        },
        blured(){
//          this.$refs.footer.style.bottom=-160 + 'px'
        },
        forceFocused(){
          this.$refs.inputFocus.focus()
        },
        focused(){
          this.seeMore = false
          this.$refs.footer.style.bottom=-160 + 'px'
        },
        send(e){
          let that = this
          let token = localStorage.getItem("token")
            api("smarthos.follow.message.add",{
              token:token,
              followId:that.followId,
              msgType:"TEXT",
              msgContent:that.inputInfo
            }).then((data)=>{
              if(data.code == 0){
                that.chatText.push(data.obj)
                let dtCur = new Date();
                let sCur = dtCur.getSeconds();
                that.time.push(sCur)
                let position = that.time.indexOf(sCur)
                if((that.time[position] - that.time[position-1])<5){
                  that.chatTime.push("")
                }else{
                  that.chatTime.push(formDateHour (new Date(data.obj.createTime)))
                }

              }else{
                  this.$weui.alert("网络错误")
              }
//              console.log(data)


//              that.time.push(formatDate (new Date(data.obj.createTime)))
//              let position = this.time.indexOf(formatDate (new Date(data.obj.createTime)))
//              if((this.time[position] - this.time[position-1])<5){
//               this.chatTime.push("")
//             }else{
//               this.chatTime.push(formatDate (new Date(data.obj.createTime)))
//             }
            })
            this.inputInfo=''
            this.light=false
            this.$refs.inputFocus.focus()

//          for(var i=0;i<data.list.length;i++){
//            var d = new Array()
//            d[i] = formatDate (new Date(data.obj.createTime))
//            data.list[i].createTime = d[i]
//
//            var destination
//            if(data.list[i].numStatus == "APPLYING"){
//              pathArray.push("/myAddList/myAddApply")
//            }else if(data.list[i].numStatus == "AGREED"){
//              pathArray.push("/myAddList/myAddSuccess")
//            }else{
//              pathArray.push("/myAddList/myAddRefuse")
//            }
//
//          }




//             let dtCur = new Date();
//             let sCur = dtCur.getSeconds();
//             this.time.push(sCur)
//             let position = this.time.indexOf(sCur)
//             if((this.time[position] - this.time[position-1])<5){
//               this.chatTime.push("")
//             }else{
//               let now = getCurrentTime()
//               this.nowTime = now
//               this.chatTime.push(now)
//             }
              var o = document.getElementById("app");
              var h = o.offsetHeight;  //高度
              var content = (h-400)
              if(this.$refs.slideList.offsetHeight>content){
                setTimeout(()=>{
                  this.$refs.list.scrollTo(0,-this.$refs.slideList.offsetHeight+content)
                },20)
              }
        },
        uploadPicture(){
            this.$refs.picture.click()
        },
        sendPicture(e){
             let that = this
             if(typeof FileReader === 'undefined'){
                 alert("抱歉，你的浏览器版本过低，请更换其它浏览器！")
             }
             let file = e.target.files[0]
              if(!/image\/\w+/.test(file.type)){
                alert("请确保文件为图像类型");
                return false;
              }
              let fileName = file.name
              let reader = new FileReader()
              reader.readAsDataURL(file);
              reader.onload = function(){
                  that.imgSrc = this.result
                  api("smarthos.system.file.upload.image.base64",{
                      base64:this.result,
                      module:"FOLLOW",
                      fileType:"IMAGE",
                      fileName: fileName,
                  }).then((data)=>{
//                       console.log(data)
                       that.displayUrl = data.obj.attaFileUrl
                       api("smarthos.follow.message.add",{
                         token:localStorage.getItem("token"),
                         followId:that.followId,
                         msgType:"PIC",
                         msgContent:that.displayUrl
                       }).then((data)=>{
//                           console.log(data)
                         that.chatText.push(data.obj)
                         let dtCur = new Date();
                         let sCur = dtCur.getSeconds();
                         that.time.push(sCur)
                         let position = that.time.indexOf(sCur)
                         if((that.time[position] - that.time[position-1])<5){
                           that.chatTime.push("")
                         }else{
                           that.chatTime.push(formDateHour (new Date(data.obj.createTime)))
                         }

                         var o = document.getElementById("app");
                         var h = o.offsetHeight;  //高度
                         var content = (h-400)
                         if(that.$refs.slideList.offsetHeight>content){
                           setTimeout(()=>{
                             that.$refs.list.scrollTo(0,-that.$refs.slideList.offsetHeight+content)
                           },20)
                         }
                       })
                  })
              }
        },
        whatInput(){
            if(this.inputInfo.replace(/\s+/g,"") == ''){
                this.light=false
            }else{
                this.light=true
            }
        }
      },
      components:{
          'VHeader':header,
           Scroll
      },
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  @import '../../common/mixin.scss';
.chat{
  width:100%;
  position: fixed;
  top:0;
  bottom:0;
  z-index:12;
  background-color: white;
  /*background-color: rgb(255,255,255);*/
  .conversationList{
    width:100%;
    /*position: relative;*/
    .loadTip{
      width:100%;
      span.pullMore{
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        img{
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
    li{
      .other{
        width:96%;
        display: flex;
        justify-content: flex-start;
        /*padding-top: 25px;*/
        margin-bottom: 25px;
        /*align-items: top;*/
        position: relative;
        img{
          width: 80rem/$rem;
          height: 80rem/$rem;
          border-radius: 50%;
          display: inline-block;
          margin-left: 30rem/$rem;
        }
        .whatsay{
          position: relative;
          margin-top: 0.4rem;
          .whatsay_svg{
            width:0.4266666667rem;
            height: 0.64rem;
            position: absolute;
            top:.5546667rem;
            left:.53rem;
            z-index:2;
            svg{
              display:block;
              width:0.4266666667rem;
              height: 0.64rem;
            }
          }
          .whatsay_text{
            margin-left: 20px;
            max-width: 490rem/$rem;
            background:#f5f5f5;
            padding:0.42rem 0.384rem;
            border-radius:10px;
            font-size: 28rem $rem;
            line-height: 48rem/$rem;
            color: #333333;
            word-break: break-all;
            img{
               border-radius: 0;
               margin-left: 0;
               width:100%;
               height:100%;
            }
          }
        }
      }
      .mysay{
        display:flex;
        flex-direction:row-reverse;
        .say-time{
          left:8.8rem;
        }
        .whatsay{

          .whatsay_svg{
            right: 0rem;
            left:auto;
          }
          .whatsay_text{
            margin-right: 0.38rem;
            margin-left:0;
            background:#9fe658;
          }
        }
      }
    }
  }
  .conversation{
    width:100%;
    /*padding-top: 50px;*/
    /*overflow: auto;*/
    /*height: 500px;*/
    position: fixed;
    top: 50px;
    bottom: 40px;
    overflow: hidden;
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: auto;*/
    background-color: white;
    ul{
      padding:0;
      margin:0;
    }
  }
  .conversationUp{
    transition: all .2s;
    width:100%;
    position: fixed;
    top: 50px;
    bottom: 200px;
    overflow: hidden;
    background-color: white;
    ul{
      padding:0;
      margin:0;
    }
  }
  .timeLog{
    margin:0 auto;
    width: 690rem/$rem;
    height: 90rem/$rem;
    display: flex;
    align-items: center;
    color: #999999;
    justify-content: center;
  }
}
footer{
  width:100%;
  height: 200px;
  position: fixed;
  bottom: -160px;
  background-color: white;
  .foot_top{
    display: flex;
    .chatInput{
      width: 566rem/$rem;
      margin-left: 30rem/$rem;
      text-align: center;
      input{
        width: 566rem/$rem;
        height: 64rem/$rem;
        border:none;
        font-size: 32rem/$rem;
        outline: medium;
        border-radius:7px;
        background-color: rgb(243,243,243);
        border-bottom: 1px solid #e0e0e0;
      }
      .greenBorder{
        border-bottom: 1px solid #19ad17;
        /*border-color:#19ad17;*/
      }
    }
    .chatSend{
      width: 110rem/$rem;
      height: 70rem/$rem;
      margin-left: 20rem/$rem;
      /*background-color: dodgerblue;*/
      text-align: center;
      .send{
        width: 110rem/$rem;
        height: 70rem/$rem;
        background:#16af17;
        border-radius:5px;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          display: block;
          color: white;
        }
      }
      .addmore{
        img{
          width: 58rem/$rem;
          height: 58rem/$rem;
        }
      }
    }
  }
  .foot_bottom{
    display: flex;
    .camera, .picture{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 60px;
      margin-top: 30px;
      img{
        width: 57px;
        height: 57px;
        display: block;
        margin-bottom: 15px;
      }
      span{
        font-size: 14px;
        color:#666666
      }
    }
    .picture{
      >input{
        display: none;
      }
    }
  }
}
.footshow{
  bottom:0;
  transition: all .2s;
}


</style>
