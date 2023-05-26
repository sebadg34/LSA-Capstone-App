<template>
    <div style="margin-bottom:50px">

      <b-row style="padding-top:30px; ">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de Metodologías
            </div>
        </b-col>
    </b-row>

      <div class="row justify-content-center" style="padding-top:30px; padding-bottom:10px; margin-left: 5px;">
        <div class="col-10">  
                    <b-row>
                      <modal_agregarMetodologia/> 
                        <b-button v-b-modal.modal-Agregar-Metodologia style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                            Agregar Metodología
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

import modal_agregarMetodologia from '@/components/admElementosMuestra/modal_agregarMetodologia.vue';
export default {

  components: {  
    
    modal_agregarMetodologia
    
    },

    data(){

        return {

          fields: [
          { key: 'Nombre', label: 'Nombre', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Analista', label: 'Analista', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' },          
        ],

        items: []

        }

    },

    methods: {  

      agregarAnalista(){

        this.$bvModal.show('modal-Agregar-Metodologia');        
        
      }

    }

}
</script>