<template>
    <b-modal centered id="modal-detalles-norma" ref="modal" title="Detalles norma" size="xl">
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
                    <span style="font-weight:bold; margin-right:20px"> Nombre norma:</span>
                    <span>{{ this.nombre_norma }}</span>
                </div>
            </b-row>
            <div class="pt-3" />

        </b-col>
        <hr />

        <div>
            <!--
            <b-list-group horizontal>
                <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:30%;font-weight: bold;">Tablas</b-list-group-item>

                <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:20.85%;font-weight: bold;">Parámetros</b-list-group-item>
                <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:49.15%;font-weight: bold;">Metodologías</b-list-group-item>

            </b-list-group>
-->

            <b-list-group-item v-if="loading" style="height:100px">
                <div class="text-center lsa-orange-text my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong> Cargando...</strong>
                </div>
            </b-list-group-item>

            <b-list-group v-for="matriz in this.matrices" :key="matriz.id_matriz">
                <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:100%;margin-top:30px;">
                    <div style="font-weight: bold;">Matriz:</div>
                    <div style="padding-left:5px">{{ matriz.nombre_matriz }}</div>
                </b-list-group-item>



                <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:100%; padding:0px; font-weight: bold;">
                    <b-list-group horizontal style="width:100%">
                        <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:40%; padding-top:2px; padding-bottom:2px">
                    Tablas
                </b-list-group-item>
                <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:30%;  padding-top:2px; padding-bottom:2px">
                    Parámetros
                </b-list-group-item>
                <b-list-group-item class="d-flex align-items-center justify-content-center"
                    style="width:30%;  padding-top:2px; padding-bottom:2px">
                    Metodologías
                </b-list-group-item>
                    </b-list-group>

                </b-list-group-item>
                        <b-list-group-item v-for="tabla in matriz.tablas" :key="tabla.id_tabla + '-' + matriz.id_matriz"
                            class="d-flex align-items-center justify-content-center"
                            style="width: 100%; padding:0px; margin-bottom: 5px;">

                            <b-list-group horizontal style="width:100%">



                                <b-list-group-item class="d-flex align-items-center justify-content-center"
                                    style="width:40%; padding-top:2px;padding-bottom:2px;padding-left:15px;padding-right:15px">
                                    {{ tabla.nombre_tabla }}
                                </b-list-group-item>

                                <b-list-group-item style="padding:0px; width:60%">
                                    <b-list-group style="height: 100%;">
                                        <b-list-group v-for="parametro in tabla.parametros"
                                            :key="parametro.id_parametro + '-' + tabla.id_tabla + '-' + matriz.id_matriz"
                                            horizontal>
                                            <b-list-group-item class="d-flex align-items-center justify-content-center"
                                                style="width:50%; padding:2px">{{
                                                    parametro.nombre_parametro }}</b-list-group-item>

                                            <b-list-group-item style="padding:0px;width:50%">

                                                <b-list-group>
                                                    <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center"
                                                        style="padding:2px; border: none"
                                                        v-for="metodologia in parametro.metodologias"
                                                        :key="metodologia.id_metodologia + '-' + parametro.id_parametro + '-' + tabla.id_tabla + '-' + matriz.id_matriz">
                                                        <span class="pl-2"> {{ metodologia.nombre_metodologia }}</span>

                                                        <b-popover placement="lefttop"
                                                            :target="'button-' + metodologia.id_metodologia + '-' + parametro.id_parametro + '-' + tabla.id_tabla + '-' + matriz.id_matriz"
                                                            title="Descripción metodología" triggers="focus">
                                                            <template v-if="metodologia.detalle_metodologia != null">{{
                                                                metodologia.detalle_metodologia }}</template>
                                                            <template v-else>
                                                                <div>La metodología no cuenta con una descripción
                                                                    actualmente.
                                                                </div>
                                                            </template>

                                                        </b-popover>
                                                        <b-button class="boton-ojo-metodo"
                                                            :id="'button-' + metodologia.id_metodologia + '-' + parametro.id_parametro + '-' + tabla.id_tabla + '-' + matriz.id_matriz">
                                                            <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                                                        </b-button>
                                                    </b-list-group-item>

                                                </b-list-group>
                                            </b-list-group-item>
                                        </b-list-group>

                                    </b-list-group>
                                </b-list-group-item>
                            </b-list-group>

                        </b-list-group-item>

               
            </b-list-group>

        </div>
        <template #modal-footer="{ close }">

            <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button"
                style="font-weight:bold">
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
            tablas: [],
            parametros: [],
            matrices: [],
            loading: false,

        }
    },
    watch: {
        normaData: {
            handler() {
                this.id_norma = this.normaData.id_norma;
                this.nombre_norma = this.normaData.nombre_norma;
                this.parametros = [];
                this.tablas = [];
                this.matrices = [];
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
            ElementosService.obtenerDetallesNorma(data).then((response) => {
                if (response != null) {
                    if (response.data != null && response.status == 200) {
                        const data = response.data;

                        for (var i = 0; i < response.data.length; i++) {
                            const matrizExistente = this.matrices.find(matriz => matriz.id_matriz == data[i].id_matriz);
                            if (matrizExistente == null) {
                                this.matrices.push({
                                    id_matriz: data[i].id_matriz,
                                    nombre_matriz: data[i].nombre_matriz,
                                    tablas: [{
                                        id_tabla: data[i].id_tabla,
                                        nombre_tabla: data[i].nombre_tabla,
                                        parametros: [{
                                            id_parametro: data[i].id_parametro,
                                            nombre_parametro: data[i].nombre_parametro,
                                            metodologias: [{
                                                nombre_metodologia: data[i].nombre_metodologia,
                                                id_metodologia: data[i].id_metodologia,
                                                detalle_metodologia: data[i].detalle_metodologia,
                                            }]
                                        }]
                                    }]
                                })
                            } else {
                                const tablaExistente = matrizExistente.tablas.find(tabla => tabla.id_tabla == data[i].id_tabla);
                                if (tablaExistente == null) {
                                    matrizExistente.tablas.push({
                                        id_tabla: data[i].id_tabla,
                                        nombre_tabla: data[i].nombre_tabla,
                                        parametros: [{
                                            id_parametro: data[i].id_parametro,
                                            nombre_parametro: data[i].nombre_parametro,
                                            metodologias: [{
                                                nombre_metodologia: data[i].nombre_metodologia,
                                                id_metodologia: data[i].id_metodologia,
                                                detalle_metodologia: data[i].detalle_metodologia,
                                            }]
                                        }]
                                    })
                                } else {
                                    const parametroExistente = tablaExistente.parametros.find(para => para.id_parametro == data[i].id_parametro);
                                    if (parametroExistente == null) {
                                        tablaExistente.parametros.push({
                                            id_parametro: data[i].id_parametro,
                                            nombre_parametro: data[i].nombre_parametro,
                                            metodologias: [{
                                                nombre_metodologia: data[i].nombre_metodologia,
                                                id_metodologia: data[i].id_metodologia,
                                                detalle_metodologia: data[i].detalle_metodologia,
                                            }]
                                        })
                                    } else {
                                        const metodoExistente = parametroExistente.metodologias.find(metodo => metodo.id_metodologia == data[i].id_metodologia);
                                        if (metodoExistente == null) {
                                            parametroExistente.metodologias.push({
                                                nombre_metodologia: data[i].nombre_metodologia,
                                                id_metodologia: data[i].id_metodologia,
                                                detalle_metodologia: data[i].detalle_metodologia,
                                            })
                                        }
                                    }
                                }
                            }
                        }
                        for (var j = 0; j < this.tablas.length; j++) {
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