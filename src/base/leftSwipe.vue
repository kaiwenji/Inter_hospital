<template>
  <div class="container">
      <div class="list">
        <ul>
          <li v-for="item,index of list">
                <span>
                  <slot name="item"
                  :add="item.name"
                  :age="item.age"
                  :identity="item.identity"
                  :phone="item.phone"
                  ></slot>
                    <i @click="del(item,index)"><img src="../../static/img/bdelete.png" alt=""></i>
                   <div class="arrow"><img src="../../static/img/arrow.png" alt=""></div>
                </span>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
  export default{
      props:{
           list:{
              type:Array,
              default:[]
          }
      },
     mounted(){
       var $this=this;														//将$this保存 区分以下触发事件的this
       var container = document.querySelectorAll('.list li span');
       for(var i = 0; i < container.length; i++){                          //为每个特定DOM元素绑定touchstart touchmove时间监听 判断滑动方向
         var x,  X;
         container[i].addEventListener('touchstart', function(event) {   //记录初始触控点横坐标
           x = event.changedTouches[0].pageX;
         });
         container[i].addEventListener('touchmove', function(event){
           X = event.changedTouches[0].pageX;                          //记录当前触控点横坐标
           if($this.expansion){                                       //判断是否展开，如果展开则收起
             $this.expansion.className = "";
           }
           if(X - x > 10){                                             //右滑
             this.className = "";                                    //右滑收起
           }
           if(x - X > 10){                                             //左滑
             this.className = "swipeleft";                           //左滑展开
             $this.expansion = this;
           }
         });
       }
     },
     methods:{
       del(name,idx){
         alert("确认删除"+name);
         this.list.splice(idx,1);                                        //删除List这条数据 DOM随之更新渲染
         var container = document.querySelector('.swipeleft');           //将展开的DOM归位 除掉样式类
         container.className="";
         this.expansion=null;
       }
     }
  }
</script>
<style scoped lang="scss">
  @import "../common/public.scss";
  .container{
    height: 400px;
  }
  i{font-style:normal;}
  ul{
    padding:0;
  }
  .list{

    overflow:hidden;
    margin-top:.2rem;
    padding-left:.3rem;
    border-top:1px solid #ddd;
    li{
      overflow:hidden;
      width:120%;
      border-bottom:1px solid #ddd;
      list-style:none;
      span{
        display:block;
        /*height:.88rem;*/
        /*line-height:.88rem;*/
        -webkit-transition:all 0.3s;
        transition:all 0.3s;
        color:#393939;
        text-decoration:none;
        overflow: hidden;
      }
      .arrow{
        float:right;
        width:15%;
        text-align:center;
        color:#fff;
        height: 190rem/$rem;
        line-height: 190rem/$rem;
          img{
            width: 17rem/$rem;
            height: 30rem/$rem;
          }
      }
      i{
        display: block;
        float:right;
        width:15%;
        text-align:center;
        background:#E2421B;
        color:#fff;
       height: 190rem/$rem;
        line-height: 190rem/$rem;
        img{
          width: 46rem/$rem;
          height: 46rem/$rem;
        }
      }
    }
  }
  .swipeleft{transform:translateX(-15%);-webkit-transform:translateX(-15%);}

</style>
