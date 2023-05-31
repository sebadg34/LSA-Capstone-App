<template>
    <div style="margin-bottom:50px">
<b-row style="padding-top:30px; ">
  <b-col class="col-6">
      <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
          Administración de Parámetros
      </div>
  </b-col>
</b-row>

<modal_agregarParametro @parametroAgregado="parametroAgregado"/>
<modal_detallesParametro :detalles-data="this.modalDetallesData"/>
<modal_editarParametro :parametro-data="this.modalEditarData" @parametroAgregado="parametroAgregado"/>


<div class="row justify-content-center" style="padding-top:30px; padding-bottom:10px; margin-left: 5px;">
  <div class="col-10">  
              <b-row>
                 
                  <b-button v-b-modal.modal-Agregar-Parametro style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                      Agregar Parámetro
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

import modal_agregarParametro from '@/components/admElementosMuestra/modal_agregarParametro.vue';
import modal_editarParametro from '@/components/admElementosMuestra/modal_editarParametro.vue';
import modal_detallesParametro from '@/components/admElementosMuestra/modal_detallesParametro.vue';

import ElementosService from '@/helpers/api-services/Elementos.service';
export default {

  components: {

    modal_agregarParametro,
    modal_detallesParametro,
    modal_editarParametro
        
    },

    data(){

        return {

          fields: [
          { key: 'nombre_parametro', label: 'Nombre', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'nombre_metodologia', label: 'Metodología', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' },          
        ],

        items: [],
        modalDetallesData: {},
        modalEditarData: {},

        }

    },

    mounted() {  

      this.obtenerParametros();  

    },

    methods: {
      
      obtenerParametros(){
        console.log("Obteniendo Parametro: ")
        ElementosService.obtenerParametros().then((response)=>{
          if(response.data != null && response.data === 200){
            this.items = response.data
          }
        })
      },

      agregarParametro(){

        this.$bvModal.show('modal-Agregar-Parametro');        
        
      },

      DetallesParametro(data){
        console.log(data)
        this.modalDetallesData = data;
        this.$bvModal.show('modal-detalle-parametro')

      },

      EditarParametro(data){
        console.log("los datos a editar son : ", data)
        this.modalEditarData = data;
        this.$bvModal.show('modal-Editar-Parametro')

      },

      parametroAgregado(){

        this.obtenerParametros();

      }     


    }

}
</script>