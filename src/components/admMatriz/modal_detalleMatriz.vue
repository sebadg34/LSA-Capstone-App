<template>
<b-modal id="modal-detalle-matriz" ref="modal" :title="`Detalles de la Matriz`" size="lg">
    <template #modal-header="{ close }">
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Detalles de la matriz</div>
        </b-row>

        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <div class="p-3">
        <b-row class="pb-2">
            <b-col class="col-12">
                <div>
                    <span style="font-weight:bold; padding-right:20px"> Nombre matriz: </span> <span>{{ Nombre }}</span>
                </div>
                <hr />
                <div class="pb-2">
                    Parámetro(s) asignado(s):

                </div>

                <b-list-group horizontal>
                    <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%;font-weight: bold;">Parámetros</b-list-group-item>

                    <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:70%;font-weight: bold;">Metodologías</b-list-group-item>

                </b-list-group>
                <b-list-group>
                    <b-list-group-item v-if="loading" class="d-flex align-items-center justify-content-center lsa-orange-text" style="height:100px">
                        <div>
                            <b-spinner class="align-middle"></b-spinner>
                            <strong> Cargando...</strong>
                        </div>
                    </b-list-group-item>
                    <b-list-group v-for="parametro in this.parametros" :key="parametro.id_parametro" horizontal>
                        <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:30%">{{parametro.nombre_parametro}}</b-list-group-item>

                        <b-list-group-item style="padding:0px;width:70%">

                            <b-list-group flush>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="padding:10px" v-for="metodologia in parametro.metodologias" :key="metodologia.id_metodologia + '-' + parametro.id_parametro">
                                    <span class="pl-2"> {{ metodologia.nombre_metodologia }}</span>

                                    <b-popover placement="topleft" :target="'button-' +metodologia.id_metodologia+'-'+parametro.id_parametro" title="Descripción metodología" triggers="focus">
                                        {{ metodologia.detalle_metodologia }}
                                    </b-popover>
                                    <b-button class="boton-ojo-metodo" :id="'button-'+metodologia.id_metodologia+'-'+parametro.id_parametro">
                                        <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                                    </b-button>
                                </b-list-group-item>

                            </b-list-group>
                        </b-list-group-item>
                    </b-list-group>

                </b-list-group>

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
            parametros: [],
            id: '',
            loading: false,
        }
    },

    methods: {
        obtenerDetallesMatriz() {
            this.loading = true;
            const data = {
                id_matriz: this.id
            };
            ElementosService.obtenerDetallesMatriz(data).then((response) => {
                if (response.status === 200 & response.data != null) {
                    console.log("obteniendo detalles de la matriz:", response.data);
                    for (var i = 0; i < response.data.length; i++) {
                        var parametroExistente = this.parametros.find(param => param.id_parametro == response.data[i].id_parametro);
                        if (parametroExistente == null) {
                            this.parametros.push({
                                nombre_parametro: response.data[i].nombre_parametro,
                                id_parametro: response.data[i].id_parametro,
                                metodologias: [{
                                    nombre_metodologia: response.data[i].nombre_metodologia,
                                    id_metodologia: response.data[i].id_metodologia,
                                    detalle_metodologia: response.data[i].detalle_metodologia
                                }]
                            })
                        } else {
                            parametroExistente.metodologias.push({
                                nombre_metodologia: response.data[i].nombre_metodologia,
                                id_metodologia: response.data[i].id_metodologia,
                                detalle_metodologia: response.data[i].detalle_metodologia
                            })
                        }
                    }
                    console.log("parametros a desplegar: ", this.parametros)
                    this.loading = false;
                }
            });
        },

    },

    watch: {
        detallesData: {
            handler() {
                this.parametros = [];
                console.log("detallesData actualizada", this.detallesData);
                this.Nombre = this.detallesData.nombre_matriz;
                this.id = this.detallesData.id_matriz;
                this.obtenerDetallesMatriz();
            },
            deep: true
        }
    }
}
</script>
