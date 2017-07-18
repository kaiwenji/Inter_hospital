<template>
  <div class="app" ref="wrap">
      
      <app-header class="test" ref="header" id="header"> 
          <p style="text-align:center; flex:1 1 auto">{{title}}</p>
          <p slot="right" style="flex: 0 0 auto">关注</p>
    </app-header>
      <div>
          <div class="info">
              <p>金凯文</p>
    </div>
          <div class="tab" ref="tab">
              <div class="tab_contain">
                  <div><div><img src="../../static/img/red.png"><p class="red">预约挂号</p></div></div>
                  <div><div><img src="../../static/img/green.png"><p class="green">加号申请</p></div></div>
                  <div><div><img src="../../static/img/blue.png"><p class="blue">患者报道</p></div></div>
    </div>
              <div class="tab_shadow">
    </div>
    </div>
          <div class="supplement" ref="supplement"></div>
          <div class="speciality" v-for="item in list">
              <div>
                      <p>{{item.title}}</p>
              <p class="font-hide">{{item.desc}}</p>
    </div>
              <div style="display:flex;flex-direction:column">
                  <img src="../../static/img/pullDown.png" style="padding:2.6rem 1rem;width:1rem;">
    </div>
    </div>
          <div class="docAudio" >
              <div>
    </div>
              <div class="audioItem"v-for="item in audioList">
                  <p>{{item.name}}</p>
                  <p>{{item.desc}}</p>
    </div>
              
    </div>
          <div>
    </div>
    </div>
  </div>
</template>

<script>
    import AppHeader from "../business/app-header.vue";
  export default {
    data() {
      return {
          example:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。",
          title:"我的名片",
          list:[{title:"医生擅长",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{title:"医生介绍",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"}],
          audioList:[{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"}]
      };
    },
    computed: {
    },
    components: {
        AppHeader
    },
    mounted() {
        this.$refs.wrap.onscroll=()=>{
            var top=this.$refs.wrap.scrollTop
            this.setHeaderColor(top);
            this.setTabClass(top);
        }
    },
    beforeDestroy() {

    },
    methods: {
        setHeaderColor(top){
            
            var opacity=top-35>0?top-35:0;
            opacity/=35;
            document.getElementById("header").style.backgroundColor="rgba(255,255,255,"+opacity+")";
            if(opacity>=0.8){
                this.title="金凯文";
                document.getElementById("header").style.color="black";
            }
            if(opacity<0.8){
                this.title="我的名片";
                document.getElementById("header").style.color="white";
            }
        },
        setTabClass(top){
            if(top>115){
                if(this.$refs.tab.className!="tab tab_fixed"){
                    this.$refs.tab.className+=" tab_fixed";
                    this.$refs.supplement.style.height="4.2rem";
                }
            }
            else{
                this.$refs.tab.className="tab";
                this.$refs.supplement.style.height="0";
            }
        }
    }
  };
</script>

<style scoped lang="scss">
    $orangeRed:rgb(247,94,35);
    $lightGreen:rgb(42,182,179);
    $lightBlue:rgb(22,151,219);
    p{
        font-size:0.875rem;
        &.green{
            color:$lightGreen;
        }
        &.red{
            color:$orangeRed;
        }
        &.blue{
            color:$lightBlue;
        }
    }
    .test{
        position:fixed;
        width:20rem;
        background-color:rgba(255,255,255,0);
        color:white;
    }
    .app{
        flex:1 1 auto;
        background-color:rgb(248,248,248);
        overflow:auto;
    }
    .info{
        height:10rem;
        background-color:deepskyblue;
        p{
            width:20rem;
            text-align:center;
            padding-top:5rem;
        }
    }
        .tab{
            height:4.2rem;
            background-color:white;
            display:flex;
            flex-direction:column;
            .tab_shadow{
                flex:1 1 auto;
                background-image:linear-gradient(to top,lightgrey,white);
                
            }
            .tab_contain{
                height:3.9rem;
                display:flex;
                flex-direction:row;
                div{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    div{
                        display:flex;
                        flex-direction:column;
                        img{
                            padding-bottom:0.5rem;
                            height:1.92rem;
                        }

                    }
                    flex:1 1 auto;
                }
            }
            &.tab_fixed{
            position:fixed;
            top:45px;
            width:20rem;    
            }
        }
    .speciality{
        height:5.86rem;
        width:20rem;
        background-color:white;
        display:flex;
        flex-direction:row;
        margin-bottom:1rem;
        div{
            flex:1 1 auto;

            p{
                padding-top:0.5rem;
                padding-left:1rem;
                border-left:1px solid blue;
            }
        }
    }
    .docAudio{
        height:60rem;
        flex:1 1 auto;
        .audioItem{
            padding:1rem;
            background-color:white;
        }
        
    }
    .supplement{
        height:0;
        width:20rem;
    }
    .font-hide{
        overflow:hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
    }
</style>
