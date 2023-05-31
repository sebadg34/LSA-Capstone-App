<template>
    <b-modal id="modal-detalle-parametro" ref="modal" :title="`Detalles del Parametro`" size="lg"  >

      <template #modal-header="{ close }">
           <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Detalles de la Matriz</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
      </template>

      <div class="p-3">
        <p v-if="this.Nombre == null">No existen detalles de la Matriz!!</p>
        <ul v-else>          
        </ul>
        <b-row class="pb-2">
            <b-col class="col-6">
                <div>
                  Nombre Matriz: <span>{{this.Nombre}}</span>
                </div>

                  <div>
                   Metodología: <span>{{this.metodologia}}</span>
                </div> 

                <div>
                  Parametros: <span>{{this.parametro}}</span>

                </div>
                               
            </b-col>
            
        </b-row>
      </div>

      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
          Cerrar
        </b-button>
      </template>
    </b-modal>
  </template>
  
  <script>
 
  // import ElementosService from '@/helpers/api-services/Elementos.service';
  export default {
    props: {
        detallesData: Object
    },
    data() {
      return {
        
        Nombre: '',
        metodologia: '',
        parametro: [],       

        
      }
    },  

    methods: {    
    
      
    },

    watch: {
      detallesData: {
              handler() {
                  console.log("detallesData actualizada")
                  
                  this.Nombre = this.detallesData.nombre_matriz; 
                  this.metodologia = this.detallesData.metodologiaSeleccionada;
                  this.parametro = this.detallesData.parametroSeleccionado;
                                
              }
          }
    }
  }
  </script>