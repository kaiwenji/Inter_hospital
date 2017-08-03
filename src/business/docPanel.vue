<template>
<div>
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
              <bubble ref="bubble" :pause="audioInfo.on" @activate="play(audioInfo,index)" duration=""></bubble>
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
    
          <audio  :src="src" ref="music" class="music"></audio>
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
          src:"",
          nowPlaying:-1

      };
    },
      watch:{
          list(){
              setTimeout(()=>{
                  console.log(this.$refs.bubble[0].$el)
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
              },20);
             
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
      filters:{
          getMyDay,
          goodTime
      },
    mounted() {

//              console.log(this.$refs);

        this.$refs.music.addEventListener("canplaythrough",()=>{
            alert("canplay");
            this.$refs.music.play();
            
        })
        this.$refs.music.addEventListener("ended",()=>{
            console.log("ended");
            this.audioList[this.nowPlaying].on=!this.audioList[this.nowPlaying].on;
            
        })
    },
    beforeDestroy() {
        

    },
    methods: {
        play(audioInfo,index){
            
            var url=audioInfo.snsKnowledge.knowUrl
            if(index==this.nowPlaying){
                return ;
            }
            if(this.nowPlaying!=-1){
                this.audioList[this.nowPlaying].on=!this.audioList[this.nowPlaying].on;
            }
            this.src=url;
            setTimeout(this.keepGoing,100);
            this.$refs.music.play();
            this.nowPlaying=index;
        },
        keepGoing(){
            if(this.$refs.music.paused){
                this.$refs.music.play();
                setTimeout(this.keepGoing,100);
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
            this.$router.push("/docRadio/detail/"+item.snsKnowledge.id);
        }
    }
  };
</script>

<style scoped lang="scss">
    @import "../common/var.scss";
        .audioItem{
            height:8.4rem;
            border:1px solid lightgrey;
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
