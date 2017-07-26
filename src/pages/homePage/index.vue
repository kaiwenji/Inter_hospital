<template>
    <div class="wrap">
      <div class="title">
        <lunbo :imgList="imgList"></lunbo>
      </div>
      <div class="contain mainColor">
        <div class="leftContain">
          <div>
            <img src="../../../static/img/eye.png" alt="">
          </div>
          <div class="bf">
             大眼预诊
          </div>
          <div class="mfc">
            预诊快速响应
          </div>
        </div>
        <div class="rightContain">
          <div class="topContain">
            <div>
              <img src="../../../static/img/nv.png" alt="">
            </div>
            <div>
              <p class="bf">眼底快速预约</p>
              <p class="mfc">15分钟快速预约</p>
            </div>
          </div>
          <div class="bottomContain">
            <div class="fameDoc">
              <div>
                <img class="fameDocImg" src="../../../static/img/msg.png" alt="">
              </div>
              <div class="bf">
                名医预约
              </div>
            </div>
            <div class="myDoc">
              <div>
                <img class="myDocImg" src="../../../static/img/myDoc.png" alt="">
              </div>
              <div class="bf" @click="goMy">
                我的医生
              </div>
            </div>
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
            <div>
              <span  class="mf">
                {{item.snsKnowledge.description.substring(0,35)}}......
              </span>
            </div>
            <bubble ref="bubble" id="bubble" :src="item.snsKnowledge.knowUrl"></bubble>
            <div class="ft">
              <p class="s">{{item.snsKnowledge.createTime | Todate}}</p>
              <p class="right s">{{item.snsKnowledge.readNum}}人听过</p>
              <p class="right s" id="thumb"><img class="icon" src="../../../static/img/rec_off.png">{{item.snsKnowledge.likes}}</p>
            </div>
          </div>
        </div>
      </div>
      <footers></footers>
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
    var token = localStorage.getItem('token')
    export default{
        components: {
            top,
            lunbo,
          Bubble,
          footers
        },
      filters:{
        Todate
      },
        data(){
            return {
              imgList:[],
              obj:{},
              knowledge:[]
            }
        },
        mounted(){
          this.getData();
        },
      methods:{
        getData(){
          api('smarthos.user.pat.index',{
            token:token
          }).then(res=>{
            console.log(res,6666)
            if(res.succ){
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
   height: 340rem/$rem;
 }
  .contain{
    width: 100%;
    height: 362rem/$rem;
    display: flex;
    margin-bottom: 20rem/$rem;
  }
  .leftContain{
    width: 278rem/$rem;
    height: 362rem/$rem;
    border-right: 1px solid gainsboro;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .leftContain img{
    display: block;
    width: 96rem/$rem;
    height: 96rem/$rem;
  }
  .rightContain{
    height: 362rem/$rem;
    width: 472rem/$rem;
   display: flex;
    flex-direction: column;
  }
  .topContain{
    width: 100%;
    height: 180rem/$rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid gainsboro;
  }
  .topContain img{
    width: 86rem/$rem;
    height: 86rem/$rem;
    box-sizing: border-box;
    padding-right: 30rem/$rem;
  }
  .bottomContain{
    display: flex;
    flex: 1;
  }
  .fameDoc{
    flex: 1;
    border-right: 1px solid gainsboro;
    display: flex;
    flex-direction:column ;
    justify-content: center;
    align-items: center;
  }
  .myDoc{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .fameDocImg{
    width: 60rem/$rem;
    height: 60rem/$rem;
  }
  .myDocImg{
    width: 60rem/$rem;
    height: 60rem/$rem;
  }
  .hotShare{
    overflow: auto;
    flex: 1;
    box-sizing: border-box;
    /*margin-bottom: 5rem/$rem;*/
    -webkit-overflow-scrolling: touch;
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
</style>
