<template>
<validation-observer ref="form">
    <b-modal centered id="modal-encuesta-solicitante" ref="modal" title="Agregar Personal" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Encuesta de satisfacción</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>
        <b-row>
            <b-col class="col-12">
                <label for="rating-lg" class="mt-3" style="font-weight: bold;">¿Qué tan receptivos hemos sido ante sus preguntas o inquietudes acerca de nuestros servicios de análisis?	</label>
                <ValidationProvider name="valoración 1" rules="required|min:1" v-slot="validationContext">
                    <b-form-rating :state="getValidationState(validationContext)" variant="warning" id="rating-lg" v-model="Valoracion_1" size="lg"></b-form-rating>

                    <b-row class="d-flex justify-content-between" style="padding-left:70px; padding-right:70px">

                        <div>Muy malo</div>
                        <div>Malo</div>
                        <div>Regular</div>
                        <div>Bueno</div>
                        <div>Excelente</div>
                    </b-row>
                </ValidationProvider>
                <b-alert fade  class="text-center" dismissible @dismissed="valoracion_faltante_1 = false" :show="valoracion_faltante_1" variant="warning">La valoración debe ser entre 1 a 5 estrellas.</b-alert>
              
            </b-col>

        </b-row>
        <br/>
        <b-row>
            <b-col class="col-12">
                <label for="rating-lg" class="mt-3" style="font-weight: bold;">	¿Cómo calificaría la calidad de nuestros resultados?</label>
                <ValidationProvider name="valoración 2" rules="required|min:1" v-slot="validationContext">
                    <b-form-rating :state="getValidationState(validationContext)" variant="warning" id="rating-lg" v-model="Valoracion_2" size="lg"></b-form-rating>

                    <b-row class="d-flex justify-content-between" style="padding-left:70px; padding-right:70px">

                        <div>Muy malo</div>
                        <div>Malo</div>
                        <div>Regular</div>
                        <div>Bueno</div>
                        <div>Excelente</div>
                    </b-row>
                </ValidationProvider>
                <b-alert fade  class="text-center" dismissible @dismissed="valoracion_faltante_2 = false" :show="valoracion_faltante_2" variant="warning">La valoración debe ser entre 1 a 5 estrellas.</b-alert>
            </b-col>

            
        </b-row>
        <br/>
        <b-row>
            <b-col class="col-12">
                 <label for="rating-lg" class="mt-3" style="font-weight: bold;">En general, ¿qué tan satisfecho/a o insatisfecho/a está con UCN-LSA?</label>
                <ValidationProvider name="valoración 3" rules="required|min:1" v-slot="validationContext">
                    <b-form-rating :state="getValidationState(validationContext)" variant="warning" id="rating-lg" v-model="Valoracion_3" size="lg"></b-form-rating>

                    <b-row class="d-flex justify-content-between" style="padding-left:25px; padding-right:50px">

                        
                        <div>Muy insatisfecho</div>
                        <div>insatisfecho</div>
                        <div>Regular</div>
                        <div>satisfecho</div>
                        <div>Muy satisfecho</div>
                    </b-row>
                </ValidationProvider>
                <b-alert fade  class="text-center" dismissible @dismissed="valoracion_faltante_3 = false" :show="valoracion_faltante_3" variant="warning">La valoración debe ser entre 1 a 5 estrellas.</b-alert>
               
            </b-col>

            <b-col class="col-12">
                <hr />

                <label for="observacion" class="mt-3" style="font-weight: bold;">Observaciones</label>
                <ValidationProvider name="de observaciones" rules="required" v-slot="validationContext">
                    <b-form-textarea :state="getValidationState(validationContext)" id="observacion" v-model="Observacion" placeholder="Ingrese observaciones del servicio..." rows="3" max-rows="6"></b-form-textarea>

                    <b-form-invalid-feedback id="valoracion-live-feedback">{{
                       validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <template #modal-footer>
            <b-overlay :show="Cargando"  opacity="0.6" spinner-small spinner-variant="primary" >
            <b-button @click="enviarFormulario" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Enviar encuesta
            </b-button>
</b-overlay>
        </template>
    </b-modal>
</validation-observer>
</template>



<script>
import MuestraService from '@/helpers/api-services/Muestra-solicitante.service';
export default {

    watch: {
        encuestaData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL", this.encuestaData)
            this.Observacion = ""
            this.Valoracion = ""
            this.valoracion_faltante_1 = false;
            this.valoracion_faltante_2 = false;
            this.valoracion_faltante_3 = false;
            this.Cargando = false;
            this.RUM = this.encuestaData.RUM;
            }
        }
    },
    props: {
        encuestaData: Object
    },
    methods: {
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        enviarFormulario() {
this.Cargando = true;
            this.$refs.form.validate().then(success => {
                if (!success) {
                    this.Cargando = false;
                    if(this.Valoracion_1 == ""){
                        this.valoracion_faltante_1 = true;
                    }
                    if(this.Valoracion_2 == ""){
                        this.valoracion_faltante_2 = true;
                    }
                    if(this.Valoracion_3 == ""){
                        this.valoracion_faltante_3 = true;
                    }
                    return;
                } else {
                    var data = {
                        RUM: this.RUM,
                        puntaje_pregunta_1: this.Valoracion_1,
                        puntaje_pregunta_2: this.Valoracion_2,
                        puntaje_pregunta_3: this.Valoracion_3,
                        observaciones: this.Observacion,
                
                    }
                    MuestraService.responderEncuesta(data).then((response) => {
                        if(response.status == 200){
                            console.log("encuesta registrada");
                            this.$bvToast.toast(`Encuesta respondida exitosamente.`, {
                                title: 'Éxito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$emit('refrescar');

                            this.$bvModal.hide('modal-encuesta-solicitante');
                            this.Cargando = false;
                            this.reiniciarDatos();
                        }else{
                            this.Cargando = false;
                            this.$bvToast.toast(`Error al enviar encuesta.`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                        }
                    })
                  console.log("enviando encuesta")
                }

            });

        }

    },
    data() {
        return {
            Observacion: "",
            Valoracion_1: "",
            Valoracion_2: "",
            Valoracion_3: "",
           valoracion_faltante_1: false,
           valoracion_faltante_2: false,
           valoracion_faltante_3: false,
            Cargando: false,
            RUM: ""
        }
    },
}
</script>

<style lang="">

</style>
