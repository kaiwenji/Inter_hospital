<template>
    <div>
      <div class="weui_dialog_alert">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
          <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{ alertTitle }}</strong></div>
          <div class="weui_dialog_bd">{{ alertMsg }}</div>
          <div class="weui_dialog_ft">
            <a href="javascript:;" class="weui_btn_dialog primary" @click="set">确定</a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default{
      props:{
        alertTitle:"",
        alertMsg:""
      },
      methods:{
        set(){
            this.$emit("on-set")
        }
      }
  }
</script>
<style>

</style>
