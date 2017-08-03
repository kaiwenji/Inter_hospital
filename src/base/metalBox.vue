<template>
<div id="metalBox">
    <div id="scroller">
    <slot></slot>
    </div>
    </div>
</template>
<script>
    import BScroll from "better-scroll"
    export default{
        mounted(){
            this.scroll=new BScroll(document.getElementById("metalBox"),{
                startX:0,
                startY:0,
                scrollY:true,
                click:true,
                touch:true

            })
        }
        ,
        data(){
            return{
                scroll:{}
            }
        },
        props:{
            list:{
                type:Array,
                default:()=>{
                    return [];
                },
                required:false
            }
        },
        watch:{
            list(){
//                console.log("refresh");
                this.scroll.refresh();
            }
        }
    }
</script>
<style>
    #metalBox{
        flex:1 1 auto;
        display:flex;
        flex-direction:column;
    }
</style>
