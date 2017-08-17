<template>
  <div style="background-color:white;">
    <a class="weui-cell" :class="{'weui-cell_access':hasArrow=='true'}" href="javascript:;" @click="update">
        <div class="weui-cell__hd">
            <slot name="picture"><img src="../../static/img/docProfile.png" class="figure"></slot>
    </div>
        <div class="weui-cell__bd">
            <slot name="article"></slot>
        </div>
        <div class="weui-cell__ft">
        <slot name="ft"></slot>
            </div>
    </a>
  </div>
</template>

<script>
  export default {
      props:{
            hasArrow:{
                type:String,
                default:"true",
                required:false
            }  
      },
    data() {
      return {

      };
    },
    computed:{

    },
    components:{

    },
      watch:{
      },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        update(){
            this.$emit("activate");
        }

    }
  };
</script>

<style scoped lang="scss">
    p{
        color:black;
    }

</style>
