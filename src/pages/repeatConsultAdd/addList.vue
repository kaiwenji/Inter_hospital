<template>
  <div class="recentChat">
    <v-header :title="title" :rightTitle="rightTitle" @on-addList="listDetail()"></v-header>
    <scroll class="myDoctorList" ref="contactList" :data="followList" :pullup="pullup" @scrollToEnd="scrollToEnd" >
      <div>
        <ul class="border-1px" v-for="item in followList" :key="item.id">
          <router-link tag="div" :to="{path:'/apply',query:{doctorId:item.id,docAvatar:item.docAvatar,docName:item.docName,hosName:item.hosName,deptName:item.deptName,docTitle:item.docTitle}}">
            <li>
              <div class="cancelImg">
                <img :src=" item.docAvatar " alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="followName">{{ item.docName }}</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">我的医生</span>
                  </div>
                  <p>{{ item.hosName }}</p>
                  <p>{{ item.deptName }} {{ item.docTitle }}</p>
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
        <div class="loadMore" v-if="loadingStatus">
                <span class="pullMore">
                   <img src="../../../static/img/loading.gif" alt="">
                   数据加载中...
                </span>
        </div>
      </div>

    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll'
  import header from '../../base/header'
  import api from '../../lib/api'
  export default{
    data(){
      return{
        followList:[],
        title:"复诊加号",
        rightTitle:"我的加号",
        pullup:true,
        listPage:1,
        dataLength:"",
        loadingStatus:true,
      }
    },
    mounted(){

    },
    created(){
      let that = this
      api("smarthos.user.doc.list",{
        pageNum:"1",
        pageSize:"10"
      }).then(function(data){
        for(var i=0;i<data.list.length; i++){
          that.followList.push(data.list[i])
        }
      })
    },
    methods:{
      scrollToEnd(){
          if (this.preventRepeatRequest) {
            return
          }
          this.loadingStatus = true
          this.preventRepeatRequest = true;
          this.listPage +=1;
          let that = this
          let token = localStorage.getItem("token")
          api("smarthos.user.doc.list",{
            pageNum:that.listPage,
            pageSize:"10"
          }).then((data)=>{
            for(var i=0;i<data.list.length; i++){
              that.followList.push(data.list[i])
            }
            this.loadingStatus = false
            that.dataLength = data.list.length
            if(data.list.length >= 10){
              this.preventRepeatRequest = false;
            }
          })
        },
        listDetail(){
          this.$router.push({
            name:"myAddList"
          })
      }


    },
    components:{
        "VHeader":header,
         Scroll
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  @import '../../common/mixin.scss';
  .recentChat{
    width:100%;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
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
    .loadMore{
      display: flex;
      justify-content: center;
      align-items: center;
      span.pullMore{
        display: flex;
        align-items: center;
        font-size: 12px;
        img{
          width: 16px;
          height: 16px;
          margin-right: 5px;
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
          width: 104rem/$rem;
          height: 104rem/$rem;
          border-radius: 50%;
        }
      }
    }
  }
</style>
