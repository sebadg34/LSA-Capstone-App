<template>
    <div style="margin-bottom:50px">

        <modal_agregarEmpresa @refrescar="obtenerEmpresa" />
<modal_editarEmpresa  :empresa-data="this.modalEditarData" @refrescar="obtenerEmpresa" /> 
<modal_detallesEmpresa  :empresa-data="this.modalDetallesData"  /> 
        <b-container class="bv-example-row" style="padding-top:50px; padding-left:0px;padding-right: 0px;">
            <b-col class="col-12">
    
                <b-col class="col-3">
                    <b-row>
                        <b-button v-b-modal.modal-empresa style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                            Agregar Empresa
                            <b-icon icon="person-plus-fill"></b-icon>
                        </b-button>
                    </b-row>
                </b-col>
                <b-row class="pt-5">
    
                </b-row>
    
            </b-col>
    
        </b-container>
        <b-row class="justify-content-center">
            <b-col class="col-10">
                <b-table :fields="campos_tabla" :items="empresa" style="" :busy="loading" :per-page="perPage" :current-page="currentPage">
    
                    <template #table-busy>
        <div class="text-center lsa-orange-text my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Cargando...</strong>
        </div>
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
                            <b-dropdown-item @click="abrirDetallesEmpresa(row.item)">
                                <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles
    
                            </b-dropdown-item>
                            <b-dropdown-item @click="abrirEditarEmpresa(row.item)">
                                <b-icon icon="pencil" aria-hidden="true" class="mr-2"></b-icon>Editar
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
                editarID: 0,
                currentPage: 3,
                perPage: 10,
                loading: false,
                modalEditarData: {},
                modalDetallesData: {},
                modalEstadoData: {},
                campos_tabla: [{
                    key: 'rut_empresa',
                    label: 'Rut'
                }, {
                    key: 'nombre_abreviado',
                    label: 'Nombre Abreviado'
                }, {
                    key: 'correo',
                    label: 'Correo'
                }, {
                    key: 'giro',
                    label: 'Giro'
                }, {
                    key: 'accion',
                    label: 'Acción'
                }],
                empresa: [{}],
            }
        },
        methods: {
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
            testEvent(){
                console.log('evento leido')
            },
            obtenerEmpresa() {
                this.loading = true;
            empresaService.obtenerTodasEmpresa().then((response) => {
                if (response != null) {
                    console.log(response)
                    this.empresa = response.data
                    console.log(this.empresa)
                    
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