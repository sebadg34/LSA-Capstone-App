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
        
        <template #cell(identificacion)="row">
          <b-form-input v-model="row.item.identificacion" placeholder="Ingrese la identificación de la muestra"></b-form-input>
        </template>
        <template #cell(parametros_previos)="row">
          <b-form-input readonly v-model="row.item.parametros_previos" placeholder="No posee o nuevo."></b-form-input>
        </template>
        <template #cell(parametros)="row">
          <template v-if="objetosSeleccionados.length > 0">
            <b-form-select v-model="row.item.parametros" :options="parametrosOptions"> </b-form-select>             
          </template>
        </template>
        <template #cell(metodologias_previas)="row">
          <template v-if="objetosSeleccionados.length > 0">
            <b-form-input readonly v-model="row.item.metodologias_previas" placeholder="No posee o nueva."> </b-form-input>             
          </template>
        </template>
        <template #cell(metodologias)="row">
          <template v-if="objetosSeleccionados.length > 0">
            <b-form-select v-model="row.item.metodologias" :options="metodologiasOptions"> </b-form-select>             
          </template>
        </template>
        <template #cell(accion)="row">
          <b-button variant="danger" @click="eliminarFila(row.index)">
            <b-icon-trash-fill></b-icon-trash-fill>
          </b-button>
        </template>
      </b-table>
    </div>  

    <template #modal-footer="{ close }">
      <b-button @click="guardarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">Guardar</b-button>
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                    Cerrar sin guardar
                </b-button>
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
        identificacionesArray: [],
        parametrosArray: [],
        metodologiasArray: [],
        tablaItems: [],
        id_eliminado: []

        
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
        type: Array
      },

      parametros : {
        type: Array
      },

      metodologias : {
        type: Array
      }
    },

    mounted() {
      this.$refs.modal.$on('show', () => {
        if (this.identificaciones.length > 0) {
          this.identificacionesArray = JSON.parse(JSON.stringify(this.identificaciones));          
          console.log('Identificaciones recibidas:', this.identificacionesArray);          
        }
        if (this.parametros.length > 0){
          this.parametrosArray = this.parametros;
          console.log("Nombres Parametro Recibidos:", this.parametrosArray)
        }
        if (this.metodologias.length > 0){
          this.metodologiasArray = this.metodologias;
          console.log("Nombres metodologia Recibidas:", this.metodologiasArray)
        }
        this.calcularTablaItems();
      });
    },

    watch: {
      objetosSeleccionados: {
        handler(nuevosObjetosSeleccionados) {
          const parametrosSet = new Set(nuevosObjetosSeleccionados.map(p => p.parametro));
          const metodologiasSet = new Set(nuevosObjetosSeleccionados.map(m => m.metodologia));
          this.parametrosOptions = [...parametrosSet];
          this.metodologiasOptions = [...metodologiasSet];
          console.log("objs selecc: ", this.objetosSeleccionados)
          this.calcularTablaItems();          
          
        },
        immediate: true
        
      }
      
    },

    computed: {          

      tablaFields() {
        const fields = [
          { key: 'orden', label: 'Orden', thClass: 'text-center', tdClass: 'text-center', editable: true },
          { key: 'identificacion', label: 'Identificación', thClass: 'text-center', tdClass: 'item-center' },
          
        ];

        if (this.objetosSeleccionados.length > 0) {
          fields.push({ key: 'parametros_previos', label: 'Parámetros previos', thClass: 'text-center', tdClass: 'item-center' });
          fields.push({ key: 'parametros', label: 'Parámetros', thClass: 'text-center', tdClass: 'item-center' });
          fields.push({ key: 'metodologias_previas', label: 'Metodologías previas', thClass: 'text-center', tdClass: 'item-center'});
          fields.push({ key: 'metodologias', label: 'Metodologías', thClass: 'text-center', tdClass: 'item-center'});
          fields.push({ key: 'accion', label: 'Acción', thClass: 'text-center', tdClass: 'item-center'})
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
        this.$emit('identificacionEliminada', this.id_eliminado)
        

        this.$refs.modal.hide();
      },
      
      calcularTablaItems() {
        const items = [];
        for (let i = 1; i <= parseInt(this.nMuestras); i++) {
          const identificacion = this.identificacionesArray[i - 1] || '';
          const parametroPrevio = this.parametrosArray[i - 1] || '';
          const metodologiaPrevia = this.metodologiasArray[i - 1] || '';

          items.push({
            orden: i,
            identificacion,
            parametros_previos: parametroPrevio,
            parametros: this.parametrosOptions[0] || '',
            metodologias_previas: metodologiaPrevia,
            metodologias: this.metodologiasOptions[0] || ''
          });
        }
        this.tablaItems = items; // Actualizar la propiedad de datos con los elementos de la tabla
      },

      eliminarFila(index) {
        const filaEliminada = this.tablaItems[index]; // Guardar la fila eliminada en una variable

        // Eliminar la fila de la tabla
        this.tablaItems.splice(index, 1);

        // Eliminar los datos de parámetros previos y metodologías previas de la fila eliminada
        filaEliminada.parametros_previos = '';
        filaEliminada.metodologias_previas = '';

        // Hacer lo que necesites con la identificación de la fila eliminada
        const identificacionEliminada = filaEliminada.identificacion;
        console.log('Identificación eliminada:', identificacionEliminada);

        this.id_eliminado.push(identificacionEliminada);
        console.log('Identificación a eliminar:', this.id_eliminado);
      }


    },  
  };
</script>  