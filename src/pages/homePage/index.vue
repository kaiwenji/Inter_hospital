<template>
    <div class="wrap">
      <top>
          <div slot="left"></div>
        <div>首页</div>
      </top>
        <div v-show="!showLoading" class="title">
          <lunbo :imgList="imgList">
          </lunbo>
        </div>
      <div v-show="!showLoading" class="wrapScroll">
        <div class="contain">
          <div class="registration">
            <img src="../../../static/img/home_registration.png" alt="">
            <span class="bf"> 预约挂号</span>
          </div>
          <div class="inquiry">
            <img class="myDocImg" src="../../../static/img/myDoc.png" alt="">
            <sapn class="bf">
              问医生
            </sapn>
          </div>
        </div>
        <div class="containTitle">
          <div class="eyeIllness" @click="eyeIllness">
            <div>
              <p  class="eyeImg"><img src="../../../static/img/eye.png" alt=""></p>
              <p class="bf">眼底病</p>
            </div>
          </div>
          <div class="eyeInquiry" @click="eyeInjury">
            <div>
              <p  class="eyeImg"><img src="../../../static/img/home_eye_trauma.png" alt=""></p>
              <p class="bf">眼外伤</p>
            </div>
          </div>
          <div class="visit">
            <div class="repetition">
              <p  class="eyeImg"><img src="../../../static/img/home_pat_ill.png" alt=""></p>
              <p class="bf">复诊</p>
            </div>
          </div>
        </div>
        <div class="hotShare mainColor">
          <div class="header">
            <div class="hot mf">热门分享</div>
            <div  class="more mfc">
              更多&nbsp;
              <img src="../../../static/img/more.png" alt="">&nbsp;&nbsp;
            </div>
          </div>
          <div class="detail" v-for="item of knowledge">

            <div class="titleImg">
              <img :src="item.docAvatar" alt="">
            </div>
            <div class="docMsg">
              <div><span class="bf">{{item.docName}}</span></div>
              <!--<div>-->
              <!--<span class="mfc">昨天 20:00</span>-->
              <!--</div>-->
              <div class="easyContain">
              <span  class="mf">
                {{item.snsKnowledge.description.substring(0,35)}}......
              </span>
              </div>
              <bubble ref="bubble" id="bubble" :src="item.snsKnowledge.knowUrl"></bubble>
              <div class="ft musicBottom">
                <p class="s">{{item.snsKnowledge.createTime | Todate}}</p>
                <p class="right s">{{item.snsKnowledge.readNum}}人听过</p>
                <p class="right s" id="thumb" @click="setColor(item)"><img class="icon" src="../../../static/img/rec_off.png">{{item.snsKnowledge.likes}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footers></footers>
      <My-loading v-show="showLoading" class="myLoading"></My-loading>
    </div>
</template>
<script type="text/ecmascript-6">
//  import rdSwipe from '../../../node_modules/vue-slide/vue-slide.vue'
    import lunbo from '../../business/lunbo.vue'
    import top from '../../business/app-header.vue'
    import footers from '../../business/app-footer.vue'
    import api from '../../lib/api'
    import Bubble from "../../base/bubble.vue";
    import {Todate} from '../../lib/filter'
    import MyLoading from "../../base/loading/loading.vue";
    var token = localStorage.getItem('token')
    export default{
        components: {
            top,
            lunbo,
          Bubble,
          footers,
          MyLoading
        },
      filters:{
        Todate
      },
        data(){
            return {
              imgList:[],
              obj:{},
              knowledge:[],
              showLoading:true
            }
        },
        mounted(){
          this.getData();
        },
      methods:{
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
        setColor(item){
          api("smarthos.sns.knowledge.likes",{
            knowledgeId:item.snsKnowledge.id,
            token:token
          })
            .then((val)=>{
                if(val.succ){
                this.getData()
                }
                else{
                  this.$weui.alert(val.msg);
                }
              },
              ()=>{
                this.$weui.alert("网络错误");
              })
        },
        getData(){
          api('smarthos.user.pat.index',{
            token:token
          }).then(res=>{
            console.log(res,6666)
            if(res.succ){
              this.$set(this.$data,'showLoading',false)
              this.$set(this.$data,'obj',res.obj)
              this.$set(this.$data,'imgList',res.obj.adsettings)
              this.$set(this.$data,'knowledge',res.obj.knowledge)
            }else {
              this.$weui.alert(res.msg)
            }

          })
        },
        goMy(){
          this.$router.push({
            name:'my'
          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';
    .wrapScroll{
      /*display: flex;*/
      flex-direction: column;
      flex: 1;
      overflow-y: auto;
    }
    /*.myLoading{*/
      /*height: 100%;*/
    /*}*/
    .containTitle{
      width: 100%;
      height: 225rem/$rem;
      margin-bottom: 20rem/$rem;
      background: white;
      display: flex;
    }
    .eyeIllness{
      width: 33.33%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid gainsboro;
    }
    .eyeInquiry{
      width: 33.33%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid gainsboro;
    }
    .visit{
      width: 33.33%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .eyeImg{
      img{
        width: 100rem/$rem;
        height: 100rem/$rem;
      }
    }
    .contain{
      height: 120rem/$rem;
      width: 100%;
      margin-bottom: 20rem/$rem;
      background: white;
      display: flex;
    }
    .repetition{
      text-align: center;
    }
    .registration{
      height: 120rem/$rem;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 50rem/$rem;
        height: 50rem/$rem;
        margin-right: 20rem/$rem;
      }
    }
    .inquiry{
      height: 120rem/$rem;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
        img{
          width: 50rem/$rem;
          height: 50rem/$rem;
           margin-right: 20rem/$rem;
        }
    }
    .ft{
      display:flex;
      flex-direction:row;
    p{
      flex:1 0 auto;
    }
    .icon{
      height:1rem;
      position:relative;
      left:-0.2rem;
      top:0rem;
    }

    }
    .wrap{
      display: flex;
      flex-direction: column;
      flex: 1;
    }
 .title{
   width: 100%;
   height: 210rem/$rem;
 }

  .leftContain img{
    display: block;
    width: 96rem/$rem;
    height: 96rem/$rem;
  }

  .topContain img{
    width: 86rem/$rem;
    height: 86rem/$rem;
    box-sizing: border-box;
    padding-right: 30rem/$rem;
  }

  .hotShare{
    /*overflow: auto;*/
    flex: 1;
    box-sizing: border-box;
    /*margin-bottom: 5rem/$rem;*/
    -webkit-overflow-scrolling: touch;
    padding-bottom: 100rem/$rem;
  }
  .header{
    overflow: hidden;
    height: 28rem/$rem;
    line-height: 28rem/$rem;
    box-sizing: border-box;
    padding: 30rem/$rem;
  }
  .more{
    float: right;
  }
  .hot{
    float: left;
  }
  .more img{
    width: 12rem/$rem;
    height: 16rem/$rem;
  }
  .detail{
    display: flex;
    border-bottom: 1px solid gainsboro;
    padding:30rem/$rem;
  }
  .titleImg{
    box-sizing: border-box;
    padding-right: 30rem/$rem;
    padding-top: 10rem/$rem;
  }
  .titleImg img{
    display: block;
    width: 80rem/$rem;
    height: 80rem/$rem;
    border-radius: 40rem/$rem;
  }
  .docMsg{
    flex: 1;
  }
  #bubble{
    margin: 0;
  }
  .easyContain{
    margin-bottom: 20rem/$rem;
  }
  .musicBottom{
    margin-top: 20rem/$rem;
  }
</style>
