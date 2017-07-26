/**
 * Created by Administrator on 2017/7/24.
 */
function formatDate(now) {
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  var hour=now.getHours();
  var minute=now.getMinutes();
  return year+"-"
    +(month < 10 ? "0" + month:month)+"-"
    +(date<10?"0" + date:date) +" "
    +(hour<10?"0"+hour:hour)+":"
    +(minute<10?"0"+minute:minute)
}
export {formatDate}
