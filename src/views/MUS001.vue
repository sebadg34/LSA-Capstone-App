<template> 
<validation-observer ref="form">  
   <div>
    

      <!--Empieza el Formulario de recepción-->
        <div class="formulario">
          <b-form name="formulario">
          <div class="row">            
            <!-- Grupo de elementos del recepcionista -->

            <div class="col-md-4">            
              <h1>RECEPCION</h1> 
              <div style="display: flex; justify-content: center; align-items: center; height: 25vh;"> 
              <modal_datosRecepcion @datosIngresados="capturarDatos" />            
            <b-button v-b-modal.modal-recepcion style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                Agregar Datos de recepcion
            <b-icon icon="clipboard"></b-icon>
            </b-button>
          </div> 
            </div>            
            <!-- Grupo de elementos de la muestra -->
            <div class="col-md-4">
              <h1> MUESTRA </h1>
              <div style="display: flex; justify-content: center; align-items: center; height: 25vh;"> 
              <modal_datosMuestra @datosIngresados="capturardatosMuestra" />
              <b-button v-b-modal.modal-recepcionMuestra style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                Agregar Datos de la Muestra
              <b-icon icon="clipboard"></b-icon>
              </b-button>
              </div>              
            </div>                 
              <!-- Grupo de elementos del transportista -->
              <div class="col-md-4">
              <h1> TRANSPORTISTA</h1>
              <div style="display: flex; justify-content: center; align-items: center; height: 25vh;"> 
              <Modal_datosTransportista @datosIngresados="capturardatosTransportista" />
              <b-button v-b-modal.modal-recepcionTransportista style="border-radius: 15px; font-weight: bold; font-size: 18px; " class="lsa-light-blue reactive-button">
                Agregar Datos del Transportista
              <b-icon icon="clipboard"></b-icon>
              </b-button>   
            </div>        
              </div>
          </div>              
          <div style="display: flex; justify-content: center; align-items: center; height: 25vh;">
          <b-button @click="enviarFormulario()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold;">
            Recepcionar Muestra
          </b-button>
          </div>
      </b-form>
    </div>
    </div>
  </validation-observer>
</template>

<script>
import MuestraService from '@/helpers/api-services/Muestra.Service';
import modal_datosRecepcion from '@/components/recepcionMuestra/modal_datosRecepcion.vue';
import modal_datosMuestra from '@/components/recepcionMuestra/modal_datosMuestra.vue';
import Modal_datosTransportista from '@/components/recepcionMuestra/modal_datosTransportista.vue';
export default{ 
  components: {
    modal_datosRecepcion,
    modal_datosMuestra,
    Modal_datosTransportista
},
  data() {
    return {
      recepcionista: '',
      recepcionistaRUT: '',
      solicitante:'',
      rut: '',
      direccion: '',
      muestreado:'',
      opcionesMuestreado: [
      { value: 'UCN', text: 'UCN' },
      { value: 'LSA', text: 'LSA' }],
      prioridad: null,
      opcionesPrioridad: [
      { value: 'Normal', text: 'Normal'},
      { value: 'Alta', text: 'Alta'}, 
      { value: 'Urgente', text: 'Urgente'}],
      TipoMatriz: null,
      opcionesMatriz: [
      { value: 'Agua', text: 'Agua'},
      { value: 'Tierra', text: 'Tierra'}, 
      { value: 'Mineral', text: 'Mineral'}],
      transportista:'',
      Temperatura:'',
      transportistaRut:'',
      fono:'',
      fechaEntrega: '',
      observaciones:'',
      nMuestras: null,
      muestras: [],            
      fecha: "",
      hora: "",
      patente: "",
      estado: null
    };
  }, 
  methods: {    
    generarFechaHoraActual() {
  const now = new Date();
  const dia = now.getDate().toString().padStart(2, '0');
  const mes = (now.getMonth() + 1).toString().padStart(2, '0');
  const anio = now.getFullYear().toString();
  this.fecha = `${dia}/${mes}/${anio}`;
  this.hora = now.toLocaleTimeString();
},
capturarDatos(datos) {
      // Aquí recibes los datos del componente hijo 
      this.recepcionistaRUT = datos.recepcionistaRUT;
      this.recepcionista = datos.recepcionista;
      this.rut = datos.rut;
      this.solicitante = datos.solicitante;
      this.direccion = datos.direccion;
    },
capturardatosMuestra(dato){
      this.nMuestras = dato.nMuestras;
      this.fecha = dato.fecha;
      this.hora = dato.hora;
      this.muestreado = dato.muestreado;
      this.prioridad = dato.prioridad;
      this.TipoMatriz= dato.TipoMatriz;
      this.observaciones = dato.observaciones;
},
capturardatosTransportista(dat){
  this.transportista = dat.transportista;
  this.transportistaRut = dat.transportistaRut;
  this.fono = dat.fono;
  this.patente = dat.patente;
  this.Temperatura = dat.Temperatura;
  this.fechaEntrega = dat.fechaEntrega;
},    
    enviarFormulario() {
            
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else { 

                    this.generarFechaHoraActual();
                    var data = {
                      recepcionista: this.recepcionista,
                      nombre_empresa: this.solicitante,
                      direccion_empresa: this.direccion,
                      nombre_solicitante: this.solicitante,
                      muestreado_por: this.muestreado,
                      matriz: this.TipoMatriz,
                      cantidad_muestras: this.nMuestras,
                      prioridad: this.prioridad,
                      fecha_muestreo: '',
                      hora_muestreo: '',
                      temperatura_transporte: this.Temperatura,
                      fecha_entrega: this.fechaEntrega,
                      nombre_transportista: this.transportista,
                      patente_vehiculo: this.patente,
                      rut_transportista: this.transportistaRut,
                      rut: this.rut,       
                      telefono_transportista: this.fono,       
                      estado: 'Recepcionado',
                      observaciones: this.observaciones,
                      fecha_ingreso: this.fecha,
                      hora_ingreso: this.hora
                    }
                    console.log("data a enviar", data)
                    MuestraService.ingresarMuestra(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Creación de la muestra exitosa`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                
                            }
                            this.$bvModal.hide('modal-personal')
                        } else {
                            this.$bvToast.toast(`Error al agregar muestra`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                        }

                    })

                }

            });

        }
  }
}
</script>