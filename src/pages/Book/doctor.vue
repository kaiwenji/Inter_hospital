<!--book组件中localStorage的作用就是为了弥补接口的缺失，如果有接口连入，可把几乎所有localstorage删除-->

<template>
<div class="view app">
      <app-header>
          <div class="middle big">{{title}}</div>
    </app-header>
            <div class="weui-loadmore weui-loadmore_line" v-show="failure">
                <span class="weui-loadmore__tips">网络错误</span>
    </div>
  <div  id="module" class="app" v-show="Got">

    <div class="weui-loadmore weui-loadmore_line" v-show="!failure&&noInfo1&&noInfo2">
        <span class="weui-loadmore__tips">暂无号源</span>
    </div>
      <div class="appoint">
<div class="weui-cells">
    <a v-for="item in normalAppoint"class="weui-cell weui-cell_access" href="javascript:;" @click="next(item)">
        <div class="weui-cell__hd">
            <div  class="figure img">
                <img  class="figure"src="../../../static/img/docProfile.png">
    </div>
    </div>
        <div class="weui-cell__bd">
            <span class="big">{{item.name}}</span><br>
            
        </div>
                  <div :class="{'font-warn':item.status=='已满'}">
                <div v-if="isDoc" class="weui-cell__ft" >{{item.status}}</div>
                  <div v-else><div style="text-align:right">{{item.status}}</div><br>
    </div>
    </div>
    </a>

</div>
    </div>
      <div class="doctor">
          <div class="weui-cells">
              <a v-for="item in expert" class="weui-cell weui-cell_access" @click="next(item)">
                  <div class="weui-cell__hd">
                    <img :src="item.pic||'./static/img/docProfile.png'"class="figure" onerror="this.src='./static/img/docProfile.png'"alt="暂无图像">

    </div>
                  <div class="weui-cell__bd">
                      <span class="big">{{item.name}}</span>
                      <div  style="color:#666666">
                      <span>  {{item.title}}</span>
                      <p class="font-hide"style="max-width:9rem;">{{item.description}}</p>
    </div>
                      

    </div>
                  <div :class="{'font-warn':item.status=='已满'}">
                <div v-if="isDoc" class="weui-cell__ft" >{{item.status}}</div>
                  <div v-else><div style="text-align:right">{{item.status}}</div><br>
    </div>
    </div>
    </a>
    </div>
    </div>
  </div>

    <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    </div>
</template>

<script>
    import api from '../../lib/api.js';
    import AppHeader from "../../business/app-header";
  export default {
    data() {
      return {
          hosName:window.localStorage['hosName'],
          detpName:window.localStorage['deptName'],
          isDoc:false,
          data:[{name:"普通号",hospital:"test",deptName:"test",status:"已满",bookFee:10},
                {name:"宋康",pic:"https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=6e3a5360590fd9f9a017526f1d16b317/d31b0ef41bd5ad6e580618f689cb39dbb6fd3c2a.jpg",hospital:"test",title:"正高级",description:"主要从事中医内科和中西医结合呼吸专业工作，对中医药理论及现代医学有较深入研究，开展临床、教学和科研工作，掌握本学科发展的前沿动态，对呼吸系疾病有较深入的研究和丰富的临床经验，尤其在哮喘、慢阻肺、呼吸衰竭、纤维气管镜技术、肺功能等方面有独到之处。",status:"预约"},
                {name:"王会仍",pic:"https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=96e935e9c3fdfc03e578e4beec04e0a9/242dd42a2834349b5d2ead92c9ea15ce36d3bef9.jpg",hospital:"test",title:"正高级",description:"多年来从事于中西医结合防治慢性阻塞性肺病等呼吸系疾病及肺功能的研究工作。曾被聘为《现代应用药学》及《中医临床与保健》等杂志的特约编委",status:"预约"},
                {name:"王新华",hospital:"test",title:"正高级",description:"主任医师、硕士研究生导师，浙江中西结合呼吸病学会会员，全国名老中医艺术继承人，全国卫生系统先进工作者。",status:"预约",bookFee:10},
                {name:"朱渊红",hospital:"test",title:"正高级",description:"中国中西医结合学会呼吸分会青年委员、浙江省中西医结合呼吸专业青年委员会副主任委员。从事专业时间15年，专业特长为对慢性咳嗽、哮喘、慢性阻塞性肺病、肺癌等常见病的中西医结合治疗及呼吸衰竭危重症抢救，肺癌的诊治，支气管镜及胸腔镜检查；专科专病治疗优势为慢性阻塞性肺病、支气管哮喘、肺癌、慢性咳嗽",status:"预约",bookFee:15}],
          Got:false,
          noInfo1:true,
          noInfo2:true,
          failure:false,
          title:""
      };
    },
    computed:{
        normalAppoint(){
            var res=this.data.filter((item)=>{
                return item.name=="普通号";
            });
            this.noInfo1=true;
            if (res.length>0){
                this.noInfo1=false;
            }
            return res;
            
        },
        expert(){
            var res=this.data.filter((item)=>{
                return item.name!="普通号";
                return true;
            });
            this.noInfo2=true;
            if (res.length>0){
                this.noInfo2=false;
            }
            return res;
            
        },
        key(){
        return (new Date()).valueOf();
    }

    },
    components:{
        AppHeader
    },
      
    mounted() {
        this.title=window.localStorage['deptName'];
        this.Got=true;
    },
    methods: {
        next(item){
            if(item.status=="预约"){
                window.localStorage['docName']=item.name;
                window.localStorage['docTitle']=item.title;
                window.localStorage['docDesc']=item.description;
                this.$router.push("/book/doctorInfo/"+"1234&1234"+encodeURI("特扬医院"));
            }
        }

    }
  };
</script>

<style lang="scss">
    @import "../../common/var.scss";
    $info:#3399FF;
    
    #module{
        display:flex;
        flex-direction:column;
        overflow:auto;
        -webkit-overflow-scrolling:touch;
    }
    




    
    .weui-btn.button{
        color:$info;
        background-color:white;
        border:1px solid $info;
        height:2rem;
        margin:0px;
        padding:0px;
        width:6.4rem;
        &:active{
            background-color:#3399FF;
            color:white;
        }
        &.clicked{
            background-color:#3399FF;
            color:white;
        }
    }
    .clicked{
            background-color:#3399FF;
            color:white;
        }
    .img{
        display:flex;
        flex-direction:column;
        align-items:center;
        background-repeat:no-repeat;
        background-size:100%;
        font-size:0.77rem;
        p{
            flex:1 1 auto;
            padding-top:.3rem;
        }
    }

    .small{
        font-size:0.77rem;
    }

</style>
