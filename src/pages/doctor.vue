<template>
  <div class="app" ref="wrap">

      <app-header style="border:1px solid transparent"class="test" ref="header" id="header">
          <p style="text-align:center; flex:1 1 auto;" class="l">{{title}}</p>
          <div slot="right" ref="followButton" style="flex:0 0 auto" class="followButton" @click="follow">
              <p  class="l ft" ><img ref="heart"src="../../static/img/follow.png">{{followWord}}</p>
          </div>
      </app-header>
      <div v-show="Got">
          <div class="info">
              <div>
                  <img :src="docInfo.docAvatar" onerror="getDefaultProfile(docInfo.docGender,this)">
                  <p class="l docName">{{docInfo.docName}}<span v-show="docInfo.famous" class="icon s">名医</span></p>
                  <p class="m">{{docInfo.deptName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{docInfo.docTitle}}</p>
                  <p>{{docInfo.hosName}}</p>
             </div>
          </div>
          <div class="tab" ref="tab">
              <div class="tab_contain">
                  <div><div><img src="../../static/img/red.png"><p class="m red">预约挂号</p></div></div>
                  <div><div @click="To('jhsq')"><img src="../../static/img/green.png"><p class="m green">加号申请</p></div></div>
                  <div><div @click="To('hzbd')"><img src="../../static/img/blue.png"><p class="m blue">患者报到</p></div></div>
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
              <div class="button" style="display:flex;flex-direction:column" @click="getDetail(item,this,index)">
                  <img src="../../static/img/pullDown.png" class=""style="padding:2.6rem 1rem;width:1rem;">
              </div>
          </div>
          <div class="docAudio"v-show="showDocTalk" >
              <div class="title">
                  <p class="l">医生说</p>
                  <div><p @click="getMoreAudio()" v-show="!nothingMore">更多</p></div>
              </div>
              <div v-for="item in audioList">
                <doc-panel :item="item"></doc-panel>
              </div>
          </div>
          <div class="QR">
              <div>
                <p>扫一扫二维码，关注我</p>
                <img :src="docInfo.docQrcode">
              </div>
          </div>
          <div>
          </div>
      </div>
      <my-loading class='myLoading'v-show="!Got"></my-loading>
  </div>
</template>

<script>
    import MyLoading from "../base/loading/loading.vue";
    import DocPanel from "../business/docPanel.vue";
    import AppHeader from "../business/app-header.vue";
    import Bubble from "../base/bubble.vue";
    import Api from "../lib/api.js";
    import {getDefaultProfile} from "../lib/public.js";
  export default {
    data() {
      return {
          docId:"",
          docInfo:{},
          title:"我的名片",
          list:[{title:"医生擅长",desc:""},{title:"医生介绍",desc:""}],
          audioList:[],
          rem:16,
          nothingMore:false,
          showDocTalk:false,
          Got:false,
          isFollow:false
      };
    },
    computed: {
        followWord(){
            return this.isFollow?"已关注":"关注";
        }
    },
    components: {
        AppHeader,
        bubble:Bubble,
        DocPanel,
        MyLoading
    },
    watch:{
        isFollow(){
            if(!this.isFollow){
                this.$refs.followButton.className="followButton";
<<<<<<< HEAD
                this.$refs.heart.src="../../static/img/follow.png";
            }
            else{
                this.$refs.followButton.className+=" followed";
                this.$refs.heart.src="../../static/img/followed.png";
=======
                this.$refs.heart.src="./static/img/follow.png";  
            }
            else{
                this.$refs.followButton.className+=" followed";
                this.$refs.heart.src="./static/img/followed.png";  
>>>>>>> d385558a01d72fc01edec748e01bbcb240c2f50c
            }
        }
    },
    mounted() {
        this.docId=this.$route.params.id;
        this.rem=window.screen.width/20;
        this.$refs.wrap.onscroll=()=>{

            var top=this.$refs.wrap.scrollTop;
            this.setHeaderColor(top);
            this.setTabClass(top);
        }

        Api("smarthos.user.doc.card.get",{
            "docId":this.docId,
            token:window.localStorage['token']
        })
        .then((val)=>{
            console.log(val);
            this.docInfo=val.obj.doc;
            this.isFollow=val.obj.hasFollow||false;
            this.list[0].desc=this.docInfo.docSkill;
            this.list[1].desc=this.docInfo.docResume;
            this.Got=true;

        },
                      ()=>{
                    this.$weui.alert("网络错误");
                })
        Api("smarthos.sns.knowledge.page",{
            docId:this.docId,
            pageNum:1,
            pageSize:3,
            token:window.localStorage['token']

        })
        .then((val)=>{
            if(!val.succ||!val.list||val.list.length==0){
                this.showDocTalk=false;
            }
            else{
                this.showDocTalk=true;
            }

            this.audioList=val.list;
            if (val.page.total==1){
                this.nothingMore=true;
            }
        },
             ()=>{
            this.$weui.alert("网络错误");
        })

            },
    beforeDestroy() {

    },
    methods: {
        To(path){
            this.$router.push("/"+path+"/"+this.docId);
        },
        getDetail(item,event,index){
            var article=document.getElementById(item.title);
            var picture=event.event.target;
            picture.className=picture.className=="rotate"?"":"rotate";
            article.className=article.className=='font-show'?"font-hide":"font-show";


        },
        getMoreAudio(){
            this.$router.push("/docTalk/"+this.docId);
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
                    this.$weui.alert("网络错误");
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
                    }
                    else{
                        this.$weui.alert(val.msg);
                    }
                },
                     ()=>{
                    this.$weui.alert("网络错误");
                })
            }
        },


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
                this.title="我的名片";
                document.getElementById("header").style.color="white";
            }
        },
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
    header{
        border:none;
    }
    .test{
        position:fixed;
        width:20rem;
        background-color:rgba(255,255,255,0);
        color:white;

    }
    .app{
        flex:1 1 auto;
        background-color:rgb(248,248,248);
        overflow:auto;
    }
    .info{
        height:14rem;
        background-image:url(../../static/img/background.png);
        background-size:cover;
        div{
            padding-top:45px;
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
            display:flex;
            flex-direction:column;
            .tab_shadow{
                flex:1 1 auto;
                background-image:linear-gradient(to top,lightgrey,white);

            }
            .tab_contain{
                height:3.9rem;
                display:flex;
                flex-direction:row;
                div{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    div{
                        display:flex;
                        flex-direction:column;
                        img{
                            padding-bottom:0.8rem;
                            height:1.86rem;
                        }

                    }
                    flex:1 1 auto;
                }
            }
            &.tab_fixed{
            position:fixed;
            top:45px;
            width:20rem;
                z-index:30;
            }
        }
    .speciality{
/*        height:5.86rem;*/
        width:20rem;
        background-color:white;
        display:flex;
        flex-direction:row;
        align-items:center;
        margin-bottom:1rem;
        div{
            &.button{
                flex:0 0 auto;
                div{
                    margin:auto 0;
                }
            }
            flex:1 1 auto;

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
            }
        }

    }
    .supplement{
        height:0;
        width:20rem;
    }
    .followButton{
        &.followed{
            color:$heartRed;
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
        background:rgb(242,198,19);
        color:white;
        position:absolute;
        border-radius:0.3rem;
        padding:0 .3rem;
        left:11.5rem;
        top:.1rem;
    }

/*    医生姓名*/
    .docName{
        position:relative;
    }
</style>
