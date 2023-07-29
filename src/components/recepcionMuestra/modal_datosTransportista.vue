<template>

<validation-observer ref="form">
<b-modal id="modal-recepcionTransportista" ref="modal" title="Agregar datos del transportista" size="lg">

  <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar datos del transportista</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-6">              
                <label for="input-live">RUT:</label>
                <ValidationProvider name="RUT del transportista" rules="required|rut" v-slot="validationContext">
                    <b-form-input id="transportistaRut-input" class="mb-1" v-model="transportistaRut" :state="getValidationState(validationContext)" aria-describedby="transportistaRut-live-feedback"></b-form-input>
                    <b-form-invalid-feedback id="transportistaRut-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <label for="input-live">Teléfono móvil:</label>
                <ValidationProvider name="teléfono móvil" rules="required|numeric" v-slot="validationContext">
                    <b-input-group class="mb-1">
                        <b-input-group-prepend is-text>
                            +56 9
                        </b-input-group-prepend>
                        <b-form-input id="input-live" v-model="fono" aria-describedby="input-live-help fono-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="fono-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-input-group>
                </ValidationProvider>

                <ValidationProvider name="temperatura de la muestra" rules="required|numeric" v-slot="validationContext">
                    <label for="input-live">Temperatura de la muestra:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="Temperatura" aria-describedby="input-live-help Temperatura-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="Temperatura-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

            </b-col>
            <b-col class="col-6">
                <ValidationProvider name="nombre y apellido del transportista" rules="required" v-slot="validationContext">
                    <label for="input-live">Nombre y apellido:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="transportista" aria-describedby="input-live-help transportista-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="transportista-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                
                <ValidationProvider name="patente" rules="required" v-slot="validationContext">
                    <label for="input-live">Patente:</label>
                    <b-form-input class="mb-1" id="input-live" :state="getValidationState(validationContext)" v-model="patente" aria-describedby="input-live-help patente-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="patente-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <b-form-group id="fechaE-group" label="Fecha de entrega:" class="my-form-group" label-for="fechaE-input">
                <b-form-datepicker id="fechaE-input" v-model="fechaEntrega"></b-form-datepicker>
              </b-form-group>
            </b-col>
        </b-row>      

              <template #modal-footer>
                <b-button @click="GuardarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">Guardar</b-button>
              </template>
           
            </b-modal>
</validation-observer>
</template>
<script>
import { BFormDatepicker } from 'bootstrap-vue'
export default {
    data(){
        return {
            transportista: '',
            transportistaRut: '',
            fono:'',
            patente: '',
            Temperatura: '',
            fechaEntrega: '',
        }


    },

  components: {
  BFormDatepicker, 

},
    methods: {
      getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },

        resetearCampos() {    
        this.transportista = '';
        this.transportistaRut = '';
        this.fono = '';
        this.patente = '';
        this.Temperatura = '';
        this.fechaEntrega = '';
     },

        GuardarFormulario() {
            this.$refs.form.validate().then(success => {
                if (success) {
        const datosIngresados = {
            transportista: this.transportista,
            transportistaRut: this.transportistaRut,
            fono: this.fono,
            patente: this.patente,
            Temperatura: this.Temperatura,
            fechaEntrega: this.fechaEntrega              
        }



      // Emitir el evento 'datosIngresados' junto con los datos
      this.$emit('datosIngresados', datosIngresados)

      // Cerrar el modal después de enviar los datos (si es necesario)
      this.$refs.modal.hide()
    }
});




    },
    }
}
</script>