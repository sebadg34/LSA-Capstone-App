<template>
    <b-modal id="modal-Agregar-Parametro" ref="modal" :title="`Agregar Parametro`" size="lg">
        

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Parámetro</div>
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
        <b-input readonly :value="metodologia.nombre_metodologia"></b-input>
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
  <b-button @click="AgregarParametro()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
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

    data(){

        return {
            Nombre: '',                                   
            opcionesMetodologia: [],
            metodologiaAsignada: '',
            metodologiaSeleccionada: [],  
            alertaDuplicado: false,  
            metodologiasData: [],          
            metodologias: [{nombre_metodologia: '', id_metodologia: ''}]    

        }

    },

    mounted() {

      this.obtenerMetodologias();    
   
  }, 

    methods: { 

      obtenerIdMetodologia(nombreMetodologia) {
    const metodologia = this.metodologiasData.find(item => item.nombre_metodologia === nombreMetodologia);
    return metodologia ? metodologia.id_metodologia : null;
  },
      
      obtenerMetodologias() {
        ElementosService.obtenerMetodologias().then((response) => {
          if (response.data != null && response.status === 200) {
          this.metodologiasData = response.data;
          this.opcionesMetodologia = response.data.map(item => item.nombre_metodologia);
      console.log("Obteniendo Metodologias: ", response.data);
    }
  });
},    

agregarMetodologiaSeleccionada() {
  if (this.metodologiaAsignada) {
    const existeMetodologia = this.metodologiaSeleccionada.some(metodologia => metodologia.nombre_metodologia === this.metodologiaAsignada);
    if (existeMetodologia) {
      this.alertaDuplicado = true;
    } else {
      const idMetodologia = this.obtenerIdMetodologia(this.metodologiaAsignada);
      this.metodologiaSeleccionada.push({ nombre_metodologia: this.metodologiaAsignada, id_metodologia: idMetodologia });
      this.metodologias = this.metodologiaSeleccionada;
      this.metodologiaAsignada = '';
      this.alertaDuplicado = false;
    }
  }
},      

      eliminarMetodologiaSeleccionada(index) {
        this.metodologiaSeleccionada.splice(index, 1);
        // this.rutEmpleadosSeleccionados.splice(index, 1);
      },

    AgregarParametro(){

      

      var data = {

      nombre_parametro: this.Nombre,        
      metodologias: this.metodologias

    }
    console.log("data a enviar", data)
    ElementosService.agregarParametro(data).then((response)=>{
    console.log(response)
    if(response != null){
      if (response.status == 200) {
        this.$bvToast.toast(`La creación del parámetro ha sido exitosa!`, {
        title: 'Exito',
        toaster: 'b-toaster-top-center',
        solid: true,
        variant: "success",
        appendToast: true
      })  

      this.$emit('parametroAgregado');
      
      this.Nombre = '',     
      this.metodologiaAsignada = '',
     
      this.$refs.modal.hide()
    }
    } else {
    this.$bvToast.toast(`Error al agregar el parámetro.!`, {
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