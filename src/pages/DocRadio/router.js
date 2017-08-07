import Index from "./index.vue";
import Detail from "./detail.vue";

export default [
    {
        component:Index,
        path:"/"
    },
    {
        component:Detail,
        path:"/docRadio/detail/:id"
    }
]