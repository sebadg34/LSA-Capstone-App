<template>
   
   <div>
      <!--Empieza el Formulario de recepción-->
        <div class="formulario">
        <b-form>
          <div  class="row">
            
            <!-- Grupo de elementos del recepcionista -->
            <div class="col-md-4">
            
              <h1>RECEPCIONISTA</h1>
              <b-form-group id="recepcionista-group" class="my-form-group" label="Nombre Recepcionista: " label-for="recepcionista-input">
                <b-form-input id="recepcionista-input"  v-model="recepcionista" required></b-form-input>
              </b-form-group>

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
                <b-form-input id="n-muestras-input" v-model="nMuestras" type="number" min="1" required></b-form-input>
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
                <b-form-input id="fecha-input" v-model="fecha" readonly></b-form-input>
              </b-form-group>

              <b-form-group id="hora-group" class="my-form-group" label="Hora (Recepción): " label-for="hora-input">
                <b-form-input id="hora-input" v-model="hora" readonly></b-form-input>
              </b-form-group>
              
              <b-button @click="generarFechaHoraActual()">Generar Fecha & Hora Actual</b-button>

              <b-form-group id="muestreado-group" class="my-form-group" label="Muestreado por: " label-for="muestreado-input">
                <b-form-checkbox-group id="muestreado-input" v-model="muestreado" :options="opcionesMuestreado" inline></b-form-checkbox-group>
              </b-form-group>
        
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

              <!-- tabla que muestra las muestras definidas anteriormente en el campo nMuestras-->


             <!-- <b-table v-if="tablaVisible" :items="muestras" :fields="camposTabla"></b-table> -->
            
      
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
                <b-form-input id="Temp-input" v-model="Temperatura" required pattern="-?\d+(\.\d+)?" title="Por favor ingrese un número válido" type="number"></b-form-input>
              </b-form-group>
    
              <b-form-group id="fechaE-group" label="Fecha de entrega:" class="my-form-group" label-for="fechaE-input">
                <b-form-datepicker id="fechaE-input" v-model="fechaEntrega"></b-form-datepicker>
              </b-form-group>
            
              </div>
          </div>
              <b-form-group id="observaciones-group" class="my-form-group-wide" label="Observaciones: " label-for="observaciones-input">
                <b-form-textarea id="observaciones-input" v-model="observaciones"></b-form-textarea>
              </b-form-group>

        <b-button type="submit" variant="primary" title="Enviar formulario" @click="showConfirmation">Enviar</b-button>
      </b-form>
    </div>
    </div>
       


</template>

<script>
export default {
  data() {
    return {
      recepcionista: '',
      solicitante:'',
      rut: '',
      direccion: '',
      muestreado:'',
      opcionesMuestreado: [
      { value: 'opción 1', text: 'UCN' },
      { value: 'opción 2', text: 'LSA' }],
      prioridad: null,
      opcionesPrioridad: [
      { value: 'normal', text: 'Normal', color: 'green' },
      { value: 'alta', text: 'Alta', color: 'yellow' }, 
      { value: 'urgente', text: 'Urgente', color: 'red' }],
      TipoMatriz: null,
      opcionesMatriz: [
      { value: 'AGUA', text: 'AGUA RESIDUAL'},
      { value: 'TIERRA', text: 'Tierra del infierno'}, 
      { value: 'MINERAL', text: 'Nether mineral'}],
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
      hora: ""
    };
  },
  
  
  methods: {
    showConfirmation() {
    if (confirm("¿Está seguro de enviar el formulario?")) {
      this.submit();
      alert("El formulario se ha enviado con éxito");
    }
  },
    submit() {

      // A la espera de continuar con el proyecto
    
  },
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
      this.fecha = now.toLocaleDateString();
      this.hora = now.toLocaleTimeString();
    }
  }
}
</script>


