<template>
    <b-modal id="modal-detalle-metodologia" :title="`Detalles de la Metodologia`" size="lg" @hidden="onHidden">

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Detalles de la metodologia</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
      </template>

      <div class="p-3">
        <p v-if="this.nombre_metodologia == null">No existen detalles de la metodología o la metodología no existe!!</p>
        <ul v-else>          
        </ul>
        <b-row class="pb-2">
            <b-col class="col-6">
                <div>
                    Nombre Metodología: <span>{{this.nombre_metodologia}}</span>
                </div>

                <div>
                    Analista(s): <span>{{this.Analista}}</span>
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
 
  
  export default {
    props: {
        detallesData: Object
    },
    data() {
      return {
        
        Nombre: '',
        Analista: '',
        nombre_metodologia: '',

        
      }
    },  
    methods: {      
      onHidden() {        
        this.$emit('modal-cerrado');
      }
    },
    watch: {
      detallesData: {
              handler() {
                  console.log("detallesData actualizada")
                  
                  this.nombre = this.detallesData.RUM;
                  this.fecha = this.detallesData.fecha_ingreso
                  this.hora = this.detallesData.hora_ingreso
                  this.nMuestras = this.detallesData.cantidad_muestras
                  this.muestreado = this.detallesData.muestreado_por
                  this.prioridad = this.detallesData.prioridad
                  this.fechaEntrega = this.detallesData.fecha_entrega
                  this.TipoMatriz = this.detallesData.matriz

                  


                  
              }
          }
    }
  }
  </script>