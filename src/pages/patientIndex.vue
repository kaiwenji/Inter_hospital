<template>
    <div class="index">
         <v-header :title="title" :rightTitle="rightTitle" :imgSrc="scanImg"></v-header>
         <div ref="wholeScroll" class="wholeScroll">
             <div>
                 <div class="carsoul" v-if="adImg != '' ">
                     <carousel>
                       <div v-for="item in adImg">
                         <a href="">
                           <img :src="item.adUrl" alt="">
                         </a>
                       </div>
                     </carousel>
                 </div>
                <div class="wholeArea">
                 <div class="funArea">
                   <div class="bookNumer" @click="appoint()">
                     <img src="../../static/img/red.png" alt="">
                     <span>预约挂号</span>
                   </div>
                   <div class="askDoctor"  @click="askDoc">
                     <img src="../../static/img/myDoc.png" alt="">
                       <span>问医生</span>
                   </div>
                 </div>
                 <div class="blankLine">

                 </div>
                 <div class="three">
                   <div class="eyeSick border-1px-right" @click="eyeIllness">
                     <img src="../../static/img/eye.png" alt="">
                     <span>眼底病</span>
                   </div>
                   <div class="eyeOut border-1px-right"  @click="eyeInjury">
                     <img src="../../static/img/home_eye_trauma.png" alt="">
                     <span>眼外伤</span>
                   </div>
                   <div class="repeatSee" @click="repeat">
                     <img src="../../static/img/home_pat_ill.png" alt="">
                     <span>复诊</span>
                   </div>
                 </div>
                 <div class="blankLine">

                 </div>
                 <div class="doctorKnow border-1px">
                   <div class="left30">
                     <span>名医知道</span>
                     <span @click="moreKnow()" class="doctorMore">更多></span>
                   </div>
                 </div>
                 <div class="knowCard border-1px" v-for="(item,index) in knowDetail">
                   <div class="autoCenter">
                     <div class="knowLeft">
                       <img :src="item.docAvatar" alt="">
                     </div>
                     <div class="knowRight">
                       <div class="knowTitle">
                         <span>{{ item.docName }}</span>
                       </div>
                       <div class="knowDetail">
                         <span>{{ item.snsKnowledge.description }}</span>
                       </div>
                       <div class="knowBubble bg">
                         <audio :src="item.snsKnowledge.knowUrl"  ref="playaudio" preload="metadata"></audio>
                         <div class="playAnimation voicePlay" ref="animate"></div>
                         <span>{{ playTime[index] }}</span>
                         <img src="../../static/img/bubble_off.png" alt="" @click="play(index)">
                       </div>
                       <div class="knowTime">
                         <span class="timeDetail">{{ time[index] }}</span>
                         <span class="hasListened" v-if="clickTime[index] != ''">{{ clickTime[index] }}人听过</span>
                         <span class="hasListened" v-else>{{ item.snsKnowledge.readNum }}人听过</span>
                         <span class="thumb" v-if="item.snsKnowledge.likes > clickLikes">
                           <img src="../../static/img/rec_off.png" alt="" @click="praise(index)">{{ item.snsKnowledge.likes }}
                         </span>
                         <span class="thumb" v-else>
                           <img src="../../static/img/rec_off.png" alt="" @click="praise(index)">{{ clickLikes }}
                         </span>
                       </div>
                     </div>

                   </div>
                 </div>
               </div>
             </div>
         </div>
          <div class="alertArea" v-if="showAlert">
            <div>
              <alert :alertTitle="alertTitle" :alertMsg="alertMsg" @on-set="close"></alert>
            </div>
          </div>
      <div class="bottemFooter">
        <footers index="0"></footers>
      </div>
         <!--<div class="footer">-->
             <!--<router-link tag="div" :to="item.tabLink" v-for="item in tagNames" :key="item.id" :class="tellPath == '/myDoctorChat/followDoctor'? 'followBlue':''">-->
               <!--<img v-if="tellPath == '/patientIndex'" :src="item.imgLinkIndexOn">-->
               <!--<img v-else-if="tellPath == '/myDoctorChat/recentChat'" :src="item.imgLinkOn">-->
               <!--<img v-else-if="tellPath == '/myDoctorChat/followDoctor'" :src="item.imgLinkOn">-->
               <!--<img v-else-if="tellPath == '/patientIndex/my'" :src="item.imgLinkMyOn">-->
               <!--<span >{{item.title}}</span>-->
             <!--</router-link>-->
         <!--</div>-->

    </div>
</template>
<script >
  import header from '../base/header'
  import Carousel from '../base/carousel'
  import BScroll from 'better-scroll'
  import api from '../lib/api'
  import footers from '../business/app-footer.vue'
  import Alert from '../base/alert'
  var token = localStorage.getItem('token')
  import { formDateMinute,formatDate } from '../utils/formatTimeStamp.js'
  export default{
      data(){
         return{
           title:"首页",
           rightTitle:"",
           adImg:[],
           knowDetail:{},
           playTime:[],
           time:[],
           clickTime:[],
           a:0,
           temp:'',
           scanImg:"../../static/img/扫一扫.png",
           clickLikes:0,
           showAlert:false,
           alertTitle:"温馨提示",
           alertMsg:"请勿重复点赞哦",
           tagNames:[
             {title:'首页',tabLink:"/patientIndex",imgLinkIndexOn:"../../static/img/home_on.png",imgLinkOn:"../../static/img/home.png",imgLinkMyOn:"../../static/img/home.png"},
             {title:'我的医生',tabLink:"/myDoctorChat/recentChat",imgLinkIndexOn:"../../static/img/myDoctorBottom.png",imgLinkOn:"../../static/img/myDoctor_on.png",imgLinkMyOn:"../../static/img/myDoctorBottom.png"},
             {title:'我的',tabLink:"/patientIndex/my",imgLinkIndexOn:"../../static/img/myBottom.png",imgLinkOn:"../../static/img/myBottom.png",imgLinkMyOn:"../../static/img/myBottom_on.png"}
           ],
           tellPath:""
         }
      },
      mounted(){

          this.$nextTick(()=>{
              this.tellPath = this.$route.path
          })

      },
      created(){
         let that = this
        api("smarthos.user.pat.index",{
            token:localStorage.getItem("token")
        }).then((data)=>{
             if(data.code == 0){
               that.adImg = data.obj.adsettings
               for(var j=0;j<data.obj.knowledge.length;j++){
                 that.time.push(formatDate(new Date(data.obj.knowledge[j].snsKnowledge.createTime)))
                 that.clickTime.push("")
               }
               that.knowDetail = data.obj.knowledge
             }

        })
      },
      methods:{
          appoint(){
              this.$router.push("/book/");
          },
          askDoc(){
              console.log("ask doc");
              this.$router.push("/Consult/")
          },
        eyeIllness(){
          api('smarthos.appointment.oculartrauma.detail',{
            token:token
          }).then(res=>{
            if(res.succ){
              if(res.obj){
                this.$router.push({
                  name:"orderDetail"
                })
              }else {
                this.$router.push({
                  name:"eyeIllness"
                })
              }
            }else {
              this.$weui.alert(res.msg)
            }
          })

        },
        eyeInjury(){
          api('smarthos.appointment.fundus.detail',{
            token:token
          }).then(res=>{
            if(res.succ){
              if(res.obj){
                this.$router.push({
                  name:"eyeInjuryDetail"
                })
              }else {
                this.$router.push({
                  name:"eyeInjury"
                })
              }
            }else {
              this.$weui.alert(res.msg)
            }
          })
        },
        repeat(){
           console.log("12234132")
          this.$router.push({
            name:"addList"
          })
        },
        _initKnowScroll(){
            this.knowScroll = new BScroll(this.$refs.wholeScroll,{
                click:true
            })
          console.log(this.knowScroll,9999)
        },
        play(index){
              if(this.temp === ''){
                let that =this
                if(this.$refs.playaudio[index].paused){
                  this.$refs.playaudio[index].currentTime = 0
                  this.$refs.playaudio[index].play()
                  this.$refs.animate[index].style.animationName = "voicePlay"
                  this.$refs.playaudio[index].onended = function(){
                    this.$refs.animate[index].style.animationName = " cc"
                  }
                  api("smarthos.sns.knowledge.readnum",{
                    id:this.knowDetail[index].snsKnowledge.id
                  }).then((data)=>{
                    that.clickTime.splice(index,1,data.obj.readNum)
                  })
                }else{
                  this.$refs.playaudio[index].pause()
                  this.$refs.animate[index].style.animationName = " cc"
                  this.$refs.playaudio[index].currentTime = 0
                }
                this.temp = index
              }else if(this.temp >= 0 && this.temp != index){
                for(var i =0;i<this.$refs.playaudio.length;i++){
                  this.$refs.playaudio[i].pause()
                }
                this.$refs.playaudio[this.temp].pause()
                this.$refs.animate[this.temp].style.animationName = "cc"
                this.$refs.animate[index].style.animationName = "cc"
                let that =this
                if(this.$refs.playaudio[index].paused){
                  this.$refs.playaudio[index].currentTime = 0
                  this.$refs.playaudio[index].play()
                  this.$refs.animate[index].style.animationName = "voicePlay"
                  api("smarthos.sns.knowledge.readnum",{
                    id:this.knowDetail[index].snsKnowledge.id
                  }).then((data)=>{
                    that.clickTime.splice(index,1,data.obj.readNum)
                  })
                }else{
                  this.$refs.playaudio[index].pause()
                  this.$refs.animate[index].style.animationName = " cc"
                  this.$refs.playaudio[index].currentTime = 0
                }
                this.temp = index
              }else{
                let that =this
                if(this.$refs.playaudio[index].paused){
                  this.$refs.playaudio[index].currentTime = 0
                  this.$refs.playaudio[index].play()
                  this.$refs.animate[index].style.animationName = "voicePlay"
                  api("smarthos.sns.knowledge.readnum",{
                    id:this.knowDetail[index].snsKnowledge.id
                  }).then((data)=>{
                    that.clickTime.splice(index,1,data.obj.readNum)
                  })
                }else{
                  this.$refs.playaudio[index].pause()
                  this.$refs.animate[index].style.animationName = " cc"
                  this.$refs.playaudio[index].currentTime = 0
                }
                this.temp = index
              }


        },
        praise(index){
            let that = this
            api("smarthos.sns.knowledge.likes",{
                knowledgeId:this.knowDetail[index].snsKnowledge.id,
                token:localStorage.getItem("token")
            }).then((data)=>{
                if(data.code == 0){
                  that.clickLikes = data.obj + 1
                }else{
                   that.showAlert = true
                }
            })
        },
        moreKnow(){
          this.$router.push("/docRadio")
        },
        close(){
            this.showAlert = false
        }
      },
      components:{
          "VHeader":header,
           Carousel,
           Alert,
        footers
      },
      watch:{
        knowDetail(){
          this.$nextTick(()=>{
            setTimeout(()=>{
              this._initKnowScroll()
            },20)
              let that = this
              for(var i =0;i<this.$refs.playaudio.length;i++){
                this.$refs.playaudio[i].addEventListener('loadedmetadata',function(){
                  that.playTime.push(formDateMinute(new Date(this.duration)))
                })
              }
          })
        },
        "$route":function(){
          this.tellPath = this.$route.path
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../common/public.scss';
  @import '../common/mixin.scss';
  .bottemFooter{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
  }
  .index{
    position: fixed;
    top:0;
    width:100%;
    bottom:0;
  }
    .wholeScroll{
      width:100%;
      position: fixed;
      top: 50px;
      bottom: 98rem/$rem;
      left:0;
      right:0;
      /*z-index:201;*/
      overflow: hidden;
      background-color: white;
      >div{
        .carsoul{
          width:100%;
          overflow: hidden;
          height:212rem/$rem;
          /*position: absolute;*/
          /*top: 0;*/
          /*margin-top: 50px;*/
          /*background-color: #3CC51F;*/
        }
        .wholeArea{
          width:100%;
          /*position: absolute;*/
          background-color: white;
          /*<!--margin-top: 212rem/$rem;-->*/
          .funArea{
            width:100%;
            height:120rem/$rem;
            display: flex;
            /*background-color: #E64340;*/
            .bookNumer,.askDoctor{
              flex:1;
              display: flex;
              align-items: center;
              justify-content: center;
              span{
                font-size: 32rem/$rem;
                font-weight: bold;
                font-family: PingFangSC;
                color: #333333;
              }
              img{
                width: 50rem/$rem;
                height: 50rem/$rem;
                margin-right: 20rem/$rem;
              }
            }
          }
          .blankLine{
            width:100%;
            height:20rem/$rem;
            background-color:#F5F5F5 ;
          }
          .three{
            width:100%;
            height:227rem/$rem;
            display: flex;
            .eyeSick,.eyeOut,.repeatSee{
              display: flex;
              flex:1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              span{
                font-size: 32rem/$rem;
                color: #333333;
                font-family: PingFangSC;
                font-weight: bold;
              }
              img{
                width:100rem/$rem;
                height: 100rem/$rem;
              }
            }
          }
          .doctorKnow{
            width:100%;
            height:88rem/$rem;
            display: flex;
            align-items: center;
            .left30{
              /*background-color: #E64340;*/
              width:690rem/$rem;
              margin:0 auto;
              display: flex;
              justify-content: space-between;
              span{
                font-size:28rem/$rem;
                color: #999999;
                font-family: PingFangSC;
              }
              span.doctorMore{
                color: #0FBDFF;
              }
            }
          }
          .knowCard{
            width:100%;
            .autoCenter{
              width:690rem/$rem;
              margin:0 auto;
              display: flex;
              .knowLeft{
                width:100rem/$rem;
                img{
                  width:80rem/$rem;
                  height:80rem/$rem;
                  border-radius: 50%;
                  margin-top: 30rem/$rem;

                }
              }
              .knowRight{
                width:590rem/$rem;
                .knowTitle{
                  display: flex;
                  align-items: center;
                  height:80rem/$rem;
                  margin-top: 30rem/$rem;
                  span{
                    font-size:32rem/$rem;
                    color: #333333;
                    font-family: PingFangSC;
                  }
                }
                .knowDetail{
                  margin-bottom: 30rem/$rem;
                  span{
                    font-size: 28rem/$rem;
                    color: #333333;
                    font-family: PingFangSC;
                    line-height: 42rem/$rem;
                  }
                }
                .knowBubble{
                  position: relative;
                  margin-bottom: 30rem/$rem;
                  span{
                    position: absolute;
                    left:200rem/$rem;
                    top: 20rem/$rem;
                    font-size: 28rem/$rem;
                    color: #FFFFFF;
                    font-family: PingFangSC;
                  }
                  img{
                    width:330rem/$rem;
                  }
                  .playAnimation{
                    position: absolute;
                    left:50rem/$rem;
                    top: 20rem/$rem;
                    width: 24px;
                    height: 24px;
                    background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzlFRDZDRDNENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzlFRDZDRDJENzlFMTFFNkJDN0NFMjA2QTFFRTRDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTAxQkEzQ0RENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTAxQkEzQ0VENzM2MTFFNjgyMEI5MTNDRkQ0OTM5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4K4iKVAAACUUlEQVR42uSazytEURTHvTHjR4kaU8xsSDZSdmbjx4oSK8XGQrJlpSwYTSmxEWWhUIpsZK3kD7DRNBuSBZFCNjZ+JPKcV6ecXu/d3sy7595bc+vbfXPue5/749z77o83lm3bZYYFC8RZqAbQAigP2tXNj5aZF7gdkAZNk9+7WvnOCCgxRUCb9n/o1sk3pUH6QDHF/GNsoM+QeYfiy6qkFeLZDBb0GlTB4AAR/xXT9nXxZVa0WCekQd9Y0HOJjg3CHySviiZmfjO3AyIhnu0gBc0wjAIR/wLtW8z87aAOWAI9gqaYRoAff4ZUoi7EKCiUP462j4CdSCrfK4N1Ahpi6I0i/hPa50M4oFB+Dbm/SzXfL5MD4rUogxP8+Itozynm59E+q5ovyuQdHxphWh568XvR5kxq1SEn40L4e0XMA1L4EcEe7RTjLqYdqRf/gezQUwr5LxjXq+aLHPCFcTmTA7z4tutIQhXfLiJPKXyRA/oxzgW8v9DgxU+S62eF/ATGr6r5fg26Corj9RHD4Z0fvwfjS9CbQn4bxrfK+R6TyzxZNk260solTL4i/g3al10TsMXIryA72T7VfK8MnJO8X9CKy14lafXjxx8jFUsSeyUzfxhtPwHPoqTy/TJJMJzJiPgNpJdsuNJizPwztB/q4JtwHN2KW3sn3HuMOouR30l6bbsOvgkOyGIBnaPbRldalJl/h2knuvgmOKAWNAFKMUz4Iv4O6Z1xXXxTPxtazHy6khnVyS/Fb8IDpHGyuvmWgX9L4Q4toDnQFWhNN/9PgAEAR4w1ULjdCbEAAAAASUVORK5CYII=)  right 0 no-repeat;
                    z-index:100;
                  }
                  .voicePlay{
                    /*animation-name: voicePlay;*/
                    animation-duration: 1s;
                    animation-direction: normal;
                    animation-iteration-count: infinite;
                    animation-timing-function: steps(3);
                  }
                  @keyframes voicePlay {
                    0% {
                      background-position: 0;
                    }
                    100% {
                      background-position: 100%;
                    }
                  }
                }
                .bg{

                }
                .knowTime{
                  display: flex;
                  justify-content: space-between;
                  .timeDetail{
                    width:300rem/$rem;
                    margin-bottom: 15rem/$rem;
                  }
                  .hasListened{
                    margin-bottom: 15rem/$rem;
                  }
                  span{
                    font-size: 24rem/$rem;
                    color: #999999;
                    font-family: PingFangSC;
                    display: flex;
                    align-items: center;
                  }
                  .thumb{
                    display: flex;
                    align-items: center;
                    margin-bottom: 30rem/$rem;
                    img{
                      width:40rem/$rem;
                      margin-right: 10rem/$rem;
                    }
                  }
                  .hasListened{
                   text-align: right;
                  }
                }
              }

            }
          }
        }
      }
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
    z-index:300;
    /*background-color: #3CC51F;*/
  }
  .footer{
    width:100%;
    height:98rem/$rem;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    display: flex;
    .router-link-exact-active{
      span{
        font-size:22rem/$rem;
        color: #0fbdff;
        font-family: PingFangSC;
      }

    }
    >div{
      flex:1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10rem/$rem;
      img{
        width:50rem/$rem;
        height:50rem/$rem;
      }
      span{
        font-size:22rem/$rem;
        color: #999999;
        font-family: PingFangSC;
      }
    }
    >div.followBlue:nth-child(2){
       span{
         font-size:22rem/$rem;
         color: #0fbdff;
         font-family: PingFangSC;
       }
    }

    /*background-color: #3CC51F;*/
  }
</style>
