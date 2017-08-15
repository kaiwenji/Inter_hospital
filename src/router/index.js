import Vue from "vue";
import Router from "vue-router";
import chat from '../pages/myDoctorMyAdd/chat'
import accountAbout from "../pages/myCenter/accountAbout.vue";
import changePhone from "../pages/myCenter/changePhone.vue";
import confrimPhone from "../pages/myCenter/confrimPhone.vue";
import changePhoneSucc from "../pages/myCenter/changePhoneSucc.vue";
import changePassword from "../pages/myCenter/changePassword.vue";
import modificationPassword from "../pages/myCenter/modificationPassword.vue";
import doctor from "../pages/doctor.vue";
import DocCard from "../pages/DocCard/router.js";
import DocRadio from "../pages/DocRadio/router.js";
import Consult from "../pages/Consult/router.js";
import Book from "../pages/Book/router.js"
import file from '../pages/file/router'
import my from '../pages/my/index'
import myDoctorMyAdd from '../pages/myDoctorMyAdd/router'
import repeatConsultAdd from '../pages/repeatConsultAdd/router'
import patientIndex from '../pages/patientIndex'

import Home from '../pages/login/router'
Router.prototype.goBack = function () {
  this.isback = true;
  history.go(-1);
}

Vue.use(Router)

export default new Router({
  routes: [
      {
        name:"patientIndex",
        path:"/patientIndex",
        component:patientIndex,
      },
      {
         name:"doctor",
         path:"/doctor/:id",
         component:doctor
      },
    //   {
    //   path: '/changePhone',
    //   name:'changePhone',
    //   component: changePhone
    // },{
    //   path: '/confrimPhone',
    //   name:'confrimPhone',
    //   component: confrimPhone
    // },{
    //   path: '/changePhoneSucc',
    //   name:'changePhoneSucc',
    //   component: changePhoneSucc
    // },{
    //   path: '/changePassword',
    //   name:'changePassword',
    //   component: changePassword
    // },{
    //   path: '/modificationPassword',
    //   name:'modificationPassword',
    //   component: modificationPassword
    // },

      ...Home,
      ...DocCard,
      ...DocRadio,
      ...Consult,
      ...myDoctorMyAdd,
      ...repeatConsultAdd,
      ...file,
      ...Book,
  ]
})
