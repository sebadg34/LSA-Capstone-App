import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import MUS001 from '../views/MUS001.vue'
import MUS004 from '../views/MUS004-vistaSuperv-Jefe.vue'
import USU004_admPersonal from '../views/USU004_admPersonal'
import MUS002 from '../views/MUS002-IngMuesLab.vue'
import MUS003 from '../views/MUS003-vistaQm-AQm.vue'
import MUS006 from '../views/MUS006-vistaGerente.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/login',
    name: 'login',
    component: LoginView
  }
  ,
  {
    path: '/Form',
    name: 'formulario',
    component: MUS001

  },{
    path: '/admPersonal',
    name: 'admPersonal',
    component: USU004_admPersonal

  },
  {
    path: '/AdministrarMuestra',
    name: 'AdminMuestra',
    component: MUS004
  }
  ,
  {
    path: '/IngMuesLab',
    name: 'IngresoLab',
    component: MUS002


  },
  {
    path: '/AdmMuesQm',
    name: 'AdminQm',
    component: MUS003

  },
  {

    path: '/Gerente',
    name:'vistaGerente',
    component: MUS006
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
