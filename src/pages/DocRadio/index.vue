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
          <pull-up @pullUp="loadingMore">
          <div v-for="item in audioList">
          <doc-panel :item="item" @activate="go(item)"></doc-panel>
    </div>
    </pull-up>
    </div>
    <div id="toast" v-show="nothingMore">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <p class="weui-toast__content">无更多内容</p>
        </div>
    </div>
      <app-footer index="2"></app-footer>
  </div>
</template>

<script>
    import PullUp from "../../base/pullUp.vue";
    import AppHeader from "../../business/app-header.vue";
    import DocPanel from "../../business/docPanel.vue";
    import AppFooter from '../../business/app-footer.vue';
    import Api from "../../lib/api.js";
  export default {
    data() {
      return {
          audioList:[],
          page:1,
          nothingMore:false,
          docId:"595d05b0f19b9c898a58cc00"
      };
    },
    computed: {},
    components: {
        AppHeader,
        DocPanel,
        AppFooter,
        PullUp
    },
    mounted() {
        document.getElementById("metalBox").addEventListener("click",(e)=>{
            e.stopPropagation();
            console.log("click");
        });
        this.getInfo();
    },
    beforeDestroy() {

    },
    methods: {
        getInfo(){
            Api("smarthos.sns.knowledge.page",{
                pageNum:this.page,
                pageSize:10,
                docId:this.$route.params.id
            })
            .then((val)=>{
                console.log(val);
                this.audioList.push(...val.list);
                if(this.page==val.page.total){
                    this.page=-1;
                }
                else{
                    this.page++;
                }
                console.log(this.page);
                
            })
        },
        go(item){
            console.log(item.snsKnowledge.id);
            this.$router.push("/docRadio/detail/"+item.snsKnowledge.id);
        },
        loadingMore(){
            if (this.page!=-1){
                this.getInfo();
            }
            else{
                this.nothingMore=true;
                setTimeout(()=>{
                    this.nothingMore=false
                },1000);
            }
            
        },
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
        #toast{
        p{
            position:absolute;
            left:1.3em;
            top:3em;
        }
    }
</style>
