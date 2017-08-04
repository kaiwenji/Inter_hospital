<template>
    <div id="onlinepage">
        <top @click="goMy">
            <div slot="left"><span>&#xe600;</span></div>
            <div class="middle big">常用就诊人</div>
            <span slot="right" class="add" @click="goAddUser">添加</span>
        </top>
      <div v-show="!showLoading" ref="wrapper"  class="wrap">
        <!--<div class="patMassage">-->
          <!--<div class="weui-cells" @click="goEditUser()">-->
            <!--<a class="weui-cell weui-cell_access" href="javascript:;">-->
              <!--<div class="weui-cell__bd">-->
                <!--<div class="detail">-->
                  <!--<div class="name">-->
                    <!--<ul>-->
                      <!--<li>李康飞 &nbsp;&nbsp;<span>男&nbsp;&nbsp;22</span></li>-->
                      <!--<li>手机号 : 13522365145</li>-->
                      <!--<li>身份证号 : 410425199212183539</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="weui-cell__ft">-->
              <!--</div>-->
            <!--</a>-->
          <!--</div>-->
        <!--</div>-->
        <div>
          <left-swipe :list="list"  v-on:getData="getData">
            <template slot="item" scope="props">
              <div class="swipe" >
                <p class="bf">{{ props.add }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label class="bfc">{{props.commpatGender=='M'?'男':'女'}} &nbsp;&nbsp;&nbsp; {{props.age}}</label></p>
                <p class="bf"> 身份证号： <label  class="bfc">{{ props.identity }} </label></p>
                <p class="bf"> 电话号码： <label  class="bfc">{{ props.phone }}</label></p>
              </div>
            </template>
          </left-swipe>
        </div>

      </div>
      <My-loading v-show="showLoading" class="myLoading"></My-loading>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import leftSwipe from '../../base/leftSwipe.vue'
    import  BScroll from 'better-scroll'
    import api from '../../lib/api'
    import MyLoading from "../../base/loading/loading.vue";
//    var token = localStorage.getItem('token')
    export default{
        components: {
            top,
          leftSwipe,
          MyLoading
        },
        data(){
            return {
              list:[],
              patId:"",
              showLoading:true,
              token : localStorage.getItem('token')
            }
        },
        mounted(){
        this.initScroll()
          this.getData();
        },
      watch:{
        list(){
          this.$nextTick(()=> {
            this.initScroll()
          })
        }
      },
      methods:{
        goMy(){
          console.log('111111')
          this.$router.push('my')
        },

        initScroll(){
            this.scroll = new BScroll(this.$refs.wrapper,{
              click:true,
              probeType: 1,
              bounce: true
            });
            console.log(this.scroll)
        },
        getData(){
          api('smarthos.user.commpat.list',{
            token:this.token
          }).then(res=>{
            console.log(res,66666);
            if(res.succ){
              this.$set(this.$data,'showLoading',false)
              this.$set(this.$data,'list',res.list)
            }else {
              this.$weui.alert('获取失败')
            }
          })
        },
        goAddUser(){
          if(this.list.length>5){
            this.$weui.alert('最多添加5个就诊人')
          }else {
            this.$router.push({
              name:'addUser'
            })
          }

        },

      }
    }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_33qiq29sp5y7gb9.woff') format('woff'),
  }
  span{
    font-family: 'iconfont';
    font-size: 18px;
  }
  #onlinepage{
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: white;
    height: 100%;
  }
  .wrap{
    -webkit-overflow-scrolling: touch;
    flex: 1;
    overflow: auto;
    /*margin-top: 30rem/$rem 10rem/$rem 20rem/$rem 10rem/$rem;*/
    position: fixed;
    width: 100%;
    left: 0;
   right: 0;
    bottom: 0;
    top:88rem/$rem;
  }
  .swipe{
    float: left;
    height: 190rem/$rem;
    box-sizing: border-box;
    padding: 20rem/$rem 30rem/$rem;
  }

  .name{
    color: gray;
  }
  .add{
    /*padding-right: 10px;*/
    color: #0FBDFF;
  }
  .bfc{
    font-size: 32rem/$rem;
    color: #666666;
  }
</style>
