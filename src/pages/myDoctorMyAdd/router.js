/**
 * Created by Administrator on 2017/7/22.
 */
import myAddList from './myAddList'
import myAddSuccess from './myAddSuccess'
import myAddRefuse from './myAddRefuse'
import myAddApply from './myAddApply'
import myDoctorChat from './myDoctorChat'
import recentChat from './recentChat'
import followDoctor from './followDoctor'
export default [
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
]
