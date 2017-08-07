<template>
    <div  class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot>
          112
        </slot>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import {addClass} from '../lib/dom.js'
  import BScroll from 'better-scroll'
  import {mapGetters,mapMutations} from 'vuex'
  export default{
//      data(){
//        return{
//            currentPageIndex:0
//        }
//      },
      props:{
        popImg:{
            type:Boolean
        },
        dataObject:{
            type:Object
        },
        index:{
            type:Number
        },
        previewImg:{
            type:Array,
        }
      },
      mounted(){
          if(this.popImg == true){
            this.setSliderWidth()
            this.initSlider()
            this.gotoPage()
          }
      },
      computed:{
        ...mapGetters([
          "currentPageIndex"
        ]),

      },
      methods:{
        ...mapMutations([
          'SET_CURRENT_PAGE_INDEX'
        ]),
        setSliderWidth(){
          this.children = this.$refs.sliderGroup.children
          let width = 0
          let sliderWidth = this.$refs.slider.clientWidth
          for(let i = 0; i<this.children.length;i++){
              let child = this.children[i]
              addClass(child,'slider-item')
              child.style.width = sliderWidth + 'px'
              width += sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
        },
        initSlider(){
            this.slider = new BScroll(this.$refs.slider,{
                scrollX:true,
                scrollY:false,
                momentum:false,
                snap:true,
                snapThreshold: 1
            })
//           console.log(this.slider)
          this.slider.on("scrollEnd",()=>{
           let pageIndex = this.slider.getCurrentPage().pageX
            this.SET_CURRENT_PAGE_INDEX(pageIndex)
//            this.currentPageIndex = pageIndex
//            console.log(this.currentPageIndex)
          })
        },
        refresh() {
          this.slider && this.slider.refresh()
        },
        popImg1(){
//          console.log("qw")
//          if(this.popImg == true){
//              console.log("qw")
//            this.$nextTick(()=>{
//              setTimeout(()=>{
//                  console.log("123")
//                this.setSliderWidth()
//                this.refresh()
//              },1000)
//            })
//          }
        },
        gotoPage(){
          let pageIndex = this.slider.getCurrentPage().pageX
          pageIndex = this.index
          this.SET_CURRENT_PAGE_INDEX(pageIndex)
          this.slider.goToPage(this.currentPageIndex,0,0)
        },
        goTOChange(){
            let myIndex
            myIndex = this.currentPageIndex
          this.slider.goToPage(myIndex,0,0)
        }
      },

       watch:{
//         popImg:function(){
//             console.log("123")
//         },
         previewImg:function(){
             if(this.currentPageIndex == this.previewImg.length-1){
               this.goTOChange()
             }

//           this.setSliderWidth()
//           this.initSlider()
//           this.gotoPage()
         }
//         popImg(){
//             this.$nextTick(()=>{
//               setTimeout(()=>{
//                   console.log("123")
////                 this.popImg1()
//               },1000)
//
//             })
//
//         }
//         popImg() {
//           this.$nextTick(()=>{
//             setTimeout(() => {
//               this.setSliderWidth()
//               this.refresh()
//
//             },10000)
//           })
//         },
//         dataObject(){
//            this.$nextTick(()=>{
//              setTimeout(() => {
//                this.setSliderWidth()
//                this.refresh()
//
//              },100)
//            })
//
//         }
       }
  }
</script>
<style scoped lang="scss">
.slider{
  min-height: 1px;
  /*position: fixed;*/
  /*z-index:1000;*/
  /*top:0;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*background-color: #E64340;*/
  .slider-group{
    /*width:100%;*/
    /*height:50%;*/
    position: relative;
    overflow-x: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
    /*background-color: #3CC51F;*/
    .slider-item{
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      /*display: flex;*/
      /*align-items: center;*/
      img{
        display: block;
        width:100%;
      }
    }
    /*position: relative;*/
    /*box-sizing: border-box;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*.slider-item{*/
      /*float: left;*/
      /*box-sizing: border-box;*/
      /*overflow: hidden;*/
      /*text-align: center;*/
    /*}*/

  }
}
</style>
