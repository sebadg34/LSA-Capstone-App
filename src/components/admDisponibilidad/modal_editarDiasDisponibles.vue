<template>
<b-modal centered id="modal-editar-dias-disponibles" ref="modal" title="Modificar días disponibles" size="lg">
    <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Editar fechas</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>
    <validation-observer ref="form">
        

        <b-col class="col-8 mx-auto">

            <br />
            <b-row class="d-flex justify-content-between">

                <div>Días de vacaciones:
                </div>
                <div>
                    <ValidationProvider name="días vacaciones" rules="required|numeric" v-slot="validationContext">

                        <b-form-input id="input-live" v-model="DiasVacaciones" aria-describedby="input-live-help movil-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="vacaciones-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>

                    </ValidationProvider>
                </div>
            </b-row>
            <b-row class="d-flex justify-content-between">
                <div>Días administrativos:
                </div>
                <div>
                    <ValidationProvider name="días administrativos" rules="required|numeric" v-slot="validationContext">

                        <b-form-input id="input-live" v-model="DiasAdministrativos" aria-describedby="input-live-help movil-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="administrativos-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>

                    </ValidationProvider>
                </div>
            </b-row>
        </b-col>

    </validation-observer>
    <template #modal-footer>

        <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Editar fechas y cerrar
        </b-button>

    </template>
</b-modal>
</template>

<script>
import disponibilidadService from "@/helpers/api-services/Disponibilidad.service"

export default {
    watch: {
        userData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                if (this.userData.dias_vacaciones_disponibles != null) {
                    this.DiasVacaciones = this.userData.dias_vacaciones_disponibles;
                } else {
                    this.DiasVacaciones = 0;
                }
                if (this.userData.dias_administrativos != null) {
                    this.DiasAdministrativos = this.userData.dias_administrativos;
                } else {
                    this.DiasAdministrativos = 0;
                }
                this.Rut = this.userData.rut_empleado;
            }
        }
    },
    props: {
        userData: Object
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

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    var data = {
                        dias_vacaciones_disponibles: this.DiasVacaciones,
                        dias_administrativos: this.DiasAdministrativos,
                        rut_empleado: this.Rut
                    }
                    console.log("data a enviar", data)
                    disponibilidadService.editarDiasDisponibles(data).then((response) => {
                        console.log(response)
                        if(response.status == 200){
                            this.$bvToast.toast(`Cambio de dias disponibles realizado con exito`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                            this.$emit('refrescar');
                            this.$bvModal.hide('modal-editar-fechas');
                        }else{
                            this.$bvToast.toast(`Error al cambiar dias disponibles`, {
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
    data() {
        return {
            DiasDisponibles: 0,
            CargandoArchivos: false,
            busy: false,
            DiasVacaciones: 0,
            DiasAdministrativos: 0,
            Rut: "",
        }
    },
}
</script>

<style lang="">

</style>
