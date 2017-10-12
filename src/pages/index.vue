<template>
<div class="main">

    <div class="header">
        <h2>Inter_hospital pages example display</h2>
        <h4>author: Kaiwen Jin</h4>
    </div>
    <div class="row">
        <div class="module">
            <doc-info></doc-info>
            <img class="arrow left"src="../../static/img/arrow.gif">
            <p>Doctor Main Page<br>./src/pages/index.vue</p>
        </div>
        <div class="module">
            <post-detail></post-detail>
            <img class="arrow left"src="../../static/img/arrow.gif">
            <p>You can click the button,enjoy the music!<br>./src/pages/DocRadio/detail.vue<br><span style="color:red">player component</span> was in ./src/base/player.vue</p>
        </div>
    </div>
    <div class="row">
        <div class="module sec">
            <my-consult></my-consult>
            <img class="arrow right" src="../../static/img/arrow.gif">
            <p class="right">./src/pages/Consult/index.vue</p>
        </div>
<!--
        <div class="module sec">
            <img class="arrow right" src="../../static/img/arrow.gif">
            <p class="right">not available now, Sorry</p>
            <img src="../../static/img/underconstruction.jpg">
        </div>
-->
        
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
    .arrow{
        
        position:absolute;
        height:5rem;
        top: 10rem;
        &.left{
            left:20rem;
            transform:rotate(180deg);
        }
        &.right{
            left:15rem;
        }
    }
    .module{
        position:relative;
        display:flex;
        padding-right:20rem;
        &.sec{
            padding-right:0rem;
            padding-left:20rem;
        }
        height:30rem;
        width:20rem;
        &.doctorPage{
            background:yellow;
        }
        &.postDetail{
            background:blue;
        }
        p{
            position:absolute;
            left:25rem;
            top:12rem;
            &.right{
                left:1rem;
                top:11.5rem;
            }
        }
    }
</style>