<template>
  <b-modal id="modal-detalle-metodologia" :title="`Detalles de la Metodologia`" size="lg"  >

    <template #modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <b-row class="d-flex justify-content-around">
              <div class="pl-3">Detalles de la metodología</div>
          </b-row>

          <button type="button" class="close" aria-label="Close" @click="close()">
              <span aria-hidden="true" style="color:white">&times;</span>
          </button>
    </template>

    <div class="p-3">
      <p v-if="this.Nombre == null">No existen detalles de la metodología o la metodología no existe!!</p>
      <ul v-else>          
      </ul>
      <b-row class="pb-2">
          <b-col class="col-12">
            <div>  
             <span style="font-weight:bold; padding-right:20px">Nombre Metodología: </span>  <span>{{ nombreMetodologia }}</span>
            </div>
<hr/>
            <div>
              <div style="font-weight:bold; padding-right:20px">Descripción:</div>
              
              
              <span>{{detalleMetodologia}}</span>
            </div>
<hr/>
            <div>
              <div style="font-weight:bold; padding-right:20px"> Analista(s) Designado(s):</div>
             
                <ul>
                  <li v-for="empleado in listaEmpleados" :key="empleado.rut_empleado">
                    {{ empleado.nombre }} {{ empleado.apellido }}
                  </li>
                </ul>
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

import ElementosService from '@/helpers/api-services/Elementos.service';
export default {
  props: {
      detallesData: Object
  },
  data() {
    return {
      
      Nombre: '',
      Descripcion: '',        
      nombreE: '',
      empleados: '',        
      nombreMetodologia: '',
      listaEmpleados: '',
      detalleMetodologia: '',
      id: '',
      id_metodologia: ''

    }
  },  

  methods: {
    obtenerDetallesMetodologia() {
      const data = {
        id_metodologia: this.id
      };

      ElementosService.obtenerDetallesMetodologia(data).then((response) => {
        if (response.status === 200) {
          console.log("Obteniendo detalles:", response.data);            
          const { id_metodologia,nombre_metodologia, detalle_metodologia, empleados } = response.data;          
          const detalleMetodologia = detalle_metodologia; 
          this.nombreMetodologia = nombre_metodologia;
          this.listaEmpleados = empleados;
          this.detalleMetodologia = detalleMetodologia;
          this.id_metodologia = id_metodologia

        }
      });
    }
},    

  watch: {
    detallesData: {
            handler() {
                console.log("detallesData actualizada", this.detallesData)                  
                this.Nombre = this.detallesData.nombre_metodologia;
                this.id = this.detallesData.id_metodologia;                   
                this.obtenerDetallesMetodologia()                                                  
            }
    }
  }
}
</script>