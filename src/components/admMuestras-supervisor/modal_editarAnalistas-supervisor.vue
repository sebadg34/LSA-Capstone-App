<template>
<validation-observer ref="form">
    <b-modal id="modal-editar-analistas-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl" @hidden="onHidden">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Editar analistas</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-list-group-item v-if="loading" class="d-flex align-items-center justify-content-center lsa-orange-text" style="height:100px">
            <div>
                <b-spinner class="align-middle"></b-spinner>
                <strong> Cargando...</strong>
            </div>
        </b-list-group-item>

        <div class="form-group" v-for="(input, k) in analistas" :key="k">

            <b-row padding="0">
                <b-col>
                    <ValidationProvider :name="'analista ' + (k + 1)" rules="required" v-slot="validationContext">

                        <b-form-select :state="getValidationState(validationContext)" :placeholder="'Analista ' + (parseInt(k) + 1)" aria-describedby="cargo-live-feedback" class="mb-1" text-field="nombre_analista" v-model="input.analista" :options="analistasOpciones"></b-form-select>

                        <b-form-invalid-feedback id="analista-live-feedback">{{
                validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                </b-col>
                <b-col >
                    <ValidationProvider :name="'parametro ' + (k + 1)" rules="required" v-slot="validationContext">

                        <b-form-select :state="getValidationState(validationContext)" :placeholder="'Parametro ' + (parseInt(k) + 1)" aria-describedby="cargo-live-feedback" class="mb-1" text-field="nombre_parametro" v-model="input.parametro" :options="parametrosOpciones"></b-form-select>

                        <b-form-invalid-feedback id="parametro-live-feedback">{{
                validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                </b-col>
                <b-col>
                    <ValidationProvider :name="'fecha ' + (k + 1)" rules="required" v-slot="validationContext">
                      <b-form-datepicker  
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            placeholder="seleccione fecha" :state="getValidationState(validationContext)" v-model="input.fecha_entrega"
                            :id="'datepicker-'+  + (parseInt(k) + 1)" locale="es"></b-form-datepicker>

                        <b-form-invalid-feedback id="parametro-live-feedback">{{
                validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                </b-col>
                <b-col>
                    <ValidationProvider :name="'orden ' + (k + 1)" rules="required" v-slot="validationContext">
                        <b-form-input :state="getValidationState(validationContext)" :placeholder="'Orden '" style="height:30px" type="text" class="form-control" v-model="input.orden_analista" />
                        <b-form-invalid-feedback id="ciudad-live-feedback">{{
                validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                </b-col>
                <b-col>
                    <b-button-group style="height: 40px;">
                        <b-button variant="danger" @click="remove(k)" v-if="k || (!k && analistas.length > 1)" style="padding:2px; aspect-ratio: 1 / 1; height: 100%;">
                            <b-icon icon="trash-fill"></b-icon>
                        </b-button>
                        <b-button variant="success" @click="add(k)" v-if="k == analistas.length - 1" style="padding:1px; aspect-ratio: 1 / 1; height: 100%;">
                            <b-icon icon=" plus-circle-fill"></b-icon>
                        </b-button>
                    </b-button-group>

                </b-col>

            </b-row>

            <span>

            </span>

        </div>

        <template #modal-footer>
            <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
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
            analistas_eliminar: []
        }
    },
    methods: {
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    this.analistas.forEach(analista => {
                        if (analista.id_aux == null) {
                            this.analistas_agregar.push({
                                rut_empleado: analista.analista.rut_empleado,
                                orden_de_analisis: analista.orden_analista,
                                id_parametro: analista.parametro.id_parametro,
                                fecha_entrega: analista.fecha_entrega
                            })
                        }
                    })
                    console.log("analistas a agregar", this.analistas_agregar);

                }
            })

        },
        add() {
            this.analistas.push({
                id_aux: null,
                fecha_entrega: null,
                analista: '',
                parametro: '',
                orden_analista: ''
            })

        },

        remove(index) {
            if (this.analistas[index].id_aux != null) {
                this.analistas_eliminar.push({
                    rut_empleado: this.analistas[index].analista.rut_empleado,
                    orden_de_analisis: this.analistas[index].orden_analista,
                    id_parametro: this.analistas[index].parametro.id_parametro,
                    fecha_entrega: this.analistas[index].fecha_entrega
                })

                console.log("analista antiguo, eliminando!", this.analistas_eliminar)
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
            this.loading = true;

            MuestraSupervisorService.obtenerEmpleados().then((response) => {
                if (response.data != null && response.status == 200) {
                    console.log("data analista", response.data);
                    for (var i = 0; i < response.data.length; i++) {
                        this.analistasOpciones.push({
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
                    this.cargarAnalistasRegistrados();
                }
            })
        },
        cargarAnalistasRegistrados() {

            console.log("data de analistas ya en sistema", this.analistasData)
            var id_aux = 1;
            this.analistasData.analistas.forEach(analista => {

                var analistaValue = this.analistasOpciones.find(test => test.value.rut_empleado === analista.rut_empleado);
                var parametroValue = this.parametrosOpciones.find(dbParametro => dbParametro.value.id_parametro == analista.id_parametro);

                this.analistas.push({
                    id_aux: id_aux,
                    fecha_entrega: new Date(analista.fecha_entrega),
                    analista: analistaValue.value,
                    parametro: parametroValue.value,
                    orden_analista: analista.orden_de_analisis
                })
                this.analistas_antiguos.push({
                    id_aux: id_aux,
                    fecha_entrega: new Date(analista.fecha_entrega),
                    analista: analistaValue.value,
                    parametro: parametroValue.value,
                    orden_analista: analista.orden_de_analisis
                })
                id_aux++;
            });
            this.loading = false;
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
