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
                        <b-col class="col-7" style="font-weight:bold;"> Nombre del solicitante: </b-col>
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
                        <b-col class="col-7" style="font-weight:bold;"> Matriz: </b-col>
                        <b-col class="col-5">{{ matriz }}</b-col>
                    </b-row>
                    <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
                        <b-col class="col-7" style="font-weight:bold;"> Estado: </b-col>
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
                    <b-list-group-item v-if="cargando_orden"
                        class="d-flex align-items-center justify-content-center lsa-orange-text" style="height:100px">
                        <div>
                            <b-spinner class="align-middle"></b-spinner>
                            <strong> Cargando...</strong>
                        </div>
                    </b-list-group-item>
                    <b-list-group-item v-if="orden_compra == null && !cargando_orden" style="padding:10px" class="col-12 d-flex justify-content-around align-items-center">
                        <div class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <b-icon icon="file-earmark-break" animation="fade" variant="secondary"></b-icon>
                        <div style="font-weight:bold; color:gray">No hay orden de compra registrada para mostrar.</div>
                        </div>
                    
                    </div>
                    </b-list-group-item>
                    <b-list-group-item v-if="orden_compra != null && !cargando_orden" style="padding:10px" class="col-12 d-flex justify-content-between align-items-center">
                        <div>{{ orden_compra.nombre_original_documento }}</div>

                        <div>
                            <b-button variant="info" @click="descargarArchivo(orden_compra)" style=" height: 30px; width: 30px; border-style: none; padding: 0px; background-color: white;">
                                <b-icon-download variant="info"></b-icon-download>
                            </b-button>

                            <b-button variant="danger" @click="borrarArchivo(orden_compra)" style=" height: 30px; width: 30px; border-style: none; padding: 0px;margin-left:30px; aspect-ratio: 1;">
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
import FileSaver from 'file-saver';
export default {
    props: {
        detallesData: Object
    },
    data() {
        return {
            cargando_orden: false,
            orden_compra: "",
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
        descargarArchivo(file) {
            console.log(file)
            //let blob = file.data;
            MuestraFinanzasService.descargarOrdenCompra(file).then((response) =>{
                if(response.data != null){
                    FileSaver.saveAs(response.data, file.nombre_original_documento);
                }
            })
        },
        borrarArchivo(file){
            this.BorrandoArchivo = true;
            console.log('archivo a borrar',file)
            MuestraFinanzasService.eliminarOrdenCompra(file).then((response) =>{
                this.BorrandoArchivo = false;
                if(response.status == 200){
                    this.$bvToast.toast(`Orden de compra borrada exitosamente.`, {
                        title: 'Éxito',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "success",
                        appendToast: true
                    })
                    console.log(response)
                    this.obtenerDetalles(this.RUM);
                }
            })
        },
        obtenerOrdenCompra(){

        },
        obtenerDetalles(rum) {
            this.cargandoParametros = true;
            this.cargandoAnalistas = true;
            this.cargando_orden = true;
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
                        this.orden_compra = detalles.orden_compra;
                        this.cargando_orden = false;
                    }else{
                        this.cargando_orden = false;
                    }

                } else {
                    this.$bvToast.toast(`Error al obtener detalles de muestra.`, {
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
