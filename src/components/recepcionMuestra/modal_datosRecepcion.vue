<template>
  <validation-observer ref="form">
    <b-modal id="modal-recepcion" ref="modal" title="Agregar datos de recepción" size="lg">
      <!-- Encabezado del modal -->
      <template #modal-header="{ close }">
        <b-row class="d-flex justify-content-around">
          <div class="pl-3">Agregar datos de Recepción</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
          <span aria-hidden="true" style="color:white">&times;</span>
        </button>
      </template>

      <!-- Contenido del modal -->
      <b-row class="pb-2">
        <b-col class="col-6">

          <label for="Rut Recepcionista-input">Rut:</label>
          <ValidationProvider name="Rut Recepcionista" rules="required|rut" v-slot="validationContext">
            <b-form-input id="Rut Recepcionista-input" readonly class="mb-1" v-model="recepcionistaRUT" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </ValidationProvider>

          <label for="input-live">Recepcionista:</label>
          <ValidationProvider name="NombreRecepcionista" rules="required" v-slot="validationContext">
            <b-form-select v-model="recepcionista" :state="getValidationState(validationContext)" :options="opcionesRecepcionistas" placeholder="Seleccione un recepcionista" ></b-form-select>
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </ValidationProvider>

        </b-col>

        <b-col class="col-6">

          <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">
            <label for="input-live">Rut Cliente:</label>
            <b-form-input class="mb-1" id="input-live" readonly v-model="rut" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </ValidationProvider>

          <ValidationProvider name="solicitante" rules="required" v-slot="validationContext">
            <label for="input-live">Cliente:</label>
            <b-form-select v-model="solicitante" :state="getValidationState(validationContext)" :options="opcionesClientes" placeholder="Seleccione un Cliente" ></b-form-select>
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </ValidationProvider> 
          
          <ValidationProvider name="Dirección Cliente" rules="required" v-slot="validationContext">
            <label for="input-live">Dirección Cliente:</label>
            <b-form-input class="mb-1" id="input-live" v-model="direccion" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </ValidationProvider> 

        </b-col>
      </b-row> 

      <!-- Pie del modal -->
      <template #modal-footer>
        <b-button @click="guardarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">Guardar</b-button>
      </template>
    </b-modal>
  </validation-observer>
</template>

<script>

import MuestraService from '@/helpers/api-services/Muestra.Service';

import EmpresaService from '@/helpers/api-services/Empresa.service';

export default {
  data() {
    return {
      recepcionistaRUT: '',
      recepcionista: '',
      rut: '',
      solicitante: '',
      direccion: '',
      opcionesRecepcionistas: [],
      opcionesClientes: [],
      empresas: []
    }
  },
  mounted() {

    MuestraService.obtenerNombreEmpleados().then((response) => {    
    console.log(response.data); 
    if (response != null) {
      this.opcionesRecepcionistas = response.data;
    }
  });

  EmpresaService.obtenerTodasEmpresa().then((response) => {
    console.log(response.data);
    if (response != null) {
      this.empresas = response.data;
      this.opcionesClientes = this.empresas.map((empresa) => empresa.nombre_empresa);
      console.log("Los clientes son: ", this.opcionesClientes);
    }
  });


  },

  watch: {
  recepcionista(newValue) {
    console.log(newValue)    
    this.recepcionistaRUT = newValue;
    
  },

  solicitante(newValue) {
    console.log(newValue);
    const empresaSeleccionada = this.empresas.find((empresa) => empresa.nombre_empresa === newValue);
    if (empresaSeleccionada) {
      this.rut = empresaSeleccionada.rut_empresa;
    }
  }
  



},


  methods: {
    
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetearCampos() {
    // Restablecer los valores de los campos a un estado en blanco
    this.recepcionistaRUT = '';
    this.recepcionista = '';
    this.rut = '';
    this.solicitante = '';
    this.direccion = '';
  },
  
    guardarFormulario() {
      this.$refs.form.validate().then(success => {
        if (success) {
          const datosIngresados = {
            recepcionistaRUT: this.recepcionistaRUT,
            recepcionista: this.recepcionista,
            rut: this.rut,
            solicitante: this.solicitante,
            direccion: this.direccion
          }
          this.$emit('datosIngresados', datosIngresados)
          this.$refs.modal.hide()
        }
      });
    }

  },

}
</script>