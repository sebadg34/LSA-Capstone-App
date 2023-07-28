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
                    <strong>Razón Social:</strong>   <span>test</span>
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
            <b-button  size="xl" class="reactive-button lsa-orange" style="font-weight: bold; border:none" @click="downloadPDF">Descargar PDF</b-button>
          
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
       async downloadPDF() {
          // Get the HTML content to be converted to PDF
          const htmlContent = document.getElementById("pdf-content").outerHTML;

          // Create a hidden iFrame to load the HTML content and print it
          const iFrame = document.createElement("iframe");
          iFrame.style.display = "none";
          document.body.appendChild(iFrame);

          // Load the HTML content into the iFrame and print it
          const pdfBlob = await new Promise((resolve) => {
            iFrame.onload = () => {
              const iFrameWindow = iFrame.contentWindow;
              iFrameWindow.print();
              iFrameWindow.addEventListener("afterprint", () => {
                // When the print dialog is closed, get the resulting PDF Blob and resolve the Promise
                const pdfBlob = iFrameWindow.Blob;
                resolve(pdfBlob);
                document.body.removeChild(iFrame);
              }, { once: true });
            };
            iFrame.srcdoc = htmlContent;
          });

          // Create a download link for the resulting PDF Blob and trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(pdfBlob);
          downloadLink.download = "resumen.pdf";
          downloadLink.onclick = () => downloadLink.remove();
          document.body.appendChild(downloadLink);
          downloadLink.click();
        },
        
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
