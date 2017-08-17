export default{
    methods:{
        getProfile(docInfo){
            if(!docInfo){
                return "./static/img/docProfile.png";
            }
            if(!docInfo.docAvatar||docInfo.docAvatar==""){
                var gender=docInfo.docGender;
                return gender=="M"||gender=='m'||gender=='男'?"./static/img/docProfile.png":"./static/img/nv.png";
            }
            else{
                return docInfo.docAvatar;
            }
        }

    },
    filters:{        
        getAge(id){
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
    }
}
