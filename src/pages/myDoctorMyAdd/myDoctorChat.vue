<template>
    <div>
         <v-header @click="goIndex" :title="title" :rightTitle="rightTitle"></v-header>
         <nav-bar :tagNames="tagNames"></nav-bar>
         <router-view></router-view>
    </div>
</template>
<script>
  import header from '../../base/header'
  import navBar from '../../base/navBar'
  export default{
      data(){
        return{
            title:'我的医生',
            rightTitle:'',
            tagNames:[
              {title1:"最近会话",tabLink:'/myDoctorChat/recentChat'},
              {title1:"关注医生",tabLink:'/myDoctorChat/followDoctor'},
            ]
        }
      },
      components:{
         'VHeader':header,
          navBar
      },
    methods:{
      goIndex(){
        this.$router.push('/patientIndex')
      }
    }
  }
</script>
<style>

</style>
