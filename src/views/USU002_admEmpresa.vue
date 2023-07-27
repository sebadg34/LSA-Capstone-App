<template>
<div style="margin-bottom:50px">

    <modal_agregarEmpresa @refrescar="obtenerEmpresa" />
    <modal_editarEmpresa :empresa-data="this.modalEditarData" @refrescar="obtenerEmpresa" />
    <modal_detallesEmpresa :empresa-data="this.modalDetallesData" />

    <b-row align-h="start" style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Sistema de administración de clientes
            </div>
        </b-col>
    </b-row>

    <b-row class="justify-content-center">

        <b-col class="col-10">

            <b-row style="padding-top:30px; padding-bottom:10px">
                <b-col class="col-6">

                    <b-col class="col-6">

                        <b-row>
                            <b-button v-b-modal.modal-empresa style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                                Agregar cliente
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
                                <b-form-input placeholder="Nombre del cliente..." id="nombre-filtro" v-model="nombreFiltro">
                                </b-form-input>
                                <b-form-input placeholder="RUT del cliente..." id="rut-filtro" v-model="rutFiltro" trim></b-form-input>

                                <b-button-group style="margin-left:10px; margin-right:20px">
                                    <b-button class="reactive-button lsa-blue" @click="filtrarTabla">Filtrar</b-button>
                                    <b-button class="reactive-button lsa-orange" @click="borrarFiltro">Quitar</b-button>
                                </b-button-group>
                            </b-input-group>

                        </b-form-group>

                    </b-row>
                </b-col>
            </b-row>
        </b-col>

        <b-col class="col-10">
            <b-table fixed show-empty :fields="campos_tabla" :items="empresaFiltrado" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">
                <template #empty>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">

                            <div style=" color:gray"> No hay cliente registrado para mostrar.</div>
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

                <template #cell(accion)="row">

                    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>
                            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
                        </template>
                        <b-dropdown-item @click="abrirDetallesEmpresa(row.item)">
                            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

                        </b-dropdown-item>
                        <b-dropdown-item @click="abrirEditarEmpresa(row.item)">
                            <b-icon icon="pencil" aria-hidden="true" class="mr-2"></b-icon>Editar
                        </b-dropdown-item>
                    </b-dropdown>
                </template>

                <template #custom-foot>
                    <b-tr>
                        <b-th colspan="5" style="background-color:rgb(235, 235, 235); border-radius:0px 0px 20px 20px; padding:1px" v-if="filtrando">
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
import modal_agregarEmpresa from '@/components/admEmpresa/modal_agregarEmpresa.vue'
import modal_editarEmpresa from '@/components/admEmpresa/modal_editarEmpresa.vue'
import modal_detallesEmpresa from '@/components/admEmpresa/modal_detallesEmpresa.vue'

import empresaService from "@/helpers/api-services/Empresa.service"

export default {
    name: 'admEmpresa',
    components: {
        modal_agregarEmpresa,
        modal_editarEmpresa,
        modal_detallesEmpresa
    },
    mounted() {
        this.obtenerEmpresa();
    },
    computed: {
        rows() {
            return this.empresa.length
        }
    },
    data() {
        return {
            filter: null,
            filterOn: [],
            nombreFiltro: "",
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
            campos_tabla: [{
                key: 'rut_empresa',
                label: 'RUT'
            }, {
                key: 'nombre_abreviado',
                label: 'Nombre abreviado',
                sortable: true
            }, {
                key: 'correo',
                label: 'Correo',
                sortable: true
            }, {
                key: 'giro',
                label: 'Giro',
                sortable: true
            }, {
                key: 'accion',
                label: 'Acción'
            }],
            empresa: [{}],
            empresaFiltrado: [],
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

            if (nombre_filtro != "" && rut_filtro != "") {
                this.empresaFiltrado = this.empresa.filter(empresa => empresa.nombre_abreviado.toLowerCase().includes(nombre_filtro) &&
                    empresa.rut_empleado.includes(rut_filtro));
            } else if (nombre_filtro != "") {
                this.empresaFiltrado = this.empresa.filter(empresa => empresa.nombre_abreviado.toLowerCase().includes(nombre_filtro));
            } else if (rut_filtro != "") {
                this.empresaFiltrado = this.empresa.filter(empresa => empresa.rut_empresa.toLowerCase().includes(rut_filtro));
            }

            if (this.cargoFiltro != null) {
                this.empresaFiltrado = this.empresaFiltrado.filter(empresa => empresa.rol.toLowerCase().includes(cargo_filtro.toLowerCase()));
            }

            if (nombre_filtro == "" && rut_filtro == "" && cargo_filtro == null) {
                this.empresaFiltrado = this.empresa;
                this.filtrando = false;
            } else {
                this.filtrando = true;
            }

            this.onFiltered(this.empresaFiltrado);
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        abrirEditarEmpresa(data) {
            console.log(data)
            this.modalEditarData = data;
            this.$bvModal.show('modal-editar-empresa')
        },
        abrirDetallesEmpresa(data) {
            console.log(data)
            this.modalDetallesData = data;
            this.$bvModal.show('modal-detalles-empresa')
        },
        testEvent() {
            console.log('evento leido')
        },
        obtenerEmpresa() {
            this.loading = true;
            empresaService.obtenerTodasEmpresa().then((response) => {
                if (response != null) {
                    console.log(response)
                    this.empresa = response.data
                    this.empresaFiltrado = this.empresa
                    console.log("listado empresa",this.empresa)
                    this.onFiltered(this.empresaFiltrado);
                    this.loading = false;
                }

            })

        },
        /** 
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
            abrirEstadoPersonal(data){
                console.log(data)
                this.modalEstadoData =data;
                this.$bvModal.show('modal-estado-personal')
            }
    */
    }
}
</script>
