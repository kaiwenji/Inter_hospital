import Vue from "vue";
import Router from "vue-router";
import A from "../pages/a.vue";
import B from "../pages/b.vue";
import chat from '../pages/myDoctorMyAdd/chat'
import C from "../pages/c.vue";
import accountAbout from "../pages/myCenter/accountAbout.vue";
import changePhone from "../pages/myCenter/changePhone.vue";
import confrimPhone from "../pages/myCenter/confrimPhone.vue";
import changePhoneSucc from "../pages/myCenter/changePhoneSucc.vue";
import changePassword from "../pages/myCenter/changePassword.vue";
import modificationPassword from "../pages/myCenter/modificationPassword.vue";

import DocCard from "../pages/DocCard/router";
import DocTalk from "../pages/DocCard/docTalk"
import HZBD from "../pages/DocCard/hzbd"
import JHSQ from "../pages/DocCard/jhsq"
import DocRadio from "../pages/DocRadio/router";

import file from '../pages/file/router'
import myDoctorMyAdd from '../pages/myDoctorMyAdd/router'

import Home from '../pages/login/router'
Router.prototype.goBack = function () {
  this.isback = true;
  history.go(-1);
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/healthFile',
      component:healthFile
    },
    {
      path:'/recordDetail',
      component:recordDetail,
    },
    {
      path:'/chat',
      component:chat
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
      ...myDoctorMyAdd,
      ...file
  ]
})
