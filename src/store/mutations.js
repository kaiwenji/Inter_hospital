/**
 * Created by Administrator on 2017/7/26.
 */
import * as types from './mutation-types'
const matutaions = {
   [types.SET_CURRENT_PAGE_INDEX](state,currentPageIndex){
     state.currentPageIndex = currentPageIndex
   }
}
export default matutaions
