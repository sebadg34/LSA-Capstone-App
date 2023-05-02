<template>
   
   <div>
      <!--Empieza el Formulario de recepción-->
        <div class="formulario">
          <b-form name="formulario" @submit.prevent="submitForm">
          <div class="row">
            
            <!-- Grupo de elementos del recepcionista -->
            <div class="col-md-4">
            
              <h1>RECEPCIONISTA</h1>
              <!-- <b-form-group id="recepcionista-group" class="my-form-group" label="Nombre Recepcionista: " label-for="recepcionista-input">
                <b-form-input id="recepcionista-input"  v-model="recepcionista" required></b-form-input>
              </b-form-group> -->

              <b-form-group id="solicitante-group" class="my-form-group" label="Nombre Solicitante: " label-for="solicitante-input">
                <b-form-input id="solicitante-input" v-model="solicitante" required></b-form-input>
              </b-form-group>
        
              <b-form-group id="solicitante-RUT" class="my-form-group" label="RUT Solicitante/Empresa: " label-for="RUT-input">
                <b-form-input id="RUT-input" v-model="rut" required></b-form-input>
              </b-form-group>

              <b-form-group id="solicitante-Dirección" class="my-form-group" label="Dirección: " label-for="Dirección-input">
                <b-form-input id="Dirección-input" v-model="direccion" required></b-form-input>
              </b-form-group>
            </div>
            
            <!-- Grupo de elementos de la muestra -->

            <div class="col-md-4">

              <h1> MUESTRA </h1>

              <b-form-group id="n-muestras-group" class="my-form-group" label="N° Muestras: " label-for="n-muestras-input">
                <b-form-input id="n-muestras-input" v-model="nMuestras" min="1"></b-form-input>
              </b-form-group>

              <b-button @click="agregarMuestras">Agregar Muestra</b-button>
              <b-button @click="verMuestras" v-if="muestras.length > 0">Ver Muestras</b-button>

               <b-modal v-model="modalVerMuestras">
                <template v-slot:modal-title>
                  <h4>Muestras</h4>
                </template>

                <template v-slot:default>
                  <b-table :items="muestras" :fields="fields"></b-table>
                </template>

                <template v-slot:modal-footer>
                  <b-button variant="primary" @click="modalVerMuestras = false">Cerrar</b-button>
                </template>
              </b-modal> 

              <b-form-group id="fecha-group" class="my-form-group" label="Fecha (Recepción): " label-for="fecha-input">
                <b-form-input id="fecha-input" v-model="fecha" readonly date-format="DD-MM-YY"></b-form-input>
              </b-form-group>

              <b-form-group id="hora-group" class="my-form-group" label="Hora (Recepción): " label-for="hora-input">
                <b-form-input id="hora-input" v-model="hora" readonly></b-form-input>
              </b-form-group>
              
              <b-button @click="generarFechaHoraActual()">Generar Fecha & Hora</b-button>

              <!-- <b-form-group id="muestreado-group" class="my-form-group" label="Muestreado por: " label-for="muestreado-input">
                <b-form-checkbox-group id="muestreado-input" v-model="muestreado" :options="opcionesMuestreado" inline></b-form-checkbox-group>
              </b-form-group> -->
        
              <b-form-group id="prioridad-group" class="my-form-group" label="Prioridad: " label-for="prioridad-input">
                <b-form-select v-model="prioridad" :options="opcionesPrioridad">
                  <template #first>
                    <option :value="null" disabled>Seleccione una opción</option>
                  </template>
                  <template #option="option">
                   <span :style="{ color: option.value.color }">{{ option.text }}</span>
                  </template>
                </b-form-select>
              </b-form-group>

              <b-form-group id="TipoMatriz-group" class="my-form-group" label="Tipo de Matriz: " label-for="prioridad-input">
                <b-form-select v-model="TipoMatriz" :options="opcionesMatriz">
                  <template #first>
                    <option :value="null" disabled>Seleccione una Matriz</option>
                  </template>
                </b-form-select>
              </b-form-group>
              
            </div>             
                  
              <!-- Grupo de elementos del transportista -->
              <div class="col-md-4">

              <h1> TRANSPORTISTA</h1>

              <b-form-group id="Transportista-group" class="my-form-group" label="Nombre Transportista: " label-for="transportista-input">
                <b-form-input id="transportista-input" v-model="transportista" required></b-form-input>
              </b-form-group>

              <b-form-group id="TransportistaRUT-group" class="my-form-group" label="RUT Transportista: " label-for="transportistaRUT-input">
                <b-form-input id="transportistaRUT-input" v-model="transportistaRut" required></b-form-input>
              </b-form-group>
                
              <b-form-group id="FONO-group" class="my-form-group" label="Fono transportista: " label-for="FONO-input">
                <b-form-input id="FONO-input" v-model="fono" required></b-form-input>
              </b-form-group>

              <b-form-group id="Patente-group" class="my-form-group" label="Patente: " label-for="Patente-input">
                <b-form-input id="Patente-input" v-model="patente" required></b-form-input>
              </b-form-group>
        
              <b-form-group id="Temp-group" class="my-form-group" label="T° de muestra(s): " label-for="Temp-input">
                <b-form-input id="Temp-input" v-model="Temperatura" title="Por favor ingrese un número válido"></b-form-input>
              </b-form-group>
    
              <b-form-group id="fechaE-group" label="Fecha de entrega:" class="my-form-group" label-for="fechaE-input">
                <b-form-datepicker id="fechaE-input" v-model="fechaEntrega" date-format="DD-MM-YY"></b-form-datepicker>
              </b-form-group>
            
              </div>
          </div>
              <b-form-group id="observaciones-group" class="my-form-group-wide" label="Observaciones: " label-for="observaciones-input">
                <b-form-textarea id="observaciones-input" v-model="observaciones"></b-form-textarea>
              </b-form-group>

              <button @click="submitForm()">Enviar</button>
      </b-form>
    </div>
    </div>
       


</template>

<script>

import MuestraService from '@/helpers/api-services/Muestra.Service';
import SubmuestraService from "@/helpers/api-services/subMuestra.Service.js";

export default{

  data() {
    return {
      recepcionista: '',
      solicitante:'',
      rut: '',
      direccion: '',
      muestreado:'',
      opcionesMuestreado: [
      { value: 'UCN', text: 'UCN' },
      { value: 'LSA', text: 'LSA' }],
      prioridad: null,
      opcionesPrioridad: [
      { value: '1', text: 'Normal', color: 'green' },
      { value: '2', text: 'Alta', color: 'yellow' }, 
      { value: '3', text: 'Urgente', color: 'red' }],
      TipoMatriz: null,
      opcionesMatriz: [
      { value: 'Agua', text: 'Agua'},
      { value: 'Tierra', text: 'Tierra'}, 
      { value: 'Mineral', text: 'Mineral'}],
      transportista:'',
      Temperatura:'',
      transportistaRut:'',
      fono:'',
      fechaEntrega: null,
      observaciones:'',
      nMuestras: null,
      muestras: [],
      modalVerMuestras: false,
      fields: ['nMuestra', 'codigoMuestra'],
      showModal: false,
      ultimoCodigo: 100000,
      fecha: "",
      hora: "",
      patente: ""
    };
  },
  
  
  methods: {
        
  agregarMuestras() {
      for (let i = 0; i < this.nMuestras; i++) {
        const codigo = ++this.ultimoCodigo;
        this.muestras.push({ nMuestra: `Muestra ${this.muestras.length + 1}`, codigoMuestra: codigo })
      }
    },
    verMuestras() {
      this.modalVerMuestras = true
    },
    generarFechaHoraActual() {
  const now = new Date();
  const dia = now.getDate().toString().padStart(2, '0');
  const mes = (now.getMonth() + 1).toString().padStart(2, '0');
  const anio = now.getFullYear().toString().substring(2);
  this.fecha = `${dia}/${mes}/${anio}`;
  this.hora = now.toLocaleTimeString();
},

  submitForm(event) {

    event.preventDefault();
      // Obtener datos del formulario
      var data = {
        //recepcionista: this.recepcionista,
        nombre_empresa: this.solicitante,
        direccion_empresa: this.direccion,
        nombre_solicitante: this.solicitante,
        muestreado_por: 'UCN',
        matriz: this.TipoMatriz,
        cantidad_muestras: this.nMuestras,
        prioridad: this.prioridad,
        fecha_muestreo: '20/08/2020',
        hora_muestreo: this.hora,
        temperatura_transporte: this.Temperatura,
        fecha_entrega: '20/03/2023',
        nombre_transportista: this.transportista,
        patente_vehiculo: this.patente,
        rut_transportista: this.transportistaRut,
        //rut: this.rut,       
        //fono: this.fono,       
        //observaciones: this.observaciones,  
      }
      
      
      console.log("data a enviar", data)
      MuestraService.ingresarMuestra(data)
  .then((response) => {
    console.log(response);
    if (response.status === 200) {
      alert('Muestra enviada con éxito!');
      document.formulario.reset();
      this.$router.push('/Form?s=1');

      // Obtener el RUM de la muestra creada
      const rum = response.data.RUM;

      // Crear la submuestra asociada a la muestra
      const submuestraData = {
        RUM: rum,
        
        // Agregar aquí los demás datos de la submuestra
      };

      return SubmuestraService.ingresarSubMuestra(submuestraData);
    } else {
      alert('Error al agregar muestra!');
      throw new Error('No se pudo agregar la muestra');
    }
  })
  .then((response) => {
    console.log(response);
    if (response && response.status === 200) {
      alert('Submuestra creada con éxito!');
    }
  })
  .catch((error) => {
    console.log(error);
    alert('Ocurrió un error al enviar la muestra.');
  });

      
    }
  }
}
</script>


