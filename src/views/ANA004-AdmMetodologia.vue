<template>
<div style="margin-bottom:50px">
    <b-row style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de metodologías
            </div>
        </b-col>
    </b-row>
    <modal_detallesMetodologia :detalles-data="this.modalDetallesData" />
    <modal_agregarMetodologia @refrescar="MetodologiaAgregada" />
    <modal_editarMetodologia :metodologia-data="this.modalEditarData" @refrescar="MetodologiaAgregada" />
    <b-row class="justify-content-center">
    <b-col class="col-10">
    <b-row style="padding-top:30px; padding-bottom:10px;">
        <div class="col-4">
            <b-row>
                <b-button v-b-modal.modal-Agregar-Metodologia style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                    Agregar metodología
                    <b-icon icon="journals"></b-icon>
                </b-button>
            </b-row>
        </div>
        <b-col class="col-8">
                <b-row class="d-flex justify-content-end">
                    <b-col class="col-6">
                        <b-form-group>

                            <b-input-group>
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input placeholder="Nombre de la metodología..." id="nombre-filtro" v-model="nombreFiltro">
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
            <b-table show-empty :items="metodologiasFiltradas" :busy="loading" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive>

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">

                            <div style=" color:gray"> No hay metodologías registradas para mostrar.</div>
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
                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
                        </template>
                        <b-dropdown-item v-if="row" @click="DetallesMetodología(row.item)">
                            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles
                        </b-dropdown-item>
                        <b-dropdown-item v-if="row" @click="EditarMetodología(row.item)">
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
import modal_agregarMetodologia from '@/components/admElementosMuestra/modal_agregarMetodologia.vue';
import modal_editarMetodologia from '@/components/admElementosMuestra/modal_editarMetodologia.vue';
import modal_detallesMetodologia from '@/components/admElementosMuestra/modal_detallesMetodologia.vue';
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {

    components: {

        modal_agregarMetodologia,
        modal_detallesMetodologia,
        modal_editarMetodologia

    },

    data() {

        return {

            fields: [{
                    key: 'nombre_metodologia',
                    label: 'Nombre de metodología',
                    thClass: 'text-center',
                    tdClass: 'text-center',
                    sortable: true
                },
                {
                    key: 'rutEmpleado',
                    label: 'Analista(s)',
                    thClass: 'text-center',
                    tdClass: 'text-center',
                    sortable: true
                },
                {
                    key: 'Accion',
                    label: 'Acción',
                    thClass: 'text-center',
                    tdClass: 'text-center'
                },
            ],

            metodologias: [],
            metodologiasFiltradas: [],
            modalEditarData: {},
            modalDetallesData: {},
            nombreE: '',
            nombreFiltro: "",
            empleados: [],
            loading: false,
            currentPage: 1,
            filtrando: false,
            perPage: 10,
        }
    },

    computed: {
        rows() {
            return this.metodologiasFiltradas.length
        }
    },

    mounted() {
        this.obtenerMetodologias();
    },

    methods: {
        borrarFiltro() {
            this.nombreFiltro = "";
            this.filtrarTabla();
        },
        filtrarTabla() {
            let nombre_filtro = this.nombreFiltro.toLowerCase();
            this.metodologiasFiltradas = this.metodologias;

            if (nombre_filtro != "") {
                this.metodologiasFiltradas = this.metodologias.filter(param => param.nombre_metodologia.toLowerCase().includes(nombre_filtro))
                this.filtrando = true;
            } else {
                this.metodologiasFiltradas = this.metodologias;
                this.filtrando = false;
            }
        },
        agregarAnalista() {
            this.$bvModal.show('modal-Agregar-Metodologia');
        },

        obtenerMetodologias() {
            this.loading = true;
            ElementosService.obtenerMetodologias().then((response) => {
                if (response.data != null && response.status === 200) {
                    const metodologias = response.data.map((metodologia) => {
                        const nuevoObjetoMetodologia = {
                            ...metodologia
                        };
                        if (metodologia.empleados && metodologia.empleados.length > 0) {
                            nuevoObjetoMetodologia.rutEmpleado = metodologia.empleados[0].nombre + ' ' + metodologia.empleados[0].apellido;

                            // Verificar si hay más de un analista
                            if (metodologia.empleados.length > 1) {
                                nuevoObjetoMetodologia.rutEmpleado += " (+)";
                            }
                        } else {
                            nuevoObjetoMetodologia.rutEmpleado = 'No asignado';
                        }
                        return nuevoObjetoMetodologia;
                    });
                    console.log("Obteniendo Metodologías: ", metodologias);
                    this.metodologias = metodologias;
                    this.metodologiasFiltradas = this.metodologias;
                    this.loading = false;
                }
            });
        },

        DetallesMetodología(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalle-metodologia')
        },

        EditarMetodología(data) {
            console.log("los datos a editar son : ", data)
            this.modalEditarData = data;
            this.$bvModal.show('modal-Editar-Metodologia')
        },

        MetodologiaAgregada() {
            this.obtenerMetodologias();
        },

        refrescarPagina() {
            window.location.reload();
        }

    }
}
</script>
