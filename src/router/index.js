import Vue from "vue";
import Router from "vue-router";
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

import DocCard from "../pages/DocCard/router.js";
import DocRadio from "../pages/DocRadio/router.js";
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
      ...Home,
      ...DocCard,
      ...DocRadio
  ]
})
