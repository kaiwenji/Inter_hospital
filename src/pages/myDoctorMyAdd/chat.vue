<template>
    <div class="chat">
      <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <section :class="seeMore?'conversationUp':'conversation'" ref="list" @click="inputHide">

          <section class="conversationList" ref="slideList">
            <ul>
              <li v-for="(item,index) in chats">
                <div class="other">
                  <div class="say-time"></div>
                  <img src="../../../static/img/医生男.png" alt="">
                  <div class="whatsay">
                    <div class="whatsay_svg">
                      <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>
                      </svg>
                    </div>
                    <div class="whatsay_text">
                      {{chats[index]}}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>


      </section>
      <footer :class="{footshow:seeMore}">
        <section class="foot_top">
          <div class="chatInput">
            <input type="text"  maxlength="100" @input="whatInput" v-model="inputInfo" @click="inputHide" :class="{greenBorder:light}" @keyup.enter="enterThing">
          </div>
          <div class="chatSend">
            <div class="send" @click="send()" v-if="light">
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
//  import Scroll from '../../base/scroll'
  import BScroll from 'better-scroll'
  export default{
      data(){
        return{
          title:'黄靖江',
          rightTitle:'',
          seeMore:false,
          light:false,
          inputInfo:'',
          chats:[]
        }
      },
      watch:{
        chats(){
          this.$nextTick(()=>{
            if(!this.conversationScroll){
              this._initConversation()
            }else{
              this.conversationScroll.refresh();
            }
            if(this.$refs.slideList.offsetHeight > 577)
            this.conversationScroll.scrollTo(0,-(this.$refs.slideList.offsetHeight-557))

          })
        },
        seeMore(){
          this.$nextTick(()=>{
             console.log("ewfrewgrewgtyg")
            if(!this.conversationScroll){
              this._initConversation()
            }else{
              this.conversationScroll.refresh();
            }
          })
        }
      },
      mounted(){
        if(this.seeMore == false){
          this.$nextTick(()=>{

            if(!this.conversationScroll){
              this._initConversation()
            }else{
              this.conversationScroll.refresh();
            }
          })
        }else{
            return
        }

      },
      methods:{
        _initConversation(){
            this.conversationScroll = new BScroll(this.$refs.list,{
              click:true
            })
            console.log(this.conversationScroll)
        },
        upMore(){
            this.seeMore = true
          this.$nextTick(()=>{
            this.$refs.slideList.style.wrapperHeight= 417 + 'px'

          })
            console.log("gfsdglkfddsgdsgsdgdgdsgdsgdsg")
            this.$nextTick(()=>{
              console.log(this.conversationScroll.wrapperHeight)
            if(this.conversationScroll.wrapperHeight == 577){
                console.log("324321")
              this.conversationScroll.refresh();
            }else{
              console.log("此时为577");
            }

          })

        },
        inputHide(){
            this.seeMore = false
        },
        enterThing(){
          if(this.light){
              this.send()
          }
        },
        send(){
            this.chats.push(this.inputInfo)
            console.log( this.chats)
             this.inputInfo=''
             this.light=false
             console.log(window.innerHeight)
             console.log(this.$refs.slideList.offsetHeight)

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
          'VHeader':header
      },
  }
</script>
<style scoped lang="scss">
.chat{
  width:100%;
  position: fixed;
  top:0;
  bottom:0;
  z-index:12;
  background-color: rgb(249,249,249);
  /*background-color: rgb(255,255,255);*/
  .conversationList{
    li{
      .other{
        width:100%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        /*align-items: top;*/
        position: relative;
        img{
          width: 40px;
          height: 40px;
        }
        .whatsay{
          position: relative;
          margin-top: 0.4rem;
          .whatsay_svg{
            width:0.4266666667rem;
            height: 0.64rem;
            position: absolute;
            top:.5546667rem;
            left:.26rem;
            z-index:2;
            svg{
              display:block;
              width:0.4266666667rem;
              height: 0.64rem;
            }
          }
          .whatsay_text{
            margin-left: 12px;
            max-width: 245px;
            background:#F5F5F5;
            padding:0.42rem 0.384rem;
            border-radius:10px;
            line-height: 19px;
            word-break: break-all;
          }
        }
      }
    }
  }
  .conversation{
    width:100%;
    position: fixed;
    top: 50px;
    bottom: 40px;
    overflow: hidden;
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
      width: 283px;
      margin-left: 20px;
      text-align: center;
      input{
        width: 283px;
        height: 32px;
        border:none;
        font-size: 20px;
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
      width: 55px;
      height: 35px;
      margin-left: 10px;
      /*background-color: dodgerblue;*/
      text-align: center;
      .send{
        width: 55px;
        height: 35px;
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
          width: 29px;
          height: 29px;
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
