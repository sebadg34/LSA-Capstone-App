<template>
  <b-modal id="modal-observaciones-muestra-quimico" :title="`Observaciones de la muestra ${RUM}`" size="xl"
    @hidden="onHidden">

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

        <b-col class="col-3">
          <b-row style="border: 1px solid var(--lsa-light-gray); padding:4px; border-radius:5px">
            <b-col class="col-6" style="font-weight:bold; "> RUM: </b-col>
            <b-col class="col-6">{{ RUM }}</b-col>
          </b-row>
        </b-col>
        <br />
        <b-row class="pb-2 pl-3">
          Observaciones: 
        </b-row>
       
        <b-list-group horizontal style="font-weight: bold;" >
          <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:40%;padding-top:3px; padding-bottom:3px">Analista</b-list-group-item>
          <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%;padding-top:3px; padding-bottom:3px">Fecha ingreso</b-list-group-item>
          <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%;padding-top:3px; padding-bottom:3px">Hora ingreso</b-list-group-item>
        </b-list-group>
        <b-list-group>
          <b-list-group-item v-if="cargandoObservaciones"
            class="d-flex align-items-center justify-content-center lsa-orange-text" style="height:100px">
            <div>
              <b-spinner class="align-middle"></b-spinner>
              <strong> Cargando...</strong>
            </div>
          </b-list-group-item>
          <b-list-group-item v-for="(observacion,index) in this.observaciones" :key="index" horizontal>
           <b-row style="border-bottom:1px solid var(--lsa-light-gray);margin-bottom:30px;" class="d-flex justify-content-around align-items-center">
            <div class="d-flex align-items-center justify-content-center" style="width:40%;">
              {{ observacion.nombre + " " + observacion.apellido }}
            </div>
            <div class="d-flex align-items-center justify-content-center"  style="width:30%;">
              {{ observacion.fecha_observacion }}
            </div>
            <div class="d-flex align-items-center justify-content-center" style="width:30%;">
              {{ observacion.hora_observacion }}
            </div>
           </b-row>
           <b-row style=" min-height: 100px;" class="d-flex justify-content-center">
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
import MuestraQuimicoService from '@/helpers/api-services/Muestra-quimicos.service';

export default {
  props: {
    detallesData: Object
  },
  data() {
    return {

      RUM: '',
      loading: false,
      cargandoObservaciones: false,
      observaciones: []

    }
  },
  methods: {
    obtenerObservaciones(rum) {

      this.cargandoObservaciones = true;
      MuestraQuimicoService.obtenerObservaciones(rum).then((response) => {
        console.log(response)
        if (response != null) {
          if (response.status == 200 && response.data != null) {
            const observacionesData = response.data;


            this.observaciones = observacionesData;
            this.cargandoObservaciones = false;


          } else {
            this.$bvToast.toast(`Error al obtener observaciones de muestra`, {
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
        console.log("detallesData actualizada", this.detallesData)
        this.observaciones = [];
        this.RUM = this.detallesData.RUM;

        this.obtenerObservaciones(this.RUM);
      }
    }
  }
}
</script>
