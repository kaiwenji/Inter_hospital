<template>
  <div class="viewpage">
<!--      <transition :name="transitionName">-->
      <router-view ></router-view>
<!--    </transition>-->
  </div>
</template>

<script>
  export default {
      data(){
          return{
              transitionName:"fade"
          }
      },
      components:{
      },
      methods:{

      }
  }
</script>

<style  lang="scss">
$price: #FFCC00;
$info:  #3399FF;
    .background{
        position:fixed;
        left:0px;
        top:0px;
        background-color:grey;
        width:100%;
        height:100%;
        z-index:999
    }
    header{
        flex:0 0 auto;
    }
    .app{
        flex: 1 1 auto;
        display:flex;
        flex-direction:column;
    }
    .viewpage{
        display:flex;
        flex-direction:column;
        flex:1 1 auto;
    }
.figure
    {
        width:3.75rem;
        height:3.75rem;
        margin-right:.3rem;
        display:block;
        border-radius:50%;
    }
    .arrow{
        width:2rem;
        height:2rem;
        margin-top:0.5rem;
    }
        .font-warn{
        color:#FF6666;
        div{
            color:#FF6666;
        }
    }
    p, span{
        font-family:宋体
    }
    .weui-loadmore{
        font-size:0.875rem;
    }
</style>
