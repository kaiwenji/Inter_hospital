import Vue from "vue";
import Router from "vue-router";
import A from "../pages/a.vue";
import B from "../pages/b.vue";
import myDoctorChat from '../pages/myDoctorMyAdd/myDoctorChat'
import recentChat from '../pages/myDoctorMyAdd/recentChat'
import followDoctor from '../pages/myDoctorMyAdd/followDoctor'
import chat from '../pages/myDoctorMyAdd/chat'
import myAddList from '../pages/myDoctorMyAdd/myAddList'
import myAddSuccess from '../pages/myDoctorMyAdd/myAddSuccess'
import myAddRefuse from '../pages/myDoctorMyAdd/myAddRefuse'
import myAddApply from '../pages/myDoctorMyAdd/myAddApply'
import healthFile from '../pages/file/healthFile'
import recordDetail from '../pages/file/recordDetail'
import C from "../pages/c.vue";
import accountAbout from "../pages/myCenter/accountAbout.vue";
import changePhone from "../pages/myCenter/changePhone.vue";
import confrimPhone from "../pages/myCenter/confrimPhone.vue";
import changePhoneSucc from "../pages/myCenter/changePhoneSucc.vue";
import changePassword from "../pages/myCenter/changePassword.vue";
import modificationPassword from "../pages/myCenter/modificationPassword.vue";
import DocTalk from "../pages/DocCard/docTalk.vue";
import HZBD from "../pages/DocCard/hzbd.vue";
import JHSQ from "../pages/DocCard/jhsq.vue";
Router.prototype.goBack = function () {
  this.isback = true;
  history.go(-1);
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/a',
      component: A,
    },
    {
      path: '/b',
      component: B
    },
    {
      path:'/myDoctorChat',
      component:myDoctorChat,
      children:[
        {
          path:'recentChat',
          component:recentChat,
        },
        {
          path:'followDoctor',
          component:followDoctor
        },
        {
          path:'chat',
          component:chat
        }
      ]
    },
    {
      path:'/myAddList',
      component:myAddList,
      children:[
        {
          path:'myAddSuccess',
          component:myAddSuccess,
        },
        {
          path:'myAddRefuse',
          component:myAddRefuse,
        },
        {
          path:'myAddApply',
          component:myAddApply,
        }
      ]
    },
    {
      path:'/healthFile',
      component:healthFile
    },
    {
      path:'/recordDetail',
      component:recordDetail,
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
    }
  ]
})
