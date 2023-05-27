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

    <div>
            <div>Direcciones</div>
            <br />
            <div></div>
            <div class="form-group" v-for="(input,k) in direcciones" :key="k">
               
                <b-row padding="0">
                    <b-col class="col-4">
                        <ValidationProvider :name="'ciudad ' + (k+1)" rules="required" v-slot="validationContext">
                        <b-form-input :state="getValidationState(validationContext)" :placeholder="'Ciudad '+(parseInt(k) +1)"  style="height:30px" type="text" class="form-control" v-model="input.ciudad"/>
                
                        <b-form-invalid-feedback id="ciudad-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                    </b-col>
                    <b-col class="col-6">
                        <ValidationProvider :name="'direccion ' + (k+1)" rules="required" v-slot="validationContext">
                        <b-form-input :state="getValidationState(validationContext)"   :placeholder="'Dirección ' + (parseInt(k) +1)" style="height:30px" type="text" class="form-control" v-model="input.direccion"/>
                        <b-form-invalid-feedback id="ciudad-live-feedback">{{
                        validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    </ValidationProvider>
                    </b-col>
                    <b-col class="col-2">
                        <b-button-group>
                            <b-button variant="danger" @click="remove(k)" v-if="k || ( !k && direcciones.length > 1)" style="padding:2px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                <b-icon icon="trash-fill"></b-icon>
                            </b-button>
                            <b-button variant="success" @click="add(k)" v-if="k == direcciones.length-1" style="padding:1px; aspect-ratio: 1 / 1; height: 30px; width: 30px">
                                <b-icon icon=" plus-circle-fill"></b-icon>
                            </b-button>
                        </b-button-group>

                    </b-col>
                   
                </b-row>

                <span>

                </span>
           
            </div>

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

      getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
      
      getParametroNombre(parametroId) {
      // Método para obtener el nombre de un parámetro según su ID
      const parametro = this.opcionesParametros.find(opcion => opcion.id === parametroId);
      return parametro ? parametro.nombre : '';
      },
    

    },

}
</script>