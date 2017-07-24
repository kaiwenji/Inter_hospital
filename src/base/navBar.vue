<template>
  <div class="nav-bar">
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
  .nav-bar{
    width:100%;
    height: 80rem/$rem;
    position: fixed;
    top: 50px;
    z-index:10;
    border-bottom: 1px solid rgb(205,205,205);
    background-color: rgb(249,249,249);
    ul{
      padding:0;
      margin:0;
      display: flex;
      li{
        flex:1;
        display: flex;
        height: 80rem/$rem;
        align-items: center;
        justify-content: center;
        list-style-type: none;
        span{
          font-size:16px;
          color: #333333;
        }
        .router-link-active{
          height: 80rem/$rem;
          line-height: 80rem/$rem;
          border-bottom: 2px solid #0AACE9;
        }
      }
    }
  }
</style>
