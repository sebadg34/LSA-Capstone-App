<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-cotizacion-solicitante" ref="modal" title="Agregar Cotización" size="md">

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->

                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Agregar cotización</div>

                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <template #modal-footer>
                <b-overlay :show="busy" rounded opacity="0.6" spinner-small spinner-variant="primary"
                    class="d-inline-block">
                    <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button"
                        style="font-weight:bold">
                        Subir archivo
                    </b-button>
                </b-overlay>
            </template>


            <b-row class="d-flex justify-content-center">
                <b-col class="col-6">
                    <ValidationProvider name="número cotización" rules="required|numeric" v-slot="validationContext">
                        <label for="input-live">Número de cotización:</label>
                        <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)"
                            v-model="Numero_cotizacion" aria-describedby="input-live-help numero-live-feedback"
                            placeholder="" trim></b-form-input>
                        <b-form-invalid-feedback id="nombre-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                </b-col>
                <b-col class="col-6">

                    
                    <label for="input-live">Fecha de emisión:</label>
                    <ValidationProvider name="fecha" rules="required" v-slot="validationContext">
                        <b-form-datepicker :min="minDate" :max="maxDate" @context="onContext"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            placeholder="Seleccione una fecha." :state="getValidationState(validationContext)" v-model="Fecha"
                            id="datepicker-dateformat2" locale="es"></b-form-datepicker>
                        <b-form-invalid-feedback id="fecha-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>

                </b-col>
                    <br />
                    <b-col class="col-12">
                    <div>Archivo:
                    </div>
                    <ValidationProvider name="archivo" rules="required|size:5000" v-slot="validationContext">

                        <b-form-file placeholder="Seleccione un archivo." browse-text="Buscar"
                            :state="getValidationState(validationContext)" v-model="Archivo" id="file-large"
                            size="md"></b-form-file>
                        <b-form-invalid-feedback id="archivo-live-feedback">
                            El archivo no puede pesar mas de 5MB.
                        </b-form-invalid-feedback>
                        <div class="mt-3">Archivo seleccionado:
                            <b-list-group-item v-if="Archivo" style="padding:10px; font-weight: bold;"
                                class="d-flex justify-content-between"> {{ Archivo ? Archivo.name : '' }}

                                <b-button variant="danger" @click="Archivo = null"
                                    style="padding:2px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
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
        const max = new Date()
        const min = new Date()
        min.setMonth(min.getMonth() - 6)
        max.setMonth(max.getMonth() + 6);
        return {
            busy: false,
            Archivo: null,
            Fecha: "",
            FechaFormatted: "",
            minDate: min,
            maxDate: max,
            Numero_cotizacion: ""

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
                this.Fecha = ""
                this.FechaFormatted = ""
                this.Numero_cotizacion = ""
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
                        numero_cotizacion: this.Numero_cotizacion
                    }
                    formData.documento_cotizacion = this.Archivo;
                    formData.enctype = "multipart/form-data";
                    console.log("data a enviar", formData);
                    this.busy = true;
                    solicitanteService.agregarCotizacion(formData).then((response) => {
                        this.busy = false;
                        console.log(response);
                        if (response.request.status == 200) {
                            this.$bvToast.toast(`Guardado de cotización exitoso.`, {
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
