<template>
    <div class="chat">
      <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <scroll :class="seeMore ? 'conversationUp':'conversation'" @make-blur="inputHide()" ref="list"  :data="chatText" :data1="seeMore">
          <section class="conversationList" ref="slideList" >
            <ul>
              <li v-for="(item,index) in chatText">
                <div :class="{timeLog:chatTime[index] != ''}" ref="myLog">{{chatTime[index]}}</div>
                <div class="other">
                  <img src="../../../static/img/chatOrigin.jpg" alt="">
                  <div class="whatsay">
                    <div class="whatsay_svg">
                      <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>
                      </svg>
                    </div>
                    <div class="whatsay_text">
                      {{item}}
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
            <div class="camera">
                <img src="../../../static/img/拍照.png" alt="">
                <span>拍照</span>
            </div>
            <div class="picture">
              <img src="../../../static/img/图片.png" alt="">
              <span>图片</span>
            </div>
        </section>
      </footer>
    </div>
</template>
<script>
  import header from '../../base/header'
  import scroll from '../../base/scroll'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import {getCurrentTime} from '../../utils/format.js'
  export default{
      data(){
        return{
          title:'黄靖江',
          rightTitle:'',
          seeMore:false,
          light:false,
          inputInfo:'qw',
          time:[],
          chatText:['您好，我想咨询下', '您好，我可以继续咨询下吗'],
          chatTime: ['2017-7-18','2017-7-21']

        }
      },
      created(){
        let that = this
//        api("smarthos.follow.message.add",{
//          token:"18297912203",
//          followId:"595cba8c002f8226eca85847",
//          msgType:"TEXT",
//          msgContent:"哈哈"
//        }).then((data)=>{
//          console.log(data)
//        })
        api("smarthos.follow.message.detail.list",{
          token:"18958020256",
          followId:"59642babcc9d0b4f87691a6a",
          pageNum:"1",
          pageSize:"10"
        }).then((data)=>{
            console.log(data)
        })
      },
      mounted(){
//          this.$refs.inputFocus.focus()
      },
      methods:{
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
//            this.chatText.push(this.inputInfo)

            this.inputInfo=''
            this.light=false
            this.$refs.inputFocus.focus()
//            alert(document.hasFocus())  //true
             let dtCur = new Date();
             let sCur = dtCur.getSeconds();
             this.time.push(sCur)
             let position = this.time.indexOf(sCur)
//             console.log(this.$refs.slideList.style.height)
             if((this.time[position] - this.time[position-1])<5){
               this.chatTime.push("")
             }else{
               let now = getCurrentTime()
               this.nowTime = now
               this.chatTime.push(now)
             }
//             console.log(this.$refs.slideList.offsetHeight)
              var o = document.getElementById("app");
              var h = o.offsetHeight;  //高度
              var content = (h-200)
              if(this.$refs.slideList.offsetHeight>content){
                setTimeout(()=>{
                  this.$refs.list.scrollTo(0,-this.$refs.slideList.offsetHeight+content)
                },20)
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
           scroll
      },
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  @import '../../common/mixin.scss';
.chat{
  width:100%;

  position: relative;
  z-index:12;
  background-color: white;
  /*background-color: rgb(255,255,255);*/
  .conversationList{
    width:100%;
    /*position: relative;*/
    li{
      .other{
        width:100%;
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
            left:.23rem;
            z-index:2;
            svg{
              display:block;
              width:0.4266666667rem;
              height: 0.64rem;
            }
          }
          .whatsay_text{
            margin-left: 12px;
            max-width: 490rem/$rem;
            background:#F5F5F5;
            padding:0.42rem 0.384rem;
            border-radius:10px;
            font-size: 28rem $rem;
            line-height: 48rem/$rem;
            color: #333333;
            word-break: break-all;
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
    bottom: 50px;
    overflow: hidden;
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: auto;*/
    /*background-color: green;*/
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
    /*background-color: green;*/
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
    }
  }
}
.footshow{
  bottom:0;
  transition: all .2s;
}


</style>
