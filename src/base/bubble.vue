<template>
  <div class="">
      <div class="bubble" @click="on()"ref=bubble>
          <p>{{duration}}</p>
          <audio ref="music" id="music">
              <source :src="src">
        </audio>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          duration:""
      };
    },
    props:{
        src:{
            default:"",
            type:String,
            required:true
        }
    },
    computed: {
    },
    components: {},
    mounted() {
        var _this=this;
        this.$refs.music.addEventListener('canplaythrough', function() { 
           _this.duration=_this.setTimeFormat(_this.$refs.music.duration);
        }, false);
    },
    beforeDestroy() {

    },
    methods: {
        on(){
            if(this.$refs.music.paused){
                this.$refs.bubble.className+=" on";
//            document.getElementById("music").play();
                this.$refs.music.play();
//                if(this.$refs.music){
//                    this.duration=this.setTimeFormat(this.$refs.music.currentTime);
//                    setInterval(this.getCurrentTime,100,false);
//                }
            }
            else{
                this.$refs.bubble.className="bubble";
                this.$refs.music.pause();
//                clearInterval(this.getCurrentTime,100,false);
            }
        },
        getCurrentTime(){
            this.duration=this.setTimeFormat(this.$refs.music.currentTime);
        },
        setTimeFormat(item){
            var hour = Math.floor (item / 3600);
            var other = item % 3600;
            var minute = Math.floor (other / 60);
            var second = (other % 60).toFixed (0);
            return hour + '\'' + minute + '\'' + second + '\"';
        }
    }
  };
</script>

<style scoped lang="scss">
    .bubble{
        margin:1rem 0;
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
    }
</style>
