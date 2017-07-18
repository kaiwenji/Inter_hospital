<template>
  <div >
      <div class="player">
          <div class="player_bd">
              <a ><img class="button" src="../../static/img/on.png"></a>
              <div>
                  <p>眼底病紧急自救</p>
                  <p>李时珍</p>
                  <p>{{currentTime}}/{{duration}}</p>
                  
    </div>
    </div>
          <div class="player_ft">
    </div>
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
          duration:"",
          currentTime:""
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
                this.$refs.music.play();
                if(this.$refs.music){
                    this.currentTime=this.setTimeFormat(this.$refs.music.currentTime);
                    setInterval(this.getCurrentTime,100,false);
                }
            }
            else{
                this.$refs.music.pause();
                clearInterval(this.getCurrentTime,100,false);
            }
        },
        getCurrentTime(){
            this.currentTime=this.setTimeFormat(this.$refs.music.currentTime);
        },
        setTimeFormat(item){
            var res="";
            var hour = Math.floor (item / 3600);
            if (hour>0){
                res+=hour+":";
            }
            var other = item % 3600;
            var minute = Math.floor (other / 60);
            var second = (other % 60).toFixed (0);
            res+=minute + ':' + second
            return  res;
        }
    }
  };
</script>

<style scoped lang="scss">
    .player{
        height:6rem;
        width:15rem;
        margin:1.5rem;
        border-radius:0.5rem;
        background-color:rgb(15,189,245);
        padding:1rem;

    }
    .player_bd{
        display:flex;
        flex-direction:row;
        div{
            flex:0 0 auto;
            width:12rem;
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
</style>
