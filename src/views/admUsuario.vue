<template>
<div style="margin-bottom:50px">

    <modal_agregarUsuario @refrescar="obtenerUsuarios" />
    <modal_estadoPersonal @refrescar="obtenerUsuarios" :user-data="this.modalEstadoData" />

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

                    <b-col class="col-6">
                        <b-row>
                            <b-button v-b-modal.modal-usuario style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">

                                Agregar Usuario
                                <b-icon icon="person-plus-fill"></b-icon>
                            </b-button>
                        </b-row>
                    </b-col>

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
                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>

                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>

                        </template>
                        <b-dropdown-item disabled @click="abrirEstadoPersonal(row.item)">
                            <b-icon icon="person-check" aria-hidden="true" class="mr-2"></b-icon>Cambiar estado
                        </b-dropdown-item>
                        <b-dropdown-item disabled @click="abrirEstadoPersonal(row.item)">
                            <b-icon icon="person-check" aria-hidden="true" class="mr-2"></b-icon>Cambiar contraseña
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
//import modal_detallesPersonal from '@/components/admPersonal/modal_detallesPersonal.vue'
//mport modal_editarPersonal from '@/components/admPersonal/modal_editarPersonal.vue'
import modal_estadoPersonal from '@/components/admPersonal/modal_estadoPersonal.vue'

import usuarioService from "@/helpers/api-services/Auth.service"
import roleService from "@/helpers/api-services/Role.service"
export default {
    name: 'admPersonal',
    components: {
        modal_agregarUsuario,
        modal_estadoPersonal
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
            modalEstadoData: {},
            campos_tabla: [{
                key: 'nombre',
                label: 'Nombre'
            }, {
                key: 'apellido',
                label: 'Apellido'
            }, {
                key: 'email',
                label: 'Correo'
            }, {
                key: 'cargo',
                label: 'Cargo'
            }, {
                key: 'estado',
                label: 'Estado'
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
        obtenerRoles() {
            roleService.obtenerRoles().then((response) => {
                if (response != null) {
                    if (response.data != null) {
                        this.roles = response.data;
                        for (var i = 0; i < this.usuario.length; i++) {
                            this.usuario[i].cargo = this.roles.find(x => x.id_rol == this.usuario[i].role).descripcion;
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
        abrirEditarPersonal(data) {
            this.modalEditarData = data;
            this.$bvModal.show('modal-editar-personal')
        },
        abrirDetallesPersonal(data) {
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalles-personal')
        },
        abrirEstadoPersonal(data) {
            this.modalEstadoData = data;
            this.$bvModal.show('modal-estado-personal')
        }

    }
}
</script>
