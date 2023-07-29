<template>
    <b-modal id="modal-analista-designado" :title="`Analista Designado ${RUM}`" size="lg" @hidden="onHidden">

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Analista(s) designado(s)</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>
      

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
    
  },
  data() {
    return {
      
      RUM: '',    
      
    }
  },  
  methods: {      
    onHidden() {        
      this.$emit('modal-cerrado');
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