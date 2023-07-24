<template>
<div style="margin-bottom:50px">

    <modal_agregarUsuario @refrescar="obtenerUsuarios" />
    <modal_estadoUsuario @refrescar="obtenerUsuarios" :user-data="this.modalEstadoData" />
    <modal_passwordUsuario :user-data="this.modalPasswordData" />

    <b-row align-h="start" style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Sistema administración de usuarios
            </div>
        </b-col>
    </b-row>

    <b-row class="justify-content-center">

        <b-col class="col-10">
            <b-row style="padding-top:30px; padding-bottom:10px">
                <b-col class="col-6">
<b-row>
                    <b-col class="col-6">
                        <b-row>
                            <b-button v-b-modal.modal-usuario style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">

                                Agregar Usuario
                                <b-icon icon="person-plus-fill"></b-icon>
                            </b-button>
                        </b-row>
                    </b-col>

                    <b-col class="col-4">
                        <b-row>
                            <b-button v-b-tooltip.hover title="Crear cuentas de usuarios faltantes de personal y solicitante registrados en el sistema." @click="sincronizarUsuarios" style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">

                              Sincronizar Usuarios
                                <b-icon icon="server"></b-icon>
                            </b-button>
                        </b-row>
                    </b-col>
                </b-row>
                </b-col>

                <b-col lg="6" class="my-1">
                    <b-form-group label-cols-sm="3" label-align-sm="right" label-size="md" class="mb-0">
                        <b-input-group size="md">
                            <b-input-group-prepend is-text>
                                <b-icon icon="search"></b-icon>

                            </b-input-group-prepend>
                            <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Escriba rut, nombre, etc. para filtrar"></b-form-input>

                            <b-input-group-append>
                                <b-button style="font-weight:bold" class="lsa-blue" :disabled="!filter" @click="filter = ''">Limpiar filtro</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-col>

        <b-col class="col-10">
            <b-table fixed show-empty :filter="filter" @filtered="onFiltered" :fields="campos_tabla" :items="usuario" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">

                            <div style=" color:gray"> No hay personal registrado para mostrar</div>
                        </div>

                    </div>
                </template>

                <template #emptyfiltered>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <b-icon icon="search" animation="fade" variant="secondary"></b-icon>
                            <div style="font-weight:bold; color:gray"> No hay resultados que coincidan con su búsqueda</div>
                        </div>

                    </div>
                </template>
                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>

                <template #cell(estado)="row">

                    <span v-if="row.item.estado == true" style="text-transform:uppercase; color:green; font-weight: bold;">HABILITADO</span>
                    <span v-else style="text-transform:uppercase; color:red; font-weight: bold;">DESHABILITADO</span>
                </template>

                <template #cell(tipo_usuario)="row">
                    <span style="font-weight: bold;"> {{ row.item.tipo_usuario.toUpperCase() }}</span>
                </template>
                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>

                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>

                        </template>
                        <b-dropdown-item @click="abrirEstadoPersonal(row.item)">
                            <b-icon icon="person-check" aria-hidden="true" class="mr-2"></b-icon>Cambiar estado
                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirPasswordPersonal(row.item)">
                            <b-icon icon="shield-lock" aria-hidden="true" class="mr-2"></b-icon>Cambiar contraseña
                        </b-dropdown-item>
                    </b-dropdown>

                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="right"></b-pagination>
        </b-col>
    </b-row>

</div>
</template>

<script>
// @ is an alias to /src
import modal_agregarUsuario from '@/components/admUsuario/modal_agregarUsuario.vue'
import modal_passwordUsuario from '@/components/admUsuario/modal_passwordUsuario.vue'
//import modal_detallesPersonal from '@/components/admPersonal/modal_detallesPersonal.vue'
//mport modal_editarPersonal from '@/components/admPersonal/modal_editarPersonal.vue'
import modal_estadoUsuario from '@/components/admUsuario/modal_estadoUsuario.vue'

import usuarioService from "@/helpers/api-services/Auth.service"
import roleService from "@/helpers/api-services/Role.service"
export default {
    name: 'admPersonal',
    components: {
        modal_agregarUsuario,
        modal_estadoUsuario,
        modal_passwordUsuario
    },
    mounted() {
        this.obtenerUsuarios();
    },
    computed: {
        rows() {
            return this.usuario.length
        }
    },
    data() {
        return {
            filter: null,
            filterOn: [],
            roles: [],
            editarID: 0,
            currentPage: 1,
            perPage: 10,
            loading: true,
            modalEditarData: {},
            modalDetallesData: {},
            modalPasswordData: {},
            modalEstadoData: {},
            campos_tabla: [{
                key: 'nombre',
                label: 'Nombres',
                sortable: true
            }, {
                key: 'apellido',
                label: 'Apellidos',
                sortable: true
            }, {
                key: 'email',
                label: 'Correo electrónico'
            }, {
                key: 'cargo',
                label: 'Cargo',
                sortable: true
            }, {
                key: 'tipo_usuario',
                label: 'Tipo usuario',
                sortable: true
            }, {
                key: 'estado',
                label: 'Estado',
                sortable: true
            }, {
                key: 'accion',
                label: 'Acción'
            }],
            usuario: [{}],
        }
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        sincronizarUsuarios(){
            usuarioService.sincronizarUsuarios().then((response) => {
                if (response != null) {
                    if (response.status == 200) {
                        this.$bvToast.toast(`Sincronización completada.`, {
                            title: "Éxito",
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                }) 
                                this.obtenerUsuarios();
                    }
                }
            })  
        },
        obtenerRoles() {
            roleService.obtenerRoles().then((response) => {
                if (response != null) {
                    if (response.data != null) {
                        this.roles = response.data;
                        for (var i = 0; i < this.usuario.length; i++) {
                            this.usuario[i].cargo = this.roles.find(x => x.id_rol == this.usuario[i].role).descripcion;
                            if (this.usuario[i].empleado != null) {
                                this.usuario[i].tipo_usuario = "empleado";
                            } else if (this.usuario[i].solicitante != null) {
                                this.usuario[i].tipo_usuario = "solicitante";
                            } else {
                                this.usuario[i].tipo_usuario = "sistema";
                            }
                        }
                    }
                    this.loading = false;
                }
            })
        },
        obtenerUsuarios() {
            this.loading = true;
            usuarioService.obtenerUsuarios().then((response) => {
                if (response != null) {
                    this.usuario = response.data
                    this.obtenerRoles();

                }

            })
        },
        abrirPasswordPersonal(data) {
            this.modalPasswordData = data;
            this.$bvModal.show('modal-password-usuario')
        },
        abrirEstadoPersonal(data) {
            this.modalEstadoData = data;
            this.$bvModal.show('modal-estado-usuario')
        }

    }
}
</script>
