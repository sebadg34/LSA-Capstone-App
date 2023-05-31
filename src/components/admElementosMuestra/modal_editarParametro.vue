<template>
  <b-modal id="modal-Editar-Parametro" ref="modal" :title="`Agregar Parametro`" size="lg">
      

    <template #modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <b-row class="d-flex justify-content-around">
              <div class="pl-3">Editar Parámetro</div>
          </b-row>
          <button type="button" class="close" aria-label="Close" @click="close()">
              <span aria-hidden="true" style="color:white">&times;</span>
          </button>
    </template> 
    
    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    
    <b-form-group label="Nombre del Parámetro">
       <b-form-input v-model="Nombre"></b-form-input>
    </b-form-group>

    <b-row>
    <b-col>
      <b-form-group label="Asignar una metodología">
        <b-form-select v-model="metodologiaAsignada" :options="opcionesMetodologia" placeholder="Seleccione un Analista" @change="agregarMetodologiaSeleccionada"></b-form-select>
      </b-form-group>
    </b-col>
  </b-row>

  <b-row v-if="metodologiaSeleccionada.length > 0" class="mt-3">
<b-col>
  <b-form-group label="Metodologías Seleccionadas">
    <div v-for="(metodologia, index) in metodologiaSeleccionada" :key="index" class="d-flex align-items-center analista-item">
      <b-input readonly :value="metodologia"></b-input>
      <b-button variant="danger" @click="eliminarMetodologiaSeleccionada(index)" class="ml-2">
        <b-icon-trash-fill></b-icon-trash-fill>
      </b-button>
    </div>
  </b-form-group>
</b-col>
</b-row>

<b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
La metodología ya fue agregada.
</b-alert>

<div class="d-flex justify-content-center">
<b-button @click="ActualizarParametro()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
  Agregar
</b-button>
</div>

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

    <template #modal-footer="{ close }">
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
        Cerrar
      </b-button>
    </template>      
  </b-modal>
</template>

<script>

import ElementosService from '@/helpers/api-services/Elementos.service';

export default {
  watch: {
        parametroData: {
            handler() {               
                
                this.Nombre = this.parametroData.nombre_metodologia;
                this.Descripción = this.parametroData.detalle_metodologia;
                this.metodologiaSeleccionada = this.parametroData.empleados;                        
         
            }
        }
    },

    props: {
        parametroData: Object
    },

  data(){

      return {
          Nombre: '',                                   
          opcionesMetodologia: [],
          metodologiaAsignada: '',
          metodologiaSeleccionada: [],  
          alertaDuplicado: false,            
          metodologia: []    

      }

  },

  mounted() {

    this.obtenerMetodologias();    
 
}, 

  methods: { 
    
    obtenerMetodologias() {
      console.log("Obteniendo Metodologias: ");
      ElementosService.obtenerMetodologias().then((response) => {
        if (response.data != null && response.status === 200) {
          this.opcionesMetodologia = response.data.map(item => item.nombre_metodologia);
        }
      });
    },    

    agregarMetodologiaSeleccionada() {
      if (this.metodologiaAsignada) {
        const metodologiaExistente = this.metodologiaSeleccionada.find((metodologia) => metodologia === this.metodologiaAsignada);
        if (metodologiaExistente) {
          this.alertaDuplicado = true;
        } else {
          this.metodologiaSeleccionada.push(this.metodologiaAsignada.nombre_metodologia);
          this.metodologia = this.metodologiaSeleccionada;
          this.metodologiaAsignada = '';
          this.alertaDuplicado = false;
        }
      }
    },

    eliminarMetodologiaSeleccionada(index) {
      this.metodologiaSeleccionada.splice(index, 1);
      // this.rutEmpleadosSeleccionados.splice(index, 1);
    },

    ActualizarParametro(){

      var data = {

        nombre_parametro: this.Nombre,        
        nombre_metodología: this.metodologia      

      }
      console.log("data a enviar", data)
      ElementosService.actualizarParametro.then((response)=>{
        console.log(response)
        if(response != null){
          if (response.status == 200) {
            this.$bvToast.toast(`La actualización del parámetro ha sido exitosa!`, {
              title: 'Exito',
              toaster: 'b-toaster-top-center',
              solid: true,
              variant: "success",
              appendToast: true
            })  
    
            this.$emit('parametroAgregado');

            this.Nombre = '',                                   
            this.opcionesMetodologia = [],
            this.metodologiaAsignada = '',
            this.metodologiaSeleccionada = [],            
            this.metodologia = [] 
    
            this.$refs.modal.hide()
          }
        } else {
          this.$bvToast.toast(`Error al actualizar el parámetro.!`, {
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

}
</script>