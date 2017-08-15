exports.getDefaultProfile=function(gender,e){
    console.log("启用默认头像");
    var src=gender=="M"||gender=='m'||gender=='男'?"./static/img/docProfile.png":"./static/img/nv.png";
    return src;
}
exports.getProfile=function(docInfo){
    if(!docInfo.docAvatar||docInfo.docAvatar==""){
        var gender=docInfo.docGender;
        return gender=="M"||gender=='m'||gender=='男'?"./static/img/docProfile.png":"./static/img/nv.png";
    }
    else{
        return docInfo.docAvatar;
    }
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
