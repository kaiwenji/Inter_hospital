<template>
  <div class="">
      <div class="bubble" @click="on()"ref=bubble>
          <p>{{duration}}</p>
          <audio ref="music" id="music" onload="initialAudio">
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
          intervalId:""
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
        this.$refs.music.addEventListener("loadstart",this.initialAudio);
    },
    beforeDestroy() {
        clearInterval(this.intervalId);

    },
    methods: {
        initialAudio(){
            this.$refs.music.addEventListener('canplaythrough', ()=> { 
               this.duration=this.setTimeFormat(this.$refs.music.duration);
            }, false);
        },
        on(){
            if(this.$refs.music.paused){
                this.$refs.bubble.className+=" on";
                this.$refs.music.play();
                this.intervalId=setInterval(this.checkIfEnd,100);
            }
        },
        checkIfEnd(){
          if(this.$refs.music.ended){
              console.log("end");
              this.$refs.bubble.className="bubble";
              clearInterval(this.intervalId);
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
        }
    }
  };
</script>

<style scoped lang="scss">
    .bubble{
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
