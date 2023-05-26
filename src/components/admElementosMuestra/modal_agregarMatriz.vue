<template>
    <b-modal id="modal-Agregar-Matriz" :title="`Agregar Matriz`" size="lg">
        

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Matriz</div>
            </b-row>
            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
      </template> 
      
      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      
      <b-form-group label="Nombre de Matriz">
         <b-form-input v-model="Nombre"></b-form-input>
      </b-form-group>

      <b-row>

        <b-col>
        <b-form-group label="Parámetro">
          <b-form-select v-model="parametroSeleccionado">
            <option disabled value="">Seleccione Parámetros</option>
            <!-- Opciones de parámetros -->
            <option v-for="opcion in opcionesParametros" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Metodología">
          <b-form-select v-model="metodologiaSeleccionada">
            <option disabled value="">Seleccione Metodología</option>
            <!-- Opciones de metodología -->
            <option v-for="opcion in opcionesMetodologia" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>
      
    </b-row>

    <b-list-group v-if="parametroSeleccionado" class="mt-3">
      <b-list-group-item>{{ getParametroNombre(parametroSeleccionado) }}</b-list-group-item>
    </b-list-group>


      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
          Cerrar
        </b-button>
      </template>      
    </b-modal>
</template>

<script>

export default {

    data(){

        return {
            Nombre: '',
            metodologiaSeleccionada: '',
            parametroSeleccionado: '',
            opcionesMetodologia: [
              { id: 1, nombre: 'Metodología 1' },
              { id: 2, nombre: 'Metodología 2' },
              { id: 3, nombre: 'Metodología 3' }
            ],
            opcionesParametros: [
              { id: 1, nombre: 'Parámetro 1' },
              { id: 2, nombre: 'Parámetro 2' },
              { id: 3, nombre: 'Parámetro 3' }
            ],
            
        }

    },

    methods: { 
      
      getParametroNombre(parametroId) {
      // Método para obtener el nombre de un parámetro según su ID
      const parametro = this.opcionesParametros.find(opcion => opcion.id === parametroId);
      return parametro ? parametro.nombre : '';
      },
    

    },

}
</script>