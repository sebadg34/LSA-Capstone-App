<template>
  <b-modal centered id="modal-analistas-designados-supervisor"  size="xl"
    @hidden="onHidden">

   <ModalEditarAnalistas @refrescar="obtenerAnalistasDesignados(RUM)" :analistas-data="analistasData" />

    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Analistas designados muestra {{ " RUM: " + RUM }}</div>
      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>




    <b-list-group style="padding:0px">
      <b-list-group-item style="padding:0px; height: 50px;">
        <b-list-group horizontal>
          <b-list-group-item class="p-3 text-center " style="width:25%;font-weight: bold;">
            Rut
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:25%;font-weight: bold;">
            Nombre
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:25%;font-weight: bold;">
            Parámetro
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:10%;font-weight: bold;">
            Orden
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
            Acción
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>

      <b-list-group-item v-for="analista in analistas" :key="analista.rut_empleado" style="padding:0px">
        <b-list-group horizontal>
          <b-list-group-item class="text-center" style="width:25%">
            {{ analista.rut_empleado }}
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:25%">
            {{ analista.nombre + " " + analista.apellido }}
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:25%">
            {{ analista.id_parametro }}
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:10%">
            {{ analista.orden_de_analisis }}
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:15%">
            accion
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>



    <b-row class="mt-4">
      <b-col class="col-3">
        <b-button @click="abrirEditarAnalistas" block class="lsa-orange reactive-button" style="font-weight: bold; border: none">
          Modificar analistas

          <b-icon icon="person-lines-fill" class="ml-2"></b-icon>
        </b-button>
      </b-col>
    </b-row>

    <template #modal-footer="{ close }">
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>
  
<script>

import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';

import ModalEditarAnalistas from '@/components/admMuestras-supervisor/modal_editarAnalistas-supervisor.vue';
export default {
  components: {
    ModalEditarAnalistas
  },
  props: {
    analistaData: Object
  },
  data() {
    return {

      RUM: '',
      loading: false,
      cargandoObservaciones: false,
      analistas: [],
      analistasData: {}

    }
  },
  methods: {
    abrirEditarAnalistas(){
      this.analistasData = {
       analistas: this.analistas
      }
      this.$bvModal.show('modal-editar-analistas-supervisor');
    },
    obtenerAnalistasDesignados(rum) {
      this.observaciones = [];
      this.cargandoObservaciones = true;
      MuestraSupervisorService.obtenerAnalistasDesignados(rum).then((response) => {
        if (response != null) {
          if (response.status == 200 && response.data != null) {
            const analistasData = response.data;
            console.log("analistas", analistasData);

            this.analistas = analistasData;

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
  