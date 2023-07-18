<template>
<b-modal centered id="modal-detalle-muestra-finanzas" :title="`Detalles de la muestra ${RUM}`" size="md" @hidden="onHidden">

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
            <br />
            <b-row class="pb-2 d-flex justify-content-around">

                <b-col class="col-12">

                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
                        <b-col class="col-7" style="font-weight:bold;"> Nombre solicitante: </b-col>
                        <b-col class="col-5">{{ nombre_solicitante + " " + apellido_solicitante }}</b-col>
                    </b-row>

                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
                        <b-col class="col-7" style="font-weight:bold;"> Empresa: </b-col>
                        <b-col class="col-5">{{ nombre_empresa }}</b-col>
                    </b-row>
                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:4px;">
                        <b-col class="col-7" style="font-weight:bold;"> Fecha de entrega: </b-col>
                        <b-col class="col-5">{{ fecha_entrega }}</b-col>
                    </b-row>
                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
                        <b-col class="col-7" style="font-weight:bold;"> matriz: </b-col>
                        <b-col class="col-5">{{ matriz }}</b-col>
                    </b-row>
                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
                        <b-col class="col-7" style="font-weight:bold;"> estado: </b-col>
                        <b-col class="col-5">{{ estado }}</b-col>
                    </b-row>

                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:4px;">
                        <b-col class="col-7" style="font-weight:bold;"> Valor neto: </b-col>
                        <b-col class="col-5">{{ valor_neto }}</b-col>
                    </b-row>

                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:4px;">
                        <b-col class="col-7" style="font-weight:bold;"> Prioridad: </b-col>
                        <b-col class="col-5">{{ prioridad }}</b-col>
                    </b-row>

                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:4px;">
                        <b-col class="col-7" style="font-weight:bold;"> Tipo de pago: </b-col>
                        <b-col class="col-5">{{ tipo_pago }}</b-col>
                    </b-row>

                    <br />
                    
                    <b-row style="padding:4px;">
                        <b-col class="col-12" style="font-weight:bold;"> Orden de compra: </b-col>
                       
                    </b-row>
                    <b-list-group-item style="padding:10px" class="col-12 d-flex justify-content-around align-items-center">
                        <div>NOMBRE_ORDEN_COMPRA</div>

                        <div>
                            <b-button variant="info" @click="descargarArchivo(file)" style=" height: 30px; width: 30px; border-style: none; padding: 0px; background-color: white;">
                                <b-icon-download variant="info"></b-icon-download>
                            </b-button>

                            <b-button variant="danger" @click="borrarArchivo(file)" style=" height: 30px; width: 30px; border-style: none; padding: 0px; aspect-ratio: 1;">
                                <b-icon icon="trash-fill"></b-icon>
                            </b-button>
                        </div>

                    </b-list-group-item>
                </b-col>

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
import MuestraFinanzasService from '@/helpers/api-services/Muestra-finanzas.service';
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
            estado: '',
            fecha_entrega: '',
            tipo_pago: '',
            matriz: '',
            valor_neto: '',
            prioridad: '',
            loading: false,
            cargandoParametros: false,
            cargandoAnalistas: false,
            showObservaciones: false,

        }
    },
    methods: {
        obtenerDetalles(rum) {
            this.cargandoParametros = true;
            this.cargandoAnalistas = true;
            MuestraFinanzasService.obtenerDetallesMuestra(rum).then((response) => {
        
                if (response != null) {
                    if (response.status == 200 && response.data != null) {
                        const detalles = response.data;
                        console.log('detalles de muestra', response.data);
                        this.numero_muestras = detalles.cantidad_muestras;
                        this.norma = detalles.norma;

                        this.valor_neto = detalles.valor_neto;
                        this.tipo_pago = detalles.tipo_pago;
                        this.muestreador = detalles.muestreado_por;

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
               
                this.RUM = this.detallesData.RUM;
                this.nombre_solicitante = this.detallesData.solicitante[0].nombre;
                this.apellido_solicitante = this.detallesData.solicitante[0].primer_apellido;
                this.nombre_empresa = this.detallesData.nombre_empresa;
                this.matriz = this.detallesData.matriz.nombre_matriz;
                this.valor_neto = this.detallesData.valor_neto;
                this.estado = this.detallesData.estado;
                this.prioridad = this.detallesData.prioridad;
                this.fecha_entrega = this.detallesData.fecha_entrega;
                this.obtenerDetalles(this.RUM);
            }
        }
    }
}
</script>
