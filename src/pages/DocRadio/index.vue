<template>
  <div class="app">
      <app-header id="header">
          <div slot="left" id="metalBox"></div>
          <p class="headerTitle">名医知道</p>
          <div slot="right" style="position:relative">
              <img src="../../../static/img/envelop.png" class="envelop">
              <span class="weui-badge badge">8</span>
    </div>
    </app-header>
      <div class="wrap">
          <div v-for="item in audioList">
          <doc-panel :item="item" @activate="go(item)"></doc-panel>
    </div>
    </div>
      <app-footer index="2"></app-footer>
  </div>
</template>

<script>
    import AppHeader from "../../business/app-header.vue";
    import DocPanel from "../../business/docPanel.vue";
    import AppFooter from '../../business/app-footer.vue';
  export default {
    data() {
      return {
          audioList:[{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"}]
      };
    },
    computed: {},
    components: {
        AppHeader,
        DocPanel,
        AppFooter
    },
    mounted() {
        document.getElementById("metalBox").addEventListener("click",(e)=>{
            e.stopPropagation();
            console.log("click");
        });
    },
    beforeDestroy() {

    },
    methods: {
        go(item){
            this.$router.push("/docRadio/detail/");
        }
    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";
    header{
        border-bottom:1px solid silver;
    }
    @mixin flex{
        display:flex;
        flex-direction:column;
        flex:1 1 auto;
    }
    .app{
        @include flex;
    }
    .wrap{
        @include flex;
        overflow:auto;
    }
    .badge{
        position:absolute;
        font-size:0.5rem;
        right:0.5rem;
        top:.5rem;
        
    }
    .envelop{
        position:absolute;
        display:block;
        width:1.1rem;
        right:1rem;
        top:15px;
    }
    #metalBox{
        width:100%;
        height:100%
    }
    
</style>
