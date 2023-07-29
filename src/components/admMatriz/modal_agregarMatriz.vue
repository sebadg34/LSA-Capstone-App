<template>
    <validation-observer ref="form">
<b-modal id="modal-Agregar-Matriz" ref="modal" :title="`Agregar Matriz`" size="lg">

    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Agregar matriz</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

    <ValidationProvider name="nombre de la matriz" rules="required" v-slot="validationContext">
      <label for="input-live">Nombre de la matriz:</label>
      <b-form-input id="input-live" v-model="Nombre" :state="getValidationState(validationContext)" placeholder="Ingrese el nombre de la matriz." ></b-form-input>
      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>

    <br/>
    <b-row>

        <b-col>
            <b-form-group label="Seleccione un parámetro:">
                <b-form-select v-model="parametroSeleccionado" :options="opcionesParametro" placeholder="Seleccione un parámetro:" @change="agregarObjetosSeleccionados"></b-form-select>
            </b-form-group>
        </b-col>

        <b-col>
            <b-form-group label="Seleccione una metodología:">
                <b-form-select v-model="metodologiaSeleccionada" :options="opcionesMetodologia" placeholder="Seleccione una metodología:" :disabled="metodologiaDeshabilitada" @change="agregarObjetosSeleccionados"></b-form-select>
            </b-form-group>
        </b-col>

    </b-row>
    <b-alert variant="danger" :show="sinParametro" dismissible @dismissed="sinParametro = false">
          Falta asignar un(os) parámetro(s) para crear la matriz.
        </b-alert>
    <b-row v-if="objetosSeleccionados.length > 0" class="mt-3">
        <b-col>
            <b-form-group label="Parárametro(s) y metodología(s) seleccionadas:">
                <div v-for="(objetos, index) in objetosSeleccionados" :key="index" class="d-flex align-items-center objetos-item mb-3">
                    <b-input readonly :value="objetos.parametro" class="mr-2"></b-input>
                    <b-input readonly :value="objetos.metodologia" class="mr-2"></b-input>
                    <b-button variant="danger" @click="eliminarObjetosSeleccionados(index)" class="ml-2">
                        <b-icon-trash-fill></b-icon-trash-fill>
                    </b-button>
                </div>
            </b-form-group>
        </b-col>
    </b-row>

    <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
        Los parámetros y metodologías ya se encuentran agregados.
    </b-alert>

    
    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <template #modal-footer>
        <b-button @click="AgregarMatriz()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
            Agregar matriz
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
            metodologiaSeleccionada: '',
            parametroSeleccionado: '',
            opcionesMetodologia: [],
            opcionesParametro: [], // dejar vacio cuando se implemente las opciones via backend.
            objetosSeleccionados: [],
            alertaDuplicado: false,
            sinParametro: false,
            parametros_agregar: [{
                id_parametro: '',
                id_metodologia: '',
            }],
            metodologiasData: [],
            metodologias: [],
            metodologiaDeshabilitada: true,
            parametros: []

        }

    },

    mounted() {

        this.obtenerParametro();

    },

    watch: {
        parametroSeleccionado: function (newParametro) {
            if (newParametro) {
                this.actualizarMetodologias();
                this.metodologiaDeshabilitada = false; // Habilita el input 
            } else {
                this.metodologiaDeshabilitada = true;
            }
        },
    },

    methods: {

        obtenerParametro() {
            ElementosService.obtenerParametros().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo Parametros: ", response.data);

                    // Almacenar los datos en metodologiasData
                    this.metodologiasData = response.data.map(item => ({
                        id_parametro: item.id_parametro,
                        nombre_parametro: item.nombre_parametro,
                        metodologias: item.metodologias.map(metodologia => ({
                            id_metodologia: metodologia.id_metodologia,
                            nombre_metodologia: metodologia.nombre_metodologia
                        }))
                    }));

                    console.log("Metodologia Data: ", this.metodologiasData)

                    this.opcionesParametro = response.data.map(item => item.nombre_parametro);
                    console.log("opcion", this.opcionesParametro)
                }
            });
        },

        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        eliminarObjetosSeleccionados(index) {
            this.objetosSeleccionados.splice(index, 1);
        },

        actualizarObjetosSeleccionados(index, parametro, metodologia) {
            this.objetosSeleccionados[index].parametro = parametro;
            this.objetosSeleccionados[index].metodologia = metodologia;
        },

        actualizarMetodologias() {
            const parametro = this.parametroSeleccionado;

            // Buscar el objeto correspondiente al parámetro seleccionado en metodologiasData
            console.log("Metodologia Data 2: ", this.metodologiasData)
            const parametroData = this.metodologiasData.find(item => item.nombre_parametro === parametro);

            console.log("Parámetro seleccionado:", parametro);
            console.log("Objeto del parámetro seleccionado:", parametroData);
            console.log("Metodologías del parámetro seleccionado:", parametroData.metodologias);

            this.metodologias = parametroData.metodologias
            console.log("Metodologías den array:", this.metodologias);

            this.opcionesMetodologia = this.metodologias.map(item => item.nombre_metodologia);
            console.log("opciones Metodologia:", this.opcionesMetodologia);

            /*if (parametroData.metodologias.length > 0) {
              // Obtener las metodologías asociadas al parámetro seleccionado
              const metodologias = parametroData.metodologias[0].metodologias;

              console.log("Metodologías asociadas al parámetro seleccionado:", metodologias);

              // Obtener solo los nombres de las metodologías
              this.opcionesMetodologia = metodologias.map(item => item.nombre_metodologia);
            } else {
              this.opcionesMetodologia = []; // No se encontraron metodologías para el parámetro seleccionado
            }*/
        },

        agregarObjetosSeleccionados() {
            if (this.parametroSeleccionado && this.metodologiaSeleccionada) {
                const ParamExistente = this.objetosSeleccionados.find(objeto => objeto.parametro === this.parametroSeleccionado);
                const MetExistente = this.objetosSeleccionados.find(objeto => objeto.metodologia === this.metodologiaSeleccionada);

                if (ParamExistente && MetExistente) {
                    this.alertaDuplicado = true;
                    this.parametroSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                } else {
                    const parametroData = this.metodologiasData.find(item => item.nombre_parametro === this.parametroSeleccionado);
                    const metodologiaCompleta = parametroData.metodologias.find(metodologia => metodologia.nombre_metodologia === this.metodologiaSeleccionada);

                    this.objetosSeleccionados.push({
                        parametro: this.parametroSeleccionado,
                        metodologia: metodologiaCompleta.nombre_metodologia
                    });
                    this.parametros_agregar.push({
                        id_parametro: parametroData.id_parametro,
                        id_metodologia: metodologiaCompleta.id_metodologia,

                    });
                    console.log("las matrices ahn guardado lo siguiente: ", this.parametros_agregar)
                    this.parametroSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                    this.alertaDuplicado = false;
                }
            }
        },

        AgregarMatriz() {

            this.$refs.form.validate().then(success => {
                if(!success ){
                    if(this.objetosSeleccionados.length == 0){
                        this.sinParametro = true;
                    }else{
                        this.sinParametro = false;
                    }
                    return;
                }else{

                    if(this.objetosSeleccionados.length == 0){
                        this.sinParametro = true;
                        return;
                    }else{
                        this.sinParametro = false;
                    }
                    const matricesFiltradas = this.parametros_agregar.slice(1);
                    const data = {
                        nombre_matriz: this.Nombre,
                        parametros_agregar: matricesFiltradas.map(matriz => ({
                            id_parametro: matriz.id_parametro,
                            id_metodologia: matriz.id_metodologia,

                        }))
                    };
                    console.log("data a enviar", data)
                    ElementosService.agregarMatriz(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Creación de la matriz exitosa.`, {
                                    title: 'Éxito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');

                                this.Nombre = '',
                                this.metodologiaSeleccionada = '',
                                this.parametroSeleccionado = '',
                                this.sinParametro = false;
                                this.objetosSeleccionados = [],
                                this.parametros_agregar = [{
                                    id_parametro: '',
                                    id_metodologia: '',
                                }],

                                this.$refs.modal.hide()
                            }
                        } else {
                            this.$bvToast.toast(`Error al agregar la matriz.`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                        }
                    })
                }
            })           
        },

    },

}
</script>