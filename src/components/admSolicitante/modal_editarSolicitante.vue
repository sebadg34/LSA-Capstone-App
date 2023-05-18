<template>
<validation-observer ref="form">
    <b-modal id="modal-editar-solicitante" ref="modal" title="Agregar Solicitante" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Editar Solicitante</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-4">
                <label for="input-live">Nombre:</label>
                <ValidationProvider name="nombre" rules="required|min:2" v-slot="validationContext">

                    <b-form-input size="sm" id="nombre-input" class="mb-1" v-model="Nombre" :state="getValidationState(validationContext)" aria-describedby="nombre-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="nombre-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Primer apellido:</label>
                <ValidationProvider name="primerapellido" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="primerapellido-input" class="mb-1" v-model="Primer_apellido" :state="getValidationState(validationContext)" aria-describedby="primerapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="primerapellido-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Segundo apellido:</label>
                <ValidationProvider name="segundoapellido" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="segundoapellido-input" class="mb-1" v-model="Segundo_apellido" :state="getValidationState(validationContext)" aria-describedby="segundoapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="segundoapellido-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

            </b-col>
            <b-col class="col-4">
                <label for="input-live">Rut:</label>
                <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">

                    <b-form-input size="sm" id="rut-input" class="mb-1" v-model="Rut" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Telefono Movil:</label>
                <ValidationProvider name="Nro. movil" rules="required|numeric|min:8|max:15" v-slot="validationContext">
                    <b-input-group size="sm" class="mb-1">

                        <b-input-group-prepend is-text>
                            +56 9
                        </b-input-group-prepend>
                        <b-form-input size="sm" id="input-live" v-model="Movil" aria-describedby="input-live-help movil-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="movil-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-input-group>

                </ValidationProvider>
                <ValidationProvider name="correo" rules="required|email" v-slot="validationContext">
                    <label for="input-live">Correo electrónico:</label>
                    <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Correo" aria-describedby="input-live-help correo-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="correo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
            <b-col class="col-4">
                <label for="input-live">Fono proveedores:</label>
                <ValidationProvider name="nombre" rules="required|numeric|min:8|max:15" v-slot="validationContext">
                    <b-input-group size="sm" class="mb-1">
                    <b-input-group-prepend is-text>
                            +56 9
                        </b-input-group-prepend>
                    <b-form-input size="sm" id="nombre-input" v-model="Movil_proveedores" :state="getValidationState(validationContext)" aria-describedby="nombre-live-feedback"></b-form-input>
                </b-input-group>
                    <b-form-invalid-feedback id="nombre-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Dir. pago proveedores:</label>
                <ValidationProvider name="apellido" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="primerapellido-input" class="mb-1" v-model="Contacto_proveedores" :state="getValidationState(validationContext)" aria-describedby="primerapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="primerapellido-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Dir. envío factura:</label>
                <ValidationProvider name="apellido" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="rsegundoapellidout-input" class="mb-1" v-model="Direccion_factura" :state="getValidationState(validationContext)" aria-describedby="segundoapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="segundoapellido-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

            </b-col>
        </b-row>
        <hr>

        <b-row>
            <b-col class="col-4">
                <ValidationProvider name="empresa" rules="required" v-slot="validationContext">
                    <label for="input-live">Empresa:</label>
                    <b-form-select @change="cargarDirecciones" aria-describedby="cargo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" value-field="rut_empresa" text-field="nombre_empresa" v-model="Empresa" :options="Empresas"></b-form-select>
                    <b-form-invalid-feedback id="cargo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
            <b-col class="col-4">
                <ValidationProvider name="ciudad" rules="required" v-slot="validationContext">
                    <label for="input-live">Ciudad empresa:</label>
                    <b-form-select @change="cargarDataCiudad" :disabled="Empresa ? false : true" aria-describedby="cargo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Ciudad" value-field="id_ciudad" text-field="nombre_ciudad" :options="Ciudades">

                    </b-form-select>
                    <b-form-invalid-feedback id="cargo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
            <b-col class="col-4">
                <ValidationProvider name="cargo" rules="required" v-slot="validationContext">
                    <label for="input-live">Tipo Cliente:</label>
                    <b-form-select aria-describedby="cargo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Tipo" :options="tipos"></b-form-select>
                    <b-form-invalid-feedback id="cargo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <template #modal-footer>

            <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Crear y Guardar
            </b-button>

        </template>
    </b-modal>
</validation-observer>
</template>

<script>
import solicitanteService from "@/helpers/api-services/Solicitante.service"
import empresaService from "@/helpers/api-services/Empresa.service"
export default {
    watch: {
        solicitanteData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                this.Nombre = this.solicitanteData.nombre
                this.Rut = this.solicitanteData.rut_solicitante
                this.Primer_apellido = this.solicitanteData.primer_apellido
                this.Segundo_apellido = this.solicitanteData.segundo_apellido
                this.Movil = this.solicitanteData.telefono
                this.Movil_proveedores = this.solicitanteData.fono_contacto_proveedores
                this.Contacto_proveedores = this.solicitanteData.direccion_contacto_proveedores
                this.Direccion_factura = this.solicitanteData.direccion_envio_factura
                this.Correo = this.solicitanteData.correo
                this.Tipo = this.solicitanteData.tipo_cliente
                this.Empresa = this.solicitanteData.rut_empresa
            this.Ciudad = this.solicitanteData.id_ciudad
            this.cargaInicialEmpresaCiudad();
            
         
            }
        }
    },
    props: {
        solicitanteData: Object
    },
    data() {

        return {
            Nombre: "",
            Rut: "",
            Primer_apellido: "",
            Segundo_apellido: "",
            Movil: "",
            Movil_proveedores: "",
            Contacto_proveedores: "",
            Direccion_factura: "",
            Correo: "",
            Cargo: "",
            Tipo: "",
            Ciudad: "",
            Rut_empresa: "",
            Empresa: "",
            Nombre_ciudad: "",
            Direccion_ciudad: "",
            Empresas: [{}],
            Ciudades: [{

            }],
            tipos: [{
                    value: 'Convenio',
                    text: 'Convenio'
                },
                {
                    value: 'Frecuente',
                    text: 'Frecuente'
                },
                {
                    value: 'Particular',
                    text: 'Particular'
                },
            ],
        }
    },
    mounted() {
        this.cargarEmpresas();
    },
    methods: {
        cargaInicialEmpresaCiudad(){
            this.Rut_empresa = this.solicitanteData.rut_empresa;
            empresaService.obtenerDetallesEmpresa(this.Rut_empresa).then((response => {
                if (response.data != null) {
                    console.log(response.data)
                    this.Ciudades = response.data.ciudades;
                    this.cargarDataCiudad(this.solicitanteData.id_ciudad)
                }
            }))
        },
        cargarDataCiudad(id){
            console.log(id)
         var ciudadSeleccionada =   this.Ciudades.find(x=> x.id_ciudad === id);
         this.Nombre_ciudad = ciudadSeleccionada.nombre_ciudad;
         this.Direccion_ciudad = ciudadSeleccionada.direccion;
        },
        cargarEmpresas() {
            this.Ciudad = "";
            empresaService.obtenerTodasEmpresa().then((response => {
                    if (response.data != null) {
                        console.log(response.data)

                        this.Empresas = response.data;
                        console.log(this.Empresas)
                    }
                })

            )
        },
        
        cargarDirecciones(rutEmpresa) {
            console.log(rutEmpresa)
            this.Rut_empresa = rutEmpresa;
            empresaService.obtenerDetallesEmpresa(rutEmpresa).then((response => {
                if (response.data != null) {
                    console.log(response.data)
                    this.Ciudades = response.data.ciudades;
                }
            }))
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
                        "rut_solicitante": this.Rut,
                        "nombre": this.Nombre,
                        "segundo_apellido": this.Segundo_apellido,
                        "primer_apellido": this.Primer_apellido,
                        "estado": true,
                        "correo": this.Correo,
                        "telefono": this.Movil,
                        "direccion_contacto_proveedores": this.Contacto_proveedores,
                        "fono_contacto_proveedores": this.Movil_proveedores,
                        "direccion_envio_factura": this.Direccion_factura,
                        "tipo_cliente": this.Tipo,
                        'rut_empresa': this.Rut_empresa,
                        'nombre_ciudad': this.Nombre_ciudad,
                        'direccion_ciudad': this.Direccion_ciudad,
                        'id_ciudad': this.Ciudad,

                        //"fecha_inicio_vacaciones": "01-01-2000",
                        // "fecha_termino_vacaciones": "01-01-2099",
                        //"//dias_administrativos": "1"
                    }
                    console.log("data a enviar", data)
                    solicitanteService.editarSolicitante(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Edición de solicitante exitosa`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-editar-solicitante')
                        } else {
                            this.$bvToast.toast(`Error al editar solicitante`, {
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

<style lang="scss">
.custom-file-input:lang(en)~.custom-file-label::after {
    content: 'Buscar';
}
</style>
