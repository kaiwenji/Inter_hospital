<template>
  <header >
        <div class="left" @click="back"><slot name="left"><font><span>&#xe600;</span></font></slot></div>
    <slot> </slot>
      <div class="right">
        <slot name="right"></slot>
      </div>
  </header>
</template>


<script type="text/ecmascript-6">

  export default {
    props: {},
    data() {
      return {};
    },
    computed: {},

    mounted() {

    },
    beforeDestroy() {

    },

    methods: {
      back(){
        this.$router.go(-1)
      }
    }

  };
</script>

<style scoped lang="scss">
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_33qiq29sp5y7gb9.woff') format('woff'),
  }
  span{
    font-family: 'iconfont';
    font-size: 18px;
  }

  $w:4.5rem;

  header{
    position: relative;
    height: 45px;
    line-height: 45px;
    background-color: white;
    width: 100%;
    text-align: center;

   z-index:888;
  }




.left{
  position: absolute;
  top:0px;
  left: 10px;
  height: 45px;
  line-height: 45px;
  z-index: 911;
}
  .right{
    position: absolute;
    top: 0px;
    right: 10px;
    height: 45px;
    line-height: 45px;
    z-index: 911;
  }

</style>
