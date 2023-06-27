<template>
  <b-modal id="modal-observaciones-gerente" :title="`Detalles de la muestra ${RUM}`" size="lg" @hidden="onHidden">

    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Detalles de la muestra</div>
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
<br/>
        <b-row class="pb-2">
          
          <b-col class="col-6">
           
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> Nombre solicitante: </b-col>
              <b-col class="col-5">{{ nombre_solicitante }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> Empresa: </b-col>
              <b-col class="col-5">{{ nombre_empresa }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> Ciudad empresa: </b-col>
              <b-col class="col-5">{{ ciudad_empresa }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> Dirección empresa: </b-col>
              <b-col class="col-5">{{ direccion_empresa }}</b-col>
            </b-row>
           
          </b-col>

          <b-col class="col-6">
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> Número de muestras: </b-col>
              <b-col class="col-5">{{ numero_muestras }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> matriz: </b-col>
              <b-col class="col-5">{{ matriz }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> Norma: </b-col>
              <b-col class="col-5">{{ norma }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-7" style="font-weight:bold;"> Muestreado por: </b-col>
              <b-col class="col-5">{{ muestreador }}</b-col>
            </b-row>
           

          </b-col>
        </b-row>
<br/>
    
<br/>
        <b-row style="border-bottom: 1px solid var(--lsa-light-gray);">
              <b-col class="col-7" style="font-weight:bold;"> Fecha de entrega: </b-col>
              <b-col class="col-5">{{ fecha_entrega }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray);">
              <b-col class="col-7" style="font-weight:bold;"> Tipo de pago: </b-col>
              <b-col class="col-5">{{ tipo_pago }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray);">
              <b-col class="col-7" style="font-weight:bold;"> Valor neto: </b-col>
              <b-col class="col-5">{{ valor_neto }}</b-col>
            </b-row>
            
      </b-col>
    </div>

    <template #modal-footer="{ close }">
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import MuestraGerenteService from '@/helpers/api-services/Muestra-gerente.service';

export default {
  props: {
    muestraData: Object
  },
  data() {
    return {

      RUM: '',

    }
  },
  methods: {
    obtenerObservaciones(rum) {
      MuestraGerenteService.obtenerObservaciones(rum).then((response) => {
        console.log(response)
        if (response != null) {
          if (response.status == 200 && response.data != null) {
           // const detalles = response.data;
            console.log('detalles de muestra', response.data);
          }

        } else {
          this.$bvToast.toast(`Error al obtener detalles de muestra`, {
            title: 'Error',
            toaster: 'b-toaster-top-center',
            solid: true,
            variant: "warning",
            appendToast: true
          })
          this.cargandoDirecciones = false;
        }
      })
    },
    onHidden() {
      this.$emit('modal-cerrado');
    }
  },
  watch: {
    muestraData: {
      handler() {
        console.log("detallesData actualizada", this.muestraData)

        this.RUM = this.muestraData.RUM;
        this.obtenerObservaciones(this.RUM);
      }
    }
  }
}
</script>
