<template>
  <validation-observer ref="form">
    <b-modal centered id="modal-editar-analistas-supervisor" :title="`Observaciones de la muestra ${RUM}`" size="xl"
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



      <div class="form-group" v-for="(input, k) in analistas" :key="k">

        <b-row padding="0">
          <b-col class="col-4">
            <ValidationProvider :name="'analista ' + (k + 1)" rules="required" v-slot="validationContext">
              <b-form-input :state="getValidationState(validationContext)" :placeholder="'Analista ' + (parseInt(k) + 1)"
                style="height:30px" type="text" class="form-control" v-model="input.nombre_analista" />

              <b-form-invalid-feedback id="ciudad-live-feedback">{{
                validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </ValidationProvider>
          </b-col>
          <b-col class="col-6">
            <ValidationProvider :name="'orden ' + (k + 1)" rules="required" v-slot="validationContext">
              <b-form-input :state="getValidationState(validationContext)" :placeholder="'Orden '"
                style="height:30px" type="text" class="form-control" v-model="input.orden_analista" />
              <b-form-invalid-feedback id="ciudad-live-feedback">{{
                validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </ValidationProvider>
          </b-col>
          <b-col class="col-2">
            <b-button-group>
              <b-button variant="danger" @click="remove(k)" v-if="k || (!k && analistas.length > 1)"
                style="padding:2px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
              <b-button variant="success" @click="add(k)" v-if="k == analistas.length - 1"
                style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                <b-icon icon=" plus-circle-fill"></b-icon>
              </b-button>
            </b-button-group>

          </b-col>

        </b-row>

        <span>

        </span>

      </div>

   




      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button"
          style="font-weight:bold">
          Guardar cambios
        </b-button>
      </template>
    </b-modal>
  </validation-observer>
</template>
  
<script>

//import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';
export default {
  components: {
  },
  props: {
    analistasData: Object
  },
  data() {
    return {

      RUM: '',
      loading: false,
      cargandoObservaciones: false,
      analistas: []

    }
  },
  methods: {
    add() {
            this.analistas.push({
                nombre_analista: '',
                orden_analista: ''
            })
            console.log(this.direcciones)
        },

        remove(index) {
            this.analistas.splice(index, 1)
        },
    getValidationState({
      dirty,
      validated,
      valid = null
    }) {
      return dirty || validated ? valid : null;
    },
    agregarAnalista() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        } else { console.log("paso!") }
      })
    },
    cargarAnalistas() {
      this.analistas = [];
      this.analistasData.analistas.forEach(analista => {
        this.analistas.push({
          nombre_analista: analista.nombre + " " + analista.apellido,
          orden_analista: analista.orden_de_analisis,
          id_parametro: analista.id_parametro
        })
      });
    },
    onHidden() {
      this.$emit('modal-cerrado');
    }
  },
  watch: {
    analistasData: {
      handler() {
        this.cargarAnalistas();
      }
    }
  }
}
</script>
  