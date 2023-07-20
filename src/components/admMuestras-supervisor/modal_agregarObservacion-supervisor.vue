<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-agregar-observacion-supervisor" ref="modal" title="Agregar orden de compra" size="md">

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->

                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Administrar orden de compra</div>

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
                        Guardar observación
                    </b-button>
                </b-overlay>
            </template>

            <b-row class="d-flex justify-content-center">
                <b-col class="col-12">

                    <label for="input-live">Observación:</label>
                    <ValidationProvider name="observación" rules="required" v-slot="validationContext">
                        <b-form-textarea id="textarea" v-model="observacion" :state="getValidationState(validationContext)"
                            placeholder="Ingrese observación..." rows="3" max-rows="6"></b-form-textarea>

                        <b-form-invalid-feedback id="fecha-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>

                </b-col>
                <br />

            </b-row>

        </b-modal>
    </validation-observer>
</template>

<script>
import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';
import {
    getUserInfo
} from "@/helpers/api-services/Auth.service";
//import { now } from 'moment';
export default {
    watch: {
        muestraData: {
            handler() {
                this.RUM = this.muestraData.RUM;
                this.rut_empleado = getUserInfo().rut;
                this.reiniciarDatos();
      
            }
        }
    },
    props: {
        muestraData: Object,
    },
    data() {
        return {
            observacion: "",
            fecha_emision: "",
            busy: false,
            rut_empleado: "",
            RUM: ""

        }
    },
    methods: {
        onContext(ctx) {

            // Setear fecha a su version formateada de dd/mm/yyyy
            console.log(ctx)
            this.FechaFormatted = ctx.selectedFormatted

        },
        reiniciarDatos() {
            this.observacion = "";
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

                    var data = {
                        fecha_emision: Date.now(),
                        observaciones: this.observacion,
                        RUM: this.RUM,
                        rut_empleado: this.rut_empleado
                    }

                    
                    this.busy = true;
                    MuestraSupervisorService.crearObservacionMuestra(data).then((response) => {
                        this.busy = false;
                        console.log(response);
                        if (response.request.status == 200) {
                            this.$bvToast.toast(`Creación de la observación ha sido exitosa`, {
                                title: 'Exito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$emit('refrescar');
                            this.$bvModal.hide('modal-agregar-observacion-supervisor');
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
}</style>
