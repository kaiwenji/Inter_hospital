<template>
    <div>
      <div class="upLoad">
        <div class="addImg">
          <img src="../../static/img/addImg.png" alt="">
        </div>
        <div class="hint">
          <p class="bf">添加图片</p>
          <p class="mfc">请上传患处图片，让医生更了解您</p>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        components: {

        },
        data(){
            return {}
        },
        mounted(){

        }
    }
</script>
<style scoped lang='scss'>
    @import '../common/public.scss';
    .upLoad{
      box-sizing: border-box;
      padding: 30rem/$rem 0;
      display: flex;
      align-items: center;
    img{
      width: 140rem/$rem;
      height: 140rem/$rem;
    }

    }
    .hint{
      padding-left: 30rem/$rem;
      box-sizing: border-box;
    }
</style>
