<template>
  <b-modal id="modal-detalle-parametro" :title="`Detalles del Parametro`" size="lg">
    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Detalles del parámetro</div>
      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>

    <div>
      
      <p v-if="this.Nombre == null">No existen detalles del parámetro</p>
      <ul v-else>          
      </ul>
      <b-row>
        <b-col class="col-12">
          <div>
         <span style="font-weight:bold; padding-right:20px"> Nombre: </span>   <span>{{nombreParametro}}</span>
          </div>
          <hr/>
          <div>
            <div v-if="loading" class="text-center lsa-orange-text my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
            <b-row v-if="!loading">
              
              <b-col class="col-4 d-flex justify-content-between align-items-center">
                <div class="pb-2" style="font-weight:bold; "> Metodología(s) asignada(s):</div> 
              </b-col>
              <b-col class="col-8">
                <b-list-group   style="width:80%">
              <b-list-group-item class="d-flex justify-content-between align-items-center p-2" v-for="metodologia in listaMetodologias" :key="metodologia.id_metodologia">
                {{ metodologia.nombre_metodologia }}
                <b-popover placement="topleft" :target="'button-' +metodologia.id_metodologia" title="Descripción metodología" triggers="focus">
                                        {{ metodologia.detalle_metodologia }}
                                    </b-popover>
                                    <b-button class="boton-ojo-metodo" :id="'button-'+metodologia.id_metodologia">
                                        <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                                    </b-button>

              </b-list-group-item>
            </b-list-group>
</b-col>
            </b-row>
        
           
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
        nombreParametro: '',
        id: '',
        id_parametro: '' ,
        loading: false,     
      }
    },  

    methods: {
      obtenerDetallesParametro() {
        this.loading = true;
        const data = {
          id_parametro: this.id
        };

        ElementosService.obtenerDetallesParametro(data).then((response) => {
          if (response.status === 200) {
            console.log("Obteniendo detalles parametro:", response.data); 
            const { id_parametro, nombre_parametro, metodologias} = response.data
            this.nombreParametro = nombre_parametro;
            this.listaMetodologias = metodologias;
            this.id_parametro = id_parametro;  
            this.loading = false;                   
          }
        });
      }
    }, 

    watch: {
      detallesData: {
        handler() {
          console.log("detallesData actualizada", this.detallesData)                  
          this.Nombre = this.detallesData.nombre_parametro;
          this.id = this.detallesData.id_parametro;
          this.obtenerDetallesParametro()                               
        }
      }
    }
  }
</script>