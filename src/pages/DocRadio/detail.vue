<template>
  <div class="app">
      <app-header v-show="Got">
          <p class="headerTitle">Doctors' posts</p>
    </app-header>
      <my-panel @activate="goDoc" v-show="Got">
          <div slot="picture">
              <img :src="getProfile(docInfo)" class="figure">
    </div>
          <div slot="article" class="article">
              <div class="horiFlex">
                  <p class="xl darker">{{docInfo.docName}}</p>
                  <p class="l dark">{{docInfo.docTitle}}</p>
    </div>
              <p class="m light">{{docInfo.docHosName}}</p>
              <p class="m light">{{docInfo.docDeptName}}</p>
    </div>
    </my-panel>
      <div class="main" v-show="Got">
          <div>
          <p class="dark m" style="padding:0.8rem"></p>
    </div>
          <my-player :docInfo="docInfo"></my-player>
          <p style = "padding:1rem">all of these pages are examples with no api connected and with some fixed example data</p>
    </div>
  </div>
</template>

<script>
    import MyPanel from "../../base/panel.vue";
    import AppHeader from "../../business/app-header.vue";
    import MyPlayer from "../../base/player.vue";
    import Api from "../../lib/api.js";
    import Reload from "../../lib/reload.js";
    import myMixin from "../../lib/public.js";
  export default {
    data() {
      return {
          docInfo:{
              snsKnowledge:{
                knowTitle:"My favorite Chinese Song of the 80's",
                readNum:3,
                createTime:Date.parse( new Date()),
                knowUrl:"../../../static/music/test.mp3"
              },
                docName:"kaiwenji"
          },
          Got:false
      };
    },
    components: {
        AppHeader,
        MyPlayer,
        MyPanel
    },
    mounted() {
        this.Got = true;
//        Api("smarthos.sns.knowledge.info",{
//            id:this.$route.params.id
//        })
//        .then((val)=>{
//            this.Got=true;
//            if(val.succ){
//                this.docInfo=val.obj;
//            }
//            else{
//                this.$weui.alert(val.msg);
//            }
//        },
//             ()=>{
//            this.$weui.alert("网络错误");
//        })
    },
    mixins:[myMixin],
    methods: {
        goDoc(){
            alert("go to the doctor's main page");
//            this.$router.push("/doctor/"+this.docInfo.snsKnowledge.docId);
        }
    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";
    .app{
        @include vertical
        flex:1 1 auto;
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
        border-radius:2rem;
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
    }
</style>
