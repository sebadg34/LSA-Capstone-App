<template>
<validation-observer ref="form">
    <b-modal  centered id="modal-cotizaciones-solicitante" ref="modal" title="Agregar Cotización" size="xl">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <b-col>
                    <div class="pl-3">Listado de cotizaciones</div>
                    <div class="pl-3" v-if="Nombre_completo != null">{{ Nombre_completo }}</div>
                </b-col>
      
               
            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>
        <b-list-group style="font-weight:bold;" horizontal class="d-flex">
            <b-list-group-item style="padding:10px" class="col-2 d-flex justify-content-center">
                        <div>
                            RUM
                        </div>
                       
                    </b-list-group-item>
            <b-list-group-item style="padding:10px" class="col-2 d-flex justify-content-center">
                        <div>
                            N° cotización
                        </div>
                       
                    </b-list-group-item>
            <b-list-group-item style="padding:10px" class="col-3 d-flex justify-content-center">
                        <div>
                            Nombre del archivo
                        </div>
                       
                    </b-list-group-item>  
                    <b-list-group-item style="padding:10px" class="col-3 d-flex justify-content-center">
                        <div>
                            Fecha de emisión
                        </div>
                       
                    </b-list-group-item>
                    <b-list-group-item style="padding:10px" class="col-2 d-flex justify-content-center">
                        <div>
                           Acción
                        </div>
                       
                    </b-list-group-item>
        </b-list-group>
        <div v-if="Cotizaciones.length == 0">
            <b-list-group-item>
                    <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <b-icon icon="file-earmark-break" animation="fade" variant="secondary"></b-icon>
                        <div style="font-weight:bold; color:gray">No hay cotizaciones registradas para mostrar.</div>
                        </div>
                    
                    </div>
                </b-list-group-item>
            </div>

            
        <b-list-group v-for="file in Cotizaciones" :key="file.id">
            <b-overlay
      :show="BorrandoArchivo"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
      class="d-inline-block"
      
    >
            <b-list-group horizontal class="d-flex">
                
               

                <b-list-group-item style="padding:10px" class="col-2 d-flex justify-content-center">
                        <div>
                            -
                        </div>
                       
                    </b-list-group-item>
                <b-list-group-item style="padding:10px" class="col-2 d-flex justify-content-center">
                        <div>
                            {{ file.numero_cotizacion }}
                        </div>
                       
                    </b-list-group-item>
                <b-list-group-item style="padding:10px" class="col-3 d-flex justify-content-center">
                        <div>
                            {{ file.nombre_original_documento }}
                        </div>
                       
                    </b-list-group-item>
                    <b-list-group-item style="padding:10px" class="col-3 d-flex justify-content-center">
                        <div>
                            {{ file.fecha_emision }}
                        </div>
                       
                    </b-list-group-item>
                    <b-list-group-item style="padding:10px" class="col-2 d-flex justify-content-around">
                      
                        <b-button variant="info" @click="descargarArchivo(file)" style=" height: 30px; width: 30px; border-style: none; padding: 0px; background-color: white;">
                            <b-icon-download variant="info"></b-icon-download>
                        </b-button>

                        <b-button variant="danger" @click="borrarArchivo(file)" style=" height: 30px; width: 30px; border-style: none; padding: 0px; aspect-ratio: 1;">
                            <b-icon icon="trash-fill"></b-icon>
                        </b-button>
                    </b-list-group-item>

            </b-list-group>
           </b-overlay>         
                </b-list-group>



                <template #modal-footer="{ close }">

<b-button  @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
    Cerrar
</b-button>

</template>
       
    
    </b-modal>
</validation-observer>
</template>

<script>
import solicitanteService from "@/helpers/api-services/Solicitante.service"
import FileSaver from 'file-saver';
export default {
    watch: {
        userData: {
            handler() {
                console.log("datos usuario",this.userData)
                this.Nombre_completo = this.userData.nombre + " "+ this.userData.primer_apellido+ " " + this.userData.segundo_apellido
                console.log(this.Nombre_completo)
                this.obtenerArchivos();
            }
        }
    },
    props: {
        userData: Object
    },
    data() {

        return {
            BorrandoArchivo: false,
            Archivos: "",
            Nombre_completo: "",
            Cotizaciones: "",
        }
    },
    methods: {
        borrarArchivo(file){
            this.BorrandoArchivo = true;
            console.log('archivo a borrar',file)
            solicitanteService.eliminarCotizacion(file).then((response) =>{
                this.BorrandoArchivo = false;
                if(response.status == 200){
                    this.$bvToast.toast(`Cotización borrada exitosamente.`, {
                        title: 'Exito',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "success",
                        appendToast: true
                    })
                    console.log(response)
                    this.obtenerArchivos();
                }
            })
        },
        descargarArchivo(file) {
            console.log(file)
            //let blob = file.data;
            solicitanteService.descargarCotizacion(file).then((response) =>{
                if(response.data != null){
                    
                    FileSaver.saveAs(response.data, file.nombre_original_documento);
                }
            })
           

        },
        reiniciarDatos(){
            this.Archivos = ""
        },
        obtenerArchivos(){
solicitanteService.obtenerDetallesCompletosSolicitante(this.userData.rut_solicitante).then((response)=>{
    console.log(response)
    if(response.request.status == 200){
        console.log("detalles de solicitante",response.data)
        this.Cotizaciones = response.data.cotizaciones;

    }
})
        },
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        enviarFormulario() {
            let formData = new FormData();
            formData = {
                rut_solicitante: this.userData.rut_solicitante,
                fecha_emision: this.Fecha,
            }
            formData.file = this.Archivo;
            console.log("data a enviar", formData);
            solicitanteService.agregarCotizacion(formData).then((response) => {
                console.log(response);
                if (response.request.status == 200) {
                    this.$bvToast.toast(`Guardado de cotización exitoso.`, {
                        title: 'Exito',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "success",
                        appendToast: true
                    })
                    this.$bvModal.hide('modal-cotizacion-solicitante');
                    this.reiniciarDatos();
                }
            })

        }
    }
}
</script>

<style lang="scss">
.custom-file-input:lang(en)~.custom-file-label::after {
    content: 'Buscar';
}
</style>
