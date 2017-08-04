<template>
  <div class="recentChat">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <scroll class="myDoctorList" ref="contactList" :data="addList" v-if="tempDisplay == 1 && addList.length > 0 ">
      <div>
        <ul  v-for="(item,index) in addList" class="border-1px" >

            <router-link tag="div" :to="{path:'/myAddList/myApplyDetail',query:{id:item.id}}">
              <li>
              <div class="cancelImg">
                <img :src="item.docAvatar" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="addName">{{ item.docName }}</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">主任医生</span>
                  </div>
                  <p>发起时间:{{ item.createTime }}</p>
                </div>
              </div>
              <div class="cancelTime">
                <div class="forArrow">
                <span v-if="item.numStatus =='APPLYING'" class="applying">
                   申请中<img src="../../../static/img/查看更多.png" alt="">
                </span>
                  <span v-else-if="item.numStatus =='AGREED'" class="agreed">
                   已同意<img src="../../../static/img/查看更多.png" alt="">
                </span>
                  <span v-else="item.numStatus =='REFUSED'" class="refused">
                   已拒绝<img src="../../../static/img/查看更多.png" alt="">
                </span>
                </div>
              </div>
              </li>
            </router-link>


        </ul>

      </div>

    </scroll>
    <div v-else-if="tempDisplay == 1 && addList.length == 0" class="myDoctorList">
      <div class="emptyHistory">
        <span> 您还没有申请历史，快去<router-link tag="div" to="/apply">预约申请</router-link>吧</span>
      </div>
    </div>
    <div v-else class="myDoctorList">
      <div class="emptyHistory">
        <loading></loading>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
//  import BScroll from 'better-scroll'
  import Scroll from  '../../base/scroll'
  import api from '../../lib/api'
  import header from '../../base/header'
  import Loading from '../../base/loading/loading'
  import { formatDate } from '../../utils/formatTimeStamp.js'
  export default{
    data(){
        return{
           title:'我的加号',
           rightTitle:'',
           addList:[],
           pathMap:[],
           tempDisplay:0,
           thisDestination:""
        }
    },
    created(){
      let that = this
      api("smarthos.appointment.list",{
          token:localStorage.getItem("token"),
          numStatus:""
      }).then((data)=>{
          if(data.code == 0){
            this.tempDisplay = 1
            that.addList = data.list
//            var pathArray = new Array()
            for(var i=0;i<data.list.length;i++){
              var d = new Array()
              d[i] = formatDate (new Date(data.list[i].createTime))
              data.list[i].createTime = d[i]

//              var destination
//              if(data.list[i].numStatus == "APPLYING"){
//                pathArray.push("/myAddList/myAddApply")
//              }else if(data.list[i].numStatus == "AGREED"){
//                pathArray.push("/myAddList/myAddSuccess")
//              }else{
//                pathArray.push("/myAddList/myAddRefuse")
//              }

            }
//            that.pathMap = pathArray
          }else{
              this.$weui.alert("网络错误")
          }

      })
    },
    mounted(){
      this.$nextTick(()=>{
//        this._initRecentChat()
      })
    },
    methods:{
      goRefuse(){
        this.$router.push('/myAddList/myAddRefuse')
      },
      goApply(){
        this.$router.push('/myAddList/myAddApply')
      },
      _initRecentChat(){
        this.doctorListScroll = new BScroll(this.$refs.contactList,{
          click:true
        })
      }
    },
    components:{
        'VHeader':header,
         Scroll,
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
    top: 0;
    bottom:0;
    left:0;
    right:0;
    z-index:20;
  }
  .myDoctorList{
    width:100%;
    position: fixed;
    top: 50px;
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
      height: 174rem/$rem;
      /*border-top: 1px solid rgb(205,205,205);*/
      li{
        list-style-type: none;
        height: 174rem/$rem;
        display: flex;
        .cancelImg{
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cancelIntro{
          flex:2;
          display: flex;
          align-items: center;
          line-height: 25px;
          .badgeDoc{
            display: inline-block;
            padding-top: -5px;
            .myDoctor{
              width: 120rem/$rem;
              height: 36rem/$rem;
              background-color: #F8985C;
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
            color: #666666;
            font-size: 14px;
          }
          span.addName{
            color: #000;
          }
        }
        .cancelTime{
          flex:1;
          .forArrow{
            display: flex;
            height: 100px;
            align-items: center;
            justify-content: flex-end;
            margin-right: 12px;
            .applying{
              color: #FF8686;
            }
            .agreed{
              color: #4BCEC8;
            }
            .refused{
              color: #b6b6b6;
            }
            span{
              display: inline-block;
              text-align: right;
              font-size: 12px;
              color: #4BCEC8;
              img{
                width: 8px;
                height: 12px;
                margin-left: 20rem/$rem;
              }
            }
          }
        }
        img{
          width: 104rem/$rem;
          height: 104rem/$rem;
          border-radius: 50%;
        }
      }
    }
  }
</style>
