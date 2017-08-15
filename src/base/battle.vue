<!--输入框组件-->

<template>
<div class="horizontal">
    <div>
        <img src="../../static/img/chat.png" @click="setType(this)">
    </div>
    <div class="middle">
    <input type="text" v-show="type=='text'" v-model="msg" >
        <div v-show="type!='text'"  ref="recordButton" class="mask"></div>
        <input type="button" v-show="type!='text'"  class="recordButton s"  value="按住说话">
    </div>
    <div>
        <img src="../../static/img/聊天界面-添加.png" @click="send">
    </div>
<!--    <div ref="block" class="block"></div>-->
    <div id="toast" v-show="isRecord">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast" style="width:7.6em;">
            <p class="weui-toast__content" style="padding-top:3rem;">{{text}}</p>
        </div>
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
                radioId:radioId,
                text:"",
                isRecord:false
            }
        },
        methods:{
            
//            上传语音
            upload(){
                weui.dialog({
                    title: '提示',
                    content: '是否上传语音',
                    className: 'custom-classname',
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function () {  }
                    }, {
                        label: '确定',
                        type: 'primary',
                        onClick: function () { this.$emit("output",{src:this.radioId,type:"AUDIO"});}
                    }]
                });
            },
            
            
            startRecord(){
                this.isRecord=true;
                this.text="录音中";
                console.log("touchstart");
                var _this=this;
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
                this.isRecord=false;
                var _this=this;
                var time=this.timer.pause();
                this.timer.reset();
                
//                时间过短时
                if(time<1000){
                    setTimeout(
                        ()=>{
                    _this.$weui.alert("时间过短");
                    wx.ready(()=>{
                        wx.stopRecord({
                            success:(res)=>{
                            }
                        })
                    })
                        },
                        2000
                )

                }
                else{
                    wx.ready(()=>{
                        wx.stopRecord({
                            success:(res)=>{
                                console.log("stop");
                                this.radioId=res.localId;
                                _this.upload();
                            }
                        })
                    })
                }
            }
            ,
            
//            获取jssdk支持
            post(){
                Api("smarthos.wechat.jsapiticket.get",{
                    appid:"wx12466885225",
                    reqUrl:location.href.split("#")[0]
                })
                .then((val)=>{
                    console.log(val);
                })
//                this.$http.post("http://api.diandianyy.com/util/weixin/app/jssdk",{
//                    url:location.href.split("#")[0],
//                    appid:"wx12466885225"
//                })
//                .then((val)=>{
//                    var params=val.data;
//                    params.debug=false;
//                    wx.config(params);
//                })
            },
            setType(e){
                if(this.type=='text'){
                    this.type='audio';
                    e.event.target.src="./static/img/keyboard.png";
                }
                else{
                    this.type='text';
                    e.event.target.src="./static/img/chat.png"
                }
            },
            send(){
                this.$emit("output",{msg:this.msg,type:"TEXT"});
                }
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
/*            width:3.14rem;*/

            &.middle{
                padding:0.26rem 0 ;
                input{
                    font-size:15px;
                    padding:.1rem;
                    border:0px solid transparent;
                    width:13.7rem;
                    height:1.8rem;
                    background:$bgColor;
                    border-radius:10px;

                    &.recordButton{
                    }

                }
                .mask{
                    z-index:100;
                    width:70%;
                    opacity:0;
                    position:fixed;
                    right:3rem;
                    bottom:0;
                    height:3rem;
                }
                flex:1 1 auto;
            }
            img{
                height:1.5rem;
                padding: 0.42rem 0.8rem;  
            }
        }
    }
    .block{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:3rem;
        z-index:1001;
        background:transparent;
    }
</style>