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
                <b-alert fade  class="text-center" dismissible @dismissed="valoracion_faltante = false" :show="valoracion_faltante" variant="warning">La valoración debe ser entre 1 a 5 estrellas.</b-alert>
                <label for="rating-lg" class="mt-3" style="font-weight: bold;">¿Qué te pareció el servicio?</label>
                <ValidationProvider name="valoración" rules="required|min:1" v-slot="validationContext">
                    <b-form-rating :state="getValidationState(validationContext)" variant="warning" id="rating-lg" v-model="Valoracion" size="lg"></b-form-rating>

                    <b-row class="d-flex justify-content-between" style="padding-left:70px; padding-right:70px">

                        <div>Muy malo</div>
                        <div>Malo</div>
                        <div>Regular</div>
                        <div>Bueno</div>
                        <div>Excelente</div>
                    </b-row>
                </ValidationProvider>
                
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
            this.valoracion_faltante = false;
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
                    if(this.Valoracion != null){
                        this.valoracion_faltante = true;
                    }
                    return;
                } else {
                    var data = {
                        puntaje: this.Valoracion,
                        observaciones: this.Observacion,
                        RUM: this.RUM
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
            Valoracion: "",
            valoracion_faltante: false,
            Cargando: false,
            RUM: ""
        }
    },
}
</script>

<style lang="">

</style>
