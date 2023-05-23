<template>
    <div>     
  <!-- Filtrador-->

  
  

  <!-- Fin Filtrador-->    

  <h1>Muestras asignadas al: Supervisor/Jefe laboratorio</h1>  

  <ModalObservaciones :muestra-data="this.modalData" @modal-cerrado="onModalCerrado"></ModalObservaciones>
  <ModalDetalleMuestra :detalles-data="this.detallesData"/> 
  <modal_analistaDesignado/>
  <modal_rehacerAnalisis/>
  <!-- Inicio tabla -->  
  <b-table fixed :items="items" :fields="fields">   
    
    <template #cell(prioridad)="row">

      <span v-if="row.item.prioridad == 'Normal'" style="text-transform:uppercase; color:green; font-weight: bold;">Normal</span>
      <span v-if="row.item.prioridad == 'Alta'" style="text-transform:uppercase; color:red; font-weight: bold;">Alta</span>
      <span v-if="row.item.prioridad == 'Urgente'" style="text-transform:uppercase; color:rebeccapurple; font-weight: bold;">Urgente</span>    
</template>

  <template #cell(Acción)="row">   
    
    <b-dropdown variant="primary" size="sm" menu-class="custom-dropdown-menu" right :text="'Ver opciones'">
      <b-dropdown-item v-for="opcion in generarOpcionesEstado(row.item.estado)" :key="opcion.value">
        
        <b-dropdown-item v-if="opcion.text === 'Detalle muestra'" :key="opcion.value">          
            
            <b-button @click="DetalleMuestra(row)">Detalle de Muestra</b-button>
           
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Observaciones'" :key="opcion.value">
          <b-button @click="MostrarObservaciones(row)">Observaciones de la muestra</b-button>         
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Ingresar muestra a lab.'" :key="opcion.value">
          <b-button @click="IngresarMuestraLab(row)">Ingresar muestra al Laboratorio</b-button>
        </b-dropdown-item>

        <b-dropdown-item v-if="opcion.text === 'Analista Designado'" :key="opcion.value">
          <b-button @click="Analista(row)">
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
          <b-button @click="RehacerAnalisis(row)">
            Rehacer Análisis
          </b-button>
        </b-dropdown-item>        

        <b-dropdown-item v-if="opcion.text === 'Marcar Analisis como completado'" :key="opcion.value">
          <b-button @click="MarcarAnalisis(row)">
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
import ModalDetalleMuestra from '@/components/admMuestras/modal_detallesMuestra.vue';
import modal_analistaDesignado from '@/components/admMuestras/modal_analistaDesignado.vue';
import modal_rehacerAnalisis from '@/components/admMuestras/modal_rehacerAnalisis.vue';

export default {
  data() {
    return {
      
      RUM: '',     
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
        //{ key: 'matriz', label: 'Matriz' },
        //{ key: 'nombre_norma', label: 'Norma' },
        { key: 'Parámetro(s)', label: 'Parametros(s)' },
        { key: 'Metodología', label: 'Metodología' },
        //{ key: 'fecha_ingreso', label: 'Fecha ingreso' },
        //{ key: 'fecha_entrega', label: 'Fecha Entrega' },
        //{ key: 'hora_ingreso', label: 'Hora Ingreso' },
        { key: 'Dias', label: 'Días Transcurridos',},
        { key: 'prioridad', label: 'Prioridad'},
        { key: 'estado', label: 'Estado' },
        { key: 'Acción', label: 'Acción' }, 
      ],         
      prioridades: ['Normal', 'Alta', 'Urgente'],
      estados: ['Recepcionado', 'En Análisis', 'Finalizado'],
      prioridad: '',
      detallesData: {}         
     }
  },

  components: {
    ModalObservaciones,
    ModalDetalleMuestra,
    modal_analistaDesignado,
    modal_rehacerAnalisis
},
  methods: {    
  obtenerMuestras() {
    console.log("Obteniendo Muestras: ")     
      MuestraService.obtenerMuestras().then((response)=>{
        if (response.data != null && response.status === 200) {
        this.items = response.data
        }
        })             
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
        { text: 'Detalle muestra', value: 'Detalle Muestra' },
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

MarcarAnalisis(row){
  this.RUM = row.item.RUM;
  console.log('El Rum es: ' + this.RUM)
  MuestraService.completarMuestra(this.RUM)

},

RehacerAnalisis(row){
  this.RUM = row.item.RUM;
  console.log('El Rum es: ' + this.RUM)  
  this.$bvModal.show('modal-rehacer-analisis');
},

DetalleMuestra(row) {
  this.RUM = row.item.RUM;
  console.log('El Rum es: ' + this.RUM)
  MuestraService.obtenerDatosMuestra(this.RUM).then((response)=>{    
    console.log(response); 
    if (response.data != null){
      console.log( response.data);           
      this.detallesData = response.data        
      this.$bvModal.show('modal-detalle-muestra');
    }
  });  
},

Analista(row) {
  this.RUM = row.item.RUM;
  console.log('El Rum es: ' + this.RUM)
  this.$bvModal.show('modal-analista-designado');
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
 
},  
mounted() {
    this.obtenerMuestras();       
  }
}
</script>