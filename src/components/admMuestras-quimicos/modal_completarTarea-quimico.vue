<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-completar-tarea-quimico" ref="modal" title="Marcar tarea como completada" size="md">

            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->

                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Marcar tarea como completada</div>

                </b-row>

                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <template #modal-footer="{ close }">
                <b-col class="col12">
                <b-row class="d-flex justify-content-around">
                    <b-overlay style="width:35%" :show="busy" rounded opacity="0.6" spinner-small spinner-variant="primary"
                        class="d-inline-block">
                        <b-button  block :disabled="!completar_permitido" @click="enviarFormulario()" variant="primary"
                            class="float-right reactive-button lsa-light-blue" style="font-weight:bold">
                            Confirmar
                        </b-button>
                    </b-overlay>

                    <b-button @click="close" class="float-right reactive-button lsa-orange" style="font-weight:bold; width:35%">
                        Cancelar
                    </b-button>
                  
                </b-row>
            </b-col>
            </template>

            <b-row class="d-flex justify-content-center">
                <b-col class="col-12">
                    <div class="d-flex justify-content-center">
                        <b-icon icon="exclamation-circle"
                            style="width: 80px; height: 80px; color: var(--lsa-orange)"></b-icon>
                    </div>
                    <div class="d-flex justify-content-center"
                        style="font-weight: bold; font-size: 1.3rem; text-align: center;">
                        ¿Estás seguro que deseas marcar la tarea como completada?
                    </div>

                    <b-list-group-item v-if="loading"
                        class="d-flex align-items-center justify-content-center lsa-orange-text" style="height:100px">
                        <div>
                            <b-spinner class="align-middle"></b-spinner>
                            <strong> Cargando...</strong>
                        </div>
                    </b-list-group-item>


                </b-col>
                <br />

            </b-row>

        </b-modal>
    </validation-observer>
</template>

<script>
import MuestraQuimicoService from '@/helpers/api-services/Muestra-quimicos.service';
import {
    getUserInfo
} from "@/helpers/api-services/Auth.service";
//import { now } from 'moment';
export default {
    watch: {
        muestraData: {
            handler() {
                this.RUM = this.muestraData.RUM;
                this.rut_empleado = getUserInfo().rut;
                //this.verificarEstado();

            }
        }
    },
    props: {
        muestraData: Object,
    },
    data() {
        return {
            loading: false,
            completar_permitido: true,
            observacion: "",
            fecha_emision: "",
            busy: false,
            rut_empleado: "",
            RUM: ""

        }
    },
    methods: {
        onContext(ctx) {

            // Setear fecha a su version formateada de dd/mm/yyyy
            console.log(ctx)
            this.FechaFormatted = ctx.selectedFormatted

        },
        reiniciarDatos() {
            this.observacion = "";
        },
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },

        verificarEstado() {
            this.loading = true;
        },
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {



                    this.busy = true;
                    MuestraQuimicoService.completarAnalisis(this.RUM).then((response) => {
                        this.busy = false;
                        console.log(response);
                        if (response.request.status == 200) {
                            this.$bvToast.toast(`La tarea ha sido marcada exitosamente.`, {
                                title: 'Éxito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$emit('refrescar');
                            this.$bvModal.hide('modal-completar-tarea-quimico');
                        }else{
                            this.$bvToast.toast(`Error al marcar tarea.`, {
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
}</style>
