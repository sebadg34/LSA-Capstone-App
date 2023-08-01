<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-ingresar-resultados-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl"
            >

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
                <b-row style="font-weight: bold;" class="">
                    <b-col>
                        Identificador
                    </b-col>
                    <b-col>
                        Parámetros
                    </b-col>
                    <b-col>
                        Resultado
                    </b-col>
                    <b-col>
                        Unidad
                    </b-col>
                    <b-col>
                        Fecha/Hora de inicio análisis
                    </b-col>
                    <b-col>
                        Fecha/Hora de término análisis
                    </b-col>
                    <b-col class="col-1">
                        Acción
                    </b-col>
                </b-row>
                <hr />
                <div class="form-group" v-for="(input, k) in resultados" :key="k">

                    <b-row padding="0">
                        <b-col class="p-2">
                            <ValidationProvider :name="'analista ' + (k + 1)" rules="required" v-slot="validationContext">

                                <b-form-select :state="getValidationState(validationContext)"
                                    :placeholder="'Parametro ' + (parseInt(k) + 1)" aria-describedby="cargo-live-feedback"
                                    class="mb-1"  v-model="input.identificador" size="md"
                                    :options="identificadores"></b-form-select>

                                <b-form-invalid-feedback id="analista-live-feedback">{{
                                    validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-col>

                        <b-col class="p-2">
                            <ValidationProvider :name="'parametro ' + (k + 1)" rules="required" v-slot="validationContext">

                                <b-form-select :state="getValidationState(validationContext)" size="md"
                                    :placeholder="'Parametro ' + (parseInt(k) + 1)" aria-describedby="cargo-live-feedback"
                                    class="mb-1" text-field="nombre_parametro" value-field="id_parametro" v-model="input.parametro"
                                    :options="input.identificador.parametros"></b-form-select>

                                <b-form-invalid-feedback id="parametro-live-feedback">{{
                                    validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-col>
                        <b-col class="p-2">
                            <ValidationProvider :name="'resultado ' + (k + 1)" rules="required" v-slot="validationContext">

                                <b-form-input :state="getValidationState(validationContext)" size="sm"
                                    :placeholder="'resultado ' + (k + 1)"  
                                    v-model="input.resultado" />

                                <b-form-invalid-feedback id="analista-live-feedback">{{
                                    validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-col>
                        <b-col class="p-2">
                            <ValidationProvider :name="'unidad ' + (k + 1)" rules="required" v-slot="validationContext">

                                <b-form-input :state="getValidationState(validationContext)" size="sm"
                                    :placeholder="'unidad ' + (k + 1)"   
                                    v-model="input.unidad" />

                                <b-form-invalid-feedback id="analista-live-feedback">{{
                                    validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-col>
                        <b-col class="p-2">

                            <ValidationProvider :name="'fecha inicio ' + (k + 1)" rules="required"
                                v-slot="validationContext">
                                <b-form-datepicker size="sm" style="padding-left:2px;padding-right:2px" 
                                    placeholder="fecha" :state="getValidationState(validationContext)" 
                                    v-model="input.fecha_inicio" id="datepicker-inicio" locale="es"></b-form-datepicker>
                            </ValidationProvider>
                            <ValidationProvider :name="'hora inicio ' + (k + 1)" rules="required"
                                v-slot="validationContext">
                                <b-form-timepicker size="sm" placeholder="hora"
                                    :state="getValidationState(validationContext)" v-model="input.hora_inicio"
                                    locale="es"></b-form-timepicker>

                            </ValidationProvider>




                        </b-col>

                        <b-col class="p-2">


                            <ValidationProvider :name="'fecha termino ' + (k + 1)" rules="required"
                                v-slot="validationContext">
                                <b-form-datepicker class="justify-content-center" size="sm"
                                    style="padding-left:2px;padding-right:2px" 
                                   
                                   
                                    placeholder="fecha" :state="getValidationState(validationContext)"
                                    v-model="input.fecha_termino" id="datepicker-termino" locale="es"></b-form-datepicker>

                            </ValidationProvider>

                            <ValidationProvider :name="'hora termino ' + (k + 1)" rules="required"
                                v-slot="validationContext">
                                <b-form-timepicker size="sm" placeholder="hora"
                                    :state="getValidationState(validationContext)" v-model="input.hora_termino"
                                    locale="es"></b-form-timepicker>

                            </ValidationProvider>




                        </b-col>
                        <b-col class="p-2 col-1">
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
            resultados_eliminar: [],
            identificadores: [],
        }
    },
    methods: {
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    this.resultados.forEach(resultado => {
                            this.resultados_agregar.push({
                                identificador: resultado.cod_muestra,
                                id_parametro: resultado.parametro.id_parametro,
                                valor_resultado: resultado.resultado,
                                unidad : resultado.unidad,
                                fecha_inicio_analisis: resultado.fecha_inicio,
                                hora_inicio_analisis: resultado.hora_inicio,
                                fecha_termino_analisis: resultado.fecha_termino,
                                hora_termino_analisis: resultado.hora_termino
                            })
                        
                    })
                    console.log("data a enviar", data)

console.log("resultados a agregar", this.resultados_agregar);
                    var data = {
                        RUM: this.RUM,
                        resultados_agregar: this.resultados_agregar
                    }
                    MuestraSupervisorService.ingresarResultadosAnalisis(data).then((response) => {
                        if(response.status == 200){
                            this.$bvToast.toast(`Los resultados han sido ingresados.`, {
                                title: 'Éxito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$bvModal.hide('modal-ingresar-resultados-supervisor')
                        }
                    })
                   

                }
            })

        },
        add() {
            this.resultados.push({
                identificador: '',
                parametro: '',
                unidad: '',
                resultado: '',
                fecha_inicio: '',
                hora_inicio: '',
                fecha_termino: '',
                hora_termino: '',

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
        cargarSubmuestras() {
           

            MuestraSupervisorService.obtenerSubmuestras(this.RUM).then((response) => {
                if (response.data != null && response.status == 200) {
                    console.log("submuestras", response.data);
                        const subMuestras = response.data;
                        for(var i = 0; i < subMuestras.length; i++){
                            const idenData = {
                            text: subMuestras[i].identificador,
                            value: {
                                id_submuestra: subMuestras[i].id_submuestra,
                                identificador: subMuestras[i].identificador,
                                orden: subMuestras[i].orden,
                                parametros: subMuestras[i].parametros
                            }
                        }
                        this.identificadores.push(idenData)
                        }
                        this.preCargarResultados();
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
             
                }
            })
        },
        preCargarResultados(){
            for(var i = 0; i < this.identificadores.length; i++){
                for(var j = 0; j < this.identificadores[i].value.parametros.length; j++){
                    
                    const resultado = {
                    identificador: this.identificadores[i].value,
                    parametro: this.identificadores[i].value.parametros[j].id_parametro,
                    unidad: '',
                    resultado: '',
                    fecha_inicio: '',
                    hora_inicio: '',
                    fecha_termino: '',
                    hora_termino: '',
            };
                    this.resultados.push(resultado)
                }
            }
            console.log(this.resultados)
            this.loading = false;
        }
    },
    watch: {
        resultadosData: {
            handler() {
                this.RUM = this.resultadosData.RUM;
                //this.add();
                this.loading = true;
                this.cargarSubmuestras();
                
                //this.cargarParametros(this.RUM);
            
            }
        }
    }
}
</script>
