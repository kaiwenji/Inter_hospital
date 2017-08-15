//刷新组件
export default{
    mounted(){
        if(window.localStorage['refresh']=='false'){
            this.showLoading=true;
            window.localStorage['refresh']="true";
            window.location.reload();
        }
    },
    methods:{
        checkIfRefresh(){
            return eval(window.localStorage['refresh'])
        }
    },
    beforeDestroy(){
        window.localStorage['refresh']="false";
    }
}