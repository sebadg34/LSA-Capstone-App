<template>
    <div>     
  <!-- Filtrador-->
    <div class="form">
  <b-form-group label="Prioridad" label-for="filtroPrioridad" class="my-form mr-2">
    <b-form-select v-model="filtroPrioridad" :options="prioridades" :key="'prioridad'"></b-form-select>
  </b-form-group>

  <b-form-group class="my-form mr-2" label="Estado" label-for="filtroEstado">
    
    <b-form-select v-model="filtroEstado" :options="estados" :key="'estado'" ></b-form-select>
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
  <ModalObservaciones :muestra-data="this.modalData" @modal-cerrado="onModalCerrado"></ModalObservaciones>
  <b-table :items="itemsFiltrados" :fields="fields">
  <template #cell(Acción)="row">
    <b-dropdown variant="primary" size="sm" menu-class="custom-dropdown-menu" right :text="'Ver opciones'">
      <b-dropdown-item v-for="opcion in generarOpcionesEstado(row.item.estado)" :key="opcion.value">
        
        <b-dropdown-item v-if="opcion.text === 'Detalle muestra'" :key="opcion.value">          
           <!--- modal de prueba 
            <b-button @click="showDetalle = true">Detalle de Muestra</b-button>
            <DetalleMuestra v-if="showDetalle" :datos="datosMuestra" :RUM="RUM" @modal-cerrado="onModalCerrado"></DetalleMuestra>              
           FIN modal de prueba -->
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Observaciones'" :key="opcion.value">
          <b-button @click="MostrarObservaciones(row)">Observaciones de la muestra</b-button>         
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Ingresar muestra a lab.'" :key="opcion.value">
          <b-button @click="IngresarMuestraLab(row)">Ingresar muestra al Laboratorio</b-button>
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Analista Designado'" :key="opcion.value">
          <b-button variant="link" @click="Analista(row)">
            Analista Designado
          </b-button>
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Descargar Informe'" :key="opcion.value">
          <b-button variant="link" @click="Descargar(row)">
            Descargar Informe
          </b-button>
        </b-dropdown-item>       

        <b-dropdown-item v-if="opcion.text === 'Ingresar resultados de análisis'" :key="opcion.value">
          <b-button variant="link" @click="Ingresar(row)">
            Ingresar resultados de análisis
          </b-button>
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Administrar cartas de control'" :key="opcion.value">
          <b-button variant="link" @click="AdministrarCartas(row)">
            Administrar Cartas de control
          </b-button>
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Rehacer Análisis'" :key="opcion.value">
          <b-button variant="link" @click="RehacerAnalisis(row)">
            Rehacer Análisis
          </b-button>
        </b-dropdown-item>        

        <b-dropdown-item v-if="opcion.text === 'Marcar Analisis como completado'" :key="opcion.value">
          <b-button variant="link" @click="MarcarAnalisis(row)">
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

import ModalObservaciones from './ModalObservaciones.vue'
import MuestraService from '@/helpers/api-services/Muestra.Service';




export default {
  data() {
    return {
      
      RUM: null,
      oldRUM: null,
      obtenerObservaciones: this.obtenerObservaciones,
      modalData: {},     
      observaciones: '',     
      items: [],      
      opcionesEstado: [
      
        { text: 'Recepcionado', value: 'Recepcionado' },
        { text: 'En Análisis', value: 'En Análisis' },
        { text: 'Finalizado', value: 'Finalizado' },      
      ],
      fields: [
        { key: 'RUM', label: 'RUM' },
        { key: 'matriz', label: 'Matriz' },
        { key: 'nombre_norma', label: 'Norma' },
        { key: 'Parámetro(s)', label: 'Parametros(s)' },
        { key: 'Metodología', label: 'Metodología' },
        { key: 'fecha_ingreso', label: 'Fecha ingreso' },
        { key: 'fecha_entrega', label: 'Fecha Entrega' },
        { key: 'hora_ingreso', label: 'Hora Ingreso' },
        { key: 'prioridad', label: 'Prioridad'},
        { key: 'estado', label: 'Estado' },
        { key: 'Acción', label: 'Acción' },

      ],
      filtroPrioridad: '',
      filtroEstado: '',
      filtroRUM: '',
      itemsFiltrados: [],
      error: false,
      mensajeError: '',
      prioridades: ['Normal', 'Alta', 'Urgente'],
      estados: ['Recepcionado', 'En Análisis', 'Finalizado'],
   
      
     }
  },

  components: {
    
    ModalObservaciones,
    
  },

  created() {
    this.obtenerMuestras()
  },

  methods: {

    async obtenerMuestras() {
      try {
        const response = await MuestraService.obtenerMuestras()
        if (response && response.status === 200) {
          this.items = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },   

    generarOpcionesEstado(estado) {
  switch (estado) {
    case 'Recepcionado':
      return [               
        { text: 'Observaciones', value: 'observaciones' },        
        { text: 'Ingresar muestra a lab.', value: 'Ingresar muestra a lab.' }
      ];
    case 'En Análisis':
      return [
        { text: 'Detalle muestra', value: 'Detalle Muestra' },
        { text: 'Observaciones', value: 'Observaciones' },
        { text: 'Analista Designado', value: 'Analista Designado' },
        { text: 'Marcar Analisis como completado', value: 'marcar_completado' },
        { text: 'Ingresar resultados de análisis', value: 'Ingresar resultados de análisis' },
        { text: 'Descargar Informe', value: 'Descargar Informe' },
        { text: 'Administrar cartas de control', value: 'Administrar cartas de control' },
      ];
    case 'Finalizado':
      return [        
        { text: 'Detalle muestra', value: 'detalle' },
        { text: 'Observaciones', value: 'observaciones' },
        { text: 'Analista Designado', value: 'Analista Designado' },
        { text: 'Descargar Informe', value: 'Descargar Informe' },
        { text: 'Rehacer Análisis', value: 'Rehacer Análisis' }
      ];
    default:
      return [
        { text: 'Seleccionar opción', value: '' } // Opción en blanco
      ];
  }
},

  onModalCerrado() {
      this.showModal = false     

    },

  MostrarObservaciones(row) {  
  this.RUM = row.item.RUM;     
  MuestraService.obtenerObservaciones(this.RUM).then((response)=>{    
    console.log(response); 
    if (response.data != null){
      console.log(response.data);         
      this.modalData = response.data[0]        
      this.$bvModal.show('modal-observaciones');
    }
  }); 
},

MostrarFonos(row){
  this.RUM = row.item.RUM;
  MuestraService.obtenerFonos(this.RUM).then((response)=>{
    console.log(response)
  })


},

IngresarMuestraLab(row){
  this.RUM = row.item.RUM;
  console.log('el rum es: '+ this.RUM)
  this.$router.push(`/IngMuesLab?RUM=${this.RUM}`);
  
},




DetalleMuestra(RUM) {
    this.showDetalle = true;
    this.datosMuestra = { RUM: RUM };
},

Analista() {
    // Aquí pones la lógica para mostrar los detalles de la muestra seleccionada
    window.location.href = "https://www.youtube.com";
},

Descargar() {
    // Aquí pones la lógica para mostrar los detalles de la muestra seleccionada
    window.location.href = "https://www.youtube.com";
},

Ingresar() {
    // Aquí pones la lógica para mostrar los detalles de la muestra seleccionada
    window.location.href = "https://www.youtube.com";
},
AdministrarCartas(){
  window.location.href = "https://www.youtube.com";
},
RehacerAnalisis(){
  window.location.href = "https://www.youtube.com";
},

MarcarAnalisis(){
  window.location.href = "https://www.youtube.com";
},
beforeDestroy() {
    this.showDetalle = false;
},

viewSample(item, index, opcion) {
      if (opcion.value === 'detalle') {
       console.log('Ver detalle de:', item);}
},


    filtrarTabla() {
  let columnaFiltrada = '';
  let prioridadFiltrada = this.filtroPrioridad.toLowerCase();
  let estadoFiltrado = this.filtroEstado.toLowerCase();
  let rumFiltrado = this.filtroRUM.toLowerCase();

  if (prioridadFiltrada !== '' && estadoFiltrado !== '') {
    this.itemsFiltrados = this.items.filter(item => item['prioridad'].toLowerCase().includes(prioridadFiltrada) && item['estado'].toLowerCase().includes(estadoFiltrado));
    columnaFiltrada = 'combinado';
  } else if (prioridadFiltrada !== '') {
    columnaFiltrada = 'prioridad';
    this.itemsFiltrados = this.items.filter(item => item[columnaFiltrada].toLowerCase().includes(prioridadFiltrada));
  } else if (estadoFiltrado !== '') {
    columnaFiltrada = 'estado';
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
    },
    
  }, 
  mounted() {
    this.filtrarTabla();
  }
}
</script>

