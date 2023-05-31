<template>
    <div style="margin-bottom:50px">
<b-row style="padding-top:30px; ">
  <b-col class="col-6">
      <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
          Administración de Normas
      </div>
  </b-col>
</b-row>

<div class="row justify-content-center" style="padding-top:30px; padding-bottom:10px; margin-left: 5px;">
  <div class="col-10">  
              <b-row>
                <modal_agregarNorma/>  
                  <b-button v-b-modal.modal-Agregar-Norma style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                      Agregar Norma
                      <b-icon icon="journals"></b-icon>
                  </b-button>
              </b-row>
            </div>
  </div>        
      <div class="row justify-content-center">
        <div class="col-10">        
        <b-table :items="items" :fields="fields" responsive>
          <template #cell(Accion)="row">
              <b-button variant="primary" class="mb-2 mt-2" block @click="verOpciones(row.item)">
             Acción
            </b-button>
          </template>
        </b-table> 
          
       </div>
      </div>            
    </div>   
  </template>

<script>

import modal_agregarNorma from '@/components/admNorma/modal_agregarNorma.vue';

export default {

  components: { 

    modal_agregarNorma       
    
    },

    data(){

        return {

          fields: [
          { key: 'Nombre', label: 'Nombre', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Matrices', label: 'Matrices', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' },          
        ],

        items: []

        }

    },

    methods: {  

      agregarNorma(){

        this.$bvModal.show('modal-Agregar-Norma');        
        
      }

    }

}
</script>