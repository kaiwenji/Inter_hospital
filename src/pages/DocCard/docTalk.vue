<template>
<div class="app">
    <app-header>
        <p class="headerTitle">李董良医生说</p>
    </app-header>
    <div class="main">
    <div v-for="item in audioList">
    <doc-panel :item="item" @recommend="setColor"></doc-panel>
    </div>
    </div>
    </div>
</template>

<script>
    import AppHeader from "../../business/app-header.vue";
    import DocPanel from "../../business/docPanel.vue";
  export default {
    data() {
      return {
          audioList:[{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"}]
      };
    },
    computed: {},
    components: {
        AppHeader,
        DocPanel
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        setColor(){
            console.log("setColor");
        }
    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";
    header{
        border-bottom:1px solid lightgrey;
    }
    .main{
        flex:1 1 auto;
        overflow:auto;
    }
    .app{
        flex:1 1 auto;
        display:flex;
        flex-direction:column;
    }
</style>
