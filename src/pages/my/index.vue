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
          <img :src="patAvatar" alt="" @click="upLoad">
        </div>
        <div class="name">
          <span>小李</span>
        </div>
      </div>
      <div class="wrap">
        <div class="mainColor ">
          <div class="weui-cells ">
          <a @click="goUsers" class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__hd"><img src="../../../static/img/jiuzhen.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd">
              <p class="bf">&nbsp;&nbsp;常用就诊人</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
          <a @click="goRegistration" class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__hd"><img src="../../../static/img/guahao.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd">
              <p class="bf">&nbsp;&nbsp;我的挂号</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
          <a @click="myAdd" class="weui-cell weui-cell_access" href="javascript:;" >
            <div class="weui-cell__hd"><img src="../../../static/img/jiahao.png" alt="" style="width:25px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd">
              <p class="bf">&nbsp;&nbsp;我的加号</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
            </div>
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
          <a @click="goAccountAbout" class="weui-cell weui-cell_access" href="javascript:;">
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
      </div>

      <transition name="f">
      <div class="boxShaw" v-show="showShaw" @click="cancel">
          <div class="bottom">
            <div class="cell mfc">更换头像</div>
            <div class="cell photo">
              <label for="uploaderInput">相册</label>
              <input @change="upLoadImg" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" />
            </div>
            <div class="cancel" @click="cancel">取消</div>
          </div>
      </div>
      </transition>
      <div class="bottemFooter">
        <footers index="2"></footers>
      </div>

    </div>

</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import footers from '../../business/app-footer.vue'
    import ajax from '../../lib/ajax'
//    var token  = localStorage.getItem('token')
//    var patAvatar  = localStorage.getItem('patAvatar')
    import api from '../../lib/api'
    export default{
        components: {
            top,
          footers
        },
        data(){
            return {
              token:localStorage.getItem('token'),
              showShaw:false,
              patAvatar:localStorage.getItem('patAvatar')
            }
        },
        mounted(){
//          this.getData()
        },
      methods:{
        goRegistration(){
          this.$router.push({
            name:"myRegistration"
          })
        },
        getData(){
          api("smarthos.user.pat.infomation.modify",{
            token:this.token,
            patAvatar:this.patAvatar
          }).then(res=>{
            console.log(res,111111)
            if(res.succ){

            }else {
              this.$weui.alert(res.msg)
            }
          })
        },
        goUsers(){
          this.$router.push({
            name:'users'
          })
        },
        myAdd(){
          this.$router.push({
            name:"myAddList"
          })
        },
        upLoad(){
        this.$set(this.$data,'showShaw',true)
        },
        cancel(){
          this.$set(this.$data,'showShaw',false)
        },
        upLoadImg(e){
          console.log(e)
          e.stopPropagation();
          var files = e.target.files[0]
          ajax(files,{},'PAT','IMAGE').then(data=>{
            if(data.succ){
              console.log(data)
//              this.attaId = data.obj.attaId;
              console.log(data.obj.attaFileUrl)
              this.$set(this.$data,'patAvatar',data.obj.attaFileUrl);
              localStorage.setItem('patAvatar',data.obj.attaFileUrl)
              this.getData()
            }else {
              this.$weui.alert(data.msg)
            }
          })
        },
        goHealthRecord(){
          this.$router.push({
            name:'healthRecord'
          })
        },
        goAccountAbout(){
          this.$router.push({
            name:'accountAbout'
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
  position: fixed;
  top:0;
  bottom:98rem/$rem;
  z-index:100;
  background-color: white;
  flex-direction: column;
  width: 100%;
}
.wrap{
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
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
  .bottemFooter{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
    .weui-cells{
     overflow: visible;
    }
    .weui-cells:after{
      border-bottom: 1px solid gainsboro;
    }



</style>
