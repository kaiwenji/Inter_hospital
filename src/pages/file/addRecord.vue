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
          <img src="../../../static/img/添加图片.png" alt="">
          <div class="uploadTip">
              <h3>添加图片</h3>
              <h5>上传相关照片</h5>
          </div>
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
        title:'添加病历',
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
        display: flex;
        align-items: center;
        img{
          width: 140rem/$rem;
          height: 140rem/$rem;
          display: inline-block;
          margin-top: 30rem/$rem;
          margin-right: 24rem/$rem;
        }
        div.uploadTip{
          margin-left: 30rem/$rem;
          h3{
            font-size: 28rem/$rem;
            color: #333333;
            font-weight: normal;
          }
          h5{
            font-size: 24rem/$rem;
            color: #999999;
            margin-top: 20rem/$rem;
            font-weight: normal;
          }
        }
      }
    }

  }
</style>
