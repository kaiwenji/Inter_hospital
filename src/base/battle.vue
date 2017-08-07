<template>
<div class="horizontal">
    <div>
        <img src="../../static/img/chat.png" @click="setType(this)">
    </div>
    <div class="middle">
    <input type="text" v-show="type=='text'" v-model="msg">
        <input type="button" v-show="type!='text'" value="点击输入语音"  class="recordButton"ref="recordButton">
    </div>
    <div>
        <img src="../../static/img/聊天界面-添加.png" @click="send">
    </div>
    </div>
</template>
<script>
    import Api from "../lib/api.js";
    import Timer from "../lib/timer.js";
    var radioId="";
    export default({
        data(){
            return{
                type:"text",
                msg:"",
                timer:"",
                radioId:radioId
            }
        },
        watch:{
            radioId(){
                this.$emit("output",{src:this.radioId,type:"AUDIO"});
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
                        success:(res)=>{
                            this.radioId=res.localId;
                        }
                    })
                })
            }
            ,
            post(){
                this.$http.post("http://api.diandianyy.com/util/weixin/app/jssdk",{
                    url:location.href.split("#")[0],
                    appid:"wxfc623ff79ce99489"
                })
                .then((val)=>{
                    var params=val.data;
                    params.debug=true;
                    wx.config(params);
                })
            },
            setType(e){
                if(this.type=='text'){
                    this.type='audio';
                    e.event.target.src="../../static/img/keyboard.png";
                }
                else{
                    this.type='text';
                    e.event.target.src="../../static/img/chat.png"
                }
            },
            send(){
                this.$emit("output",{msg:this.msg,type:"TEXT"});
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
                    font-size:20px;
                    padding:.1rem;
                    border:0px solid transparent;
                    width:13.7rem;
                    height:1.8rem;
                    background:$bgColor;
                    border-radius:10px;
                    &.recordButton{
                        border:1px solid black;
                    }
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