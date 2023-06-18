<template>
  <validation-observer ref="form">      
      <div>
          <b-card no-body>
              <b-tabs v-model="tabIndex" small card>
                  <b-tab title="Recepcionista">Datos del recepcionista
                      <b-card>
                          <b-row class="pb-2">
                              <b-col class="col-6">
                                <label for="RUM-input">RUM:</label>
                                <b-form-input id="RUM-input" readonly class="mb-1" v-model="RUM"></b-form-input>
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

                                  <ValidationProvider name="fechaI" rules="required" v-slot="validationContext">
                                      <label class="mt-1" for="input-live">Fecha de Ingreso:</label>                                          
                                      <b-form-input class="mb-1" id="input-live" readonly v-model="fechaRecepcion" aria-describedby="input-live-help fechaI-live-feedback" :state="getValidationState(validationContext)" placeholder="Presione el boton para agregar fecha"></b-form-input>
                                      <b-form-invalid-feedback id="fechaI-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>                    
                                  </ValidationProvider>               

                                  <ValidationProvider name="horaI" rules="required" v-slot="validationContext">
                                      <label for="input-live">Hora de Ingreso:</label>
                                      <b-form-input class="mb-1" id="input-live" readonly :state="getValidationState(validationContext)" v-model="HrsRecepcion" aria-describedby="input-live-help horaI-live-feedback" placeholder="Presione el botón para agregar Hra." trim></b-form-input>
                                      <b-form-invalid-feedback id="horaI-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>
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

                                  
                                    <label for="input-live">Tipo de pago:</label>
                                    <b-form-select class="mb-1" id="input-live" v-model="pago" :options="opciones"></b-form-select>
                                    
                                  
                              </b-col>
                          </b-row>
                      </b-card>
                  </b-tab>

                  <b-tab title="Muestra">
                      Datos de la muestra
                      <b-card>
                          <b-row class="pb-2">
                              <b-col class="col-6">                                
                                <ValidationProvider name="Fecha Muestreo" rules="required" v-slot="validationContext">
                                      <label class="mt-1" for="input-live">Fecha de Muestreo:</label>                                          
                                      <b-form-input class="mb-1" id="input-live" readonly v-model="fecha" aria-describedby="input-live-help Fecha Muestreo-live-feedback" :state="getValidationState(validationContext)" placeholder="Presione el boton para agregar la fecha de muestreo"></b-form-input>
                                      <b-form-invalid-feedback id="Fecha Muestreo-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>                    
                                  </ValidationProvider>               

                                  <ValidationProvider name="Hora Muestreo" rules="required" v-slot="validationContext">
                                      <label for="input-live">Hora de Muestreo:</label>
                                      <b-form-input class="mb-1" id="input-live" readonly :state="getValidationState(validationContext)" v-model="Hrs" aria-describedby="input-live-help Hora Muestreo-live-feedback" placeholder="Presione el botón para agregar la Hra. de muestreo" trim></b-form-input>
                                      <b-form-invalid-feedback id="Hora Muestreo-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>
                                  </ValidationProvider> 

                                  <div>
                                    <b-button @click="generarFechaHoraActual()">Generar Fecha & Hora de Muestreo</b-button>  
                                  </div>

                                  <ValidationProvider name="Cotizacion" rules="required" v-slot="validationContext">
                                      <label for="input-live">Cotización:</label>
                                      <b-form-input class="mb-1" id="input-live" readonly :state="getValidationState(validationContext)" v-model="cotizacion" aria-describedby="input-live-help Cotizacion-live-feedback"></b-form-input>
                                      <b-form-invalid-feedback id="Cotizacion-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>
                                  </ValidationProvider>                                   

                                  <ValidationProvider name="nMuestras" rules="required|numeric" v-slot="validationContext">
                                      <label for="input-live">N° de Muestras:</label>
                                      <div class="d-flex align-items-center">    
                                          <b-form-input id="nMuestras-input" v-model="NMuestras" :state="getValidationState(validationContext)" aria-describedby="nMuestras-live-feedback"></b-form-input>
                                          <b-button @click="agregar()" variant="secondary" size="md">
                                              <b-icon class="mt-1" icon="plus-circle-fill"></b-icon>                                                
                                          </b-button>
                                      </div>
                                      <b-form-invalid-feedback id="nMuestras-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                  </ValidationProvider>                                                                    
                              </b-col>
          
                              <b-col class="col-6">
                                  <ValidationProvider name="muestreado" rules="required" v-slot="validationContext">
                                      <label for="input-live">Muestreado por:</label>
                                      <b-form-select class="mt-1" id="input-live" v-model="muestreado" :options="opcionesMuestreado" aria-describedby="input-live-help muestreado-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                      <b-form-invalid-feedback id="muestreado-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>
                                  </ValidationProvider>

                                  <ValidationProvider name="prioridad" rules="required" v-slot="validationContext">
                                      <label class="mt-1" for="input-live">Prioridad:</label>                    
                                      <b-form-select id="input-live" v-model="prioridad" :options="opcionesPrioridad" aria-describedby="input-live-help prioridad-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                      <b-form-invalid-feedback id="prioridad-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>
                                  </ValidationProvider>
                              
                                  <ValidationProvider name="TipoMatriz" rules="required" v-slot="validationContext">
                                      <label class="mt-1" for="input-live">Tipo de Matriz:</label>
                                      <b-form-select id="input-live" v-model="matriz" :options="opcionesMatriz" aria-describedby="input-live-help TipoMatriz-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                      <b-form-invalid-feedback id="TipoMatriz-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>
                                  </ValidationProvider>
                              
                                  <ValidationProvider name="observaciones" rules="required" v-slot="validationContext">
                                      <label class="mt-3" for="input-live">Observaciones:</label>
                                      <b-form-textarea id="input-live" v-model="observaciones" aria-describedby="input-live-help observaciones-live-feedback" :state="getValidationState(validationContext)"></b-form-textarea>
                                      <b-form-invalid-feedback id="observaciones-live-feedback">{{
                                          validationContext.errors[0] }}
                                      </b-form-invalid-feedback>
                                  </ValidationProvider>                
                              </b-col>
                          </b-row>
                      </b-card>
                  </b-tab>
      
                  <b-tab title="Transportista">Datos del Transportista
                      <b-card>
                          <b-row class="pb-2">
                              <b-col class="col-6">              
                                  <label for="input-live">Rut:</label>                                    
                                      <b-form-input id="transportistaRut-input" class="mb-1" v-model="transportistaRut" aria-describedby="transportistaRut-live-feedback"></b-form-input>                              
                                  <label for="input-live">Telefono Movil:</label>                                    
                                      <b-input-group class="mb-1">
                                          <b-input-group-prepend is-text>+56 9</b-input-group-prepend>                                        
                                          <b-form-input id="input-live" v-model="fono" aria-describedby="input-live-help fono-live-feedback"  placeholder=""></b-form-input>                                            
                                      </b-input-group>                                   
                                      <label for="input-live">Temperatura de la muestra:</label>
                                      <b-form-input class="mb-1" id="input-live" v-model="Temperatura" aria-describedby="input-live-help Temperatura-live-feedback" placeholder="" trim></b-form-input>                                                          
                              </b-col>

                              <b-col class="col-6">                                    
                                  <label for="input-live">Nombre y apellido:</label>
                                  <b-form-input class="mb-1" id="input-live" v-model="transportista" aria-describedby="input-live-help transportista-live-feedback" placeholder="" trim></b-form-input>                                                                
                              
                                  <label for="input-live">Patente:</label>
                                  <b-form-input class="mb-1" id="input-live" v-model="patente" aria-describedby="input-live-help patente-live-feedback" placeholder="" trim></b-form-input>
                                  
                                  <b-form-group id="fechaE-group" label="Fecha de entrega:" class="my-form-group" label-for="fechaE-input">
                                      <b-form-datepicker id="fechaE-input" v-model="fechaEntrega"></b-form-datepicker>
                                  </b-form-group>
                              </b-col>
                          </b-row>
                      </b-card>
                  </b-tab>

                  <b-tab title="Parámetros">Parámetros
                      <b-card>
                          <b-row>
                              <b-col class="col-6">
                                  <b-form-group label="Seleccione una norma">
                                      <b-form-select v-model="norma" :options="opcionesNorma" placeholder="Seleccione una Norma"></b-form-select>
                                  </b-form-group>
                              </b-col>

                              <b-col class="col-6">
                                  <b-form-group label="Seleccione una tabla">
                                      <b-form-select v-model="tabla" :options="opcionesTabla" placeholder="Seleccione una Norma"></b-form-select>
                                  </b-form-group>
                              </b-col>
                          </b-row>
                          <b-row>
                              <b-col class="col-6">
                                  <b-form-group label="Seleccione un parámetro">
                                      <b-form-select v-model="ParametroSeleccionado" :options="opcionesParametro" placeholder="Seleccione un Parámetro" @change="agregarParametroSeleccionado"></b-form-select>
                                  </b-form-group>
                              </b-col>
                          </b-row>
                          
                          <b-row v-if="ParametrosSeleccionados.length > 0" class="mt-3">
                              <b-col>
                                <b-form-group label="Parametros seleccionados">
                                  <div v-for="(parametro, index) in ParametrosSeleccionados" :key="index" class="d-flex align-items-center analista-item">
                                    <b-input readonly :value="parametro.nombre"></b-input>
                                    <b-button variant="danger" @click="eliminarParametroSeleccionado(index)" class="ml-2">
                                      <b-icon-trash-fill></b-icon-trash-fill>
                                    </b-button>
                                  </div>
                                </b-form-group>
                              </b-col>
                          </b-row>
                          <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
                              El parámetro ya fue agregado.
                          </b-alert>                            
                      </b-card>
                  </b-tab>
                  <b-tab title="Asignar parámetros a muestras">Asignar parámetros a muestras
                      <b-card>
                          <b-button class="primary">ENVIAR</b-button>                            
                      </b-card>
                  </b-tab>
              </b-tabs>
          </b-card>
          <!-- Control buttons-->
          <div class="text-center">
            <b-button-group class="mt-2">
              <b-button @click="tabIndex--">Atrás</b-button>
              <b-button @click="tabIndex++">Siguiente</b-button>
            </b-button-group>          
            <div class="text-muted">Current Tab: {{ tabIndex }}</div>
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
      recepcionistaRUT: '',
      empleados: [],
      tabIndex: 0,
      opcionesNorma: [],
      norma: '',
      opcionesTabla: [],
      tabla: '',
      opcionesParametro: [],
      ParametroSeleccionado:'',
      ParametrosSeleccionados: [],
      alertaDuplicado: false, 
      opcionesRecepcionistas: [],
      opcionesClientes: [],
      opcionesMatriz: [],
      rut: ''

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
    console.log("Los datos obtenidos de la muestra son:", response.data); 
    if (response != null) {
      this.empleados = response.data;
      console.log("el empleado son: ", this.empleados)

      const valorBuscado = this.recepcionistaRUT;
      console.log("El valor buscado es:", valorBuscado) 
      
      let nombreEncontrado = null;
      for (const empleadoId in this.empleados) {
        if (empleadoId === valorBuscado) {
          nombreEncontrado = this.empleados[empleadoId];
          break; // Se encontró el nombre, se sale del bucle
        }
      }

if (nombreEncontrado !== null) {
  console.log("El nombre correspondiente al identificador", valorBuscado, "es:", nombreEncontrado);
  this.recepcionista = nombreEncontrado
} else {
  console.log("No se encontró un empleado con el identificador", valorBuscado);
}


    }
  });

  },

  methods: {
    getValidationState({
      dirty,
      validated,
      valid = null
    })
    {
    return dirty || validated ? valid : null;
    },
generarFechaHoraActual() {
  const now = new Date();
  const dia = now.getDate().toString().padStart(2, '0');
  const mes = (now.getMonth() + 1).toString().padStart(2, '0');
  const anio = now.getFullYear().toString();
  this.fecha = `${dia}/${mes}/${anio}`;
  this.Hrs = now.toLocaleTimeString();
},

agregarParametroSeleccionado() {
                if (this.ParametroSeleccionado) {
                    const parametroExistente = this.ParametrosSeleccionados.find(
                    (parametro) => parametro.nombre === this.AnalistaAsignado
                    );
                    if (parametroExistente) {
                        this.alertaDuplicado = true;
                    } else {
                        const ParametroSeleccionado = this.analistas.find((analista) => analista.nombre === this.AnalistaAsignado);
                        const metodologia = ParametroSeleccionado.nombre_metodologia;
                        this.ParametrosSeleccionados.push({nombre: this.ParametroSeleccionado});
                        console.log("esta es la metodologia: ", metodologia)
                        this.ParametroSeleccionado = '';
                        this.alertaDuplicado = false;
                    }
                }
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
    this.recepcionistaRUT = response.rut_empleado
    
  },

  enviarFormulario(){

    var data = {
      //DATOS GENERALES
                      RUM: this.RUM,
                      recepcionista: this.recepcionista,
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

      const rutEmpleado = response.data.rut_empleado;
      MuestraService.obtenerNombreEmpleados(rutEmpleado)



    }).catch(error => {
        console.error(error);
      });
    

  }



}
</script>