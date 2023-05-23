<template>
    <b-modal id="modal-detalle-muestra" :title="`Detalles de la muestra ${RUM}`" size="lg" @hidden="onHidden">

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Detalles de la muestra</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>
      <div class="p-3">
        <p v-if="this.RUM == null">No existen detalles de la muestra o la muestra no existe!!</p>
        <ul v-else>          
        </ul>
        <b-row class="pb-2">
            <b-col class="col-6">
                <div>
                    RUM: <span>{{this.RUM}}</span>
                </div>
                <div>
                    N° de muestras: <span>{{this.nMuestras}}</span>
                </div>
                <div>
                    Muestreado por: <span>{{this.muestreado}}</span>
                </div>
                <div>
                    Fecha de Ingreso: <span>{{this.fecha}}</span>
                </div>
                <div>
                    Hora de Ingreso: <span>{{this.hora}}</span>
                </div>
                <div>
                    Fecha de Entrega: <span>{{this.fechaEntrega}}</span>
                </div>
                <div>
                    Matriz: <span>{{this.TipoMatriz}}</span>
                </div>
            </b-col>
            <b-col class="col-6">                
                <div>
                    Prioridad: <span>{{this.prioridad}}</span>
                </div>
                <div>
                    Norma: <span>{{}}</span>
                </div>
                <div>
                    Parametro(s): <span>{{}}</span>
                </div>
                <div>
                    Metodología: <span>{{}}</span>
                </div>
                <div>
                    Analista Químico: <span>{{}}</span>
                </div>
                <div>
                    Tipo de pago: <span>{{}}</span>
                </div>
                <div>
                    Valor Neto(UF): <span>{{}}</span>
                </div>
            </b-col>
        </b-row>
      </div>

      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
          Cerrar
        </b-button>
      </template>
    </b-modal>
  </template>
  
  <script>
 
  
  export default {
    props: {
      detallesData: Object
    },
    data() {
      return {
        
        RUM: '',
        fecha: '',
        nMuestras: '',
        muestreado: '',
        hora: '',
        fechaEntrega: '',
        prioridad: '',
        TipoMatriz: '',

        
        loading: false,
        showObservaciones: false,
        
      }
    },  
    methods: {      
      onHidden() {        
        this.$emit('modal-cerrado');
      }
    },
    watch: {
      detallesData: {
              handler() {
                  console.log("detallesData actualizada")
                  
                  this.RUM = this.detallesData.RUM;
                  this.fecha = this.detallesData.fecha_ingreso
                  this.hora = this.detallesData.hora_ingreso
                  this.nMuestras = this.detallesData.cantidad_muestras
                  this.muestreado = this.detallesData.muestreado_por
                  this.prioridad = this.detallesData.prioridad
                  this.fechaEntrega = this.detallesData.fecha_entrega
                  this.TipoMatriz = this.detallesData.matriz

                  


                  
              }
          }
    }
  }
  </script>