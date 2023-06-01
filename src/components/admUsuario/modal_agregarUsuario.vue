<template>
    <validation-observer ref="form">
        <b-modal id="modal-usuario" ref="modal" title="Agregar Usuario" size="lg">

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->

                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Agregar Usuario</div>

                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <b-row class="pb-2">
                
                  

               
                <b-col class="col-6">
                    <ValidationProvider name="nombre" rules="required|min:2" v-slot="validationContext">
                        <label for="input-live">Nombre:</label>
                        <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)"
                            v-model="Nombre" aria-describedby="input-live-help nombre-live-feedback" placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="nombre-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>

                    <ValidationProvider name="de apellidos" rules="required" v-slot="validationContext">
                        <label for="input-live">Apellido:</label>
                        <b-form-input size="sm" class="mb-1" id="apellido-input" v-model="Apellidos"
                            :state="getValidationState(validationContext)"
                            aria-describedby="input-live-help apellido-live-feedback" placeholder="" trim></b-form-input>
                        <b-form-invalid-feedback id="apellido-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>

                    
                    <ValidationProvider name="correo" rules="required|email" v-slot="validationContext">
                        <label for="input-live">Correo:</label>
                        <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)"
                            v-model="Correo" aria-describedby="input-live-help correo-live-feedback" placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="correo-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>


                </b-col>

                    <b-col class="col-6">
                    <ValidationProvider name="contraseña" rules="required|confirmed:password_confirmation" v-slot="validationContext">
                        <label for="input-live">Contraseña:</label>
                        <b-form-input size="sm" type="password" class="mb-1" id="input-live" :state="getValidationState(validationContext)"
                            v-model="password" aria-describedby="input-live-help correo-live-feedback" placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="password-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                    <ValidationProvider name="confirmación de contraseña"  v-slot="validationContext" vid="password_confirmation">
                        <label for="input-live">Confirme contraseña:</label>
                        <b-form-input type="password" size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)"
                            v-model="password_confirmation" aria-describedby="input-live-help correo-live-feedback" placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="password_confirmation-live-feedback">
                            {{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>

                    <ValidationProvider name="cargo" rules="required" v-slot="validationContext">
                        <label for="input-live">Cargo:</label>
                        <b-form-select size="sm" aria-describedby="cargo-live-feedback"
                            :state="getValidationState(validationContext)" class="mb-1" v-model="Cargo"
                            :options="cargos"></b-form-select>
                        <b-form-invalid-feedback id="cargo-live-feedback">{{
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
                        Crear y Guardar
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
            Nombre: "",
            Rut: "",
            password: "",
            password_confirmation: "",
            Correo: "",
            Apellidos: "",
            Cargo: "",
            cargos: [{
                value: 1,
                text: 'Gerente'
            },
            {
                value: 2,
                text: 'Jefe(a) de laboratorio'
            },
            {
                value: 6,
                text: 'Supervisor(a)'
            },
            {
                value: 7,
                text: 'Administrador(a) de Finanzas'
            },
            {
                value: 4,
                text: 'Analista Químico'
            },
            {
                value: 3,
                text: 'Químico'
            },{
                value: 5,
                text: 'Solicitante'
            }
            ,{
                value: 8,
                text: 'Recepcionista'
            },{
                value: 0,
                text: 'Administrador'
            },
            ],
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
            this.Nombre = ""
            this.Apellidos = ""
            this.password = ""
            this.password_confirmation = ""
            this.Cargo = ""
            this.Rut = ""

        },
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    this.Cargando = true;
                   
                    var data = {
                        "nombre": this.Nombre,
                        "apellido": this.Apellidos,
                        "email": this.Correo,
                        "password": this.password,
                        "password_confirmation": this.password_confirmation,
                        "role": this.Cargo,
                        "rut": ''
                    }
                   
                    console.log("data a enviar", data)
                    usuarioService.register(data).then((response) => {
                        this.Cargando = false;
                        console.log(response)
                        if (response != null) {
                            if (response.status == 201) {
                                this.$bvToast.toast(`Usuario creado`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                                this.$bvModal.hide('modal-usuario')
                            }else if(response.status == 422){
                            this.$bvToast.toast(`Error, la contraseña no coincide con la confirmación`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                            }
                            
                        } else {
                            this.$bvToast.toast(`Error al crear usuario`, {
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
