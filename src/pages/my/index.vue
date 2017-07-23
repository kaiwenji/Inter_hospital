<template>
    <div class="page">
      <div class="title">
        <div class="my">
          <div> <span class="myCol">我的</span> </div>
          <div class="myImg">
            <img src="../../../static/img/msg.png" alt="">
            <span class="weui-badge sf" style="position: absolute;top: -.6em;right: -.6em;">8</span>
          </div>
        </div>
        <div class="titleImg">
          <img src="../../../static/img/psb.jpg" alt="" @click="upLoad">
        </div>
        <div class="name">
          <span>小李</span>
        </div>
      </div>
      <div class="mainColor ">
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"><img src="../../../static/img/jiuzhen.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
          <div class="weui-cell__bd">
            <p class="bf">&nbsp;&nbsp;常用就诊人</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"><img src="../../../static/img/guahao.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
          <div class="weui-cell__bd">
            <p class="bf">&nbsp;&nbsp;我的挂号</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"><img src="../../../static/img/jiahao.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
          <div class="weui-cell__bd">
            <p class="bf">&nbsp;&nbsp;我的加号</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
      <div class="weui-cells ">
        <a @click="goHealthRecord" class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"><img src="../../../static/img/jiankang.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
          <div class="weui-cell__bd">
            <p class="bf">&nbsp;&nbsp;健康档案</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
      <div class="weui-cells ">
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"><img src="../../../static/img/account.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
          <div class="weui-cell__bd">
            <p class="bf">&nbsp;&nbsp;账户相关</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"><img src="../../../static/img/new.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
          <div class="weui-cell__bd">
            <p class="bf">&nbsp;&nbsp;检查新版本</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"><img src="../../../static/img/about.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
          <div class="weui-cell__bd">
            <p class="bf">&nbsp;&nbsp;关于</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
      <transition name="f">
      <div class="boxShaw" v-show="showShaw" @click="cancel">
          <div class="bottom">
            <div class="cell mfc">更换头像</div>
            <div class="cell photo" @click.stop="goPhoto">相册</div>
            <div class="cancel" @click="cancel">取消</div>
          </div>
      </div>
      </transition>
    </div>

</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    export default{
        components: {
            top
        },
        data(){
            return {
              showShaw:false
            }
        },
        mounted(){

        },
      methods:{
        upLoad(){
        this.$set(this.$data,'showShaw',true)
        },
        cancel(){
          this.$set(this.$data,'showShaw',false)
        },
        goPhoto(){
          console.log(123)
        },
        goHealthRecord(){
          this.$router.push({
            name:'healthRecord'
          })
        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../../common/public.scss';
    .f-enter-active {
      .bottom{
        transition: height .5s ease;
      }
    transition: all .5s ease;
    }
    .f-enter ,.f-leave-to {
      .bottom{
        height: 0;
      }
    }
.page{
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
}
  .title{
    width: 100%;
    height: 440rem/$rem;
    background: #4bcec8;
  }
  .my{
    width: 100%;
    margin-top: 60rem/$rem;
    text-align: center;
    position: relative;
    margin-bottom: 60rem/$rem;
  }
  .myCol{
    color: white;
    font-size: 36rem/$rem;

  }
  .myImg{
   position: absolute;
    top:10rem/$rem;
    right: 40rem/$rem;
  }
  .myImg img{
    width: 55rem/$rem;
    height: 50rem/$rem;
  }
  .titleImg{
    margin: 0 auto ;
    width: 134rem/$rem;
    height: 134rem/$rem;
  }
  .titleImg img{
    width: 134rem/$rem;
    height: 134rem/$rem;
    border-radius: 67rem/$rem;
  }
  .name{
    width: 100%;
    text-align: center;
    margin-top: 30rem/$rem;
    font-size: 36rem/$rem;
    color:white;
  }
    .boxShaw{
      position: absolute;
      left: 0;
      top:0;
      right: 0;
      border-bottom: 0;
      height: 100%;
      background: rgba(0,0,0,.2);
      z-index: 111;
    }
  .bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 666;
    height: 300rem/$rem;

  }
    .cell{
      width: 100%;
      text-align: center;
      background: white;
      padding: 20rem/$rem 0;
      border-bottom: 1px solid gainsboro;
    }
    .cancel{
      width: 100%;
      text-align: center;
      background: white;
      margin-top: 20rem/$rem;
      padding: 20rem/$rem 0;
      font-size: 32rem/$rem;
    }
  .photo{
    font-size: 32rem/$rem;
    color: #0aace9;
  }

</style>
