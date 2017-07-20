<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="healthFile" ref="healthFile">
           <div>
             <ul>
               <li>
                 <div class="cancelImg">
                   <img src="../../assets/logo.png" alt="">
                 </div>
                 <div class="cancelIntro">
                   <div class="introTitle">
                     <span class="subTitle">王小仙</span>
                     <p>姓名:李冰</p>
                     <p>男 27岁 浙江杭州</p>
                   </div>
                 </div>
               </li>
             </ul>
             <div class="basic">
               <div>
                 基本情况
               </div>
             </div>
             <div class="illness">
               <div>
                 所患疾病
                 <div>
                   <span>精神外科</span><img src="../../../static/img/查看更多.png" alt="">
                 </div>
               </div>
             </div>
             <div class="history">
               <div>
                 既往史
                 <div>
                   <span>无</span>
                   <img src="../../../static/img/查看更多.png" alt="">
                 </div>
               </div>
             </div>
             <div class="family">
               <div>
                 家族史
                 <div>
                   <span>无</span>
                   <img src="../../../static/img/查看更多.png" alt="">
                 </div>
               </div>
             </div>
             <div class="alergic">
               <div>
                 过敏史
                 <div>
                   <span>无</span>
                   <img src="../../../static/img/查看更多.png" alt="">
                 </div>
               </div>
             </div>
             <div class="record">
               <div>
                 诊疗记录
               </div>
             </div>
             <div class="recordList">
               <div class="wrapList">
                 <p class="listTime">2017-13-12</p>
                 <p class="listContent">我最近因为经常在晚上看书，光线又十分不明亮的时候看导致最近视力降的很快</p>
                 <div class="recordImg">
                   <img src="" alt="">
                 </div>
               </div>
             </div>
           </div>

         </div>

    </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  export default{
      data(){
        return{
            title:'健康档案',
            rightTitle:''
        }
      },
      mounted(){
        this.$nextTick(()=>{
            this._initFileScroll()
        })
      },
      methods:{
        _initFileScroll(){
            this.fileScroll = new BScroll(this.$refs.healthFile,{
                click:true
            })
          console.log( this.fileScroll)
        }
      },
      components:{
          'VHeader':header
      }
  }
</script>
<style scoped lang="scss">
  .healthFile{
    width:100%;
    position: fixed;
    top:50px;
    bottom:0;
    left:0;
    right:0;
    /*background-color: green;*/
    ul{
      padding:0;
      margin:0 auto;
      width: 345px;
      height: 102px;
      border-radius: 10px;
      /*background-color: rgb(245,251,251);*/
      li{
        list-style-type: none;
        height: 102px;
        display: flex;
        .cancelImg{
          width: 67px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 15px;
        }
        .cancelIntro{
          flex:2;
          display: flex;
          align-items: center;
          /*line-height: 10px;*/
          .introTitle{
            .subTitle{
              font-size: 16px;
              color: #333333;
            }
            .myDoctor{
              width: 60px;
              height: 18px;
              display: inline-block;
              font-size: 14px;
              /*line-height: 18px;*/
              color: #666666;
              text-align: center;
            }
            p{
              margin:5px 0 5px 0;
              font-size: 13px;
              color: #999999;
            }
          }
        }
        img{
          width: 67px;
          height: 67px;

        }
      }
    }
    .basic,.illness,.history,.family,.alergic,.record{
      width: 100%;
      height: 45px;
      border-top: 1px solid rgb(205,205,205);
      >div{
        width: 345px;
        height: 45px;
        margin:0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >div{
          span{
            font-size: 16px;
            display: inline-block;
            margin-right: 10px;
          }
          img{
            width: 7.5px;
          }
        }
      }
    }
    .basic,.record{
      background-color: rgb(245,245,245);
    }
    .recordList{
      width:100%;
      border-bottom: 1px solid rgb(205,205,205);
      .wrapList{
        width: 345px;
        margin:0 auto;
        .listTime{
          font-size:16px;
          color: #666666;
          margin-top: 15px;
          margin-bottom: 10px;
        }
        .listContent{
          font-size: 14px;
          line-height: 20px;
          color: #666666;
        }
        .recordImg{
          width: 150px;
          height: 150px;
          img{
            width: 150px;
            height: 150px;
          }
        }
      }
    }
  }

</style>
