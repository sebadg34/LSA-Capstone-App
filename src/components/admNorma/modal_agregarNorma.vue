<template>
  <b-modal id="modal-Agregar-Norma" :title="`Agregar Metodologia`" size="lg">
    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Agregar Norma</div>
      </b-row>
      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template> 
      
      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div>
      <b-row>
        <b-col cols="6">
          <b-form-group label="Nombre de la Norma">
            <b-form-input v-model="nombre_norma"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Seleccione una Matriz">
            <b-form-select v-model="matrizSeleccionada" placeholder="Seleccione una Matriz">
              <option v-for="opcion in opcionesMatriz" :key="opcion.id_matriz" :value="opcion.id_matriz">{{ opcion.nombre_matriz }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <b-row>
      <b-col cols="5">
        <b-form-group v-if="opcionesBD.length > -1 || nombreTabla.length > 0" label="Tablas:">
          <div>
            <select class="form-control" name="opciones" size="5" v-model="tablaSeleccionada" @change="tablaSeleccionadaCambiada">
              <option v-for="opcion in opcionesBD" :key="opcion" :value="opcion">{{ opcion }}</option>
              <option v-if="nombreTabla" :value="nombreTabla">{{ nombreTabla }}</option>
            </select>
          </div>
        </b-form-group>
      </b-col>
      
      <b-col cols="1" class="justify-content-end mt-3 ml-1">
        <b-button @click="mostrarModalAgregarTabla()" variant="primary" class="mt-3 ml-1">
          <b-icon icon="plus-circle-fill"></b-icon>
        </b-button>
      </b-col>

      <b-col cols="5">
        <b-form-group v-if="opcionesParametro.length > 0" label="Parámetros:">
          <div>
            <select class="form-control" name="opciones" size="5" v-model="parametroSeleccionado" :disabled="tablaSeleccionada === ''" @change="parametroSeleccionadoCambiado">
              <option v-for="opcion in opcionesParametro" :key="opcion.id_parametro" :value="opcion.id_parametro">{{ opcion.nombre_parametro }}</option>
            </select>
          </div>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="parametrosSeleccionados.length > -1 && tablaSeleccionada !== ''" class="mt-3">
      <b-col>
        <b-form-group label="Parámetros Seleccionados:">
          <div v-for="(parametro, index) in tablasParametros[tablaSeleccionada]" :key="parametro.id_parametro" class="d-flex align-items-center objetos-item mb-3">
            <b-input readonly :value="parametro.nombre_parametro" class="mr-2"></b-input>
            <b-button variant="danger" @click="eliminarParametroTabla(index)" class="ml-2">
              <b-icon-trash-fill></b-icon-trash-fill>
            </b-button>
          </div>
        </b-form-group>
      </b-col>
    </b-row>

    <b-modal id="modal-agregar-tabla" ref="tabla" title="Agregar Tabla">
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
          <b-row class="d-flex justify-content-around">
            <div class="pl-3">Nueva tabla</div>
          </b-row>
          <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
          </button>
      </template> 

      <b-form-group label="Nombre de la Tabla">
        <b-form-input v-model="nuevoNombreTabla"></b-form-input>
      </b-form-group>
      <b-button @click="agregarTabla()" variant="primary">Agregar</b-button>  

      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
          Cerrar
        </b-button>
      </template> 
    </b-modal> 

    <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
      Los parámetros ya se encuentran agregados a la tabla.
    </b-alert>

    <div class="d-flex justify-content-center">
      <b-button @click="AgregarNorma()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold; padding-top: 10px;">
        Agregar Norma
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
        nombre_norma: '',
        nombreTabla: [],
        matrizSeleccionada: '',                                   
        opcionesMatriz: [],
        opcionesTabla: [],
        opcionesParametro:[],
        tablaSeleccionada: '',
        parametroSeleccionado: '',             
        parametroDeshabilitado: true,
        alertaDuplicado: false,
        opcionesBD : [],        
        nuevoNombreTabla: '',    
        parametrosSeleccionados: [],        
        tablasParametros: [],
      }

    },

    watch: {
      tablaSeleccionada: function(newTabla) {
        if (newTabla !== '' && this.parametroSeleccionado !== '') {
          this.agregarParametroAArea();
        }
      },
      parametroSeleccionado: function(newParametro) {
        if (this.tablaSeleccionada !== '' && newParametro !== '') {
          this.agregarParametroAArea();
        }
      }  
    },

    mounted() {
      
      this.obtenerMatriz();
      this.obtenerParametros();    
    },

    methods: { 

      mostrarModalAgregarTabla() {
        this.$bvModal.show('modal-agregar-tabla');
      },
      
      tablaSeleccionadaCambiada() {
        console.log('Tabla seleccionada:', this.tablaSeleccionada);
        // Realiza las acciones adicionales que necesites
        this.parametroSeleccionado = '';
      },

      agregarParametroAArea() {
        const parametroData = this.opcionesParametro.find(item => item.id_parametro === this.parametroSeleccionado);

        // Obtener la tabla seleccionada actualmente
        const tablaSeleccionada = this.tablaSeleccionada;

        // Verificar si el parámetro ya existe en la tabla seleccionada
        const existeParametro = this.tablasParametros[tablaSeleccionada]?.some(parametro => parametro.id_parametro === parametroData.id_parametro);

        if (!existeParametro) {
          // Verificar si la tabla ya tiene parámetros seleccionados
          if (this.tablasParametros[tablaSeleccionada]) {
            // Agregar el parámetro a la tabla existente
            this.tablasParametros[tablaSeleccionada].push(parametroData);
          } else {
            // Crear un nuevo arreglo de parámetros para la tabla
            this.tablasParametros[tablaSeleccionada] = [parametroData];
          }

          console.log('Parámetros por tabla:', this.tablasParametros);
        } else {
          this.alertaDuplicado = true; // Mostrar la alerta de duplicado
        }
      },

      eliminarParametroTabla(index) {
        const tablaSeleccionada = this.tablaSeleccionada;
        if (tablaSeleccionada && this.tablasParametros[tablaSeleccionada]) {
          this.tablasParametros[tablaSeleccionada].splice(index, 1);
          this.tablasParametros = { ...this.tablasParametros }; // Actualizar this.tablasParametros
          console.log('Parámetros por tablaELIMINACION:', this.tablasParametros);
        }
      },

      parametroSeleccionadoCambiado() {
        console.log('Parámetro seleccionado:', this.parametroSeleccionado); 
        this.alertaDuplicado = false; 
      },

      agregarTabla() {
        this.opcionesBD.push(this.nuevoNombreTabla); // Agregar el nombre de la tabla a las opciones
        console.log('Tabla seleccionada:', this.tablaSeleccionada);
        this.nuevoNombreTabla = '';
        this.$refs.tabla.hide();
      },

      obtenerMatriz() {
        ElementosService.obtenerMatriz().then((response) => {
          if (response.data != null && response.status === 200) {
            console.log("Obteniendo Matrices: ", response.data);
            // Mapear los datos de las matrices a las opciones del select
            this.opcionesMatriz = response.data.map(matriz => ({
              id_matriz: matriz.id_matriz,
              nombre_matriz: matriz.nombre_matriz
            }));
          }
          console.log("opciones de la matriz: ",this.opcionesMatriz)
        });
      },

      obtenerParametros() {
        this.loading = true;
        ElementosService.obtenerParametros().then((response) => {
          if (response.data != null && response.status === 200) {
            console.log("la respuesta es: ", response.data);
            this.opcionesParametro = response.data.map(parametro => ({
              id_parametro: parametro.id_parametro,
              nombre_parametro: parametro.nombre_parametro
            }));
          }
          console.log("opciones de los parametros: ",this.opcionesParametro)
        });
      }
    },
}
</script>

<style>
  .form-control {
    height: auto;
    min-height: 38px; /* Ajusta este valor según tus necesidades */
  }
</style>