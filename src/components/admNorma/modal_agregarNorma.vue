<template>
<b-modal id="modal-Agregar-Norma" :title="`Agregar Metodologia`" size="xl">
    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Agregar Norma</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div>
        <b-row>
            <b-col cols="4">
                <b-form-group label="Nombre de la Norma">
                    <b-form-input v-model="nombre_norma"></b-form-input>
                </b-form-group>
            </b-col>

            <b-col cols="4">
                <b-form-group label="Seleccione una Matriz">
                    <b-form-select v-model="matrizSeleccionada" placeholder="Seleccione una Matriz">
                        <option v-for="opcion in opcionesMatriz" :key="opcion.id_matriz" :value="opcion.id_matriz">{{
                opcion.nombre_matriz }}</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
    <hr />
    <b-row>
        <b-col cols="4">
            <b-form-group>
                <b-card no-body header="Tablas: ">
                    <template #header>
                        <b-col>
                            <b-row class="d-flex justify-content-between align-items-center" style="height:30px">
                                <div style="font-weight:bold">Tabla:</div>
                                <b-button :disabled="!matrizSeleccionada" class="reactive-button" style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px" @click="mostrarModalAgregarTabla()" variant="primary">
                                    <b-icon icon="plus-circle-fill"></b-icon>
                                </b-button>
                            </b-row>
                        </b-col>
                    </template>
                    <b-form-select class="form-control" name="opciones" :select-size="5" v-model="tablaSeleccionada" :options="opcionesTabla" @change="tablaSeleccionadaCambiada">

                    </b-form-select>
                </b-card>
            </b-form-group>
        </b-col>

        <b-col cols="4">
            <b-form-group>
                <b-card no-body>

                    <template #header>
                        <b-row class="d-flex justify-content-around align-items-center" style="height:30px">
                            <b-col class="col-5">
                                <div style="font-weight:bold">Parámetros:</div>

                            </b-col>

                            <b-col class="col-7">
                                <b-input-group size="md">
                                    <b-form-select :disabled="!tablaSeleccionada" v-model="parametroSeleccionado_agregar" :options="parametrosMatriz"></b-form-select>
                                    <b-input-group-append>
                                        <b-button :disabled="!parametroSeleccionado_agregar" @click="agregarParametroTabla" class="reactive-button" style="padding:1px; aspect-ratio: 1 / 1; " variant="primary">
                                            <b-icon icon="plus-circle-fill"></b-icon>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-col>

                        </b-row>

                    </template>

                    <b-form-select :options="tablaSeleccionada.parametros" class="form-control" name="opciones" :select-size="5" v-model="parametroSeleccionado" :disabled="tablaSeleccionada.parametros === ''">

                    </b-form-select>
                </b-card>
            </b-form-group>
        </b-col>
        <b-col cols="4">
            <b-form-group>
                <b-card no-body>

                    <template #header>
                        <b-col>
                            <b-row class="d-flex justify-content-start align-items-center" style="height:30px">
                                <div>Metodologías de: <span style="font-weight:bold" v-if="parametroSeleccionado != null"> {{
                    parametroSeleccionado.nombre_parametro }}</span></div>

                            </b-row>
                        </b-col>
                    </template>
                    <b-list-group :key="metodosKey">
                        <b-list-group-item v-for="metodo in this.parametroSeleccionado.metodologias" :key="metodo.index" class="metodo-option d-flex justify-content-between">
                            <span>{{ metodo.nombre_metodologia }}</span>

                            <div>
                                <b-button class="boton-ojo-metodo">
                                    <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                                </b-button>
                                <span class="p-2"></span>
                                <b-button @click="borrarMetodologiaTabla(metodo)" v-if="parametroSeleccionado.metodologias.length > 1" variant="danger" style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                    <b-icon scale="0.9" icon="x-circle-fill"></b-icon>
                                </b-button>
                            </div>

                        </b-list-group-item>

                    </b-list-group>

                </b-card>
            </b-form-group>
        </b-col>
        <b-col>
            <b-button :disabled="!tablaSeleccionada" @click="agregarTablaNorma" block class="lsa-light-blue" style="font-weight:bold">agregar tabla seleccionada a norma</b-button>
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
        <b-card no-body header="Tablas de norma">
            <b-list-group v-for="tabla in tablas_agregar" :key="tabla.index" horizontal="lg">
                <b-list-group-item style="width:35%" class=" d-flex justify-content-start align-items-center">

                    <b-button @click="borrarTabla(tabla)" variant="danger" style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                        <b-icon scale="0.9" icon="trash-fill"></b-icon>
                    </b-button>
                    <div class="pl-2 pr-2" style="font-weight:bold">
                        {{ tabla.nombre_tabla }}
                    </div>

                </b-list-group-item>

                <b-list-group-item style="width:65%" class="item-no-padding">
                    <b-card no-body header="Parametros: ">

                        <b-list-group flush>
                            <b-list-group-item v-for="parametro in tabla.parametros" :key="parametro.id_parametro">
                                <b-col>
                                    <b-row class="d-flex justify-content-between align-items-center" style="margin-bottom:10px">
                                        <div>{{ parametro.nombre_parametro }}</div>

                                        <b-button v-b-toggle="'colapse-'+parametro.id_parametro" pill class="lsa-blue">detalles <b-icon icon="journals" aria-hidden="true"></b-icon>
                                        </b-button>

                                    </b-row>
                                    <b-collapse :id="'colapse-'+parametro.id_parametro">

                                        <b-card no-body header="Metodologías: ">
                                            <b-list-group flush>
                                                <b-list-group-item v-for="metodologia in parametro.metodologias" :key="metodologia.nombre_metodologia">
                                                    <b-col>
                                                        <b-row class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                {{ metodologia.nombre_metodologia }}
                                                            </div>

                                                            <b-button class="boton-ojo-metodo">
                                                                <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
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

        <b-form-group label="Nombre de la Tabla">
            <b-form-input v-model="nuevoNombreTabla"></b-form-input>
        </b-form-group>

        <template #modal-footer>
            <b-col>
                <b-row class="d-flex justify-content-between">
                    <b-button block :disabled="!nuevoNombreTabla" @click="agregarTabla()" variant="primary">Agregar</b-button>

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

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <template #modal-footer>
        <div class="d-flex justify-content-center">
            <b-button @click="enviarFormulario()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold; padding-top: 10px;">
                Agregar Norma
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
            tablas_agregar: [],
            nombreTabla: [],
            matrizSeleccionada: '',
            opcionesMatriz: [],
            parametrosMatriz: [],
            opcionesTabla: [],
            opcionesParametro: [],
            tablaSeleccionada: '',
            parametroSeleccionado_agregar: '',
            parametroSeleccionado: '',
            parametroDeshabilitado: true,
            alertaDuplicado: false,
            alertaTablaDuplicada: false,
            opcionesBD: [],
            nuevoNombreTabla: '',
            parametrosSeleccionados: [],
            tablasParametros: [],
            metodosKey: 1,
        }

    },

    watch: {
        matrizSeleccionada: function (value) {
            if (this.matrizSeleccionada !== '' && value !== '') {
                console.log(value)
                this.cargarParametrosMatriz(value);
            }
        },

    },

    mounted() {

        this.obtenerMatriz();
        //this.obtenerParametros();
    },

    methods: {
        borrarTabla(tabla) {
            console.log("tabla a borrar: ", tabla)
            this.tablas_agregar = this.tablas_agregar.filter(oldTabla => oldTabla.nombre_tabla != tabla.nombre_tabla);
        },
        agregarTablaNorma() {
            const existeTabla = this.tablas_agregar.find(tabla => tabla.nombre_tabla == this.tablaSeleccionada.nombre_tabla);

            if (existeTabla == null) {
                console.log("tabla a agregar", this.tablaSeleccionada);
                var tablaAgregar = this.tablaSeleccionada;
                var tabla = {
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
                            id_metodologia: tablaAgregar.parametros[i].value.metodologias[j].value.id_metodologia,
                            nombre_metodologia: tablaAgregar.parametros[i].value.metodologias[j].nombre_metodologia,
                        })
                    }
                }
                this.tablas_agregar.push(tabla)
                console.log("Tablas a agregar al sistema", this.tablas_agregar)
            } else {
                this.alertaTablaDuplicada = true;
            }

        },
        borrarMetodologiaTabla(metodologia) {
            console.log(metodologia)
            var id = metodologia.value.id_metodologia;

            console.log(this.parametroSeleccionado)

            this.parametroSeleccionado.metodologias = this.parametroSeleccionado.metodologias.filter(metodo => metodo.value.id_metodologia != id);
            this.metodosKey++;

        },
        agregarParametroTabla() {
            console.log("parametro a agregar en tabla: ", this.parametroSeleccionado_agregar)
            console.log("parametro a agregar en tabla: ", this.tablaSeleccionada)
            const existeParametro = this.tablaSeleccionada.parametros.find(parametro => parametro.value.id_parametro == this.parametroSeleccionado_agregar.id_parametro)
            if (existeParametro == null) {
                this.parametroSeleccionado_agregar.metodologias = []
                this.tablaSeleccionada.parametros.push({
                    value: this.parametroSeleccionado_agregar,
                    text: this.parametroSeleccionado_agregar.nombre_parametro
                })
                this.obtenerDetallesParametro();
            } else {
                this.alertaDuplicado = true; // Mostrar la alerta de duplicado
            }

        },
        enviarFormulario() {
            var data = {
                nombre_norma: this.nombre_norma,
                tablas_agregar: this.tablas_agregar
            }
            ElementosService.agregarNorma(data).then((response) => {
                if (response.status == 200) {
                    this.$bvToast.toast(`Creación de norma exitosa`, {
                        title: 'Exito',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "success",
                        appendToast: true
                    })
                    this.$emit('refrescar');
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
                        console.log("agregando parametro: ", response.data[i].nombre_parametro)
                        this.parametrosMatriz.push({
                            value: response.data[i],
                            text: response.data[i].nombre_parametro,
                            metodologias: []
                        })
                    }
                }

            })
        },
        mostrarModalAgregarTabla() {
            this.$bvModal.show('modal-agregar-tabla');
        },

        tablaSeleccionadaCambiada() {
            console.log('Tabla seleccionada:', this.tablaSeleccionada);
            // Realiza las acciones adicionales que necesites
            this.parametroSeleccionado = '';
        },
        /**
            agregarParametroAArea() {
              const parametroData = this.opcionesParametro.find(item => item.id_parametro === this.parametroSeleccionado);

              // Obtener la tabla seleccionada actualmente
              const tablaSeleccionada = this.tablaSeleccionada;

              // Verificar si el parámetro ya existe en la tabla seleccionada
              const existeParametro = this.tablasParametros[tablaSeleccionada]?.some(parametro => parametro.id_parametro === parametroData.id_parametro);

              if (!existeParametro) {
                // Verificar si la tabla ya tiene parámetros seleccionados
                if (this.tablasParametros[tablaSeleccionada]) {
                  // Agregar el parámetro a la tabla existente
                  this.tablasParametros[tablaSeleccionada].push(parametroData);
                } else {
                  // Crear un nuevo arreglo de parámetros para la tabla
                  this.tablasParametros[tablaSeleccionada] = [parametroData];
                }

                console.log('Parámetros por tabla:', this.tablasParametros);
              } else {
                this.alertaDuplicado = true; // Mostrar la alerta de duplicado
              }
            },
         */
        eliminarParametroTabla(index) {
            const tablaSeleccionada = this.tablaSeleccionada;
            if (tablaSeleccionada && this.tablasParametros[tablaSeleccionada]) {
                this.tablasParametros[tablaSeleccionada].splice(index, 1);
                this.tablasParametros = {
                    ...this.tablasParametros
                }; // Actualizar this.tablasParametros
                console.log('Parámetros por tablaELIMINACION:', this.tablasParametros);
            }
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
                    this.opcionesMatriz = response.data.map(matriz => ({
                        id_matriz: matriz.id_matriz,
                        nombre_matriz: matriz.nombre_matriz
                    }));
                }
                console.log("opciones de la matriz: ", this.opcionesMatriz)
            });
        },

        obtenerParametros() {
            this.loading = true;
            ElementosService.obtenerParametros().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("la respuesta es: ", response.data);
                    this.opcionesParametro = response.data.map(parametro => ({
                        id_parametro: parametro.id_parametro,
                        nombre_parametro: parametro.nombre_parametro
                    }));
                }
                console.log("opciones de los parametros: ", this.opcionesParametro)
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
                    for (var i = 0; i < response.data.metodologias.length; i++) {
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
}
</style>
