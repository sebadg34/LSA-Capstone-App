<template>
    <b-modal id="modal-detalle-metodologia" :title="`Detalles de la Metodologia`" size="lg"  >

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Detalles de la metodologia</div>
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
            <b-col class="col-6">
              <div>  
                Nombre Metodología: <span>{{ nombreMetodologia }}</span>
              </div>

              <div>
                Descripción: <span>{{detalleMetodologia}}</span>
              </div>

              <div>
                Analista(s) Designado(s):
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
        detalleMetodologia: ''

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
                  this.Nombre = this.detallesData.nombre_metodologia;                   
                  this.obtenerDetallesMetodologia()                                                  
              }
          }
    }
  }
  </script>