<template>
    <b-modal id="modal-cantidad" ref="modal" title="Cantidad de submuestras" size="lg">
      <template #modal-header="{ close }">
        <!-- Emulate built-in modal header close button action -->
        <b-row class="d-flex justify-content-around">
          <div class="pl-3">Cantidad de muestras</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
          <span aria-hidden="true" style="color:white">&times;</span>
        </button>
      </template>
  
      <div>
        <b-table :items="tablaItems" :fields="tablaFields">
            <template #cell(identificacion)="row">
                <b-form-input v-model="row.item.identificacion" placeholder="Ingrese la identificación de la muestra"></b-form-input>
            </template>
            <template #cell(parametros)="row">
                <b-form-select v-model="row.item.parametros" :options="parametrosOptions" placeholder="Ingrese los parámetros">
                    <template #first>
                        <option disabled :value="null">No existen parámetros asociados</option>
                    </template>
                </b-form-select>
            </template>
        </b-table>
      </div>  
  
      <template #modal-footer>
        <b-button @click="guardarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">Guardar</b-button>
      </template>
    </b-modal>
  </template>
  
  <script>
import ElementosService from '@/helpers/api-services/Elementos.service';

  export default {

    data() {
        return {
            parametrosOptions: [],
            identificacion: '',
            orden: '',
        };
    },

    props: {
      nMuestras: {
        type: String,        
        default: '',
      },
    },
  
    computed: {
      tablaItems() {
        const items = [];
        for (let i = 1; i <= parseInt(this.nMuestras); i++) {
          items.push({
            orden: i,
            identificacion: '', 
            parametros: '',
          });
        }
        return items;
      },
      tablaFields() {
        return [
          { key: 'orden', label: 'Orden' },
          { key: 'identificacion', label: 'Identificación' },
          { key: 'parametros', label: 'Parámetros' },
        ];
      },
      mostrarMensaje() {
        return this.parametrosOptions.length === 0;
      },
    },
    mounted(){
        ElementosService.obtenerParametros().then((response)=>{
            if(response.data != null && response.status === 200){
                this.parametrosOptions = response.data
            }
        })
    },

    methods: {

        guardarFormulario() {
            const datosIngresados = this.tablaItems.map((item) => ({
                identificacion: item.identificacion,
                orden: item.orden,
                parametros: item.parametros,
            }));
            console.log("dato a enviar: ", datosIngresados)
            this.$emit('datosIngresados', datosIngresados);
            this.$refs.modal.hide();
        },
    }
  };
</script>
  