<template>
<validation-observer ref="form">
    <b-modal centered id="modal-Agregar-Parametro" ref="modal" :title="`Agregar Parametro`" size="md">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar parámetro</div>
            </b-row>
            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <ValidationProvider name="nombre del parámetro" rules="required" v-slot="validationContext">
            <label for="input-live">Nombre del parámetro:</label>
            <b-form-input id="input-live" v-model="Nombre" :state="getValidationState(validationContext)" placeholder="Ingrese el nombre del parámetro."></b-form-input>
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
        </ValidationProvider>
<br/>
        <b-row>
            <b-col>
                <b-form-group label="Asignar una metodología">
                    <b-form-select v-model="metodologiaAsignada" :options="opcionesMetodologia" placeholder="Seleccione una metodología:" @change="agregarMetodologiaSeleccionada"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-alert variant="danger" :show="sinMetodologia" dismissible @dismissed="sinMetodologia = false">
            Falta metodología asignada para crear el parámetro.
        </b-alert>
        <hr/>
        <b-row v-if="metodologiaSeleccionada.length > 0" class="mt-3">
            <b-col>
                <b-form-group label="Metodologías Seleccionadas">
                    <div v-for="(metodologia, index) in metodologiaSeleccionada" :key="index" class="d-flex align-items-center analista-item">
                        <b-input readonly :value="metodologia.nombre_metodologia"></b-input>
                        <b-button variant="danger" @click="eliminarMetodologiaSeleccionada(index)" class="ml-2">
                            <b-icon-trash-fill></b-icon-trash-fill>
                        </b-button>
                    </div>
                </b-form-group>
            </b-col>
        </b-row>

        <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
            La metodología ya fue agregada.
        </b-alert>

        

        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

        <template #modal-footer>
      
          
            <b-button @click="AgregarParametro()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
                Agregar parámetro
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
            opcionesMetodologia: [],
            metodologiaAsignada: '',
            metodologiaSeleccionada: [],
            alertaDuplicado: false,
            metodologiasData: [],
            sinMetodologia: false,
            metodologias_agregar: [{
                id_metodologia: ''
            }]
        }
    },

    mounted() {

        this.obtenerMetodologias();

    },

    methods: {
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },

        obtenerIdMetodologia(nombreMetodologia) {
            const metodologia = this.metodologiasData.find(item => item.nombre_metodologia === nombreMetodologia);
            return metodologia ? metodologia.id_metodologia : null;
        },

        obtenerMetodologias() {
            ElementosService.obtenerMetodologias().then((response) => {
                if (response.data != null && response.status === 200) {
                    this.metodologiasData = response.data;
                    this.opcionesMetodologia = response.data.map(item => item.nombre_metodologia);
                    console.log("Obteniendo Metodologias: ", response.data);
                }
            });
        },

        agregarMetodologiaSeleccionada() {
            if (this.metodologiaAsignada) {
                const existeMetodologia = this.metodologiaSeleccionada.some(metodologia => metodologia.nombre_metodologia === this.metodologiaAsignada);
                if (existeMetodologia) {
                    this.alertaDuplicado = true;
                } else {
                    const idMetodologia = this.obtenerIdMetodologia(this.metodologiaAsignada);
                    this.metodologiaSeleccionada.push({
                        nombre_metodologia: this.metodologiaAsignada,
                        id_metodologia: idMetodologia
                    });
                    this.metodologias_agregar = this.metodologiaSeleccionada.map(metodologia => ({
                        id_metodologia: metodologia.id_metodologia
                    }));
                    this.metodologiaAsignada = '';
                    this.alertaDuplicado = false;
                }
            }
        },

        eliminarMetodologiaSeleccionada(index) {
             this.metodologias_agregar = this.metodologias_agregar.filter(metodo => metodo.id_metodologia != this.metodologiaSeleccionada[index].id_metodologia)
            this.metodologiaSeleccionada.splice(index, 1);
        },

        AgregarParametro() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {

                    if (this.metodologiaSeleccionada.length == 0) {
                        this.sinMetodologia = true;

                        return;
                    }
                    var data = {

                        nombre_parametro: this.Nombre,
                        metodologias_agregar: this.metodologias_agregar

                    }
                    console.log("data a enviar", data)
                    ElementosService.agregarParametro(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`La creación del parámetro ha sido exitosa.`, {
                                    title: 'Éxito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })

                                this.$emit('refrescar');

                                this.Nombre = '',
                                    this.metodologiaAsignada = '',
                                    this.metodologiaSeleccionada = [],

                                    this.$refs.modal.hide()
                            }
                        } else {
                            this.$bvToast.toast(`Error al agregar el parámetro.`, {
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

}
</script>
