<template>
    <b-modal id="modal-detalle-parametro" :title="`Detalles del Parametro`" size="lg"  >

      <template #modal-header="{ close }">
           <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Detalles del parámetro</div>
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
      </template>

      <div class="p-3">
        <p v-if="this.Nombre == null">No existen detalles del parámetro!!</p>
        <ul v-else>          
        </ul>
        <b-row class="pb-2">
            <b-col class="col-6">
                <div>
                  Nombre Parametro: <span>{{this.Nombre}}</span>
                </div>

               <!--   <div>
                    Descripción: <span>{{this.Descripcion}}</span>
                </div> -->

                <div>
              Metodologia(s) Asignada(s):
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
        metodologias: [], 
        listaEmpleados: '' 
        
        

        
      }
    },  

    methods: {
    obtenerDetallesMetodologia() {
      const data = {
        nombre_metodologia: this.Nombre
      };

      ElementosService.obtenerDetallesMetodologia(data).then((response) => {
        if (response.status === 200) {
          console.log("Obteniendo detalles:", response.data);            
          const { nombre_metodologia, detalle_metodologia, empleados } = response.data;          
          const detalleMetodologia = detalle_metodologia; 
          this.nombreMetodologia = nombre_metodologia;
          this.listaEmpleados = empleados;
          this.detalleMetodologia = detalleMetodologia;            
        }
      });
    }
}, 


    watch: {
      detallesData: {
              handler() {
                  console.log("detallesData actualizada", this.detallesData)
                  
                  this.Nombre = this.detallesData.nombre_parametro; 
                  
                  
                                
              }
          }
    }
  }
  </script>