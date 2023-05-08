<template lang="">
<validation-observer ref="form">
    <b-modal id="modal-detalles-empresa" ref="modal" title="Agregar Empresa" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Detalles Empresa</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-row class="pb-2">
            <b-col class="col-6">
                <div>
                    Nombre: <span>{{this.Nombre}}</span>
                </div>
                <div>
                    Nombre abreviado: <span>{{this.Nombre_abreviado}}</span>
                </div>
                <div>
                    Correo electrónico: <span>{{this.Correo}}</span>
                </div>
            </b-col>
            <b-col class="col-6">
                <div>
                    Rut: <span>{{this.Rut}}</span>
                </div>
                <div>
                    Razón Social: <span>{{this.Razon_social}}</span>
                </div>
                <div>
                    Giro: <span>{{this.Giro}}</span>
                </div>
            </b-col>
        </b-row>
        <hr>
        <div>
            <div>Direcciones</div>
            <br />
            <div></div>
            <b-list-group horizontal="md">
    <b-list-group-item class="flex-fill" style="font-weight:bold">Ciudad</b-list-group-item>
    <b-list-group-item class="flex-fill" style="font-weight:bold">Dirección</b-list-group-item>
  </b-list-group>
  <b-list-group>
            <b-list-group-item style="padding-top:5px; padding-bottom:5px" v-for="(input,k) in direcciones" :key="k">
              
              
                <b-row>
                    <b-col class="col-6">
                        <div>{{input.ciudad}}</div>
                           
            
                    </b-col>
                    <b-col class="col-6">
                        <div>{{input.direccion}}</div>
                            
                    </b-col>
                   

                </b-row>
            
              

        </b-list-group-item>
        </b-list-group>
        </div>
        <template #modal-footer="{ close }">

            <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Cerrar
            </b-button>

        </template>

    </b-modal>
</validation-observer>
</template>

<script>
import empresaService from "@/helpers/api-services/Empresa.service"
export default {

    watch: {
        empresaData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                this.Rut = this.empresaData.rut_empresa;
                this.Correo = this.empresaData.correo;
                this.Giro = this.empresaData.giro;
                this.Nombre = this.empresaData.nombre_empresa;
                this.Nombre_abreviado = this.empresaData.nombre_abreviado;
                this.Razon_social = this.empresaData.razon_social;
                this.direcciones = [{}];
                this.obtenerDetalles();

            }
        }
    },
    props: {
        empresaData: Object
    },
    data() {

        return {
            direcciones: [{
                ciudad: '',
                direccion: ''
            }],
            dataDirecciones: "",
            Nombre: "",
            Nombre_abreviado: "",
            Correo: "",
            Rut: "",
            Razon_social: "",
            Giro: "",

        }
    },
    methods: {
        obtenerDetalles() {
            empresaService.obtenerDetallesEmpresa(this.Rut).then((response) => {
                console.log(response)
                if (response != null) {
                    if (response.status == 200) {

                        response.data.ciudades.forEach((ciudad) => {
                            console.log(ciudad)
                            this.direcciones.push({
                                ciudad: ciudad.nombre_ciudad,
                                direccion: ciudad.direccion
                            })
                        })
                        // elimina primer valor vacio
                        this.direcciones.shift();

                    }

                } else {
                    this.$bvToast.toast(`Error al obtener detalles empresa`, {
                        title: 'Error',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "warning",
                        appendToast: true
                    })
                }
            })
        },
        add() {
            this.direcciones.push({
                ciudad: '',
                direccion: ''
            })
            console.log(this.direcciones)
        },

        remove(index) {
            this.direcciones.splice(index, 1)
        },
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        enviarFormulario() {

            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    var rutData = {
                        rut_empresa: this.Rut
                    }
                    this.dataDirecciones = this.direcciones.slice(0);

                    this.dataDirecciones.unshift(rutData)

                    console.log(this.dataDirecciones)
                    var data = {
                        'rut_empresa': this.Rut,
                        'nombre_empresa': this.Nombre,
                        'nombre_abreviado': this.Nombre_abreviado,
                        'correo': this.Correo,
                        'razon_social': this.Razon_social,
                        'giro': this.Giro,
                        'direcciones': this.dataDirecciones
                    }

                    console.log("data a enviar", data)
                    empresaService.actualizarEmpresa(data).then((response) => {
                        console.log(response)
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Edición de empresa exitosa`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })
                                this.$emit('refrescar');
                            }
                            this.$bvModal.hide('modal-editar-empresa')
                        } else {
                            this.$bvToast.toast(`Error al editar empresa`, {
                                title: 'Error',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "warning",
                                appendToast: true
                            })
                        }

                    })

                }

            });
        }
    },

}
</script>

<style lang="">

</style>
