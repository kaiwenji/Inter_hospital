<template>
<div class="horizontal">
    <div>
        <img src="../../static/img/chat.png" @click="setType()">
    </div>
    <div class="middle">
    <input type="text" v-show="type=='text'" v-model="msg">
        <input type="button" v-show="type!='text'" ref="recordButton">
    </div>
    <div>
        <img src="../../static/img/聊天界面-添加.png" @click="send">
    </div>
    </div>
</template>
<script>
    import Api from "../lib/api.js";
    import Timer from "../lib/timer.js";
    export default({
        data(){
            return{
                type:"text",
                msg:"",
                timer:""
            }
        },
        methods:{
            startRecord(){
                this.timer.start();
                wx.ready(()=>{
                    wx.startRecord({
                        success:function(res){
                            console.log("start");
                        }
                    })
                })
            },
            stopRecord(){
                var time=this.timer.pause();
                this.timer.reset();
                if (time<500){
                    console.log("录制时间过短");
                    return;
                }
                wx.ready(()=>{
                    wx.stopRecord({
                        success:function(res){
                            console.log(res.localId);
                        }
                    })
                })
            }
            ,
            post(){
                this.$http.post("http://api.diandianyy.com/util/weixin/app/jssdk",{
                    url:document.location.href,
                    appid:"wxfc623ff79ce99489"
                })
                .then((val)=>{
                    var params=val.data;
                    params.debug=true;
                    wx.config(params);
                })
            },
            setType(){
                if(this.type=='text'){
                    this.type='audio';
                }
                else{
                    this.type='text';
                }
            },
            send(){
                this.$emit("output",this.msg);
                }
        },
        components:{
            
        },
        mounted(){
            this.timer=new Timer();
            this.post();
             this.$refs.recordButton.addEventListener("touchstart",this.startRecord)
            this.$refs.recordButton.addEventListener("touchend",this.stopRecord)

            
        }
    })
</script>
<style scoped lang="scss">
    @import "../common/var.scss";
    .horizontal{
        background:white;
        flex:0 0 auto;
        div{
            flex:0 0 auto;
            width:3.14rem;

            &.middle{
                padding:0.26rem 0 ;
                input{
                    width:13.7rem;
                    height:1.8rem;
                    background:$bgColor;
                    border-radius:10px;
                }
                flex:1 1 auto;
            }
            img{
                height:1.5rem;
                padding: 0.42rem 0.8rem;  
            }
        }
    }
</style>