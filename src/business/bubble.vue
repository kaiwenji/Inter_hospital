<template>
  <div class="">
      <div class="bubble" ref=bubble :class="{'on':isPlay}">
          <div class="broadcast" :class="{'loading':isLoading}"></div>
          <p class="l">{{duration}}</p>
<!--
          <audio ref="music" id="music" @load="initialAudio":src="src" class="music">
        </audio>
-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          isPlay:false,
          isLoading:false,
          flag:true
      };
    },
    props:{
        duration:{
            default:'',
            type:String,
            required:true
        },
        pause:{
            default:false,
            type:Boolean,
            required:true
        },
        load:{
            default:false,
            type:Boolean,
            required:false
        },
        playing:{
            default:false,
            type:Boolean,
            required:false
        }
    },
    computed: {
        
    },
    components: {},
    mounted() {
//            var audio=this.$refs.music;
//            audio.setAttribute("src",this.src);
//        audio.addEventListener('canplay',this.getDuration, false);
    },
    watch:{
        pause(){
            console.log("pause",this.pause);
            this.isPlay=false;
            this.isLoading=false;
        },
        playing(){
            console.log("playing");
            this.isPlay=true;
            this.isLoading=false;
        }
    },
    beforeDestroy() {
//        clearInterval(this.intervalId);

    },
    methods: {
        play(){
            this.isLoading=true;
//            this.isPlay=true;
            if(this.flag){
//                setTimeout(()=>{
                    this.$emit("activate");
//                    this.flag=false;
//                              },500)
            }
        },
//        getDuration(){
//               this.duration=this.setTimeFormat(this.$refs.music.duration);
//        },
//        on(){
//            if(this.$refs.music.paused){
//                var audioList=document.getElementsByClassName("music");
//                for(let i=0;i<audioList.length;i++){
//                    audioList[i].pause();
//                    audioList[i].currentTime=0;
//                    
//                }
//                this.$refs.bubble.className+=" on";
//                this.$refs.music.play();
//                this.intervalId=setInterval(this.checkIfEnd,100);
//            }
//        },
//        checkIfEnd(){
//          if(this.$refs.music.paused){
//              console.log("end");
//              this.$refs.bubble.className="bubble";
//              clearInterval(this.intervalId);
//          }  
//        },

    }
  };
</script>

<style scoped lang="scss">
    @import "../common/var.scss";
    .bubble{
        position:relative;
        background-image:url(../../static/img/bubble_off.png);
        &.on{
            background-image:url(../../static/img/bubble_on.png);
        }
        background-size:contain;
        height:2rem;
        width:8rem;
        background-repeat:no-repeat;
        display:flex;
        flex-direction:row-reverse;
        align-items:center;
        p{
            color:white;
            padding:1rem;
        }
        .broadcast{
            background-image:url("../../static/img/broadcast.png");
            &.loading{
                background-image:url('../../static/img/loading.gif');
            }
            background-size:0.6rem 0.8rem;
            background-repeat:no-repeat;
            position:absolute;
            height:0.8rem;
            width:0.8rem;
            left:1rem;
            top:0.6rem;
        }
    }
</style>
