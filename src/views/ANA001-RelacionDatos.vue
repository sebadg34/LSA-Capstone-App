<template>
    <div style="margin-bottom:50px">

<b-row style="padding-top:30px; margin-left: 15px; ">
  <b-col class="col-6">
      <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
          Administración de Elementos de la Muestra
      </div>
  </b-col>
</b-row>
      <div class="row justify-content-center" style="padding-top:20px; padding-bottom:10px;">
        <div>
          <b-button  @click="administrarMatriz"  style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
            Administrar Matriz
            <b-icon icon="journals"></b-icon>
          </b-button>

          <b-button @click="administrarParametro" style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
            Administrar Parámetro
            <b-icon icon="journals"></b-icon>
          </b-button>

          <b-button @click="administrarMetodologia" style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
            Administrar Metodología
            <b-icon icon="journals"></b-icon>
          </b-button>

          <b-button @click="administrarNorma" style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
            Administrar Norma
            <b-icon icon="journals"></b-icon>
          </b-button>           
          
        </div>
      </div>

      <div class="row justify-content-center">
      <div class="col-10">
  
      <b-table :items="items" :fields="fields" responsive>
        <template #cell(Detalles)="row">
          <b-button variant="primary" class="mb-2 mt-2" block @click="verDetalles(row.item)">
           Detalles
          </b-button>
        </template>
      </b-table>
    </div>
</div>
    </div>
  </template>
  
  <script>

  export default {

    
    data() {
      return {
        fields: [
          { key: 'Matriz', label: 'Matriz', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Parámetro(s)', label: 'Parametros(s)', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Metodología', label: 'Metodología', thClass: 'text-center', tdClass: 'text-center' },
          { key: 'Detalles', label: 'Detalles', thClass: 'text-center', tdClass: 'text-center' }
        ],
        items: []
      };
    },
    
    methods: {

      administrarMatriz() {
        // Lógica para administrar la matriz
        console.log("Administrar matriz");
        this.$router.push('/AdmMatriz');
        
      },

      administrarParametro() {
        // Lógica para administrar el parámetro
        console.log("Administrar parámetro");
        this.$router.push('/AdmParam');
      },

      administrarMetodologia() {
        // Lógica para administrar la metodología
        console.log("Administrar metodología");
        this.$router.push('/AdmMetodologia');

      },

      administrarNorma() {
        // Lógica para administrar la norma
        console.log("Administrar norma");
        this.$router.push('/AdmNorma');
        
      },
            
    }
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>
  