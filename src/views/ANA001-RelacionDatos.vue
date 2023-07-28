<template>
  <div style="margin-bottom:50px">
    <b-row style="padding-top:30px; margin-left: 15px; ">
      <b-col class="col-6">
        <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
          Administración de elementos de la muestra
        </div>
      </b-col>
    </b-row>

    <modal_detallesElementos :detalles-data="this.modalDetallesData" />
    <div class="row justify-content-start" style="padding-top:20px; padding-bottom:10px;">
      <b-col class="col-12">

        <b-button @click="administrarNorma" style="border-radius: 15px; font-weight: bold; font-size: 18px;"
          class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
          Administrar norma
          <b-icon icon="journals"></b-icon>
        </b-button>
        
        <b-button @click="administrarMatriz" style="border-radius: 15px; font-weight: bold; font-size: 18px;"
          class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
          Administrar matriz
          <b-icon icon="journals"></b-icon>
        </b-button>

        <b-button @click="administrarParametro" style="border-radius: 15px; font-weight: bold; font-size: 18px;"
          class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
          Administrar parámetro
          <b-icon icon="journals"></b-icon>
        </b-button>

        <b-button @click="administrarMetodologia" style="border-radius: 15px; font-weight: bold; font-size: 18px;"
          class="lsa-light-blue reactive-button mb-2 mt-2 mr-2">
          Administrar metodología
          <b-icon icon="journals"></b-icon>
        </b-button>

      </b-col>

    </div>
    <div style="height:25px"></div>
    <div class="row justify-content-center">
      <div class="col-10">
        <b-table  show-empty :busy="loading" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive>
        

                <template #table-busy>
                    <div class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
                </template>
        
        
        
          <template #cell(Accion)="row">

            <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark"
                  aria-hidden="true"></b-icon>
              </template>

              <b-dropdown-item @click="verDetalles(row.item)">
                <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver detalles

              </b-dropdown-item>

            </b-dropdown>


          </template>

<!--
          <template #cell(nombre_parametro)="row">

            <div v-if="row.item.parametros != null">
              <b-list-group v-if="row.item.parametros.length > 0">
                <b-list-group-item v-if="row.item.parametros.length > 1" v-b-toggle="row.item.id_matriz.toString()"
                  style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">{{
                    row.item.parametros[0].nombre_parametro }}
                  <b-icon style="position:absolute; right:0px; top:25%; color: #949494" icon="caret-down-fill"></b-icon>
                </b-list-group-item>

                <b-list-group-item v-else style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">{{
                  row.item.parametros[0].nombre_parametro }}

                </b-list-group-item>

                <div v-if="row.item.parametros.length > 1">
                  <b-collapse :id="row.item.id_matriz.toString()">
                    <b-list-group-item style="padding:2px;  border: none; border-bottom: solid 1px #dbdbdb;"
                      v-for="index in row.item.parametros.length - 1" :key="index">{{
                        row.item.parametros[index].nombre_parametro }}</b-list-group-item>
                  </b-collapse>
                </div>

              </b-list-group>


              <div v-else>sin parámetros</div>
            </div>
          </template>
       --> 
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="right"></b-pagination>
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
        { key: '', label: 'Parametros(s)', thClass: 'text-center', tdClass: 'text-center' },
        { key: '', label: 'Metodología(s)', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'nombre', label: 'Analista(s)', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'Accion', label: 'Acción', thClass: 'text-center', tdClass: 'text-center' }
      ],
      items: [],
      modalDetallesData: {},
      currentPage: 1,
      perPage: 10,
      loading:false,
    };
  },

  computed: {
    rows() {
      return this.items.length
    }
  },

  mounted() {
    this.ObtenerRelacionDatos()

  },

  methods: {

    administrarMatriz() {
      console.log("Administrar matriz");
      this.$router.push('/AdmMatriz');
    },

    administrarParametro() {
      console.log("Administrar parámetro");
      this.$router.push('/AdmParam');
    },

    administrarMetodologia() {
      console.log("Administrar metodología");
      this.$router.push('/AdmMetodologia');
    },

    administrarNorma() {
      console.log("Administrar norma");
      this.$router.push('/AdmNorma');
    },

    ObtenerRelacionDatos() {
      this.loading = true;
      ElementosService.obtenerRelacion().then((response) => {
        const items = response.data.map((item) => {
          let nombre = '';
          if (item.parametros.length > 0 && item.parametros[0].metodologias.length > 0 && item.parametros[0].metodologias[0].empleados.length > 0) {
            const empleado = item.parametros[0].metodologias[0].empleados[0];
            nombre = `${empleado.nombre} ${empleado.apellido}`;
          } return {
            id_matriz: item.id_matriz,
            nombre_matriz: item.nombre_matriz,
            nombre_parametro: item.parametros[0]?.nombre_parametro || '',
            nombre_metodologia: item.parametros[0]?.metodologias[0]?.nombre_metodologia || '',
            nombre: nombre
          };
        });
        for (var i = 0; i < items.length; i++) {
          items[i].parametros = response.data[i].parametros
        }
        this.items = items;
        this.loading = false;
        console.log(this.items)
      });
    },

    verDetalles(data) {
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