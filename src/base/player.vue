<template>
  <div >
      <div class="player">
          <div class="player_bd">
              <a @click="on()"><img class="button" ref="button" src="../../static/img/on.png"></a>
              <div class="info">
                  <div class="wrap" ref="shiftBlock">
                  <p class="title">{{docInfo.snsKnowledge&&docInfo.snsKnowledge.knowTitle}}</p>
    </div>
                  <p>{{docInfo.docName}}</p>
                  
                  <div class="weui-slider-box">

                            <div class="weui-slider">
                                    <p class="right">{{currentTime}}/{{duration}}</p>
                                <div class="weui-slider__inner" ref="slider">
                                    <div style="width: 0;" class="weui-slider__track" id="track" ref='track'>
    
                                        <div style="left: 0;" class="weui-slider__handler" id="handler" ref="handler">
                                            <div class="centroid">
    </div>
    </div>
                </div>
                                </div>
                            </div>
                </div> 
                  
    </div>
    </div>
          <div class="player_ft">
              <p>{{docInfo.snsKnowledge&&docInfo.snsKnowledge.createTime|getMyDay}}</p>
              <p class="right">{{docInfo.snsKnowledge&&docInfo.snsKnowledge.readNum}}人听过</p>
              <p class="right"><img class="icon" src="../../static/img/thumb.png">{{docInfo.snsKnowledge&&docInfo.snsKnowledge.likes}}</p>
    </div>
          <audio ref="music" id="music" :src="src">
        </audio>
    </div>
  </div>
</template>

<script>
    import {getMyDay} from "../lib/filter.js"
  export default {
    data() {
      return {
          duration:"",
          currentTime:"",
          intervalId:'',
          direction:"right",
          target:-1
      };
    },
      filters:{
          getMyDay
      },
    props:{
        docInfo:{
            default:{},
            type:Object,
            required:true
        }
    },
    computed: {
        src(){
            if(this.docInfo.snsKnowledge){
                return this.docInfo.snsKnowledge.knowUrl;
                setTimeout(this.$refs.music.load(),100);
            }
            else{
                return "";
            }
        }
    },
    components: {},
    mounted() {
        var _this=this;
        this.$refs.music.addEventListener('canplaythrough', function() { 
           _this.duration=_this.setTimeFormat(_this.$refs.music.duration);
            _this.currentTime=_this.setTimeFormat(_this.$refs.music.currentTime);
        }, false);
        this.initialSlider();

    },
    beforeDestroy() {
        clearInterval(this.intervalId);

    },
    methods: {
        initialSlider(){
            var sliderHandler=document.getElementById("handler");
            var sliderTrack=document.getElementById("track");
            var totalLen = this.$refs.slider.clientWidth,
                startLeft = 0,
                startX = 0;
            var _this=this;
            sliderHandler.addEventListener('touchstart', function (e) {
                    startLeft = parseInt(sliderHandler.style.left) * totalLen / 100;
                    startX = e.changedTouches[0].clientX;
                });
            sliderHandler.addEventListener('touchmove', function(e){
                var dist = startLeft + e.changedTouches[0].clientX - startX,
                    percent;
                dist = dist < 0 ? 0 : dist > totalLen ? totalLen : dist;
                percent =  parseInt(dist / totalLen * 100);
                sliderTrack.style.width= percent + '%';
                sliderHandler.style.left=percent + '%';
                _this.$refs.music.currentTime=_this.$refs.music.duration*(percent/100);
                _this.currentTime=_this.setTimeFormat(_this.$refs.music.currentTime);;
//                alert(Math.floor(_this.$refs.music.duration*(percent/100)));
                e.preventDefault();
                });
        },
        on(){
            if(this.$refs.music.paused&&!this.$refs.music.ended){
                this.$refs.button.src="../../static/img/pause.png";
                this.$refs.music.play();
                if(this.$refs.music){
                    this.currentTime=this.setTimeFormat(this.$refs.music.currentTime);
                    this.intervalId=setInterval(this.getCurrentTime,100,false);
                }
            }
            else{
                this.$refs.music.pause();
                clearInterval(this.intervalId);
                this.$refs.button.src="../../static/img/on.png";    
            }
        },
        getCurrentTime(){
            var newVal;
            if(this.$refs.music.ended){
                this.on();
                this.$refs.music.load();
                newVal=0;
            }
            else{
                newVal=(this.$refs.music.currentTime/this.$refs.music.duration)*100;
            }
            if(this.target==-1){
                this.target=this.$refs.shiftBlock.scrollWidth-this.$refs.shiftBlock.offsetWidth;
            }
            this.currentTime=this.setTimeFormat(this.$refs.music.currentTime);
            this.$refs.track.style.width=newVal+"%";
            this.$refs.handler.style.left=newVal+ "%";
            if(this.direction=="left"){
                this.$refs.shiftBlock.scrollLeft-=1;
                if(this.$refs.shiftBlock.scrollLeft==0){
                    this.direction="right";
                }
            }
            else{
                this.$refs.shiftBlock.scrollLeft+=1;
                if(this.$refs.shiftBlock.scrollLeft==this.target){
                    this.direction="left";
                }
            }
            
        },
        setTimeFormat(item){
            var res="";
            var hour = Math.floor (item / 3600);
            if (hour>0){
                res+=hour+":";
            }
            var other = item % 3600;
            var minute =("0" + Math.floor (other / 60)).slice(-2);;
            var second =("0" + ((other % 60).toFixed (0))).slice(-2);;
            res+=minute + ':' + second;
            return  res;
        }
    }
  };
</script>

<style scoped lang="scss">
    @import "../common/var.scss"; 
    $transparent:rgb(140,222,255);
    p{
        color:$transparent;
        font-size:0.77rem;
        &.right{
            text-align:right;
        }
        &.title{
            color:white;
            font-size:0.875rem;
            white-space:nowrap;
        }
    }
    .player{
        height:7rem;
        width:15rem;
        margin:1.5rem;
        border-radius:0.5rem;
        background-color:rgb(15,189,245);
        padding:1rem;

    }
    .player_bd{
        display:flex;
        flex-direction:row;
        .info{
            padding-top:1rem;
            flex:0 0 auto;
            width:10rem;
            height:4rem;

        }
        a{
            display:block;
            flex:0 0 auto;
            width:3rem;
            height:4rem;
            padding:1rem;
        }
    }
    .button{
        height:3rem;
    }
    .weui-slider__handler{
        background: transparent;
        left: 82%;
        display: flex;
        flex-direction: column;
        box-shadow: none;

    }
    .centroid{
        margin: auto;
        height: 10px;
        width: 10px;
        border-radius: 1rem;
        background-color: white;
    }
    .weui-slider__track{
        background-color:white;
    }
    .weui-slider__inner{
        background-color:$transparent;
    }
    .weui-slider{
        padding:0;
    }
    .player_ft{
        display:flex;
        flex-direction:row;
        p{
            flex:1 0 auto;
        }
        
    }
    .icon{
        height:1rem;
        position:relative;
        left:-0.2rem;
        top:0.2rem;
    }
</style>
