<template>
<div class="app">
    <app-header>
        <p class="headerTitle">医生说</p>
    </app-header>
    <pull-up @pullUp="loadingMore" :flag="flag">
    <div class="main">
    <div v-for="item in audioList">
    <doc-panel :item="item" @recommend="setColor"></doc-panel>
    </div>
    </div>
    </pull-up>
    <div id="toast" v-show="nothingMore">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <p class="weui-toast__content">无更多内容</p>
        </div>
    </div>
    <my-loading v-show="!Got" class="myLoading"></my-loading>
    </div>
</template>

<script>
    import MyLoading from "../../base/loading/loading.vue";
    import PullUp from "../../base/pullUp.vue";
    import AppHeader from "../../business/app-header.vue";
    import DocPanel from "../../business/docPanel.vue";
    import Api from "../../lib/api.js";
  export default {
    data() {
      return {
          audioList:[],
          page:1,
          nothingMore:false,
          Got:false,
          flag:true
      };
    },
    computed: {},
    components: {
        AppHeader,
        DocPanel,
        PullUp,
        MyLoading
    },
    mounted() {

        this.getInfo();

    },
    beforeDestroy() {

    },
    methods: {
        getInfo(){
            Api("smarthos.sns.knowledge.page",{
                pageNum:this.page,
                pageSize:10,
                docId:this.$route.params.id,
                token:window.localStorage['token']
            })
            .then((val)=>{
                this.Got=true;
                this.flag=!this.flag;
                if(val.succ){
                    this.audioList=val.list;
                    if(this.page==val.page.total){
                        this.page=-1;
                    }
                    else{
                        this.page++;
                    }
                }
                else{
                    this.$weui.alert(val.msg);
                }
                
            },
                 ()=>{
                this.$weui.alert("网络错误");
            })
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
    #toast{
        p{
            position:absolute;
            left:1.3em;
            top:3em;
        }
    }
</style>
