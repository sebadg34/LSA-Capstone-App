<template>
<div style="margin-bottom:50px">
    <b-row style="padding-top:30px; ">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de Parámetros
            </div>
        </b-col>
    </b-row>

    <modal_agregarParametro @refrescar="parametroAgregado" />
    <modal_detallesParametro :detalles-data="this.modalDetallesData" />
    <modal_editarParametro :parametro-data="this.modalEditarData" @refrescar="parametroAgregado" />
    <b-row class="justify-content-center">
    <b-col class="col-10">
        <b-row style="padding-top:30px; padding-bottom:10px">
            <b-col class="col-4">
                <b-row>
                    <b-button v-b-modal.modal-Agregar-Parametro style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                        Agregar Parámetro
                        <b-icon icon="journals"></b-icon>
                    </b-button>
                </b-row>
            </b-col>
            <b-col class="col-8">
                <b-row class="d-flex justify-content-end">
                    <b-col class="col-6">
                        <b-form-group>

                            <b-input-group>
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input placeholder="Nombre del parámetro..." id="nombre-filtro" v-model="nombreFiltro">
                                </b-form-input>
                                <b-button-group style="margin-left:10px">
                                    <b-button class="reactive-button lsa-blue" @click="filtrarTabla">Filtrar</b-button>
                                    <b-button class="reactive-button lsa-orange" @click="borrarFiltro">Quitar</b-button>
                                </b-button-group>
                            </b-input-group>

                        </b-form-group>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-col>
</b-row>
    <div class="row justify-content-center">
        <div class="col-10">
            <b-table :busy="loading" show-empty :items="parametrosFiltrado" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive>

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">

                            <div style=" color:gray"> No hay parámetros registrados para mostrar</div>
                        </div>

                    </div>
                </template>

                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>

                <template #cell(Accion)="row">
                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>
                            <b-icon style="height: 80%; width: 80%; align-parametros: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
                        </template>
                        <b-dropdown-item v-if="row" @click="DetallesParametro(row.item)">
                            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver Detalles
                        </b-dropdown-item>
                        <b-dropdown-item v-if="row" @click="EditarParametro(row.item)">
                            <b-icon icon="pencil-square" aria-hidden="true" class="mr-2"></b-icon>Editar
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
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="right"></b-pagination>
        </div>
    </div>
</div>
</template>

<script>
import modal_agregarParametro from '@/components/admParametro/modal_agregarParametro.vue';
import modal_detallesParametro from '@/components/admParametro/modal_detallesParametro.vue';
import modal_editarParametro from '@/components/admParametro/modal_editarParametro.vue';

import ElementosService from '@/helpers/api-services/Elementos.service';
export default {

    components: {
        modal_agregarParametro,
        modal_detallesParametro,
        modal_editarParametro
    },

    data() {

        return {
            loading: false,
            totalRows: "",
            nombreFiltro: "",
            fields: [{
                    key: 'nombre_parametro',
                    label: 'Nombre',
                    thClass: 'text-center',
                    tdClass: 'text-center'
                },
                {
                    key: 'nombreMetodologia',
                    label: 'Metodología',
                    thClass: 'text-center',
                    tdClass: 'text-center'
                },
                {
                    key: 'Accion',
                    label: 'Acción',
                    thClass: 'text-center',
                    tdClass: 'text-center'
                },
            ],

            parametros: [],
            parametrosFiltrado: [],
            modalDetallesData: {},
            modalEditarData: {},
            currentPage: 1,
            filtrando: false,
            perPage: 10,

        }

    },

    computed: {
        rows() {
            return this.parametrosFiltrado.length
        }
    },

    mounted() {
        this.obtenerParametros();
    },

    methods: {
      borrarFiltro() {
            this.nombreFiltro = "";
            this.filtrarTabla();
        },
        filtrarTabla() {
            let nombre_filtro = this.nombreFiltro.toLowerCase();
            this.parametrosFiltrado = this.parametros;
           
            if (nombre_filtro != "" ) {
                this.parametrosFiltrado = this.parametros.filter(param => param.nombre_parametro.toLowerCase().includes(nombre_filtro))
                this.filtrando = true;
            } else{
              this.parametrosFiltrado = this.parametros;
              this.filtrando = false;
            }
        },
        obtenerParametros() {
            this.loading = true;
            ElementosService.obtenerParametros().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("la respuesta es: ", response.data);
                    const parametros = response.data.map((parametro) => {
                        const nuevoObjetoParametro = {
                            ...parametro
                        };

                        if (parametro.metodologias && parametro.metodologias.length > 0) {
                            nuevoObjetoParametro.nombreMetodologia = parametro.metodologias[0].nombre_metodologia;

                            if (parametro.metodologias.length > 1) {
                                nuevoObjetoParametro.nombreMetodologia += "(+)";
                            }
                        } else {
                            nuevoObjetoParametro.nombreMetodologia = 'No Asignado';
                        }
                        return nuevoObjetoParametro;
                    });
                    this.parametros = parametros;
                    this.parametrosFiltrado = this.parametros;

                    this.loading = false;
                    console.log("los parametros son: ", parametros);
                }
            });
        },

        agregarParametro() {
            this.$bvModal.show('modal-Agregar-Parametro');
        },

        DetallesParametro(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalle-parametro')
        },

        EditarParametro(data) {
            console.log("los datos a editar son : ", data)
            this.modalEditarData = data;
            this.$bvModal.show('modal-Editar-Parametro')
        },

        parametroAgregado() {
            this.obtenerParametros();
        }
    }
}
</script>
