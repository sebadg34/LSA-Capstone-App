<template>
<b-modal id="modal-detalles-personal" ref="modal" title="Agregar Personal" size="lg">
    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->

        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Detalles personal</div>

        </b-row>

        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <b-col>
        <b-row>
            <div>
                Nombre Completo: <span>{{this.Nombre}} {{ this.Apellidos }}</span>
            </div>
        </b-row>
        <b-row>
            <div>
                Rut: <span>{{this.Rut}}</span>
                <div>
                    Correo: <span>{{this.Correo}}</span>
                </div>

            </div>
        </b-row>
    </b-col>
    <b-row>
        <b-col class="col-6">
            <div>
                Teléfono Movil: <span>{{this.Movil}}</span>
            </div>
            <div>
                Teléfono Emergencia: <span>{{this.Emergencia}}</span>
            </div>
        </b-col>
        <b-col class="col-6">
            <div>
                Cargo: <span>{{ this.Cargo }}</span>
            </div>
            <div>
                Tipo Trabajador: <span>{{this.Tipo}}</span>
            </div>
        </b-col>
    </b-row>

    <hr />
    <div v-if="Documentos.length == 0 && CargandoArchivos == false">
        <b-list-group-item>
            <div class="text-center lsa-light-blue-text my-2 row">
                <div class="col">
                    <b-icon icon="file-earmark-break" animation="fade" variant="secondary"></b-icon>
                    <div style="font-weight:bold; color:gray">No hay documentos registrados por mostrar</div>
                </div>

            </div>
        </b-list-group-item>
    </div>
    <div>
        <div v-if="CargandoArchivos" class="text-center lsa-orange-text my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong> Cargando...</strong>
        </div>

        <b-row v-if="Documentos.length != 0" class="mx-auto col-xl-8 col-lg-9 col-md-10 col-12">
            <div class="col-12" style="background-color: white;height:50px; border-top:2px solid var(--ucn-light-gray); font-weight: bold;">
                <b-list-group>
                    <b-list-group-item class="d-flex justify-content-between" style="padding-right:5px; padding-left:5px">
                        <div>Fecha Subida</div>
                        <div>Archivos Adjuntos</div>
                        <div>Accion</div>
                    </b-list-group-item>

                </b-list-group>
            </div>
            <div class="col-12" style="background-color: white; ">

                <b-list-group>
                    <b-list-group-item v-for="file in Documentos" :key="file.id" style="padding:5px" class="d-flex justify-content-between">
                        <div>
                            {{ file.fecha_subida }}
                        </div>
                        <div>
                            {{ file.nombre_original_documento }}
                        </div>
                        <div class="d-flex justify-content-around">
                            <b-button variant="info" @click="descargarArchivo(file)" style=" heigth: 33px; width: 33px; border-style: none; padding: 0px; background-color: white;">
                                <b-icon-download scale="1" variant="info"></b-icon-download>
                            </b-button>

                            <b-button variant="danger" @click="borrarArchivo(file)" style=" height: 23px; width: 23px; border-style: none; padding: 0px; aspect-ratio: 1;">
                                <b-icon scale="0.7" icon="trash-fill"></b-icon>
                            </b-button>
                        </div>

                    </b-list-group-item>
                </b-list-group>

                <br>
            </div>
        </b-row>

    </div>

    <template #modal-footer="{ close }">

        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Cerrar
        </b-button>

    </template>

</b-modal>
</template>

<script>
import personalService from "@/helpers/api-services/Personal.service"
import FileSaver from 'file-saver';

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

                this.obtenerDetalles(this.Rut);
            }
        }
    },
    props: {
        userData: Object
    },
    methods: {
        borrarArchivo(file) {
            console.log('archivo a borrar', file)

            var data = {
                rut_empleado: file.rut_empleado,
                nombre_original_documento: file.nombre_original_documento,
                nombre_documento: file.nombre_documento
            }
            console.log('data a enviar', data)
            personalService.eliminarDocumento(data).then((response) => {
                if (response.status == 200) {
                    this.$bvToast.toast(`Archivo borrado exitosamente`, {
                        title: 'Exito',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "success",
                        appendToast: true
                    })
                    console.log(response)
                    this.obtenerDetalles(this.Rut);
                }
            })
        },
        descargarArchivo(file) {
            console.log(file)
            personalService.descargarDocumento(file).then((response) => {
                if (response.data != null) {

                    FileSaver.saveAs(response.data, file.nombre_original_documento);
                }
            })

        },
        obtenerDetalles(rut) {
            this.CargandoArchivos = true;
            personalService.obtenerDetallesPersonal(rut).then((response) => {
                if (response.data != null) {
                    this.Documentos = response.data.documentos;
                    this.CargandoArchivos = false;
                }

            })
        }
    },
    data() {
        return {
            CargandoArchivos: false,
            Nombre: this.userData.nombre,
            Rut: this.userData.rut_empleado,
            Correo: this.userData.correo,
            Apellidos: this.userData.apellido,
            Movil: this.userData.telefono_movil,
            Emergencia: this.userData.telefono_emergencia,
            Cargo: this.userData.rol,
            Tipo: this.userData.tipo_trabajador,
            Documentos: "",
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
}
</script>

<style lang="">

</style>
