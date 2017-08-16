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
<!--                <p>普通</p><p>门诊</p>-->
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
          timeList:[{},{},{},{},{},{},{}],
          appoint:[],
          res:[],
          dateBased:[],
          doctorBased:[],
          isDoc:false,
          data:[{name:"普通号",hospital:this.hosName,deptName:this.deptName,status:"预约",bookFee:10},
                {name:"普通号",hospital:"test",deptName:"test",status:"已满",bookFee:10},
                {name:"宋康",pic:"https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=6e3a5360590fd9f9a017526f1d16b317/d31b0ef41bd5ad6e580618f689cb39dbb6fd3c2a.jpg",hospital:"test",title:"正高级",description:"主要从事中医内科和中西医结合呼吸专业工作，对中医药理论及现代医学有较深入研究，开展临床、教学和科研工作，掌握本学科发展的前沿动态，对呼吸系疾病有较深入的研究和丰富的临床经验，尤其在哮喘、慢阻肺、呼吸衰竭、纤维气管镜技术、肺功能等方面有独到之处。",status:"停诊"},
                {name:"王会仍",pic:"https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=96e935e9c3fdfc03e578e4beec04e0a9/242dd42a2834349b5d2ead92c9ea15ce36d3bef9.jpg",hospital:"test",title:"正高级",description:"多年来从事于中西医结合防治慢性阻塞性肺病等呼吸系疾病及肺功能的研究工作。曾被聘为《现代应用药学》及《中医临床与保健》等杂志的特约编委",status:"即将"},
                {name:"王新华",hospital:"test",title:"正高级",description:"主任医师、硕士研究生导师，浙江中西结合呼吸病学会会员，全国名老中医艺术继承人，全国卫生系统先进工作者。",status:"预约",bookFee:10},
                {name:"朱渊红",hospital:"test",title:"正高级",description:"中国中西医结合学会呼吸分会青年委员、浙江省中西医结合呼吸专业青年委员会副主任委员。从事专业时间15年，专业特长为对慢性咳嗽、哮喘、慢性阻塞性肺病、肺癌等常见病的中西医结合治疗及呼吸衰竭危重症抢救，肺癌的诊治，支气管镜及胸腔镜检查；专科专病治疗优势为慢性阻塞性肺病、支气管哮喘、肺癌、慢性咳嗽",status:"预约",bookFee:15}],
          filterChoice:"",
          doctorList:[],
          bookList:[],
          dept:{},
          isAppt:true,
          isShown:false,
          chosedItem:{},
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
            console.log(res);
            return res;
            
        },
        expert(){
            var res=this.data.filter((item)=>{
                return item.name!="普通号";
//                return true;
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
        
    },
    beforeDestroy() {

    },
    methods: {
        reserve(item)
        {
//            window.localStorage['time']= item.hour+':'+item.minute+'-'+item.newHour+':'+item.newMinute;
//            window.localStorage['last']="/service/book/doctor/"+this.dept.bookDeptId;
//            this.$router.push({path:"/service/book/reserve/"+item.bookNumId+"&"+this.dept.bookHosId,query:{key:this.key}});
        },
        check(item)
        {
            console.log(item.event.target);
        },
//        update(){
//            let weekList=["无","停诊","已满","即将","预约"];
//            for(let i=0;i<this.res.length;i++){
//               let temp=new Object();
//                let name=this.res[i].docName;
//                let pic=this.res[i].docAvatar;
//                let description=this.res[i].docDescription;
//                let deptName=this.res[i].deptSchemeList[0].deptName;
//                if (!description)
//                    {
//                        name=this.res[i].deptSchemeList[0].docName;
//                    }
//                let status=weekList[this.res[i].schemeStatus];
//                let hospital=this.res[i].hosName;
//                let docName=this.res[i].docName;
//                let bookDocId=this.res[i].bookDocId;
//                let title=this.res[i].docTitle;
//                var newNode={name:name,pic:pic,description:description,scheme:this.res[i].deptSchemeList,hospital:hospital,deptName:deptName,status:status,bookDocId:bookDocId,title:title};
//                this.doctorBased.push(newNode);
//                let scheme=this.res[i].deptSchemeList[0].schemeList;
//                for(let j=0;j<scheme.length;j++){
//                    let bookFee=scheme[j].bookFee;
//                    let bookSchemeId=scheme[j].bookSchemeId;
//                    let status=weekList[scheme[j].schemeStats];
//                    let schemeAmpm=scheme[j].schemeAmpm=="am"?"上午":"下午";
//                    let schemeDate=scheme[j].schemeDate;
//                    let week=this.week[scheme[j].weekNo];
//                    let date=new Date(schemeDate);
//                    let month= ("0" + (date.getMonth() + 1)).slice(-2);
//                    let day=("0" + (date.getDate())).slice(-2);
//                    let year=date.getFullYear();
//                    schemeDate=month+'-'+day;
//                    var newNode={name:name,description:description,bookFee:bookFee,status:status,schemeAmpm:schemeAmpm,schemeDate:schemeDate,pic:pic,title:title,year:year,bookSchemeId:bookSchemeId,week:week};
//                    this.dateBased.push(newNode);
//                }
//            
//                
//            }
//            this.Got=true;
//            this.failure=false;
//            this.data=this.dateBased;
//        },
        dateChange(item){
            this.filterChoice=item.year+"-"+item.date;
        },
        checkIfClicked(item){
            return item.year+'-'+item.date==this.filterChoice;
        },
//        changeMode(val){
//            this.data=val=="doctorBased"?this.doctorBased:this.dateBased;
//            this.isDoc=val=="doctorBased"?true:false;
//            this.setHeight();
//        },
        next(item){
            if(item.status=="预约"){
                window.localStorage['docName']=item.name;
                window.localStorage['docTitle']=item.title;
                window.localStorage['docDesc']=item.description;
                this.$router.push("/book/doctorInfo/"+"1234&1234"+encodeURI("特扬医院"));
            }
//            if(item.status!="预约"){
//                return;
//            }
//                if (item.bookDocId!=undefined){
//                    this.$router.push("/service/book/doctorInfo/"+item.bookDocId+"&"+this.dept.bookDeptId+'&'+encodeURI(this.dept.deptName));
//                }
//                else{
//                    this.$router.push("/service/book/doctorInfo/"+item.bookDocId+"&"+item.scheme[0].bookDeptId+'&'+this.dept.bookDeptId+'&'+encodeURI(this.dept.deptName));
//
//                }
        }

    },
    created(){
        this.Got=true;
//        if(!eval(window.localStorage['isAppt'])){
//            this.isAppt=false;
//        }
//        let bookDeptId=this.$route.params.id;
//        api("nethos.book.dept.info",{bookDeptId:bookDeptId })
//        .then((val)=>{
//            this.dept=val.obj;
//            this.title=this.dept.deptName;  
//        });
//        api("nethos.book.doc.list.scheme.list",{bookDeptId:bookDeptId })
//        .then((val)=>{
//            if(val.list[0]){
//                this.hosName=val.list[0].hosName;
//            }
//            console.log(val);
//            this.res=val.list;
//            this.update();
//        },
//             ()=>{
//            this.failure=true;
//            this.Got=true;
//        });
        
        
//        /**获取当前时间**/
//        let date=new Date();
//        let week=["周日","周一","周二","周三","周四","周五","周六","周日"];
//        for(let i =0;i<7;i++){
//            this.timeList[i].day=week[date.getDay()];
//            let month= ("0" + (date.getMonth() + 1)).slice(-2);
//            let day=("0" + (date.getDate())).slice(-2);
//            let year=date.getFullYear();
//            var newNode={day:week[date.getDay()],date:month+'-'+day,year:year};
//            this.timeList[i]=newNode;
//            date.setDate(date.getDate()+1);
//        }
//        this.filterChoice=this.timeList[0].year+"-"+this.timeList[0].date;
        
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
/*        background-image:url(./../../../static/img/u6883.png);*/
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
