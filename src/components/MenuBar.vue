<template lang="">
<div style="position:relative" v-click-outside="onClickOutside">

    <b-button v-on:click="menu_active=!menu_active" class="menuDropdownButton menu-button lsa-orange white-text ml-2 mr-2">
        <b-icon style="color:white" icon="menu-app" aria-hidden="true"></b-icon>
        <span style="color:white" class="px-md-2 dropdown-desktop">Menú</span>
        <b-icon class="menuDropdownIcon" style="color:white" icon="caret-down-fill" aria-hidden="true"></b-icon>
    </b-button>

    <transition name="menu-pop">
        <div class="menu" v-show="menu_active">

            <b-list-group class="menu custom-light-shadowbox ml-2 mr-2" id="menu">
                <b-list-group-item @click="navegarRuta('inicio')" class="cursorToHand  homeButton">
                    <b-icon icon="house-fill" aria-hidden="true"></b-icon><span class="px-md-2">Home</span>
                </b-list-group-item>

                <template v-if="rol == 1 || rol == 2 || rol == 6 || rol == 0">
                    <b-list-group-item id="dropdown-header-label" class="lsa-light-gray cursorToHand menuHeader d-flex justify-content-between" v-b-toggle="'collapse-1'">
                        <div>
                            <b-icon class="lsa-orange-text" icon="people-fill"></b-icon>
                            <span class="px-md-2"></span>
                            <span>Administrar personal</span>
                        </div>
                        <b-icon icon="chevron-down" variant="dark"></b-icon>
                    </b-list-group-item>
                    <b-collapse accordion="my-accordion" id="collapse-1">
                        <b-list-group-item @click="navegarRuta('admPersonal')" class="cursorToHand menuButton">
                            <b-icon class="lsa-orange-text" icon="person-plus-fill"></b-icon>
                            <span class="px-md-2"></span> Agregar personal
                        </b-list-group-item>
                        <b-list-group-item v-if="rol == 1 || rol == 2 || rol == 7 || rol == 0" @click="navegarRuta('admDisponibilidad')" class="cursorToHand menuButton">
                            <b-icon class="lsa-orange-text" icon="person-check-fill"></b-icon>
                            <span class="px-md-2"></span> Disponibilidad del personal
                        </b-list-group-item>
                    </b-collapse>
                </template>

                <b-list-group-item id="dropdown-header-label" class="lsa-light-gray cursorToHand menuHeader d-flex justify-content-between" v-b-toggle="'collapse-2'">
                    <div>
                        <b-icon class="lsa-orange-text" icon="eyedropper"></b-icon>
                        <span class="px-md-2"></span>
                        <span>Administrar laboratorio</span>
                    </div>
                    <b-icon icon="chevron-down" variant="dark"></b-icon>
                </b-list-group-item>
                <b-collapse accordion="my-accordion" id="collapse-2">

                    <b-list-group-item v-if="rol == 1 || rol == 0" @click="navegarRuta('AdminMuestraGerente')" class="cursorToHand menuButton">

                        <div class="roleTag">Gerente</div>
                        <div style="height:10px"></div>
                        <b-icon class="lsa-orange-text" icon="eyedropper"></b-icon>
                        <span class="px-md-2"></span> Administrar muestra

                        <div style="height:10px"></div>
                    </b-list-group-item>
                    <b-list-group-item v-if="rol == 7 || rol == 0" @click="navegarRuta('AdminMuestraFinanzas')" class="cursorToHand menuButton">

                        <div class="roleTag">Finanzas</div>
                        <div style="height:10px"></div>
                        <b-icon class="lsa-orange-text" icon="eyedropper"></b-icon>
                        <span class="px-md-2"></span> Administrar muestra

                        <div style="height:10px"></div>
                    </b-list-group-item>
                    <b-list-group-item v-if="rol == 3 || rol == 4 || rol == 0" @click="navegarRuta('AdminMuestraLab')" class="cursorToHand menuButton">

                        <div class="roleTag">Químicos</div>
                        <div style="height:10px"></div>
                        <b-icon class="lsa-orange-text" icon="eyedropper"></b-icon>
                        <span class="px-md-2"></span> Administrar muestra

                        <div style="height:10px"></div>
                    </b-list-group-item>
                    <b-list-group-item v-if="rol == 5 || rol == 0" @click="navegarRuta('AdminMuestraSolicitante')" class="cursorToHand menuButton">

                        <div class="roleTag">Solicitante</div>
                        <div style="height:10px"></div>
                        <b-icon class="lsa-orange-text" icon="eyedropper"></b-icon>
                        <span class="px-md-2"></span> Administrar muestra

                        <div style="height:10px"></div>
                    </b-list-group-item>
                    <template v-if="rol == 0 || rol == 2 || rol == 6">

                        <b-list-group-item @click="navegarRuta('admElementos')" class="cursorToHand menuButton">
                            <b-icon class="lsa-orange-text" icon="archive-fill"></b-icon>
                            <span class="px-md-2"></span> Administrar elementos
                        </b-list-group-item>
                    </template>

                </b-collapse>

                <template v-if="rol == 2 || rol == 6 || rol == 0">
                    <b-list-group-item id="dropdown-header-label" class="lsa-light-gray cursorToHand menuHeader d-flex justify-content-between" v-b-toggle="'collapse-3'">
                        <div>
                            <b-icon class="lsa-orange-text" icon="briefcase-fill"></b-icon>
                            <span class="px-md-2"></span>
                            <span>Administrar cliente</span>
                        </div>
                        <b-icon icon="chevron-down" variant="dark"></b-icon>
                    </b-list-group-item>
                    <b-collapse accordion="my-accordion" id="collapse-3">

                        <b-list-group-item v-if="rol == 2 || rol == 6 || rol == 0" @click="navegarRuta('admSolicitante')" class="cursorToHand menuButton">
                            <b-icon class="lsa-orange-text" icon="people-fill"></b-icon>
                            <span class="px-md-2"></span> Administrar solicitante
                        </b-list-group-item>

                        <b-list-group-item v-if="rol == 2 || rol == 6 || rol == 0" @click="navegarRuta('admEmpresa')" class="cursorToHand menuButton">
                            <b-icon class="lsa-orange-text" icon="building"></b-icon>
                            <span class="px-md-2"></span> Administrar empresa
                        </b-list-group-item>
                    </b-collapse>
                </template>

                <template v-if="rol==0">
                    <b-list-group-item id="dropdown-header-label" class="lsa-light-gray cursorToHand menuHeader d-flex justify-content-between" v-b-toggle="'collapse-4'">
                        <div>
                            <b-icon class="lsa-orange-text" icon="gear-fill"></b-icon>
                            <span class="px-md-2"></span>
                            <span>Administrar Sistema</span>
                        </div>
                        <b-icon icon="chevron-down" variant="dark"></b-icon>
                    </b-list-group-item>
                    <b-collapse accordion="my-accordion" id="collapse-4">
                        <b-list-group-item @click="navegarRuta('admUsuario')" class="cursorToHand menuButton">
                            <b-icon class="lsa-orange-text" icon="people-fill"></b-icon>
                            <span class="px-md-2"></span> Registrar usuarios
                        </b-list-group-item>
                    </b-collapse>
                </template>
            </b-list-group>

        </div>

    </transition>

</div>
</template>

<script>
import authService from "@/helpers/api-services/Auth.service"
import vClickOutside from 'v-click-outside';
import {
    validarAcceso
} from '@/helpers/RoleChecker'
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

    async created() {
        if (isLoggedIn()) {
            console.log('checkenado user info')
            this.userData = getUserInfo();
            console.log('data user', this.userData)
            this.rol = this.userData.role
        }
    },
    data() {
        return {
            menu_active: false,
            userData: [],
            rol: -1,
        };
    },
    methods: {
        async navegarRuta(ruta) {
            if (await validarAcceso()) {
                this.$router.push({
                    name: ruta
                });
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

            this.$router.push("/");
        },
    }
}
</script>

<style scoped>
.roleTag {
    background-color: var(--lsa-light-blue);
    color: white;
    border-radius: 0px 0px 0px 5px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.8rem;
    margin: 0px;
    padding-left: 10px;
    padding-right: 10px
}

.logoutButton {
    background-color: var(--lsa-orange) !important;
    color: white;
    font-weight: bold;
}

.logoutButton:hover {
    transition-duration: 0.1s;
    background-color: var(--lsa-light-orange) !important;
}

.logoutButton:active {
    transition-duration: 0.1s;
    scale: 1.1;
    background-color: gray !important;
    color: white;
    border-radius: 20px;
}

.menuHeader {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
    font-size: 15px;
}

.menuHeader:hover {
    background-color: rgb(220, 234, 255) !important;

}

.menu {
    position: absolute;
    bottom: 100;
    top: 20px;
    left: 0;
    width: 260px;
    margin-top: 3px;
    border-radius: 5px 5px 15px 15px !important;
    z-index: 20;
    font-size: 15px;

}

.menuButton {
    background-color: white;
    z-index: 22;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
    justify-content: space-between !important;
}

.menuButton:hover {
    transition-duration: 0.1s;
    background-color: var(--lsa-light-blue) !important;
    color: white !important;
    font-size: 17px;

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
