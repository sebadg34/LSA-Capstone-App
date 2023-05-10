<template>
<div style="margin-bottom:50px">

    <modal_agregarPersonal @refrescar="obtenerPersonal" />
    <modal_detallesPersonal :user-data="this.modalDetallesData" />
    <modal_editarPersonal @refrescar="obtenerPersonal" :user-data="this.modalEditarData" />
    <modal_estadoPersonal @refrescar="obtenerPersonal" :user-data="this.modalEstadoData" />
  

  

    <b-row class="justify-content-center">

<b-col class="col-10">
    <b-row style="padding-top:50px; padding-bottom:10px">
            <b-col class="col-6">

                <b-col class="col-6">
                    <b-row>
                        <b-button v-b-modal.modal-personal style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">

                            Agregar Personal
                            <b-icon icon="person-plus-fill"></b-icon>
                        </b-button>
                    </b-row>
                </b-col>

            </b-col>

            <b-col lg="6" class="my-1">
                <b-form-group label-cols-sm="3" label-align-sm="right" label-size="md" class="mb-0">
                    <b-input-group size="md">
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
            <b-table :filter="filter" @filtered="onFiltered" :fields="campos_tabla" :items="personal" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">

                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>

                <template #cell(estado)="row">

                    <span v-if="row.item.estado == true" style="text-transform:uppercase; color:green; font-weight: bold;">activo</span>
                    <span v-else style="text-transform:uppercase; color:red; font-weight: bold;">inactivo</span>
                </template>
                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>

                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>

                        </template>
                        <b-dropdown-item @click="abrirDetallesPersonal(row.item)">
                            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEditarPersonal(row.item)">
                            <b-icon icon="pencil" aria-hidden="true" class="mr-2"></b-icon>Editar
                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEstadoPersonal(row.item)">
                            <b-icon icon="person-check" aria-hidden="true" class="mr-2"></b-icon>Cambiar estado
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
import modal_agregarPersonal from '@/components/admPersonal/modal_agregarPersonal.vue'
import modal_detallesPersonal from '@/components/admPersonal/modal_detallesPersonal.vue'
import modal_editarPersonal from '@/components/admPersonal/modal_editarPersonal.vue'
import modal_estadoPersonal from '@/components/admPersonal/modal_estadoPersonal.vue'

import personalService from "@/helpers/api-services/Personal.service"

export default {
    name: 'admPersonal',
    components: {
        modal_agregarPersonal,
        modal_detallesPersonal,
        modal_editarPersonal,
        modal_estadoPersonal
    },
    mounted() {
        this.obtenerPersonal();
    },
    computed: {
        rows() {
            return this.personal.length
        }
    },
    data() {
        return {
            filter: null,
            filterOn: [],
            editarID: 0,
            currentPage: 1,
            perPage: 10,
            loading: true,
            modalEditarData: {},
            modalDetallesData: {},
            modalEstadoData: {},
            campos_tabla: [{
                key: 'rut_empleado',
                label: 'Rut'
            }, {
                key: 'nombre',
                label: 'Nombre'
            }, {
                key: 'apellido',
                label: 'Apellido'
            }, {
                key: 'correo',
                label: 'Correo'
            }, {
                key: 'rol',
                label: 'Cargo'
            }, {
                key: 'estado',
                label: 'Estado'
            }, {
                key: 'accion',
                label: 'Acción'
            }],
            personal: [{}],
        }
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        testEvent() {
            console.log('evento leido')
        },
        obtenerPersonal() {
            this.loading = true;
            personalService.obtenerTodosPersonal().then((response) => {
                if (response != null) {
                    console.log(response)
                    this.personal = response.data
                    console.log(this.personal)

                    this.loading = false;
                }

            })
        },
        abrirEditarPersonal(data) {
            console.log(data)
            this.modalEditarData = data;
            this.$bvModal.show('modal-editar-personal')
        },
        abrirDetallesPersonal(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalles-personal')
        },
        abrirEstadoPersonal(data) {
            console.log(data)
            this.modalEstadoData = data;
            this.$bvModal.show('modal-estado-personal')
        }

    }
}
</script>
