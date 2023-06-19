<template>
    <b-modal id="modal-cantidad" ref="modal" title="Cantidad de submuestras" size="lg" @shown="handleModalShown">
      <template #modal-header="{ close }">
        <!-- Emulate built-in modal header close button action -->
        <b-row class="d-flex justify-content-around">
          <div class="pl-3">Cantidad de muestras</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
          <span aria-hidden="true" style="color:white">&times;</span>
        </button>
      </template>
  
      <div>
        <b-table :items="tablaItems" :fields="tablaFields">
          <template #cell(identificacion)="row">
            <b-form-input v-model="row.item.identificacion" placeholder="Ingrese la identificación de la muestra"></b-form-input>
          </template>
          <template #cell(parametros)="row">
            <template v-if="parametrosSeleccionados.length > 0">
              <b-form-select v-model="row.item.parametros" :options="parametrosOptions"> </b-form-select>             
            </template>
          </template>
        </b-table>
      </div>  
  
      <template #modal-footer>
        <b-button @click="guardarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">Guardar</b-button>
      </template>
    </b-modal>
  </template>  
<script>


export default {
  data() {
    return {
      parametrosOptions: [],
      identificacion: '',
      orden: '',
    };
  },

  props: {
    nMuestras: {
      type: String,
      default: '',
    },

    parametrosSeleccionados: {
      type: Array,    
    },
  },

  computed: {
    tablaItems() {
      const items = [];
      for (let i = 1; i <= parseInt(this.nMuestras); i++) {
        items.push({
          orden: i,
          identificacion: '',
          parametros: '',
        });
      }
      return items;
    },

    tablaFields() {
      const fields = [
        { key: 'orden', label: 'Orden', thClass: 'text-center', tdClass: 'text-center' },
        { key: 'identificacion', label: 'Identificación', thClass: 'text-center', tdClass: 'item-center' },
      ];

      if (this.parametrosSeleccionados.length > 0) {
        fields.push({ key: 'parametros', label: 'Parámetros', thClass: 'text-center', tdClass: 'item-center' });
      }

      return fields;
    },    
    opciones() {
      return this.parametrosSeleccionados;
    },    

    mostrarMensaje() {
      return this.parametrosOptions.length === 0;
    },
  },
  
  methods: {
    guardarFormulario() {
      const datosIngresados = this.tablaItems.map((item) => ({
        identificacion: item.identificacion,
        orden: item.orden,
        parametros: item.parametros,
      }));
      console.log("dato a enviar: ", datosIngresados);
      this.$emit('datosIngresados', datosIngresados);
      this.$refs.modal.hide();
    },

    handleModalShown() {
      console.log('Modal mostrado');
      console.log("parametrosSeleccionados:", this.parametrosSeleccionados);
      this.parametrosOptions = this.parametrosSeleccionados.map(p => p.nombre_parametro)
      console.log("options:", this.parametrosSeleccionados)
    },    
  },  
};
</script>  