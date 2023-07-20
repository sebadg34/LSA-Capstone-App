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

                        <b-form-input size="sm" disabled id="rut-input" class="mb-1" v-model="Rut"
                            :state="getValidationState(validationContext)"
                            aria-describedby="rut-live-feedback"></b-form-input>

                        <b-form-invalid-feedback id="rut-live-feedback">{{
                            validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </ValidationProvider>
                    <ValidationProvider name="de apellidos" rules="required" v-slot="validationContext">
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
                    <ValidationProvider name="de nombres" rules="required|min:2" v-slot="validationContext">
                        <label for="input-live">Nombre:</label>
                        <b-form-input size="sm" class="mb-1" id="input-live" :state="getValidationState(validationContext)"
                            v-model="Nombre" aria-describedby="input-live-help nombre-live-feedback" placeholder=""
                            trim></b-form-input>
                        <b-form-invalid-feedback id="nombre-live-feedback">{{
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
            <hr />

            <b-row v-if="PerteneceArea">


                <b-col class="col-5">
                    <label for="area-live">Area:</label>
                    <b-form-select size="md" aria-describedby="area-live-feedback" class="mb-1" v-model="AreaSeleccionada"
                        :options="Areas"></b-form-select>
                </b-col>
                <b-col class="col-6">

                    <label for="input-live">Tipo de análisis:</label>
                    <b-form-input size="md" aria-describedby="tipo-live-feedback" class="mb-1" :disabled="!AreaSeleccionada"
                        v-model="AnalisisSeleccionado"></b-form-input>
                </b-col>
                <b-col class="col-1 d-flex align-items-end">
                    <b-button variant="success" class="reactive-button" @click="agregarAreaAnalisis()"
                        :disabled="!AnalisisSeleccionado"
                        style="padding:1px; margin-bottom:5px; aspect-ratio: 1 / 1; width:35px; height: 35px;">
                        <b-icon icon=" plus-circle-fill"></b-icon>
                    </b-button>
                </b-col>

                <b-col>
                    <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
                        El area y tipo de análisis ya fueron agregados.
                    </b-alert>
                    <b-alert variant="danger" :show="alertaVacio" dismissible @dismissed="alertaVacio = false">
                        Se requiere de area y tipo de análisis para registrar personal.
                    </b-alert>
                </b-col>
                <b-col class="col-12">
                    <div>

                        <b-row v-if="Areas_seleccionadas.length > 0" class="mt-3">
                            <b-col>
                                <b-form-group label="Areas y tipo analisis agregados:">
                                    <div v-for="(objetos, index) in Areas_seleccionadas" :key="index"
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

            </b-row>

            <b-row>
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


            <template #modal-footer>
                <b-overlay :show="Cargando" rounded opacity="0.6" spinner-small spinner-variant="primary"
                    class="d-inline-block">
                    <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button"
                        style="font-weight:bold">
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
        Cargo: {
            handler() {
                if (this.Cargo == "Gerente" || this.Cargo == "Jefe(a) de laboratorio" || this.Cargo == "Administrador(a) de Finanzas") {
                    this.PerteneceArea = false;
                } else {
                    this.PerteneceArea = true;
                }
            }
        },
        userData: {
            handler() {

                console.log("PROP CHANGED, UPDATE MODAL", this.userData)
                console.log(this.cargos)
                this.Nombre = this.userData.nombre
                this.Rut = this.userData.rut_empleado;
                this.obtenerAreasEmpleado(this.Rut);
                this.Correo = this.userData.correo
                this.Apellidos = this.userData.apellido
                this.Movil = this.userData.telefono_movil
                this.Emergencia = this.userData.telefono_emergencia
                this.Cargo = this.userData.rol;
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
        this.obtenerAreas();

    },
    data() {
        return {
            cargokey: 1,
            PerteneceArea: false,
            AreaSeleccionada: "",
            AnalisisSeleccionado: "",
            Areas: [],
            alertaDuplicado: false,
            alertaVacio: false,
            Areas_agregar: [],
            Areas_eliminar: [],
            Areas_antiguas: [],
            Areas_seleccionadas: [],
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
            const areaAntigua = this.Areas_antiguas.find(area => area.id_area == this.Areas_seleccionadas[index].id_area && area.tipo_analisis == this.Areas_seleccionadas[index].tipo_analisis);
            if (areaAntigua != null) {
                this.Areas_eliminar.push(this.Areas_seleccionadas[index]);
                console.log("area antigua, borrando!");

            } else {
                console.log("no es antigua, solo quitala del editar")
            }
            this.Areas_seleccionadas.splice(index, 1);
        },
        agregarAreaAnalisis() {
            const existeAreaAnalisis = this.Areas_seleccionadas.find(area => area.id_area == this.AreaSeleccionada.id_area && area.tipo_analisis == this.AnalisisSeleccionado);
            if (existeAreaAnalisis == null) {


                const areaAntigua = this.Areas_eliminar.find(area => area.id_area == this.AreaSeleccionada.id_area && area.tipo_analisis == this.AnalisisSeleccionado);
                // en caso de agregar area antigua que se iba a eliminar
                if (areaAntigua != null) {
                    this.Areas_eliminar = this.Areas_eliminar.filter(area => area != areaAntigua);
                    console.log("retracta la eliminacion", this.Areas_eliminar);
                } else {
                    console.log("nuevo! agregando...")
                    this.Areas_agregar.push({
                        id_area: this.AreaSeleccionada.id_area,
                        tipo_analisis: this.AnalisisSeleccionado
                    })
                }

                this.Areas_seleccionadas.push({
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
            this.Areas = [];
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
        obtenerAreasEmpleado(rut) {
            this.Areas_agregar = [];
            this.Areas_eliminar = [];
            this.Areas_seleccionadas = [];
            this.Areas_antiguas = [];
            personalService.obtenerDetallesPersonal(rut).then((response) => {
                if (response.data != null) {
                    const areasData = response.data.areas;
                    for (var i = 0; i < areasData.length; i++) {
                        this.Areas_seleccionadas.push({
                            id_area: areasData[i].id_area,
                            nombre_area: areasData[i].nombre_area,
                            tipo_analisis: areasData[i].tipo_analisis,

                        })
                        this.Areas_antiguas.push({
                            id_area: areasData[i].id_area,
                            nombre_area: areasData[i].nombre_area,
                            tipo_analisis: areasData[i].tipo_analisis,
                        })
                    }

                }

            })
        },
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {

                    return;
                } else {

                    if (this.PerteneceArea && this.Areas_seleccionadas.length == 0) {
                        this.alertaVacio = true;
                        return;
                    }

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

                    }
                    formData.areas_agregar = this.Areas_agregar;
                    formData.areas_eliminar = this.Areas_eliminar;
                    

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
