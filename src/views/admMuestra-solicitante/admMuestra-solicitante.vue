<template>
<div>

    <ModalDetalleMuestra :detalles-data="this.detallesData" />
    <modal_encuestaSolicitante :encuesta-data="this.modalEncuestaData"/>
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
                <b-col class="col-7">

                </b-col>
                <b-col class="col-5">
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
            <b-table show-empty :busy="loading" fixed :items="muestrasFiltradas" :fields="fields" :per-page="perPage" :current-page="currentPage">

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <div style=" color:gray"> No hay muestras registradas para mostrar</div>
                        </div>

                    </div>
                </template>
                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>

                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>
                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
                        </template>

                        <b-dropdown-item @click="abrirDetallesMuestra(row.item)">
                            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEditarPersonal(row.item)">
                            <b-icon icon="file-earmark-arrow-down" aria-hidden="true" class="mr-2"></b-icon>Descargar informe
                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEncuestaMuestra(row.item)">
                            <b-icon icon="check2-square" aria-hidden="true" class="mr-2"></b-icon>Responder encuesta
                        </b-dropdown-item>
                    </b-dropdown>
                </template>

                <template #custom-foot>
                    <b-tr>
                        <b-th colspan="7" style="background-color:rgb(235, 235, 235); border-radius:0px 0px 20px 20px; padding:1px" v-if="filtrando">
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
import MuestraService from '@/helpers/api-services/Muestra-solicitante.service';
import ModalDetalleMuestra from '@/components/admMuestras-solicitante/modal_detallesMuestra-solicitante.vue';

import modal_encuestaSolicitante from '@/components/admMuestras-solicitante/modal_encuestaSolicitante.vue'
export default {
    data() {
        return {

            RUM: '',
            obtenerObservaciones: this.obtenerObservaciones,
            modalData: {},
            detallesData: {},
            modalEncuestaData: {},
            observaciones: '',
            currentPage: 1,
            perPage: 10,
            estadoFiltro: null,
            rumFiltro: "",
            filtrando: false,
            loading:false,
            
            muestrasFiltradas: [],
            muestras: [],
            fields: [{
                    key: 'RUM',
                    label: 'RUM'
                },
                {
                    key: 'nombre_matriz',
                    label: 'Matriz'
                },

                {
                    key: 'fecha_entrega',
                    label: 'Fecha entrega'
                },
                {
                    key: 'id_cotizacion',
                    label: 'Número de cotización'
                },
                {
                    key: 'estado',
                    label: 'Estado'
                },
                
                {
                    key: 'accion',
                    label: 'Acción'
                }
            ],
            estadosOpciones: [{
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
            prioridadOpciones: [{
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
                }
            ],
            prioridad: '',
        }
    },
    computed: {
        rows() {
            return this.muestrasFiltradas.length
        }
    },

    components: {
        modal_encuestaSolicitante,
        ModalDetalleMuestra,
    },
    methods: {
        borrarFiltro() {
            this.estadoFiltro = null;
            this.rumFiltro = "";
            this.filtrarTabla();
        },
        filtrarTabla() {

            let estado_filtro = this.estadoFiltro;
            //let cargo_filtro = this.cargoFiltro;
            this.muestrasFiltradas = this.muestras;
            if (estado_filtro != null) {
                this.muestrasFiltradas = this.muestrasFiltradas.filter(muestra => muestra.estado == estado_filtro);
            }
            if (this.rumFiltro) {
                this.muestrasFiltradas = this.muestrasFiltradas.filter(muestra => muestra.RUM == this.rumFiltro);
            }

            if (this.rumFiltro == "" && estado_filtro == null) {
                this.muestrasFiltradas = this.muestras;
                this.filtrando = false;
            } else {
                this.filtrando = true;
            }
        },
        obtenerMuestras() {
            console.log("Obteniendo Muestras: ")
            this.loading = true;
            MuestraService.obtenerMuestras().then((response) => {
                if (response.data != null && response.status === 200) {
                    this.loading = false;
                    console.log(response.data)
                    this.muestras = response.data;
                    this.muestrasFiltradas = this.muestras
                }
            })
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

        

        abrirDetallesMuestra(data) {
            console.log(data)
            this.detallesData = data;
            this.$bvModal.show('modal-detalle-muestra-solicitante');
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

        abrirEncuestaMuestra(data) {
            console.log(data)
            this.modalEncuestaData = data;
            this.$bvModal.show('modal-encuesta-solicitante')
        }

    },
    mounted() {
        this.obtenerMuestras();
    }
}
</script>
