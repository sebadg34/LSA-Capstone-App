<template>
<div style="margin-bottom:50px">

    <modal_agregarPersonal @refrescar="obtenerPersonal" />
    <modal_detallesPersonal :user-data="this.modalDetallesData" />
    <modal_editarPersonal @refrescar="obtenerPersonal" :user-data="this.modalEditarData" />
    <modal_estadoPersonal @refrescar="obtenerPersonal" :user-data="this.modalEstadoData" />

    <b-row align-h="start" style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Sistema de administración de personal
            </div>
        </b-col>
    </b-row>

    <b-row class="justify-content-center">

        <b-col class="col-10">
            <b-row style="padding-top:30px; padding-bottom:10px">
                <b-col class="col-4">

                    <b-col class="col-6">
                        <b-row>
                            <b-button v-b-modal.modal-personal style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">

                                Agregar personal
                                <b-icon icon="person-plus-fill"></b-icon>
                            </b-button>
                        </b-row>
                    </b-col>

                </b-col>
                <b-col class="col-8">
                    <b-row>
                        <b-col class="col-12">
                        <b-form-group>
                        
                            <b-input-group>
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input placeholder="Nombre del usuario..." id="nombre-filtro" v-model="nombreFiltro">
                                </b-form-input>
                                <b-form-input placeholder="RUT del usuario..." id="rut-filtro" v-model="rutFiltro" trim></b-form-input>
                                <b-form-select placeholder="Cargo" v-model="cargoFiltro" id="cargo-filtro" :options="cargoOpciones">
                                </b-form-select>
                                <b-button-group style="margin-left:10px">
                                    <b-button class="reactive-button lsa-blue" @click="filtrarTabla">Filtrar</b-button>
                                    <b-button class="reactive-button lsa-orange" @click="borrarFiltro">Quitar</b-button>
                                </b-button-group>
                            </b-input-group>

                        </b-form-group>
                    </b-col>
                    </b-row>
                </b-col>
                <!--
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
-->
            </b-row>
        </b-col>

        <b-col class="col-10">
            <b-table :filter-included-fields="filterOn" fixed show-empty :filter="filter" @filtered="onFiltered" :fields="campos_tabla" :items="personalFiltrado" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">

                            <div style=" color:gray"> No hay personal registrado para mostrar.</div>
                        </div>

                    </div>
                </template>

                <template #emptyfiltered>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <b-icon icon="search" animation="fade" variant="secondary"></b-icon>
                            <div style="font-weight:bold; color:gray"> No hay resultados que coincidan con su búsqueda.
                            </div>
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


                <template #custom-foot>
                    <b-tr>
                        <b-th colspan="7" style="background-color:rgb(235, 235, 235); border-radius:0px 0px 20px 20px; padding:1px" v-if="filtrando">
                            <div>
                            <b-icon icon="filter" animation="fade" variant="secondary" scale="0.8"></b-icon>
                            <div style="font-weight:bold; color:gray">  Resultados filtrados</div>
                        </div>
                        </b-th>
                    </b-tr>
                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"></b-pagination>
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
            totalRows: "",
            filterOn: [],
            nombreFiltro: "",
            rutFiltro: "",
            filtrando: false,
            cargoFiltro: null,
            cargoOpciones: [{
                    value: null,
                    text: 'Seleccione un cargo',
                    disabled: true
                },
                {
                    value: null,
                    text: '---'
                },
                {
                    value: "gerente",
                    text: 'Gerente'
                },
                {
                    value: "Analista Químico",
                    text: 'Analista Químico'
                },{
                    value: "Químico",
                    text: 'Químico'
                },{
                    value: "Supervisor(a)",
                    text: 'Supervisor(a)'
                },{
                    value: "Administrador(a) de Finanza",
                    text: 'Administrador(a) de Finanza'
                },{
                    value: "Jefe(a) de laboratorio",
                    text: 'Jefe(a) de laboratorio'
                },{
                    value: "Recepcionista",
                    text: 'Recepcionista'
                },
            ],
            editarID: 0,
            currentPage: 1,
            perPage: 10,
            loading: true,
            modalEditarData: {},
            modalDetallesData: {},
            modalEstadoData: {},
            campos_tabla: [{
                key: 'rut_empleado',
                label: 'RUT'
            }, {
                key: 'nombre',
                label: 'Nombre',
                sortable: true
            }, {
                key: 'apellido',
                label: 'Apellido',
                sortable: true
            }, {
                key: 'correo',
                label: 'Correo',
                sortable: true
            }, {
                key: 'rol',
                label: 'Cargo',
                sortable: true
            }, {
                key: 'estado',
                label: 'Estado',
                sortable: true
            }, {
                key: 'accion',
                label: 'Acción'
            }],
            personal: [{}],
            personalFiltrado: [],
        }
    },
    methods: {

        borrarFiltro() {
            this.nombreFiltro = "";
            this.rutFiltro = "";
            this.cargoFiltro = null;
            this.filtrarTabla();
        },
        filtrarTabla() {
            let nombre_filtro = this.nombreFiltro.toLowerCase();
            let rut_filtro = this.rutFiltro;
            let cargo_filtro = this.cargoFiltro;
            //let cargo_filtro = this.cargoFiltro;
            this.personalFiltrado = this.personal;
            if (this.cargoFiltro != null) {
                this.personalFiltrado = this.personalFiltrado.filter(personal => personal.rol.toLowerCase().includes(cargo_filtro.toLowerCase()));
            }
            if (nombre_filtro != "" && rut_filtro != "") {
                this.personalFiltrado = this.personal.filter(personal => personal.nombre.toLowerCase().includes(nombre_filtro) &&
                    personal.rut_empleado.includes(rut_filtro));
            } else if (nombre_filtro != "") {
                this.personalFiltrado = this.personal.filter(personal => personal.nombre.toLowerCase().includes(nombre_filtro));
            } else if (rut_filtro != "") {
                this.personalFiltrado = this.personal.filter(personal => personal.rut_empleado.toLowerCase().includes(rut_filtro));
            }


            if (nombre_filtro == "" && rut_filtro == "" && cargo_filtro == null) {
                this.personalFiltrado = this.personal;
                this.filtrando = false;
            }else{
                this.filtrando = true;
            }

            this.onFiltered(this.personalFiltrado);
        },
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
                    this.personalFiltrado = this.personal
                    console.log(this.personal)
                    this.onFiltered(this.personalFiltrado);
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
