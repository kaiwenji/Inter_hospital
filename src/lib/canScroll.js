
//禁止主页面滚动组件
export default{
    mounted(){
        this.scroll();
    },
    computed:{
        diff(){
            return this.$refs.wrapper.scrollHeight-this.$refs.wrapper.offsetHeight;
        }
    },
    methods:{
        check(e){
            if(e._flag){
                console.log(e.target);

            }
            else{

                e.preventDefault();
            }
        },
        scroll(){
            var scroller=this.$refs.wrapper;
//                scroller.addEventListener("touchend",this.touchEnd);
                scroller.addEventListener("touchmove",this.touchMove);
//            }
        },
        touchEnd(e){
                if(this.$refs.wrapper.scrollTop>=this.diff&&this.diff>0){
                    this.$refs.wrapper.scrollTop=this.diff-1;
                }
            else if(this.$refs.wrapper.scrollTop<=0&&this.diff>0){
                    this.$refs.wrapper.scrollTop=1;
                }
            
        },
        touchMove(e){
            if(this.$refs.wrapper.scrollTop<this.diff&&this.$refs.wrapper.scrollTop>0){
                e._flag=true;
            }}
    },
    beforeDestroy(){
        document.body.removeEventListener("touchmove",this.check);
        this.$refs.wrapper.removeEventListener("touchmove",this.touchMove);
        this.$refs.wrapper.removeEventListener("touchend",this.touchEnd);
    }
}