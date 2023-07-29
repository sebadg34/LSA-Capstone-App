<template>
<div>

    <ModalObservaciones :detalles-data="this.observacionesData" />
    <ModalDetalleMuestra :detalles-data="this.detallesData" />
    <modalOrdenCompraMuestra :muestra-data="this.muestraData"/>
    <!-- Inicio tabla -->

    <b-row align-h="start" style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de muestras
            </div>
        </b-col>
    </b-row>

    <b-row class="justify-content-center">

        <b-col class="col-10">

            <b-row style="padding-top:30px; padding-bottom:10px">
                <b-col class="col-5">

                </b-col>
                <b-col class="col-7">
                    <b-row align-h="end">
                        <b-col class="col-12">
                            <b-form-group>

                                <b-input-group>
                                    <b-input-group-prepend is-text>
                                        <b-icon icon="search"></b-icon>
                                    </b-input-group-prepend>
                                    <b-form-input placeholder="RUM de muestra..." id="rum-filtro" v-model="rumFiltro">
                                    </b-form-input>
                                    <b-form-select placeholder="Prioridad" v-model="prioridadFiltro" id="prioridad-filtro" :options="prioridadOpciones" />
                                    <b-form-select placeholder="Estado" v-model="estadoFiltro" id="estado-filtro" :options="estadosOpciones" />

                                    <b-button-group style="margin-left:10px; margin-right:20px">
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
            <b-table show-empty  :busy="loading" :items="muestrasFiltradas" :fields="fields" :per-page="perPage" :current-page="currentPage">

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <div style=" color:gray"> No hay muestras registradas para mostrar.</div>
                        </div>

                    </div>
                </template>
                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>

                <template #cell(solicitante)="row">

                    <span>{{row.item.solicitante[0].nombre + " " + row.item.solicitante[0].primer_apellido}}</span>
                </template>
                <template #cell(matriz)="row">

                    <span>{{row.item.matriz.nombre_matriz}}</span>
                </template>

                <template #cell(prioridad)="row">

                    <span v-if="row.item.prioridad == 'Normal'" style="text-transform:uppercase; color:green; font-weight: bold;">Normal</span>
                    <span v-if="row.item.prioridad == 'Alta'" style="text-transform:uppercase; color:red; font-weight: bold;">Alta</span>
                    <span v-if="row.item.prioridad == 'Urgente'" style="text-transform:uppercase; color:rebeccapurple; font-weight: bold;">Urgente</span>
                </template>

                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>
                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
                        </template>

                        <b-dropdown-item @click="abrirDetallesMuestra(row.item)">
                            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

                        </b-dropdown-item>
                        <b-dropdown-item @click="MostrarObservaciones(row.item)">
                            <b-icon icon="check2-square" aria-hidden="true" class="mr-2"></b-icon>Observaciones
                        </b-dropdown-item>
                        <b-dropdown-item  @click="abrirAgregarOrdenCompra(row.item)">
                            <b-icon icon="file-earmark-arrow-down" aria-hidden="true" class="mr-2"></b-icon>Administrar orden de compra
                        </b-dropdown-item>

                    </b-dropdown>
                </template>

                <template #custom-foot>
                    <b-tr>
                        <b-th colspan="9" style="background-color:rgb(235, 235, 235); border-radius:0px 0px 20px 20px; padding:1px" v-if="filtrando">
                            <div>
                                <b-icon icon="filter" animation="fade" variant="secondary" scale="0.8"></b-icon>
                                <div style="font-weight:bold; color:gray"> Resultados filtrados</div>
                            </div>
                        </b-th>
                    </b-tr>
                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="right"></b-pagination>

        </b-col>

    </b-row>

</div>
</template>

<script>

import ModalObservaciones from '@/components/admMuestras-finanzas/modal_observacionesMuestra-finanzas.vue';
import MuestraFinanzasService from '@/helpers/api-services/Muestra-finanzas.service';
import ModalDetalleMuestra from '@/components/admMuestras-finanzas/modal_detallesMuestra-finanzas.vue';
import modalOrdenCompraMuestra from '@/components/admMuestras-finanzas/modal_ordenCompraMuestra-finanzas.vue';
import moment from 'moment';
export default {
    data() {
        return {

            RUM: '',
            obtenerObservaciones: this.obtenerObservaciones,
            modalData: {},
            observaciones: '',
            currentPage: 1,
            perPage: 10,
            prioridadFiltro: null,
            estadoFiltro: null,
            rumFiltro: "",
            filtrando: false,
            loading: false,
            muestrasFiltradas: [],
            muestras: [],
            opcionesEstado: [{
                    text: 'Recepcionado',
                    value: 'Recepcionado'
                },
                {
                    text: 'En análisis',
                    value: 'En análisis'
                },
                {
                    text: 'Finalizado',
                    value: 'Finalizado'
                },
            ],
            fields: [{
                    key: 'RUM',
                    label: 'RUM'
                },

                {
                    key: 'solicitante',
                    label: 'Nombre del solicitante'
                },
                {
                    key: 'nombre_empresa',
                    label: 'Empresa'
                },
                {
                    key: 'fecha_entrega',
                    label: 'Fecha de entrega'
                },
                {
                    key: 'matriz',
                    label: 'Matriz'
                },
                {
                    key: 'estado',
                    label: 'Estado'
                },
                {
                    key: 'valor_neto',
                    label: 'Valor neto'
                },
                {
                    key: 'prioridad',
                    label: 'Prioridad'
                },
                {
                    key: 'accion',
                    label: 'Acción'
                }
            ],
            prioridades: ['Normal', 'Alta', 'Urgente'],
            estadosOpciones: [{
                    value: null,
                    text: 'Seleccione un estado:',
                    disabled: true
                },
                {
                    value: 'Recepcionado',
                    text: 'Recepcionado'
                },
                {
                    value: 'En Análisis',
                    text: 'En Análisis'
                },
                {
                    value: 'Finalizado',
                    text: 'Finalizado'
                },
                {
                    value: null,
                    text: '---'
                }
            ],
            prioridadOpciones: [{
                    value: null,
                    text: 'Seleccione una prioridad:',
                    disabled: true
                },
                {
                    value: 'Normal',
                    text: 'Normal'
                },
                {
                    value: 'Alta',
                    text: 'Alta'
                },
                {
                    value: 'Urgente',
                    text: 'Urgente'
                },
                {
                    value: null,
                    text: '---'
                }
            ],
            prioridad: '',
            detallesData: {},
            observacionesData: {},
            muestraData: {}
        }
    },
    computed: {
        rows() {
            return this.muestrasFiltradas.length
        }
    },

    components: {
        ModalObservaciones,
        ModalDetalleMuestra,
        modalOrdenCompraMuestra
    },
    methods: {
        borrarFiltro() {
            this.estadoFiltro = null;
            this.prioridadFiltro = null;

            this.rumFiltro = "";
            this.filtrarTabla();
        },
        filtrarTabla() {

            let estado_filtro = this.estadoFiltro;
            let prioridad_filtro = this.prioridadFiltro;
            this.muestrasFiltradas = this.muestras;
            if (estado_filtro != null) {
                this.muestrasFiltradas = this.muestrasFiltradas.filter(muestra => muestra.estado == estado_filtro);
            }
            if (prioridad_filtro != null) {
                this.muestrasFiltradas = this.muestrasFiltradas.filter(muestra => muestra.prioridad.toLowerCase().includes(prioridad_filtro.toLowerCase()));
            }
            if (this.rumFiltro) {
                this.muestrasFiltradas = this.muestrasFiltradas.filter(muestra => muestra.RUM == this.rumFiltro);
            }

            if (this.rumFiltro == "" && estado_filtro == null && prioridad_filtro == null) {
                this.muestrasFiltradas = this.muestras;
                this.filtrando = false;
                return;
            } else {
                this.filtrando = true;
            }
        },
        obtenerMuestras() {
            this.loading = true;
            console.log("Obteniendo Muestras: ")
            MuestraFinanzasService.obtenerMuestras().then((response) => {
                if (response.data != null && response.status === 200) {
                    this.muestras = response.data
                    for (var i = 0; i < this.muestras.length; i++) {
                        this.muestras[i].fecha_entrega = moment(this.muestras[i].fecha_entrega).format('DD/MM/YYYY');

                    }
                    this.muestrasFiltradas = this.muestras;
                    this.loading = false;
                }
            })
        },

        generarOpcionesEstado(estado) {
            switch (estado) {
                case 'Recepcionado':
                    return [{
                            text: 'Detalles de la muestra',
                            value: 'Detalle Muestra'
                        },
                        {
                            text: 'Observaciones',
                            value: 'Observaciones'
                        },
                        {
                            text: 'Descargar informe',
                            value: 'Descargar Informe'
                        },
                    ];
                case 'En Análisis':
                    return [{
                            text: 'Detalles de la muestra',
                            value: 'Detalle Muestra'
                        },
                        {
                            text: 'Observaciones',
                            value: 'Observaciones'
                        },
                        {
                            text: 'Descargar informe',
                            value: 'Descargar Informe'
                        },
                    ];
                case 'Finalizado':
                    return [{
                            text: 'Detalles de la muestra',
                            value: 'Detalle Muestra'
                        },
                        {
                            text: 'Observaciones',
                            value: 'observaciones'
                        },
                        {
                            text: 'Descargar informe',
                            value: 'Descargar Informe'
                        },
                    ];
                default:
                    return [{
                            text: 'Seleccionar opción:',
                            value: ''
                        } // Opción en blanco
                    ];
            }
        },

        onModalCerrado() {
            this.showModal = false
        },

        MostrarObservaciones(data) {
            console.log(data)
            this.observacionesData = data;
            this.$bvModal.show('modal-observaciones-muestra-finanzas');
        },

        abrirDetallesMuestra(data) {
            console.log(data)
            this.detallesData = data;
            this.$bvModal.show('modal-detalle-muestra-finanzas');
        },
        abrirAgregarOrdenCompra(data) {
            console.log(data)
            this.muestraData = data;
            this.$bvModal.show('modal-orden-compra-finanzas');
        },

    },
    mounted() {
        this.obtenerMuestras();
    }
}
</script>
