<template>
<b-modal id="modal-estado-personal" ref="modal" title="Agregar Personal" size="lg" :hide-footer="true" @hide="resetVariables" @close="resetVariables">

    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->

        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Estado</div>

        </b-row>

        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <b-row class="d-flex justify-content-center">

        <div>
            {{ this.Nombre }} {{ this.Apellido }}
        </div>
    </b-row>
    <br>
    <b-row class="d-flex justify-content-center">
        <b-col class="col-6" align="center">
            <div>
                <span style="font-weight:bold">ESTADO: </span>
            </div>
            <div style="font-weight: bold;">
                <span v-if="this.Estado" style="color:green">ACTIVO</span>
                <span v-else style="color:red">INACTIVO</span>
            </div>
        </b-col>

    </b-row>
    <br>
    <b-button v-if="!this.Confirming" block class="lsa-light-blue" @click="confirmarCambio(true)" style="font-weight:bold">CAMBIAR ESTADO</b-button>

    <div v-else>

        <b-row class="d-flex justify-content-center">
            <b-col class="col-8" align="center">
                <div>
                    <span>Confirmar cambio de estado</span>
                </div>
                <div style="padding: 10px" class="d-flex justify-content-center">
                    <b-button class="lsa-light-blue" style="font-weight:bold" @click="enviarFormulario()">CAMBIAR</b-button>
                    <b-button class="lsa-orange" style="font-weight:bold" @click="confirmarCambio(false)">Cancelar</b-button>
                </div>
            </b-col>

        </b-row>

    </div>
    <template #modal-footer>

    </template>

</b-modal>
</template>

<script>
import personalService from "@/helpers/api-services/Personal.service"
export default {
    methods: {
        resetVariables(){
this.Confirming = false;
        },
        confirmarCambio(value) {
            this.Confirming = value;
        },
        enviarFormulario() {
            var data = {
                "rut": this.Rut,
                "estado" : !this.Estado
            }
            console.log(data)
            personalService.cambiarEstadoPersonal(data).then((response) => {
                this.Confirming = false;
                console.log(response)
                if (response != null) {
                    if (response.status == 200) {
                        this.$bvToast.toast(`Cambio de estado exitoso`, {
                            title: 'Exito',
                            toaster: 'b-toaster-top-center',
                            solid: true,
                            variant: "success",
                            appendToast: true
                        })
                        this.$emit('refrescar');
                    }
                    this.$bvModal.hide('modal-estado-personal')
                } else {
                    this.$bvToast.toast(`Error al cambiar estado`, {
                        title: 'Error',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "warning",
                        appendToast: true
                    })
                }

            })

        }

    },
    watch: {
        userData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                this.Estado = this.userData.estado
                this.Nombre = this.userData.nombre
                this.Apellido = this.userData.apellido
                this.Rut = this.userData.rut_empleado
            }
        }
    },
   
    props: {
        userData: Object
    },
    data() {
        return {
            Estado: "",
            Nombre: "",
            Apellido: "",
            Rut: "",
            Confirming: false

        }
    },
}
</script>

<style lang="">

</style>
