<template>
  <b-modal id="modal-resumen-recepcion" centered ref="modal" title="Resumen" size="xl" :no-close-on-esc="true"
    :no-close-on-backdrop="true" :hide-header="true">
    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->

      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Resumen</div>

      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>

    <div>






      <div id="pdf-content" style="margin:30px; font-size:0.8rem">

        <div style="width: 100%; margin-bottom: 50px" class="d-flex justify-content-between">

          <b-navbar-brand class="d-flex align-items-center">
            <b-img :src="require('@/assets/isologo-UCN.png')" style="height: 60px; padding: 5px" alt="Image 1"></b-img>
          </b-navbar-brand>
          <b-navbar-brand>
            <b-img :src="require('@/assets/isologo-LSA.png')" style="height: 75px; padding: 10px;" alt="Image 1"></b-img>
          </b-navbar-brand>
          <div style="font-weight: bold; font-size:1.1rem; border: 1px solid var(--lsa-light-gray); height:60px; padding:8px" class="d-flex align-items-center justify-content-center"> <div>{{ "INFORME N°: " + this.resumenData.RUM }}</div></div>
        </div>






        <b-row>


          <b-col class="col-6">

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Cliente: </b-col>
              <b-col class="col-7">{{ resumenData.cliente }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Fecha de ingreso: </b-col>
              <b-col class="col-7">{{ fecha_ingreso_formateada }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Hora de ingreso: </b-col>
              <b-col class="col-7">{{ hora_ingreso_formateada }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Fecha de muestreo: </b-col>
              <b-col class="col-7">{{ fecha_muestreo_formateada }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Hora de muestreo: </b-col>
              <b-col class="col-7">{{ hora_muestreo_formateada }}</b-col>
            </b-row>



            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Prioridad: </b-col>
              <b-col class="col-7">{{ resumenData.prioridad }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Temperatura: </b-col>
              <b-col class="col-7">{{ resumenData.temperatura+" °C" }}</b-col>
            </b-row>

          </b-col>
       

          <b-col class="col-6">

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Fecha de entrega: </b-col>
              <b-col class="col-7">{{ fecha_entrega_formateada }}</b-col>
            </b-row>


            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Cotización n°: </b-col>
              <b-col class="col-7">{{ resumenData.numero_cotizacion }}</b-col>
            </b-row>

            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> N° de muestras: </b-col>
              <b-col class="col-7">{{ resumenData.numero_muestras }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Matriz: </b-col>
              <b-col class="col-7">{{ resumenData.matriz }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Muestreado por: </b-col>
              <b-col class="col-7">{{ resumenData.muestreado }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Recibido por: </b-col>
              <b-col class="col-7">{{      resumenData.recepcionista  }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Empresa: </b-col>
              <b-col class="col-7">{{ resumenData.empresa }}</b-col>
            </b-row>

          </b-col>

        </b-row>
        <b-col>
          <br />
          <b-col class="col-5" style="font-weight:bold;"> Parámetros: </b-col>
          <b-col v-if="resumenData.parametros.length <= 10">
            <div v-for="(parametro, index) in resumenData.parametros" :key="index">
              {{"-" + parametro }}</div>
          </b-col>
          <b-col v-else>
            <b-row>
              <b-col>
                <div v-for="(parametro, index) in parametros_mitad_1" :key="index">
                  {{ "-" + parametro }}</div>
              </b-col>
              <b-col>
                <div v-for="(parametro, index) in parametros_mitad_2" :key="index">
                  {{  "-" + parametro }}</div>
              </b-col>
            </b-row>
          </b-col>
          <hr/>
        </b-col>












        <div style="margin-top:50px" class="ml-4">

          <div>

            <div style="width: 200px; border-bottom:1px solid var(--lsa-gray); margin-top:100px"></div>
            <div style="font-style: italic;">forma del solicitante</div>

          </div>
        </div>
      </div>





    </div>


    <template #modal-footer="{ close }">
      <b-col>


        <b-row class="d-flex justify-content-between">
          <b-row>
            <xlsx-workbook>
              <xlsx-sheet :collection="sheet.data" v-for="sheet in resumen" :key="sheet.name" :sheet-name="sheet.name" />
              <xlsx-download>
                <b-button class="lsa-orange reactive-button ml-2" size="xl"
                  style="font-weight: bold; border: none; min-height: 40px;">Descargar
                  excel<b-icon icon="file-earmark-spreadsheet" class="ml-2"></b-icon></b-button>
              </xlsx-download>



            </xlsx-workbook>

            <b-button size="xl" class="reactive-button lsa-orange ml-2"
              style="font-weight: bold; border:none;  min-height: 40px;" @click="exportToPDF">Descargar PDF
              <b-icon size="0.9" icon="file-earmark-pdf" class="ml-2" />
            </b-button>

          </b-row>

          <b-button @click="close()" variant="primary" class="float-right reactive-button" style="font-weight:bold">
            Cerrar
          </b-button>
        </b-row>
      </b-col>

    </template>

  </b-modal>
</template>

<script>
import html2pdf from "html2pdf.js";


import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue-xlsx";
import moment from 'moment';

export default {
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  watch: {
    resumenData: {
      handler() {
        console.log("leyendo resumen de datos", this.resumenData);
        var parametros_string = "";
        this.resumenData.parametros.forEach(p => {
          parametros_string += p + ","
        });
        this.fecha_ingreso_formateada = moment(this.resumenData.fecha_ingreso).format('DD/MM/YYYY');
        this.fecha_entrega_formateada = moment(this.resumenData.fecha_entrega).format('DD/MM/YYYY');
        this.fecha_muestreo_formateada = moment(this.resumenData.fecha_muestreo).format('DD/MM/YYYY');
        this.parametros_mitad_1 = this.resumenData.parametros.slice(0, this.resumenData.parametros.length / 2);
        this.parametros_mitad_2 = this.resumenData.parametros.slice(this.resumenData.parametros.length / 2);

        this.hora_ingreso_formateada = this.resumenData.hora_ingreso.substring(0,5);
        this.hora_muestreo_formateada = this.resumenData.hora_muestreo.substring(0,5);
        this.resumen = [{
          name: "Resumen", data: [{
            "N° Informe": "-",
            "Cliente": this.resumenData.cliente,
            "Parámetros": parametros_string,
            "Fecha de Ingreso": moment(this.resumenData.fecha_ingreso).format('DD/MM/YYYY'),
            "Fecha de Entrega": moment(this.resumenData.fecha_entrega).format('DD/MM/YYYY'),
            "N° Muestras Total": this.resumenData.numero_muestras,
            "Fecha de Emisión Informe": "-",
            "Prioridad": this.resumenData.prioridad,
            "Cotización N°": this.resumenData.numero_cotizacion,
            "Matriz": this.resumenData.matriz,
            "Acreditación": "-",
            "OC/HES": "-",
            "Factura N°": "-",
            "EDP": "-",
            "Código Recuperación": "-",
            "Valor NETO UF": this.resumenData.valor,

          }]
        }]
      }
    }
  },
  props: {
    resumenData: Object
  },
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("pdf-content"), {
        margin: 1,
        filename: "comprobante_RUM_" + this.resumenData.RUM + ".pdf",
      });
    },

  },
  data() {
    return {
      rut_empleado: '',
      nombre_empleado: '',
      nombre_empresa: '',
      direccion_empresa: '',
      fecha_ingreso_formateada: '',
      fecha_muestreo_formateada: '',
      fecha_entrega_formateada: '',
      hora_ingreso_formateada : '',
 hora_muestreo_formateada: '',
      RUM: '0',
      parametros_mitad_1: [],
      parametros_mitad_2: []
    }
  },
}
</script>

<style lang="">

</style>
