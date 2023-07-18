<template>
<div style="margin-bottom:50px">
    <b-row style="padding-top:30px; ">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de Normas
            </div>
        </b-col>
    </b-row>
    <modal_agregarNorma @refrescar="obtenerNormas" />
    <modal_detallesNorma :norma-data="modalDetallesData" />
    <modal_editarNorma :norma-data="modalEditarData" @refrescar="obtenerNormas" />
    <div class="row justify-content-center" style="padding-top:30px; padding-bottom:10px; margin-left: 5px;">

        <b-col class="col-10">
            <b-row style="padding-top:30px; padding-bottom:10px">
                <b-col class="col-4">
                    <b-row>
                        <b-button v-b-modal.modal-agregar-norma style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                            Agregar Norma
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
                                    <b-form-input placeholder="Nombre de la norma..." id="nombre-filtro" v-model="nombreFiltro">
                                    </b-form-input>
                                    <b-button-group style="margin-left:10px; margin-right:20px">
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
    </div>
    <div class="row justify-content-center">
        <div class="col-10">
            <b-table :busy="loading" show-empty :items="normasFiltradas" :fields="fields" responsive>

                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>

                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">

                            <div style=" color:gray"> No hay normas registradas para mostrar</div>
                        </div>

                    </div>
                </template>
                <template #custom-foot>
                    <b-tr>
                        <b-th colspan="3" style="background-color:rgb(235, 235, 235); border-radius:0px 0px 20px 20px; padding:1px" v-if="filtrando">
                            <div>
                                <b-icon icon="filter" animation="fade" variant="secondary" scale="0.8"></b-icon>
                                <div style="font-weight:bold; color:gray"> Resultados filtrados</div>
                            </div>
                        </b-th>
                    </b-tr>
                </template>

                <template  #cell(matrices_norma)="row">
                    <b-list-group v-if="row.item.matrices.length > 0">
                        <b-list-group-item v-if="row.item.matrices.length > 1" v-b-toggle="(row.item.id_norma).toString()" style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">
                            {{ row.item.matrices[0].nombre_matriz }}
                            <b-icon style="position:absolute; right:0px; top:25%; color: #949494" icon="caret-down-fill"></b-icon>
                        </b-list-group-item>
                        <b-list-group-item v-else style="padding:2px; border: none;">{{ row.item.matrices[0].nombre_matriz }}

                        </b-list-group-item>

                        <div v-if="row.item.matrices.length > 1">
                            <b-collapse :id="(row.item.id_norma).toString()">
                                <b-list-group-item style="padding:2px;  border: none; border-bottom: solid 1px #dbdbdb;" v-for="index in row.item.matrices.length-1" :key="index">{{ row.item.matrices[index].nombre_matriz }}</b-list-group-item>
                            </b-collapse>
                        </div>

                    </b-list-group>
                </template>
                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>

                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>

                        </template>
                        <b-dropdown-item @click="abrirDetallesNorma(row.item)">
                            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEditarNorma(row.item)">
                            <b-icon icon="pencil" aria-hidden="true" class="mr-2"></b-icon>Editar
                        </b-dropdown-item>

                    </b-dropdown>

                </template>
            </b-table>

        </div>
    </div>
</div>
</template>

<script>
import modal_agregarNorma from '@/components/admNorma/modal_agregarNorma.vue';
import modal_detallesNorma from '@/components/admNorma/modal_detallesNorma.vue';
import modal_editarNorma from '@/components/admNorma/modal_editarNorma.vue';
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {

    components: {

        modal_agregarNorma,
        modal_detallesNorma,
        modal_editarNorma

    },

    data() {

        return {

            fields: [{
                    key: 'nombre_norma',
                    label: 'Nombre',
                    thClass: 'text-center',
                    tdClass: 'text-center',
                    sortable: true
                },
                {
                    key: 'matrices_norma',
                    label: 'Matrices',
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
            loading: false,
            normas_request: [],
            normas_formatted: [],
            modalDetallesData: {},
            modalEditarData: {},
            normas: [],
            normasFiltradas: [],
            nombreFiltro: "",
            filtrando: false

        }

    },
    mounted() {
        this.obtenerNormas();
    },
    computed: {
        rows() {
            return this.normasFiltradas.length
        }
    },
    methods: {
        borrarFiltro() {
            this.nombreFiltro = "";
            this.filtrarTabla();
        },
        filtrarTabla() {
            let nombre_filtro = this.nombreFiltro.toLowerCase();
            //let cargo_filtro = this.cargoFiltro;
            this.normasFiltradas = this.normas;
            if (nombre_filtro != null) {
                this.normasFiltradas = this.normasFiltradas.filter(norma => norma.nombre_norma.toLowerCase().includes(nombre_filtro.toLowerCase()));
            }

            if (nombre_filtro == "") {
                this.normasFiltradas = this.normas;
                this.filtrando = false;
            } else {
                this.filtrando = true;
            }

        },
        agregarNorma() {

            this.$bvModal.show('modal-agregar-Norma');

        },
        abrirDetallesNorma(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalles-norma');
        },
        abrirEditarNorma(data) {
            console.log(data)
            this.modalEditarData = data;
            this.$bvModal.show('modal-editar-norma');
        },
        obtenerNormas() {
            this.loading = true;
            ElementosService.obtenerNormas().then((response) => {
                if (response != null) {
                    if (response.status == 200 && response.data != null) {
                        this.normas_formatted = [];
                        this.normas_request = response.data;

                        for (var i = 0; i < this.normas_request.length; i++) {
                            this.normas_formatted.push({
                                id_norma: this.normas_request[i].id_norma,
                                nombre_norma: this.normas_request[i].nombre_norma,
                                matrices: this.normas_request[i].matrices
                            })
                        }
                        this.normas = this.normas_formatted;
                        this.normasFiltradas = this.normas;
                        this.loading = false;
                        return ("obtenido normas", response.data);
                    }
                }
            })
        }

    }

}
</script>
