<template>
  <b-modal centered id="modal-analistas-designados-supervisor" size="xl" @hidden="onHidden">

    <ModalEditarAnalistas @refrescar="obtenerAnalistasDesignados(RUM)" :analistas-data="analistasData" />

    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Analistas designados a la muestra {{ " RUM: " + RUM }}</div>
      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>




    <b-list-group style="padding:0px">
      <b-list-group-item style="padding:0px; height: 50px;">
        <b-list-group horizontal>
          <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
            RUT
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:20%;font-weight: bold;">
            Nombre
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
            Orden de análisis
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:20%;font-weight: bold;">
            Parámetro
          </b-list-group-item>          
          <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
            Fecha  de entrega
          </b-list-group-item>
          <b-list-group-item class="p-3 text-center " style="width:15%;font-weight: bold;">
            Estado
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
      <b-list-group v-if="analistas.length == 0">
      <b-list-group-item >
                    <div class="text-center lsa-light-blue-text row">
                        <div class="col">
                            <b-icon icon="file-earmark-break" animation="fade" variant="secondary"></b-icon>
                        <div style="font-weight:bold; color:gray">No hay analistas asignados para la muestra.</div>
                        </div>
                    
                    </div>
                </b-list-group-item>
              </b-list-group>
      <b-list-group-item v-for="analista in analistas" :key="analista.rut_empleado" style="padding:0px">
        <b-list-group horizontal>
          <b-list-group-item class="text-center" style="width:15%">
            {{ analista.rut_empleado }}
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:20%">
            {{ analista.nombre + " " + analista.apellido }}
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:15%">
            {{ analista.orden_analisis }}
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:20%">

        <b-list-group>
         

       
                        <b-list-group-item v-if="analista.parametros.length > 0" v-b-toggle="analista.rut_empleado" style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">
                          {{ analista.parametros[0].nombre_parametro }}
                            <b-icon v-if="analista.parametros.length > 1" style="position:absolute; right:0px; top:25%; color: #949494" icon="caret-down-fill"></b-icon>
                        </b-list-group-item>
                        <b-list-group-item v-else style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">{{ analista.parametros[0].nombre_parametro }}

                        </b-list-group-item>

                        <div v-if="analista.parametros.length > 1">
                            <b-collapse :id="analista.rut_empleado">
                                <b-list-group-item style="padding:2px;  border: none; border-bottom: solid 1px #dbdbdb;" v-for="index in analista.parametros.length-1" :key="index">{{ analista.parametros[index].nombre_parametro }}</b-list-group-item>
                            </b-collapse>
                        </div>

                      </b-list-group>


          
          </b-list-group-item>
          <b-list-group-item class="text-center" style="width:15%">
            {{ analista.fecha_entrega_formateada }}
          </b-list-group-item>     
          <b-list-group-item class="text-center" style="width:15%">
            {{ analista.estado }}
          </b-list-group-item>      
        </b-list-group>
      </b-list-group-item>
      
    </b-list-group>





    <template #modal-footer="{ close }">
      <b-col>
        <b-row class="d-flex justify-content-between">
          <b-button @click="abrirEditarAnalistas" class="lsa-orange reactive-button"
            style="font-weight: bold; border: none">
            Modificar analistas

            <b-icon icon="person-lines-fill" class="ml-2"></b-icon>
          </b-button>
          <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button"
            style="font-weight:bold">
            Cerrar
          </b-button>
        </b-row>
      </b-col>

    </template>
  </b-modal>
</template>
  
<script>

import MuestraSupervisorService from '@/helpers/api-services/Muestra-supervisor.service';
import ModalEditarAnalistas from '@/components/admMuestras-supervisor/modal_editarAnalistas-supervisor.vue';
export default {
  components: {
    ModalEditarAnalistas
  },
  props: {
    analistaData: Object
  },
  data() {
    return {

      RUM: '',
      loading: false,
      analistas: [],
      analistasData: {}

    }
  },
  methods: {
    abrirEditarAnalistas() {
      this.analistasData = {
        RUM: this.RUM,
        analistas: this.analistas
      }
      this.$bvModal.show('modal-editar-analistas-supervisor');
    },


    obtenerAnalistasDesignados(rum) {
      MuestraSupervisorService.obtenerAnalistasDesignados(rum).then((response) => {
        if (response != null) {
          if (response.status == 200 && response.data != null) {
            const analistas = response.data;
            for (var i = 0; i < analistas.length; i++) {
              const analistaExistente = this.analistas.find(analista => analista.rut_empleado == analistas[i].rut_empleado);
              if(analistaExistente == null){
                this.analistas.push({
                  RUM: analistas[i].RUM,
                  rut_empleado: analistas[i].rut_empleado,
                  nombre: analistas[i].nombre,
                  apellido: analistas[i].apellido,
                  orden_analisis: analistas[i].orden_de_analisis,
                  parametros: [{
                    id_parametro:analistas[i].id_parametro,
                    nombre_parametro: analistas[i].nombre_parametro
                  }],
                  fecha_entrega: analistas[i].fecha_entrega,
                  fecha_entrega_formateada: analistas[i].fecha_entrega_formateada,
                  estado: analistas[i].estado
                })
              }else{
                analistaExistente.parametros.push({
                  id_parametro:analistas[i].id_parametro,
                    nombre_parametro: analistas[i].nombre_parametro
                })
              }
            }


          } 
        }
      })
    },
    onHidden() {
      this.$emit('modal-cerrado');
    }
  },
  watch: {
    analistaData: {
      handler() {
        this.RUM = this.analistaData.RUM;
        this.analistas = [];
        this.obtenerAnalistasDesignados(this.RUM);
      }
    }
  }
}
</script>
  