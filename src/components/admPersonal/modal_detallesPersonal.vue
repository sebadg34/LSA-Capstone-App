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
                Teléfono Movil: <span>test</span>
            </div>
            <div>
                Teléfono Emergencia: <span>test</span>
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

    <template #modal-footer>

        <b-button variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Cerrar
        </b-button>

    </template>

</b-modal>
</template>

<script>
export default {
    watch: {
        userData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                this.Nombre = this.userData.nombre
                this.Rut = this.userData.rut
                this.Correo = this.userData.correo
                this.Apellidos = this.userData.apellido
                this.Movil = "9999999"
                this.Emergencia = "9999999"
                this.Cargo = this.userData.rol
                this.Tipo = this.userData.tipo_trabajador
            }
        }
    },
    props: {
        userData: Object
    },
    data() {
        return {
            Nombre: this.userData.nombre,
            Rut: this.userData.rut,
            Correo: this.userData.correo,
            Apellidos: this.userData.apellido,
            Movil: "9999999",
            Emergencia: "999999",
            Cargo: this.userData.rol,
            Tipo: this.userData.tipo_trabajador,
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
