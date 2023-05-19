<template>
  <validation-observer ref="form">
    <b-modal id="modal-recepcion" ref="modal" title="Agregar datos de recepción" size="lg">
      
      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar datos de recepción</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>
              
            <b-row class="pb-2">
            <b-col class="col-6">
              
                <label for="input-live">Rut:</label>
                <ValidationProvider name="Rut Recepcionista" rules="required|rut" v-slot="validationContext">
                    <b-form-input id="Rut Recepcionista-input" class="mb-1" v-model="recepcionistaRUT" :state="getValidationState(validationContext)" aria-describedby="Rut Recepcionista-live-feedback"></b-form-input>
                    <b-form-invalid-feedback id="Rut Recepcionista-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <label for="input-live">Recepcionista:</label>
                <ValidationProvider name="NombreRecepcionista" rules="required" v-slot="validationContext">
                    <b-input-group class="mb-1">                        
                        <b-form-input id="input-live" v-model="recepcionista" aria-describedby="input-live-help Nombre Recepcionista-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="Nombre Recepcionista-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-input-group>
                </ValidationProvider>
               </b-col>
            <b-col class="col-6">

                <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">
                    <label for="input-live">Rut Cliente:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="rut" aria-describedby="input-live-help rut-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="rut-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider name="solicitante" rules="required" v-slot="validationContext">
                    <label for="input-live">Cliente:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="solicitante" aria-describedby="input-live-help solicitante-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="solicitante-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider> 
                
                <ValidationProvider name="Dirección Cliente" rules="required" v-slot="validationContext">
                    <label for="input-live">Dirección Cliente:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="direccion" aria-describedby="input-live-help Dirección Cliente-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="Dirección Cliente-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider> 
            </b-col>
        </b-row> 
              <template #modal-footer>
                <b-button @click="GuardarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">Guardar</b-button>
              </template>
    </b-modal>

    
  </validation-observer>
</template>

<script>


 export default {

    data(){
        return {
          nombresEmpleados: [],


            recepcionistaRUT:'',
            recepcionista:'',
            rut:'',
            solicitante:'',
            direccion:''
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

       
    GuardarFormulario() {
      const datosIngresados = {
        recepcionistaRUT: this.recepcionistaRUT,
        recepcionista: this.recepcionista,
        rut: this.rut,
        solicitante: this.solicitante,
        direccion: this.direccion
      }

      // Emitir el evento 'datosIngresados' junto con los datos
      this.$emit('datosIngresados', datosIngresados)

      // Cerrar el modal después de enviar los datos (si es necesario)
      this.$refs.modal.hide()
    }
  }




 }



</script>