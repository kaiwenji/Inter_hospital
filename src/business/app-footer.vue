<template>
  <footer>
    <div class="app">
      <div  v-for="item,index in list" @click=go(index) >
            <img :src="item.url">
            <p>{{item.name}}</p>
      </div>
    </div>

  </footer>
</template>
<script>
  export default {
    props:{
        index:{
            type:String,
            default:"0",
            required:false
        }
    },
    data() {
      return {
        list:[{name:"首页",url:'../../static/img/home.png'},{name:"眼底圈",url:''},{name:"名医知道",url:''},{name:"我的",url:'../../static/img/my.png'}],
        activeUrl:['../../static/img/home_on.png',"","","../../static/img/my_on.png"]
      };
    },
    computed:{

    },
    components:{

    },
    mounted() {
        this.setCurrentPage(this.index);
    },
    beforeDestroy() {

    },
    methods: {
        go(index){
            var indexList=["/index","/","/docRadio","/my"];
        this.$router.push(indexList[index]);
        },
        setCurrentPage(index){
            let i = parseInt(index);
            this.list[i].url=this.activeUrl[i];
        }
    }
  };
</script>

<style scoped lang="scss">
    img{
        height:1.2rem;
        display:block;
        margin:0 auto;
    }
    p{
        font-size:0.55rem;
        color:#999999;
    }
  footer{
      position:fixed;
      bottom:0;
      left:0;
      width:20rem;
      border-top:1px solid rgb(204,204,204);
    height:2.5rem;
    background-color: white;
    .app{
        padding-top:0.3rem;
      display: flex;
        flex-direction:row;
      div{
          flex:1 1 auto;
          text-align:center;
      }
    }
  }

</style>
