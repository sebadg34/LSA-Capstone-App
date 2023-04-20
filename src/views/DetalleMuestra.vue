<template>
  <div>
    <b-modal v-model="showModal" title="Tabla de muestras" @hidden="onHidden">
      <b-table :items="muestras" :fields="fields"></b-table>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    RUM: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: true,
      muestras: [],
      fields: [
        { key: 'RUM', label: 'RUM de la muestra' },
        { key: 'NumMuestras', label: 'Número de muestras' }
      ]
    }
  },
  created() {
    this.muestras.push({ RUM: this.RUM, NumMuestras: 10 });
      this.muestras.push({ RUM: 'RUM2', NumMuestras: 5 });
      this.muestras.push({ RUM: 'RUM3', NumMuestras: 8 });
  },
  methods: {
    
    onHidden() {
      this.showModal = false;
      this.$emit('modal-cerrado');
    }
  }
}
</script>
