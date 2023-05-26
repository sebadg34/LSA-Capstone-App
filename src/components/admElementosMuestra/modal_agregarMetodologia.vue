<template>
    <b-modal id="modal-Agregar-Metodologia" :title="`Agregar Metodologia`" size="lg">
        

      <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Agregar Metodología</div>
            </b-row>
            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
      </template> 
      
      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      
      <b-form-group label="Nombre de la Metodología">
         <b-form-input v-model="Nombre"></b-form-input>
      </b-form-group>

    <b-row>      
      <b-col>
        <b-form-group label="Analista Asignado">
          <b-form-select v-model="AnalistaAsignado">
            <option disabled value="">Seleccione Analista</option>
            <!-- Opciones de metodología -->
            <option v-for="opcion in opcionesAnalista" :key="opcion.id" :value="opcion.id">{{ opcion.nombre }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>      
    </b-row>

    <b-list-group v-if="AnalistaAsignado" class="mt-3">
      <b-list-group-item>{{ getAnalistaNombre(AnalistaAsignado) }}</b-list-group-item>
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
            AnalistaAsignado: '',                       
            opcionesAnalista: [
              { id: 1, nombre: 'Analista 1' },
              { id: 2, nombre: 'Analista 2' },
              { id: 3, nombre: 'Analista 3' }
            ]        

        }

    },

    methods: { 
      
      getAnalistaNombre(AnalistaId) {
      // Método para obtener el nombre de un parámetro según su ID
      const analista = this.opcionesAnalista.find(opcion => opcion.id === AnalistaId);
      return analista ? analista.nombre : '';
      },     

    },

}
</script>