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
        <b-table :items="items" :fields="fields" responsive >
          <template #cell(Accion)="row">
            <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret >
              <template #button-content>
                <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
              </template>
              <b-dropdown-item v-if="row" @click="DetallesParametro(row.item)">
                <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver Detalles 
              </b-dropdown-item>
              <b-dropdown-item v-if="row" @click="EditarParametro(row.item)">
                <b-icon icon="pencil-square" aria-hidden="true" class="mr-2"></b-icon>Editar
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </div>
    </div>           
  </div>   
</template>

<script>

import modal_agregarParametro from '@/components/admParametro/modal_agregarParametro.vue';
import modal_detallesParametro from '@/components/admParametro/modal_detallesParametro.vue';
import modal_editarParametro from '@/components/admParametro/modal_editarParametro.vue';

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
      
      obtenerParametros() {
        ElementosService.obtenerParametros().then((response) => {
        if (response.data != null && response.status === 200) {
          const parametros = response.data.map((parametro)=> {
            const nuevoObjetoParametro = { ...parametro};

            if (parametro.metodologias && parametro.metodologias.length > 0){
              nuevoObjetoParametro.nombreMetodologia = parametro.metodologias[0].nombre_parametro;

              if(parametro.metodologia.length > 1) {
                nuevoObjetoParametro.nombreMetodologia += "(+)";
              }
            } else {
              nuevoObjetoParametro.nombreMetodologia = 'No existe metodologia asignada'
            }

            return nuevoObjetoParametro;
          });
        
        this.items = parametros;
    }
  });
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