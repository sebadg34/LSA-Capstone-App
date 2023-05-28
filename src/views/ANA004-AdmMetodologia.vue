<template>

    <div style="margin-bottom:50px">
      <b-row style="padding-top:30px;">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de Metodologías
            </div>
        </b-col>
    </b-row>
      <modal_detallesMetodologia :detalles-data="this.detallesData"/>
      <modal_agregarMetodologia/>
      <modal_editarMetodologia :metodologia-data="this.modalEditarData"/>

      <div class="row justify-content-center" style="padding-top:30px; padding-bottom:10px; margin-left: 5px;">
        <div class="col-10">  
          <b-row>                      
            <b-button v-b-modal.modal-Agregar-Metodologia style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
              Agregar Metodología
                <b-icon icon="journals"></b-icon>
            </b-button>
          </b-row>
        </div>
      </div>
        
<div class="row justify-content-center">
  <div class="col-10">
    <b-table :items="items" :fields="fields" responsive >
      <template #cell(Accion)="row">
        <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret >
          <template #button-content>
            <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
          </template>
          <b-dropdown-item v-if="row" @click="verDetalles(row)">
            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver Detalles 
          </b-dropdown-item>
          <b-dropdown-item v-if="row" @click="EditarMetodología(row.item)">
            <b-icon icon="file" aria-hidden="true" class="mr-2"></b-icon>Editar
          </b-dropdown-item>
        </b-dropdown>
      </template>
      </b-table>
    </div>
  </div>

           
    </div>   
  </template>

<script>

import modal_agregarMetodologia from '@/components/admElementosMuestra/modal_agregarMetodologia.vue';
import modal_editarMetodologia from '@/components/admElementosMuestra/modal_editarMetodologia.vue';
import modal_detallesMetodologia from '@/components/admElementosMuestra/modal_detallesMetodologia.vue';
import ElementosService from '@/helpers/api-services/Elementos.service';
export default {

  components: {  
    
    modal_agregarMetodologia,
    modal_detallesMetodologia,
    modal_editarMetodologia
    
    },

    data(){

        return {

          fields: [
          { key: 'nombre_metodologia', label: 'Nombre', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'rut_empleado', label: 'Analista', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' },          
          ],

          items: [],
          detallesData: {},
          modalEditarData: {}, 

        }

    },

    mounted() {
  

       this.obtenerMetodologias();  //Descomentar cuando se haya implementado la API y se quieran obtener datos de la BD.

  
},

    methods: {  

      agregarAnalista(){

        this.$bvModal.show('modal-Agregar-Metodologia');        
        
      },

      obtenerMetodologias() {
        console.log("Obteniendo Metodologias: ")     
          ElementosService.obtenerMetodologias().then((response)=>{
        if (response.data != null && response.status === 200) {
        this.items = response.data
        }
        })             
    }, 

      verDetalles(row) {
        this.nombre_metodologia = row.item.nombre_metodologia;
        console.log('El nombre es: ' + this.nombre_metodologia)
        this.$bvModal.show('modal-detalle-metodologia');
         ElementosService.obtenerDetallesMetodologia(this.nombre_metodologia).then((response)=>{    
          console.log(response); 
          if (response.data != null){
            console.log( response.data);           
            this.detallesData = response.data        
            this.$bvModal.show('modal-detalle-muestra');
          }
        }); 
      },

      EditarMetodología(data) {
        console.log(data)
        this.modalEditarData = data;
        this.$bvModal.show('modal-Editar-Metodologia')


      }

    }

}
</script>