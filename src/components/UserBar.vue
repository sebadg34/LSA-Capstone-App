<template lang="">
<div style="position:relative" v-click-outside="onClickOutside">
    <modal_cambiarPassword/>
    <b-button v-on:click="menu_active=!menu_active" class="menuDropdownButton lsa-light-gray ml-2 mr-2">
        <b-icon style="color: var(--lsa-light-blue)" icon="person-lines-fill" aria-hidden="true"></b-icon>
        <span style="color: var(--lsa-blue); font-weight:bold" class="px-md-2 dropdown-desktop">{{userData.nombre}}</span>
        <b-icon class="menuDropdownIcon" style="color: var(--lsa-light-blue)" icon="caret-down-fill" aria-hidden="true"></b-icon>
    </b-button>

    <transition name="menu-pop">
        <div class="menu" v-show="menu_active">
        <b-list-group class="menu custom-light-shadowbox mr-2" >
            <b-list-group-item @click="navegarRuta('/perfil')" class="cursorToHand  perfilButton">
                    <b-icon icon="person-circle" aria-hidden="true"></b-icon><span class="px-md-2">Perfil</span>
                </b-list-group-item>
                <b-list-group-item style="padding: 5px 0px 5px 0px" @click="abrirCambiarPassword()" class="cursorToHand  perfilButton">
                    <b-icon icon="key-fill" aria-hidden="true"></b-icon><span class="px-md-2">Cambiar contraseña</span>
                </b-list-group-item>
                <b-list-group-item @click="logoutUser()" class="cursorToHand  logoutButton">
                    <b-icon icon="power" aria-hidden="true"></b-icon><span class="px-md-2">Cerrar sesión</span>
                </b-list-group-item>
            </b-list-group>
       
        </div>
    </transition>

</div>
</template>

<script>
import modal_cambiarPassword from '@/components/admUsuario/modal_cambiarPassword.vue'
import authService from "@/helpers/api-services/Auth.service"
import vClickOutside from 'v-click-outside';
import {validarAcceso} from '@/helpers/RoleChecker'
import {
    getUserInfo
} from "@/helpers/api-services/Auth.service";
import {
    isLoggedIn
} from "@/helpers/api-services/Auth.service";

export default {
    directives: {
        clickOutside: vClickOutside.directive
    },
    components: {
    modal_cambiarPassword
  },

    async created(){
        if (isLoggedIn()) {
            console.log('checkenado user info')
                this.userData = getUserInfo();
console.log('data user',this.userData)
            }
    },
   // watch: {
   //     rol: {
   //         handler() {
   //            console.log("CARGANDO MENU PARA ROL: ",this.rol);
   //         }
   //     }
   // },
   // props: {
   //     rol: Number
   // },
    data() {
        return {
            menu_active: false,
            userData: [],
        };
    },
    methods: {
        abrirCambiarPassword() {
            this.$bvModal.show('modal-cambiar-password')
        },
        async navegarRuta(ruta){
            if (await validarAcceso()){
                this.$router.push(ruta);
            }
        },
        // eslint-disable-next-line no-unused-vars
        onClickOutside(event) {
            if (this.menu_active) {
                this.menu_active = false;
            }

        },
         async logoutUser() {

           await authService.logout();
           
           this.$root.$bvToast.toast('Sesión cerrada exitosamente.', {
                                    title: '',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "info",
                                    appendToast: true
                                })

        this.$router.push("/");
          
        },
    }
}
</script>

<style scoped>
.logoutButton {
    background-color: var(--lsa-orange) !important;
    color: white;
    font-weight: bold;
    padding-top:6px;
    padding-bottom:6px;
    font-size:14px;
}

.logoutButton:hover {
    transition-duration: 0.1s;
    background-color: var(--lsa-light-orange) !important;
    font-size:15px;
}

.logoutButton:active {
    transition-duration: 0.1s;
    scale: 1.1;
    background-color: gray !important;
    color: white;
    z-index:20 !important;
    font-size:15px;
}
.perfilButton {
    background-color: var(--lsa-light-gray) !important;
    color: var(--lsa-blue);
    font-weight: bold;
    padding-top:6px;
    padding-bottom:6px;
    font-size:14px;
}

.perfilButton:hover {
    transition-duration: 0.1s;
    background-color: white!important;
    font-size:15px;
}

.perfilButton:active {
    transition-duration: 0.1s;
    scale: 1.1;
    background-color: gray !important;
    color: white;
    z-index:20 !important;
}

.menu {
    position: absolute;
    bottom: 100;
    top: 20px;
    right:0px;
    width: 200px;
    margin-top: 3px;
    border-radius: 5px 5px 15px 15px !important;
    z-index: 20;

}

.menuButton {
    background-color: white;
    z-index: 22;
}
.menuButton:hover {
    transition-duration: 0.1s;
    background-color: var(--lsa-light-blue) !important;
    color:white !important;

}

.menuButton:active {
    transition-duration: 0.1s;
    scale: 1.1;
    background-color: gray;
    color: white;
}
.homeButton {

    padding-top: 4px !important;
    padding-bottom: 4px !important;
    background-color: var(--lsa-blue) !important;
    color: white;
    font-weight: bold;
}

.homeButton:hover {
    transition-duration: 0.1s;
    background-color: var(--lsa-light-blue) !important;
    z-index: 30;
}

.homeButton:active {
    transition-duration: 0.1s;
    scale: 1.03;
    background-color: gray !important;
    color: white;
}

.menu-pop-enter-active,
.menu-pop-leave-active {
    transition: all 0.2s;
}

.menu-pop-enter,
.menu-pop-leave-active {
    transform: translate3d(0, -2rem, 0);
    opacity: 0;
}

.menuDropdownButton {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
}


.menuDropdownIcon {
    transition: 0.2s ease;
}

.menuDropdownButton:active {

    transition: 0.2s ease;
    transform: scale(0.97);
}

.menuDropdownButton:active .menuDropdownIcon {
    transform: scale(1.02);
}
</style>
