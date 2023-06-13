<template>
<b-modal centered id="modal-detalles-norma" ref="modal" title="Detalles norma" size="lg">
    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->

        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Detalles norma</div>

        </b-row>

        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <b-col>
        <b-row>
            <div>
                <span style="font-weight:bold; margin-right:20px"> Nombre norma:</span> <span>{{this.nombre_norma}}</span>
            </div>
        </b-row>
        <div class="pt-3" />
        <b-row>
            <div>
                <span style="font-weight:bold; margin-right:20px"> Nombre matríz: </span> <span>{{this.nombre_matriz}}</span>
            </div>
        </b-row>

    </b-col>
    <hr />

    
    <div>
    <b-list-group horizontal>
        <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%;font-weight: bold;">Tablas</b-list-group-item>

        <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:20.85%;font-weight: bold;">Parámetros</b-list-group-item>
        <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:49.15%;font-weight: bold;">Metodologías</b-list-group-item>

    </b-list-group>
    <b-list-group-item v-if="loading" style="height:100px">
            <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
         </b-list-group-item>

    <b-list-group v-for="tabla in this.tablas" :key="tabla.id_tabla" horizontal>
         


        <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%">
            {{ tabla.nombre_tabla }}
        </b-list-group-item>
        <b-list-group-item style="padding:0px; width:70%">
            <b-list-group>
                <b-list-group  v-for="parametro in tabla.parametros" :key="parametro.id" horizontal>
                    <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%">{{parametro.nombre_parametro}}</b-list-group-item>

                    <b-list-group-item style="padding:0px;width:70%">

                        <b-list-group flush>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" style="padding:10px" v-for="metodologia in parametro.metodologias" :key="metodologia.id_metodologia + '-' + parametro.id">
                                <span class="pl-2"> {{ metodologia.nombre_metodologia }}</span>

                                <b-popover placement="topleft" :target="'button-' + tabla.id_tabla + '-' +metodologia.id_metodologia+'-'+parametro.id_parametro" title="Descripción metodología" triggers="focus">
                                    {{ metodologia.detalle_metodologia }}
                                </b-popover>
                                <b-button class="boton-ojo-metodo" :id="'button-' + tabla.id_tabla + '-' +metodologia.id_metodologia+'-'+parametro.id_parametro">
                                    <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                                </b-button>
                            </b-list-group-item>

                        </b-list-group>
                    </b-list-group-item>
                </b-list-group>

            </b-list-group>
        </b-list-group-item>

    </b-list-group>
</div>
    <template #modal-footer="{ close }">

        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Cerrar
        </b-button>

    </template>

</b-modal>
</template>

<script>
import ElementosService from '@/helpers/api-services/Elementos.service';
export default {

    data() {
        return {
            id_norma: '',
            nombre_norma: "",
            nombre_matriz: "",
            tablas: [],
            parametros: [],
            loading: false,

        }
    },
    watch: {
        normaData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL", this.normaData)
                this.id_norma = this.normaData.id_norma;
                this.nombre_norma = this.normaData.nombre_norma;
                this.nombre_matriz = this.normaData.nombre_matriz;
                this.parametros = [];
                this.tablas = [];
                this.obtenerDetallesNorma(this.id_norma)
            }
        }
    },
    props: {
        normaData: Object
    },
    methods: {
        obtenerDetallesNorma(id) {
            this.loading = true;
            var data = {
                id_norma: id
            }
            console.log("obteniendo detalles de norma")
            ElementosService.obtenerDetallesNorma(data).then((response) => {
                if (response != null) {
                    if (response.data != null && response.status == 200) {

                        for (var i = 0; i < response.data.length; i++) {
                            var tablaExistente = this.tablas.find(tabla => tabla.nombre_tabla == response.data[i].nombre_tabla);
                            if (tablaExistente == null) {
                                this.tablas.push({
                                    id_tabla: response.data[i].id_tabla,
                                    nombre_tabla: response.data[i].nombre_tabla,
                                    parametros: []
                                })
                            }

                            var parametroExistente = this.parametros.find(para => para.id_parametro == response.data[i].id_parametro && para.id_tabla == response.data[i].id_tabla);
                            if (parametroExistente == null) {
                                console.log("param nuevo, agregar a listado")
                                this.parametros.push({
                                    id_tabla: response.data[i].id_tabla,
                                    nombre_tabla: response.data[i].nombre_tabla,
                                    id_parametro: response.data[i].id_parametro,
                                    nombre_parametro: response.data[i].nombre_parametro,
                                    metodologias: [{
                                        nombre_metodologia: response.data[i].nombre_metodologia,
                                        id_metodologia: response.data[i].id_metodologia,
                                        detalle_metodologia: response.data[i].detalle_metodologia,
                                    }]
                                })
                            } else {
                                parametroExistente.metodologias.push({
                                    nombre_metodologia: response.data[i].nombre_metodologia,
                                    id_metodologia: response.data[i].id_metodologia,
                                    detalle_metodologia: response.data[i].detalle_metodologia,
                                })
                            }
                            console.log(response.data[i])
                        }
                        console.log("parametros cargados en: ", this.parametros)
                        for (var j = 0; j < this.tablas.length; j++) {
                            console.log("evaluando tabla: ", this.tablas[j])
                            for (var k = 0; k < this.parametros.length; k++) {
                                if (this.tablas[j].id_tabla == this.parametros[k].id_tabla) {
                                    this.tablas[j].parametros.push(this.parametros[k]);
                                }
                            }
                        }
                        this.loading = false;
                    }
                }
            })
        }
    },

}
</script>

<style lang="">

    </style>
