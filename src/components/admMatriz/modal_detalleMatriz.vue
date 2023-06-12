<template>
  <b-modal id="modal-detalle-matriz" ref="modal" :title="`Detalles de la Matriz`" size="lg">
    <template #modal-header="{ close }">
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Detalles de la Matriz</div>
      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>

    <div class="p-3">      
      <b-row class="pb-2">
        <b-col class="col-6">
          <div>
            Nombre Matriz: <span>{{ nombreMatriz }}</span>
          </div>

          <div>
            Parámetro(s) Asignado(s):
            <ul>
              <li v-for="(parametro, index) in uniqueParametros" :key="index">
                {{ parametro }}
              </li>
            </ul>
          </div>

          <div>
            <table>
              Metodologias asignadas:
              <tr v-for="(metodologia, index) in filteredMetodologias" :key="index">
                <ul>
                  <li>
                    {{ metodologia }} ({{ listaParametros[index] }})        
                  </li>
                </ul>
                <td>
                  <button @click="VerDetalles(index)" class="btn btn-primary btn-sm">
                    <b-icon icon="eye-fill" aria-hidden="true" ></b-icon>
                  </button>
                </td>
              </tr>
            </table>

            <b-modal id="detalle" title="Detalles de la Metodología" ok-only ok-title="Cerrar">
              {{ detallesMetodologia }}
            </b-modal>
          </div>
        </b-col>
      </b-row>
    </div>

    <template #modal-footer="{ close }">
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {
  props: {
    detallesData: Object
  },
  data() {
    return {
      Nombre: '',
      listaParametros: [],
      nombreMatriz: '',
      id: '',
      id_matriz: '',
      listaMetodologias: [],
      listaDetalles: [],      
      mostrarDetalles: false,
      detallesMetodologia: ''
    }
  },

  computed: {
    filteredParametros() {
      return this.listaParametros.filter(parametro => typeof parametro === 'string');
    },
    filteredMetodologias(){
      return this.listaMetodologias.filter(metodologia => typeof metodologia === 'string');
    },
    uniqueParametros() {
    return Array.from(new Set(this.filteredParametros));
    },
  },
    

  methods: {
    obtenerDetallesMatriz() {
      const data = {
        id_matriz: this.id
      };
      ElementosService.obtenerDetallesMatriz(data).then((response) => {
        if (response.status === 200) {
          console.log("obteniendo detalles de la matriz:", response.data);
        
          const parametros = response.data.map(objetoDetalle => objetoDetalle.nombre_parametro);
          const metodologias = response.data.map(M => M.nombre_metodologia);
          const detallesMetodologia = response.data.map(D => D.detalle_metodologia);
      
          this.nombreMatriz = response.data[0].nombre_matriz;
          this.listaParametros = parametros;
          this.id_matriz = response.data[0].id_matriz;
          this.listaMetodologias = metodologias;
          this.listaDetalles = detallesMetodologia;

          console.log("El nombre de la matriz es: ", this.nombreMatriz);
          console.log("Los parámetros son: ", this.listaParametros);
        }
      });
    },

    VerDetalles(index) {
      console.log("Detalles de la metodología:", this.listaDetalles[index]);
      this.detallesMetodologia = this.listaDetalles[index];
      this.$bvModal.show('detalle')      
    },

  },  

  watch: {
    detallesData: {
      handler() {
        console.log("detallesData actualizada", this.detallesData);
        this.Nombre = this.detallesData.nombre_matriz;
        this.id = this.detallesData.id_matriz;
        this.obtenerDetallesMatriz();
      },
      deep: true
    }
  }
}
</script>