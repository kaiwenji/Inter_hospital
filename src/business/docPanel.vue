<template>
    <div>
        <p>{{test}}</p>
        <p @click="check()">version2.6</p>
    <div v-for="audioInfo,index in audioList" :key="audioInfo.snsKnowledge.id">
      <div class="audioItem" @click="activate(audioInfo)">
          <div class="hd">
              <img :src="audioInfo.docAvatar">
    </div>
          <div class="bd" ref="bd">
              <p class="l">{{audioInfo.docName}}</p>
              <div style="height:3rem">
              <p class="font-hide m" >{{audioInfo.snsKnowledge.description}}</p>
    </div>
              <div class="Bubble">
              <bubble ref="bubble" :pause="audioInfo.pause" :playing="audioInfo.on"@activate="play(audioInfo,index)" :duration="setTimeFormat(audioInfo.snsKnowledge.duration||0)"></bubble>
                  <div class="supplement"></div>
    </div>
              <div class="ft">
                  <p class="s light">{{audioInfo.snsKnowledge.createTime|getMyDay}}</p>
                  <p class="right s light">{{audioInfo.snsKnowledge.readNum}}人听过</p>
                  <p class="s last light" ref="thumb" @click="setColor(audioInfo)"><img class="icon" :src="recSrc[index]" >{{audioInfo.snsKnowledge.likes}}</p>
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
          src:"http://music.163.com/song/media/outer/url?id=229285.mp3",
          nowPlaying:-1,
          test:""

      };
    },
      watch:{
          list(){
              setTimeout(this.updatePanel,20);
             
          }
      },
    computed:{
        audioList(){
            return this.list;
        },
        recSrc(){
            var res=[];
            for(let i =0;i<this.audioList.length;i++){
                if(this.audioList[i].islikes){
                    res[i]= "./static/img/rec_on.png";
                }
                else{
                    res[i]= "./static/img/rec_off.png";
                }
            }
            return res;
        }
    },
    components:{
        bubble:Bubble

    },
      created(){
          this.audio= new Audio();
          
      },
      filters:{
          getMyDay,
          goodTime
      },
    mounted() {
        this.$refs.music.addEventListener("ended",()=>{
            console.log("ended");
            this.audioList[this.nowPlaying].pause=!this.audioList[this.nowPlaying].pause;
            
        })
    },
    beforeDestroy() {
        this.$refs.music.pause();
    },
    methods: {
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
        check(){
//            this.audio.play();
            this.$refs.music.play();
            this.test="metadata";
        },
        updatePanel(){
            for(let i=0;i<this.$refs.bubble.length;i++){
                                  this.$refs.bubble[i].$el.addEventListener("click",(e)=>{
                                    e._flag=true;
                                })
                                  this.$refs.thumb[i].addEventListener("click",(e)=>{
                                e._flag=true;
                            },false);
                                this.$refs.bd[i].addEventListener("click",(e)=>{
                                    if(e._flag){
                                        e.stopPropagation();
                                    }
                                },false);
                              }
        },
        play(audioInfo,index){
            console.log("bubble")
            
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
        keepGoing(){
            this.$refs.music.play();
            if(!this.$refs.music.currentTime||this.$refs.music.currentTime==0){
                setTimeout(this.keepGoing,500);
            }
            else{
                console.log(this.$refs.music.currentTime);
                this.audioList[this.nowPlaying].on=!this.audioList[this.nowPlaying].on;
            }
        },
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
                        this.audioInfo=val.obj;
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
//            console.log(this.$refs.music.duration);
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
                        height:0.8rem;
                        position:absolute;
                        left:0rem;
                        top:0rem;
                    }

                }

            }
        }
    .Bubble{
        margin:0.8rem 0;
        display:flex;
        flex-direction:row;
        div{
            flex:0 0 auto;
            &.supplement{
                flex:1 1 auto;
            }
        }
    }
</style>
