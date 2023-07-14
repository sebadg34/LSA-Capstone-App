<template>
    <b-modal id="modal-agregar-norma" :title="`Agregar Metodologia`" size="xl">
        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar norma</div>
            </b-row>
            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
        <div>
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Nombre de la norma">
                        <b-form-input v-model="nombre_norma"></b-form-input>
                    </b-form-group>
                </b-col>

                <b-col cols="6">
                    <b-form-group>
                        <b-card no-body header="Matrices: ">
                            <template #header>
                              
                                <b-row class="d-flex justify-content-around align-items-center" style="height:30px">
                                   <h5 style="position:absolute; top:-15px; left:-10px"><b-badge pill class="lsa-orange">1</b-badge> </h5> 
                                    <b-col class="col-4" style="padding:5px">
                                        <div style="font-weight:bold">Matrices:</div>

                                    </b-col>

                                    <b-col class="col-6" style="padding:0px">
                                        <b-input-group size="md">
                                            <b-form-select style="height: 30px; padding-top:2px; padding-bottom: 2px;"
                                                v-model="matrizSeleccionada_agregar"
                                                :options="dataMatrices"></b-form-select>
                                            <b-input-group-append>
                                                <b-button :disabled="!matrizSeleccionada_agregar" @click="agregarMatriz"
                                                    class="reactive-button" style="padding:1px; aspect-ratio: 1 / 1; "
                                                    variant="primary">
                                                    <b-icon icon="plus-circle-fill"></b-icon>
                                                </b-button>
                                            </b-input-group-append>

                                        </b-input-group>

                                    </b-col>
                                    <b-col class="col-1" style="padding:0px">
                                        <b-button :disabled="!parametroSeleccionado" class="reactive-button"
                                            style="margin-right:10px;padding-left:5px; padding-right:5px; padding-top:1px; padding-bottom: 1px; height: 30px; font-weight: bold;"
                                            @click="borrarParametroSeleccionado(parametroSeleccionado)" variant="danger">
                                            <b-icon icon="trash-fill"></b-icon>
                                        </b-button>

                                    </b-col>

                                </b-row>

                            </template>
                            <b-form-select class="form-control" name="opciones" :select-size="5"
                                v-model="matrizSeleccionada" :options="opcionesMatriz" @change="matrizSeleccionadaCambiada">

                            </b-form-select>
                        </b-card>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                <b-form-group>
                    <b-card no-body header="Tablas: ">
                        <template #header>
                         
                                <b-row class="d-flex justify-content-between align-items-center" style="height:30px">
                                    <h5 style="position:absolute; top:-15px; left:-10px"><b-badge pill class="lsa-orange">2</b-badge> </h5> 
                                    <b-col class="col-4" style="padding:5px">
                                        <div style="font-weight:bold">Tabla:</div>

                                    </b-col>
                                    
                                    <b-col class="col-6" style="padding:5px">
                                        <div class="d-flex justify-content-end align-items-center">
                                        <b-button :disabled="!tablaSeleccionada" class="reactive-button"
                                            style="margin-right:10px;padding-left:5px; padding-right:5px; padding-top:1px; padding-bottom: 1px; height: 30px; font-weight: bold;"
                                            @click="borrarTablaSeleccionada(tablaSeleccionada)" variant="danger">
                                            <b-icon icon="trash-fill"></b-icon>
                                        </b-button>

                                        <b-button :disabled="!matrizSeleccionada" class="reactive-button"
                                            style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px"
                                            @click="mostrarModalAgregarTabla()" variant="primary">
                                            <b-icon icon="plus-circle-fill"></b-icon>
                                        </b-button>
                                    </div>

                                    </b-col>
                                  
                                </b-row>
                           
                        </template>
                        <b-form-select class="form-control" name="opciones" :select-size="5" v-model="tablaSeleccionada"
                            :options="opcionesTabla" @change="tablaSeleccionadaCambiada">

                        </b-form-select>
                    </b-card>
                </b-form-group>
            </b-col>
            </b-row>
        </div>
        <hr />
        <b-row>
          

            <b-col cols="6">
                <b-form-group>
                    <b-card no-body>

                        <template #header>
                            <b-row class="d-flex justify-content-around align-items-center" style="height:30px">
                                <h5 style="position:absolute; top:-15px; left:-10px"><b-badge pill class="lsa-orange">3</b-badge> </h5> 
                                <b-col class="col-4" style="padding:5px">
                                    <div style="font-weight:bold">Parámetros:</div>

                                </b-col>

                                <b-col class="col-6" style="padding:0px">
                                    <b-input-group size="md">
                                        <b-form-select style="height: 30px; padding-top:2px; padding-bottom: 2px;"
                                            :disabled="!tablaSeleccionada" v-model="parametroSeleccionado_agregar"
                                            :options="parametrosMatriz"></b-form-select>
                                        <b-input-group-append>
                                            <b-button :disabled="!parametroSeleccionado_agregar"
                                                @click="agregarParametroTabla" class="reactive-button"
                                                style="padding:1px; aspect-ratio: 1 / 1; " variant="primary">
                                                <b-icon icon="plus-circle-fill"></b-icon>
                                            </b-button>
                                        </b-input-group-append>

                                    </b-input-group>

                                </b-col>
                                <b-col class="col-1" style="padding:0px">
                                    <b-button :disabled="!parametroSeleccionado" class="reactive-button"
                                        style="margin-right:10px;padding-left:5px; padding-right:5px; padding-top:1px; padding-bottom: 1px; height: 30px; font-weight: bold;"
                                        @click="borrarParametroSeleccionado(parametroSeleccionado)" variant="danger">
                                        <b-icon icon="trash-fill"></b-icon>
                                    </b-button>

                                </b-col>

                            </b-row>

                        </template>

                        <b-form-select :options="tablaSeleccionada.parametros" class="form-control" name="opciones"
                            :select-size="5" v-model="parametroSeleccionado"
                            :disabled="tablaSeleccionada.parametros === ''">

                        </b-form-select>
                    </b-card>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group>
                    <b-card no-body>

                        <template #header>
                           
                                <b-row class="d-flex justify-content-start align-items-center" style="height:30px">
                                    <h5 style="position:absolute; top:-15px; left:-10px"><b-badge pill class="lsa-orange">4</b-badge> </h5> 
<b-col class="col-12">
    <div>Metodologías de: <span style="font-weight:bold"
                                            v-if="parametroSeleccionado != null"> {{
                                                parametroSeleccionado.nombre_parametro }}</span></div>
</b-col>
                                  


                                </b-row>
                           
                        </template>
                        <b-list-group :key="metodosKey">
                            <b-list-group-item v-for="metodo in this.parametroSeleccionado.metodologias" :key="metodo.index"
                                class="metodo-option d-flex justify-content-between">
                                <span>{{ metodo.nombre_metodologia }}</span>

                                <div>
                                    <b-popover placement="topleft"
                                        :target="'button-' + metodo.id_metodologia + '-' + metodo.id_parametro"
                                        title="Descripción metodología" triggers="focus">
                                        <template v-if="metodo.detalle_metodologia != null">{{ metodo.detalle_metodologia
                                        }}</template>
                                        <template v-else>
                                            <div>La metodología no cuenta con una descripción actualmente.</div>
                                        </template>
                                    </b-popover>
                                    <b-button class="boton-ojo-metodo"
                                        :id="'button-' + metodo.id_metodologia + '-' + metodo.id_parametro">
                                        <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                                    </b-button>
                                    <span class="p-2"></span>
                                    <b-button @click="borrarMetodologiaTabla(metodo)"
                                        v-if="parametroSeleccionado.metodologias.length > 1" variant="danger"
                                        style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                        <b-icon scale="0.9" icon="x-circle-fill"></b-icon>
                                    </b-button>
                                </div>

                            </b-list-group-item>

                        </b-list-group>

                    </b-card>
                </b-form-group>
            </b-col>
            <b-col>
                <b-button :disabled="!tablaSeleccionada" @click="agregarTablaNorma" block class="lsa-light-blue"
                    style="font-weight:bold">agregar tabla seleccionada a norma</b-button>
            </b-col>
        </b-row>

        <!--
    <b-row v-if="parametrosSeleccionados.length > -1 && tablaSeleccionada !== ''" class="mt-3">
      <b-col>
        <b-form-group label="Parámetros Seleccionados:">
          <div v-for="(parametro, index) in tablasPametros[tablaSeleccionada]" :key="parametro.id_parametro"
            class="d-flex align-items-center objetos-item mb-3">
            <b-input readonly :value="parametro.nombre_parametro" class="mr-2"></b-input>
            <b-button variant="danger" @click="eliminarParametroTabla(index)" class="ml-2">
              <b-icon-trash-fill></b-icon-trash-fill>
            </b-button>
          </div>
        </b-form-group>
      </b-col>
    </b-row>
-->
        <br />
        <div v-if="tablas_agregar">
            <div v-for="matriz in matrices_agregar" :key="matriz.id_matriz">

                <b-card no-body >
                    <template #header>
                       <b-row class=" d-flex justify-content-between align-items-center" style="padding-left:10px; padding-right:10px">
                        
                            <div>
                               {{ 'Tablas de matriz: ' + matriz.nombre_matriz }} 
                            </div>
                            <b-button @click="borrarMatriz(matriz)" variant="danger"
                                style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                <b-icon scale="0.9" icon="trash-fill"></b-icon>
                            </b-button>
                       </b-row> 
                    </template>
                    <b-list-group v-for="(tabla, tablaindex) in matriz.tablas_agregar" :item="tabla" :key="tablaindex"
                        horizontal="lg">
                        <b-list-group-item style="width:35%" class=" d-flex justify-content-start align-items-center">
                            <b-button @click="borrarTabla(matriz,tabla)" variant="danger"
                                style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                <b-icon scale="0.9" icon="trash-fill"></b-icon>
                            </b-button>
                            <div class="pl-2 pr-2" style="font-weight:bold">
                                {{ tabla.nombre_tabla }}
                            </div>
                        </b-list-group-item>
                        <b-list-group-item style="width:65%" class="item-no-padding">
                            <b-card no-body header="Parámetros: ">

                                <b-list-group flush>
                                    <b-list-group-item v-for="parametro in tabla.parametros" :key="parametro.id_parametro">
                                        <b-col>
                                            <b-row class="d-flex justify-content-between align-items-center"
                                                style="margin-bottom:10px">
                                                <div>{{ parametro.nombre_parametro }}</div>
                                                <b-button
                                                    v-b-toggle="'colapse-' + parametro.id_parametro + '-' + tablaindex" pill
                                                    class="lsa-blue">detalles <b-icon icon="journals"
                                                        aria-hidden="true"></b-icon>
                                                </b-button>
                                            </b-row>
                                            <b-collapse :id="'colapse-' + parametro.id_parametro + '-' + tablaindex">
<hr/>
                                                <b-card no-body header="Metodologías: ">
                                                    <b-list-group flush>
                                                        <b-list-group-item v-for="metodologia in parametro.metodologias"
                                                            :key="metodologia.nombre_metodologia">
                                                            <b-col>
                                                                <b-row
                                                                    class="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        {{ metodologia.nombre_metodologia }}
                                                                    </div>
                                                                    <b-popover placement="topleft"
                                                                        :target="'button-' + metodologia.id_metodologia + '-' + parametro.id_parametro"
                                                                        title="Descripción metodología" triggers="focus">
                                                                        <template
                                                                            v-if="metodologia.detalle_metodologia != null">{{
                                                                                metodologia.detalle_metodologia }}</template>
                                                                        <template v-else>
                                                                            <div>La metodología no cuenta con una
                                                                                descripción
                                                                                actualmente.</div>
                                                                        </template>
                                                                    </b-popover>
                                                                    <b-button
                                                                        :id="'button-' + metodologia.id_metodologia + '-' + parametro.id_parametro"
                                                                        class="boton-ojo-metodo">
                                                                        <b-icon scale="0.9" icon="eye-fill"
                                                                            style="color:gray"></b-icon>
                                                                    </b-button>
                                                                </b-row>
                                                            </b-col>
                                                        </b-list-group-item>
                                                    </b-list-group>
                                                </b-card>
                                            </b-collapse>
                                        </b-col>
                                    </b-list-group-item>
                                </b-list-group>
                            </b-card>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </div>

        </div>
        <hr />
        <b-modal centered id="modal-agregar-tabla" ref="tabla" title="Agregar Tabla">
            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Nueva tabla</div>
                </b-row>
                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <b-form-group label="Nombre de la tabla">
                <b-form-input v-model="nuevoNombreTabla"></b-form-input>
            </b-form-group>
            <template #modal-footer>
                <b-col>
                    <b-row class="d-flex justify-content-between">
                        <b-button block :disabled="!nuevoNombreTabla" @click="agregarTabla()"
                            variant="primary">Agregar</b-button>

                    </b-row>
                </b-col>
            </template>
        </b-modal>

        <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
            Los parámetros ya se encuentran agregados a la tabla.
        </b-alert>
        <b-alert variant="danger" :show="alertaTablaDuplicada" dismissible @dismissed="alertaDuplicado = false">
            La tabla ya se encuentra agregada a la norma.
        </b-alert>
        <template #modal-footer>
            <div class="d-flex justify-content-center">
                <b-button @click="enviarFormulario()" variant="primary" size="xl" class="reactive-button"
                    style="font-weight:bold; padding-top: 10px;">
                    Agregar norma
                </b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {

    data() {

        return {
            nombre_norma: '',
            id_matriz: '',
            tablas_agregar: [],
            matrices_agregar: [],
            dataMatrices: [],
            opcionesNorma: [],
            nombreTabla: [],
            opcionesMatriz: [],
            parametrosMatriz: [],
            opcionesTabla: [],
            opcionesParametro: [],
            tablaSeleccionada: '',
            matrizSeleccionada: '',
            parametroSeleccionado_agregar: '',
            matrizSeleccionada_agregar: '',
            parametroSeleccionado: '',
            alertaDuplicado: false,
            alertaTablaDuplicada: false,
            nuevoNombreTabla: '',
            tablasParametros: [],
            metodosKey: 1,
        }

    },

    mounted() {

        this.obtenerMatriz();
    },

    methods: {
        borrarTablaSeleccionada(tabla) {
            console.log("tabla a descartar", tabla)
            console.log("tabla a modificar", this.opcionesTabla)
            this.opcionesTabla = this.opcionesTabla.filter(tab => tab.value.nombre_tabla != tabla.nombre_tabla);
            this.parametroSeleccionado = "";
            this.tablaSeleccionada = "";
        },
        borrarParametroSeleccionado(parametro) {
            console.log("parametro a descartar", parametro)
            console.log("tabla del parametro a modificar", this.tablaSeleccionada)
            this.tablaSeleccionada.parametros = this.tablaSeleccionada.parametros.filter(param => param.id_parametro != parametro.id_parametro);
            this.parametroSeleccionado = "";
        },
        
        // Reiniciar cuando se cambia la matriz
        reiniciarDatosParcial() {
            this.tablas_agregar = [];
            this.parametrosMatriz = [];
            this.opcionesTabla = [];
            this.opcionesParametro = [];
            this.tablaSeleccionada = "";
            this.parametroSeleccionado = "";
            this.parametroSeleccionado_agregar = "";

        },
        reiniciarDatos() {
            this.nombre_norma = "";
            this.id_matriz = "";
            this.tablas_agregar = [];
            this.matrizSeleccionada = '';
            this.parametrosMatriz = [];
            this.opcionesTabla = [];
            this.opcionesParametro = [];
            this.tablaSeleccionada = "";
            this.parametroSeleccionado = "";
            this.parametroSeleccionado_agregar = "";

        },
        borrarMatriz(matriz) {
            console.log("matriz a borrar: ", matriz)
            this.matrices_agregar = this.matrices_agregar.filter(oldMatriz => oldMatriz.nombre_matriz != matriz.nombre_matriz);
        },
        borrarTabla(matriz,tabla) {
            console.log("tabla a borrar: ", tabla)
            matriz.tablas_agregar = matriz.tablas_agregar.filter(oldTabla => oldTabla.nombre_tabla != tabla.nombre_tabla);
            // En caso de que la matriz quede sin tablas, borrar matriz
            if(matriz.tablas_agregar.length == 0){
                this.borrarMatriz(matriz);
            }
        },
        // Agregar tablas ya existentes en la DB al modal

        agregarTablaNorma() {
            const existeMatriz = this.matrices_agregar.find(matriz => matriz.id_matriz == this.matrizSeleccionada.id_matriz);
            var matriz;
            var tablaAgregar;
            var tabla;
            if (existeMatriz == null) {
                matriz = {
                    id_matriz: this.matrizSeleccionada.id_matriz,
                    nombre_matriz: this.matrizSeleccionada.nombre_matriz,
                    tablas_agregar: []
                }

                tablaAgregar = this.tablaSeleccionada;
                tabla = {
                    nombre_tabla: tablaAgregar.nombre_tabla,
                    parametros: []
                }

                for (var i = 0; i < tablaAgregar.parametros.length; i++) {
                    tabla.parametros.push({
                        nombre_parametro: tablaAgregar.parametros[i].text,
                        id_parametro: tablaAgregar.parametros[i].value.id_parametro,
                        metodologias: []
                    })
                    for (var j = 0; j < tablaAgregar.parametros[i].value.metodologias.length; j++) {
                        tabla.parametros[i].metodologias.push({
                            id_metodologia: tablaAgregar.parametros[i].value.metodologias[j].id_metodologia,
                            nombre_metodologia: tablaAgregar.parametros[i].value.metodologias[j].nombre_metodologia,
                            detalle_metodologia: tablaAgregar.parametros[i].value.metodologias[j].detalle_metodologia,
                        })
                    }
                }
                matriz.tablas_agregar.push(tabla);
                this.matrices_agregar.push(matriz);
                console.log("matriz nueva, creando matriz!", matriz);
            }
            else {
                matriz = existeMatriz;
                const existeTabla = matriz.tablas_agregar.find(tabla => tabla.nombre_tabla == this.tablaSeleccionada.nombre_tabla);
                if (existeTabla == null) {
                    console.log("tabla a agregar", this.tablaSeleccionada);
                    tablaAgregar = this.tablaSeleccionada;


                    tabla = {
                        nombre_tabla: tablaAgregar.nombre_tabla,
                        parametros: []
                    }

                    for (var x = 0; x < tablaAgregar.parametros.length; x++) {
                        tabla.parametros.push({
                            nombre_parametro: tablaAgregar.parametros[x].text,
                            id_parametro: tablaAgregar.parametros[x].value.id_parametro,
                            metodologias: []
                        })
                        for (var y = 0; y < tablaAgregar.parametros[x].value.metodologias.length; y++) {
                            tabla.parametros[x].metodologias.push({
                                id_metodologia: tablaAgregar.parametros[x].value.metodologias[y].id_metodologia,
                                nombre_metodologia: tablaAgregar.parametros[x].value.metodologias[y].nombre_metodologia,
                                detalle_metodologia: tablaAgregar.parametros[x].value.metodologias[y].detalle_metodologia,
                            })
                        }
                    }
                    matriz.tablas_agregar.push(tabla);
                    console.log("matriz nueva, creando matriz!", matriz);
                } else {
                    this.alertaTablaDuplicada = true;
                }

            }




        },
        borrarMetodologiaTabla(metodologia) {
            console.log(metodologia)
            var id = metodologia.id_metodologia;

            console.log(this.parametroSeleccionado)

            this.parametroSeleccionado.metodologias = this.parametroSeleccionado.metodologias.filter(metodo => metodo.id_metodologia != id);
            this.metodosKey++;

        },
        agregarMatriz() {
            const existeMatriz = this.opcionesMatriz.find(matriz => matriz.id_matriz == this.matrizSeleccionada_agregar.id_matriz);
            if (existeMatriz == null) {
                this.opcionesMatriz.push({
                    value: this.matrizSeleccionada_agregar,
                    text: this.matrizSeleccionada_agregar.nombre_matriz,
                    id_matriz: this.matrizSeleccionada_agregar.id_matriz
                }); // Agregar el nombre de la tabla a las opciones
            }
        },
        agregarParametroTabla() {
            const existeParametro = this.tablaSeleccionada.parametros.find(parametro => parametro.id_parametro == this.parametroSeleccionado_agregar.id_parametro)
            if (existeParametro == null) {
                console.log("agregando parametro a tabla:", this.parametroSeleccionado_agregar)
                this.parametroSeleccionado_agregar.metodologias = this.parametrosMatriz.find(param => param.id_parametro == this.parametroSeleccionado_agregar.id_parametro).metodologias;
                this.tablaSeleccionada.parametros.push({
                    value: this.parametroSeleccionado_agregar,
                    text: this.parametroSeleccionado_agregar.nombre_parametro,
                    id_parametro: this.parametroSeleccionado_agregar.id_parametro
                })
                //this.obtenerDetallesParametro();
            } else {
                this.alertaDuplicado = true; // Mostrar la alerta de duplicado
            }

        },
        enviarFormulario() {



       


            // TODO: Optimizar ciclos FOR
            var tablas_param_metodo = [];
            var matrices_agregar_aux = [];
            for(var x = 0; x < this.matrices_agregar.length; x++){
                var matriz_aux = this.matrices_agregar[x];
                var matriz_agregar = {
                    id_matriz:this.matrices_agregar[x].id_matriz
                } 

                for (var k = 0; k < matriz_aux.tablas_agregar.length; k++) {
                for (var i = 0; i < matriz_aux.tablas_agregar[k].parametros.length; i++) {
                    for (var j = 0; j < matriz_aux.tablas_agregar[k].parametros[i].metodologias.length; j++) {
                        tablas_param_metodo.push({
                            nombre_tabla: matriz_aux.tablas_agregar[k].nombre_tabla,
                            id_parametro: matriz_aux.tablas_agregar[k].parametros[i].id_parametro,
                            id_metodologia: matriz_aux.tablas_agregar[k].parametros[i].metodologias[j].id_metodologia
                        })
                    }
                }
            }
            matriz_agregar.tablas_agregar = tablas_param_metodo;
            matrices_agregar_aux.push(matriz_agregar);
            tablas_param_metodo = [];

            }
/** 
            for (var k = 0; k < this.tablas_agregar.length; k++) {
                for (var i = 0; i < this.tablas_agregar[k].parametros.length; i++) {
                    for (var j = 0; j < this.tablas_agregar[k].parametros[i].metodologias.length; j++) {
                        tablas_param_metodo.push({
                            nombre_tabla: this.tablas_agregar[k].nombre_tabla,
                            id_parametro: this.tablas_agregar[k].parametros[i].id_parametro,
                            id_metodologia: this.tablas_agregar[k].parametros[i].metodologias[j].id_metodologia
                        })
                    }
                }
            }
*/

            var data = {
                nombre_norma: this.nombre_norma,
                matrices_agregar: matrices_agregar_aux
            }
            ElementosService.agregarNorma(data).then((response) => {
                if (response.status == 200) {
                    this.reiniciarDatos();
                    this.$bvToast.toast(`Creación de norma exitosa`, {
                        title: 'Exito',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "success",
                        appendToast: true
                    })
                    this.$emit('refrescar');
                    this.$bvModal.hide('modal-agregar-norma')
                }
            })
        },
        cargarParametrosMatriz(value) {
            var data = {
                id_matriz: value
            }
            ElementosService.obtenerDetallesMatriz(data).then((response) => {
                console.log("detalles matriz", response);
                if (response.data != null && response.status == 200) {
                    for (var i = 0; i < response.data.length; i++) {
                        var parametroExistente = this.parametrosMatriz.find(param => param.id_parametro == response.data[i].id_parametro);

                        if (parametroExistente == null) {
                            var parametroAgregar = {
                                nombre_parametro: response.data[i].nombre_parametro,
                                id_parametro: response.data[i].id_parametro,

                            }

                            this.parametrosMatriz.push({
                                value: parametroAgregar,
                                id_parametro: response.data[i].id_parametro,
                                text: response.data[i].nombre_parametro,
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

                    }
                    console.log("parametros cargados de la matriz: ", this.parametrosMatriz)
                }

            })
        },
        mostrarModalAgregarTabla() {
            this.$bvModal.show('modal-agregar-tabla');
        },
        matrizSeleccionadaCambiada() {
            this.parametrosMatriz = [];
            this.opcionesParametro = [];
            this.cargarParametrosMatriz(this.matrizSeleccionada.id_matriz)
        },
        tablaSeleccionadaCambiada() {
            console.log('Tabla seleccionada:', this.tablaSeleccionada);
            // Realiza las acciones adicionales que necesites
            this.parametroSeleccionado = '';
        },
        parametroSeleccionadoCambiado() {
            console.log('Parámetro seleccionado:', this.parametroSeleccionado);
            this.alertaDuplicado = false;
        },

        agregarTabla() {
            var tabla = {
                text: this.nuevoNombreTabla,
                nombre_tabla: this.nuevoNombreTabla,
                parametros: []
            }
            this.opcionesTabla.push({
                value: tabla,
                text: tabla.nombre_tabla
            }); // Agregar el nombre de la tabla a las opciones
            console.log('Tabla seleccionada:', this.tablaSeleccionada);
            this.nuevoNombreTabla = '';
            this.$refs.tabla.hide();
        },

        obtenerMatriz() {
            ElementosService.obtenerMatriz().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo Matrices: ", response.data);
                    // Mapear los datos de las matrices a las opciones del select
                    this.dataMatrices = response.data.map(matriz => ({
                        value: matriz,
                        text: matriz.nombre_matriz,
                        id_matriz: matriz.id_matriz
                    }));
                }
                console.log("opciones de la matriz: ", this.dataMatrices)
            });
        },

        obtenerDetallesParametro() {

            var value = this.parametroSeleccionado_agregar
            console.log("CARGANDO METODOLOGIAS DE PARAMETRO", value)
            this.loading = true;
            var data = {
                id_parametro: value.id_parametro
            }
            ElementosService.obtenerDetallesParametro(data).then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("metodos del BD", response.data.metodologias)
                    for (var i = 0; i < response.data.metodologias.length; i++) {
                        response.data.metodologias[i].id_parametro = response.data.metodologias[i].pivot.id_parametro
                        value.metodologias.push({
                            value: response.data.metodologias[i],
                            nombre_metodologia: response.data.metodologias[i].nombre_metodologia,
                            detalle_metodologia: response.data.metodologias[i].detalle_metodologia,

                        })
                    }
                    console.log("la respuesta es: ", response.data);

                }
                console.log("PARAMETRO CON METODOLOGIA IMPLEMENTADAS:  ", value)
                console.log("tablas actualmente: ", this.opcionesTabla)
            });
        },
    },
}
</script>

<style>
.item-no-padding {
    padding: 0px
}

.boton-ojo-metodo {
    padding: 1px;
    aspect-ratio: 1 / 1;

    height: 30px;
    width: 30px;
    background-color: transparent;
    border: none;
}

.metodo-option {
    height: 50px;
    padding: 10px;
}

.form-control {
    height: auto;
    min-height: 38px;
    /* Ajusta este valor según tus necesidades */
}</style>
