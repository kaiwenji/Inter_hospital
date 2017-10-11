<template>
<div class="main">
    <div class="header">
        <h2>Inter_hospital pages example display</h2>
        <h4>author: Kaiwen Jin</h4>
    </div>
    <div class="row">
        <div class="module">
            <doc-info></doc-info>
        </div>
        <div class="module">
            <post-detail></post-detail>
        </div>
    </div>
    <div class="row">
        <div class="module sec">
            <my-consult></my-consult>
        </div>
        <div class="module sec">
            <post-detail></post-detail>
            <div style="background:black; flex:1"></div>
        </div>
        
    </div>
    </div>
</template>

<script>
    import PostDetail from "../pages/DocRadio/detail.vue";
    import DocInfo from "../pages/doctor.vue";
    import MyConsult from "../pages/Consult/index.vue";
    export default{
        components:{
            DocInfo,
            PostDetail,
            MyConsult
        }
    };
</script>

<style scoped lang="scss">
    .main{
        overflow:scroll;
    }
    .row{
        display:flex;
        flex-direction:row;
/*        height:300px;*/
    }
    .module{
        position:relative;
        display:flex;
        padding-right:20rem;
        &.sec{
            padding-right:0rem;
            padding-left:20rem;
        }
        height:300px;
        width:20rem;
        &.doctorPage{
            background:yellow;
        }
        &.postDetail{
            background:blue;
        }
    }
</style>