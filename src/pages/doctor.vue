

<!--医生名片页面-->
<template>
  <div class="wrap" ref="wrap">
      <app-header style="border:1px solid transparent" class="header"  id="header"> 
          <p  class="l">{{title}}</p>
          <div slot="right" ref="followButton"  class="followButton" @click="follow">
              <p  class="l ft" ><img ref="heart"src="../../static/img/follow.png">{{followWord}}</p>
          </div>
      </app-header>
      <div v-show="Got">
          <div class="info">
              <div>
                  <img :src="getProfile(docInfo)">
                  <p class="l docName">{{docInfo.docName}}<span v-show="docInfo.famous" class="icon s">famous</span></p>
                  <p class="m">{{docInfo.deptName}}<span style="padding:0 1rem"></span>{{docInfo.docTitle}}</p>
                  <p>{{docInfo.hosName}}</p>
             </div>
          </div>
          <div class="app">
          <div class="tab" ref="tab">
              <div class="tab_contain">
                  <div><div @click="To('book')"><img src="../../static/img/red.png"><p class="m red">Reserve</p></div></div>
                  <div><div @click="To('jhsq')"><img src="../../static/img/green.png"><p class="m green">Application</p></div></div>
                  <div><div @click="To('hzbd')"><img src="../../static/img/blue.png"><p class="m blue">Patients</p></div></div>
              </div>
              <div class="tab_shadow">
               </div>
          </div>
          <div class="supplement" ref="supplement"></div>
          <div class="speciality" v-for="item,index in list">
              <div>
                   <p class="title">{{item.title}}</p>
                   <p class="font-hide":id="item.title">{{item.desc}}</p>
              </div>
              <div class="button vertical" @click="getDetail(item,this,index)">
                  <img src="../../static/img/pullDown.png">
              </div>
          </div>
          <div class="docAudio"v-show="showDocTalk" >
              <div class="title">
                  <p class="l">Doctor's post</p>
                  <div><p @click="getMoreAudio()" v-show="!nothingMore"><img src="../../static/img/getMore.png"></p></div>
    </div>
              <doc-panel :list="audioList"></doc-panel>
              
    </div>
          <div class="QR">
              <div>
                <p>FOLLOW ME</p>
                <img :src="docInfo.docQrcode" >
              </div>
          </div>
    </div>
      </div>
      <div class="sendMsg" v-show="isFollow" @click="sendMsg"><p class="xxl">发消息</p></div>
      <my-loading class='myLoading'v-show="!Got"></my-loading>
  </div>
</template>

<script>
    import MyLoading from "../base/loading/loading.vue";
    import DocPanel from "../business/docPanel.vue";
    import AppHeader from "../business/app-header.vue";
    import Api from "../lib/api.js";
    import myMixin from "../lib/public.js";
    
  export default {
    data() {
      return {
          docId:"",
          docInfo:{
              docName:"kaiwenji",
              docAvatar:"../static/img/docProfile.png",
              deptName:"Pediatrics",
              hosName:"XX Hospital",
              docTitle:"Director"
              
          },
          title:"my business card",
          list:[{title:"speciality",
                 desc:"test word for the speciality: major in Computer Science and focus on Front end development"
                },
                {title:"description",
                 desc:"test word for the description: a cool gay whose favorite soccer team is Real Madird in Spain."
                }],
          audioList:[
              {
                  docName:"kaiwenji",
                  snsKnowledge:{
                      knowUrl:"",
                      createTime:Date.parse( new Date()),
                      readNum:3
                  }
              },
              {
                  docName:"kaiwenji",
                  snsKnowledge:{
                      knowUrl:"",
                      createTime:Date.parse( new Date()),
                      readNum:3
                  }
              }
          ],
          rem:16,
          nothingMore:false,
          showDocTalk:false,
          Got:false,
          isFollow:false,
          followId:""
      };
    },
    computed: {
        followWord(){
            return this.isFollow?"followed":"follow";
        }
    },
    components: {
        AppHeader,
        DocPanel,
        MyLoading
    },
    watch:{
        isFollow(){
            if(!this.isFollow){
                this.$refs.followButton.className="followButton";
                this.$refs.heart.src="./static/img/follow.png";
            }
            else{
                this.$refs.followButton.className+=" followed";
                this.$refs.heart.src="./static/img/followed.png";
            }
        }
    },
      
    mixins:[myMixin],  
    mounted() {
        this.rem=250/20;
        
//        设置滚动动画效果
        this.$refs.wrap.onscroll=()=>{

            var top=this.$refs.wrap.scrollTop;
            this.setHeaderColor(top);
            this.setTabClass(top);
        }

//获取医生信息        
        this.getDocInfo();
        this.showDocTalk=true;
//        获取医生说列表
//        Api("smarthos.sns.knowledge.page",{
//            docId:this.docId,
//            pageNum:1,
//            pageSize:3,
//            token:window.localStorage['token']
//
//        })
//        .then((val)=>{
//            if(!val.succ||!val.list||val.list.length==0){
//                this.showDocTalk=false;
//            }
//            else{
//                this.showDocTalk=true;
//            }
//            val.list.forEach((item)=>{
//                this.audioList.push(Object.assign({}, item, { on: false }));
//            })
//            this.audioList=val.list;
//            if (val.page.total==1){
//                this.nothingMore=true;
//            }
//        },
//             ()=>{
//            this.$weui.alert("network error");
//        })

            },
    methods: {
        getDocInfo(){
            
            this.Got = true;
//            this.docId=this.$route.params.id;
//            Api("smarthos.user.doc.card.get",{
//                "docId":this.docId,
//                token:window.localStorage['token']
//            })
//            .then((val)=>{
//                if(val.succ){
//                    this.docInfo=val.obj.doc;
//                    this.isFollow=val.obj.followDocpat?true:false;
//                    if(this.isFollow)
//                        {
//                            this.followId=val.obj.followDocpat.id;
//                        }
//                    this.list[0].desc=this.docInfo.docSkill;
//                    this.list[1].desc=this.docInfo.docResume;
//                }
//                else{
//                    this.$weui.alert(val.msg);
//                }
//                this.Got=true;
//
//            },
//                          ()=>{
//                        this.$weui.alert("网络错误");
//                    })
        },
        sendMsg(){
            this.$router.push({path:'/chat',query:{docAvatar:this.docInfo.docAvatar,docName:this.docInfo.docName,followId:this.followId}});
        },
//        切换路由
        To(path){
            this.$weui.alert("I am sorry but this function is not available because of no api.")
//            if(path=='book'){
//                this.$router.push("/book/");
//            }
//            else{
//                this.$router.push("/"+path+"/"+this.docId);
//            }
        },
        
        
        
        getDetail(item,event,index){
            var article=document.getElementById(item.title);
            var picture=event.event.target;
            picture.className=picture.className=="rotate"?"":"rotate";
            article.className=article.className==''?"font-hide":"";


        },
        
        
        getMoreAudio(){
            this.$weui.alert("it is not available now");
//            this.$router.push("/docTalk/"+this.docId);
        },
        
        
        /* 关注按键函数*/
        follow(){
            if (this.isFollow){
                Api("smarthos.follow.docpat.delete",{
                    docId:this.docInfo.id,
                    token:window.localStorage['token']
                })
                .then((val)=>{
                    if(val.succ){
                        this.isFollow=false;
                    }
                    else{
                        this.$weui.alert(val.msg);
                    }
                },
                      ()=>{
                    this.$weui.alert("network error");
                }
                      )

            }
            else{
                Api("smarthos.follow.docpat.add",{
                    docId:this.docInfo.id,
                    token:window.localStorage['token']
                })
                .then((val)=>{
                    if(val.succ){
                        this.isFollow=true;
                        this.getDocInfo();
                    }
                    else{
                        this.$weui.alert(val.msg);
                    }
                },
                     ()=>{
                    this.$weui.alert("network error");
                })
            }
        },

//        标题透明度变化
        setHeaderColor(top){
            var limit=5*this.rem;
            var opacity=top-limit>0?top-limit:0;
            opacity/=limit;
            document.getElementById("header").style.backgroundColor="rgba(255,255,255,"+opacity+")";
            if(opacity>=0.8){
                this.title=this.docInfo.docName;
                document.getElementById("header").style.color="black";
            }
            if(opacity<0.8){
                this.title="my business card";
                document.getElementById("header").style.color="white";
            }
        },
        
//        tab固定or滚动
        setTabClass(top){
            if(top>14*this.rem-45){
                if(this.$refs.tab.className!="tab tab_fixed"){
                    this.$refs.tab.className+=" tab_fixed";
                    this.$refs.supplement.style.height="4.2rem";
                }
            }
            else{
                this.$refs.tab.className="tab";
                this.$refs.supplement.style.height="0";
            }
        }
    }
  };
</script>

<style scoped lang="scss">
    @import "../common/var.scss";
    $small:rgb(204,204,204);
    $orangeRed:rgb(247,93,32);
    $lightGreen:rgb(42,182,179);
    $lightBlue:rgb(22,151,219);
    .rotate{
        transform:rotate(180deg);
    }
    p{

        font-size:0.875rem;
        &.green{
            color:$lightGreen;
            line-height:0.85rem;
        }
        &.red{
            color:$orangeRed;
            line-height:0.85rem;
        }
        &.blue{
            color:$lightBlue;
            line-height:0.85rem;
        }
    }
    .wrap{
        background:rgb(248,248,248);
    }
    .header{
        position:absolute;
        width:19.8rem;
        background-color:rgba(255,255,255,0);
        color:white;

    }
    .app{
        background-color:rgb(248,248,248);
    }
    .info{
        height:14rem;
        background-image:url(../../static/img/background.png);
        background-size:cover;
        div{
            padding-top:2.34rem;
            text-align:center;
            img{
                width:4rem;
                border-radius:2rem;
            }
            p{
                color:white;
            }
        }
    }
        .tab{
            height:4.2rem;
            background-color:white;
            @include vertical;
            .tab_shadow{
                flex:1 1 auto;
                background-image:linear-gradient(to top,lightgrey,white);

            }
            .tab_contain{
                height:3.9rem;
                @include horizontal;
                div{
                    @include vertical;
                    align-items:center;
                    div{
                        @include vertical
                        img{
                            padding-bottom:0.8rem;
                            height:1.86rem;
                        }

                    }
                    flex:1 1 auto;
                }
            }
            &.tab_fixed{
            position:absolute;
            top:2.4rem;
            width:20rem;
                z-index:30;
            }
        }
    .speciality{
        width:20rem;
        background-color:white;
        @include horizontal;
        align-items:center;
        margin-bottom:1rem;
        div{
            &.button{
                padding:0;
                flex:0 0 auto;
                img{
                    padding:2.2rem 1rem;
                    width:1rem;
                }
                div{
                    margin:auto 0;
                }
            }
            flex:1 1 auto;
            padding-bottom:0.8rem;
            p{
                &.title{
                    position:relative;
                    &:before{
                        content:"";
                        display:block;
                        position:absolute;
                        left:0rem;
                        top:0.8rem;
                        height:1rem;
                        width:2px;
                        background-color:$lightBlue;
                    }
                }
                padding-top:0.5rem;
                padding-left:1rem;

            }
        }
    }
    .docAudio{
        flex:1 1 auto;
        background-color:white;
        .title{
            display:flex;
            flex-direction:row;
            div{
                flex:1 1 auto;
                text-align:right;
            }
            p{
                flex: 0 0 auto;
                padding:0.8rem;

            }
            
            img{
                height:1rem;
            }
            
        }


    }
    .QR{
        background-color:white;
        div{
            
            text-align:center;
            p{
                padding:0.7rem;
                font-size:0.77rem;
                color:$small;
            }
            img{
                width:8.5rem;
                
        margin-bottom:4rem;
            }
        }

    }
    .supplement{
        height:0;
        width:20rem;
    }
    .followButton{
        &.followed{
            color:rgb(242,198,19);
        }
        position:relative;
        color:white;
        display:flex;
        flex-direction:row-reverse;
        img{
            width:1rem;
            height:1rem;
            position:absolute;
            left:-1.5rem;
            top:0.8rem;
        }
    }
    .font-show{
        padding-bottom:1rem;
    }

/*    名医标签*/
    .icon{
    background: #f2c613;
    color: #fff;
    position: absolute;
    border-radius: .2rem;
    padding: 0 .2rem;
    left: 12rem;
    top: .1rem;
    }

/*    医生姓名*/
    .docName{
        position:relative;
    }
    
    .sendMsg{
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        height:3rem;
        background:rgb(10,172,233);
        p{
            margin-top:.8rem;
/*            margin:0 8rem;*/
            text-align:center;
            color:white;
        }
        
    }
</style>
