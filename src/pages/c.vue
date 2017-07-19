<template>
  <div class="app" ref="wrap">
      
      <app-header class="test" ref="header" id="header"> 
          <p style="text-align:center; flex:1 1 auto">{{title}}</p>
          <p slot="right" style="flex: 0 0 auto">关注</p>
    </app-header>
      <div>
          <div class="info">
              <div>
                  <img src="../../static/img/docProfile.png">
                  <p class="l">李时珍</p>
                  <p class="m">眼科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主任医生</p>
                  <p>浙二医院</p>
    </div>
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
              <div class="title">
                  <p>医生说</p>
                  <div></div>
    </div>
              <div class="audioItem"v-for="item in audioList">
                  <div class="hd">
                      <img src="../../static/img/docProfile.png">
    </div>
                  <div class="bd">
                      <p>{{item.name}}</p>
                      <p class="font-hide">{{item.desc}}</p>
                      <bubble src="../../static/music/test.mp3"></bubble>
                      <div class="ft">
                          <p class="s">2017-06-01</p>
                          <p class="right s">2000人听过</p>
                          <p class="right s"><a @click="setColor"><img class="icon" src="../../static/img/rec_off.png"></a>200</p>
    </div>
    </div>
    </div>
              
    </div>
          <div class="QR">
              <div>
                <p>扫一扫二维码，关注我</p>
                <img src="../../static/img/qr.png">
    </div>
    </div>
          <div>
    </div>
    </div>
  </div>
</template>

<script>
    import AppHeader from "../business/app-header.vue";
    import Bubble from "../base/bubble.vue";
    
  export default {
    data() {
      return {
          example:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。",
          title:"我的名片",
          list:[{title:"医生擅长",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{title:"医生介绍",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"}],
          audioList:[{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"},{name:"华佗",desc:"报道称，朝鲜发行的两款邮票面额分别是30和50朝元，邮票顶端都写有朝鲜战争爆发日期－6月25日至7月27日。环球网记者查询发现，该套邮票在中国电子商务网站上也有销售。"}],
          rem:16
      };
    },
    computed: {
    },
    components: {
        AppHeader,
        bubble:Bubble
    },
    mounted() {
        this.rem=window.screen.width/20;
        this.$refs.wrap.onscroll=()=>{
            
            var top=this.$refs.wrap.scrollTop;
            console.log(top);
            this.setHeaderColor(top);
            this.setTabClass(top);
        }
    },
    beforeDestroy() {

    },
    methods: {
        setColor(){
            alert("setColor");
        },
        setHeaderColor(top){
            var limit=5*this.rem;
            var opacity=top-limit>0?top-limit:0;
            opacity/=limit;
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
            if(top>14*this.rem-45){
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
    @import "../common/var.scss";
    $small:rgb(204,204,204);
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
        height:14rem;
        background-color:deepskyblue;
        div{
            padding-top:45px;
            text-align:center;
            img{
                width:4rem;
            }
            p{
                color:white;
            }
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
                z-index:30;
            }
        }
    .speciality{
/*        height:5.86rem;*/
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
        flex:1 1 auto;
        background-color:white;
        .title{
            display:flex;
            flex-direction:row;
            div{
                flex:1 1 auto;
            }
            p{
                flex: 0 0 auto;
                padding:0.8rem;
                
            }
            
            
        }
        .audioItem{
            border:1px solid lightgrey;
            display:flex;
            flex-direction:row;
            padding:1rem;
            background-color:white;
            .hd{
                width:3rem;
                flex:0 0 auto;
                img{
                    width:80%;
                    margin:0 auto;
                }
                
            }
            .bd{
                .ft{
                    display:flex;
                    flex-direction:row;
                    p{
                        flex:1 0 auto;
                    }
                    .icon{
                        height:1rem;
                        position:relative;
                        left:-0.2rem;
                        top:0rem;
                    }
        
                }
                
            }
        }
        
    }
    .QR{
        background-color:white;
        div{
            text-align:center;
            p{
                padding:0.7rem;
                font-size:0.77rem;
                color:$small;
            }
            img{
                width:8.5rem;
            }
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
