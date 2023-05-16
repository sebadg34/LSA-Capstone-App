<template>
<validation-observer ref="form">
    <b-modal centered id="modal-cotizacion-solicitante" ref="modal" title="Agregar Cotización" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Cotización</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <template #modal-footer>

            <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Subir archivo
            </b-button>

        </template>
        <hr>
        <b-form-group label="Archivos: " label-cols-sm="2" label-size="lg">
            <b-form-file v-model="Archivo" id="file-large" size="lg"></b-form-file>
        </b-form-group>
        <div class="mt-3">Archivo seleccionado: <span style="font-weight: bold;">{{ Archivo ? Archivo.name : '' }}
                <b-button v-if="Archivo" variant="danger" @click="Archivo = null" style="padding:2px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                    <b-icon icon="x"></b-icon>
                </b-button>
            </span> </div>

            <label class="mt-3" for="datepicker-dateformat2">Fecha emisión</label>
    <b-form-datepicker v-model="Fecha"
      id="datepicker-dateformat2"
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      locale="es"
    ></b-form-datepicker>
    </b-modal>
</validation-observer>
</template>

<script>
import solicitanteService from "@/helpers/api-services/Solicitante.service"
export default {
    watch: {
        userData: {
            handler() {
                this.reiniciarDatos();
            }
        }
    },
    props: {
        userData: Object
    },
    data() {

        return {
            Archivo: "",
            Fecha: ""
        }
    },
    methods: {
        reiniciarDatos(){
            this.Archivo = "",
                this.Fecha = ""
        },
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        enviarFormulario() {
            let formData = new FormData();
            formData = {
                rut_solicitante: this.userData.rut_solicitante,
                fecha_emision: this.Fecha,
            }
            formData.file = this.Archivo;
            console.log("data a enviar", formData);
            solicitanteService.agregarCotizacion(formData).then((response) => {
                console.log(response);
                if (response.request.status == 200) {
                    this.$bvToast.toast(`Guardado de cotización exitoso`, {
                        title: 'Exito',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "success",
                        appendToast: true
                    })
                    this.$emit('refrescar');
                    this.$bvModal.hide('modal-cotizacion-solicitante');
                    this.reiniciarDatos();
                }
            })

        }
    }
}
</script>

<style lang="scss">
.custom-file-input:lang(en)~.custom-file-label::after {
    content: 'Buscar';
}
</style>
