<template>
  <b-modal id="modal-detalle-parametro" ref="modal" :title="`Detalles del Parámetro`" size="lg">
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
              <li v-for="parametro in listaParametros" :key="parametro.id">
                {{ parametro.nombre_parametro }}
              </li>
            </ul>
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
      id_matriz: ''
    }
  },

  methods: {
    obtenerDetallesMatriz() {
      const data = {
        id_matriz: this.id
      };

      ElementosService.obtenerDetallesMatriz(data).then((response) => {
        if (response.status === 200) {
          console.log("obteniendo detalles de la matriz:", response.data);
          const { nombre_matriz, parametros, id_matriz } = response.data;
          this.nombreMatriz = nombre_matriz;
          this.listaParametros = parametros;
          this.id_matriz = id_matriz;
        }
      });
    }
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
