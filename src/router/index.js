import Vue from "vue";
import Router from "vue-router";
import A from "../pages/a.vue";
import B from "../pages/b.vue";
import accountAbout from "../pages/myCenter/accountAbout.vue";
import changePhone from "../pages/myCenter/changePhone.vue";
import confrimPhone from "../pages/myCenter/confrimPhone.vue";
import changePhoneSucc from "../pages/myCenter/changePhoneSucc.vue";
import changePassword from "../pages/myCenter/changePassword.vue";
import modificationPassword from "../pages/myCenter/modificationPassword.vue";
import succeed from "../pages/myCenter/succeed.vue";
import users from "../pages/patient/users.vue";
import addUser from "../pages/patient/addUser.vue";
import editUser from "../pages/patient/editUser.vue";
import editPhone from "../pages/patient/editPhone.vue";
import index from "../pages/homePage/index.vue";
import my from "../pages/my/index.vue";
import login from "../pages/login/index.vue";
import forgetPassword from "../pages/login/forgetPassword.vue";
import password from "../pages/login/password.vue";
import register from "../pages/login/register.vue";
import myDetail from "../pages/login/myDetail.vue";
import eyeIllness from "../pages/eye/eyeIllness.vue";
import orderDetail from "../pages/eye/orderDetail.vue";
import healthRecord from "../pages/healthRecord/healthRecord.vue";
import addCase from "../pages/healthRecord/addCase.vue";
import caseDetail from "../pages/healthRecord/caseDetail.vue";
Router.prototype.goBack = function () {
  this.isback = true;
  history.go(-1);
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/accountAbout',
      name:'accountAbout',
      component: accountAbout
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
      path: '/changePassword',
      name:'changePassword',
      component: changePassword
    },{
      path: '/modificationPassword',
      name:'modificationPassword',
      component: modificationPassword
    },{
      path: '/succeed',
      name:'succeed',
      component: succeed
    },{
      path: '/users',
      name:'users',
      component: users
    },{
      path: '/addUser',
      name:'addUser',
      component: addUser
    },{
      path: '/editUser',
      name:'editUser',
      component: editUser
    },{
      path: '/editPhone',
      name:'editPhone',
      component: editPhone
    },{
      path: '/index',
      name:'index',
      component: index
    },{
      path: '/my',
      name:'my',
      component: my
    },{
      path: '/',
      name:'login',
      component: login
    },{
      path: '/forgetPassword',
      name:'forgetPassword',
      component: forgetPassword
    },{
      path: '/password',
      name:'password',
      component: password
    },{
      path: '/register',
      name:'register',
      component: register
    },{
      path: '/myDetail',
      name:'myDetail',
      component: myDetail
    },{
      path: '/eyeIllness',
      name:'eyeIllness',
      component: eyeIllness
    },{
      path: '/orderDetail',
      name:'orderDetail',
      component: orderDetail
    },{
      path: '/healthRecord',
      name:'healthRecord',
      component: healthRecord
    },{
      path: '/addCase',
      name:'addCase',
      component: addCase
    },{
      path: '/caseDetail',
      name:'caseDetail',
      component: caseDetail
    }
  ]
})
