<template>
    <b-modal id="modal-Editar-Metodologia" ref="modal" :title="`Editar Metodologia`" size="lg">
      <template #modal-header="{ close }">
        <b-row class="d-flex justify-content-around">
          <div class="pl-3">Editar Metodología</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
          <span aria-hidden="true" style="color:white">&times;</span>
        </button>
      </template>
  
      <b-form-group label="Nombre de la Metodología">
        <b-form-input v-model="Nombre"></b-form-input>
      </b-form-group>
  
      <b-form-group label="Descripción">
        <b-form-textarea v-model="Descripción"></b-form-textarea>
      </b-form-group>
     
      <b-row>
        <b-col>
          <b-form-group label="Analista Asignado">
            <b-form-select v-model="AnalistaAsignado" :options="opcionesAnalista" placeholder="Seleccione un Analista" @change="agregarAnalistaSeleccionado"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
  
      <b-row v-if="analistasSeleccionados.length > 0" class="mt-3">
    <b-col>
      <b-form-group label="Analistas Seleccionados">
        <div v-for="(analista, index) in analistasSeleccionados" :key="index" class="d-flex align-items-center analista-item">
          <b-input readonly :value="analista"></b-input>
          <b-button variant="danger" @click="eliminarAnalistaSeleccionado(index)" class="ml-2">
            <b-icon-trash-fill></b-icon-trash-fill>
          </b-button>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
  
  <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
    El analista ya fue agregado.
  </b-alert>
  
  <div class="d-flex justify-content-center">
    <b-button @click="ActualizarMetodologia()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
      Editar Metodología
    </b-button>
  </div>
  
  <template #modal-footer="{ close }">
    <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
      Cerrar
    </b-button>
      </template>
    </b-modal>
  </template>

<script>
import PersonalService from '@/helpers/api-services/Personal.service';
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {

    watch: {
        metodologiaData: {
            handler() {               
                
                this.Nombre = this.metodologiaData.nombre_metodologia;
                this.Descripción = this.metodologiaData.detalle_metodologia;
                this.analistasSeleccionados = this.metodologiaData.empleados;                        
         
            }
        }
    },
    props: {
        metodologiaData: Object
    },

  data() {
    return {
      
      Nombre: '',
      Descripción: '',
      AnalistaAsignado: '',
      opcionesAnalista: [],
      analistas: [],
      analistasSeleccionados: [],
      analistaDuplicado: false,
      alertaDuplicado: false,      
      rutEmpleadosSeleccionados: [],
      
    };
  },

  mounted() {
    PersonalService.obtenerTodosPersonal().then((response) => {
    console.log(response.data);
    if (response.data != null) {
      this.analistas = response.data;
      this.rutEmpleados = this.analistas.map((analista) => analista.rut_empleado);

      this.opcionesAnalista = this.analistas.filter((analista) => {
        return analista.rol === 'Analista Químico' || analista.rol === 'Químico';}).map((analista) => ({
        value: analista.nombre,
        text: analista.nombre,
      }));
    }
  })
  .catch((error) => {
    console.error('Error al obtener los analistas:', error);
  });
  },


  methods: {
  
    agregarAnalistaSeleccionado() {
      if (this.AnalistaAsignado) {
    const analistaExistente = this.analistasSeleccionados.find((analista) => analista === this.AnalistaAsignado);
      if (analistaExistente) {
        this.alertaDuplicado = true;
      } else {                 
          this.analistasSeleccionados.push(this.AnalistaAsignado.nombre);
          this.rutEmpleadosSeleccionados.push(analista.rut_empleado);
          this.AnalistaAsignado = '';
          this.alertaDuplicado = false;
        
    }
  }
},

    eliminarAnalistaSeleccionado(index) {
      this.analistasSeleccionados.splice(index, 1);
      this.rutEmpleadosSeleccionados.splice(index, 1);
    },

    ActualizarMetodologia(){

      var data = {

        nombre_metodologia: this.Nombre,        
        detalle_metodologia: this.Descripción,
        empleados: this.empleados
        

      }
      console.log("data a enviar", data)
      ElementosService.actualizarMetodologia(data).then((response)=>{
        console.log(response)
        if(response != null){
          if (response.status == 200) {
            this.$bvToast.toast(`Se ha editado la metodología exitosamente!`, {
              title: 'Exito',
              toaster: 'b-toaster-top-center',
              solid: true,
              variant: "success",
              appendToast: true
            }) 
            
            this.$emit('metodologiaAgregada');

            this.Nombre = '',
            this.Descripción = '',           
            this.AnalistaAsignado = '',
            this.opcionesAnalista = [],
            this.analistas = [],
            this.analistasSeleccionados = [],
            this.rutEmpleadosSeleccionados = [],
            this.empleados = [],

            this.$refs.modal.hide()
          }
        } else {
          this.$bvToast.toast(`Error al editar la metodología.`, {
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
};
</script>