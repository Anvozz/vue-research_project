import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Createresearch from '@/components/Createresearch'
import Editresearchlist from '@/components/Editresearchlist'
import Editresearch from '@/components/Editresearch'
import Researchview from '@/components/Researchview'
import Dashboardadmin from '@/components/Dashboardadmin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/createresearch',
      name: 'Createresearch',
      component: Createresearch
    },
    {
      path: '/editresearchlist',
      name: 'Editresearchlist',
      component: Editresearchlist
    },
    {
      path: '/editresearch/edit/:userid/:research',
      name: 'Editresearch',
      component: Editresearch
    },
    {
      path: '/view/:researchid',
      name: 'Researchview',
      component: Researchview
    },
    {
      path: '/dashboard',
      name: 'Dashboardadmin',
      component: Dashboardadmin
    }
  ]
})
