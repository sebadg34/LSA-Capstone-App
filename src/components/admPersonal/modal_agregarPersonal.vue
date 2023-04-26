or<template>
<validation-observer v-slot="{ invalid }">
    <b-modal id="modal-personal" ref="modal" title="Agregar Personal" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Personal</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-6">
                <label for="input-live">Rut:</label>
                <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">

                    <b-form-input id="rut-input" class="mb-1" v-model="Rut" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="de apellidos" rules="required" v-slot="validationContext">
                    <label for="input-live">Apellidos:</label>
                    <b-form-input class="mb-1" id="apellido-input" v-model="Apellidos" :state="getValidationState(validationContext)" aria-describedby="input-live-help apellido-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="apellido-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

            </b-col>
            <b-col class="col-6">
                <ValidationProvider name="nombre" rules="required" v-slot="validationContext">
                    <label for="input-live">Nombres:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Nombre" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="nombre-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="correo" rules="required" v-slot="validationContext">
                    <label for="input-live">Correo:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Correo" aria-describedby="input-live-help correo-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="correo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <hr>

        <b-row class="pt-2">
            <b-col class="col-6">
                <label for="input-live">Telefono Movil:</label>
                <ValidationProvider name="Nro. movil" rules="required|numeric" v-slot="validationContext">
                    <b-input-group class="mb-1">

                        <b-input-group-prepend is-text>
                            +56 9
                        </b-input-group-prepend>
                        <b-form-input id="input-live" v-model="Movil" aria-describedby="input-live-help movil-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="movil-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-input-group>

                </ValidationProvider>
                <label for="input-live">Contacto Emergencia:</label>
                <ValidationProvider name="Nro. emergencia" rules="required|numeric" v-slot="validationContext">
                    <b-input-group class="mb-1">

                        <b-input-group-prepend is-text>
                            +56 9
                        </b-input-group-prepend>
                        <b-form-input id="input-live" v-model="Emergencia" aria-describedby="input-live-help emergencia-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="emergencia-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-input-group>
                </ValidationProvider>
            </b-col>
            <b-col class="col-6">
                <ValidationProvider name="cargo" rules="required" v-slot="validationContext">
                    <label for="input-live">Cargo:</label>
                    <b-form-select aria-describedby="cargo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Cargo" :options="cargos"></b-form-select>
                    <b-form-invalid-feedback id="cargo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="tipo" rules="required" v-slot="validationContext">
                    <label for="input-live">Tipo Trabajador:</label>
                    <b-form-select aria-describedby="tipo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Tipo" :options="tipos"></b-form-select>
                    <b-form-invalid-feedback id="tipo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>

        <template #modal-footer>

            <b-button @click="enviarFormulario()" :disabled="invalid" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Crear y Guardar
            </b-button>

        </template>

    </b-modal>
</validation-observer>
</template>

<script>
import personalService from "@/helpers/api-services/Personal.service"
export default {
    data() {
        return {
            Nombre: "",
            Rut: "",
            Correo: "",
            Apellidos: "",
            Movil: "",
            Emergencia: "",
            Cargo: "",
            Tipo: "",
            tipos: [{
                    value: 'practicante',
                    text: 'Practicante'
                },
                {
                    value: 'plazofijo',
                    text: 'Contrato Plazo Fijo'
                },
                {
                    value: 'plazoindefinido',
                    text: 'Contrato Plazo Indefinido'
                },
                {
                    value: 'honorario',
                    text: 'Contrato Honorario'
                },
            ],
            cargos: [{
                    value: 'gerente',
                    text: 'Gerente'
                },
                {
                    value: 'jefe',
                    text: 'Jefe(a) de laboratorio'
                },
                {
                    value: 'supervisor',
                    text: 'Supervisor(a)'
                },
                {
                    value: 'finanzas',
                    text: 'Administrador de finanzas'
                },
                {
                    value: 'analista',
                    text: 'Analista Químico'
                },
                {
                    value: 'quimico',
                    text: 'Químico'
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
        enviarFormulario() {
            var data = {
                "rut_empleado": this.Rut,
                "nombre": this.Nombre,
                "apellido": this.Apellidos,
                "correo": this.Correo,
                "contraseña": "",
                "rol": this.Cargo,
                "estado": "activo",
                "fecha_inicio_vacaciones": "",
                "fecha_termino_vacaciones": "",
                "dias_administrativos": ""
            }
            personalService.ingresarPersonal(data).then((response) => {
                console.log(response)
            })
            this.$bvToast.toast(`Creación de personal exitosa`, {
                title: 'Exito',
                toaster: 'b-toaster-top-center',
                solid: true,
                variant: "success",
                appendToast: true
            })

        }
    }
}
</script>

<style lang="">

</style>
