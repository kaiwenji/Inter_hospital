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
import chat from "./chat"
export default [
  {
    path:'/myDoctorChat',
    component:myDoctorChat,
    children:[
      {
        path:'recentChat',
        component:recentChat,
        children:[
          {
            path:'chat',
            component:chat
          }
        ]
      },
      {
        path:'followDoctor',
        component:followDoctor
      },
    ]
  },
  {
    path:'/chat',
    component:chat
  },
  {
    name:"myAddList",
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
