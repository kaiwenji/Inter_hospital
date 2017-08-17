<template>
  <div class="background" ref="background">
      <div class="weui-msg">
    <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
    <div class="weui-msg__text-area">
        <p class="weui-msg__title spacing" >预约成功</p>
        <p class="weui-msg__desc small spacing">您的取号密码<br><span class="password">123456</span></p>
        <p class="weui-msg__desc small spacing">您可以前往个人中心查看预约记录</p>
    </div>
    <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
            <a class="weui-btn weui-btn_default" @click="to('/myRegistration')">查看预约记录</a>
            <a class="weui-btn weui-btn_default" @click="to('/patientIndex')">返回</a>
        </p>
    </div>

</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          password:"123445"
      };
    },
    computed:{

    },
    components:{

    },
    mounted() {
        this.setHeight();
    },
    beforeDestroy() {

    },
    created(){
        this.password=this.$route.params.id;
    },
    methods: {
        to(path){    
            this.$router.push(path);
        },
        setHeight(){
            let screenHeight=document.documentElement.clientHeight;
            this.$refs.background.style.height=screenHeight-45+'px';
        }
    }
  };
</script>

<style scoped lang="scss">
    .password{
        font-size:2.5rem;
        color:blue;
    }
    .small{
        font-size:0.77rem;
        
    }
    .spacing{
        margin-bottom:2rem;
    }
    .background{
        background-color:rgb(248,248,248);
    }
</style>
