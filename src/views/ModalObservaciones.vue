<template>
  <b-modal id="modal-observaciones" :title="`Observaciones de la muestra ${RUM}`" @hidden="onHidden">
    <div class="p-3">
      <p v-if="this.observaciones == null">No hay observaciones para esta muestra.</p>
      <ul v-else>
        
      </ul>
      <div class="text-center">
        {{ this.observaciones }}
      </div>

      <div>

        <ValidationProvider name="observaciones" rules="required" v-slot="validationContext">
                    <label for="input-live">Observaciones:</label>
                    <b-form-textarea id="input-live" v-model="observaciones" aria-describedby="input-live-help observaciones-live-feedback" :state="getValidationState(validationContext)"></b-form-textarea>
                    <b-form-invalid-feedback id="observaciones-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
        </ValidationProvider> 

      </div>
    </div>
  </b-modal>
</template>

<script>
//import MuestraService from '@/helpers/api-services/Muestra.Service';

export default {
  props: {
    muestraData: Object
  },
  data() {
    return {
      
      RUM: '',
      observaciones: '',
      loading: false,
      showObservaciones: false,
      
    }
  },  
  methods: {
    getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
    onHidden() {
      this.showObservaciones = false;
      this.$emit('modal-cerrado');
    }
  },
  watch: {
    muestraData: {
            handler() {
                console.log("muestraData actualizada")
                console.log(this.muestraData.observaciones)
                this.RUM = this.muestraData.RUM;
                this.observaciones = this.muestraData.observaciones;
            }
        }
  }
}
</script>
