<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-ingresar-resultados-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl"
            @hidden="onHidden">

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Editar resultados</div>
                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <b-list-group-item v-if="loading" class="d-flex align-items-center justify-content-center lsa-orange-text"
                style="height:100px">
                <div>
                    <b-spinner class="align-middle"></b-spinner>
                    <strong> Cargando...</strong>
                </div>
            </b-list-group-item>
            <div class="ml-4">
                <b-row style="font-weight: bold;" class="ml-4">
                    <b-col>
                        Muestra
                    </b-col>
                    <b-col>
                        Parámetros
                    </b-col>
                    <b-col>
                        Unidad
                    </b-col>
                    <b-col>
                        Resultado
                    </b-col>
                    <b-col>
                        Fecha/Hora de inicio análisis
                    </b-col>
                    <b-col>
                        Fecha/Hora de finalización análisis
                    </b-col>
                    <b-col>
                        Acción
                    </b-col>
                </b-row>
                <hr />
                <div class="form-group ml-4" v-for="(input, k) in resultados" :key="k">

                    <b-row padding="0">
                        <b-col>
                            <ValidationProvider :name="'analista ' + (k + 1)" rules="required" v-slot="validationContext">

                                <b-form-input :state="getValidationState(validationContext)"
                                    :placeholder="'muestra ' + (k + 1)" style="height:30px" type="text" class="form-control"
                                    v-model="input.cod_muestra" />

                                <b-form-invalid-feedback id="analista-live-feedback">{{
                                    validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-col>
                        <b-col>
                            <ValidationProvider :name="'parametro ' + (k + 1)" rules="required" v-slot="validationContext">

                                <b-form-select :state="getValidationState(validationContext)"
                                    :placeholder="'Parametro ' + (parseInt(k) + 1)" aria-describedby="cargo-live-feedback"
                                    class="mb-1" text-field="nombre_parametro" v-model="input.parametro"
                                    :options="parametrosOpciones"></b-form-select>

                                <b-form-invalid-feedback id="parametro-live-feedback">{{
                                    validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-row class="align-items-center">
                                    <b-form-input :placeholder="'hr. ' + (k + 1)" style="height:30px; width: 4.5rem;" type="text"
                                        class="form-control" v-model="input.hora_inicio" />
                                        <div>:</div>
                                    <b-form-input :placeholder="'min. ' + (k + 1)" style="height:30px;width: 3rem; padding-left:4px; padding-right:4px" type="text"
                                        class="form-control justify-content-center" v-model="input.minutos_inicio" />
                                </b-row>

                            </b-row>
                        </b-col>
                        <b-col>
                            <ValidationProvider :name="'orden ' + (k + 1)" rules="required" v-slot="validationContext">
                                <b-form-input :state="getValidationState(validationContext)" :placeholder="'Orden '"
                                    style="height:30px" type="text" class="form-control" v-model="input.orden_analista" />
                                <b-form-invalid-feedback id="ciudad-live-feedback">{{
                                    validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-col>
                        <b-col>
                            <b-button-group style="height: 40px;">
                                <b-button variant="danger" @click="remove(k)" v-if="k || (!k && resultados.length > 1)"
                                    style="padding:2px; aspect-ratio: 1 / 1; height: 100%;">
                                    <b-icon icon="trash-fill"></b-icon>
                                </b-button>
                                <b-button variant="success" @click="add(k)" v-if="k == resultados.length - 1"
                                    style="padding:1px; aspect-ratio: 1 / 1; height: 100%;">
                                    <b-icon icon=" plus-circle-fill"></b-icon>
                                </b-button>
                            </b-button-group>

                        </b-col>

                    </b-row>

                    <span>

                    </span>

                </div>
            </div>
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
        resultadosData: Object
    },
    data() {
        return {

            RUM: '',
            loading: false,
            cargandoObservaciones: false,
            resultados: [],
            resultadosOpciones: [],
            parametrosOpciones: [],
            resultados_antiguos: [],
            resultados_agregar: [],
            resultados_eliminar: []
        }
    },
    methods: {
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    this.resultados.forEach(analista => {
                        if (analista.id_aux == null) {
                            this.resultados_agregar.push({
                                rut_empleado: analista.analista.rut_empleado,
                                orden_de_analisis: analista.orden_analista,
                                id_parametro: analista.parametro.id_parametro,
                                fecha_entrega: analista.fecha_entrega
                            })
                        }
                    })
                    console.log("resultados a agregar", this.resultados_agregar);

                }
            })

        },
        add() {
            this.resultados.push({
                cod_muestra: '',
                parametro: '',
                unidad: '',
                resultado: '',
                fecha_inicio: '',
                hora_inicio: '',
                minutos_inicio: '',
                fecha_termino: '',
                hora_termino: '',
                minutos_termino: '',


            })

        },

        remove(index) {
            if (this.resultados[index].id_aux != null) {
                this.resultados_eliminar.push({
                    rut_empleado: this.resultados[index].analista.rut_empleado,
                    orden_de_analisis: this.resultados[index].orden_analista,
                    id_parametro: this.resultados[index].parametro.id_parametro,
                    fecha_entrega: this.resultados[index].fecha_entrega
                })

                console.log("analista antiguo, eliminando!", this.resultados_eliminar)
            }
            this.resultados.splice(index, 1)
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
        cargarresultados() {
            this.resultados = [];
            this.loading = true;

            MuestraSupervisorService.obtenerEmpleados().then((response) => {
                if (response.data != null && response.status == 200) {
                    console.log("data analista", response.data);
                    for (var i = 0; i < response.data.length; i++) {
                        this.resultadosOpciones.push({
                            nombre_analista: response.data[i].nombre + " " + response.data[i].apellido,
                            value: response.data[i]
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
                            value: response.data[i]
                        })
                    }
                    this.cargarresultadosRegistrados();
                }
            })
        },
        cargarresultadosRegistrados() {

            console.log("data de resultados ya en sistema", this.resultadosData)
            var id_aux = 1;
            this.resultadosData.resultados.forEach(analista => {

                var analistaValue = this.resultadosOpciones.find(test => test.value.rut_empleado === analista.rut_empleado);
                var parametroValue = this.parametrosOpciones.find(dbParametro => dbParametro.value.id_parametro == analista.id_parametro);

                this.resultados.push({
                    id_aux: id_aux,
                    fecha_entrega: new Date(analista.fecha_entrega),
                    analista: analistaValue.value,
                    parametro: parametroValue.value,
                    orden_analista: analista.orden_de_analisis
                })
                this.resultados_antiguos.push({
                    id_aux: id_aux,
                    fecha_entrega: new Date(analista.fecha_entrega),
                    analista: analistaValue.value,
                    parametro: parametroValue.value,
                    orden_analista: analista.orden_de_analisis
                })
                id_aux++;
            });
            this.loading = false;
            console.log("resultados ya cargados de la DB", this.resultados)
        },
        onHidden() {
            this.$emit('modal-cerrado');
        }
    },
    watch: {
        resultadosData: {
            handler() {
                this.RUM = this.resultadosData.RUM;
                this.add();
                //this.cargarresultados();
            }
        }
    }
}
</script>
