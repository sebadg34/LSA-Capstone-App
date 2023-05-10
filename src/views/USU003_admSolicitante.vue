<template>
<div style="margin-bottom:50px">

    <modal_agregarSolicitante @refrescar="obtenerSolicitante" />
    <modal_detallesSolicitante :user-data="this.modalDetallesData" />
    <modal_editarSolicitante @refrescar="obtenerSolicitante" :solicitante-data="this.modalEditarData" />
    <b-container class="bv-example-row" style="padding-top:50px; padding-left:0px;padding-right: 0px;">
        <b-col class="col-12">

            <b-col class="col-3">
                <b-row>
                    <b-button v-b-modal.modal-solicitante style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                        Agregar Solicitante
                        <b-icon icon="person-plus-fill"></b-icon>
                    </b-button>
                </b-row>
            </b-col>
            <b-row class="pt-5">

            </b-row>

        </b-col>

    </b-container>
    <b-row class="justify-content-center">
        <b-col class="col-10">
            <b-table :fields="campos_tabla" :items="solicitante" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">

                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>
                <!--

                    <template #cell(estado)="row">

                        <span v-if="row.item.estado == true" style="text-transform:uppercase; color:green; font-weight: bold;">activo</span>
                        <span v-else-if="row.item.estado " style="text-transform:uppercase; color:red; font-weight: bold;">inactivo</span>
                    </template>
                       -->
                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>

                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>

                        </template>
                        <b-dropdown-item @click="abrirDetallesEmpresa(row.item)">
                            <b-icon icon="file-richtext" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEditarSolicitante(row.item)">
                            <b-icon icon="pencil" aria-hidden="true" class="mr-2"></b-icon>Editar
                        </b-dropdown-item>
                        <b-dropdown-item >
                            <b-icon icon="person-check" aria-hidden="true" class="mr-2"></b-icon>Cambiar estado
                        </b-dropdown-item>
                        <b-dropdown-item >
                            <b-icon icon="card-heading" aria-hidden="true" class="mr-2"></b-icon>Ver cotizaciones
                        </b-dropdown-item>
                        <b-dropdown-item >
                            <b-icon icon="file-earmark-plus" aria-hidden="true" class="mr-2"></b-icon>Agregar cotización
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
import modal_agregarSolicitante from '@/components/admSolicitante/modal_agregarSolicitante.vue'
import modal_editarSolicitante from '@/components/admSolicitante/modal_editarSolicitante.vue'
import modal_detallesSolicitante from '@/components/admSolicitante/modal_detallesSolicitante.vue'

import solicitanteService from "@/helpers/api-services/Solicitante.service"

export default {
    name: 'admEmpresa',
    components: {
        modal_agregarSolicitante,
        modal_editarSolicitante,
        modal_detallesSolicitante
    },
    mounted() {
        this.obtenerSolicitante();
    },
    computed: {
        rows() {
            return this.solicitante.length
        }
    },
    data() {
        return {
            editarID: 0,
            currentPage: 3,
            perPage: 10,
            loading: false,
            modalEditarData: {},
            modalDetallesData: {},
            modalEstadoData: {},
            campos_tabla: [ {
                    key: 'rut_solicitante',
                    label: 'Rut'
                }, {
                    key: 'nombre',
                    label: 'Nombre'
                }, {
                    key: 'apellido',
                    label: 'Apellidos'
                }, {
                    key: 'correo',
                    label: 'Correo electrónico'
                },
                {
                    key: 'telefono',
                    label: 'Teléfono Movil'
                }, 
               
                 {
                    key: 'tipo_cliente',
                    label: 'Tipo cliente'
                }, 
                {
                    key: 'accion',
                    label: 'Acción'
                }
            ],
            solicitante: [{}],
        }
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        abrirEditarSolicitante(data) {
            console.log(data)
            this.modalEditarData = data;
            this.$bvModal.show('modal-editar-solicitante')
        },
        abrirDetallesEmpresa(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalles-empresa')
        },
        testEvent() {
            console.log('evento leido')
        },
        obtenerSolicitante() {
            this.loading = true;
            solicitanteService.obtenerTodosSolicitantes().then((response) => {
                if (response != null) {
                    console.log(response)
                    this.solicitante = response.data
                    console.log(this.empresa)

                    this.loading = false;
                }

            })

        },
        /** 
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
            abrirEstadoPersonal(data){
                console.log(data)
                this.modalEstadoData =data;
                this.$bvModal.show('modal-estado-personal')
            }
    */
    }
}
</script>
