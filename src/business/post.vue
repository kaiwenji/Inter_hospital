
<!--帖子组件-->
<template>
    <div class="panel" @click="activate">
        <p class="font-hide m">{{consultInfo.consultContent}}</p>
        <div class="horizontal" v-show="hasPhoto">
            <img :src="item.attaFileUrl" v-for="item,index in info.attaList" :class="{'last':index%4==3}">
        </div>
        <div class="ft">
            <p class="lightBlue l" v-show="info.userDocVo"><img src="../../static/img/docProfile.png" class="icon">{{info.userDocVo&&info.userDocVo.docName}}<span class="l light">回答</span></p>
            <p class="middle m light">{{consultInfo.createTime|goodTime}}创建  &nbsp;|</p>
            <p class="right m light">{{consultInfo.replyCount||0}}条评论</p>
        </div>
    </div>
</template>

<script>
    import {goodTime} from "../lib/filter.js";
    export default({
        props:{
            info:{
                type:Object,
                default:{},
                required:true
            }
        },
        computed:{
            hasPhoto(){
                if(this.consultInfo.hasAtta&&this.info.attaList.length>0){
                    return true;
                }
                else{
                    return false;
                }
            },
            consultInfo(){
                if(this.info.consultInfo){
                    return this.info.consultInfo;
                }
                else{
                    return {}
                }
            }
        },
        filters:{
            goodTime
        },
        methods:{
            activate(){
                this.$emit("activate")
            }
        }
    })
</script>

<style scoped lang="scss">
    @import "../common/var.scss";
   .panel{
        padding:0.8rem;
/*       padding-bottom:0;*/
        margin-bottom:0.8rem;
        margin-left:0.8rem;
        margin-right:0.8rem;
        background-color:#FFFFFF;
        border-radius:10px;
       .horizontal{
           flex-wrap:wrap
       }
        img{
            padding-top:0.8rem;
            padding-bottom:0.8rem;
            padding-right:0.6rem;
            display:block;
            height:3rem;
            width:3.75rem;
            flex:0 0 auto;
            &.last{
                padding-right:0;
            }
        }
        .ft{
            @include horizontal;
            position:relative;
            .icon{
/*                display:none;*/
                position:absolute;
                flex:0 0 auto;
                display:block;
                height:0.8rem;
                width:0.8rem;
                left:-0.2rem;
                top:-0.5rem;
            }
            p{
                padding-top:0.13rem;
                padding-left:0.5rem;
                flex:0 0 auto;
                &.middle{
                    padding-top:0.1rem;
                    flex:1 1 auto;
                    text-align:right;
                }
                &.right{
                    padding-top:0.1rem;
                }
            }
        }
    }
</style>