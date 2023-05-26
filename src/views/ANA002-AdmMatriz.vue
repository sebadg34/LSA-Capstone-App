<template>
  <div style="margin-bottom:50px">

<b-row style="padding-top:30px; ">
  <b-col class="col-6">
      <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
          Administración de Matrices
      </div>
  </b-col>
</b-row>

<div class="row justify-content-center" style="padding-top:30px; padding-bottom:10px; margin-left: 5px;">
  <div class="col-10">  
              <b-row>
                <modal_agregarMatriz />
                  <b-button v-b-modal.modal-Agregar-Matriz style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                      Agregar Matriz
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
           Detalles
          </b-button>
        </template>
      </b-table>   
      
      </div>
  </div>
  
      
  </div>
      
           
  
</template>

<script>

import modal_agregarMatriz from '@/components/admElementosMuestra/modal_agregarMatriz.vue';


export default {

  components: {
    modal_agregarMatriz
    },

    data(){

        return {

          fields: [
          { key: 'Nombre', label: 'Nombre', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Parametro', label: 'Parámetro', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' },          
        ],

        items: []

        }

    },

    methods: {  

      agregarMatriz(){
        console.log("abriendo matriz")

        this.$bvModal.show('modal-Agregar-Matriz');
      }

    }

}
</script>