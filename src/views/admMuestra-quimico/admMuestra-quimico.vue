<template>
    <div>     
  <!-- Filtrador-->

  
  

  <!-- Fin Filtrador-->   
  
  <b-row style="padding-top:30px; ">
        <b-col class="col-6">
            <div style="font-size:2rem; font-weight: bold; color: var(--lsa-blue)">
                Administración de Muestras
            </div>
        </b-col>
    </b-row>

   

  <ModalObservaciones :muestra-data="this.modalData" @modal-cerrado="onModalCerrado"></ModalObservaciones>
  <ModalDetalleMuestra :detalles-data="this.detallesData"/> 
  <modal_analistaDesignado/>
  <modal_rehacerAnalisis/>
  <!-- Inicio tabla -->  

  <div class="row justify-content-center">
        <div class="col-10"> 
  <b-table fixed :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage">   
    
    <template #cell(prioridad)="row">

      <span v-if="row.item.prioridad == 'Normal'" style="text-transform:uppercase; color:green; font-weight: bold;">Normal</span>
      <span v-if="row.item.prioridad == 'Alta'" style="text-transform:uppercase; color:red; font-weight: bold;">Alta</span>
      <span v-if="row.item.prioridad == 'Urgente'" style="text-transform:uppercase; color:rebeccapurple; font-weight: bold;">Urgente</span>    
</template>

  <template #cell(Acción)="row">   
    
    <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
      <template #button-content>
          <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
      </template>
      
      <b-dropdown-item v-for="opcion in generarOpcionesEstado(row.item.estado)" :key="opcion.value">
        
        <b-dropdown-item @click="DetalleMuestra(row)" v-if="opcion.text === 'Detalle muestra'" :key="opcion.value">            
          <b-icon icon="file-earmark-medical" aria-hidden="true" class="mr-2"></b-icon>Ver Detalles          
        </b-dropdown-item>

        <b-dropdown-item @click="MostrarObservaciones(row)" v-if="opcion.text === 'Observaciones'" :key="opcion.value">
          <b-icon icon="menu-down" aria-hidden="true" class="mr-2"></b-icon>Observaciones     
        </b-dropdown-item>

        <b-dropdown-item @click="IngresarMuestraLab(row)" v-if="opcion.text === 'Ingresar muestra a lab.'" :key="opcion.value">          
          <b-icon icon="capslock-fill" aria-hidden="true" class="mr-2"></b-icon>Ingresar Muestra a Laboratorio
        </b-dropdown-item>

        <b-dropdown-item @click="Analista(row)" v-if="opcion.text === 'Analista Designado'" :key="opcion.value">
          <b-icon icon="file-earmark-person-fill" aria-hidden="true" class="mr-2"></b-icon>Analista Designado
        </b-dropdown-item>

        <b-dropdown-item @click="Descargar(row)" v-if="opcion.text === 'Descargar Informe'" :key="opcion.value">
          <b-icon icon="file-earmark-pdf-fill" aria-hidden="true" class="mr-2"></b-icon>Descargar Informe
        </b-dropdown-item>       

        <b-dropdown-item @click="Ingresar(row)" v-if="opcion.text === 'Ingresar resultados de análisis'" :key="opcion.value">
          <b-icon icon="file-earmark-font" aria-hidden="true" class="mr-2"></b-icon>Ingresar Resultados de Análisis           
        </b-dropdown-item>

        <b-dropdown-item @click="AdministrarCartas(row)" v-if="opcion.text === 'Administrar cartas de control'" :key="opcion.value">
          <b-icon icon="markdown" aria-hidden="true" class="mr-2"></b-icon> Administrar Cartas de Control          
        </b-dropdown-item>

        <b-dropdown-item @click="RehacerAnalisis(row)" v-if="opcion.text === 'Rehacer Análisis'" :key="opcion.value">
          <b-icon icon="journal-minus" aria-hidden="true" class="mr-2"></b-icon> Rehacer Análisis           
        </b-dropdown-item>        

        <b-dropdown-item @click="MarcarAnalisis(row)" v-if="opcion.text === 'Marcar Analisis como completado'" :key="opcion.value">
          <b-icon icon="clipboard-check" aria-hidden="true" class="mr-2"></b-icon> Marcar Análisis como Completado         
        </b-dropdown-item>  

      </b-dropdown-item>
    </b-dropdown>
  </template>
</b-table>   
<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="right"></b-pagination>

</div>
</div>



  </div>
</template>

<script>


import ModalObservaciones from '../ModalObservaciones.vue'
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
      currentPage: 1,
      perPage: 10,     
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
  computed: {
      rows() {
        return this.items.length
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