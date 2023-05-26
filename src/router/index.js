import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import USU004_admPersonal from '../views/USU004_admPersonal'
import MUS001 from '../views/MUS001.vue'
import MUS002 from '../views/MUS002-IngMuesLab.vue'
import MUS003 from '../views/MUS003-vistaQm-AQm.vue'
import MUS004 from '../views/MUS004-vistaSuperv-Jefe.vue'
import MUS006 from '../views/MUS006-vistaGerente.vue'
import MUS007 from '../views/MUS007-vistaAdmFinanza.vue'
import USU002_admEmpresa from '../views/USU002_admEmpresa'
import USU003_admSolicitante from '../views/USU003_admSolicitante'
import USU005_admDisponibilidad from '../views/USU005_admDisponibilidad'
import ANA001 from '../views/ANA001-RelacionDatos'
import ANA002 from '../views/ANA002-AdmMatriz'
import ANA003 from '../views/ANA003-AdmParam'
import ANA004 from '../views/ANA004-AdmMetodologia'
import ANA005 from '../views/ANA005-AdmNorma'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home', 
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admPersonal',
    name: 'admPersonal',
    component: USU004_admPersonal

  },
  {
    path: '/admDisponibilidad',
    name: 'admDisponibilidad',
    component: USU005_admDisponibilidad

  },
  {
    path: '/admEmpresa',
    name: 'admEmpresa',
    component: USU002_admEmpresa

  },
  {
    path: '/admSolicitante',
    name: 'admSolicitante',
    component: USU003_admSolicitante

  },
  {
    path: '/Form',
    name: 'formulario',
    component: MUS001

  },  
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
    path: '/AdministrarMuestra',
    name: 'AdminMuestra',
    component: MUS004
  },
  {

    path: '/Gerente',
    name:'vistaGerente',
    component: MUS006
  },
  {

    path: '/AdmFin',
    name: 'AdmFinanzas',
    component: MUS007

  },
  {

    path: '/AdmElementos',
    name: 'AdmElementos',
    component: ANA001

  },
  {

    path: '/AdmMatriz',
    name: 'AdmMatriz',
    component: ANA002

  },

  {

    path: '/AdmParam',
    name: 'AdmParam',
    component: ANA003

  },

  {

    path: '/AdmMetodologia',
    name: 'AdmMetodologia',
    component: ANA004

  },

  {

    path: '/AdmNorma',
    name: 'AdmNorma',
    component: ANA005

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
