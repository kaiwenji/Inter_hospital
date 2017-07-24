
import DocTalk from "./docTalk.vue";
import HZBD from "./hzbd.vue";
import JHSQ from "./jhsq.vue";

export default [
      {
      path: '/docTalk/:id',
      component: DocTalk
    },
      
        {
      path: '/hzbd/:id',
      component: HZBD
    },
        {
      path: '/jhsq/:id',
      component: JHSQ
    }
]