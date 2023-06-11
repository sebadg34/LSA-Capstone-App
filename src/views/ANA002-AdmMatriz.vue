<template>
  <div style="margin-bottom:50px">

<b-row style="padding-top:30px; ">
  <b-col class="col-6">
      <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
          Administración de Matrices
      </div>
  </b-col>
</b-row>

    <modal_agregarMatriz @matrizAgregada="MatrizAgregada"/>
    <modal_detalleMatriz :detalles-data="this.modalDetallesData"/>
    <modal_editarMatriz :matriz-data="this.modalEditarData" :metodologia-data="this.modalEditarData" @matrizAgregada="MatrizAgregada"/>

<div class="row justify-content-center" style="padding-top:30px; padding-bottom:10px; margin-left: 5px;">
  <div class="col-10">  
              <b-row>                
                  <b-button v-b-modal.modal-Agregar-Matriz style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                      Agregar Matriz
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
          <b-dropdown-item v-if="row" @click="DetallesMatriz(row.item)">
            <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver Detalles 
          </b-dropdown-item>
          <b-dropdown-item v-if="row" @click="ActualizarMatriz(row.item)">
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

import modal_agregarMatriz from '@/components/admMatriz/modal_agregarMatriz.vue';
import modal_editarMatriz from '@/components/admMatriz/modal_editarMatriz.vue';
import modal_detalleMatriz from '@/components/admMatriz/modal_detalleMatriz.vue';
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {

  components: {
    modal_agregarMatriz,
    modal_detalleMatriz,
    modal_editarMatriz
    
    },

    data(){

        return {

          fields: [
          { key: 'nombre_matriz', label: 'Nombre', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'nombreParametro', label: 'Parámetro', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' },          
        ],

        items: [],
        modalEditarData: {}, 
        modalDetallesData: {},

        }

    },

    mounted() {  

      this.obtenerMatriz();
    },

    methods: {  

      agregarMatriz(){
        console.log("abriendo matriz")
        this.$bvModal.show('modal-Agregar-Matriz');
      },

      DetallesMatriz(data){
        console.log(data)
        this.modalDetallesData = data;
        this.$bvModal.show('modal-detalle-parametro')
      },

      ActualizarMatriz(data){
        console.log("los datos a editar son : ", data)
        this.modalEditarData = data;
        this.$bvModal.show('modal-Editar-Matriz')
      },

      MatrizAgregada() {
        this.obtenerMatriz();
      },

      obtenerMatriz() {
        ElementosService.obtenerMatriz().then((response) => {
          if (response.data != null && response.status === 200) {
            console.log("Obteniendo Matrices: ", response.data);

            const matrices = response.data.reduce((acumulador, matriz) => {
              const matrizExistente = acumulador.find((m) => m.id_matriz === matriz.id_matriz);

              if (matrizExistente) {
                if (!matrizExistente.nombreParametro.includes(matriz.nombre_parametro)) {
                  matrizExistente.nombreParametro.push(matriz.nombre_parametro);
                }
              } else {
                const nuevaMatriz = {
                  id_matriz: matriz.id_matriz,
                  nombre_matriz: matriz.nombre_matriz,
                  nombreParametro: [matriz.nombre_parametro],
                  id_metodologia: matriz.id_metodologia,            
                };
                acumulador.push(nuevaMatriz);
              }

              return acumulador;
            }, []);

            matrices.forEach((matriz) => {
              if (matriz.nombreParametro.length > 1) {
                matriz.nombreParametro.push("(+)");
              }
              matriz.nombreParametro = matriz.nombreParametro.join(", ");
            });

            //En caso de que quieran solo un "(+)" borrar el forEach de arriba y descomentar este.

          /*  matrices.forEach((matriz) => {
              if (matriz.nombreParametro.length > 1) {
                matriz.nombreParametro = matriz.nombreParametro[0] + " (+)";
              } else {
                matriz.nombreParametro = matriz.nombreParametro[0];
              }
            }); */

            this.items = matrices;

            console.log("Las matrices son: ", matrices);
          }
        });
      },
    }

}
</script>