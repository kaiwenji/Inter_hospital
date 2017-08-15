//定时器组件
export default class Timer{
    constructor(){
        this.time=0;
    }
    start(){
        this.intervalId=setInterval(()=>{
            this.time++;
        },100)
    }
    pause(){
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
        return this.time*100;
    }
    reset(){
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
        this.time=0;
    }
}