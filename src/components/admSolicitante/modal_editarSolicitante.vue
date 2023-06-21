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

                    <b-form-input size="sm" id="rut-input" disabled class="mb-1" v-model="Rut" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback"></b-form-input>

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
            <b-overlay :show="Cargando" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block">
                <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                    Crear y Guardar
                </b-button>
            </b-overlay>
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
                this.Empresas_agregar = [];
                this.Empresas_eliminar = [];
                this.Empresas_antiguas = [];
                this.Empresas_seleccionadas = [];
                this.cargaInicialEmpresaCiudad(this.Rut);

            }
        }
    },
    props: {
        solicitanteData: Object
    },
    data() {

        return {
            Cargando: false,
            Nombre: "",
            Rut: "",
            Primer_apellido: "",
            Segundo_apellido: "",
            Movil: "",
            Movil_proveedores: "",
            Contacto_proveedores: "",
            Empresas_seleccionadas: [],
            Empresas_antiguas: [],
            Empresas_agregar: [],
            Empresas_eliminar: [],
            alertaDuplicado: false,
            Direccion_factura: "",
            Correo: "",
            Cargo: "",
            Tipo: "",
            CargandoCiudad: false,
            CiudadSeleccionada: "",
            EmpresaSeleccionada: "",
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
        eliminarObjetosSeleccionados(index) {

            console.log(this.Empresas_antiguas)
            const yaEnSistema = this.Empresas_antiguas.find(emp => emp.rut_empresa == this.Empresas_seleccionadas[index].rut_empresa && emp.id_ciudad == this.Empresas_seleccionadas[index].id_ciudad);
            if(yaEnSistema != null){
                console.log("EMPRESA ANTIGUA QUE DEBE ELIMINARSE")
                this.Empresas_eliminar.push({
                    rut_empresa: yaEnSistema.rut_empresa,
                    id_ciudad: yaEnSistema.id_ciudad
                })
            }else{
                console.log("mejor borrarlo")
                this.Empresas_agregar = this.Empresas_agregar.filter(emp => emp.rut_empresa != this.Empresas_seleccionadas[index].rut_empresa && emp.id_ciudad != this.Empresas_seleccionadas[index].id_ciudad);
            }
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

                // Revisar si estoy agregando una empresa ya en la base de datos.
                const empresaRegistrada = this.Empresas_antiguas.find(emp => emp.rut_empresa == this.EmpresaSeleccionada.rut_empresa && emp.nombre_ciudad == this.CiudadSeleccionada.nombre_ciudad);

                if (!empresaRegistrada) {
                    this.Empresas_agregar.push({
                        rut_empresa: this.EmpresaSeleccionada.rut_empresa,
                        id_ciudad: this.CiudadSeleccionada.id_ciudad
                    })
                }else{
                    this.Empresas_eliminar = this.Empresas_eliminar.filter(emp => emp.rut_empresa != this.EmpresaSeleccionada.rut_empresa && emp.nombre_ciudad != this.CiudadSeleccionada.nombre_ciudad)
                }
                this.alertaDuplicado = false;
                this.Empresas_seleccionadas.push({
                    rut_empresa: this.EmpresaSeleccionada.rut_empresa,
                    id_ciudad: this.CiudadSeleccionada.id_ciudad,
                    nombre_empresa: this.EmpresaSeleccionada.nombre_empresa,
                    nombre_ciudad: this.CiudadSeleccionada.nombre_ciudad,
                })

            }

            console.log("Empresas agregadas seleccionadas", this.Empresas_seleccionadas)

        },
        cargaInicialEmpresaCiudad(rut) {

            solicitanteService.obtenerDetallesSolicitante(rut).then((response) => {
                console.log(response)
                if (response.request.status == 200) {
                    console.log("detalles de solicitante", response.data)
                    const empresas = response.data.detalles_empresas;
                    for (var i = 0; i < empresas.length; i++) {

                        this.Empresas_seleccionadas.push({
                            nombre_empresa: empresas[i].nombre_empresa,
                            rut_empresa: empresas[i].rut_empresa,
                            id_ciudad: empresas[i].id_ciudad,
                            nombre_ciudad: empresas[i].nombre_ciudad
                        })
                        this.Empresas_antiguas.push({
                            rut_empresa: empresas[i].rut_empresa,
                            id_ciudad: empresas[i].id_ciudad,
                            nombre_empresa: empresas[i].nombre_empresa,
                            nombre_ciudad: empresas[i].nombre_ciudad,
                        })

                    }

                    console.log("empresas a desplegar", this.Empresas)
                }
            })
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
                        "empresas_agregar": this.Empresas_agregar,
                        "empresas_eliminar": this.Empresas_eliminar

                        //"fecha_inicio_vacaciones": "01-01-2000",
                        // "fecha_termino_vacaciones": "01-01-2099",
                        //"//dias_administrativos": "1"
                    }
                    console.log("data a enviar", data)
                    solicitanteService.editarSolicitante(data).then((response) => {
                        console.log(response)
                        this.Cargando = false;
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
