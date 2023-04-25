<template>

<div>
    <!-- Filtrador-->
    <div class="form">
  <b-form-group label="Prioridad" label-for="filtroPrioridad" class="my-form mr-2">
    <b-form-select v-model="filtroPrioridad" :options="prioridades" ></b-form-select>
  </b-form-group>

  <b-form-group class="my-form mr-2" label="Estado" label-for="filtroEstado">    
    <b-form-select v-model="filtroEstado" :options="estados" ></b-form-select>
  </b-form-group>

  <b-form-group class="my-form mr-2" label="RUM" label-for="filtro-rum">
    <b-form-input id="filtro-rum" v-model="filtroRUM"></b-form-input>    
  </b-form-group>
  
  <b-button variant="primary" class="buttons" @click="filtrarTabla">Filtrar</b-button>
  <b-button variant="danger" class="buttons" @click="borrarFiltro">Borrar Filtro(s)</b-button>

  </div> 
  <!-- Fin Filtrador-->

  <!-- Mensaje de error -->
  <div>
      <b-modal v-model="error" id="error-modal">
        <div>{{ mensajeError }}</div>
      </b-modal>
  </div>
  <!-- Fin Mensaje de error -->

  <!-- Inicio tabla -->

  <b-table :items="itemsFiltrados" :fields="fields">
  <template #cell(Acción)="row">
    <b-dropdown variant="primary" size="sm" menu-class="custom-dropdown-menu" :text="'Ver opciones'">
      <b-dropdown-item v-for="opcion in generarOpcionesEstado(row.item.Estado)" :key="opcion.value">
        <b-dropdown-item v-if="opcion.text === 'Detalle muestra'" :key="opcion.value">          
           <!--- modal de prueba -->
            <b-button @click="showDetalle = true">Detalle de Muestra</b-button>
            <DetalleMuestra v-if="showDetalle" :datos="datosMuestra" :RUM="RUM" @modal-cerrado="onModalCerrado"></DetalleMuestra>             
           <!---FIN modal de prueba --> 
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Observaciones'" :key="opcion.value">
          <b-button @click="MostrarObservaciones(row.item.RUM)">Observaciones de la muestra</b-button>          
          <ModalObservaciones v-if="showObservaciones" :datos="datosMuestra" :rum="RUM" @modal-cerrado="onModalCerrado"></ModalObservaciones>
        </b-dropdown-item>        

        <b-dropdown-item v-if="opcion.text === 'Marcar Analisis como completado'" :key="opcion.value">
          <b-button variant="link" @click="MarcarAnalisis(row.item)">
            Marcar analisis como completado
          </b-button>
        </b-dropdown-item>       
      </b-dropdown-item>
    </b-dropdown>
  </template>
</b-table>
</div>
</template>

<script>
import DetalleMuestra from './DetalleMuestra.vue'
import ModalObservaciones from './ModalObservaciones.vue'

export default{
    data(){
        return{


      showDetalle: false,
      showObservaciones: false,
      items: [
        { id: 1, RUM: '123', Prioridad: 'Alta', Estado: 'En Análisis',  },
        { id: 2, RUM: '456', Prioridad: 'Normal', Estado: 'Finalizado' },
        { id: 3, RUM: '789', Prioridad: 'Urgente', Estado: 'Recepcionado' }
      ],
      opcionesPrioridad: [
        { text: 'Seleccionar prioridad', value: '' }, // Opción en blanco
        { text: 'Alta', value: 'Alta' },
        { text: 'Urgente', value: 'Urgente' },
        { text: 'Normal', value: 'Normal' }
      ],
      opcionesEstado: [
      
        { text: 'Recepcionado', value: 'Recepcionado' },
        { text: 'En Análisis', value: 'En Análisis' },
        { text: 'Finalizado', value: 'Finalizado' },      
        ],
      fields: [
        { key: 'RUM', label: 'RUM' },
        { key: 'Matriz', label: 'Matriz' },        
        { key: 'Parámetro(s)', label: 'Parametros(s)' },
        { key: 'Metodología', label: 'Metodología' },
        { key: 'Fecha Ingreso', label: 'Fecha ingreso' },
        { key: 'Fecha Entrega', label: 'Fecha Entrega' },
        { key: 'Hora Ingreso', label: 'Hora Ingreso' },
        { key: 'Prioridad', label: 'Prioridad' },
        { key: 'Estado', label: 'Estado' },
        { key: 'Acción', label: 'Acción' },

      ],   

        filtroPrioridad: '',
        filtroEstado: '',
        filtroRUM: '',
        itemsFiltrados: [],
        error: false,
        mensajeError: '',
        prioridades: ['Normal', 'Alta', 'Urgente'],
        estados: ['Recepcionado', 'En Análisis', 'Finalizado']
        }
    },

    components: {
    DetalleMuestra,
    ModalObservaciones,
    
    },

    methods: {

generarOpcionesEstado(estado) {
  switch (estado) {
    case 'Recepcionado':
      return [               
        { text: 'Detalle muestra', value: 'Detalle Muestra' },
        { text: 'Observaciones', value: 'Observaciones' },        
        { text: 'Marcar Analisis como completado', value: 'marcar_completado' },        
        
      ];
    case 'En Análisis':
      return [
        { text: 'Detalle muestra', value: 'Detalle Muestra' },
        { text: 'Observaciones', value: 'Observaciones' },        
        { text: 'Marcar Analisis como completado', value: 'marcar_completado' },
        
      ];
    case 'Finalizado':
      return [        
        { text: 'Detalle muestra', value: 'Detalle Muestra' },
        { text: 'Observaciones', value: 'Observaciones' },        
        { text: 'Marcar Analisis como completado', value: 'marcar_completado' },        
      ];
    default:
      return [
        { text: 'Seleccionar opción', value: '' } // Opción en blanco
      ];
  }
},

showModal(modalDetalleMuestra) {
      this.$refs[modalDetalleMuestra].show(); // mostrar el modal
    },

onModalCerrado() {
      this.showDetalle = false;
      this.showObservaciones = false;
    },   

MostrarObservaciones(RUM) {
    this.showObservaciones = true;
    this.datosMuestra = { RUM: RUM };
},

DetalleMuestra(RUM) {
    this.showDetalle = true;
    this.datosMuestra = { RUM: RUM };
},


filtrarTabla() {
  let columnaFiltrada = '';
  let prioridadFiltrada = this.filtroPrioridad.toLowerCase();
  let estadoFiltrado = this.filtroEstado.toLowerCase();
  let rumFiltrado = this.filtroRUM.toLowerCase();

  if (prioridadFiltrada !== '' && estadoFiltrado !== '') {
    this.itemsFiltrados = this.items.filter(item => item['Prioridad'].toLowerCase().includes(prioridadFiltrada) && item['Estado'].toLowerCase().includes(estadoFiltrado));
    columnaFiltrada = 'combinado';
  } else if (prioridadFiltrada !== '') {
    columnaFiltrada = 'Prioridad';
    this.itemsFiltrados = this.items.filter(item => item[columnaFiltrada].toLowerCase().includes(prioridadFiltrada));
  } else if (estadoFiltrado !== '') {
    columnaFiltrada = 'Estado';
    this.itemsFiltrados = this.items.filter(item => item[columnaFiltrada].toLowerCase().includes(estadoFiltrado));
  } else if (rumFiltrado !== '') {
    columnaFiltrada = 'RUM';
    this.itemsFiltrados = this.items.filter(item => item[columnaFiltrada].toLowerCase().indexOf(rumFiltrado) === 0 && item[columnaFiltrada].length === rumFiltrado.length);
  } else {
    this.itemsFiltrados = this.items;
    this.mensajeError = 'El campo de búsqueda está vacío.';
  }

  if (columnaFiltrada === 'RUM' && this.itemsFiltrados.length === 0) {
    this.mensajeError = 'El RUM no se encuentra en la tabla o este es inválido.';
    this.$nextTick(() => {
      this.$bvModal.show('error-modal');
    });
    this.error = true;
  } else if (columnaFiltrada === 'combinado' && this.itemsFiltrados.length === 0) {
    this.mensajeError = 'No hay elementos que coincidan con ambos filtros.';
    this.$nextTick(() => {
      this.$bvModal.show('error-modal');
    });
    this.error = true;
  } else {
    this.error = false;
  }
},
borrarFiltro() {
    this.filtroPrioridad = '';
    this.filtroEstado = '';
    this.filtroRUM = '';
},
mostrarError(mensaje) {
    this.mensajeError = mensaje
    this.error = true
    this.$modal.show('error-modal')
},
    },

watch: {

    
filtroPrioridad() {
      this.filtrarTabla();
},
filtroEstado(){
      this.filtrarTabla();
}
},
mounted() {
    this.filtrarTabla();
  }

}
</script>