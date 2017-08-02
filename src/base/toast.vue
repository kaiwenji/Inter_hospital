<template>
<div>
    <transition name="fade">
    <div v-show="showSuccess">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">已完成</p>
        </div>
    </div>
    </transition>
    <div v-show="showLoading">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">加载中</p>
        </div>
    </div>

    </div>
</template>


<script>

export default({
    props:{
        start:{
            type:Boolean,
            default:false,
            required:true
        },
        success:{
            type:Boolean,
            default:false,
            required:true
        },


    },
    watch:{
        start(){
            this.showLoading=this.start;
        },
        success(){
            this.showSuccess=this.success;
        }
    },
    data(){
        return{
            showSuccess:false,
            showLoading:false,
        }
    },
    methods:{

    }
})
</script>

<style>
    .fade-leave-active{
        transition:opacity .5s ease
    }
    .fade-leave-to{
        opacity:0
    }
</style>
