<template>
    <div class="recentChat">
      <div class="myDoctorList" ref="contactList" v-if="waitLoading == 1 && chatList.length > 0">
        <div>
          <ul  class="border-1px" v-for="item in chatList">
            <router-link tag="div" :to="{path:'/chat',query:{docAvatar:item.userDoc.docAvatar,docName:item.userDoc.docName,followId:item.followMessage.followId}}">
              <li>
                <div class="cancelImg">
                  <img :src=" item.userDoc.docAvatar " alt="">
                </div>
                <div class="cancelIntro">
                  <div>
                    <span class="chatDoctor">{{ item.userDoc.docName }}</span> <span class="doctorTitle">{{ item.userDoc.docTitle }}</span>
                    <div class="badgeDoc">
                      <span class="myDoctor">我的医生</span>
                    </div>
                    <p>您的全科分诊已经开始，点击进入</p>
                  </div>
                </div>
                <div class="cancelTime">
                  <div >
                    <span class="year">2017/4/29</span>
                    <p class="time"><span class="badge">1</span></p>
                  </div>
                </div>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="myDoctorList" v-else-if="waitLoading == 1 && chatList.length == 0">
        <div class="emptyHistory">
          <span> 您还没有与医生进行聊天的记录</span>
        </div>
      </div>
      <div class="myDoctorList" v-else>
        <div class="emptyHistory">
          <loading></loading>
        </div>
      </div>
        <div class="loading-container" v-show="chatList.length == 0">

        </div>
        <v-mask  v-show="chatList.length == 0"></v-mask>

    </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import Loading from '../../base/loading/loading'
  import VMask from '../../base/mask'
  import Footers from '../../business/app-footer'
  export default{
      data(){
        return{
          showList:true,
          chatList:[],
          waitLoading:0
        }
      },
      created(){
        let that = this
        api("smarthos.follow.message.last.list",{
          "token":localStorage.getItem('token'),
        }).then((data)=>{
            if(data.code == 0){
               that.waitLoading = 1
              that.chatList = data.list
              console.log(data)
              console.log(that.chatList)
            }
        })
      },
      methods:{
          _initRecentChat(){
            this.doctorListScroll = new BScroll(this.$refs.contactList,{
              click:true
            })
          },
      },
      watch:{
        chatList(){
          this.$nextTick(()=>{
            this._initRecentChat()
          })
        }
      },
      components:{
          Loading,
          "VMask":VMask,
        Footers
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  @import '../../common/var.scss';
  @import '../../common/mixin.scss';

.recentChat{
  width:100%;
  position: fixed;
  top: 90px;
  bottom:0;
  left:0;
  right:0;
}
.myDoctorList{
  width:100%;
  position: fixed;
  top: 90px;
  bottom:0;
  left:0;
  right:0;
  z-index:1;
  background-color: white;
  .emptyHistory{
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      display: inline;
      >div{
        color:#0FBDFF;
        display: inline;
      }
    }
  }
  ul{
    padding:0;
    margin:0;
    height: 180rem/$rem;
    li{
      list-style-type: none;
      height: 180rem/$rem;
      display: flex;
      .cancelImg{
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .cancelIntro{
        flex:2;
        display: flex;
        align-items: center;
        line-height: 40rem/$rem;
        .badgeDoc{
          display: inline-block;
          padding-top: -5px;
          .myDoctor{
            width: 120rem/$rem;
            height: 36rem/$rem;
            background-color: darkturquoise;
            border-radius:5px;
            display: inline-block;
            font-size: 10px;
            color: white;
            line-height: 40rem/$rem;
            text-align: center;
          }
        }
        p{
          margin:0;
          color: #999999;
          font-size: 28rem/$rem;
        }
        span.chatDoctor{
          font-size: 32rem/$rem;
          color: #333333;
        }
        span.doctorTitle{
          font-size: 28rem/$rem;
          color: #666666;
        }
      }
      .cancelTime{
        flex:1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20rem/$rem;
        span.year{
          font-size: 14px;
          color: #999999;
        }
        p.time{
          margin:0;
          text-align: right;
          span.badge{
            display: inline-block;
            top:0;
            width: 30rem/$rem;
            height: 30rem/$rem;
            border-radius: 50%;
            background-color: red;
            color: white;
            text-align: center;
            font-size: 14px;
            line-height: 15px;
          }
        }
      }
      img{
        width: 80rem/$rem;
        height: 80rem/$rem;
        border-radius: 50%;
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
