<template>
<div>

    <ModalObservaciones :muestra-data="this.modalData" @modal-cerrado="onModalCerrado"></ModalObservaciones>
    <ModalDetalleMuestra :detalles-data="this.detallesData" />
    <modal_analistaDesignado />
    <modal_rehacerAnalisis />
    <!-- Inicio tabla -->

    <b-row align-h="start" style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de Muestras
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
                                    <b-form-select placeholder="Estado" v-model="estadoFiltro" id="estado-filtro" :options="estadosOpciones" />
                                    <b-form-select placeholder="Prioridad" v-model="prioridadFiltro" id="prioridad-filtro" :options="prioridadOpciones" />

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
            <b-table fixed :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage">

                <template #cell(prioridad)="row">

                    <span v-if="row.item.prioridad == 'Normal'" style="text-transform:uppercase; color:green; font-weight: bold;">Normal</span>
                    <span v-if="row.item.prioridad == 'Alta'" style="text-transform:uppercase; color:red; font-weight: bold;">Alta</span>
                    <span v-if="row.item.prioridad == 'Urgente'" style="text-transform:uppercase; color:rebeccapurple; font-weight: bold;">Urgente</span>
                </template>

                <template #cell(Acción)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>
                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
                        </template>

                        <b-dropdown-item v-for="opcion in generarOpcionesEstado(row.item.estado)" :key="opcion.value">

                            <b-dropdown-item @click="DetalleMuestra(row)" v-if="opcion.text === 'Detalle muestra'" :key="opcion.value">
                                <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver Detalles
                            </b-dropdown-item>

                            <b-dropdown-item @click="MostrarObservaciones(row)" v-if="opcion.text === 'Observaciones'" :key="opcion.value">
                                <b-icon icon="menu-down" aria-hidden="true" class="mr-2"></b-icon>Observaciones
                            </b-dropdown-item>

                            <b-dropdown-item @click="IngresarMuestraLab(row)" v-if="opcion.text === 'Ingresar muestra a lab.'" :key="opcion.value">
                                <b-icon icon="capslock-fill" aria-hidden="true" class="mr-2"></b-icon>Ingresar Muestra a Laboratorio
                            </b-dropdown-item>

                            <b-dropdown-item @click="Analista(row)" v-if="opcion.text === 'Analista Designado'" :key="opcion.value">
                                <b-icon icon="file-earmark-person-fill" aria-hidden="true" class="mr-2"></b-icon>Analista Designado
                            </b-dropdown-item>

                            <b-dropdown-item @click="Descargar(row)" v-if="opcion.text === 'Descargar Informe'" :key="opcion.value">
                                <b-icon icon="file-earmark-pdf-fill" aria-hidden="true" class="mr-2"></b-icon>Descargar Informe
                            </b-dropdown-item>

                            <b-dropdown-item @click="Ingresar(row)" v-if="opcion.text === 'Ingresar resultados de análisis'" :key="opcion.value">
                                <b-icon icon="file-earmark-font" aria-hidden="true" class="mr-2"></b-icon>Ingresar Resultados de
                                Análisis
                            </b-dropdown-item>

                            <b-dropdown-item @click="AdministrarCartas(row)" v-if="opcion.text === 'Administrar cartas de control'" :key="opcion.value">
                                <b-icon icon="markdown" aria-hidden="true" class="mr-2"></b-icon> Administrar Cartas de Control
                            </b-dropdown-item>

                            <b-dropdown-item @click="RehacerAnalisis(row)" v-if="opcion.text === 'Rehacer Análisis'" :key="opcion.value">
                                <b-icon icon="journal-minus" aria-hidden="true" class="mr-2"></b-icon> Rehacer Análisis
                            </b-dropdown-item>

                            <b-dropdown-item @click="MarcarAnalisis(row)" v-if="opcion.text === 'Marcar Analisis como completado'" :key="opcion.value">
                                <b-icon icon="clipboard-check" aria-hidden="true" class="mr-2"></b-icon> Marcar Análisis como Completado
                            </b-dropdown-item>

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
import ModalObservaciones from '../ModalObservaciones.vue'
import MuestraService from '@/helpers/api-services/Muestra.Service';
import ModalDetalleMuestra from '@/components/admMuestras/modal_detallesMuestra.vue';
import modal_analistaDesignado from '@/components/admMuestras/modal_analistaDesignado.vue';
import modal_rehacerAnalisis from '@/components/admMuestras/modal_rehacerAnalisis.vue';

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
            items: [],
            opcionesEstado: [

                {
                    text: 'Recepcionado',
                    value: 'Recepcionado'
                },
                {
                    text: 'En Análisis',
                    value: 'En Análisis'
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
                    key: '',
                    label: 'Nombre solicitante'
                },
                {
                    key: '',
                    label: 'Empresa'
                },
                {
                    key: '',
                    label: 'Fecha entrega'
                },
                {
                    key: '',
                    label: 'matriz'
                },
                {
                    key: '',
                    label: 'Estado'
                },
                {
                    key: '',
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
            estadosOpciones: [
              {
                    value: null,
                    text: 'Seleccione un estado',
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
            prioridadOpciones: [
              {
                value: null,
                text: 'Seleccione una prioridad',
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
            }],
            prioridad: '',
            detallesData: {}
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    },

    components: {
        ModalObservaciones,
        ModalDetalleMuestra,
        modal_analistaDesignado,
        modal_rehacerAnalisis
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
            } else {
                this.filtrando = true;
            }

            this.onFiltered(this.personalFiltrado);
        },
        obtenerMuestras() {
            console.log("Obteniendo Muestras: ")
            MuestraService.obtenerMuestras().then((response) => {
                if (response.data != null && response.status === 200) {
                    this.items = response.data
                }
            })
        },

        generarOpcionesEstado(estado) {
            switch (estado) {
                case 'Recepcionado':
                    return [{
                            text: 'Detalle muestra',
                            value: 'Detalle Muestra'
                        },
                        {
                            text: 'Observaciones',
                            value: 'Observaciones'
                        },
                        {
                            text: 'Descargar Informe',
                            value: 'Descargar Informe'
                        },
                    ];
                case 'En Análisis':
                    return [{
                            text: 'Detalle muestra',
                            value: 'Detalle Muestra'
                        },
                        {
                            text: 'Observaciones',
                            value: 'Observaciones'
                        },
                        {
                            text: 'Descargar Informe',
                            value: 'Descargar Informe'
                        },
                    ];
                case 'Finalizado':
                    return [{
                            text: 'Detalle muestra',
                            value: 'Detalle Muestra'
                        },
                        {
                            text: 'Observaciones',
                            value: 'observaciones'
                        },
                        {
                            text: 'Descargar Informe',
                            value: 'Descargar Informe'
                        },
                    ];
                default:
                    return [{
                            text: 'Seleccionar opción',
                            value: ''
                        } // Opción en blanco
                    ];
            }
        },

        onModalCerrado() {
            this.showModal = false
        },

        MostrarObservaciones(row) {
            this.RUM = row.item.RUM;
            MuestraService.obtenerObservaciones(this.RUM).then((response) => {
                console.log(response);
                if (response.data != null) {
                    console.log(response.data);
                    this.modalData = response.data[0]
                    this.$bvModal.show('modal-observaciones');
                }
            });
        },

        MostrarFonos(row) {
            this.RUM = row.item.RUM;
            MuestraService.obtenerFonos(this.RUM).then((response) => {
                console.log(response)
            })
        },

        IngresarMuestraLab(row) {
            this.RUM = row.item.RUM;
            console.log('el rum es: ' + this.RUM)
            this.$router.push(`/IngMuesLab?RUM=${this.RUM}`);

        },

        MarcarAnalisis(row) {
            this.RUM = row.item.RUM;
            console.log('El Rum es: ' + this.RUM)
            MuestraService.completarMuestra(this.RUM)

        },

        RehacerAnalisis(row) {
            this.RUM = row.item.RUM;
            console.log('El Rum es: ' + this.RUM)
            this.$bvModal.show('modal-rehacer-analisis');
        },

        DetalleMuestra(row) {
            this.RUM = row.item.RUM;
            console.log('El Rum es: ' + this.RUM)
            MuestraService.obtenerDatosMuestra(this.RUM).then((response) => {
                console.log(response);
                if (response.data != null) {
                    console.log(response.data);
                    this.detallesData = response.data
                    this.$bvModal.show('modal-detalle-muestra');
                }
            });
        },

        Analista(row) {
            this.RUM = row.item.RUM;
            console.log('El Rum es: ' + this.RUM)
            this.$bvModal.show('modal-analista-designado');
        },

        Descargar() {
            // Aquí pones la lógica para mostrar los detalles de la muestra seleccionada
            window.location.href = "https://www.youtube.com";
        },

        Ingresar() {
            // Aquí pones la lógica para mostrar los detalles de la muestra seleccionada
            window.location.href = "https://www.youtube.com";
        },
        AdministrarCartas() {
            window.location.href = "https://www.youtube.com";
        },

    },
    mounted() {
        this.obtenerMuestras();
    }
}
</script>
