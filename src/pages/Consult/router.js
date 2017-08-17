import Index from "./index.vue";
import NewConsult from "./newConsult.vue";
import ConsultDetail from "./consultDetail.vue";
import ConsultList from "./consultList.vue";
export default[
    {
        component:Index,
        path:"/Consult",
        children:[
            {
            component:ConsultDetail,
            path:"/Consult/ConsultDetail/:id"
        }
        ]
    }
    ,
    {
        component:NewConsult,
        path:"/Consult/newConsult"
    }
    ,

]