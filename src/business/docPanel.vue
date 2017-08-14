<!--医生说列表组件-->

<template>
    <div>
    <div v-for="audioInfo,index in audioList" :key="audioInfo.snsKnowledge.id">
      <div class="audioItem">
          <div class="hd" @click="activate(audioInfo)">
              <img :src="getProfile(audioInfo)">
    </div>
          <div class="bd" ref="bd">
              <div @click="activate(audioInfo)">
              <p class="l">{{audioInfo.docName}}</p>
              <div style="height:3rem">
              <p class="font-hide m" >{{audioInfo.snsKnowledge.description}}</p>
    </div>
              <bubble ref="bubble" :pause="audioInfo.pause" :playing="audioInfo.on"@activate="play(audioInfo,index)" :duration="setTimeFormat(audioInfo.snsKnowledge.duration||0)"></bubble>
    </div>
              <div class="ft">
                  <p class="s light">{{audioInfo.snsKnowledge.createTime|getMyDay}}</p>
                  <p class="right s light">{{audioInfo.snsKnowledge.readNum}}人听过</p>
                  <p class="s last light" ref="thumb" @click="setColor(audioInfo)"><span class="icon" :class="{'recommanded':audioInfo.islikes}"></span>{{audioInfo.snsKnowledge.likes}}</p>
    </div>
    </div>
    </div>
    </div>
          <audio  :src="src"ref="music" class="music"></audio>
    </div>
</template>


<script>
    import {getMyDay,goodTime} from "../lib/filter.js";
    import Bubble from "../business/bubble.vue"; 
    import Api from "../lib/api.js";
  export default {
      props:{
          list:{
              type:Array,
              default:[],
              required:true
          }
      },
    data() {
      return {
          docInfo:{},
          src:"",
          nowPlaying:-1

      };
    },
      watch:{
          list(){
//              setTimeout(this.updatePanel,20);
              
          }
      },
    computed:{
        audioList(){
            return this.list;
        }
    },
    components:{
        bubble:Bubble

    },
      filters:{
          getMyDay,
          goodTime
      },
    mounted() {
        this.$refs.music.addEventListener("ended",()=>{
            this.audioList[this.nowPlaying].pause=!this.audioList[this.nowPlaying].pause;
            
        })
    },
    beforeDestroy() {
        this.$refs.music.pause();
    },
    methods: {
        getProfile(docInfo){
            if(!docInfo.docAvatar||docInfo.docAvatar==""){
                var gender=docInfo.docGender;
                return !gender||gender=="M"||gender=='m'||gender=='男'?"./static/img/docProfile.png":"./static/img/nv.png";
            }
            else{
                return docInfo.docAvatar;
            }
        },
        setTimeFormat(item){
            var hour = Math.floor (item / 3600);
            var other = item % 3600;
            var minute = Math.floor (other / 60);
            var second = (other % 60).toFixed (0);
            var res=minute + '\'' + second + '\"';
            if(hour!=0){
                res=hour + '\'' +res;
            }
            return  res;
        },
        
        
//        避免点击气泡的操作触发进入详情页的操作
        updatePanel(){
            if(this.$refs.bubble){
                for(let i=0;i<this.$refs.bubble.length;i++){
                                      this.$refs.thumb[i].addEventListener("click",(e)=>{
                                    e._flag=true;
                                },false);
                                    this.$refs.bd[i].addEventListener("click",(e)=>{
                                        if(e._flag){
                                            e.stopPropagation();
                                        }
                                    },false);
                                  }
            }
        },
        
        
        play(audioInfo,index){
            var url=audioInfo.snsKnowledge.knowUrl
            if(index==this.nowPlaying){
                return ;
            }
            if(this.nowPlaying!=-1){
                this.audioList[this.nowPlaying].pause=!this.audioList[this.nowPlaying].pause;
            }
            this.src=url;
            setTimeout(this.keepGoing,500); 
            this.nowPlaying=index;
        },
        
//        在切换url之后定时执行play命令直到音频开始播放
        keepGoing(){
            this.$refs.music.play();
            if(this.$refs.music.paused){
                setTimeout(this.keepGoing,500);
            }
            else{
                this.audioList[this.nowPlaying].on=!this.audioList[this.nowPlaying].on;
            }
        },
        
//        点赞接口
        setColor(item){
            Api("smarthos.sns.knowledge.likes",{
                knowledgeId:item.snsKnowledge.id,
                token:window.localStorage['token']          
            })
            .then((val)=>{
                if(val.succ){
                    Api("smarthos.sns.knowledge.info",{
                        id:item.snsKnowledge.id,
                        token:window.localStorage['token']     
                    })
                    .then((val)=>{
                        console.log(val);
                        item=val.obj;
                    },
                         ()=>{
                        this.$weui.alert("网络错误");
                    })
                }
                else{
                    this.$weui.alert(val.msg);
                }
            },
                 ()=>{
                this.$weui.alert("网络错误");
            })
        },
        activate(item){
            this.$router.push("/docRadio/detail/"+item.snsKnowledge.id);
        }
    }
  };
    
    
</script>

<style scoped lang="scss">
    @import "../common/var.scss";
        .audioItem{
            height:8.4rem;
            border-top:1px solid lightgrey;
            display:flex;
            flex-direction:row;
            padding:1rem;
            background-color:white;
            .hd{
                width:3rem;
                flex:0 0 auto;
                img{
                    width:80%;
                    margin:0 auto;
                    border-radius:2rem;
                }

            }
            .bd{
                flex:1 1 auto;
                .ft{
                    padding-top:1rem;
                    display:flex;
                    flex-direction:row;
                    p{
                        &.font-hide{
                            height:2.2rem;
                        }
                        flex:1 0 auto;
                        &.last{
                            position:relative;
                            text-align:center;
                        }
                    }
                    .icon{
                        background-image:url("../../static/img/rec_off.png");
                        background-size:cover;
                        background-repeat:no-repeat;
                        height:0.8rem;
                        width:0.8rem;
                        position:absolute;
                        left:0rem;
                        top:0rem;
                        &.recommanded{
                            background-image:url("../../static/img/rec_on.png");
                        }
                    }

                }

            }
        }
</style>
