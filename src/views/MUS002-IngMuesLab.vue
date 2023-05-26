<template>
  <validation-observer ref="form"> 
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
             
              <b-form-group id="solicitante-group" class="my-form-group" label="Cliente: " label-for="solicitante-input">
                <b-form-input id="solicitante-input" v-model="solicitante"></b-form-input>
              </b-form-group>

              <b-form-group id="direccion-group" class="my-form-group" label="Dirección Cliente: " label-for="direccion-input">
                <b-form-input id="direccion-input" v-model="direccion"></b-form-input>
              </b-form-group>

              <b-form-group id="TipoPago-group" class="my-form-group" label="Medio de pago: " label-for="TipoPago-input">
                <b-form-select v-model="pago" :options="opciones" value-field="valor" text-field="texto"></b-form-select>
              </b-form-group>              

              <b-form-group id="FechaR-group" class="my-form-group" label="Fecha Recepción: " label-for="Fecha-input">
                    <b-form-input id="Fecha-input" v-model="fechaRecepcion" readonly></b-form-input>
                </b-form-group>

                <b-form-group id="HrsR-group" class="my-form-group" label="Hora Recepción: " label-for="Hrs-input">
                <b-form-input id="Hrs-input" v-model="HrsRecepcion" readonly></b-form-input>
              </b-form-group>

            </div>

            <!-- Grupo de elementos de la muestra -->
            <div class="col-md-4">
                <h1>Datos Muestra</h1>

                <b-form-group id="Fecha-group" class="my-form-group" label="Fecha Muestreo: " label-for="Fecha-input">
                    <b-form-input id="Fecha-input" v-model="fecha"></b-form-input>
                </b-form-group>

                <b-form-group id="Hrs-group" class="my-form-group" label="Hora Muestreo: " label-for="Hrs-input">
                <b-form-input id="Hrs-input" v-model="Hrs"></b-form-input>
              </b-form-group>

              <b-button @click="generarFechaHoraActual()">Generar Fecha & Hora de Muestreo</b-button>             
              
              <b-form-group id="cotizacion-group" class="my-form-group" label="Cotización: " label-for="cotización-input">
                <b-form-input id="cotización-input" v-model="cotizacion"></b-form-input>
              </b-form-group>

              <b-form-group id="muestreado-group" class="my-form-group" label="Muestreado por: " label-for="muestreado-input">
               <b-form-input v-model="muestreado" readonly> </b-form-input>
              </b-form-group>

              <b-form-group id="Matriz-group" class="my-form-group" label="Matriz: " label-for="Matriz-input">
                <b-form-input id="Matriz-input" v-model="matriz"></b-form-input>
              </b-form-group>

              <b-modal v-model="showModal" title="Parametro">
                 <b-form>
               <b-form-group id="Parametro-group" class="my-form-group" label="Parametro(s): " label-for="Parametro-input">
               <b-form-input id="Parametro-input" v-model="Parametro" ></b-form-input>
                </b-form-group>
               <b-form-group id="Norma-group" class="my-form-group" label="Norma: " label-for="Norma-input">
                 <b-form-input id="Norma-input" v-model="Norma" ></b-form-input>
               </b-form-group>
               <b-form-group id="Tabla-group" class="my-form-group" label="Tabla: " label-for="Tabla-input">
              <b-form-input id="Tabla-input" v-model="Tabla" ></b-form-input>
              </b-form-group>
               </b-form>
                </b-modal>
                
              <b-button variant="primary" @click="showModal = true">Visualizar Parametro(s)</b-button>
              <b-button variant="primary" @click="showAna = true">Asignar Analista(s)</b-button>

               <b-modal v-model="showAna" title="Analista">

                 <b-form>
               <b-form-group id="Analista-group" class="my-form-group" label="Analista: " label-for="Analista-input">
               <b-form-input id="Analista-input" v-model="Analista" ></b-form-input>
                </b-form-group>
              
               </b-form>
                </b-modal>             
              <b-form-group id="NMuestras-group" class="my-form-group" label="N°Muestras: " label-for="NMuestras-input">
                <b-form-input id="NMuestras-input" v-model="NMuestras" disabled></b-form-input>
              </b-form-group>

              <b-form-group id="Prioridad-group" class="my-form-group" label="Prioridad: " label-for="Prioridad-input">
                <b-form-select id="Prioridad-input" v-model="prioridad" :options="opcionesPrioridad"></b-form-select>
              </b-form-group>
              

              <b-form-group id="fechaE-group" label="Fecha de entrega:" class="my-form-group" label-for="fechaE-input">
                <b-form-datepicker id="fechaE-input" v-model="fechaEntrega"> </b-form-datepicker>               
              </b-form-group>
              
            </div>            

            <!-- Datos transportista/Empresa -->

            <div class="col-md-4">
                <h1>Datos Trans/Empresa</h1>     
                
                <b-form-group id="TransportistaRUT-group" class="my-form-group" label="RUT Transportista: " label-for="transportistaRUT-input">
                <b-form-input id="transportistaRUT-input" v-model="transportistaRut" disabled></b-form-input>
              </b-form-group>   
              
              <b-form-group id="Transportista-group" class="my-form-group" label="Nombre Transportista: " label-for="transportista-input">
                <b-form-input id="transportista-input" v-model="transportista" required></b-form-input>
              </b-form-group>             
              
              <b-form-group id="Temp-group" class="my-form-group" label="T° de muestra(s): " label-for="Temp-input">
                <b-form-input id="Temp-input" v-model="Temperatura" pattern="-?\d+(\.\d+)?" disabled title="Por favor ingrese un número válido" type="number"></b-form-input>
              </b-form-group> 
              
              <b-form-group id="FONO-group" class="my-form-group" label="Fono transportista: " label-for="FONO-input">
                <b-form-input id="FONO-input" v-model="fono" required></b-form-input>
              </b-form-group>

              <b-form-group id="Patente-group" class="my-form-group" label="Patente: " label-for="Patente-input">
                <b-form-input id="Patente-input" v-model="patente" required></b-form-input>
              </b-form-group>    
              
              <b-button @click="enviarFormulario()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold;">
            Ingresar muestra a laboratorio
          </b-button>
          </div>         

        </div>

        </b-form>            
          </div>       
          </div>
  </validation-observer>     
  </template>


<script>



import MuestraService from '@/helpers/api-services/Muestra.Service';


export default {
  data() {
    return {
      RUM: '',
      recepcionista: '',
      empresa: '',
      direccion: '',
      solicitante: '',
      fecha: '',
      Hrs:'',
      cotizacion:'',
      muestreado:'',
      opcionesMuestreado: [
      { value: 'UCN', text: 'UCN-LSA' },
      { value: 'Cliente', text: 'Cliente' }],
      NMuestras:'',
      matriz:'',
      prioridad:'',
      fechaEntrega:'',
      transportistaRut:'',      
      pago:'',
      Temperatura:'',
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
      opcionesPrioridad: [
            { value: 'Normal', text: 'Normal'},
            { value: 'Alta', text: 'Alta'}, 
            { value: 'Urgente', text: 'Urgente'}],
      Parametro: '',
      Norma: '',
      Tabla: '',
      datos: {},
      fechaRecepcion: '',
      HrsRecepcion: '',
      showModal: false,
      showAna: false,
      estado: '',
      Analista: '',
    }
  },

  mounted(){

    MuestraService.obtenerTelefono(this.RUM).then((response) => {    
    console.log(response.data); 
    if (response != null) {
      this.fono = response.data[0].telefono_transportista;
    }
  });

  MuestraService.obtenerNombreEmpleados(this.RUM).then((response) => {    
    console.log(response.data); 
    if (response != null) {
      const values = Object.values(response.data);
    this.recepcionista = values[0];
    }
  });

  },

  methods: {
generarFechaHoraActual() {
  const now = new Date();
  const dia = now.getDate().toString().padStart(2, '0');
  const mes = (now.getMonth() + 1).toString().padStart(2, '0');
  const anio = now.getFullYear().toString();
  this.fecha = `${dia}/${mes}/${anio}`;
  this.Hrs = now.toLocaleTimeString();
},



RellenarForm(response) {

    this.direccion = response.direccion_empresa
    this.transportistaRut = response.rut_transportista
    this.solicitante = response.nombre_solicitante
    this.empresa = response.nombre_solicitante
    this.fechaEntrega = response.fecha_entrega
    this.fechaRecepcion = response.fecha_ingreso
    this.HrsRecepcion = response.hora_ingreso
    this.matriz = response.matriz
    this.muestreado = response.muestreado_por
    this.Temperatura = response.temperatura_transporte
    this.patente = response.patente_vehiculo
    this.fono = response.fono
    this.transportista = response.nombre_transportista
    this.prioridad = response.prioridad
    this.NMuestras = response.cantidad_muestras



  },

  enviarFormulario(){

    var data = {
      //DATOS GENERALES
                      RUM: this.RUM,
                      //recepcionista: this.recepcionista,
                      nombre_empresa: this.solicitante, //OJITO CON ESTE
                      direccion_empresa: this.direccion,
                      nombre_solicitante: this.solicitante,
                      tipo_pago: this.pago,
                      fecha_ingreso: this.fechaRecepcion,
                      hora_ingreso: this.HrsRecepcion,
      //DATOS MUESTRA
                      fecha_muestreo: this.fecha,
                      hora_muestreo: this.Hrs,
                      //TODO: cotizacion: this.cotizacion
                      muestreado_por: this.muestreado,
                      matriz: this.matriz,
                      //cantidad_muestras: this.nMuestras,
                      prioridad: this.prioridad,                       
                      fecha_entrega: this.fechaEntrega,
      //DATOS TRANSPORTE
                      rut_transportista: this.transportistaRut,
                      nombre_transportista: this.transportista,
                      temperatura_transporte: this.Temperatura,                     
                      patente_vehiculo: this.patente,                           
                      //telefono_transportista: this.fono,       
                      estado: 'En Análisis',                       
                    }

                    console.log("DATOS A ENVIAR:", data)
                    console.log("RUM A ENVIAR:" + this.RUM)

                    MuestraService.actualizarMuestra(data).then((response) => {
                      console.log("data enviada", response.data)  
                      console.log(response)
                        
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Muestra actualizada correctamente`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })                                
                            }                            
                            
                        } else {
                            this.$bvToast.toast(`Error al actualizar muestra`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                        }

                    })


  },

},
  created(){
    this.RUM = this.$route.query.RUM;
    MuestraService.obtenerDatosMuestra(this.RUM).then((response)=>{
      console.log(response)
      this.datos = response.data;
      this.RellenarForm(response.data);



    }).catch(error => {
        console.error(error);
      });
    

  }



}
</script>