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
             hospital:[{hosPic:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=b3f641ba03f79052fb124f6c6d9abcaf/0823dd54564e9258425bb4479682d158ccbf4e2f.jpg",hosName:"浙一医院",hosLevel:"三甲医院",hosAddress:"庆春路79号",bookHosId:"123"},{hosPic:"https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268/sign=90b07595d843ad4ba62e41c6ba025a89/8718367adab44aed67f036d4ba1c8701a18bfb40.jpg",hosName:"省中医院",hosLevel:"三甲医院",hosAddress:"邮电路54号",bookHosId:"123"},{hosPic:"https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=96f70615c1ef7609280691cd4fb4c8a9/50da81cb39dbb6fdc865e7ae0324ab18972b377f.jpg",hosName:"省人民医院",hosLevel:"三甲医院",hosAddress:"浙江省杭州市朝晖院区上塘路158号",bookHosId:"123"}],
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
//              this.$router.push("/myRegistration/"+window.localStorage["myId"]);
          },
          check(){
              console.log("click get");
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
