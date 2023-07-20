<template>
    <b-modal id="modal-analistas-designados-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl"
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
  
     
  
     
      
  
  
  
      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
          Cerrar
        </b-button>
      </template>
    </b-modal>
  </template>
  
  <script>
  
  import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';
  export default {
    components: {
    },
    props: {
        analistaData: Object
    },
    data() {
      return {
  
        RUM: '',
        loading: false,
        cargandoObservaciones: false,
  
      }
    },
    methods: {
        agregarAnalista(){
                
        },
      obtenerAnalistasDesignados(rum) {
        this.observaciones = [];
        this.cargandoObservaciones = true;
        MuestraSupervisorService.obtenerAnalistasDesignados(rum).then((response) => {
          if (response != null) {
            if (response.status == 200 && response.data != null) {
              const analistasData = response.data;
                console.log("analistas",analistasData);
  
  
  
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
        analistaData: {
        handler() {
         
         
          this.RUM = this.analistaData.RUM;
  
          this.obtenerAnalistasDesignados(this.RUM);
        }
      }
    }
  }
  </script>
  