<template lang="">
<validation-observer ref="form">
    <b-modal id="modal-empresa" ref="modal" title="Agregar Empresa" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar cliente</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-6">
                <label for="input-live">Nombre del cliente:</label>
                <ValidationProvider name="nombre del cliente" rules="required|min:2" v-slot="validationContext">

                    <b-form-input size="sm" class="mb-1" v-model="Nombre" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback" trim></b-form-input>

                    <b-form-invalid-feedback id="nombre-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <ValidationProvider name="nombre abreviado" rules="required" v-slot="validationContext">
                    <label for="input-live">Nombre abreviado:</label>
                    <b-form-input size="sm" class="mb-1" id="apellido-input" v-model="Nombre_abreviado" :state="getValidationState(validationContext)" aria-describedby="input-live-help apellido-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="nombre_abreviado-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Correo electrónico:</label>
                <ValidationProvider name="correo electrónico" rules="required" v-slot="validationContext">
                    <b-overlay :show="Revisando_correo && validationContext.errors[0] == null" rounded opacity="0.6" spinner-small spinner-variant="primary">
                        <b-form-input @blur.native="revisarCorreoEmpresa" size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Correo" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                        <b-form-invalid-feedback id="correo-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                        <b-alert fade style="margin:2px; padding:2px;" class="text-center" :show="Correo_ocupado" variant="warning">El correo ya está registrado en el sistema</b-alert>
                    </b-overlay>
                </ValidationProvider>
            </b-col>
            <b-col class="col-6">

                <ValidationProvider name="RUT" rules="required|rut|rutSinPuntoGuion" v-slot="validationContext">

                    <label for="input-live">RUT:</label>
                    <!--Mostrar estado cargando solo si se esta revisando rut y no hay errores de validacion (rut valido)-->
                    <b-overlay :show="Revisando_rut && validationContext.errors[0] == null" rounded opacity="0.6" spinner-small spinner-variant="primary">
                        <b-form-input size="sm" @blur.native="revisarRutEmpresa" class="mb-1" id="rut_empresa" :state="getValidationState(validationContext)" v-model="Rut" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>

                        <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-overlay>
                    <b-alert fade style="margin:2px; padding:2px;" class="text-center" :show="Rut_ocupado" variant="warning">El rut ya está registrado en el sistema</b-alert>

                </ValidationProvider>
                <ValidationProvider name="razón social" rules="required" v-slot="validationContext">
                    <label for="input-live">Razón social:</label>
                    <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Razon_social" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="razon-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="giro" rules="required" v-slot="validationContext">
                    <label for="input-live">Giro:</label>
                    <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Giro" aria-describedby="input-live-help correo-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="giro-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <hr>
        <div>
            <div>Direcciones</div>
            <br />
            <div></div>
            <div class="form-group" v-for="(input,k) in direcciones" :key="k">

                <b-row padding="0">
                    <b-col class="col-4">
                        <ValidationProvider :name="'ciudad ' + (k+1)" rules="required" v-slot="validationContext">
                            <b-form-input :state="getValidationState(validationContext)" :placeholder="'Ciudad '+(parseInt(k) +1)" style="height:30px" type="text" class="form-control" v-model="input.ciudad" />

                            <b-form-invalid-feedback id="ciudad-live-feedback">{{
                        validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </ValidationProvider>
                    </b-col>
                    <b-col class="col-6">
                        <ValidationProvider :name="'direccion ' + (k+1)" rules="required" v-slot="validationContext">
                            <b-form-input :state="getValidationState(validationContext)" :placeholder="'Dirección ' + (parseInt(k) +1)" style="height:30px" type="text" class="form-control" v-model="input.direccion" />
                            <b-form-invalid-feedback id="ciudad-live-feedback">{{
                        validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </ValidationProvider>
                    </b-col>
                    <b-col class="col-2">
                        <b-button-group>
                            <b-button variant="danger" @click="remove(k)" v-if="k || ( !k && direcciones.length > 1)" style="padding:2px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                <b-icon icon="trash-fill"></b-icon>
                            </b-button>
                            <b-button variant="success" @click="add(k)" v-if="k == direcciones.length-1" style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                <b-icon icon=" plus-circle-fill"></b-icon>
                            </b-button>
                        </b-button-group>

                    </b-col>

                </b-row>

                <span>

                </span>

            </div>

        </div>
        <template #modal-footer>
            <b-overlay :show="Cargando" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">

                <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                    Crear y guardar
                </b-button>
            </b-overlay>
        </template>

    </b-modal>
</validation-observer>
</template>

<script>
import empresaService from "@/helpers/api-services/Empresa.service"
export default {

    data() {

        return {
            Cargando: false,
            direcciones: [{
                ciudad: '',
                direccion: ''
            }],
            dataDirecciones: "",
            Nombre: "",
            Nombre_abreviado: "",
            Correo: "",
            Rut: "",
            Rut_ocupado: false,
            Revisando_rut: false,
            Correo_ocupado: false,
            Revisando_correo: false,
            Razon_social: "",
            Giro: "",

        }
    },
    methods: {
        reiniciarDatos() {
            this.direcciones = [{
                ciudad: '',
                direccion: ''
            }];
            this.dataDirecciones = "";
            this.Nombre = "";
            this.Nombre_abreviado = "";
            this.Correo = "";
            this.Rut = "";
            this.Rut_ocupado = false;
            this.Revisando_rut = false;
            this.Correo_ocupado = false;
            this.Revisando_rut = false;
            this.Razon_social = "";
            this.Giro = "";

        },
        revisarRutEmpresa() {

            var data = {
                "rut_empresa": this.Rut
            }
            if (this.Rut != "") {
                this.Revisando_rut = true;
                empresaService.existeEmpresa(data).then((response) => {
                    if (response != null) {
                        if (response.status == 200) {
                            this.Rut_ocupado = true;
                            this.Revisando_rut = false;

                        } else {
                            this.Rut_ocupado = false;
                            this.Revisando_rut = false;
                        }
                    } else {
                        this.Rut_ocupado = false;
                        this.Revisando_rut = false;
                    }
                })
            } else {
                this.Rut_ocupado = false;
                this.Revisando_rut = false;
            }

        },
        revisarCorreoEmpresa() {
            var data = {
                "correo": this.Correo
            }
            if (this.Correo != "") {
                this.Revisando_correo = true;
                empresaService.existeCorreoEmpresa(data).then((response) => {
                    if (response != null) {
                        if (response.status == 200) {
                            this.Correo_ocupado = true;
                            this.Revisando_correo = false;
                        } else {
                            this.Correo_ocupado = false;
                            this.Revisando_correo = false;
                        }
                    } else {
                        this.Correo_ocupado = false;
                        this.Revisando_correo = false;
                    }
                })
            } else {
                this.Correo_ocupado = false;
                this.Revisando_correo = false;
            }

        },
        add() {
            this.direcciones.push({
                ciudad: '',
                direccion: ''
            })
            console.log(this.direcciones)
        },

        remove(index) {
            this.direcciones.splice(index, 1)
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

                    this.Cargando = true;
                    var rutData = {
                        rut_empresa: this.Rut
                    }
                    this.dataDirecciones = this.direcciones.slice(0);

                    this.dataDirecciones.unshift(rutData)

                    console.log(this.dataDirecciones)
                    var data = {
                        'rut_empresa': this.Rut,
                        'nombre_empresa': this.Nombre,
                        'nombre_abreviado': this.Nombre_abreviado,
                        'correo': this.Correo,
                        'razon_social': this.Razon_social,
                        'giro': this.Giro,
                        'direcciones': this.dataDirecciones,
                        'estado': true
                    }

                    console.log("data a enviar", data)
                    empresaService.ingresarEmpresa(data).then((response) => {
                        console.log(response)
                        this.Cargando = false;
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Creación de cliente exitosa.`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-empresa')
                            this.reiniciarDatos();
                            this.$refs.form.reset();

                        } else {
                            this.$bvToast.toast(`Error al registrar cliente.`, {
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
