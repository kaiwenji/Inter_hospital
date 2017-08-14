//刷新组件
export default{
    mounted(){
        console.log(window.localStorage['refresh']);
        if(window.localStorage['refresh']=='false'){
            window.localStorage['refresh']="true";
            window.location.reload();
        }
    },
    beforeDestroy(){
        window.localStorage['refresh']="false";
    }
}