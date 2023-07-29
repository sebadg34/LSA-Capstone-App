<template>
    <validation-observer ref="form">
    <b-modal centered id="modal-cambiar-password" ref="modal" title="Cambo contraseña" size="sm"> 

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->

                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Cambiar contraseña</div>

                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <b-row class="pb-2">
                

                    <b-col class="col-12">
                        
                        <label for="contraseña-actual">Contraseña actual:</label>
                        <b-form-input type="password" size="sm" class="mb-1" id="contraseña-actual"
                            v-model="password_actual" aria-describedby="input-live-help" placeholder=""
                            trim></b-form-input>
                        
                  

                    <ValidationProvider name="contraseña" rules="required|min:2|max:15|confirmed:password_nueva_confirmacion" v-slot="validationContext">
                        <label for="contraseña-nueva">Contraseña nueva:</label>
                        <b-form-input size="sm" type="password" class="mb-1" id="contraseña-nueva" :state="getValidationState(validationContext)"
                            v-model="password_nueva" aria-describedby="input-live-help " placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="password-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                    <ValidationProvider name="confirmación de contraseña" rules="required"  v-slot="validationContext" vid="password_nueva_confirmacion">
                        <label for="contraseña-nueva-confirmacion">Confirme la contraseña nueva:</label>
                        <b-form-input type="password" size="sm" class="mb-1" id="contraseña-nueva-confirmacion" :state="getValidationState(validationContext)"
                            v-model="password_nueva_confirmacion" aria-describedby="input-live-help" placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="password_confirmation-live-feedback">
                            {{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                    
                   
                </b-col>
            </b-row>
            


            <template #modal-footer>
                <b-overlay :show="Cargando" rounded opacity="0.6" spinner-small spinner-variant="primary"
                    class="d-inline-block">

                    <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button"
                        style="font-weight:bold">
                        Cambiar contraseña
                    </b-button>
                </b-overlay>
            </template>
          


        </b-modal>
    </validation-observer>
</template>

<script>
import usuarioService from "@/helpers/api-services/Auth.service"
export default {

    data() {

        return {
            Cargando: false,
            password_actual:"",
            password_nueva:"",
            password_nueva_confirmacion:""
        }
    },
    methods: {
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
         reiniciarDatos() {
            this.password_actual=""
            this.password_nueva=""
            this.password_nueva_confirmacion=""

        },
        enviarFormulario() {
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    this.Cargando = true;
                   
                    var data = {
                   old_password:this.password_actual,
                   new_password: this.password_nueva,
                   new_password_confirmation: this.password_nueva_confirmacion

                    }
                   
                    console.log("data a enviar", data)
                    usuarioService.cambiarPassword(data).then((response) => {
                        this.Cargando = false;
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`La contraseña ha sido actualizada.`, {
                                    title: 'Éxito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.reiniciarDatos();
                                this.$bvModal.hide('modal-cambiar-password')
                            }
                            
                        } else {
                            this.$bvToast.toast(`Error al cambiar la contraseña.`, {
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
    }
}
</script>

<style lang="scss">.custom-file-input:lang(en)~.custom-file-label::after {
    content: 'Buscar';
}</style>
