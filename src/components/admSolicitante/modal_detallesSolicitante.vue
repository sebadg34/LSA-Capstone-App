<template>
<validation-observer ref="form">
    <b-modal id="modal-detalles-solicitante" ref="modal" title="Detalles Solicitante" size="lg">

        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Detalles Solicitante</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>
        <b-row class="pb-2">
            <b-col class="col-12">
                <b-row class="d-flex justify-content-center">
                    <b-col style="font-weight:bold" class="col-4">
                        <div v-if="this.Nombre_empresa"> Empresa:</div>
                        <div v-if="this.Ciudad_empresa"> Ciudad Empresa:</div>
                        <div> Rut:</div>
                        <div> Nombre:</div>
                        <div> Primer apellido:</div>
                        <div> Segundo apellido:</div>
                        <div> Teléfono móvil:</div>
                        <div> Correo electrónico:</div>
                        <div> Fono pago proveedores:</div>
                        <div> Contacto pago proveedores :</div>
                        <div> Dirección de envío factura:</div>
                        <div> Tipo cliente:</div>
                    </b-col>
                    <b-col class="col-4">
                        <div>{{ this.Nombre_empresa }}</div>
                        <div>{{ this.Ciudad_empresa }}</div>
                        <div>{{ this.Rut }}</div>
                        <div>{{ this.Nombre }}</div>
                        <div>{{ this.Primer_apellido }}</div>
                        <div>{{ this.Segundo_apellido }}</div>
                        <div>{{ this.Movil }}</div>
                        <div>{{ this.Correo }}</div>
                        <div>{{ this.Fono_proveedores }}</div>
                        <div>{{ this.Contacto_factura }}</div>
                        <div>{{ this.Direccion_factura }}</div>
                        <div>{{ this.Tipo }}</div>
                    </b-col>
                </b-row>

            </b-col>
        </b-row>

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
import empresaService from "@/helpers/api-services/Empresa.service"
export default {
    watch: {
        userData: {
            handler() {
                console.log("PROP CHANGED", this.userData)

              
                this.Rut = this.userData.rut_solicitante
                this.Nombre = this.userData.nombre
                this.Primer_apellido = this.userData.primer_apellido
                this.Segundo_apellido = this.userData.segundo_apellido
                this.Movil = this.userData.telefono
                this.Correo = this.userData.correo
                this.Fono_proveedores = this.userData.fono_contacto_proveedores
                this.Contacto_factura = this.userData.direccion_contacto_proveedores
                this.Direccion_factura = this.userData.direccion_envio_factura
                this.Tipo = this.userData.tipo_cliente
                this.Id_ciudad = this.userData.id_ciudad
                this.obtenerDetalles(this.Rut);
                this.obtenerDetallesEmpresa(this.userData.rut_empresa);
            }
        }
    },
    props: {
        userData: Object
    },
    data() {

        return {
            Nombre_empresa: "",
            Ciudad_empresa: "",
            Id_ciudad: "",
            Rut_empresa: "",
            Correo: "",
            Rut: "",
            Nombre: "",
            Primer_apellido: "",
            Segundo_apellido: "",
            Movil: "",
            Tipo: "",
            Direccion_factura: "",
            Contacto_factura: "",
            Fono_proveedores: "",
            
            tipos: [{
                    value: 'Practicante',
                    text: 'Practicante'
                },
                {
                    value: 'Contrato Plazo Fijo',
                    text: 'Contrato Plazo Fijo'
                },
                {
                    value: 'Contrato Plazo Indefinido',
                    text: 'Contrato Plazo Indefinido'
                },
                {
                    value: 'Contrato Honorario',
                    text: 'Contrato Honorario'
                },
            ],
            cargos: [{
                    value: 'Gerente',
                    text: 'Gerente'
                },
                {
                    value: 'Jefe(a) de Laboratorio',
                    text: 'Jefe(a) de laboratorio'
                },
                {
                    value: 'Supervisor(a)',
                    text: 'Supervisor(a)'
                },
                {
                    value: 'Administrador(a) de Finanzas',
                    text: 'Administrador(a) de Finanzas'
                },
                {
                    value: 'Analista Químico',
                    text: 'Analista Químico'
                },
                {
                    value: 'Químico',
                    text: 'Químico'
                },
            ],
        }
    },
    methods: {

        obtenerDetallesEmpresa(rutEmpresa) {
            console.log(rutEmpresa)
            this.Rut_empresa = rutEmpresa;
            empresaService.obtenerDetallesEmpresa(rutEmpresa).then((response => {
                if (response.data != null) {
                    this.Nombre_empresa = response.data.nombre_empresa;
                    this.Ciudad_empresa = response.data.ciudades.find(obj => obj.id_ciudad == this.Id_ciudad).nombre_ciudad
                  
                }
            }))
        },
        ionState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },
        obtenerDetalles(rut) {
            solicitanteService.obtenerDetallesSolicitante(rut).then((response) => {
                console.log(response)
                if (response.request.status == 200) {
                    console.log("detalles de solicitante", response.data)
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
