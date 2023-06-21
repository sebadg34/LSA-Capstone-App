<template>
     <validation-observer ref="form">
<b-modal id="modal-Editar-Matriz" ref="modal" :title="`Editar matriz`" size="lg">

    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Editar matriz</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

    <ValidationProvider name="Nombre Matriz" rules="required" v-slot="validationContext">
      <label for="input-live">Nombre de la matriz:</label>
      <b-form-input id="input-live" v-model="Nombre" :state="getValidationState(validationContext)" placeholder="Ingrese nombre de la matriz..." ></b-form-input>
      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>
<br/>
    <b-row>

        <b-col>
            <b-form-group label="Seleccione un parámetro">
                <b-form-select v-model="parametroSeleccionado" :options="opcionesParametro" placeholder="Seleccione un Parámetro" @change="agregarObjetosSeleccionados"></b-form-select>
            </b-form-group>
        </b-col>

        <b-col>
            <b-form-group label="Seleccione una metodología">
                <b-form-select v-model="metodologiaSeleccionada" :disabled="metodologiaDeshabilitada" :options="opcionesMetodologia" placeholder="Seleccione una metodología" @change="agregarObjetosSeleccionados"></b-form-select>
            </b-form-group>
        </b-col>

    </b-row>
    <b-alert variant="danger" :show="sinParametro" dismissible @dismissed="sinParametro = false">
          Falta parámetro asignado para editar la matriz.
        </b-alert>

    <b-row v-if="objetosSeleccionados.length > 0" class="mt-3">
        <b-col>
            <b-form-group label="Param y Met Seleccionados">
                <div v-for="(objetos, index) in objetosSeleccionados" :key="index" class="d-flex align-items-center objetos-item mb-3">
                    <b-input readonly :value="objetos.parametro" class="mr-2"></b-input>
                    <b-input readonly :value="objetos.metodologia"></b-input>
                    <b-button variant="danger" @click="eliminarObjetosSeleccionados(index)" class="ml-2">
                        <b-icon-trash-fill></b-icon-trash-fill>
                    </b-button>
                </div>
            </b-form-group>
        </b-col>
    </b-row>

    <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
        Los Parametros y Metodologias ya se encuentran agregados.
    </b-alert>

    

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <template #modal-footer>
        <b-button @click="actualizarMatriz()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
            Editar y guardar matriz
        </b-button>
       
    </template>
</b-modal>
</validation-observer>
</template>

<script>
import ElementosService from '@/helpers/api-services/Elementos.service';
export default {

    props: {
        matrizData: Object
    },

    data() {

        return {

            Nombre: '',
            metodologiaSeleccionada: '',
            parametroSeleccionado: '',
            parametros_agregar: [],
            parametros_eliminar: [],
            parametros_ya_en_sistema: [],
            opcionesMetodologia: [],
            opcionesParametro: [],
            objetosSeleccionados: [],
            alertaDuplicado: false,
            sinParametro: false,
            listaParametros: [],
            nombreMatriz: '',
            id: '',
            id_matriz: '',
            metodologiaDeshabilitada: true,
        }

    },

    mounted() {

        console.log("montado, obteniendo parametros")
        this.obtenerParametro();

    },

    watch: {
        matrizData: {
            handler() {
                console.log(this.matrizData)

                this.id = this.matrizData.id_matriz;
                this.obtenerDetallesMatriz();
            }
        },
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

        obtenerDetallesMatriz() {

            const data = {
                id_matriz: this.id
            };

            this.parametros_ya_en_sistema = [];
            this.objetosSeleccionados = [];
            this.parametros_agregar = [];
            this.parametros_eliminar = [];

            ElementosService.obtenerDetallesMatriz(data).then((response) => {
                if (response.status === 200) {
                    const id_matriz = response.data[0].id_matriz;

                    const nombre_matriz = response.data[0].nombre_matriz;
                    const parametros = response.data


                    
                    this.Nombre = nombre_matriz;

                    this.id_matriz = id_matriz;
                    this.listaParametros = parametros;

                    
                    // cargo parametros ya en el sistema al modal editar
                    for (var i = 0; i < parametros.length; i++) {
                        this.parametros_ya_en_sistema.push({
                            id_parametro: parametros[i].id_parametro,
                            id_metodologia: parametros[i].id_metodologia,
                            nombre_parametro: parametros[i].nombre_parametro,
                            nombre_metodologia: parametros[i].nombre_metodologia,
                            });
                        }
                    
                    for (var v = 0; v < this.parametros_ya_en_sistema.length; v++) {
                        this.objetosSeleccionados.push({
                            parametro: this.parametros_ya_en_sistema[v].nombre_parametro,
                            metodologia: this.parametros_ya_en_sistema[v].nombre_metodologia
                        })
                    }
                }
            });
        },
        agregarObjetosSeleccionados() {
            if (this.parametroSeleccionado && this.metodologiaSeleccionada) {

                const ParamExistente = this.objetosSeleccionados.find(objeto => objeto.parametro === this.parametroSeleccionado.nombre_parametro);
                const MetExistente = this.objetosSeleccionados.find(objeto => objeto.metodologia === this.metodologiaSeleccionada.nombre_metodologia);

                if (ParamExistente && MetExistente) {
                    this.alertaDuplicado = true;
                    this.parametroSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                } else {

                    this.objetosSeleccionados.push({
                        parametro: this.parametroSeleccionado.nombre_parametro,
                        id_parametro: this.parametroSeleccionado.id_parametro,
                        id_metodologia: this.metodologiaSeleccionada.id_metodologia,
                        metodologia: this.metodologiaSeleccionada.nombre_metodologia
                    });

                    // En caso de agregar un parametro que no está registrado en la BD
                    const parametroAntiguo = this.parametros_ya_en_sistema.find(param => param.nombre_metodologia == this.metodologiaSeleccionada.nombre_metodologia &&
                        param.nombre_parametro == this.parametroSeleccionado.nombre_parametro);
                    if (parametroAntiguo == null) {
                        this.parametros_agregar.push({
                            id_parametro: this.parametroSeleccionado.id_parametro,
                            id_metodologia: this.metodologiaSeleccionada.id_metodologia,
                        });
                    } else {
                        this.parametros_eliminar = this.parametros_eliminar.filter(param => param.id_metodologia != this.metodologiaSeleccionada.id_metodologia &&
                    param.id_parametro != this.parametroSeleccionado.id_parametro)

                    }

                    this.parametroSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                    this.alertaDuplicado = false;
                }
            }
        },
        actualizarMetodologias() {
            const parametro = this.parametroSeleccionado;

            this.opcionesMetodologia.splice(0, this.opcionesMetodologia.length);

            // Buscar el objeto correspondiente al parámetro seleccionado en metodologiasData
            const parametroData = this.metodologiasData.find(item => item.nombre_parametro === parametro.nombre_parametro);
            this.metodologias = parametroData.metodologias

            // Cargamos las metodologias al select de metodologias
            for (var i = 0; i < this.metodologias.length; i++) {
                this.opcionesMetodologia.push({
                    value: this.metodologias[i],
                    text: this.metodologias[i].nombre_metodologia
                })
            }

        },
        obtenerParametro() {
            ElementosService.obtenerParametros().then((response) => {
                if (response.data != null && response.status === 200) {
                    var parametrosObtenidos = response.data;

                    // Almacenar los datos en metodologiasData
                    this.metodologiasData = response.data.map(item => ({
                        id_parametro: item.id_parametro,
                        nombre_parametro: item.nombre_parametro,
                        metodologias: item.metodologias.map(metodologia => ({
                            id_metodologia: metodologia.id_metodologia,
                            nombre_metodologia: metodologia.nombre_metodologia
                        }))
                    }));

                    for (var i = 0; i < parametrosObtenidos.length; i++) {
                        this.opcionesParametro.push({
                            value: parametrosObtenidos[i],
                            text: parametrosObtenidos[i].nombre_parametro
                        })
                    }
                    console.log("opcion", this.opcionesParametro)
                }
            });
        },

        eliminarObjetosSeleccionados(index) {

            console.log(this.objetosSeleccionados[index])
            const yaEnSistema = this.parametros_ya_en_sistema.find(param => param.nombre_metodologia == this.objetosSeleccionados[index].metodologia &&
                param.nombre_parametro == this.objetosSeleccionados[index].parametro);
            console.log(yaEnSistema)
            if (yaEnSistema != null) {

                this.parametros_eliminar.push({
                    id_parametro: yaEnSistema.id_parametro,
                    id_metodologia: yaEnSistema.id_metodologia
                })
              
            } else {
                this.parametros_agregar = this.parametros_agregar.filter(param => param.id_metodologia != this.objetosSeleccionados[index].id_metodologia &&
                    param.id_parametro != this.objetosSeleccionados[index].id_parametro)
                    console.log(this.parametros_agregar)
            }
            this.objetosSeleccionados.splice(index, 1);
        },
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        actualizarMatriz() {

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
            var data = {

                nombre_matriz: this.Nombre,
                id_matriz: this.id,
                parametros_agregar: this.parametros_agregar,
                parametros_eliminar: this.parametros_eliminar
            }
            console.log("data a enviar", data)
            ElementosService.actualizarMatriz(data).then((response) => {
                console.log(response)
                if (response != null) {
                    if (response.status == 200) {
                        this.$bvToast.toast(`Creación de la matriz exitosa`, {
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
                        this.objetosSeleccionados = [],
                        this.parametros_agregar = [];
                        this.parametros_eliminar = [];
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
                }})

        },

    },

}
</script>
