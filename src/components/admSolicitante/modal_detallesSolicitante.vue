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

        <hr />
                <div>Empresas asociadas:</div>
                <br />
                <b-list-group horizontal style="font-weight: bold;">
                    <b-list-group-item style="width:30%" class="d-flex align-items-center justify-content-center">
                    Empresas
                </b-list-group-item>
                <b-list-group-item style="width:70%" class="d-flex align-items-center justify-content-center">
                    Ciudades de empresa
                </b-list-group-item>
                </b-list-group>
               
                <b-list-group >
                    <b-list-group-item style="padding:0px; width:100%" v-for="empresa in Empresas" :key="empresa.rut_empresa">
                        <b-list-group horizontal>
                            <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%">{{ empresa.nombre_empresa }}</b-list-group-item>
                            <b-list-group-item style="padding:0px;width:70%">
                                <b-list-group>
                                    <b-list-group-item v-for="ciudad in empresa.ciudades" :key="ciudad.id_ciudad">
                                    {{ ciudad.nombre_ciudad }} - {{ ciudad.direccion }}</b-list-group-item>
                                </b-list-group>
                            </b-list-group-item>
                        </b-list-group>
                    </b-list-group-item>
                </b-list-group>
        <template #modal-footer="{ close }">

            <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                Cerrar
            </b-button>

        </template>

    </b-modal>
</validation-observer>
</template>

<script>
import solicitanteService from "@/helpers/api-services/Solicitante.service"
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
            Empresas: [],

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

        obtenerDetalles(rut) {
            solicitanteService.obtenerDetallesSolicitante(rut).then((response) => {
                console.log(response)
                if (response.request.status == 200) {
                    console.log("detalles de solicitante", response.data)
                    const empresas = response.data.detalles_empresas;
                    for (var i = 0; i < empresas.length; i++) {
                        var empresaExistente = this.Empresas.find(emp => emp.rut_empresa == empresas[i].rut_empresa);
                        if (empresaExistente == null) {
                            this.Empresas.push({
                                nombre_empresa: empresas[i].nombre_empresa,
                                rut_empresa: empresas[i].rut_empresa,
                                correo_empresa: empresas[i].correo,
                                ciudades: [{
                                    id_ciudad: empresas[i].id_ciudad,
                                    nombre_ciudad: empresas[i].nombre_ciudad,
                                    direccion: empresas[i].direccion
                                }]
                            })
                        } else {
                            empresaExistente.ciudades.push({
                                id_ciudad: empresas[i].id_ciudad,
                                nombre_ciudad: empresas[i].nombre_ciudad,
                                direccion: empresas[i].direccion
                            })
                        }

                    }
                    console.log("empresas a desplegar", this.Empresas)
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
