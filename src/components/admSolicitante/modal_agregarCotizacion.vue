<template>
<validation-observer ref="form">
    <b-modal centered id="modal-cotizacion-solicitante" ref="modal" title="Agregar Cotización" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Cotización</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <template #modal-footer>

            <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Subir archivo
            </b-button>

        </template>

      
            <b-row class="d-flex justify-content-center">
                <b-col class="col-8">

                    <div>Fecha emisión:
                    </div>
                    <ValidationProvider name="fecha" rules="required" v-slot="validationContext">
                    <b-form-datepicker  :min="minDate" @context="onContext" :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" placeholder="seleccione fecha" :state="getValidationState(validationContext)" v-model="Fecha" id="datepicker-dateformat2" locale="es"></b-form-datepicker>
                    <b-form-invalid-feedback id="fecha-live-feedback">{{
                       validationContext.errors[0] }}
            </b-form-invalid-feedback>
        </ValidationProvider>


<br/>
<div>Archivo:
                    </div>
        <ValidationProvider name="archivo" rules="required" v-slot="validationContext">
            
                <b-form-file placeholder="seleccione archivo" browse-text="Buscar" :state="getValidationState(validationContext)" v-model="Archivo" id="file-large" size="md"></b-form-file>
                <b-form-invalid-feedback id="archivo-live-feedback">{{
                        validationContext.errors[0] }}
            </b-form-invalid-feedback>
            <div class="mt-3">Archivo seleccionado: 
                <b-list-group-item v-if="Archivo" style="padding:10px; font-weight: bold;" class="d-flex justify-content-between"> {{ Archivo ? Archivo.name : '' }}
               
                    <b-button variant="danger" @click="Archivo = null" style="padding:2px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                        <b-icon icon="x"></b-icon>
                    </b-button>
                    </b-list-group-item>
                 </div>
           
        </ValidationProvider>

                </b-col>
            </b-row>

           

        

    </b-modal>
</validation-observer>
</template>

<script>
import solicitanteService from "@/helpers/api-services/Solicitante.service"
export default {
    watch: {
        userData: {
            handler() {
                this.reiniciarDatos();
            }
        }
    },
    props: {
        userData: Object
    },
    data() {
        const now = new Date()
        return {
            Archivo: null,
            Fecha: "",
            FechaFormatted: "",
            minDate: now
            
        }
    },
    methods: {
        onContext(ctx) {
        
        // Setear fecha a su version formateada de dd/mm/yyyy
        console.log(ctx)
        this.FechaFormatted = ctx.selectedFormatted

      },
        reiniciarDatos() {
            this.Archivo = null,
                this.Fecha = "",
                this.FechaFormatted = ""
        },
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    let formData = new FormData();
                    formData = {
                        rut_solicitante: this.userData.rut_solicitante,
                        fecha_emision: this.FechaFormatted,
                    }
                    formData.documento_cotizacion = this.Archivo;
                    console.log("data a enviar", formData);
                    solicitanteService.agregarCotizacion(formData).then((response) => {
                        console.log(response);
                        if (response.request.status == 200) {
                            this.$bvToast.toast(`Guardado de cotización exitoso`, {
                                title: 'Exito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$emit('refrescar');
                            this.$bvModal.hide('modal-cotizacion-solicitante');
                            this.reiniciarDatos();
                        }
                    })

                }
            });

        }
    }
}
</script>

<style lang="scss">
.custom-file-input:lang(en)~.custom-file-label::after {
    content: 'Buscar';
}
</style>
