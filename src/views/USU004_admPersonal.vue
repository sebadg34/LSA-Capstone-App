<template>
<div style="margin-bottom:50px">

    <modal_agregarPersonal @refrescar="obtenerPersonal"/>
    <modal_detallesPersonal :user-data="this.modalDetallesData" />
    <modal_editarPersonal @refrescar="obtenerPersonal" :user-data="this.modalEditarData" />
    <modal_estadoPersonal @refrescar="obtenerPersonal" :user-data="this.modalEstadoData"/>
    <b-container class="bv-example-row" style="padding-top:50px; padding-left:0px;padding-right: 0px;">
        <b-col class="col-12">

            <b-col class="col-3">
                <b-row>
                    <b-button v-b-modal.modal-personal style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">

                        Agregar Personal
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
            <b-table :fields="campos_tabla" :items="personal" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">

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
        return this.items.length
      }
    },
    data() {
        return {
            editarID: 0,
            currentPage: 3,
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
            items: [{
                rut: '19.950.670-6',
                nombre: 'sebastian',
                apellido: 'delgado guerra',
                correo: 'prueba@prueba.com',
                cargo: 'Gerente',
                tipo: 'Contrato Plazo Fijo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '19.950.670-6',
                nombre: 'sebastian',
                apellido: 'delgado guerra',
                correo: 'prueba@prueba.com',
                cargo: 'Gerente',
                tipo: 'Contrato Plazo Fijo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '19.950.670-6',
                nombre: 'sebastian',
                apellido: 'delgado guerra',
                correo: 'prueba@prueba.com',
                cargo: 'Gerente',
                tipo: 'Contrato Plazo Fijo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '19.950.670-6',
                nombre: 'sebastian',
                apellido: 'delgado guerra',
                correo: 'prueba@prueba.com',
                cargo: 'Gerente',
                tipo: 'Contrato Plazo Fijo',
                estado: 'INACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '19.950.670-6',
                nombre: 'sebastian',
                apellido: 'delgado guerra',
                correo: 'prueba@prueba.com',
                cargo: 'Gerente',
                tipo: 'Contrato Plazo Fijo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '19.950.670-6',
                nombre: 'sebastian',
                apellido: 'delgado guerra',
                correo: 'prueba@prueba.com',
                cargo: 'Gerente',
                tipo: 'Contrato Plazo Fijo',
                estado: 'INACTIVO',
                accion: 'pruebaAccion'
            }]
        }
    },
    methods: {
        testEvent(){
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
        abrirEstadoPersonal(data){
            console.log(data)
            this.modalEstadoData =data;
            this.$bvModal.show('modal-estado-personal')
        }

    }
}
</script>
