<template>
    <div style="margin-bottom:50px">

        <modal_agregarPersonal />
        <modal_detallesPersonal />
        <modal_editarPersonal />
        <modal_estadoPersonal />
        <b-container class="bv-example-row" style="padding-top:50px; padding-left:0px;padding-right: 0px;">
            <b-col class="col-12">

                <b-col class="col-3">
                    <b-row>
                        <b-button v-b-modal.modal-personal style="border-radius: 15px; font-weight: bold; font-size: 18px; "
                            class="lsa-light-blue reactive-button">

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
                <b-table :fields="campos_tabla" :items="items" style="">
                    <template #cell(estado)="row">

                        <span v-if="row.item.estado == 'ACTIVO'"
                            style="text-transform:uppercase; color:green; font-weight: bold;">{{
                                (row.item.estado)}}</span>
                        <span v-else style="text-transform:uppercase; color:red; font-weight: bold;">{{
                            (row.item.estado) }}</span>
                    </template>
                    <template #cell(accion)>


                        <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                            <template #button-content>


                                <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots"
                                    variant="dark" aria-hidden="true"></b-icon>


                            </template>
                            <b-dropdown-item v-b-modal.modal-detalles-personal>
                                <b-icon icon="file-earmark-medical"
                                    aria-hidden="true" class="mr-2"></b-icon>Ver detalles
                                    
                               </b-dropdown-item>
                            <b-dropdown-item v-b-modal.modal-editar-personal> <b-icon icon="pencil"
                                    aria-hidden="true" class="mr-2"></b-icon>Editar</b-dropdown-item>
                            <b-dropdown-item v-b-modal.modal-estado-personal> <b-icon icon="person-check"
                                    aria-hidden="true" class="mr-2"></b-icon>Cambiar estado</b-dropdown-item>
                        </b-dropdown>

                    </template>
                </b-table>
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
export default {
    name: 'admPersonal',
    components: {
        modal_agregarPersonal,
        modal_detallesPersonal,
        modal_editarPersonal,
        modal_estadoPersonal
    },
    data() {
        return {
            campos_tabla: [{ key: 'rut', label: 'Rut' }
                , { key: 'nombre', label: 'Nombre' }
                , { key: 'apellido', label: 'Apellido' }
                , { key: 'correo', label: 'Correo' }
                , { key: 'cargo', label: 'Cargo' }
                , { key: 'estado', label: 'Estado' }
                , { key: 'accion', label: 'Acción' }],
            items: [{
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            },
            {
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'INACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'INACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'ACTIVO',
                accion: 'pruebaAccion'
            }, {
                rut: '99.999.999-k',
                nombre: 'pruebaNombre',
                apellido: 'pruebaApellido',
                correo: 'prueba@prueba.com',
                cargo: 'pruebaCargo',
                estado: 'INACTIVO',
                accion: 'pruebaAccion'
            },
            ]
        }
    },
    methods: {

      
    }
}
</script>
