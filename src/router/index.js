import Vue from "vue";
import Router from "vue-router";
import chat from '../pages/myDoctorMyAdd/chat'
import accountAbout from "../pages/myCenter/accountAbout.vue";
import changePhone from "../pages/myCenter/changePhone.vue";
import confrimPhone from "../pages/myCenter/confrimPhone.vue";
import changePhoneSucc from "../pages/myCenter/changePhoneSucc.vue";
import changePassword from "../pages/myCenter/changePassword.vue";
import modificationPassword from "../pages/myCenter/modificationPassword.vue";
import C from "../pages/c.vue";
import DocCard from "../pages/DocCard/router.js";
import DocRadio from "../pages/DocRadio/router.js";
import Consult from "../pages/Consult/router.js";
import test from "../pages/DocRadio/index.vue";
import DocTalk from "../pages/DocCard/docTalk"
import HZBD from "../pages/DocCard/hzbd"
import JHSQ from "../pages/DocCard/jhsq"

import file from '../pages/file/router'
import myDoctorMyAdd from '../pages/myDoctorMyAdd/router'
import repeatConsultAdd from '../pages/repeatConsultAdd/router'

import Home from '../pages/login/router'
Router.prototype.goBack = function () {
  this.isback = true;
  history.go(-1);
}

Vue.use(Router)

export default new Router({
  routes: [
      {
         path:"/c/:id",
          component:C
      },
      {
      path: '/docTalk',
      component: DocTalk
    },
        {
      path: '/hzbd',
      component: HZBD
    },
        {
      path: '/jhsq',
      component: JHSQ
    },
      {
      path: '/changePhone',
      name:'changePhone',
      component: changePhone
    },{
      path: '/confrimPhone',
      name:'confrimPhone',
      component: confrimPhone
    },{
      path: '/changePhoneSucc',
      name:'changePhoneSucc',
      component: changePhoneSucc
    },{
      path: '/',
      name:'changePassword',
      component: changePassword
    },{
      path: '/modificationPassword',
      name:'modificationPassword',
      component: modificationPassword
    },

      ...Home,
      ...DocCard,
      ...DocRadio,
      ...Consult,
      ...myDoctorMyAdd,
      ...repeatConsultAdd,
      ...file
  ]
})
