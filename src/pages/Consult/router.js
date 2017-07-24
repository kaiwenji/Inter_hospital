import Index from "./index.vue";
import NewConsult from "./newConsult.vue";
import ConsultDetail from "./consultDetail.vue";
export default[
    {
        component:Index,
        path:"/Consult"
    }
    ,
    {
        component:NewConsult,
        path:"/Consult/newConsult"
    }
    ,
    {
        component:ConsultDetail,
        path:"/Consult/ConsultDetail"
    }
]