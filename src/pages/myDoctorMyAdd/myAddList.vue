<template>
  <div class="recentChat">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="myDoctorList" ref="contactList">
      <div>
        <ul @click="goSuccess">
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span class="addName">武松</span>
                <div class="badgeDoc">
                  <span class="myDoctor">主任医生</span>
                </div>
                <p>发起时间:2017-06-08 9:13</p>
              </div>
            </div>
            <div class="cancelTime">
              <div class="forArrow">
                <span>
                   已同意<img src="../../../static/img/查看更多.png" alt="">
                </span>
              </div>
            </div>
          </li>
        </ul>
        <ul @click="goRefuse">
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>武松</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>发起时间:2017-06-08 9:13</p>
              </div>
            </div>
            <div class="cancelTime">
              <div class="forArrow">
                <span>
                   已拒绝<img src="../../../static/img/查看更多.png" alt="">
                </span>
              </div>
            </div>
          </li>
        </ul>
        <ul @click="goApply">
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>武松</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>发起时间:2017-06-08 9:13</p>
              </div>
            </div>
            <div class="cancelTime">
              <div class="forArrow">
                <span>
                   申请中<img src="../../../static/img/查看更多.png" alt="">
                </span>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>武松</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>武松</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>武松</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>武松</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>王小仙</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>王小仙</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>王小仙</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>王小仙</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>王小仙</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>王小仙</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
        <ul>
          <li>
            <div class="cancelImg">
              <img src="../../assets/logo.png" alt="">
            </div>
            <div class="cancelIntro">
              <div>
                <span>王小仙</span>
                <div class="badgeDoc">
                  <span class="myDoctor">我的医生</span>
                </div>
                <p>浙江大学附属第二人民医院</p>
                <p>急诊外科 副主任医生</p>
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
        </ul>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import header from '../../base/header'
  export default{
    data(){
        return{
           title:'我的加号',
           rightTitle:''
        }
    },
    mounted(){
      this.$nextTick(()=>{
        this._initRecentChat()
      })
    },
    methods:{
      goSuccess(){
        this.$router.push('/myAddList/myAddSuccess')
      },
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
        'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .recentChat{
    width:100%;
    position: fixed;
    top: 50px;
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
    /*background-color: green;*/
    ul{
      padding:0;
      margin:0;
      height: 174rem/$rem;
      border-top: 1px solid rgb(205,205,205);
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
