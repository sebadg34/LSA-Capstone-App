import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import USU004_admPersonal from '../views/USU004_admPersonal'
import MUS001 from '../views/MUS001.vue'
import MUS002 from '../views/MUS002-IngMuesLab.vue'
import MUS003 from '../views/MUS003-vistaQm-AQm.vue'
import MUS004 from '../views/MUS004-vistaSuperv-Jefe.vue'
import MUS006 from '../views/MUS006-vistaGerente.vue'
import MUS007 from '../views/MUS007-vistaAdmFinanza.vue'
import NotFound from '../views/vistaNoEncontrada.vue'
import USU002_admEmpresa from '../views/USU002_admEmpresa'
import USU003_admSolicitante from '../views/USU003_admSolicitante'
import USU005_admDisponibilidad from '../views/USU005_admDisponibilidad'
import USU001_vistaInicio from '../views/USU001_vistaInicio'
import {isLoggedIn} from "@/helpers/api-services/Auth.service";

Vue.use(VueRouter)

const routes = [
  {
    path: '/inicio',
    name: 'inicio',
    component: USU001_vistaInicio,
    meta: {
      title: "Dashboard"
    }
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "LSA - pagina desconocida",
      allowAnonymous: true
    }
  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      title: "Inicio Sesión",
      allowAnonymous: true
    }
  },
  //{
  //  path: '/login',
  //  name: 'login',
  //  component: LoginView
  //},
  {
    path: '/admPersonal',
    name: 'admPersonal',
    component: USU004_admPersonal,
    meta: {
      title: "LSA - Administración Personal"
    }

  },
  {
    path: '/admDisponibilidad',
    name: 'admDisponibilidad',
    component: USU005_admDisponibilidad,
    meta: {
      title: "LSA - Administración Disponibilidad"
    }

  },
  {
    path: '/admEmpresa',
    name: 'admEmpresa',
    component: USU002_admEmpresa,
    meta: {
      title: "LSA - Administración Empresa"
    }

  },
  {
    path: '/admSolicitante',
    name: 'admSolicitante',
    component: USU003_admSolicitante,
    meta: {
      title: "LSA - Administración Solicitante"
    }

  },
  {
    path: '/Form',
    name: 'formulario',
    component: MUS001,
    meta: {
      title: "LSA"
    }

  },  
  {
    path: '/IngMuesLab',
    name: 'IngresoLab',
    component: MUS002,
    meta: {
      title: "LSA"
    }


  },
  {
    path: '/AdmMuesQm',
    name: 'AdminQm',
    component: MUS003,
    meta: {
      title: "LSA"
    }

  },
  {
    path: '/AdministrarMuestra',
    name: 'AdminMuestra',
    component: MUS004,
    meta: {
      title: "LSA - Administración Muestra"
    }
  },
  {

    path: '/Gerente',
    name:'vistaGerente',
    component: MUS006,
    meta: {
      title: "ADM - No autorizado"
    }
  },
  {

    path: '/AdmFin',
    name: 'AdmFinanzas',
    component: MUS007,
    meta: {
      title: "ADM - No autorizado"
    }

  },
  //{
  //  path: "/Bloqueado",
  //  name: "Bloqueado",
  //  component: Bloqueado,
  //  meta: {
  //    title: "Sistema bloqueado",
  //    allowAnonymous: true
  //  }
  //},

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

router.beforeEach((to, from, next) => {
  if (to.name == "login" && isLoggedIn()) {
    next({ path: "/inicio" })
  }
  else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    //clearAuthToken();
    next({ name: "login" })
  }
  else
  {
    next()
  }
  
})

export default router
