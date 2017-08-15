<template>
  <div class="app">
      <app-header v-show="Got">
          <p class="headerTitle">名医知道</p>
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
          <p class="dark m" style="padding:0.8rem">眼底病患者术后需要知道的250个注意事项（推荐所有我的患者都务必收听一下，帮助非常大</p>
    </div>
          <my-player :docInfo="docInfo"></my-player>
    </div>
      <my-loading class="myLoading"v-show="!Got&&checkIfRefresh()"></my-loading>
  </div>
</template>

<script>
    import MyLoading from "../../base/loading/loading.vue";
    import MyPanel from "../../base/panel.vue";
    import AppHeader from "../../business/app-header.vue";
    import MyPlayer from "../../base/player.vue";
    import Api from "../../lib/api.js";
    import Reload from "../../lib/reload.js";
  export default {
    data() {
      return {
          docInfo:{},
          Got:false
      };
    },
    components: {
        AppHeader,
        MyPlayer,
        MyPanel,
        MyLoading
    },
    mounted() {
        Api("smarthos.sns.knowledge.info",{
            id:this.$route.params.id
        })
        .then((val)=>{
            this.Got=true;
            if(val.succ){
                this.docInfo=val.obj;
                console.log(this.docInfo);
            }
            else{
                this.$weui.alert(val.msg);
            }
        },
             ()=>{
            this.$weui.alert("网络错误");
        })
    },
    mixins:[Reload],
    methods: {
        getProfile(docInfo){
            if(!docInfo.docAvatar||docInfo.docAvatar==""){
                var gender=docInfo.docGender;
                return !gender||gender=="M"||gender=='m'||gender=='男'?"./static/img/docProfile.png":"./static/img/nv.png";
            }
            else{
                return docInfo.docAvatar;
            }
        },
        goDoc(){
            this.$router.push("/doctor/"+this.docInfo.snsKnowledge.docId);
        }
    }
  };
</script>

<style scoped lang="scss">
@import "../../common/var.scss";
    @mixin flex{
        display:flex;
        flex-direction:column;
    }
    .app{
        display:flex;
        flex-direction:column;
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
/*
        p{
            margin:0 auto;
            padding:1rem;
        }
*/
    }
</style>
