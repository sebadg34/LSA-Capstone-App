<template>
<div style="margin-bottom:50px">

    <modal_agregarSolicitante @refrescar="obtenerSolicitante" />
    <modal_detallesSolicitante :user-data="this.modalDetallesData" />
    <modal_editarSolicitante @refrescar="obtenerSolicitante" :solicitante-data="this.modalEditarData" />
    <modal_agregarCotizacion @refrescar="obtenerSolicitante" :user-data="this.modalCotizacionData" />
    <modal_listadoCotizaciones :user-data="this.modalCotizacionData" />
    <modal_estadoSolicitante @refrescar="obtenerSolicitante" :user-data="this.modalEstadoData" />
    <b-row align-h="start" style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Sistema administración de solicitantes
            </div>
        </b-col>
    </b-row>

    <b-row class="justify-content-center">

        <b-col class="col-10">
            <b-row style="padding-top:30px; padding-bottom:10px">
                <b-col class="col-6">

                    <b-col class="col-6">

                        <b-row>
                            <b-button v-b-modal.modal-solicitante style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                                Agregar Solicitante
                                <b-icon icon="person-plus-fill"></b-icon>
                            </b-button>
                        </b-row>

                    </b-col>

                </b-col>
                <b-col class="col-6">
                    <b-row align-h="end">

                        <b-form-group>

                            <b-input-group>
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input placeholder="Nombre solicitante..." id="input-filtro-nombre" v-model="nombreFiltro">
                                </b-form-input>
                                <b-form-input placeholder="Rut" id="input-filtro-rut" v-model="rutFiltro" trim></b-form-input>
                                <b-form-input placeholder="Nombre empresa..." id="input-filtro-empresa" v-model="empresaFiltro" trim></b-form-input>

                                <b-button-group style="margin-left:10px; margin-right:20px">
                                    <b-button class="reactive-button lsa-blue" @click="filtrarTabla">Filtrar</b-button>
                                    <b-button class="reactive-button lsa-orange" @click="borrarFiltro">Quitar</b-button>
                                </b-button-group>
                            </b-input-group>

                        </b-form-group>

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
            <b-table show-empty :filter="filter" @filtered="onFiltered" :fields="campos_tabla" :items="solicitanteFiltrado" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">

                <template #cell(estado)="row">
                    <span v-if="row.item.estado == true" style="text-transform:uppercase; color:green; font-weight: bold;">HABILITADO</span>
                    <span v-else style="text-transform:uppercase; color:red; font-weight: bold;">DESHABILITADO</span>
                </template>

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <div style=" color:gray"> No hay solicitante registrado para mostrar</div>
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

                <template #cell(apellidos)="row">

                    <span>{{ row.item.primer_apellido + " " + row.item.segundo_apellido }}</span>

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
                        <b-dropdown-item @click="abrirDetallesSolicitante(row.item)">
                            <b-icon icon="file-richtext" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEditarSolicitante(row.item)">
                            <b-icon icon="pencil" aria-hidden="true" class="mr-2"></b-icon>Editar
                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEstadoSolicitante(row.item)">
                            <b-icon icon="person-check" aria-hidden="true" class="mr-2"></b-icon>Cambiar estado
                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirAgregarCotizacion(row.item)">
                            <b-icon icon="file-earmark-plus" aria-hidden="true" class="mr-2"></b-icon>Agregar cotización
                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirListadoCotizaciones(row.item)">
                            <b-icon icon="card-heading" aria-hidden="true" class="mr-2"></b-icon>Ver cotizaciones
                        </b-dropdown-item>

                    </b-dropdown>

                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"></b-pagination>
        </b-col>
    </b-row>

</div>
</template>

<script>
// @ is an alias to /src
import modal_agregarSolicitante from '@/components/admSolicitante/modal_agregarSolicitante.vue'
import modal_editarSolicitante from '@/components/admSolicitante/modal_editarSolicitante.vue'
import modal_detallesSolicitante from '@/components/admSolicitante/modal_detallesSolicitante.vue'
import modal_agregarCotizacion from '@/components/admSolicitante/modal_agregarCotizacion.vue'
import modal_listadoCotizaciones from '@/components/admSolicitante/modal_listadoCotizaciones.vue'
import modal_estadoSolicitante from '@/components/admSolicitante/modal_estadoSolicitante.vue'
import solicitanteService from "@/helpers/api-services/Solicitante.service"
import empresaservice from "@/helpers/api-services/Empresa.service"
export default {
    name: 'admEmpresa',
    components: {
        modal_agregarSolicitante,
        modal_editarSolicitante,
        modal_detallesSolicitante,
        modal_agregarCotizacion,
        modal_listadoCotizaciones,
        modal_estadoSolicitante
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
            empresas: [],
            ciudades: [],
            filter: null,
            filterOn: [],
            nombreFiltro: "",
            empresaFiltro: "",
            totalRows: "",
            rutFiltro: "",
            filtrando: false,
            editarID: 0,
            currentPage: 3,
            perPage: 10,
            loading: false,
            modalEditarData: {},
            modalDetallesData: {},
            modalEstadoData: {},
            modalCotizacionData: {},
            campos_tabla: [{
                    key: 'nombre_empresa',
                    label: 'Empresa',
                sortable: true
                }, {
                    key: 'nombre_ciudad',
                    label: 'Ciudad empresa',
                sortable: true
                }, {
                    key: 'rut_solicitante',
                    label: 'Rut'
                }, {
                    key: 'nombre',
                    label: 'Nombre',
                sortable: true
                }, {
                    key: 'apellidos',
                    label: 'Apellidos'
                }, {
                    key: 'correo',
                    label: 'Correo electrónico'
                },
                {
                    key: 'telefono',
                    label: 'Teléfono móvil'
                },

                {
                    key: 'tipo_cliente',
                    label: 'Tipo cliente',
                sortable: true
                }, {
                    key: 'estado',
                    label: 'Estado',
                sortable: true
                },
                {
                    key: 'accion',
                    label: 'Acción'
                }
            ],
            solicitante: [{}],
            solicitanteFiltrado: [],
        }
    },
    methods: {
        borrarFiltro() {
            this.nombreFiltro = "";
            this.rutFiltro = "";
            this.empresaFiltro = "";
            this.filtrarTabla();
        },
        filtrarTabla() {
            let nombre_filtro = this.nombreFiltro.toLowerCase();
            let rut_filtro = this.rutFiltro;
            let empresa_filtro = this.empresaFiltro.toLowerCase();
            this.solicitanteFiltrado = this.solicitante;

            if (nombre_filtro != "") {
                this.solicitanteFiltrado = this.solicitanteFiltrado.filter(solicitante => solicitante.nombre.toLowerCase().includes(nombre_filtro));
            }
            if (empresa_filtro != "") {
               
                this.solicitanteFiltrado = this.solicitanteFiltrado.filter(solicitante => solicitante.nombre_empresa.toLowerCase().includes(empresa_filtro));
            }
            if (rut_filtro != "") {
                this.solicitanteFiltrado = this.solicitanteFiltrado.filter(solicitante => solicitante.rut_solicitante.toLowerCase().includes(rut_filtro));
            }

            if (nombre_filtro == "" && empresa_filtro == "" && rut_filtro == "") {
                this.solicitanteFiltrado = this.solicitante;
                this.filtrando = false;
            } else {
                this.filtrando = true;
            }

            this.onFiltered(this.solicitanteFiltrado);
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        abrirEstadoSolicitante(data) {
            console.log(data)
            this.modalEstadoData = data;
            this.$bvModal.show('modal-estado-solicitante')
        },
        abrirEditarSolicitante(data) {
            console.log(data)
            this.modalEditarData = data;
            this.$bvModal.show('modal-editar-solicitante')
        },
        abrirDetallesSolicitante(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalles-solicitante')
        },
        abrirAgregarCotizacion(data) {
            console.log(data)
            this.modalCotizacionData = data;
            this.$bvModal.show('modal-cotizacion-solicitante')
        },
        abrirListadoCotizaciones(data) {
            console.log(data)
            this.modalCotizacionData = data;
            this.$bvModal.show('modal-cotizaciones-solicitante')
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
                    this.solicitanteFiltrado = this.solicitante;
                    this.loading = false;
                   // this.obtenerEmpresa();

                }

            })

        },
        obtenerCiudad() {
            empresaservice.obtenerTodasCiudad().then((resp) => {
                if (resp.data != null) {
                    console.log(resp.data)
                    this.ciudades = resp.data;

                    for (var i = 0; i < this.solicitante.length; i++) {
                        //  this.Ciudad_empresa = response.data.ciudades.find(obj => obj.id_ciudad == this.Id_ciudad).nombre_ciudad

                        var Empresa = this.empresas.find(obj => obj.rut_empresa == this.solicitante[i].rut_empresa);
                        var Ciudad = this.ciudades.find(obj => obj.id_ciudad == this.solicitante[i].id_ciudad);
                        this.solicitante[i].nombre_empresa = Empresa.nombre_empresa;
                        this.solicitante[i].nombre_ciudad = Ciudad.nombre_ciudad;
                    }

                    this.solicitanteFiltrado = this.solicitante;
                    this.onFiltered(this.solicitanteFiltrado);
                    this.loading = false;
                }
            })
        },
        obtenerEmpresa() {
            empresaservice.obtenerTodasEmpresa().then((response => {
                if (response.data != null) {
                    console.log(response.data)

                    this.empresas = response.data;

                    this.obtenerCiudad();
                    console.log(this.empresas)

                }
            }))

        }

    }
}
</script>
