<template>    
    <validation-observer ref="form">    
    <b-modal id="modal-recepcionMuestra" ref="modal" title="Agregar datos de Muestra" size="lg">

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar datos de la muestra</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

            <b-row class="pb-2">
            <b-col class="col-6">
              
                <label for="input-live">N° de Muestras:</label>
                <ValidationProvider name="nMuestras" rules="required|numeric" v-slot="validationContext">
                    <b-form-input id="nMuestras-input" class="mb-1" v-model="nMuestras" :state="getValidationState(validationContext)" aria-describedby="nMuestras-live-feedback"></b-form-input>
                    <b-form-invalid-feedback id="nMuestras-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <label for="input-live">Fecha de Ingreso:</label>
                <ValidationProvider name="fechaI" rules="required" v-slot="validationContext">
                    <b-input-group class="mb-1">                        
                        <b-form-input id="input-live" readonly v-model="fecha" aria-describedby="input-live-help fechaI-live-feedback" :state="getValidationState(validationContext)" placeholder=""></b-form-input>
                        <b-form-invalid-feedback id="fechaI-live-feedback">{{
                        validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-input-group>

                </ValidationProvider>

                <ValidationProvider name="horaI" rules="required" v-slot="validationContext">
                    <label for="input-live">Hora de Ingreso:</label>
                    <b-form-input class="mb-1" id="input-live" readonly :state="getValidationState(validationContext)" v-model="hora" aria-describedby="input-live-help horaI-live-feedback" placeholder="" trim></b-form-input>
                    <b-form-invalid-feedback id="horaI-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <b-button @click="generarFechaHoraActual()">Generar Fecha & Hora de Recepción</b-button>

            </b-col>
            
            <b-col class="col-6">
                <ValidationProvider name="muestreado" rules="required" v-slot="validationContext">
                    <label for="input-live">Muestreado por:</label>
                    <b-form-select id="input-live" v-model="muestreado" :options="opcionesMuestreado" aria-describedby="input-live-help muestreado-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                    <b-form-invalid-feedback id="muestreado-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <label for="input-live">Prioridad:</label>
                <ValidationProvider name="prioridad" rules="required" v-slot="validationContext">
                    
                    <b-form-select id="input-live" v-model="prioridad" :options="opcionesPrioridad" aria-describedby="input-live-help prioridad-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                    <b-form-invalid-feedback id="prioridad-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <ValidationProvider name="TipoMatriz" rules="required" v-slot="validationContext">
                    <label for="input-live">Tipo de Matriz:</label>
                    <b-form-select id="input-live" v-model="TipoMatriz" :options="opcionesMatriz" aria-describedby="input-live-help TipoMatriz-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                    <b-form-invalid-feedback id="TipoMatriz-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>

                <ValidationProvider name="observaciones" rules="required" v-slot="validationContext">
                    <label for="input-live">Observaciones:</label>
                    <b-form-textarea id="input-live" v-model="observaciones" aria-describedby="input-live-help observaciones-live-feedback" :state="getValidationState(validationContext)"></b-form-textarea>
                    <b-form-invalid-feedback id="observaciones-live-feedback">{{
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
        return{
            nMuestras:'',
            fecha: '',
            hora: '',
            muestreado: '',
            opcionesMuestreado: [
            { value: 'UCN-LSA', text: 'UCN-LSA' },
            { value: 'Cliente', text: 'Cliente' }],
            prioridad: '',
            opcionesPrioridad: [
            { value: 'Normal', text: 'Normal'},
            { value: 'Alta', text: 'Alta'}, 
            { value: 'Urgente', text: 'Urgente'}],
            TipoMatriz: '',
            opcionesMatriz: [
            { value: 'Agua', text: 'Agua'},
            { value: 'Tierra', text: 'Tierra'}, 
            { value: 'Mineral', text: 'Mineral'}], 
            observaciones: ''  ,
                 
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

        resetearCampos() {
    // Restablecer los valores de los campos a un estado en blanco
    this.nMuestras = null;
    this.fecha = '';
    this.hora = '';
    this.muestreado = '';
    this.prioridad = null;
    this.TipoMatriz = null;
    this.observaciones = '';
 },
    GuardarFormulario() {
        this.$refs.form.validate().then(success => {
            if (success) {
      const datosIngresados = {
        nMuestras: this.nMuestras,
        fecha: this.fecha,
        hora: this.hora,
        muestreado: this.muestreado,
        prioridad: this.prioridad,
        TipoMatriz: this.TipoMatriz,  
        observaciones: this.observaciones     
      }




      // Emitir el evento 'datosIngresados' junto con los datos
      this.$emit('datosIngresados', datosIngresados)
      // Cerrar el modal después de enviar los datos (si es necesario)
      this.$refs.modal.hide()
    }
});






    },







    generarFechaHoraActual() {
  const now = new Date();
  const dia = now.getDate().toString().padStart(2, '0');
  const mes = (now.getMonth() + 1).toString().padStart(2, '0');
  const anio = now.getFullYear().toString();
  this.fecha = `${dia}/${mes}/${anio}`;
  this.hora = now.toLocaleTimeString();
},
  }
}
</script>