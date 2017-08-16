<template>
  <div class="view app">
 <app-header>
          <div class="middle big">{{title}}</div>
    </app-header>
        <div class="weui-loadmore" v-show="!Got">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
      <div class="weui-loadmore weui-loadmore_line" v-show="failure">
          <span class="weui-loadmore__tips">网络错误</span>
    </div>
      <div class="app overflow"v-show="Got&&!failure">
      <div>
      <myPanel class="weui-cells">
          <img class="figure"slot="picture" :src="doctorInfo.docAvatar">
          <div slot="article">
              <p>{{docName}}
                  <span >{{doctorInfo.docTitle}}</span></p>
              <p  class="font-hide" style="width:9rem">{{hospitalName}}</p>
              <p class="small" style="color:#999999">{{deptName}}</p>
              

    </div>
    <span slot="ft">在线问诊</span>
    </myPanel>
          
    </div>
      <div class="weui-cells">
          <MySelect :options="deptList" @update="update" v-show="deptList&&deptList.length>0"></MySelect>
          <div class="weui-cell" style="display:flex;flex-direction:row" v-for="scheme in filteredSchemeList">
              <div style="flex:1 1 auto">
                    {{scheme.time|getMyDay}}
                      {{scheme.Ampm}}
                      {{scheme.week}}
    </div>
              <div v-if="scheme.status=='预约'">
                  <a class="weui-btn weui-btn_mini weui-btn_default" style="background:white" @click="next(scheme)"><p>{{scheme.status}} {{scheme.bookFee}}.0元</p></a>
    </div>
              <div v-if="scheme.status!='预约'" style="width:3rem">
              <span  class="font-warn">{{scheme.status}}</span>
    </div>
    </div>
    </div>
      <div v-show="isDoctor">
          <div class="weui-cells__title" v-show="deptSchemeList&&deptSchemeList.length>0"><p>该医生坐诊的其他科室:</p></div>
      <div class="weui-cells">
          
          <myPanel v-for="item in deptSchemeList" @activate="anotherDept(item)" :key="item.bookDeptId">
              <div slot="picture"><p>{{item.deptName}}</p></div>
    </myPanel>
    </div>
      <div class="weui-cells__title">医生擅长</div>
      <div class="weui-cells">
          <div class="weui-cell">
              <p>{{docDesc}}</p>
    </div>
    </div>
    </div>

</div>
    <div class="weui-loadmore" v-show="!Got">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="failure">
        <span class="weui-loadmore__tips">网络错误</span>
    </div>
      <pop-up :show="isShown" @activate="isShown=false">

                <div v-show="Got&!failure" class="popUp" slot="contain">
                    <div>
                    <p class="small">{{chosedItem.time | getMyDay}}  {{chosedItem.week}}  {{chosedItem.Ampm}}</p>
                    
                    <p class="weui-msg__desc small">号源时段以医院实际情况为准</p>
    </div>
                    <div class="wrap">
                    <ul>
                        <li v-for="item in filteredBookList" @click="reserve(item)"> 
                            <p class="l">{{item.index}}号 {{item.hour}}:{{item.minute}}-{{item.newHour}}:{{item.newMinute}}</p>
                        </li>
                    </ul>
    </div>
    </div>
            
    </pop-up>
    </div>
</template>

<script>
    import MySelect from '../../base/select';
    import MyPanel from '../../base/panel';
    import api from '../../lib/api.js';
    import {getMyDay} from "../../lib/filter.js";
    import AppHeader from '../../business/app-header';
    import PopUp from "../../base/popup.vue";
  export default {
    data() {
      return {
          doctorInfo:{docName:"医生",hosName:"医院",bookHosId:"123",docTitle:"主任",docDescription:"真是个人才"},
          hospitalName:"",
          deptSchemeList:[
              {schemeList:[{weekNo:1,schemeAmpm:"am",schemeDate:"2017-2-3",schemeStats:4,bookFee:2,bookSchemeId:"1"}],deptName:"外科",bookSchemeName:"123",bookDeptId:"1"},
              {schemeList:[{weekNo:2,schemeAmpm:"am",schemeDate:"2017-2-3",schemeStats:4,bookFee:3,bookSchemeId:"2"}],deptName:"内科",bookSchemeName:"124",bookDeptId:"2"}
                         ],
          docDesc:"",
          docName:"",
          deptName:"",
          deptList:[],
          schemeList:[],
          table:{},
          chosedDeptName:"",
          bookDocId:"",
          isDoctor:false,
          isShown:false,
          chosedItem:{},
          bookList:[{numTime:"2017-02-03 08:00:00",bookNumId:"123"},
                   {numTime:"2017-02-03 08:30:00",bookNumId:"123"},
                   {numTime:"2017-02-03 09:00:00",bookNumId:"123"},
                   {numTime:"2017-02-03 09:30:00",bookNumId:"123"},
                   {numTime:"2017-02-03 10:00:00",bookNumId:"123"},
                   {numTime:"2017-02-03 10:30:00",bookNumId:"123"}],
          Got:false,
          failure:false,
          title:""
      };
    },
    filters:{
        getMyDay
    },
    created(){
        this.Got=true;
        let tempList=this.$route.params.id.split('&');
        if(tempList[0]!="undefined"){
            this.isDoctor=true;
            this.bookDocId=tempList[0];
            let bookDeptId=tempList[1];
            this.deptName="外科";
            this.getData({},this.bookDeptId);
//            api("nethos.book.doc.scheme.list",{bookDocId:this.bookDocId})
//            .then((val)=>{
//                this.getData(val,bookDeptId);
//            },
//                 ()=>{
//                console.log("failed");
//                this.failure=true;
//                this.Got=true;
//            });
        }
//        else{
//            var id=tempList[1];
//            let bookDeptId=tempList[2];
//            this.deptName=decodeURI(tempList[3]);
//            api("nethos.book.doc.normal.scheme.list",{bookDeptId:id})
//            .then((val)=>{
//                this.getData(val,bookDeptId);
//            },
//                 ()=>{
//                this.failure=true;
//                this.Got=true;
//                console.log("failed");
//            })
//        }
        
    },
    computed:{
        filteredSchemeList(){
            return this.schemeList.filter((item)=>{
                return item.bookDeptId==this.table[this.chosedDeptName];
            })
        },
        filteredBookList(){
            var list=[]
            for(let i=0;i<this.bookList.length;i++){
                var newNode=new Object();
                var date=new Date(this.bookList[i].numTime.replace(/\-/g, "/"));
                newNode.hour=("0" + (date.getHours())).slice(-2);
                newNode.minute=("0" + (date.getMinutes())).slice(-2);
                date.setMinutes(date.getMinutes()+20);
                newNode.newHour=("0" + (date.getHours())).slice(-2);
                newNode.newMinute=("0" + (date.getMinutes())).slice(-2);
                newNode.index=i+1;
                newNode.bookNumId=this.bookList[i].bookNumId;
                list.push(newNode);
            }
            return list;
        },
        key(){
            return (new Date()).valueOf();
        }

    },
    components:{
        myPanel:MyPanel,
        MySelect,
        AppHeader,
        PopUp
    },
    mounted() {
        this.docName=window.localStorage['docName'];
        this.hospitalName=window.localStorage['hosName'];
        this.deptName=window.localStorage['deptName'];
        this.docDesc=window.localStorage['docDesc']||"";

    },
    beforeDestroy() {

    },
    methods: {
        next(item){
            console.log(item);
            this.isShown=true;
            this.chosedItem=item;
            this.Got=false;
//            api("nethos.book.num.list",{bookSchemeId:item.bookSchemeId})
//            .then((val)=>{
                let storage=window.localStorage;
                storage['hosName']=this.hospitalName;
                storage['deptName']=this.deptName;
                storage['bookFee']=item.bookFee;
                storage['date']=item.time;
                storage['Ampm']=item.Ampm;
                storage['name']=this.doctorInfo.docName;
//                this.bookList=val.list;
                this.Got=true;
//            },
//                 ()=>{
//                this.failure=true;
//            })
        },
        reserve(item){
            window.localStorage['time']= item.hour+':'+item.minute+'-'+item.newHour+':'+item.newMinute;
            window.localStorage['last']="/service/book/doctorInfo/"+this.$route.params.id;
            this.$router.push({path:"/book/reserve/"+item.bookNumId+"&"+this.doctorInfo.bookHosId,query:{key:this.key}});
        },
        getTime(str){
            let date=new Date(str);
            let month= ("0" + (date.getMonth() + 1)).slice(-2);
            let day=("0" + (date.getDate())).slice(-2);
            let year=date.getFullYear();
            return year+"-"+month+"-"+day;
        },
        update(val){
            this.chosedDeptName=val;
        },
        anotherDept(item){
            this.$router.push("/service/book/doctor/"+item.bookDeptId);
        },
        getData(val,bookDeptId){
//                this.doctorInfo=val.obj;
                if(!this.doctorInfo.docAvatar){
                    this.doctorInfo.docAvatar=require("../../../static/img/docProfile.png");
                }
                this.hospitalName=this.doctorInfo.hosName;
                this.title=this.doctorInfo.docName;
//                this.deptSchemeList=val.obj.deptSchemeList.filter((item)=>{
//                    return item.deptName!=this.deptName;
//                });
                var weekList=["周一","周二","周三","周四","周五","周六","周日"];
                var statusList=["无","停诊","已满","即将","预约"];
                for(let i=0;i<this.deptSchemeList.length;i++){
                    this.deptList.push(this.deptSchemeList[i].deptName);
                    let list=this.deptSchemeList[i].schemeList;
                    for(let j=0;j<list.length;j++){
                        var temp=new Object();
                        temp.time=list[j].schemeDate;
                        temp.Ampm=list[j].schemeAmpm=="am"?"上午":"下午";
                        temp.week=weekList[list[j].weekNo-1];
                        temp.status=statusList[list[j].schemeStats];
                        temp.bookDeptId=this.deptSchemeList[i].bookDeptId;
                        temp.bookFee=list[j].bookFee;
                        temp.bookSchemeId=list[j].bookSchemeId;
                        this.schemeList.push(temp);

                    }
                    this.table[this.deptSchemeList[i].deptName]=this.deptSchemeList[i].bookDeptId;
                    if(i==0){
                        this.chosedDeptName=this.deptSchemeList[i].deptName;
                    }
                }
            console.log(this.table);
            this.Got=true;
        }

    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";
    .figure
    {
        width:3.75rem;
        margin-right:.3rem;
        display:block;
        border-radius:50%;
    }

    .small{
        font-size:0.75rem;
    }
    .popUp{
        display:flex;
        flex-direction:column;
        height:18.75rem;
        text-align:center;
        .small{
            font-size:0.75rem;
            padding:0.3rem 0 0 0.625rem;
        }
        li,div{
            
            border-bottom:1px solid silver;
        }
        p{
            padding:0.8rem;
        }
    }
</style>
