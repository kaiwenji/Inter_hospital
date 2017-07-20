<template>
    <div class="recentChat">
      <div class="myDoctorList" ref="contactList">
        <div>
          <ul @click="goChat">
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">我的医生</span>
                  </div>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">1</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">我的医生</span>
                  </div>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">1</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">我的医生</span>
                  </div>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">1</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">4</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">5</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">6</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">7</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">8</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">9</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">10</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span>2017/4/29</span>
                  <p class="time"><span class="badge">11</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div>
                  <span>2017/4/29</span>
                  <p>1</p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div>
                  <span>2017/4/29</span>
                  <p>1</p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../assets/logo.png" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span>李冰</span><span class="myDoctor">我的医生</span>
                  <p>您的全科分诊已经开始，点击进入</p>
                </div>
              </div>
              <div class="cancelTime">
                <div>
                  <span>2017/4/29</span>
                  <p>1</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default{
      mounted(){
        this.$nextTick(()=>{
          this._initRecentChat()
        })
      },
      methods:{
          _initRecentChat(){
            this.doctorListScroll = new BScroll(this.$refs.contactList,{
              click:true
            })
          },
          goChat(){
              this.$router.push('chat')
          }
      }
  }
</script>
<style scoped lang="scss">
.recentChat{
  width:100%;
  position: fixed;
  top: 90px;
  bottom:0;
  left:0;
  right:0;
}
.myDoctorList{
  width:100%;
  position: fixed;
  top: 90px;
  bottom:0;
  left:0;
  right:0;
  z-index:1;
  /*background-color: green;*/
  ul{
    padding:0;
    margin:0;
    height: 70px;
    border-top: 1px solid rgb(205,205,205);
    li{
      list-style-type: none;
      height: 70px;
      display: flex;
      .cancelImg{
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .cancelIntro{
        flex:2;
        display: flex;
        align-items: center;
        line-height: 30px;
        .badgeDoc{
          display: inline-block;
          padding-top: -5px;
          .myDoctor{
            width: 60px;
            height: 18px;
            background-color: darkturquoise;
            border-radius:5px;
            display: inline-block;
            font-size: 10px;
            color: white;
            line-height: 18px;
            text-align: center;
          }
        }
        p{
          margin:0;
          font-size: 14px;
        }
        span{

        }
      }
      .cancelTime{
        flex:1;
        display: flex;
        align-items: center;
        p{
          margin:0;
          text-align: right;
          span.badge{
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            color: white;
            text-align: center;
            font-size: 14px;
            line-height: 15px;
          }
        }
      }
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>
