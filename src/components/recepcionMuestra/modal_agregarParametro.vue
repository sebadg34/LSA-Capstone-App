<template>
    <validation-observer ref="form">
        <b-modal centered id="modal-Agregar-Parametro" ref="modal" :title="`Agregar Parametro`" size="md">
    
            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <b-row class="d-flex justify-content-around">
                    <div class="pl-3">Agregar parámetro</div>
                </b-row>
                <button type="button" class="close" aria-label="Close" @click="close()">
                    <span aria-hidden="true" style="color:white">&times;</span>
                </button>
            </template>
    
            <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    
            <ValidationProvider name="nombre del parámetro" rules="required" v-slot="validationContext">
                <label for="input-live">Nombre del parámetro:</label>
                <b-form-input id="input-live" v-model="Nombre" :state="getValidationState(validationContext)" placeholder="Ingrese nombre del parámetro."></b-form-input>
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
    <br/>
     
    
            <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    
            <template #modal-footer>
          
              
                <b-button @click="AgregarParametro()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
                    Agregar parámetro
                </b-button>
          
            
            </template>
        </b-modal>
    </validation-observer>
    </template>
    
    <script>
    import ElementosService from '@/helpers/api-services/Elementos.service';
    
    export default {
    
        data() {
    
            return {
                Nombre: '',
               
            }
        },
    
        mounted() {
 
    
        },
    
        methods: {
            getValidationState({
                dirty,
                validated,
                valid = null
            }) {
                return dirty || validated ? valid : null;
            },
    
    
    
    
            AgregarParametro() {
    
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    } else {
    
                        var data = {
    
                            nombre_parametro: this.Nombre
    
                        }
                        console.log("data a enviar", data)
                        ElementosService.agregarParametro(data).then((response) => {
                            console.log(response)
                            if (response != null) {
                                if (response.status == 200) {
                                    this.$bvToast.toast(`La creación del parámetro ha sido exitosa.`, {
                                        title: 'Éxito',
                                        toaster: 'b-toaster-top-center',
                                        solid: true,
                                        variant: "success",
                                        appendToast: true
                                    })
    
                                    this.$emit('refrescar');
    
                                    this.Nombre = '',
                                        this.metodologiaAsignada = '',
                                        this.metodologiaSeleccionada = [],
    
                                        this.$refs.modal.hide()
                                }
                            } else {
                                this.$bvToast.toast(`Error al agregar el parámetro.`, {
                                    title: 'Error',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "warning",
                                    appendToast: true
                                })
                            }
                        });
    
                    }
    
                })
    
            },
    
        },
    
    }
    </script>
    