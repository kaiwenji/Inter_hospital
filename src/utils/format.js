/**
 * Created by Administrator on 2017/7/21.
 */
function getCurrentTime(){
  var dtCur = new Date();
  var yearCur = dtCur.getFullYear();
  var monCur = dtCur.getMonth() + 1;
  var dayCur = dtCur.getDate();
  var hCur = dtCur.getHours();
  var mCur = dtCur.getMinutes();
  // var sCur = dtCur.getSeconds();
  var timeCur =
    // yearCur + "-"
    // + (monCur < 10 ? "0" + monCur : monCur) + "-"
    // + (dayCur < 10 ? "0" + dayCur : dayCur) + " "
    + (hCur < 10 ? "0" + hCur : hCur)
    + ":" + (mCur < 10 ? "0" + mCur : mCur)
    // + ":" + (sCur < 10 ? "0" + sCur : sCur);
  //alert(timeCur);// 输出时间
  return timeCur;
}
export {
  getCurrentTime
}
