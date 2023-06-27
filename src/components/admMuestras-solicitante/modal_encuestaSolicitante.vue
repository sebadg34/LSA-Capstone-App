<template>
<b-modal centered id="modal-encuesta-solicitante" ref="modal" title="Agregar Personal" size="lg">
    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->

        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Encuesta de satisfacción</div>

        </b-row>

        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>
<b-row>
    <b-col class="col-12">
        <label for="rating-lg" class="mt-3" style="font-weight: bold;">¿Qué te pareció el servicio?</label>
      
    <b-form-rating variant="warning" id="rating-lg" v-model="Valoracion" size="lg"></b-form-rating>
    
    <b-row class="d-flex justify-content-between" style="padding-left:70px; padding-right:70px">
     
        <div>Muy malo</div>
        <div>Malo</div>
        <div>Regular</div>
        <div>Bueno</div>
        <div>Excelente</div>
    </b-row>
    </b-col>
    
    <b-col class="col-12">
        <hr/>
        <label for="observacion" class="mt-3" style="font-weight: bold;">Observaciones</label>
       
        <b-form-textarea
      id="observacion"
      v-model="Observacion"
      placeholder="Ingrese observaciones del servicio..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    </b-col>
</b-row>

    <template #modal-footer>

        <b-button variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Enviar encuesta
        </b-button>
        

    </template>

</b-modal>
</template>

<script>

export default {

    watch: {
        encuestaData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL",this.encuestaData)
                
         
            }
        }
    },
    props: {
        // encuestaData: Object
    },
    methods: {
        enviarFormulario() {

this.$refs.form.validate().then(success => {
    if (!success) {

        return;
    } else {
      console.log("validado, enviando!");










      this.Observacion = ""
           this.Valoracion = ""
    }

});

} 
        
    },
    data() {
        return {
            Observacion: "",
            Valoracion: "",
        }
    },
}
</script>

<style lang="">

</style>
