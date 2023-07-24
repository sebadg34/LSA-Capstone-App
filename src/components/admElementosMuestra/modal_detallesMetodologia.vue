<template>
<b-modal id="modal-detalle-metodologia" :title="`Detalles de la Metodologia`" size="lg">

    <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Detalles de la metodología</div>
        </b-row>

        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <div>
        <p v-if="this.Nombre == null">No existen detalles de la metodología o la metodología no existe.</p>
        <ul v-else>
        </ul>
        <b-row>
            <b-col class="col-12">
                <div>
                    <span style="font-weight:bold; padding-right:20px">Nombre de la metodología: </span> <span>{{ nombreMetodologia }}</span>
                </div>
                <hr />
                <div>
                    <div style="font-weight:bold; padding-right:20px">Descripción de la metodología:</div>

                    <span>{{detalleMetodologia}}</span>
                </div>
                <hr />
               
                <div>
                    <div style="font-weight:bold; padding-right:20px"> Analista(s) designado(s):</div>

                    
                    <br/>
                    <b-list-group-item v-if="loading" class="d-flex align-items-center justify-content-center lsa-orange-text" style="height:100px">
            <div >
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Cargando...</strong>
                    </div>
         </b-list-group-item>
                    <b-list-group-item v-if="listaEmpleados.length == 0 && !loading">
                     
                    <div  class="text-center lsa-light-blue-text my-2 row">
                        <div class="col">
                            <b-icon icon="person-x" animation="fade" variant="secondary"></b-icon>
                        <div style="font-weight:bold; color:gray">No hay analista(s) designado(s) para la metodología.</div>
                        </div>
                    
                    </div>
                </b-list-group-item>
                    <ul>
                        <li v-for="empleado in listaEmpleados" :key="empleado.rut_empleado">
                            {{ empleado.nombre }} {{ empleado.apellido }}
                        </li>
                    </ul>
                </div>
            </b-col>

        </b-row>
    </div>

    <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Cerrar
        </b-button>
    </template>
</b-modal>
</template>

<script>
import ElementosService from '@/helpers/api-services/Elementos.service';
export default {
    props: {
        detallesData: Object
    },
    data() {
        return {

            Nombre: '',
            Descripcion: '',
            nombreE: '',
            empleados: '',
            nombreMetodologia: '',
            listaEmpleados: '',
            detalleMetodologia: '',
            id: '',
            id_metodologia: '',
            loading: false,

        }
    },

    methods: {
        obtenerDetallesMetodologia() {
          this.loading = true;
            const data = {
                id_metodologia: this.id
            };

            ElementosService.obtenerDetallesMetodologia(data).then((response) => {
                if (response.status === 200) {
                    console.log("Obteniendo detalles:", response.data);
                    const {
                        id_metodologia,
                        nombre_metodologia,
                        detalle_metodologia,
                        empleados
                    } = response.data;
                    const detalleMetodologia = detalle_metodologia;
                    this.nombreMetodologia = nombre_metodologia;
                    this.listaEmpleados = empleados;
                    this.detalleMetodologia = detalleMetodologia;
                    this.id_metodologia = id_metodologia
                    this.loading = false;
                }
            });
        }
    },

    watch: {
        detallesData: {
            handler() {
                    this.listaEmpleados = [];
                console.log("detallesData actualizada", this.detallesData)
                this.Nombre = this.detallesData.nombre_metodologia;
                this.id = this.detallesData.id_metodologia;
                this.obtenerDetallesMetodologia()
            }
        }
    }
}
</script>
