<template>
    <b-modal id="modal-resumen-recepcion" centered ref="modal" title="Resumen" size="xl">
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
        <div id="pdf-content">

          <div  class="pb-2 row">
            <div class="col-6">
                <div>
                  <strong>Nombre del cliente:</strong>   <span>test</span>
                </div>
                <div>
                    <strong> Nombre abreviado:</strong>   <span>test</span>
                </div>
                <div>
                    <strong>  Correo electrónico:</strong>   <span>test</span>
                </div>
            </div >
            <hr/>
            <div  class="col-6">
                <div>
                    <strong>RUT:</strong>  <span>test</span>
                </div>
                <div>
                    <strong>Razón social:</strong>   <span>test</span>
                </div>
                <div>
                    <strong> Giro:</strong>  <span>test</span>
                </div>
            </div >
        </div >

<b-list-group>
  <b-list-group-item>
    test
  </b-list-group-item>
  <b-list-group-item>
    test
  </b-list-group-item>
  <b-list-group-item>
    test
  </b-list-group-item>
  <b-list-group-item>
    test
  </b-list-group-item>
  <b-list-group-item>
    test
  </b-list-group-item>
</b-list-group>





    </div>
  
  </div>
     

        <template #modal-footer="{ close }">
          <b-col>

          
          <b-row class="d-flex justify-content-between">
            <b-button  size="xl" class="reactive-button lsa-orange" style="font-weight: bold; border:none" @click="exportToPDF">Descargar PDF</b-button>
          
            <b-button @click="close()" variant="primary" class="float-right reactive-button"
                style="font-weight:bold">
                Cerrar
            </b-button>
          </b-row>
        </b-col>

        </template>

    </b-modal>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {

    watch: {
      resumenData: {
        handler(){
          console.log("leyendo resumen de datos",this.resumenData);
        }
       }
    },
    props: {
      resumenData: Object
    },
    methods: {
      exportToPDF(){
        html2pdf(document.getElementById("pdf-content"), {
margin: 1,
filename:"i-was-html.pdf",
			});
      }
    },
    data() {
        return {
           rut_empleado: '',
           nombre_empleado: '',
           nombre_empresa: '',
           direccion_empresa: '',

        }
    },
}
</script>

<style lang="">

</style>
