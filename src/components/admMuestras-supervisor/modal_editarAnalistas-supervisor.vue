<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-editar-analistas-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl"
            @hidden="onHidden">

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Editar analistas</div>
                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>
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
                                <b-list-group-item class="p-3 text-center " style="width:20%;font-weight: bold;">
                                    Parámetro
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:20%;font-weight: bold;">
                                    Fecha entrega
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
                                    N° de orden
                                </b-list-group-item>
                                <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
                                    Acción
                                </b-list-group-item>
                            </b-list-group>
                        </b-list-group-item>

                        <b-list-group v-if="analistas.length == 0">
      <b-list-group-item >
                    <div class="text-center lsa-light-blue-text row">
                        <div class="col">
                            <b-icon icon="file-earmark-break" animation="fade" variant="secondary"></b-icon>
                        <div style="font-weight:bold; color:gray">No hay analistas asignados para la muestra.</div>
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
                                <b-list-group-item class="text-center" style="width:20%">

                                    <b-list-group>

                                        <template v-if="analista.parametros.length">
                                            <b-list-group-item v-if="analista.parametros.length > 0"
                                                v-b-toggle="analista.rut_empleado"
                                                style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">
                                                {{ analista.parametros[0].nombre_parametro }}
                                                <b-icon style="position:absolute; right:0px; top:25%; color: #949494"
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
                                    </b-list-group>



                                </b-list-group-item>
                                <b-list-group-item class="text-center" style="width:20%">

                                    <ValidationProvider :name="'Fecha entrega ' + (k + 1)" rules="required"
                                        v-slot="validationContext">
                                        <b-form-datepicker placeholder="fecha"
                                            :state="getValidationState(validationContext)" v-model="analista.fecha_object"
                                            :id="'datepicker-' + (k + 1)"></b-form-datepicker>
                                        <b-form-invalid-feedback id="fecha-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>
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
            <b-modal id="modal-Agregar-Parametros" ref="modal" :title="`Agregar parámetro a analista`" size="lg">
                <template #modal-header="{ close }">
                    <b-row class="d-flex justify-content-around">
                        <div class="pl-3">Asignar Parámetros a analista</div>
                    </b-row>
                    <button type="button" class="close" aria-label="Close" @click="close()">
                        <span aria-hidden="true" style="color:white">&times;</span>
                    </button>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group label="Seleccione un parámetro">
                            <b-form-select v-model="parametroSeleccionadoIngreso" :options="parametrosOpciones"
                                text-field="nombre_parametro" value-field="id_parametro"
                                @change="agregarParametroSeleccionado(analistaSeleccionado, parametroSeleccionadoIngreso)"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row v-if="analistaSeleccionado && analistaSeleccionado.parametros.length > 0" class="mt-3">
                    <b-col>
                        <b-form-group label="Parámetros Seleccionados:">
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
                    El Parametro ya se encuentra agregado.
                </b-alert>

                <b-alert variant="success" :show="alertaExito" dismissible @dismissed="alertaExito = false">
                    Parámetro agregado con exitosamente.
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
                <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button"
                    style="font-weight:bold">
                    Guardar cambios
                </b-button>
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
        analistasData: Object
    },
    data() {
        return {

            RUM: '',
            loading: false,
            cargandoObservaciones: false,
            analistas: [],
            analistasOpciones: [],
            parametrosOpciones: [],
            analistas_antiguos: [],
            analistas_agregar: [],
            alertaDuplicado: false,
            alertaExito: false,
            analistas_eliminar_data: [],
            analistas_eliminar: [],
            analistaSeleccionado: "",
            parametroSeleccionadoIngreso: "",
        }
    },
    methods: {

        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    this.analistas.forEach(analista => {
                        analista.parametros.forEach((param) => {
                            this.analistas_agregar.push({
                                rut_empleado: analista.rut_empleado,
                                orden_de_analisis: analista.orden_analisis,
                                id_parametro: param.id_parametro,
                                fecha_entrega: analista.fecha_object
                            })
                        })
                    })
                    this.analistas_antiguos.forEach(analista => {
                        analista.parametros.forEach((param) => {
                            this.analistas_eliminar.push({
                                rut_empleado: analista.rut_empleado,
                                orden_de_analisis: analista.orden_analisis,
                                id_parametro: param.id_parametro,
                                fecha_entrega: analista.fecha_entrega,
                                estado: analista.estado
                            })

                        });
                    })
                    console.log(this.analistas_eliminar)
                    var data = {
                        RUM: this.RUM,
                        empleados_agregar: this.analistas_agregar,
                        empleados_eliminar: this.analistas_eliminar

                    }
                    MuestraSupervisorService.modificarAnalistas(data).then((response) => {
                        if (response.status == 200) {


                            this.$bvToast.toast(`Los analistas han sido actualizados.`, {
                                title: 'Éxito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$bvModal.hide('modal-editar-analistas-supervisor')
                        }
                    })

                    console.log("analistas a agregar", this.analistas_agregar);

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

        abrirAgregarParametrosAnalista(analista) {

            console.log(analista);
            this.analistaSeleccionado = analista;
            this.$bvModal.show('modal-Agregar-Parametros')
        },
        add() {
            this.analistas.push({
                id_aux: null,
                fecha_entrega: null,
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
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        agregarAnalista() {
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    console.log("paso!")
                }
            })
        },
        cargarAnalistas() {
            this.analistas = [];
            this.analistas_agregar = [];
            this.analistas_eliminar = [];
            this.analistas_antiguos = [];
            this.loading = true;

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
                    this.cargarAnalistasRegistrados();
                }
            })
        },
        cargarAnalistasRegistrados() {

            console.log("data de analistas ya en sistema", this.analistasData)
            var id_aux = 1;
            this.loading = false;
            this.analistas = this.analistasData.analistas;
            this.analistas.forEach((analista) => {
                analista.fecha_object = new Date(analista.fecha_entrega)
                analista.id_aux = id_aux;
                id_aux++;

                this.analistas_antiguos.push({
                    RUM: analista.RUM,
                    apellido: analista.apellido,
                    fecha_entrega: analista.fecha_entrega,
                    fecha_entrega_formateada: analista.fecha_entrega_formateada,
                    fecha_object: analista.fecha_object,
                    id_aux: analista.id_aux,
                    nombre: analista.nombre,
                    orden_analisis: analista.orden_analisis,
                    parametros: analista.parametros.slice(),
                    rut_empleado: analista.rut_empleado
                })

            })
            console.log("analistas ya cargados de la DB", this.analistas)
        },
        onHidden() {
            this.$emit('modal-cerrado');
        }
    },
    watch: {
        analistasData: {
            handler() {
                this.RUM = this.analistasData.RUM;
                this.cargarAnalistas();
            }
        }
    }
}
</script>
