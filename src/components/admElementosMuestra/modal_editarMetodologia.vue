<template>
      <validation-observer ref="form">
<b-modal id="modal-Editar-Metodologia" ref="modal" :title="`Editar Metodologia`" size="lg">
    <template #modal-header="{ close }">
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Editar Metodología</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>

    <ValidationProvider name="nombre de la metodología" rules="required" v-slot="validationContext">
      <label for="input-live">Nombre de la metodología:</label>
      <b-form-input id="input-live" v-model="Nombre" :state="getValidationState(validationContext)" placeholder="Ingrese nombre de la metodología" ></b-form-input>
      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>
<br/>
    <ValidationProvider name="descripción" rules="max:255" v-slot="validationContext">
      <label for="input-live">Descripción:</label>
      <b-form-textarea  rows="3"
       id="input-live" v-model="Descripción" :state="getValidationState(validationContext)" placeholder="ingrese descripción (opcional)" ></b-form-textarea>
      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>  
    <br/>
    <b-row>
        <b-col>
            <b-form-group label="Analista asignado">
                <b-form-select v-model="AnalistaAsignado" :options="opcionesAnalista" placeholder="Seleccione un Analista" @change="agregarAnalistaSeleccionado"></b-form-select>
            </b-form-group>
        </b-col>
    </b-row>

    <b-row v-if="analistas_ya_seleccionados.length > 0" class="mt-3">
        <b-col>
            <b-form-group label="Analistas seleccionados">
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

   

    <template #modal-footer>
  <b-button @click="ActualizarMetodologia()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold">
            Editar y guardar Metodología
        </b-button>
    </template>
</b-modal>
</validation-observer>
</template>

<script>
import PersonalService from '@/helpers/api-services/Personal.service';
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {

    watch: {
        metodologiaData: {
            handler() {
                console.log("comienzo a editar!")
                this.Nombre = this.metodologiaData.nombre_metodologia;
                this.Id = this.metodologiaData.id_metodologia;
                this.Descripción = this.metodologiaData.detalle_metodologia;
                this.analistas_ya_seleccionados = this.metodologiaData.empleados;

                for (var i = 0; i < this.analistas_ya_seleccionados.length; i++) {
                    this.analistas_ya_en_sistema.push({
                        nombre: this.metodologiaData.empleados[i].nombre,
                        rut_empleado: this.metodologiaData.empleados[i].rut_empleado,
                    })
                }

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
            Id: "",

        };
    },

    mounted() {
        this.obtenerAnalistas();
    },

    methods: {
        getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
        obtenerAnalistas() {
            // TODO: Cambiar a obtenerTodosPersonal que sea Analista Quimico o Quimico
            PersonalService.obtenerTodosPersonal().then((response) => {
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
        eliminarAnalistaSeleccionado(index) {

            if (this.analistas_ya_en_sistema.find(x => x.rut_empleado === this.analistas_ya_seleccionados[index].rut_empleado)) {
                // Se guarda registro de direcciones a eliminar en la BD
                this.empleados_eliminar.push({
                    rut_empleado: this.analistas_ya_seleccionados[index].rut_empleado
                });
            }else{
                // En caso de borrar un empleado nuevo, revertir el agregar de este.
                this.empleados_agregar = this.empleados_agregar.filter(empleado => empleado.rut_empleado != this.analistas_ya_seleccionados[index].rut_empleado)
            }
            this.analistas_ya_seleccionados.splice(index, 1)
        },
        agregarAnalistaSeleccionado(value) {
            if (value) {
                const analistaExistente = this.analistas_ya_seleccionados.find(
                    (analista) => analista.rut_empleado === value.rut_empleado
                );
                if (analistaExistente) {
                    this.alertaDuplicado = true;
                } else {

                    // Revisar si el analista a agregar está ya inscrito en la BD
                    const analistaAntiguo = this.analistas_ya_en_sistema.find(x => x.rut_empleado == value.rut_empleado);
                    if (analistaAntiguo == null) {
                        this.empleados_agregar.push({
                            rut_empleado: value.rut_empleado
                        });
                    } else {
                        this.empleados_eliminar = this.empleados_eliminar.filter(empleado => empleado.rut_empleado != value.rut_empleado);
                    }

                    this.analistas_ya_seleccionados.push({
                        nombre: value.nombre,
                        rut_empleado: value.rut_empleado
                    });

                 
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
                id_metodologia: this.Id,
                detalle_metodologia: this.Descripción,

            }
            ElementosService.actualizarMetodologia(data).then((response) => {
                if (response != null) {
                    if (response.status == 200) {
                        this.$bvToast.toast(`La metodología ha sido editada exitosamente`, {
                            title: 'Éxito',
                            toaster: 'b-toaster-top-center',
                            solid: true,
                            variant: "success",
                            appendToast: true
                        })

                        
                        this.$emit('refrescar');

                            this.AnalistaAsignado = ''
                            this.analistas = []
                            this.analistas_ya_seleccionados = []
                            this.empleados = []
                            this.empleados_agregar = []
                            this.empleados_eliminar = [];
                            this.analistas_ya_en_sistema = [];
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
