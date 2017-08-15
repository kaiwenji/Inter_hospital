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
          <div class="logPeople">
              <p>2016/7/19 由陈丽英添加</p>
          </div>
          <div class="addFile">
            <div class="button">
              <button>删除</button>
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
  @import '../../common/public.scss';
.recordDetail{
  width:100%;
  position: fixed;
  top: 50px;
  bottom:0;
  left:0;
  right:0;
  background-color: white;
  .wrapTime{
    width:100%;
    height: 90rem/$rem;
    border-bottom: 1px solid rgb(205,205,205);
    .timeCenter{
      width: 690rem/$rem;
      height: 90rem/$rem;
      margin:0 auto;
      display: flex;
      align-items:center;
      font-size: 32rem/$rem;
      color: #333333;
      justify-content: space-between;
      >div{
        font-size: 32rem/$rem;
        color: #333333;
        img{
          width: 15rem/$rem;
          display: inline-block;
          margin-left: 20rem/$rem;
        }
      }
    }
  }
  .wrapInput{
    width:100%;
    height: 90rem $rem;
    border-bottom: 1px solid rgb(205,205,205);
    .inputTitle{
      width: 690rem/$rem;
      height: 90rem/$rem;
      line-height: 90rem/$rem;
      margin:0 auto;
      font-size: 32rem/$rem;
      color: #333333;
    }
  }
  .wrapText{
    width:100%;
    height: 300rem/$rem;
    border-bottom: 1px solid rgb(205,205,205);
    >div{
      width: 690rem/$rem;
      margin:0 auto;
      textarea{
        width: 690rem/$rem;
        height: 300rem/$rem;
        resize: none;
        border:none;
        outline:medium;
        padding-top: 30rem/$rem;
        font-size: 28rem/$rem;
        line-height: 42rem/$rem;
        color: #999999;
        box-sizing: border-box;
      }
    }
  }
  .wrapImg{
    width:100%;
    >div{
      width: 690rem/$rem;
      margin: 0 auto;
      img{
        width: 140rem/$rem;
        height: 140rem/$rem;
        display: inline-block;
        margin-top: 30rem/$rem;
        margin-right: 24rem/$rem;
      }
    }
  }
  .logPeople{
    width:100%;
    height: 80px;
    /*background-color: #E64340;*/
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 180rem/$rem;
    p{
      color: #999999;
      font-size: 28rem/$rem;
    }
  }
  .addFile{
    width:100%;
    height: 100px;
    position: fixed;
    bottom: 30rem/$rem;
    /*margin-top: 100px;*/
    /*margin-bottom: 50px;*/
    /*background-color: #0FBDFF;*/
    display: flex;
    justify-content: center;
    div.button{
      width: 690rem/$rem;
      height: 94rem/$rem;
      /*background-color: #E64340;*/
      button{
        width: 690rem/$rem;
        height: 94rem/$rem;
        border:none;
        outline: medium;
        border-radius: 10px;
        color: #FDFDFD;
        font-size:36rem/$rem;
        background-color: #FF8588;
      }
    }
  }
}
</style>
