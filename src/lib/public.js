exports.getDefaultProfile=function(gender,e){
    e.src=gender=="M"||gender=='m'||gender=='男'?"../../static/img/docProfile.png":"../../static/img/nv.png";
}

exports.getAge=function(id){
    if(!id){
      return "";
    }
    var year;
    if(id.length==18){
      year=parseInt(id.substring(6,10));
    }
    else{
      year=1900+parseInt(id.substring(7,9));
    }
    var date=new Date();
    return date.getFullYear()-year; 
}
