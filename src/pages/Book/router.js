import Index from "./index.vue";
import Hospital from "./hospital.vue";
import Department from "./department.vue";
import Doctor from "./doctor.vue";
import DoctorInfo from "./doctorInfo.vue";
//import Reserve from "./reserve.vue";
export default[
    {
        path:"/book/",
        component:Index,
        children:[
            {
                path:"/",
                component:Hospital
            },
            {
                path:"/book/department/:id",
                component:Department
            },
            {
                path:"/book/doctor/:id",
                component:Doctor
            },
            {
                path:"/book/doctorInfo/:id",
                component:DoctorInfo
            }
        ]
        
    }
]