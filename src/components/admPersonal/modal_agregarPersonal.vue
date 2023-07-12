<template>
    <validation-observer ref="form">
        <b-modal id="modal-personal" ref="modal" title="Agregar personal" size="lg">

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->

                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Agregar personal</div>

                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <b-row class="pb-2">
                <b-col class="col-6">
                    <label for="input-live">RUT:</label>
                    <ValidationProvider name="RUT" rules="required|rut|rutSinPuntoGuion" v-slot="validationContext">
                        <b-overlay :show="Revisando_rut && validationContext.errors[0] == null" rounded opacity="0.6"
                            spinner-small spinner-variant="primary">
                            <b-form-input @blur.native="revisarRutPersonal"
                                placeholder="Ingrese el RUT sin puntos ni guión." size="sm" id="rut-input" class="mb-1"
                                v-model="Rut" :state="getValidationState(validationContext)"
                                aria-describedby="rut-live-feedback"></b-form-input>

                            <b-form-invalid-feedback id="rut-live-feedback">{{
                                validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                            <b-alert fade style="margin:2px; padding:2px;" class="text-center" :show="Rut_ocupado"
                                variant="warning">El rut ya está registrado en el sistema</b-alert>
                        </b-overlay>
                    </ValidationProvider>
                    <ValidationProvider name="apellidos" rules="required|min:2" v-slot="validationContext">
                        <label for="input-live">Apellidos:</label>
                        <b-form-input size="sm" class="mb-1" id="apellido-input" v-model="Apellidos"
                            :state="getValidationState(validationContext)"
                            aria-describedby="input-live-help apellido-live-feedback" placeholder="" trim></b-form-input>
                        <b-form-invalid-feedback id="apellido-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>

                </b-col>
                <b-col class="col-6">
                    <ValidationProvider name="nombre" rules="required|min:2" v-slot="validationContext">
                        <label for="input-live">Nombres:</label>
                        <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)"
                            v-model="Nombre" aria-describedby="input-live-help nombre-live-feedback" placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="nombre-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                    <label for="input-live">Correo:</label>
                    <ValidationProvider name="correo" rules="required|email" v-slot="validationContext">
                        <b-overlay :show="Revisando_correo && validationContext.errors[0] == null" rounded opacity="0.6"
                            spinner-small spinner-variant="primary">

                            <b-form-input @blur.native="revisarCorreoPersonal" size="sm" class="mb-1" id="input-live"
                                :state="getValidationState(validationContext)" v-model="Correo"
                                aria-describedby="input-live-help correo-live-feedback" placeholder="" trim></b-form-input>
                            <b-form-invalid-feedback id="correo-live-feedback">{{
                                validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                            <b-alert fade style="margin:2px; padding:2px;" class="text-center" :show="Correo_ocupado"
                                variant="warning">El correo ya está registrado en el sistema</b-alert>
                        </b-overlay>
                    </ValidationProvider>
                </b-col>
            </b-row>
            <hr>

            <b-row>
                <b-col class="col-6">
                    <label for="input-live">Teléfono móvil:</label>
                    <ValidationProvider name="número móvil" rules="required|numeric|min:8|max:15"
                        v-slot="validationContext">
                        <b-input-group size="sm" class="mb-1">

                            <b-input-group-prepend is-text>
                                +56 9
                            </b-input-group-prepend>
                            <b-form-input id="input-live" v-model="Movil"
                                aria-describedby="input-live-help movil-live-feedback"
                                :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                            <b-form-invalid-feedback id="movil-live-feedback">{{
                                validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-input-group>

                    </ValidationProvider>
                    <label for="input-live">Contacto de emergencia:</label>
                    <ValidationProvider name="número de emergencia" rules="numeric|min:8|max:15" v-slot="validationContext">
                        <b-input-group size="sm" class="mb-1">

                            <b-input-group-prepend is-text>
                                +56 9
                            </b-input-group-prepend>
                            <b-form-input id="input-live" v-model="Emergencia"
                                aria-describedby="input-live-help emergencia-live-feedback"
                                :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                            <b-form-invalid-feedback id="emergencia-live-feedback">{{
                                validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </ValidationProvider>
                </b-col>
                <b-col class="col-6">
                    <ValidationProvider name="cargo" rules="required" v-slot="validationContext">
                        <label for="input-live">Cargo:</label>
                        <b-form-select size="md" aria-describedby="cargo-live-feedback"
                            :state="getValidationState(validationContext)" class="mb-1" v-model="Cargo"
                            :options="cargos"></b-form-select>
                        <b-form-invalid-feedback id="cargo-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                    <ValidationProvider name="tipo de trabajador" rules="required" v-slot="validationContext">
                        <label for="input-live">Tipo de trabajador:</label>
                        <b-form-select size="md" aria-describedby="tipo-live-feedback"
                            :state="getValidationState(validationContext)" class="mb-1" v-model="Tipo"
                            :options="tipos"></b-form-select>
                        <b-form-invalid-feedback id="tipo-live-feedback">{{
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
                        Crear y guardar
                    </b-button>
                </b-overlay>
            </template>
            <hr>

            <b-row>

                <b-col class="col-5">
                    <ValidationProvider name="area" rules="required" v-slot="validationContext">
                        <label for="area-live">Area:</label>
                        <b-form-select size="md" aria-describedby="area-live-feedback"
                            :state="getValidationState(validationContext)" class="mb-1" v-model="AreaSeleccionada"
                            :options="Areas"></b-form-select>
                        <b-form-invalid-feedback id="cargo-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>

                </b-col>
                <b-col class="col-6">
                    <ValidationProvider name="tipo de análisis" rules="required" v-slot="validationContext">
                        <label for="input-live">Tipo de análisis:</label>
                        <b-form-input size="md" aria-describedby="tipo-live-feedback"
                            :state="getValidationState(validationContext)" class="mb-1"
                            v-model="AnalisisSeleccionado"></b-form-input>
                        <b-form-invalid-feedback id="tipo-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                </b-col>
                <b-col class="col-1 d-flex align-items-end">
                    <b-button :disabled="esParticular" variant="success" class="reactive-button"
                        @click="agregarAreaAnalisis()"
                        style="padding:1px; margin-bottom:5px; aspect-ratio: 1 / 1; width:35px; height: 35px;">
                        <b-icon icon=" plus-circle-fill"></b-icon>
                    </b-button>
                </b-col>
                <b-col>
                    <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
                        El area y tipo de analisis ya fueron agregados
                    </b-alert>
                </b-col>
<b-col class="col-12">
                <div>
                    <b-row v-if="Areas_agregar.length > 0" class="mt-3">
                        <b-col>
                            <b-form-group label="Areas y tipo analisis agregados:">
                                <div v-for="(objetos, index) in Areas_agregar" :key="index"
                                    class="d-flex align-items-center objetos-item mb-3">
                                    <b-input readonly :value="objetos.nombre_area" class="mr-2"></b-input>
                                    <b-input readonly :value="objetos.tipo_analisis" class="mr-2"></b-input>
                                    <b-button variant="danger" @click="eliminarAreaAnalisis(index)" class="ml-2">
                                        <b-icon-trash-fill></b-icon-trash-fill>
                                    </b-button>
                                </div>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
                <hr />
                <b-col class="col-12">
                    <ValidationProvider name="archivo" rules="size:10000" v-slot="validationContext">
                        <label for="area-live"> Adjuntar archivos:</label>

                        <div>
                            <b-form-file size="lg" :state="getValidationState(validationContext)"
                                placeholder="Seleccione archivo(s) a subir." browse-text="Buscar" v-on:change="onChange"
                                :multiple="true" v-model="Archivos" ref="file-input"></b-form-file>
                            <b-form-invalid-feedback id="archivo-live-feedback">
                                Los archivos deben ser menor a 10mb.
                            </b-form-invalid-feedback>

                        </div>
                    </ValidationProvider>
                    <br />
                    <div style="font-weight:bold">Archivos seleccionados: </div>

                    <b-list-group>
                        <b-list-group-item style="padding-top:4px; padding-bottom:4px" v-for="archivo in Archivos"
                            :key="archivo.index">

                            <b-row class="d-flex justify-content-between align-items-center">

                                <span>{{ archivo ? archivo.name : '' }}</span>

                                <b-button variant="danger" @click="remove(archivo.index)"
                                    style="padding:1px; aspect-ratio: 1 / 1; height: 27px; width: 27px">
                                    <b-icon icon="x"></b-icon>
                                </b-button>
                            </b-row>

                        </b-list-group-item>

                    </b-list-group>
                </b-col>
            </b-row>

        </b-modal>
    </validation-observer>
</template>

<script>
import personalService from "@/helpers/api-services/Personal.service"
import roleService from "@/helpers/api-services/Role.service"

export default {
    mounted() {
        this.obtenerRoles();
        this.obtenerAreas();
    },
    data() {

        return {
            AreaSeleccionada: "",
            AnalisisSeleccionado: "",
            Areas: [],
            alertaDuplicado: false,
            Areas_agregar: [],
            Cargando: false,
            Archivos: null,
            Archivos_enviar: "",
            file: "",
            files: "",
            Nombre: "",
            Rut: "",
            Correo: "",
            Rut_ocupado: false,
            Revisando_rut: false,
            Correo_ocupado: false,
            Revisando_correo: false,
            Apellidos: "",
            Movil: "",
            Emergencia: "",
            Cargo: "",
            Tipo: "",
            Roles: [],
            tipos: [{
                value: 'Practicante',
                text: 'Practicante'
            },
            {
                value: 'Contrato Plazo Fijo',
                text: 'Contrato Plazo Fijo'
            },
            {
                value: 'Contrato Plazo Indefinido',
                text: 'Contrato Plazo Indefinido'
            },
            {
                value: 'Contrato Honorario',
                text: 'Contrato Honorario'
            },
            ],
            cargos: [{
                value: 'Gerente',
                text: 'Gerente'
            },
            {
                value: 'Jefe(a) de laboratorio',
                text: 'Jefe(a) de laboratorio'
            },
            {
                value: 'Supervisor(a)',
                text: 'Supervisor(a)'
            },
            {
                value: 'Administrador(a) de Finanzas',
                text: 'Administrador(a) de Finanzas'
            },
            {
                value: 'Analista Químico',
                text: 'Analista Químico'
            },
            {
                value: 'Químico',
                text: 'Químico'
            },
            ],
        }
    },

    methods: {
        eliminarAreaAnalisis(index) {
            this.Areas_agregar.splice(index, 1);
        },
        agregarAreaAnalisis() {
            const existeAreaAnalisis = this.Areas_agregar.find(area => area.id_area = this.AreaSeleccionada.id_area && area.tipo_analisis == this.AnalisisSeleccionado);
            if (existeAreaAnalisis == null) {
                this.Areas_agregar.push({
                    id_area: this.AreaSeleccionada.id_area,
                    nombre_area: this.AreaSeleccionada.nombre_area,
                    tipo_analisis: this.AnalisisSeleccionado
                })
            }
            else {
                this.alertaDuplicado = true;
            }
        },
        obtenerAreas() {
            personalService.obtenerAreas().then((response) => {
                if (response != null && response.data != null) {
                    console.log("areas cargadas: ", response);
                    console.log(response);
                    const areas = response.data;
                    for (var i = 0; i < areas.length; i++) {
                        this.Areas.push({
                            value: areas[i],
                            text: areas[i].nombre_area,

                        })
                    }
                }
            })
        },
        reiniciarDatos() {
            this.Archivos = null;
            this.Archivos_enviar = "";
            this.file = "";
            this.files = "";
            this.Nombre = "";
            this.Rut = "";
            this.Correo = "";
            this.Apellidos = "";
            this.Movil = "";
            this.Emergencia = "";
            this.Cargo = "";
            this.Tipo = "";
            this.Rut_ocupado = false;
            this.Revisando_rut = false;
            this.Correo_ocupado = false;
            this.Revisando_rut = false;
            this.Areas = [];

        },
        revisarRutPersonal() {

            var data = {
                "rut_empleado": this.Rut
            }
            if (this.Rut != "") {
                this.Revisando_rut = true;
                personalService.existePersonal(data).then((response) => {

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
        revisarCorreoPersonal() {

            var data = {
                "correo": this.Correo
            }
            if (this.Correo != "") {
                this.Revisando_correo = true;
                personalService.existeCorreoPersonal(data).then((response) => {

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
        obtenerIdRol(value) {
            console.log("value a revisar rol", value);
            return this.Roles.find(x => x.descripcion == value).id_rol;
        },
        obtenerRoles() {
            roleService.obtenerRoles().then((response) => {
                if (response != null) {
                    if (response.data != null) {
                        this.Roles = response.data;
                        console.log(this.Roles);
                    }
                }
            })
        },
        remove(index) {
            this.Archivos.splice(index, 1)
        },
        limpiarArchivos() {
            this.Archivos = null
        },
        onChange(e) {
            this.Archivos_enviar = [];
            this.files = e.target.files;
            //this.Archivos_enviar = this.files[0];
            for (var i = 0; i < this.files.length; i++) {
                this.Archivos_enviar[i] = this.files[i];
            }
            //  this.files = e.target.files;
            //  console.log(this.files)
            //  for (var i = 0; i < this.files.length; i++) {
            //      let blob = this.files[i];
            //      this.imagenToBase64(blob).then((textoConvertido) => {
            //          this.Archivos_enviar.push({
            //              nombreArchivo: (blob.name).split(".")[0],
            //              archivoBase64: textoConvertido
            //
            //          })
            //
            //      })
            //  }
            console.log(this.Archivos_enviar)
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
                    let formData = new FormData();
                    formData = {
                        "rut_empleado": this.Rut,
                        "nombre": this.Nombre,
                        "apellido": this.Apellidos,
                        "correo": this.Correo,
                        "rol": this.Cargo,
                        "tipo_trabajador": this.Tipo,
                        "telefono_movil": this.Movil,
                        "telefono_emergencia": this.Emergencia,
                        "estado": 1,
                        "areas_agregar": this.Areas_agregar

                        //"fecha_inicio_vacaciones": "01-01-2000",
                        // "fecha_termino_vacaciones": "01-01-2099",
                        //"//dias_administrativos": "1"
                    }
                    if (this.Archivos_enviar.length != 0) {
                        formData.documentos = this.Archivos_enviar;
                    }
                    formData.id_rol = this.obtenerIdRol(formData.rol);
                    console.log("data a enviar", formData)
                    personalService.ingresarPersonal(formData).then((response) => {
                        this.Cargando = false;
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Creación de personal exitosa`, {
                                    title: 'Éxito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-personal');
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
