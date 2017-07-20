<template>
    <div>
        <v-header :title="title" :rightTitle="rightTitle"></v-header>
        <div class="recordDetail">
           <div class="wrapTime">
               <div class="timeCenter">
                 日期
                 <div>
                     2017-13-12
                     <img src="../../../static/img/查看更多.png" alt="">
                 </div>
               </div>
           </div>
          <div class="wrapInput">
             <div class="inputTitle">
                 请输入病历详情
             </div>
          </div>
          <div class="wrapText">
            <div>
              <textarea placeholder="请详细描述您的症状、疾病和身体情况。(请放心您的个人信息不会泄露)"></textarea>
            </div>
          </div>
          <div class="wrapImg">
              <div>
                <img src="" alt="">
                <img src="" alt="">
              </div>
          </div>
        </div>
    </div>
</template>
<script>
  import header from '../../base/header'
  export default{
      data(){
          return{
            title:'病历详情',
            rightTitle:'保存'
          }
      },
      components:{
          'VHeader':header
      }
  }
</script>
<style scoped lang="scss">
.recordDetail{
  width:100%;
  position: fixed;
  top: 50px;
  bottom:0;
  left:0;
  right:0;
  /*background-color: green;*/
  .wrapTime{
    width:100%;
    height: 45px;
    border-bottom: 1px solid rgb(205,205,205);
    .timeCenter{
      width: 345px;
      height: 45px;
      margin:0 auto;
      display: flex;
      align-items:center;
      justify-content: space-between;
      >div{
        font-size: 16px;
        color: #333333;
        img{
          width: 7.5px;
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
  }
  .wrapInput{
    width:100%;
    height:45px;
    border-bottom: 1px solid rgb(205,205,205);
    .inputTitle{
      width: 345px;
      height: 45px;
      line-height: 45px;
      margin:0 auto;
      font-size: 16px;
      color: #333333;
    }
  }
  .wrapText{
    width:100%;
    height: 150px;
    border-bottom: 1px solid rgb(205,205,205);
    >div{
      width: 345px;
      margin:0 auto;
      textarea{
        width: 345px;
        height: 150px;
        resize: none;
        border:none;
        outline:medium;
        padding-top: 15px;
        font-size: 14px;
        line-height: 21px;
        color: #999999;
        box-sizing: border-box;
      }
    }
  }
  .wrapImg{
    width:100%;
    >div{
      width:345px;
      margin: 0 auto;
      img{
        width: 70px;
        height: 70px;
        display: inline-block;
        margin-top: 15px;
        margin-right: 12px;
      }
    }
  }
}
</style>
