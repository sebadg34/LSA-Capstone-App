<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-rehacer-analisis-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl">


            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Rehacer análisis</div>
                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>


            <b-row class="justify-content-between mb-4 ml-2 mr-2">
                <b-col class="col-2">
                    <b-row style="border: 1px solid var(--lsa-light-gray); padding:4px; border-radius:5px">
                        <b-col class="col-6" style="font-weight:bold; "> RUM: </b-col>
                        <b-col class="col-6">{{ RUM }}</b-col>
                    </b-row>
                </b-col>
                <b-col class="col-6">
                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray);">
                        <b-col class="col-5" style="font-weight:bold;"> Nueva fecha de entrega: </b-col>
                        <b-col class="col-7">
                            <b-row>
                                <b-form-datepicker :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                                 placeholder="Seleccione una fecha." v-model="fecha_entrega_object"
                                    id="datepicker-nueva"></b-form-datepicker>


                            </b-row>

                        </b-col>
                    </b-row>

                </b-col>
            </b-row>


            <div style="min-height: 300px;">
                <b-list-group-item v-if="loading" class="d-flex align-items-center justify-content-center lsa-orange-text"
                    style="height:100px">
                    <div>
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </b-list-group-item>
                <div class="ml-4">


                    <b-list-group v-if="!loading" style="padding:0px">
                        <b-list-group-item style="padding:0px; height: 50px;">
                            <b-list-group horizontal>
                                <b-list-group-item class="p-3 text-center " style="width:30%;font-weight: bold;">
                                    Analista
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
                                    N° de orden
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:20%;font-weight: bold;">
                                    Parámetro
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:20%;font-weight: bold;">
                                    Fecha de entrega
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
                                    Acción
                                </b-list-group-item>
                            </b-list-group>
                        </b-list-group-item>

                        <b-list-group v-if="analistas.length == 0">
                            <b-list-group-item>
                                <div class="text-center lsa-light-blue-text row">
                                    <div class="col">
                                        <b-icon icon="file-earmark-break" animation="fade" variant="secondary"></b-icon>
                                        <div style="font-weight:bold; color:gray">No hay analistas asignados para la
                                            muestra.</div>
                                    </div>

                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <b-list-group-item v-for="(analista, k) in analistas" :key="k" style="padding:0px">
                            <b-list-group horizontal>
                                <b-list-group-item class="text-center" style="width:30%">

                                    <b-form-select v-model="analista.rut_empleado" :options="analistasOpciones"
                                        value-field="rut_empleado" text-field="nombre_analista"></b-form-select>



                                </b-list-group-item>
                                <b-list-group-item class="text-center" style="width:15%">
                                    <ValidationProvider :name="'N° orden ' + (k + 1)" rules="required"
                                        v-slot="validationContext">
                                        <b-form-input :state="getValidationState(validationContext)"
                                            :placeholder="'N° orden ' + (parseInt(k) + 1)" style="height:30px" type="text"
                                            class="form-control" v-model="analista.orden_analisis" />

                                        <b-form-invalid-feedback id="ciudad-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>
                                </b-list-group-item>
                                <b-list-group-item class="text-center" style="width:20%">

                                    <b-list-group>

                                        <template v-if="analista.parametros.length">
                                            <b-list-group-item v-if="analista.parametros.length > 0"
                                                v-b-toggle="analista.rut_empleado"
                                                style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">
                                                {{ analista.parametros[0].nombre_parametro }}
                                                <b-icon v-if="analista.parametros.length > 1"
                                                    style="position:absolute; right:0px; top:25%; color: #949494"
                                                    icon="caret-down-fill"></b-icon>
                                            </b-list-group-item>
                                            <b-list-group-item v-else
                                                style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">{{
                                                    analista.parametros[0].nombre_parametro }}

                                            </b-list-group-item>

                                            <div v-if="analista.parametros.length > 1">
                                                <b-collapse :id="analista.rut_empleado">
                                                    <b-list-group-item
                                                        style="padding:2px;  border: none; border-bottom: solid 1px #dbdbdb;"
                                                        v-for="index in analista.parametros.length - 1" :key="index">{{
                                                            analista.parametros[index].nombre_parametro }}</b-list-group-item>
                                                </b-collapse>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div style="font-weight: bold; color:red">sin parámetros por asignar.</div>
                                        </template>
                                    </b-list-group>



                                </b-list-group-item>
                                <b-list-group-item class="text-center" style="width:20%">

                                    <ValidationProvider :name="'Fecha de entrega ' + (k + 1)" rules="required"
                                        v-slot="validationContext">
                                        <b-form-datepicker placeholder="Seleccione una fecha."
                                        :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                                            :state="getValidationState(validationContext)" v-model="analista.fecha_object"
                                            :id="'datepicker-' + (k + 1)"></b-form-datepicker>
                                        <b-form-invalid-feedback id="fecha-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
                                    <b-button variant="lsa-gray" @click="abrirAgregarParametrosAnalista(analista)"
                                        style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                        <b-icon icon="pencil"></b-icon>
                                    </b-button>

                                    <b-button variant="danger" @click="remove(k)" class="ml-2">
                                        <b-icon-trash-fill></b-icon-trash-fill>
                                    </b-button>
                                </b-list-group-item>
                            </b-list-group>
                        </b-list-group-item>
                    </b-list-group>
                    <div class="mt-4 d-flex justify-content-start ml-3">
                        <b-row>
                            <b-button class="lsa-orange reactive-button" @click="add"
                                style="border: none; font-weight: bold;">
                                Agregar analista
                                <b-icon icon="plus"></b-icon>
                            </b-button>
                        </b-row>
                    </div>


                </div>
            </div>
            <b-modal id="modal-Agregar-Parametros" ref="modal" :title="`Agregar parámetro(s) a analista`" size="lg">
                <template #modal-header="{ close }">
                    <b-row class="d-flex justify-content-around">
                        <div class="pl-3">Asignar parámetro(s) a analista</div>
                    </b-row>
                    <button type="button" class="close" aria-label="Close" @click="close()">
                        <span aria-hidden="true" style="color:white">&times;</span>
                    </button>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group label="Seleccione un parámetro:">
                            <b-form-select v-model="parametroSeleccionadoIngreso" :options="parametrosOpciones"
                                text-field="nombre_parametro" value-field="id_parametro"
                                @change="agregarParametroSeleccionado(analistaSeleccionado, parametroSeleccionadoIngreso)"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row v-if="analistaSeleccionado && analistaSeleccionado.parametros.length > 0" class="mt-3">
                    <b-col>
                        <b-form-group label="Parámetros seleccionados:">
                            <div v-for="(parametro, index) in analistaSeleccionado.parametros" :key="index"
                                class="d-flex align-items-center objetos-item mb-3">
                                <b-input readonly :value="parametro.nombre_parametro" class="mr-2"></b-input>
                                <b-button variant="danger"
                                    @click="eliminarParametroSeleccionado(analistaSeleccionado, index)" class="ml-2">
                                    <b-icon-trash-fill></b-icon-trash-fill>
                                </b-button>
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
                    El parámetro ya se encuentra agregado.
                </b-alert>

                <b-alert variant="success" :show="alertaExito" dismissible @dismissed="alertaExito = false">
                    Parámetro agregado exitosamente.
                </b-alert>
                <!-- //////////////////////////////////////////MODAL-FOOTER////////////////////////////////////////////////////////////////////////////////// -->
                <template #modal-footer="{ close }">
                    <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button"
                        style="font-weight:bold">
                        Cerrar
                    </b-button>
                </template>
            </b-modal>
            <template #modal-footer>

                <b-overlay :show="Cargando" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
                <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button lsa-light-blue" 
                    style="font-weight:bold">
                    Rehacer análisis
                </b-button>
</b-overlay>

            </template>

        </b-modal>






    </validation-observer>
</template>
<script>
import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';
import ElementosService from '@/helpers/api-services/Elementos.service';
//import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';
export default {
    components: {},
    props: {
        muestraData: Object
    },
    data() {
        return {
            Cargando: false,
            RUM: '',
            loading: false,
            analistas: [],
            analistasOpciones: [],
            parametrosOpciones: [],
            analistas_antiguos: [],
            analistas_agregar: [],
            analistas_eliminar: [],
            alertaDuplicado: false,
            alertaExito: false,
            analistaSeleccionado: "",
            parametroSeleccionadoIngreso: "",
            fecha_entrega: "",
            fecha_entrega_object: ""
        }
    },
    methods: {

        enviarFormulario() {
            this.Cargando = true;
            this.analistas.forEach(analista => {
                analista.parametros.forEach(param => {
                    this.analistas_agregar.push(
                    {
                        rut_empleado: analista.rut_empleado,
                        orden_de_analisis: analista.orden_analisis,
                        id_parametro: param.id_parametro,
                        fecha_entrega: analista.fecha_object.toISOString().split('T')[0]
                    }
                )
                })

                var data = {
                RUM: this.RUM,
                nueva_fecha_entrega: this.fecha_entrega_object.toISOString().split('T')[0],
                empleados_agregar: this.analistas_agregar,
                empleados_eliminar: this.analistas_eliminar
              }
              MuestraSupervisorService.rehacerAnalisis(data).then((response) => {

                this.Cargando = false;
                if(response.request.status == 200){
                    this.$bvToast.toast(`El análisis ha sido reingresado.`, {
                                title: 'Éxito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$bvModal.hide('modal-rehacer-analisis-supervisor')
                            this.$emit('refrescar');

                }else{
                    this.$bvToast.toast(`Error al rehacer análisis.`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                }
              })
            
            })
        },
        abrirAgregarParametrosAnalista(analista) {

            console.log(analista);
            this.analistaSeleccionado = analista;
            this.$bvModal.show('modal-Agregar-Parametros')
        },
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        add() {
            this.analistas.push({
                id_aux: null,
                fecha_entrega: null,
                fecha_object: new Date(),
                analista: '',
                parametros: [],
                orden_analista: ''
            })

        },

        remove(index) {
            if (this.analistas[index].id_aux != null) {
                this.analistas_eliminar_data.push({
                    rut_empleado: this.analistas[index].rut_empleado,
                    orden_analisis: this.analistas[index].orden_analisis,
                    parametros: this.analistas[index].parametros,
                    fecha_entrega: this.analistas[index].fecha_entrega,
                    estado: this.analistas[index].estado
                })

                console.log("analista antiguo, eliminando!", this.analistas_eliminar_data)
            }
            this.analistas.splice(index, 1)
        },
        obtenerAnalistasDesignados(rum) {
            this.analistas_agregar = [];
            this.analistas_eliminar = [];
            MuestraSupervisorService.obtenerAnalistasDesignados(rum).then((response) => {
                if (response != null) {
                    if (response.status == 200 && response.data != null) {
                        const analistas = response.data;
                        for (var i = 0; i < analistas.length; i++) {
                            const analistaExistente = this.analistas.find(analista => analista.rut_empleado == analistas[i].rut_empleado);
                            if (analistaExistente == null) {
                                this.analistas.push({
                                    RUM: analistas[i].RUM,
                                    rut_empleado: analistas[i].rut_empleado,
                                    nombre: analistas[i].nombre,
                                    apellido: analistas[i].apellido,
                                    orden_analisis: analistas[i].orden_de_analisis,
                                    parametros: [{
                                        id_parametro: analistas[i].id_parametro,
                                        nombre_parametro: analistas[i].nombre_parametro
                                    }],
                                    fecha_entrega: analistas[i].fecha_entrega,
                                    fecha_object: new Date(analistas[i].fecha_entrega),
                                    fecha_entrega_formateada: analistas[i].fecha_entrega_formateada,
                                    estado: analistas[i].estado
                                })
                            } else {
                                analistaExistente.parametros.push({
                                    id_parametro: analistas[i].id_parametro,
                                    nombre_parametro: analistas[i].nombre_parametro
                                })
                            }
                        }



                        // Agregar todos los analistas "antiguos" a analistas eliminar
                        // TODO: no necesariamente borrar siempre todos.
                        this.analistas.forEach(analista => {
                            analista.parametros.forEach(param => {
                                this.analistas_eliminar.push({
                                    rut_empleado: analista.rut_empleado,
                                    orden_de_analisis: analista.orden_analisis,
                                    id_parametro: param.id_parametro,
                                    fecha_entrega: analista.fecha_entrega,
                                    estado: analista.estado
                                })
                            })
                        })

                        this.obtenerAnalistas();

                    }
                }
            })
        },
        obtenerAnalistas() {
            this.analistasOpciones = [];

            MuestraSupervisorService.obtenerEmpleados().then((response) => {
                if (response.data != null && response.status == 200) {
                    console.log("data analista", response.data);
                    for (var i = 0; i < response.data.length; i++) {
                        this.analistasOpciones.push({
                            nombre_analista: response.data[i].nombre + " " + response.data[i].apellido,
                            rut_empleado: response.data[i].rut_empleado
                        })
                    }
                    this.cargarParametros(this.RUM);
                }
            })

        },
        cargarParametros(rum) {
            console.log(rum)
            ElementosService.obtenerParametros().then((response) => {
                if (response.data != null && response.status == 200) {
                    console.log("data parametros", response.data);

                    for (var i = 0; i < response.data.length; i++) {
                        this.parametrosOpciones.push({
                            nombre_parametro: response.data[i].nombre_parametro,
                            id_parametro: response.data[i].id_parametro
                        })
                    }
                }
            })
        },
        agregarParametroSeleccionado(analista, id_param) {
            var parametro = this.parametrosOpciones.find(para => para.id_parametro == id_param);
            console.log('parametro a a gregar', parametro)
            const parametroExistente = analista.parametros.find(param => param.id_parametro == parametro.id_parametro);
            if (parametroExistente == null) {
                analista.parametros.push({
                    id_parametro: parametro.id_parametro,
                    nombre_parametro: parametro.nombre_parametro
                })
                this.alertaExito = true;
            } else {
                this.alertaDuplicado = true;
            }
            console.log(analista)

        },
        eliminarParametroSeleccionado(analista, index) {
            analista.parametros.splice(index, 1);
        },
    },
    watch: {
        muestraData: {
            handler() {
                this.RUM = this.muestraData.RUM;
                console.log(this.muestraData);
                this.fecha_entrega_object = new Date(this.muestraData.fecha_entrega);
                this.fecha_entrega = this.muestraData.fecha_entrega;
                this.obtenerAnalistasDesignados(this.RUM);
            }
        }
    }
}
</script>

  