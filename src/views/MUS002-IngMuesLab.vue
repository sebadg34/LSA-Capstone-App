<template>
    <div>
        <h1>Ingresar muestra a laboratorio</h1>
      <div class="formulario">
        <b-form>
          <div class="row">

            
             <!-- Grupo de elementos del recepcionista -->
            <div class="col-md-4">
                <h1>Datos Generales</h1>
              
              <b-form-group id="RUM-group" class="my-form-group" label="RUM: " label-for="RUM-input">
                <b-form-input id="RUM-input" v-model="RUM" disabled></b-form-input>
              </b-form-group>

              <b-form-group id="recepcionista-group" class="my-form-group" label="Recepcionista: " label-for="recepcionista-input">
                <b-form-input id="recepcionista-input" v-model="recepcionista"></b-form-input>
              </b-form-group>
              
              <b-form-group id="direccion-group" class="my-form-group" label="Dirección: " label-for="direccion-input">
                <b-form-input id="direccion-input" v-model="direccion"></b-form-input>
              </b-form-group>

              <b-form-group id="solicitante-group" class="my-form-group" label="Solicitante: " label-for="solicitante-input">
                <b-form-input id="solicitante-input" v-model="solicitante"></b-form-input>
              </b-form-group>

              <b-form-group id="TipoPago-group" class="my-form-group" label="Medio de pago: " label-for="TipoPago-input">
                <div class="d-flex flex-column">
                <div v-for="(opcion, index) in opciones" :key="index" class="mb-2">
                <b-form-radio v-model="pago" :value="opcion.valor">{{ opcion.texto }}</b-form-radio>
                </div>
                </div>
                </b-form-group>

            </div>

            <!-- Grupo de elementos de la muestra -->
            <div class="col-md-4">
                <h1>Datos Muestra</h1>

                <b-form-group id="Fecha-group" class="my-form-group" label="Fecha Muestreo: " label-for="Fecha-input">
                    <b-form-input id="Fecha-input" v-model="fecha" disabled></b-form-input>
                </b-form-group>

                <b-form-group id="Hrs-group" class="my-form-group" label="Hora Muestreo: " label-for="Hrs-input">
                <b-form-input id="Hrs-input" v-model="Hrs" disabled></b-form-input>
              </b-form-group>

              <b-form-group id="cotizacion-group" class="my-form-group" label="Cotización: " label-for="cotización-input">
                <b-form-input id="cotización-input" v-model="cotizacion"></b-form-input>
              </b-form-group>

              <b-form-group id="muestreado-group" class="my-form-group" label="Muestreado por: " label-for="muestreado-input">
                <b-form-checkbox-group id="muestreado-input" v-model="muestreado" :options="opcionesMuestreado" inline></b-form-checkbox-group>
              </b-form-group>

              <b-form-group id="Matriz-group" class="my-form-group" label="Matriz: " label-for="Matriz-input">
                <b-form-input id="Matriz-input" v-model="matriz"></b-form-input>
              </b-form-group>

              <b-form-group id="NMuestras-group" class="my-form-group" label="N°Muestras: " label-for="NMuestras-input">
                <b-form-input id="NMuestras-input" v-model="NMuestras" disabled></b-form-input>
              </b-form-group>

              <b-form-group id="Prioridad-group" class="my-form-group" label="Prioridad: " label-for="Prioridad-input">
                <b-form-input id="Prioridad-input" v-model="prioridad"></b-form-input>
              </b-form-group>

              <b-form-group id="fechaE-group" label="Fecha de entrega:" class="my-form-group" label-for="fechaE-input">
                <b-form-datepicker id="fechaE-input" v-model="fechaEntrega" disabled></b-form-datepicker>
              </b-form-group>

            </div>

            <!-- Datos transportista/Empresa -->

            <div class="col-md-4">
                <h1>Datos Trans/Empresa</h1>     
                
                <b-form-group id="TransportistaRUT-group" class="my-form-group" label="RUT Transportista: " label-for="transportistaRUT-input">
                <b-form-input id="transportistaRUT-input" v-model="transportistaRut" disabled></b-form-input>
              </b-form-group>

              <b-form-group id="empresa-group" class="my-form-group" label="Empresa: " label-for="empresa-input">
                <b-form-input id="empresa-input" v-model="empresa"></b-form-input>
              </b-form-group>      
              
              <b-form-group id="Temp-group" class="my-form-group" label="T° de muestra(s): " label-for="Temp-input">
                <b-form-input id="Temp-input" v-model="Temperatura" pattern="-?\d+(\.\d+)?" disabled title="Por favor ingrese un número válido" type="number"></b-form-input>
              </b-form-group>
                                            
              <b-form-group id="Transportista-group" class="my-form-group" label="Nombre Transportista: " label-for="transportista-input">
                <b-form-input id="transportista-input" v-model="transportista" required></b-form-input>
              </b-form-group>

              <b-form-group id="FONO-group" class="my-form-group" label="Fono transportista: " label-for="FONO-input">
                <b-form-input id="FONO-input" v-model="fono" required></b-form-input>
              </b-form-group>

              <b-form-group id="Patente-group" class="my-form-group" label="Patente: " label-for="Patente-input">
                <b-form-input id="Patente-input" v-model="patente" required></b-form-input>
              </b-form-group> 
          </div>
        </div>
        </b-form>
            
          </div>
            <b-form-group id="observaciones-group" class="my-form-group-wide" label="Observaciones: " label-for="observaciones-input">
                <b-form-textarea id="observaciones-input" v-model="observaciones"></b-form-textarea>
            </b-form-group>
        
          </div>
    
  </template>

<script>
export default {
  data() {
    return {
      RUM: '',
      recepcionista: '',
      empresa: '',
      dirección: '',
      solicitante: '',
      fecha: '',
      hrs:'',
      cotizacion:'',
      muestreado:'',
      NMuestras:'',
      matriz:'',
      prioridad:'',
      fechaEntrega:'',
      transportistaRut:'',      
      pago:'',
      temperatura:'',
      transportista:'',
      fono: '',
      patente: '',
      observaciones:'',
      opciones: [
        { valor: 'efectivo', texto: 'Efectivo' },
        { valor: 'tarjeta', texto: 'Tarjeta de crédito' },
        { valor: 'transferencia', texto: 'Transferencia bancaria' },
        { valor: 'cheque', texto: 'Cheque' },
        { valor: 'otro', texto: 'Otro' },
      ],
    }
  }
}
</script>