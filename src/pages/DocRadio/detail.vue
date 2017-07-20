<template>
  <div class="app">
      <app-header>
          <p class="headerTitle">名医知道</p>
    </app-header>
      <my-panel>
          <div slot="picture">
              <img src="../../../static/img/docProfile.png" class="figure">
    </div>
          <div slot="article" class="article">
              <div class="horiFlex">
                  <p class="xl darker">李时珍</p>
                  <p class="l dark">主任医生</p>
    </div>
              <p class="m light">浙江大学附属第二医院</p>
              <p class="m light">眼科</p>
    </div>
    </my-panel>
      <div class="main">
          <div>
          <p class="dark m">眼底病患者术后需要知道的250个注意事项（推荐所有我的患者都务必收听一下，帮助非常大</p>
    </div>
          <my-player src="../../../static/music/test.mp3"></my-player>
    </div>
  </div>
</template>

<script>
    import MyPanel from "../../base/panel.vue";
    import AppHeader from "../../business/app-header.vue";
    import MyPlayer from "../../base/player.vue";
  export default {
    data() {
      return {};
    },
    computed: {},
    components: {
        AppHeader,
        MyPlayer,
        MyPanel
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";
    @mixin flex{
        display:flex;
        flex-direction:column;
    }

    .app{
        flex:1 1 auto;
        @include flex;
        
    }
    header{
        border-bottom:1px solid lightgrey;
    }
    .horiFlex{
        display:flex;
        p{
            padding-right:0.5rem;
        } 
    }
    .figure{
        height:3.7rem;
    }
    .article{
        padding-left:0.8rem;
    }
    .main{
        margin-top:1rem;
        flex:1 1 auto;
        background-color:white;
        div{
            padding:0 auto;
        }
/*
        p{
            margin:0 auto;
            padding:1rem;
        }
*/
    }
</style>
