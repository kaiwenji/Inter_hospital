<template>
  <div class="nav-bar border-1px">
    <ul>
      <li v-for="tagName in tagNames">
        <router-link  tag="div" :to="tagName.tabLink">
          <span>{{ tagName.title1 }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    props:{
      tagNames:{
        type:Array,
        default:[]
      },
    },
  }
</script>
<style scoped lang="scss">
  @import '../common/public.scss';
  @import '../common/mixin.scss';
  .nav-bar{
    width:100%;
    height: 40px;
    position: fixed;
    top: 50px;
    z-index:10;
    background-color: white;
    ul{
      padding:0;
      margin:0;
      display: flex;
      li{
        flex:1;
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: center;
        list-style-type: none;
        span{
          font-size:16px;
          color: #333333;
        }
        .router-link-active{
          height: 35px;
          width:160rem/$rem;
          line-height: 40px;
          text-align: center;
          border-bottom: 2px solid #0AACE9;
        }
      }
    }
  }
</style>
