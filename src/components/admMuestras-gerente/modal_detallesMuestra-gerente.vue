<template>
  <b-modal id="modal-detalle-muestra-gerente" :title="`Detalles de la muestra ${RUM}`" size="xl" @hidden="onHidden">

    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Detalles de la muestra</div>
      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>

    <div class="p-3">
      <b-col class="col-12">

        <b-col class="col-3">
        <b-row style="border: 1px solid var(--lsa-light-gray); padding:4px; border-radius:5px">
              <b-col class="col-6" style="font-weight:bold; "> RUM: </b-col>
              <b-col class="col-6">{{ RUM }}</b-col>
            </b-row>
          </b-col>
<br/>
        <b-row class="pb-2">
          
          <b-col class="col-6">
           
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Nombre solicitante: </b-col>
              <b-col class="col-7">{{ nombre_solicitante + " " + apellido_solicitante}}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Empresa: </b-col>
              <b-col class="col-7">{{ nombre_empresa }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Ciudad empresa: </b-col>
              <b-col class="col-7">{{ ciudad_empresa }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Dirección empresa: </b-col>
              <b-col class="col-7">{{ direccion_empresa }}</b-col>
            </b-row>
           
          </b-col>

          <b-col class="col-6">
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Número de muestras: </b-col>
              <b-col class="col-7">{{ numero_muestras }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> matriz: </b-col>
              <b-col class="col-7">{{ matriz }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Norma: </b-col>
              <b-col class="col-7">{{ norma }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Muestreado por: </b-col>
              <b-col class="col-7">{{ muestreador }}</b-col>
            </b-row>
           

          </b-col>
        </b-row>
<br/>
        <b-list-group horizontal>
          <b-list-group-item class="d-flex align-items-center justify-content-center"
            style="width:30%;font-weight: bold; padding:3px">Parámetro(s)</b-list-group-item>

          <b-list-group-item class="d-flex align-items-center justify-content-center"
            style="width:70%;font-weight: bold;padding:3px">Metodología(s)</b-list-group-item>

        </b-list-group>

        <b-list-group>
          <b-list-group-item v-if="cargandoParametros" class="d-flex align-items-center justify-content-center lsa-orange-text"
            style="height:100px">
            <div>
              <b-spinner class="align-middle"></b-spinner>
              <strong> Cargando...</strong>
            </div>
          </b-list-group-item>
          <b-list-group v-for="parametro in this.parametros" :key="parametro.id_parametro" horizontal>
            <b-list-group-item class="d-flex align-items-center justify-content-center"
              style="width:30%">{{ parametro.nombre_parametro }}</b-list-group-item>

            <b-list-group-item style="padding:0px;width:70%">

              <b-list-group flush>
                <b-list-group-item class="d-flex justify-content-between align-items-center" style="padding:10px"
                  v-for="metodologia in parametro.metodologias"
                  :key="metodologia.id_metodologia + '-' + parametro.id_parametro">
                  <span class="pl-2"> {{ metodologia.nombre_metodologia }}</span>

                  <b-popover placement="topleft"
                    :target="'button-' + metodologia.id_metodologia + '-' + parametro.id_parametro"
                    title="Descripción metodología" triggers="focus">
                    {{ metodologia.detalle_metodologia }}
                  </b-popover>
                  <b-button class="boton-ojo-metodo"
                    :id="'button-' + metodologia.id_metodologia + '-' + parametro.id_parametro">
                    <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                  </b-button>
                </b-list-group-item>

              </b-list-group>
            </b-list-group-item>
          </b-list-group>

        </b-list-group>
     
<br/>
        <b-list-group horizontal>
          <b-list-group-item class="d-flex align-items-center justify-content-center"
            style="width:30%;font-weight: bold; padding:3px">Analistas designados(s)</b-list-group-item>

          <b-list-group-item  style="width:70%;padding:0px" class="d-flex align-items-center justify-content-center">
            <b-list-group style="width:100%">
              <b-list-group-item v-if="cargandoAnalistas" class="d-flex align-items-center justify-content-center lsa-orange-text"
            style="height:100px">
            <div>
              <b-spinner class="align-middle"></b-spinner>
              <strong> Cargando...</strong>
            </div>
          </b-list-group-item>

          <!--
              <b-list-group-item  class=" d-flex align-items-center justify-content-center">analista test</b-list-group-item>
              <b-list-group-item class="d-flex align-items-center justify-content-center">analista test</b-list-group-item>
              <b-list-group-item class="d-flex align-items-center justify-content-center">analista test</b-list-group-item>
-->

            </b-list-group>
          </b-list-group-item>
           

        </b-list-group>
<br/>
        <b-row style="border-bottom: 1px solid var(--lsa-light-gray);">
              <b-col class="col-7" style="font-weight:bold;"> Fecha de entrega: </b-col>
              <b-col class="col-5">{{ fecha_entrega }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray);">
              <b-col class="col-7" style="font-weight:bold;"> Tipo de pago: </b-col>
              <b-col class="col-5">{{ tipo_pago }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray);">
              <b-col class="col-7" style="font-weight:bold;"> Valor neto: </b-col>
              <b-col class="col-5">{{ valor_neto }}</b-col>
            </b-row>
            
      </b-col>
    </div>

    <template #modal-footer="{ close }">
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import MuestraGerenteService from '@/helpers/api-services/Muestra-gerente.service';

export default {
  props: {
    detallesData: Object
  },
  data() {
    return {

      RUM: '',
      nombre_solicitante: '',
      apellido_solicitante: '',
      nombre_empresa: '',
      ciudad_empresa: '',
      direccion_empresa: '',
      numero_muestras: '',
      numero_empresa: '',
      norma: '',
      muestreador: '',
      fecha_entrega: '',
      tipo_pago: '',
      matriz: '',
      valor_neto: '',
      loading: false,
      cargandoParametros: false,
      cargandoAnalistas: false,
      showObservaciones: false,
      parametros: [],

    }
  },
  methods: {
    obtenerDetalles(rum) {
      this.cargandoParametros = true;
      this.cargandoAnalistas = true;
      MuestraGerenteService.obtenerDetallesMuestra(rum).then((response) => {
        console.log(response)
        if (response != null) {
          if (response.status == 200 && response.data != null) {
            const detalles = response.data;
            console.log('detalles de muestra', response.data);
            this.numero_muestras = detalles.cantidad_muestras;
            this.norma = detalles.norma;
            this.valor_neto = detalles.valor_neto;
            this.tipo_pago = detalles.tipo_pago;
            this.muestreador = detalles.muestreado_por;
            this.apellido_solicitante = detalles.detalles[0].primer_apellido;
            this.direccion_empresa = detalles.detalles[0].direccion;
            this.ciudad_empresa = detalles.detalles[0].nombre_ciudad;

            const parametrosData = response.data.parametros_metodologias;
            for(var i = 0; i < parametrosData.length; i++){
              const parametroExistente = this.parametros.find(param => param.id_parametro = parametrosData.id_parametro);
              if(parametroExistente == null){
                this.parametros.push({
                  nombre_parametro: parametrosData[i].nombre_parametro,
                  id_parametro : parametrosData[i].id_parametro,
                  metodologias: [{
                    id_metodologia: parametrosData[i].id_metodologia,
                    nombre_metodologia: parametrosData[i].nombre_metodologia,
                    detalle_metodologia: parametrosData[i].detalle_metodologia,
                  }]
                })
              } else{
                parametroExistente.metodologias.push({
                  id_metodologia: parametrosData[i].id_metodologia,
                    nombre_metodologia: parametrosData[i].nombre_metodologia,
                    detalle_metodologia: parametrosData[i].detalle_metodologia,
                })
              }
            }
            this.cargandoParametros = false;
          }

        } else {
          this.$bvToast.toast(`Error al obtener detalles de muestra`, {
            title: 'Error',
            toaster: 'b-toaster-top-center',
            solid: true,
            variant: "warning",
            appendToast: true
          })
          this.cargandoDirecciones = false;
        }
      })
    },
    onHidden() {
      this.$emit('modal-cerrado');
    }
  },
  watch: {
    detallesData: {
      handler() {
        console.log("detallesData actualizada", this.detallesData)

        this.RUM = this.detallesData.RUM;
        this.nombre_solicitante = this.detallesData.solicitante[0].nombre;
        this.nombre_empresa = this.detallesData.nombre_empresa;
        this.matriz = this.detallesData.matriz.nombre_matriz;
        this.valor_neto = this.detallesData.valor_neto;
        this.fecha_entrega = this.detallesData.fecha_entrega;
        this.obtenerDetalles(this.RUM);
      }
    }
  }
}
</script>
