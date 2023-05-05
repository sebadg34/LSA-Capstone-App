<template>
  <b-modal id="ModalObservaciones" v-model="showObservaciones" :title="`Observaciones de la muestra ${RUM}`" @hidden="onHidden">
    <div class="p-3">
      <p v-if="!loading && !observaciones.length">No hay observaciones para esta muestra.</p>
      <ul v-if="!loading && observaciones.length">
        <li v-for="observacion in observaciones" :key="observacion.id">
          {{ observacion.texto }}
        </li>
      </ul>
      <div v-if="loading" class="text-center">
        <b-spinner></b-spinner>
      </div>
    </div>
  </b-modal>
</template>

<script>
import MuestraService from '@/helpers/api-services/Muestra.Service';

export default {
  props: {
    RUM: {
      type: Number,
      required: true
    },
    observaciones: {
      type: Array, // Cambiado a un array
      required: true
    }
  },
  data() {
    return {
      
      loading: false,
      showObservaciones: false,
      
    }
  },
  created() {
    this.observacionesData = this.observaciones;
  },
  methods: {
    async MostrarObservaciones(row){
      MuestraService.obtenerObservaciones(row);
      console.log(this.observacionesData)
    },
    onHidden() {
      this.showObservaciones = false;
      this.$emit('modal-cerrado');
    }
  },
}
</script>
