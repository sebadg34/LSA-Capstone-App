<template>
    <b-modal id="modal-rehacer-analisis" :title="`rehacerAnalisis ${RUM}`" size="lg" @hidden="onHidden">

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Rehacer Análisis</div>
            </b-row> 
            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <div>
        <b-button variant="primary" @click="RehacerAna()">
            Rehacer Análisis
    
        </b-button>
    </div>
      

      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
          Cerrar
        </b-button>
      </template>
    </b-modal>
  </template>

<script>   

import MuestraService from '@/helpers/api-services/Muestra.Service';
export default {
  props: {
    
  },
  data() {
    return {
      
      RUM: '',  
      
    }
  },  
  methods: { 
    onHidden() {        
        this.$emit('modal-cerrado');
      },     
    
    RehacerAna(){
       MuestraService.rehacerMuestra(this.RUM)


    }
    
  },
  watch: {
    Data: {
            handler() {
                console.log("Data actualizada")                
                     


            }
        }
  }
}
</script>