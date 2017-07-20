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
        <div class="detail" v-for="item of 5">
          <div class="titleImg">
            <img src="../../../static/img/psb.jpg" alt="">
          </div>
          <div class="docMsg">
            <div><span class="bf">李康飞</span><span class="mfc">&nbsp;&nbsp;&nbsp;主任医师</span></div>
            <div>
              <span class="mfc">昨天 20:00</span>
            </div>
            <div>
              <span  class="mf">
                今天天气好晴朗，处处好风光，好风光，花儿忙，鸟儿也忙,大家都忙......
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import rdSwipe from '../../../node_modules/vue-slide/vue-slide.vue'
  import lunbo from '../../business/lunbo.vue'
    import top from '../../business/app-header.vue'
    export default{
        components: {
            top,
          lunbo
        },
        data(){
            return {
              imgList:[
                "http://covteam.u.qiniudn.com/test18.jpg",
                "http://covteam.u.qiniudn.com/test19.jpg",
                "http://covteam.u.qiniudn.com/test20.jpg",
                "http://covteam.u.qiniudn.com/test20.jpg",
                "http://covteam.u.qiniudn.com/test20.jpg",
              ]
            }
        },
        mounted(){

        },
      methods:{
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
    margin-bottom: 100rem/$rem;
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
</style>
