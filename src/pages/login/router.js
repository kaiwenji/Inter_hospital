/**
 * Created by 李康飞 on 2017/7/21.
 */
import accountAbout from "../myCenter/accountAbout.vue";
import changePhone from "../myCenter/changePhone.vue";
import confrimPhone from "../myCenter/confrimPhone.vue";
import changePhoneSucc from "../myCenter/changePhoneSucc.vue";
import changePassword from "../myCenter/changePassword.vue";
import modificationPassword from "../myCenter/modificationPassword.vue";
import succeed from "../myCenter/succeed.vue";
import users from "../patient/users.vue";
import addUser from "../patient/addUser.vue";
import editUser from "../patient/editUser.vue";
import editPhone from "../patient/editPhone.vue";
// import index from "../homePage/index.vue";
import my from "../my/index.vue";
import myRegistration from "../my/myRegistration.vue";
import patientGround from "../my/patientGround.vue";
import login from "../login/index.vue";
import forgetPassword from "../login/forgetPassword.vue";
import password from "../login/password.vue";
import register from "../login/register.vue";
import myDetail from "../login/myDetail.vue";
import eyeIllness from "../eye/eyeIllness.vue";
import orderDetail from "../eye/orderDetail.vue";
import eyeInjury from "../eye/eyeInjury.vue";
import eyeInjuryDetail from "../eye/eyeInjuryDetail.vue";
import healthRecord from "../healthRecord/healthRecord.vue";
import addCase from "../healthRecord/addCase.vue";
import caseDetail from "../healthRecord/caseDetail.vue";
import allergyHistory from "../healthRecord/allergyHistory.vue";
import familyHistory from "../healthRecord/familyHistory.vue";
import pastHistory from "../healthRecord/pastHistory.vue";
import presentingComplaint from "../healthRecord/presentingComplaint.vue";
import test from '../../base/test.vue'



export default[

  // {
  //   path:"/",
  //   component:test
  // },
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
    path: '/editUser/:id',
    name:'editUser',
    component: editUser
  },{
    path: '/editPhone/:compatId',
    name:'editPhone',
    component: editPhone}
  // },{
  //   path: '/index',
  //   name:'index',
  //   component: index
  // }
  ,{
    path: '/my',
    name:'my',
    component: my
  },

   {
   path: '/',
   name:'login',
   component: login
 },
    {
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
    path: '/myDetail/:phone',
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
  },{
    path: '/accountAbout',
    name:'accountAbout',
    component: accountAbout
  },{
    path: '/allergyHistory',
    name:'allergyHistory',
    component: allergyHistory
  },{
    path: '/familyHistory',
    name:'familyHistory',
    component: familyHistory
  },{
    path: '/pastHistory',
    name:'pastHistory',
    component: pastHistory
  },{
    path: '/presentingComplaint',
    name:'presentingComplaint',
    component: presentingComplaint
  },{
    path: '/eyeInjury',
    name:'eyeInjury',
    component: eyeInjury
  }, {
    path: '/eyeInjuryDetail',
    name: 'eyeInjuryDetail',
    component: eyeInjuryDetail
  }, {
    path: '/myRegistration',
    name: 'myRegistration',
    component: myRegistration
  }
  // },{
  //   path: '/',
  //   name:'patientGround',
  //   component: patientGround
  // },
]
