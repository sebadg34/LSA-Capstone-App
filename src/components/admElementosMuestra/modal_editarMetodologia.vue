<template>
<b-modal id="modal-Editar-Metodologia" ref="modal" :title="`Editar Metodologia`" size="lg">
    <template #modal-header="{ close }">
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Editar Metodología</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <b-form-group label="Nombre de la Metodología">
        <b-form-input v-model="Nombre"></b-form-input>
    </b-form-group>

    <b-form-group label="Descripción">
        <b-form-textarea v-model="Descripción"></b-form-textarea>
    </b-form-group>

    <b-row>
        <b-col>
            <b-form-group label="Analista Asignado">
                <b-form-select v-model="AnalistaAsignado" :options="opcionesAnalista" placeholder="Seleccione un Analista" @change="agregarAnalistaSeleccionado"></b-form-select>
            </b-form-group>
        </b-col>
    </b-row>

    <b-row v-if="analistas_ya_seleccionados.length > 0" class="mt-3">
        <b-col>
            <b-form-group label="Analistas Seleccionados">
                <div v-for="(analista, index) in analistas_ya_seleccionados" :key="index" class="d-flex align-items-center analista-item">
                    <b-input readonly :value="analista.nombre"></b-input>
                    <b-button variant="danger" @click="eliminarAnalistaSeleccionado(index)" class="ml-2">
                        <b-icon-trash-fill></b-icon-trash-fill>
                    </b-button>
                </div>
            </b-form-group>
        </b-col>
    </b-row>

    <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
        El analista ya fue agregado.
    </b-alert>

    <div class="d-flex justify-content-center">
        <b-button @click="ActualizarMetodologia()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
            Editar Metodología
        </b-button>
    </div>

    <template #modal-footer="{ close }">
        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Cerrar
        </b-button>
    </template>
</b-modal>
</template>

<script>
import PersonalService from '@/helpers/api-services/Personal.service';
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {

    watch: {
        metodologiaData: {
            handler() {

                this.Nombre = this.metodologiaData.nombre_metodologia;
                this.Descripción = this.metodologiaData.detalle_metodologia;
                this.analistas_ya_seleccionados = this.metodologiaData.empleados;
                for (var i = 0; i < this.analistas_ya_seleccionados.length; i++) {
                    console.log(this.metodologiaData.empleados)
                    this.analistas_ya_en_sistema.push({
                        nombre: this.metodologiaData.empleados[i].nombre,
                        rut_empleado: this.metodologiaData.empleados[i].rut_empleado,
                    })
                }

                console.log(this.analistas_ya_seleccionados);
            }
        }
    },
    props: {
        metodologiaData: Object
    },

    data() {
        return {

            empleados_object_eliminar: [],
            Descripción: '',
            AnalistaAsignado: '',
            opcionesAnalista: [],
            analistas: [],
            analistas_ya_seleccionados: [],
            analistas_ya_en_sistema: [],
            empleados_agregar: [],
            empleados_eliminar: [],
            analistaDuplicado: false,
            alertaDuplicado: false,
            Nombre: "",

        };
    },

    mounted() {
        // TODO: Cambiar a obtenerTodosPersonal que sea Analista Quimico o Quimico
        PersonalService.obtenerTodosPersonal().then((response) => {
                console.log(response.data);
                if (response.data != null) {
                    this.analistas = response.data;
                    this.rutEmpleados = this.analistas.map((analista) => analista.rut_empleado);

                    this.opcionesAnalista = this.analistas.filter((analista) => {
                        return analista.rol === 'Analista Químico' || analista.rol === 'Químico';
                    }).map((analista) => ({
                        value: analista,
                        text: analista.nombre,
                    }));
                }
            })
            .catch((error) => {
                console.error('Error al obtener los analistas:', error);
            });
    },

    methods: {

        eliminarAnalistaSeleccionado(index) {

            if (this.analistas_ya_en_sistema.find(x => x.rut_empleado === this.analistas_ya_seleccionados[index].rut_empleado)) {
                // Se guarda registro de direcciones a eliminar en la BD
                this.empleados_eliminar.push({
                    rut_empleado: this.analistas_ya_seleccionados[index].rut_empleado
                });
                console.log('empleados a eliminar', this.empleados_eliminar)
            }
            this.analistas_ya_seleccionados.splice(index, 1)
        },
        agregarAnalistaSeleccionado(value) {

            console.log("value seleccionado", value)
            if (value) {
                const analistaExistente = this.analistas_ya_seleccionados.find(
                    (analista) => analista.rut_empleado === value.rut_empleado
                );
                if (analistaExistente) {
                    console.log("repetido!")
                    this.alertaDuplicado = true;
                } else {



                    // En caso de agregar un analista que no está registrado a la metodologia
                    var analistaAntiguo = false;
                    console.log(this.analistas_ya_en_sistema);
                    for (var i = 0; i < this.analistas_ya_en_sistema.length; i++) {
                        console.log(this.analistas_ya_en_sistema[i].rut_empleado);
                        console.log(value.rut_empleado)
                        if (this.analistas_ya_en_sistema[i].rut_empleado == value.rut_empleado) {
                            analistaAntiguo = true;
                        }
                    }
                    if (analistaAntiguo == false) {
                        console.log("analista nuevo, ingresar!");
                        this.empleados_agregar.push({
                            rut_empleado: value.rut_empleado
                        });
                    }else{
                        this.empleados_eliminar = this.empleados_eliminar.filter(empleado => empleado.rut_empleado != value.rut_empleado);
                        console.log("lista restaurada de eliminados",this.empleados_eliminar);
                    }

                    this.analistas_ya_seleccionados.push({
                        nombre: value.nombre,
                        rut_empleado: value.rut_empleado
                    });

                   // // Borrar de la lista de empleados a eliminar (empleado re ingresado)
                   // if (this.empleados_eliminar.find((empleado) => empleado.rut_empleado === value.rut_empleado)) {
                   //     this.empleados_eliminar = this.empleados_eliminar.filter(empleado => empleado.rut_empleado != value.rut_empleado);
                   // }
                    this.AnalistaAsignado = '';
                    this.alertaDuplicado = false;
                }
            }
        },

        ActualizarMetodologia() {

            var data = {
                empleados_eliminar: this.empleados_eliminar,
                empleados_agregar: this.empleados_agregar,
                nombre_metodologia: this.Nombre,
                detalle_metodologia: this.Descripción,

            }
            console.log("analistas que no cambian nada", this.analistas_ya_en_sistema)
            console.log("data a enviar", data)
            ElementosService.actualizarMetodologia(data).then((response) => {
                console.log("Respuesta del server: ", response)
                if (response != null) {
                    if (response.status == 200) {
                        this.$bvToast.toast(`Se ha editado la metodología exitosamente!`, {
                            title: 'Exito',
                            toaster: 'b-toaster-top-center',
                            solid: true,
                            variant: "success",
                            appendToast: true
                        })

                        this.$emit('metodologiaAgregada');

                        this.Nombre = '',
                            this.Descripción = '',
                            this.AnalistaAsignado = '',
                            this.opcionesAnalista = [],
                            this.analistas = [],
                            this.analistas_ya_seleccionados = [],
                            this.empleados = [],

                            this.$refs.modal.hide()
                    }
                } else {
                    this.$bvToast.toast(`Error al editar la metodología.`, {
                        title: 'Error',
                        toaster: 'b-toaster-top-center',
                        solid: true,
                        variant: "warning",
                        appendToast: true
                    })
                }
            })
        },

    },
};
</script>
