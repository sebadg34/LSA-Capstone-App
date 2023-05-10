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

<hr/>

<div>
        <b-row v-if="Documentos.length" class="mx-auto col-xl-8 col-lg-9 col-md-10 col-12">
            <div class="col-12 d-flex align-items-center" style="background-color: white;height:50px; border-top:2px solid var(--ucn-light-gray); font-weight: bold;">
                <div>Archivos Adjuntos</div>

            </div>
            <div class="col-12" style="background-color: white; ">

                <b-list-group v-for="file in Documentos" :key="file.id">
                    <b-list-group-item class="d-flex justify-content-between">
                        <div>
                            {{ file.nombre_documento }}
                        </div>

                        <b-button variant="info" @click="descargarArchivo(file)" style=" heigth: 25px; width: 26px; border-style: none; padding: 0px; background-color: white;">
                            <b-icon-download variant="info"></b-icon-download>
                        </b-button>
                    </b-list-group-item>
                </b-list-group>

                <br>
            </div>
        </b-row>
    </div>











    
    <template #modal-footer>

        <b-button variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
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
        descargarArchivo(file) {
            console.log(file)
            //let blob = file.data;
            FileSaver.saveAs(file, file.nombre_documento);

        },
        obtenerDetalles(rut){
            personalService.obtenerDetallesPersonal(rut).then((response) => {
                if(response.data != null){
                    this.Documentos = response.data.documentos;
                }
               
            
            })  
        }
    },
    data() {
        return {
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
