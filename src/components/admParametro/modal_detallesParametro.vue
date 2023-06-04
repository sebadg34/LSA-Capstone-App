<template>
  <b-modal id="modal-detalle-parametro" :title="`Detalles del Parametro`" size="lg">
    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Detalles del Parámetro</div>
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
            Nombre Parametro: <span>{{nombreParametro}}</span>
          </div>
          <div>
            Metodologia(s) Asignada(s):
            <ul>
              <li v-for="metodologia in listaMetodologias" :key="metodologia.id_parametro">
                {{ metodologia.nombre_metodologia }}
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
        metodologias: '', 
        listaMetodologias: '',
        nombreParametro: ''        
      }
    },  

    methods: {
      obtenerDetallesParametro() {
        const data = {
          nombre_parametro: this.Nombre
        };

        ElementosService.obtenerDetallesParametro(data).then((response) => {
          if (response.status === 200) {
            console.log("Obteniendo detalles parametro:", response.data); 
            const { nombre_parametro, metodologias} = response.data
            this.nombreParametro = nombre_parametro;
            this.listaMetodologias = metodologias;                     
          }
        });
      }
    }, 

    watch: {
      detallesData: {
        handler() {
          console.log("detallesData actualizada", this.detallesData)                  
          this.Nombre = this.detallesData.nombre_parametro;
          this.obtenerDetallesParametro()                               
        }
      }
    }
  }
</script>