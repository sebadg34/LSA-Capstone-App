<template>
<div style="margin-bottom:50px">

    <modal_editarFechas :user-data="this.modalFechasData" @refrescar="obtenerPersonal" />
    <modal_detallesPersonal :user-data="this.modalDetallesData" />
    <modal_editarDiasDisponibles :user-data="this.modalDiasDisponiblesData" />

    <b-row align-h="start" style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Sistema de disponibilidad de personal
            </div>
        </b-col>
    </b-row>

    <b-row class="justify-content-center">

        <b-col class="col-10">
            <b-row style="padding-top:30px; padding-bottom:10px">
                <b-col class="col-6">

                   

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
            <b-table  show-empty :filter="filter" @filtered="onFiltered" :fields="campos_tabla" :items="personal" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">

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
                <template #cell(dias_vacaciones_disponibles)="row">
                    <span v-if="!row.item.dias_vacaciones_disponibles">0</span>
                    <span v-else>{{ row.item.dias_vacaciones_disponibles }}</span>
                </template>
                <template #cell(periodo_vacaciones)="row">
                    <span v-if="!row.item.fecha_inicio_vacaciones || !row.item.fecha_termino_vacaciones">
                    -</span>
                    <span v-else>{{ row.item.fecha_inicio_vacaciones + " " + row.item.fecha_termino_vacaciones }}</span>
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
                        <b-dropdown-item @click="abrirEditarFechas(row.item)">
                            <b-icon icon="pencil" aria-hidden="true" class="mr-2"></b-icon>Modifcar fechas
                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEditarDiasDisponibles(row.item)">
                            <b-icon icon="person-check" aria-hidden="true" class="mr-2"></b-icon>Modificar días disponibles
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
import modal_editarFechas from '@/components/admDisponibilidad/modal_editarFechas.vue'
import modal_editarDiasDisponibles from '@/components/admDisponibilidad/modal_editarDiasDisponibles.vue'

import modal_detallesPersonal from '@/components/admPersonal/modal_detallesPersonal.vue'
import personalService from "@/helpers/api-services/Personal.service"

export default {
    name: 'admPersonal',
    components: {
        modal_editarFechas,
        modal_detallesPersonal,
        modal_editarDiasDisponibles
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
            modalDiasDisponiblesData: {},
            modalDetallesData: {},
            modalFechasData: {},
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
                    key: 'dias_vacaciones_disponibles',
                    label: 'Días de vacaciones disponible'
                }, {
                    key: 'periodo_vacaciones',
                    label: 'Periodo de vacaciones'
                }, {
                    key: 'rol',
                    label: 'Cargo'
                },
                {
                    key: 'estado',
                    label: 'Estado'
                }, {
                    key: 'accion',
                    label: 'Acción'
                }
            ],
            personal: [{}],
        }
    },
    methods: {
        // TODO: Cambiar idioma de funciones a español
        onFiltered(filteredItems) {
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
        abrirEditarFechas(data) {
            console.log(data)
            this.modalFechasData = data;
            this.$bvModal.show('modal-editar-fechas')
        },
        abrirDetallesPersonal(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalles-personal')
        },
        abrirEditarDiasDisponibles(data) {
            console.log(data)
            this.modalDiasDisponiblesData = data;
            this.$bvModal.show('modal-editar-dias-disponibles')
        }

    }
}
</script>
