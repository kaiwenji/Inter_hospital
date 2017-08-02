<template>
    <div id="onlinepage">
        <top>
            <div class="middle big">常用就诊人</div>
            <span slot="right" class="add" @click="goAddUser">添加</span>
        </top>
      <div v-show="!showLoading" class="wrap">
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
      <My-loading v-show="showLoading" class="myLoading"></My-loading>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../business/app-header.vue'
    import leftSwipe from '../../base/leftSwipe.vue'
    import api from '../../lib/api'
    import MyLoading from "../../base/loading/loading.vue";
    var token = localStorage.getItem('token')
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
              showLoading:true
            }
        },
        mounted(){
          this.getData()
        },
      methods:{
        getData(){
          api('smarthos.user.commpat.list',{
            token:token
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
  #onlinepage{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background: white;
  }
  .wrap{
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    margin-top: 30rem/$rem 10rem/$rem 20rem/$rem 10rem/$rem;

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
