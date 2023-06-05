<template>
  <div style="margin-bottom:50px">

<b-row style="padding-top:30px; margin-left: 15px; ">
<b-col class="col-6">
    <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
        Administración de Elementos de la Muestra
    </div>
</b-col>
</b-row>

<modal_detallesElementos :detalles-data="this.modalDetallesData" />
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
      <template #cell(Accion)="row">
        <b-button variant="primary" class="mb-2 mt-2" block @click="verDetalles(row.item)">
        Ver Detalles
        </b-button>
      </template>
    </b-table>
  </div>
</div>
  </div>
</template>

<script>
import modal_detallesElementos from '@/components/admElementosMuestra/modal_detallesElementos.vue';
import ElementosService from '@/helpers/api-services/Elementos.service';
export default {

  components: {

    modal_detallesElementos
  },

  
  data() {
    return {
      fields: [
        { key: 'nombre_matriz', label: 'Matriz', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'nombre_parametro', label: 'Parametros(s)', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'nombre_metodologia', label: 'Metodología(s)', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'nombre', label: 'Analista(s)', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' }
      ],
      items: [],
      modalDetallesData: {},
    };
  },

  mounted(){
    this.ObtenerRelacionDatos()

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

    ObtenerRelacionDatos() {
      ElementosService.obtenerRelacion().then((response) => {
      const items = response.data.map((item) => {
      let nombre = '';
    if (item.parametros.length > 0 && item.parametros[0].metodologias.length > 0 && item.parametros[0].metodologias[0].empleados.length > 0) {
      const empleado = item.parametros[0].metodologias[0].empleados[0];
      nombre = `${empleado.nombre} ${empleado.apellido}`;
    }
    return {
      id_matriz: item.id_matriz,
      nombre_matriz: item.nombre_matriz,
      nombre_parametro: item.parametros[0]?.nombre_parametro || '',
      nombre_metodologia: item.parametros[0]?.metodologias[0]?.nombre_metodologia || '',
      nombre: nombre
    };
  });
  this.items = items;
});
},

    verDetalles(data){
      console.log(data)
      this.modalDetallesData = data;
      this.$bvModal.show('modal-detalle-elementos')
    },

          
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
