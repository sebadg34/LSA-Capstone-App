<template lang="">
<validation-observer ref="form">
    <b-modal id="modal-empresa" ref="modal" title="Agregar Empresa" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Empresa</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-6">
                <label for="input-live">Nombre:</label>
                <ValidationProvider name="nombre" rules="required" v-slot="validationContext">

                    <b-form-input id="rut-input" class="mb-1" v-model="Nombre" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="nombre_abreviado" rules="required" v-slot="validationContext">
                    <label for="input-live">Nombre abreviado:</label>
                    <b-form-input class="mb-1" id="apellido-input" v-model="Nombre_abreviado" :state="getValidationState(validationContext)" aria-describedby="input-live-help apellido-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="apellido-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="nombre" rules="required" v-slot="validationContext">
                    <label for="input-live">Correo electrónico:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Correo" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="nombre-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
            <b-col class="col-6">
                <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">
                    <label for="input-live">Rut:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Rut" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="razon" rules="required" v-slot="validationContext">
                    <label for="input-live">Razón Social:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Razon_social" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="razon-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="giro" rules="required" v-slot="validationContext">
                    <label for="input-live">Giro:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Giro" aria-describedby="input-live-help correo-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="giro-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <hr>

        <template #modal-footer>

            <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Crear y Guardar
            </b-button>

        </template>

    </b-modal>
</validation-observer>
</template>

<script>
import empresaService from "@/helpers/api-services/Empresa.service"
export default {

    data() {

        return {
            Nombre: "",
            Nombre_abreviado: "",
            Correo: "",
            Rut: "",
            Razon_social: "",
            Giro: "",

        }
    },
    methods: {
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        }
    ,enviarFormulario() {
            
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {

                    var data = {
                     
                    }
                    console.log("data a enviar", data)
                    empresaService.ingresarEmpresa(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Creación de empresa exitosa`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-empresa')
                        } else {
                            this.$bvToast.toast(`Error al crear empresa`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                        }

                    })

                }

            });
    }
    },
        
}
</script>

<style lang="">

</style>
