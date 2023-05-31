<template>
    <b-modal id="modal-Agregar-Matriz" ref="modal" :title="`Agregar Matriz`" size="lg">
        

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Matriz</div>
            </b-row>
            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
      </template> 
      
      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      
      <b-form-group label="Nombre de Matriz">
         <b-form-input v-model="Nombre"></b-form-input>
      </b-form-group>

      <b-row>
        
          <b-col>
            <b-form-group label="Seleccione un parámetro">
              <b-form-select v-model="parametroSeleccionado" :options="opcionesParametro" placeholder="Seleccione un Parámetro" @change="agregarObjetosSeleccionados"></b-form-select>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Seleccione una Metodología">
              <b-form-select v-model="metodologiaSeleccionada" :options="opcionesMetodologia" placeholder="Seleccione una metodología" @change="agregarObjetosSeleccionados"></b-form-select>
            </b-form-group>
          </b-col>
      
      </b-row>

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

  <div class="d-flex justify-content-center">
  <b-button @click="AgregarMatriz()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
    Agregar Matriz
  </b-button>
</div>

      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
          Cerrar
        </b-button>
      </template>      
    </b-modal>
</template>

<script>

import ElementosService from '@/helpers/api-services/Elementos.service';
export default {

    data(){

        return {

            Nombre: '',
            metodologiaSeleccionada: '',
            parametroSeleccionado: '',
            opcionesMetodologia: [],
            opcionesParametro: ["x","y"], // dejar vacio cuando se implemente las opciones via backend.
            objetosSeleccionados: [],
            alertaDuplicado: false,
            
        }

    },

    mounted() {

      //this.obtenerParametro();    

    }, 

    watch: {
    parametroSeleccionado(nuevoParametro) {
      this.actualizarMetodologias(nuevoParametro);
    },
  },

    methods: { 
      
            
      /*obtenerParametro() {
        
        ElementosService.obtenerParametros().then((response) => {
          if (response.data != null && response.status === 200) {
            console.log("Obteniendo Parametros: ", response.data);
            this.opcionesParametro = response.data.map(item => item.nombre_parametro);
          }
        });
      },*/

      actualizarMetodologias() {
  const parametro = this.parametroSeleccionado;
  
  // Array de prueba
  const metodologiasPorParametro = [
    { parametro: 'x', metodologias: ['Metodología X1', 'Metodología X2'] },
    { parametro: 'y', metodologias: ['Metodología Y1', 'Metodología Y2'] },
    
  ];

  // Buscar en el array de metodologías por parámetro el objeto correspondiente al parámetro seleccionado
  const objetoMetodologias = metodologiasPorParametro.find(objeto => objeto.parametro === parametro);
  
  if (objetoMetodologias) {
    // Si se encuentra un objeto con las metodologías asociadas al parámetro seleccionado
    this.opcionesMetodologia = objetoMetodologias.metodologias;
  } else {
    // Si no se encuentra un objeto para el parámetro seleccionado, se asigna un array vacío a las opciones de metodología
    this.opcionesMetodologia = [];
  }
},

agregarObjetosSeleccionados() {
      if (this.parametroSeleccionado && this.metodologiaSeleccionada) {
        const ParamExistente = this.objetosSeleccionados.find(objeto => objeto.parametro === this.parametroSeleccionado);
        const MetExistente = this.objetosSeleccionados.find(objeto => objeto.metodologia === this.metodologiaSeleccionada);
        if (ParamExistente && MetExistente) {
          this.alertaDuplicado = true;
        } else {
          this.objetosSeleccionados.push({
            parametro: this.parametroSeleccionado,
            metodologia: this.metodologiaSeleccionada
          });
          this.parametroSeleccionado = '';
          this.metodologiaSeleccionada = '';
          this.alertaDuplicado = false;
        }
      }
    },

      
    eliminarObjetosSeleccionados(index) {
      
      this.objetosSeleccionados.splice(index, 1);
    },

    AgregarMatriz(){

      var data = {

        nombre_matriz: this.Nombre, 
      }
      console.log("data a enviar", data)
      ElementosService.agregarMatriz(data).then((response)=>{
        console.log(response)
        if(response != null){
          if (response.status == 200) {
            this.$bvToast.toast(`Creación de la matriz exitosa`, {
              title: 'Exito',
              toaster: 'b-toaster-top-center',
              solid: true,
              variant: "success",
              appendToast: true
            })    
      this.$emit('matrizAgregada');   

      this.Nombre = '',
      this.metodologiaSeleccionada = '',
      this.parametroSeleccionado = '',
      this.opcionesMetodologia = [],
      this.opcionesParametro = [], 
      this.objetosSeleccionados = [],
      

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
},


    

    },

}
</script>