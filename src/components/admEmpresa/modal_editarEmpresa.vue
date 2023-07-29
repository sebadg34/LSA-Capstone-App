<template lang="">
<validation-observer ref="form">
    <b-modal id="modal-editar-empresa" ref="modal" title="Agregar Empresa" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Editar cliente</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-6">
                <label for="input-live">Nombre del cliente:</label>
                <ValidationProvider name="nombre" rules="required|min:2" v-slot="validationContext">

                    <b-form-input size="sm" class="mb-1" v-model="Nombre" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback" trim></b-form-input>

                    <b-form-invalid-feedback id="nombre-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <ValidationProvider name="nombre_abreviado" rules="required" v-slot="validationContext">
                    <label for="input-live">Nombre abreviado:</label>
                    <b-form-input size="sm" class="mb-1" id="apellido-input" v-model="Nombre_abreviado" :state="getValidationState(validationContext)" aria-describedby="input-live-help apellido-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="nombre_abreviado-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="correo" rules="required" v-slot="validationContext">
                    <label for="input-live">Correo electrónico:</label>
                    <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Correo" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="correo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
            <b-col class="col-6">
                <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">
                    <label for="input-live">RUT:</label>
                    <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Rut" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="razon" rules="required" v-slot="validationContext">
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
                        <ValidationProvider :name="'ciudad' + k" rules="required" v-slot="validationContext">
                            <b-form-input :state="getValidationState(validationContext)" :placeholder="'Ciudad '+(parseInt(k) +1)" style="height:30px" type="text" class="form-control" v-model="input.ciudad" />

                            <b-form-invalid-feedback id="ciudad-live-feedback">{{
                        validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </ValidationProvider>
                    </b-col>
                    <b-col class="col-6">
                        <ValidationProvider :name="'direccion' + k" rules="required" v-slot="validationContext">
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
                    Guardar cambios
                </b-button>
            </b-overlay>
        </template>

    </b-modal>
</validation-observer>
</template>

<script>
import empresaService from "@/helpers/api-services/Empresa.service"
export default {

    watch: {
        empresaData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                this.Rut = this.empresaData.rut_empresa;
                this.Correo = this.empresaData.correo;
                this.Giro = this.empresaData.giro;
                this.Nombre = this.empresaData.nombre_empresa;
                this.Nombre_abreviado = this.empresaData.nombre_abreviado;
                this.Razon_social = this.empresaData.razon_social;
                this.direcciones = [{}];
                this.obtenerDetalles();

            }
        }
    },
    props: {
        empresaData: Object
    },
    data() {

        return {
            Cargando: false,
            direcciones_eliminar: [],
            direcciones: [{
                id: '',
                ciudad: '',
                direccion: ''
            }],
            dataDirecciones: "",
            Nombre: "",
            Nombre_abreviado: "",
            Correo: "",
            Rut: "",
            Razon_social: "",
            Giro: "",

        }
    },
    methods: {
        obtenerDetalles() {
            empresaService.obtenerDetallesEmpresa(this.Rut).then((response) => {
                console.log(response)
                if (response != null) {
                    if (response.status == 200) {

                        response.data.ciudades.forEach((ciudad) => {
                            console.log(ciudad)
                            this.direcciones.push({
                                id: ciudad.id_ciudad,
                                ciudad: ciudad.nombre_ciudad,
                                direccion: ciudad.direccion
                            })
                        })
                        // elimina primer valor vacio
                        this.direcciones.shift();
                        console.log('direcciones a editar',this.direcciones);
                    }

                } else {
                    this.$bvToast.toast(`Error al obtener los detalles de la empresa.`, {
                        title: 'Error',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "warning",
                        appendToast: true
                    })
                }
            })
        },
        add() {
            this.direcciones.push({
                id: '',
                ciudad: '',
                direccion: ''
            })
            console.log(this.direcciones)
        },


        remove(index) {
            if(this.direcciones[index].id != ""){
                this.direcciones[index].ciudad = ""
                this.direcciones[index].direccion = ""
                // Se guarda registro de direcciones a eliminar en la BD
                this.direcciones_eliminar.push(this.direcciones[index]);
                console.log('direcciones a eliminar',this.direcciones_eliminar)
            }
        
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

                    this.dataDirecciones = this.dataDirecciones.concat(this.direcciones_eliminar);
                    console.log('direcciones a enviar',this.dataDirecciones)
                    var data = {
                        'rut_empresa': this.Rut,
                        'nombre_empresa': this.Nombre,
                        'nombre_abreviado': this.Nombre_abreviado,
                        'correo': this.Correo,
                        'razon_social': this.Razon_social,
                        'giro': this.Giro,
                        'direcciones': this.dataDirecciones,
                    }

                    console.log("data a enviar", data)
                    empresaService.actualizarEmpresa(data).then((response) => {
                        console.log(response)
                        this.Cargando = false;
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Edición de empresa exitosa.`, {
                                    title: 'Éxito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.direcciones_eliminar = [];
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-editar-empresa')
                        } else {
                            this.$bvToast.toast(`Error al editar empresa.`, {
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
