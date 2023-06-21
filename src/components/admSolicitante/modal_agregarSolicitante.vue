<template>
<validation-observer ref="form">
    <b-modal id="modal-solicitante" ref="modal" title="Agregar Solicitante" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Solicitante</div>

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
                <ValidationProvider name="primer apellido" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="primerapellido-input" class="mb-1" v-model="Primer_apellido" :state="getValidationState(validationContext)" aria-describedby="primerapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="primerapellido-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Segundo apellido:</label>
                <ValidationProvider name="segundo apellido" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="rsegundoapellidout-input" class="mb-1" v-model="Segundo_apellido" :state="getValidationState(validationContext)" aria-describedby="segundoapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="segundoapellido-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

            </b-col>
            <b-col class="col-4">
                <label for="input-live">Rut:</label>

                <ValidationProvider name="rut" rules="required|rut|rutSinPuntoGuion" v-slot="validationContext">
                    <!--Mostrar estado cargando solo si se esta revisando rut y no hay errores de validacion (rut valido)-->
                    <b-overlay :show="Revisando_rut && validationContext.errors[0] == null" rounded opacity="0.6" spinner-small spinner-variant="primary">
                        <b-form-input @blur.native="revisarRutSolicitante" size="sm" id="rut-input" class="mb-1" v-model="Rut" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback"></b-form-input>

                        <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-overlay>
                    <b-alert fade style="margin:2px; padding:2px;" class="text-center" :show="Rut_ocupado" variant="warning">El rut ya está registrado en el sistema</b-alert>
                </ValidationProvider>
                <label for="input-live">Teléfono móvil:</label>
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
                <ValidationProvider name="fono proveedores" rules="required|numeric|min:8|max:15" v-slot="validationContext">
                    <b-input-group size="sm" class="mb-1">
                        <b-input-group-prepend is-text>
                            +56 9
                        </b-input-group-prepend>
                        <b-form-input size="sm" id="nombre-input" v-model="Movil_proveedores" :state="getValidationState(validationContext)" aria-describedby="nombre-live-feedback"></b-form-input>

                        <b-form-invalid-feedback id="nombre-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-input-group>
                </ValidationProvider>
                <label for="input-live">Dir. pago proveedores:</label>
                <ValidationProvider name="dirección pago proveedores" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="dirpago-input" class="mb-1" v-model="Contacto_proveedores" :state="getValidationState(validationContext)" aria-describedby="primerapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="dirpago-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Dir. envío factura:</label>
                <ValidationProvider name="dirección envío factura" rules="required" v-slot="validationContext">

                    <b-form-input size="sm" id="dirfactura-input" class="mb-1" v-model="Direccion_factura" :state="getValidationState(validationContext)" aria-describedby="segundoapellido-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="dirfactura-live-feedback">{{
    validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

            </b-col>
        </b-row>
        <hr>

        <b-row>
            <b-col class="col-4">
                <label for="input-live">Empresa:</label>
                <b-form-select @change="cargarDirecciones" aria-describedby="cargo-live-feedback" class="mb-1" text-field="nombre_empresa" v-model="EmpresaSeleccionada" :options="Empresas"></b-form-select>

            </b-col>
            <b-col class="col-4">

                <label for="input-live">Ciudad empresa:</label>
                <b-form-select :disabled="EmpresaSeleccionada ? false : true" aria-describedby="cargo-live-feedback" class="mb-1" v-model="CiudadSeleccionada" text-field="nombre_ciudad" :options="Ciudades">

                </b-form-select>

            </b-col>
            <b-col class="col-1 d-flex align-items-end" style="padding:0px">
                <b-button variant="success" class="reactive-button" @click="agregarEmpresaSeleccionada()" style="padding:1px; margin-bottom:5px; aspect-ratio: 1 / 1; height: 35px; width: 35px">
                    <b-icon icon=" plus-circle-fill"></b-icon>
                </b-button>

            </b-col>
            <b-col class="col-3">
                <ValidationProvider name="cargo" rules="required" v-slot="validationContext">
                    <label for="input-live">Tipo cliente:</label>
                    <b-form-select aria-describedby="cargo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Tipo" :options="tipos"></b-form-select>
                    <b-form-invalid-feedback id="cargo-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <hr />
        <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
            La empresa y ciudad de esta ya están seleccionadas.
        </b-alert>
        <div>
            <b-row v-if="Empresas_seleccionadas.length > 0" class="mt-3">
                <b-col>
                    <b-form-group label="Empresas Seleccionadas:">
                        <div v-for="(objetos, index) in Empresas_seleccionadas" :key="index" class="d-flex align-items-center objetos-item mb-3">
                            <b-input readonly :value="objetos.nombre_empresa" class="mr-2"></b-input>
                            <b-input readonly :value="objetos.nombre_ciudad" class="mr-2"></b-input>
                            <b-button variant="danger" @click="eliminarObjetosSeleccionados(index)" class="ml-2">
                                <b-icon-trash-fill></b-icon-trash-fill>
                            </b-button>
                        </div>
                    </b-form-group>
                </b-col>
            </b-row>
        </div>
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

    data() {

        return {
            Nombre: "",
            Rut: "",
            Primer_apellido: "",
            Segundo_apellido: "",
            Empresas_seleccionadas: [],
            Movil: "",
            Movil_proveedores: "",
            Contacto_proveedores: "",
            Direccion_factura: "",
            Rut_ocupado: false,
            alertaDuplicado: false,
            Correo: "",
            Tipo: "",
            CiudadSeleccionada: "",
            Rut_empresa: "",
            EmpresaSeleccionada: null,
            Nombre_empresa: "",
            Nombre_ciudad: "",
            Direccion_ciudad: "",
            Revisando_rut: false,
            Empresas: [],

            Ciudades: [],
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
        eliminarObjetosSeleccionados(index){
            
            this.Empresas_seleccionadas.splice(index, 1);
            

        },
        agregarEmpresaSeleccionada() {
            console.log("empresa a agregar", this.EmpresaSeleccionada);
            console.log("Ciudad de empresa a agregar", this.CiudadSeleccionada);
            //'rut_empresa': this.Rut_empresa,
            //    'nombre_ciudad': this.Nombre_ciudad,
            //    'direccion_ciudad': this.Direccion_ciudad,
            const empresaExistente = this.Empresas_seleccionadas.find(emp => emp.rut_empresa == this.EmpresaSeleccionada.rut_empresa && emp.nombre_ciudad == this.CiudadSeleccionada.nombre_ciudad);

            if (empresaExistente) {
                this.alertaDuplicado = true;
                return;
            }

            if (this.EmpresaSeleccionada != "" && this.CiudadSeleccionada != "") {
                this.Empresas_seleccionadas.push({
                    rut_empresa: this.EmpresaSeleccionada.rut_empresa,
                    id_ciudad: this.CiudadSeleccionada.id_ciudad,
                    nombre_empresa: this.EmpresaSeleccionada.nombre_empresa,
                    nombre_ciudad: this.CiudadSeleccionada.nombre_ciudad,
                })
            }

            console.log("Empresas agregadas seleccionadas", this.Empresas_seleccionadas)

        },
        revisarRutSolicitante() {

            var data = {
                "rut_solicitante": this.Rut
            }
            if (this.Rut != "") {
                this.Revisando_rut = true;
                solicitanteService.existeSolicitante(data).then((response) => {

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
        reiniciarDatos() {
            this.Nombre = "";
            this.Rut = "";
            this.Primer_apellido = "";
            this.Segundo_apellido = "";
            this.Revisando_rut = false;
            this.Rut_ocupado = false;
            this.Movil = "";
            this.Movil_proveedores = "";
            this.Contacto_proveedores = "";
            this.Direccion_factura = "";
            this.Correo = "";
            this.Tipo = "";
            this.Ciudad = "";
            this.Rut_empresa = "";
            this.Empresa = null;
            this.Nombre_empresa = "";
            this.Nombre_ciudad = "";
            this.Direccion_ciudad = "";
            this.Ciudades = [];

        },
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        cargarDataCiudad(id) {
            console.log(id)
            var ciudadSeleccionada = this.Ciudades.find(x => x.id_ciudad === id);
            this.Nombre_ciudad = ciudadSeleccionada.nombre_ciudad;
            this.Direccion_ciudad = ciudadSeleccionada.direccion;
        },
        cargarEmpresas() {
            this.Ciudad = "";
            empresaService.obtenerTodasEmpresa().then((response => {
                    if (response.data != null) {
                        console.log(response.data)

                        for (var i = 0; i < response.data.length; i++) {
                            this.Empresas.push({
                                value: response.data[i],
                                nombre_empresa: response.data[i].nombre_empresa
                            })
                        }
                        console.log(this.Empresas)
                    }
                })

            )
        },
        cargarDirecciones(empresa) {
            this.Ciudades = [];
            this.CiudadSeleccionada = "";
            console.log(empresa)

            var Rut_empresa = empresa.rut_empresa;
            empresaService.obtenerDetallesEmpresa(Rut_empresa).then((response => {
                if (response.data != null) {
                    this.Nombre_empresa = response.data.nombre_empresa;
                    for (var i = 0; i < response.data.ciudades.length; i++) {
                        this.Ciudades.push({
                            value: response.data.ciudades[i],
                            nombre_ciudad: response.data.ciudades[i].nombre_ciudad
                        })
                    }
                    console.log('ciudades cargadas', this.Ciudades)
                }
            }))

        },
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    console.log('Ciudad seleccionada', this.Nombre_ciudad)
                    console.log('direccion ciudad seleccionada', this.Direccion_ciudad)
                    var empresas_agregar = [];
                    for (var i = 0; i < this.Empresas_seleccionadas.length; i++){
                        empresas_agregar.push({
                            rut_empresa: this.Empresas_seleccionadas[i].rut_empresa,
                            id_ciudad: this.Empresas_seleccionadas[i].id_ciudad
                          
                        })
                    }

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
                        'empresas_agregar': empresas_agregar
                    }
                    console.log("data a enviar", data)
                    solicitanteService.ingresarSolicitante(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Creación de personal exitosa`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-solicitante')
                            this.reiniciarDatos();
                            this.$refs.form.reset();
                        } else {
                            this.$bvToast.toast(`Error al crear personal`, {
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
