<template>
  <b-modal id="modal-cantidad" ref="modal" title="Cantidad de submuestras" size="xl" >
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
        <template #cell(orden)="row">
          <b-form-input v-model="row.item.orden" type="number" min="1"></b-form-input>
        </template>
        <template #cell(identificacion)="row">
          <b-form-input v-model="row.item.identificacion" placeholder="Ingrese la identificación de la muestra"></b-form-input>
        </template>
        <template #cell(parametros)="row">
          <template v-if="objetosSeleccionados.length > 0">
            <b-form-select v-model="row.item.parametros" :options="parametrosOptions"> </b-form-select>             
          </template>
        </template>
        <template #cell(metodologias)="row">
          <template v-if="objetosSeleccionados.length > 0">
            <b-form-select v-model="row.item.metodologias" :options="metodologiasOptions"> </b-form-select>             
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
        metodologiasOptions: [],
        identificacion: '',
        orden: 0,
        identificacionesArray: []
    };
  },

  props: {
    nMuestras: {
      type: String,
      default: '',
    },
    objetosSeleccionados: {
      type: Array,
    },
    identificaciones: {
      type: Array,
    },
  },

  mounted(){
    this.$refs.modal.$on('show', () => {
      if (this.identificaciones.length > 0){
        this.identificacionesArray = JSON.parse(JSON.stringify(this.identificaciones));
        console.log('Identificaciones recibidas: ', this.identificacionesArray);
      }
    });
  },
  watch: {
    objetosSeleccionados:{
      handler(nuevosObjetosSeleccionados) {
          const parametrosSet = new Set(nuevosObjetosSeleccionados.map(p => p.parametro));
          const metodologiasSet = new Set(nuevosObjetosSeleccionados.map(m => m.metodologia));
          this.parametrosOptions = [...parametrosSet];
          this.metodologiasOptions = [...metodologiasSet];
        },
        immediate: true
    }
  },
  computed: {
      tablaItems() {
        const items = [];
        for (let i = 1; i <= parseInt(this.nMuestras); i++) {
          const identificacion = this.identificacionesArray[i - 1] || '';
          items.push({
            orden: i,
            identificacion,
            parametros: this.parametrosOptions[0] || '',
            metodologias: this.metodologiasOptions[0] || ''
          });
        }
        return items;
      },
      tablaFields() {
        const fields = [
          { key: 'orden', label: 'Orden', thClass: 'text-center', tdClass: 'text-center', editable: true },
          { key: 'identificacion', label: 'Identificación', thClass: 'text-center', tdClass: 'item-center' },
        ];

        if (this.objetosSeleccionados.length > 0) {
          fields.push({ key: 'parametros', label: 'Parámetros', thClass: 'text-center', tdClass: 'item-center' });
          fields.push({ key: 'metodologias', label: 'Metodologías', thClass: 'text-center', tdClass: 'item-center'});
        }
        return fields;
      },
      opciones() {
        return this.objetosSeleccionados;
      },

      mostrarMensaje() {
        return this.parametrosOptions.length === 0;
      },
    },

    methods: {
      guardarFormulario() {
        const datosIngresados = this.tablaItems.map((item) => {
          const parametroSeleccionado = this.objetosSeleccionados.find(obj => obj.parametro === item.parametros);
          const metodologiaSeleccionada = this.objetosSeleccionados.find(obj => obj.metodologia === item.metodologias);
          const id_parametro = parametroSeleccionado ? parametroSeleccionado.id_parametro : null;
          const id_metodologia = metodologiaSeleccionada ? metodologiaSeleccionada.id_metodologia : null;    
          
          return {
            identificacion: item.identificacion,
            orden: item.orden,
            parametros: item.parametros,
            id_parametro: id_parametro,
            id_metodologia: id_metodologia
          };
        });
        console.log("dato a enviar: ", datosIngresados);
        this.$emit('datosIngresados', datosIngresados);
        this.$refs.modal.hide();
      },
    },  
  };
</script> 