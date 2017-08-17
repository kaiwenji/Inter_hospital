<template>
  <div class="app">
      <div class="app">
      <app-header>
          <div class="middle big" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden; flex:1 1 auto">预约挂号</div>
          <div slot="right"  class="appointl" @click="getMyScheme" style="0 0 auto;width:4.5rem;"><p class="right" style="color:#3399FF">我的挂号</p></div>
    </app-header>
    <div class="weui-loadmore flex" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
      <div class="weui-loadmore weui-loadmore_line" v-show="failure">
          <span class="weui-loadmore__tips">网络错误</span>

    </div>
    <div class="weui-cells flex overflow"v-show="Got&&!failure">
        <a class="weui-cell" v-for="item in hospital" @click="changeRoute(item.bookHosId,item.hosName)" :id="item.bookHosId" >
            <div class="weui-cell__hd">
            <img class="figure" :src="item.hosPic" alt="" style="border-radius:50%;">    
    </div>
            <div class="weui-cell__bd">
                    <p >{{item.hosName}}</p>
                    <p class="small" style="color:#999999">{{item.hosLevel}}<br>{{item.hosAddress}}</p>
    </div>
    </a>

    </div>
    </div>
  </div>
</template>

<script>
    import AppHeader from "../../business/app-header";
  export default {
      data()
      {
         return{
             hospital:[{hosPic:"https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=c3f1eb200c33874488c8272e3066b29c/a9d3fd1f4134970a059ba55f95cad1c8a6865dd1.jpg",hosName:"浙二医院",hosLevel:"三甲医院",hosAddress:"浙江杭州市解放路88号",bookHosId:"123"},{hosPic:"https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=3334a1bda144ad343ab28fd5b1cb6791/1ad5ad6eddc451da23dc0fbbb6fd5266d01632b3.jpg",hosName:"杭州市第一人民医院",hosLevel:"三甲医院",hosAddress:"杭州市浣纱路261号",bookHosId:"123"}],
             isShown:false,
             hospitalId:"1234",
             hosName:'test',
             Got:false,
             failure:false

         }
      }
      ,

      methods:
      {
          getMyScheme(){
              this.$router.push("/myRegistration/");
          },
          check(){
          },
          changeRoute(id,name){
              this.hosName=name;
              this.hospitalId=id;
              let path="/book/department/"+this.hospitalId;
              this.$router.push(path);
          }

      },
        mounted(){
            window.localStorage.removeItem("deptIndex");
      },
      computed:{
          key(){
              return (new Date()).valueOf();
          }
      },
      created(){
//          console.log("获取医院信息");
//          api("nethos.book.hos.area.list",{gbCityCode:""})
//          .then((val)=>{
//              console.log(val);
//              if(!val.succ){
//                  return;
//              }
              this.Got=true;
//              this.hospital=val.list;
//              console.log(val)
//          },(e)=>{
//              this.failure=true;
//              this.Got=true;
//              console.log("failed");
//          })
      },
	  components:{
          AppHeader
	  },
      beforeDestroy(){
          window.localStorage['hosName']=this.hosName;
      }
  }
</script>

<style scoped lang="scss">
    .background{
        padding-top:45%;

        display:flex;
        align-items:center;
        flex-direction: column;
    }
    .option{
        margin-top:5%;
        width:80%;
        height:30%;
        box-shadow: .2rem .3rem .3rem lighten(black,40%);
        div{
            height:100%;
            a{
                height:100%;
            }
        }

    }
    .footer{
        flex: 0 0 auto;
        
    }
    .containing{
        flex:1 1 auto;
    }
    .app{
        flex:1 1 auto;
        display:flex;
        flex-direction:column;
    }
</style>
