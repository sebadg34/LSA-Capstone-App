<template>
<validation-observer ref="form">
    <b-modal id="modal-editar-personal" title="Editar Personal" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Editar personal</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-6">
                <label for="input-live">RUT:</label>
                <ValidationProvider name="RUT" rules="required|rut" v-slot="validationContext">

                    <b-form-input size="sm" disabled id="rut-input" class="mb-1" v-model="Rut" :state="getValidationState(validationContext)" aria-describedby="rut-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="rut-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="de apellidos" rules="required" v-slot="validationContext">
                    <label for="input-live">Apellidos:</label>
                    <b-form-input size="sm" class="mb-1" id="apellido-input" v-model="Apellidos" :state="getValidationState(validationContext)" aria-describedby="input-live-help apellido-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="apellido-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

            </b-col>
            <b-col class="col-6">
                <ValidationProvider name="de nombres" rules="required|min:2" v-slot="validationContext">
                    <label for="input-live">Nombres:</label>
                    <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Nombre" aria-describedby="input-live-help nombre-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="nombre-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="correo" rules="required|email" v-slot="validationContext">
                    <label for="input-live">Correo:</label>
                    <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Correo" aria-describedby="input-live-help correo-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="correo-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <hr>

        <b-row>
            <b-col class="col-6">
                <label for="input-live">Teléfono móvil:</label>
                <ValidationProvider name="número móvil" rules="required|numeric|min:8|max:15" v-slot="validationContext">
                    <b-input-group size="sm" class="mb-1">

                        <b-input-group-prepend is-text>
                            +56 9
                        </b-input-group-prepend>
                        <b-form-input id="input-live" v-model="Movil" aria-describedby="input-live-help movil-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
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
                    <b-form-select size="md" aria-describedby="cargo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Cargo" :options="cargos"></b-form-select>
                    <b-form-invalid-feedback id="cargo-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="tipo de trabajador" rules="required" v-slot="validationContext">
                    <label for="input-live">Tipo de trabajador:</label>
                    <b-form-select size="md" aria-describedby="tipo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Tipo" :options="tipos"></b-form-select>
                    <b-form-invalid-feedback id="tipo-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
        </b-row>
        <hr />

        <b-row>
            <b-col class="col-6">
                <ValidationProvider name="tipo de trabajador" rules="required" v-slot="validationContext">
                    <label for="input-live">Tipo de analisis:</label>
                    <b-form-select size="md" aria-describedby="tipo-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Tipo" :options="tipos"></b-form-select>
                    <b-form-invalid-feedback id="tipo-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
            <b-col class="col-6">
             
                <ValidationProvider name="area" rules="required" v-slot="validationContext">
                    <label for="area-live">Area:</label>
                    <b-form-select size="md" aria-describedby="area-live-feedback" :state="getValidationState(validationContext)" class="mb-1" v-model="Area" :options="Areas"></b-form-select>
                    <b-form-invalid-feedback id="cargo-live-feedback">{{
                            validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-col>
            <b-col class="col-12">
                <ValidationProvider name="archivo" rules="size:10000" v-slot="validationContext">
                    <label for="area-live">   Adjuntar archivos:</label>
                 
                    <div>
                        <b-form-file size="lg" :state="getValidationState(validationContext)" placeholder="Seleccione archivo(s) a subir." browse-text="Buscar" v-on:change="onChange" :multiple="true" v-model="Archivos" ref="file-input"></b-form-file>
                        <b-form-invalid-feedback id="archivo-live-feedback">
                            Los archivos deben ser menor a 10mb.
                        </b-form-invalid-feedback>

                    </div>
                </ValidationProvider>
                 <br/>
                <div style="font-weight:bold">Archivos seleccionados: </div>

                <b-list-group>
                    <b-list-group-item style="padding-top:4px; padding-bottom:4px" v-for="archivo in Archivos" :key="archivo.index">

                        <b-row class="d-flex justify-content-between align-items-center">

                            <span>{{ archivo ? archivo.name : '' }}</span>

                            <b-button variant="danger" @click="remove(archivo.index)" style="padding:1px; aspect-ratio: 1 / 1; height: 27px; width: 27px">
                                <b-icon icon="x"></b-icon>
                            </b-button>
                        </b-row>

                    </b-list-group-item>

                </b-list-group>
            </b-col>
        </b-row>

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
import personalService from "@/helpers/api-services/Personal.service"
export default {
    watch: {
        userData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                this.Nombre = this.userData.nombre
                this.Rut = this.userData.rut_empleado
                this.Correo = this.userData.correo
                this.Apellidos = this.userData.apellido
                this.Movil = this.userData.telefono_movil
                this.Emergencia = this.userData.telefono_emergencia
                this.Cargo = this.userData.rol
                this.Tipo = this.userData.tipo_trabajador
                this.Estado = this.userData.estado
            }
        }
    },
    props: {
        userData: Object
    },
    mounted() {
        console.log("editando")

    },

    data() {
        return {
            Area: "",
            Areas: [],
            Cargando: false,
            Nombre: this.userData.nombre,
            Rut: this.userData.rut_empleado,
            Correo: this.userData.correo,
            Apellidos: this.userData.apellido,
            Movil: this.userData.telefono_movil,
            Emergencia: this.userData.telefono_emergencia,
            Cargo: this.userData.cargo,
            Tipo: "",
            Estado: "",
            Archivos: null,
            Archivos_enviar: "",
            file: "",
            files: "",
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
                    value: 'Jefe(a) de Laboratorio',
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
        remove(index) {
            this.Archivos.splice(index, 1)
        },
        imagenToBase64(newfile) {
            return new Promise((resolve, reject) => {
                // obtener la data de la imagen
                var reader = new FileReader();
                reader.readAsDataURL(newfile);

                reader.onload = () => {
                    resolve(reader.result);
                };

                reader.onerror = function (error) {
                    console.log("Error: ", error);
                    reject("");
                };
            });
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
        enviarDocumentos() {
            console.log(this.Archivos);
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
                        "estado": this.Estado,
                        //"fecha_inicio_vacaciones": "01-01-2000",
                        //"fecha_termino_vacaciones": "01-01-2099",
                        //"dias_administrativos" : "1"
                    }

                    if (this.Archivos_enviar.length != 0) {
                        formData.documentos = this.Archivos_enviar;
                    }
                    console.log("data a enviar", formData)
                    personalService.editarPersonal(formData).then((response) => {
                        this.Cargando = false;
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {

                                this.$bvToast.toast(`Edición de personal exitosa`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-editar-personal');

                            // Reiniciar archivos a enviar=
                            this.Archivos = null;
                            this.Archivos_enviar = "";
                        } else {
                            this.$bvToast.toast(`Error al editar personal`, {
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

<style lang="">

    </style>
