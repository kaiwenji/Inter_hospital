/**
 * Created by Administrator on 2017/7/22.
 */
import healthFile from './healthFile'
import recordDetail from './deleteRecord'
import addRecord from './addRecord'
export default[
  {
    path:'/healthFile',
    component:healthFile
  },
  {
    path:'/deleteRecord',
    component:recordDetail,
  },
  {
    path:'/addRecord',
    component:addRecord,
  }
]
