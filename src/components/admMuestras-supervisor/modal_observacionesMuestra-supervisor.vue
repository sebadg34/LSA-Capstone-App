<template>
  <b-modal id="modal-observaciones-muestra-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl"
    @hidden="onHidden">

    <modalAgregarObservacion @refrescar="obtenerObservaciones(RUM)" :muestra-data="muestraData"/>

    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Observaciones de la muestra</div>
      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>

    <div class="p-3">
      <b-col class="col-12">
<b-row  class="d-flex justify-content-between" style="padding:20px">
        <b-col class="col-3">
          <b-row style="border: 1px solid var(--lsa-light-gray); padding:4px; border-radius:5px">
            <b-col class="col-6" style="font-weight:bold; "> RUM: </b-col>
            <b-col class="col-6">{{ RUM }}</b-col>
          </b-row>
        </b-col>
        <b-button @click="abrirAgregarObservacion" pill style="border: none" class="lsa-orange reactive-button">
                                Agregar
                                <b-icon icon="pencil-square"></b-icon>
                            </b-button>
                          </b-row>
        <br />
        <b-row class="pb-2 pl-3">
          Observaciones: 
        </b-row>
       
        <b-list-group horizontal style="font-weight: bold;" >
          <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:40%;padding-top:3px; padding-bottom:3px">Analista</b-list-group-item>
          <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%;padding-top:3px; padding-bottom:3px">Fecha de ingreso</b-list-group-item>
          <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%;padding-top:3px; padding-bottom:3px">Hora de ingreso</b-list-group-item>
        </b-list-group>
        <b-list-group>
          <b-list-group-item v-if="cargandoObservaciones"
            class="d-flex align-items-center justify-content-center lsa-orange-text" style="height:100px">
            <div>
              <b-spinner class="align-middle"></b-spinner>
              <strong> Cargando...</strong>
            </div>
          </b-list-group-item>
          <b-list-group-item v-for="(observacion,index) in this.observaciones" :key="index" horizontal class="mb-3" style="border: solid 2px var(--lsa-light-gray)">
           <b-row style="border-bottom:1px solid var(--lsa-light-gray);margin-bottom:10px;" class="d-flex justify-content-around align-items-center">
            <div class="d-flex align-items-center justify-content-center" style="width:40%;">
              {{ observacion.nombre + " " + observacion.apellido }}
            </div>
            <div class="d-flex align-items-center justify-content-center"  style="width:30%;">
              {{ observacion.fecha_observacion_formateada }}
            </div>
            <div class="d-flex align-items-center justify-content-center" style="width:30%;">
              {{ observacion.hora_observacion_formateada }}
            </div>
           </b-row>
           <b-row style=" min-height: 50px;" class="d-flex justify-content-center">
            <b-col class="col-10">
              <div>
             <strong>Observación:</strong> {{  " " +  observacion.observaciones}}
            </div>
            </b-col>
           
            
           </b-row>
         
          </b-list-group-item>

        </b-list-group>

        <br />
      
      </b-col>
      <br />
     
    </div>

   
    



    <template #modal-footer="{ close }">
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>

import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';
import modalAgregarObservacion from '@/components/admMuestras-supervisor/modal_agregarObservacion-supervisor.vue';
export default {
  components: {
    modalAgregarObservacion
  },
  props: {
    detallesData: Object
  },
  data() {
    return {

      RUM: '',
      loading: false,
      cargandoObservaciones: false,
      observaciones: [],
      muestraData: {}

    }
  },
  methods: {
    abrirAgregarObservacion(){
      this.muestraData = {
        RUM: this.RUM
      }
      this.$bvModal.show('modal-agregar-observacion-supervisor');
    },
    obtenerObservaciones(rum) {
      this.observaciones = [];
      this.cargandoObservaciones = true;
      MuestraSupervisorService.obtenerObservaciones(rum).then((response) => {
        if (response != null) {
          if (response.status == 200 && response.data != null) {
            const observacionesData = response.data;


            this.observaciones = observacionesData;
            this.cargandoObservaciones = false;


          } else {
            this.$bvToast.toast(`Error al obtener las observaciones de la muestra.`, {
              title: 'Error',
              toaster: 'b-toaster-top-center',
              solid: true,
              variant: "warning",
              appendToast: true
            })
            this.cargandoObservaciones = false;
          }
        }
      })
    },
    onHidden() {
      this.$emit('modal-cerrado');
    }
  },
  watch: {
    detallesData: {
      handler() {
       
       
        this.RUM = this.detallesData.RUM;

        this.obtenerObservaciones(this.RUM);
      }
    }
  }
}
</script>
