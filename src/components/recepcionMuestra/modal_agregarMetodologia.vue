<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-Agregar-Metodologia" ref="modal" :title="`Agregar Metodologia`" size="md">
            <template #modal-header="{ close }">
                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Agregar metodología</div>
                </b-row>
                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>

            <ValidationProvider name="nombre de la metodología" rules="required" v-slot="validationContext">
                <label for="input-live">Nombre de la metodología:</label>
                <b-form-input id="input-live" v-model="Nombre" :state="getValidationState(validationContext)"
                    placeholder="Ingrese nombre de la metodología"></b-form-input>
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
            <br />


            <template #modal-footer>
                <b-button @click="AgregarMetodologia()" variant="primary" size="xl" class="reactive-button"
                    style="font-weight:bold">
                    Agregar metodología
                </b-button>
            </template>
        </b-modal>
    </validation-observer>
</template>
  
<script>

import ElementosService from '@/helpers/api-services/Elementos.service';

export default {
    data() {
        return {
            Nombre: '',
        };
    },

    mounted() {

    },

    methods: {

        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        AgregarMetodologia() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {

                    var data = {

                        nombre_metodologia: this.Nombre,
                    }
                    console.log("data a enviar", data)
                    ElementosService.agregarMetodología(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Creación de la metodología exitosa`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');

                                this.Nombre = '',
                                    this.Descripción = '',
                                    this.AnalistaAsignado = '',
                                    this.analistasSeleccionados = [],
                                    this.rutEmpleadosSeleccionados = [],
                                    this.empleados_agregar = [{
                                        rut_empleado: '',
                                        nombre: ''
                                    }],


                                    this.$refs.modal.hide()
                            }
                        } else {
                            this.$bvToast.toast(`Error al agregar la metodología.`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                        }
                    });
                }
            })
        },
    },
};
</script>