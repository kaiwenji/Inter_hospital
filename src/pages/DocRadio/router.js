import Index from "./index.vue";
import Detail from "./detail.vue";
import Blank from "./blank.vue";

export default [
    {
        component:Index,
        path:"/docRadio",
        children:[
            {
                component:Blank,
                path:"/"
            },
            {
            component:Detail,
            path:"/docRadio/detail/:id"
            }
        ]
    }
]