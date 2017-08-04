<template>
  <div class="recentChat">
    <div class="myDoctorList" ref="contactList" v-if="tempwait == 1 && followList.length > 0">
      <div>
        <ul class="border-1px" v-for="item in followList">
          <router-link tag="div" :to="{name:'doctor',params:{id:item.userDocVO.id}} ">
            <li>
              <div class="cancelImg">
                <img :src=" item.userDocVO.docAvatar " alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="followName">{{ item.userDocVO.docName }}</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">我的医生</span>
                  </div>
                  <p>{{ item.userDocVO.hosName }}</p>
                  <p>{{ item.userDocVO.deptName }} {{ item.userDocVO.docTitle }}</p>
                </div>
              </div>
              <div class="cancelTime">
                <div class="forArrow">
                <span>
                   <img src="../../../static/img/查看更多.png" alt="">
                </span>
                </div>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="myDoctorList" v-else-if="tempwait == 1 && followList.length == 0">
      <div class="emptyHistory">
        <span>您还没有关注任何医生</span>
      </div>
    </div>
    <div class="myDoctorList" v-else>
      <div class="emptyHistory">
        <loading></loading>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Loading from '../../base/loading/loading'
  import api from '../../lib/api'
  export default{
    data(){
        return{
          followList:[],
          tempwait:0
        }
    },
    created(){
      let that = this
      api("smarthos.follow.docpat.list",{
        token:localStorage.getItem('token'),
      }).then(function(data){
         if(data.code == 0){
            that.tempwait = 1
           that.followList = data.list
           console.log(that.followList)
         }
      })
    },
    watch:{
      followList(){
        this.$nextTick(()=>{
          this._initRecentChat()
        })
      }
    },
    methods:{
      _initRecentChat(){
        this.doctorListScroll = new BScroll(this.$refs.contactList,{
          click:true
        })
      }
    },
    components:{
        Loading
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
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
      height: 200rem/$rem;
      /*border-bottom: 1px solid rgb(205,205,205);*/
      li{
        list-style-type: none;
        height: 200rem/$rem;
        display: flex;
        .cancelImg{
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cancelIntro{
          flex:2;
          display: flex;
          align-items: center;
          line-height: 25px;
          .followName{
            font-size: 16px;
          }
          .badgeDoc{
            display: inline-block;
            padding-top: -5px;
            .myDoctor{
              width: 60px;
              height: 18px;
              background-color: darkturquoise;
              border-radius:5px;
              display: inline-block;
              font-size: 10px;
              color: white;
              line-height: 18px;
              text-align: center;
            }
          }
          p{
            margin:0;
            color: #999999;
            font-size: 14px;
          }
          span{

          }
        }
        .cancelTime{
          flex:1;
          .forArrow{
            display: flex;
            height: 200rem/$rem;
            align-items: center;
            justify-content: flex-end;
            margin-right: 12px;
            span{
              display: inline-block;
              text-align: right;
              img{
                width: 8px;
                height: 12px;
              }
            }
          }
        }
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
