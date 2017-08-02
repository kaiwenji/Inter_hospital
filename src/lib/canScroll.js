export default{
    mounted(){
        this.scroll();

        this.id=document.body.addEventListener("touchmove",this.check)
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
            var scrollerList=document.getElementsByClassName("wrap");
            console.log(scrollerList);
            for(let i=0;i<scrollerList.length;i++){
                scrollerList[i].addEventListener("touchmove",(e)=>{
                    e._flag=true;
                })
            }
        }
    },
    beforeDestroy(){
        document.body.removeEventListener("touchmove",this.check);
    }
}