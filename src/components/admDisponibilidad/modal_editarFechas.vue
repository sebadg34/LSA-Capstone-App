<template>
<b-modal centered id="modal-editar-fechas" ref="modal" title="Modificar fechas" size="lg">
    <validation-observer ref="form">
        <template #modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->

            <b-row class="d-flex justify-content-around">
                <div class="pl-3">Editar fechas</div>

            </b-row>

            <button type="button" class="close" aria-label="Close" @click="close()">
                <span aria-hidden="true" style="color:white">&times;</span>
            </button>
        </template>

        <b-col class="col-6 mx-auto">
            <div style="font-weight:bold">
                Dias totales posibles:
                <span>{{ this.DiasTotablesAsignables }}</span>
            </div>
            <br/>
            <div style="font-weight:bold">
                Dias disponibles:
                <span v-if="this.DiasDisponibles == null">0</span>
                <span v-else>{{ this.DiasDisponibles }}</span>
            </div>
            <div v-if="this.FechaInicio != null && this.FechaTermino != null" style="font-weight:bold">
                Dias vacaciones actuales:
                <span v-if="this.diasVacacionesActuales <= this.DiasTotablesAsignables">{{ this.diasVacacionesActuales }}</span>
                <span v-else style="color: red">{{ this.diasVacacionesActuales }}
                <div>El numero de vacaciones no puede superar los dias totales disponibles</div>
                </span>
            </div>

            <br />
            <b-row class="d-flex justify-content-between">

                <div>Fecha inicio:
                </div>

                <ValidationProvider name="fecha inicio" rules="required" v-slot="validationContext">
                    <b-form-datepicker @input="revisarFecha" :min="hoy" @context="onContextInicio" :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" placeholder="seleccione fecha" :state="getValidationState(validationContext)" v-model="FechaInicio" id="datepicker-dateformat2" locale="es"></b-form-datepicker>
                    <b-form-invalid-feedback id="fecha-live-feedback">{{
                       validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-row>
            <b-row class="d-flex justify-content-between">
                <div>Fecha término:
                </div>
                <ValidationProvider name="fecha termino" rules="required" v-slot="validationContext">
                    <b-form-datepicker :min="FechaInicio=='' ? hoy : fechaInicioMasUno " @context="onContextTermino" :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" placeholder="seleccione fecha" :state="getValidationState(validationContext)" v-model="FechaTermino" id="datepicker-dateformat" locale="es"></b-form-datepicker>
                    <b-form-invalid-feedback id="fecha-live-feedback">{{
                       validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </b-row>
        </b-col>

    </validation-observer>
    <template #modal-footer>

        <b-button @click="enviarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
            Editar fechas y cerrar
        </b-button>

    </template>
</b-modal>
</template>

<script>
import disponibilidadService from "@/helpers/api-services/Disponibilidad.service"

export default {
    watch: {
        userData: {
            handler() {
                console.log("PROP CHANGED, UPDATE MODAL")
                this.DiasDisponibles = this.userData.dias_vacaciones_disponibles;
                this.Rut = this.userData.rut_empleado;

                if (this.userData.fecha_inicio_vacaciones != null) {
                    this.FechaInicio = this.userData.fecha_inicio_vacaciones;
                }
                if (this.userData.fecha_termino_vacaciones != null) {
                    this.FechaTermino = this.userData.fecha_termino_vacaciones;
                }
                this.calcularDiasDisponiblesTotales();
            }
        }
    },
    computed: {
        hoy(){
            const todayDate = new Date()
            todayDate.setDate(todayDate.getDate() + 1)
            return todayDate;
        },
        fechaInicioMasUno(){
          console.log("fecha inicio", this.FechaInicio)
          const inicioMasUno = new Date(this.FechaInicio)
          inicioMasUno.setDate( inicioMasUno.getDate()+2);
            return new Date(inicioMasUno);
        },
        diasVacacionesActuales() {
            if(this.FechaInicio != null && this.FechaTermino != null){
                var d1 = new Date(this.FechaInicio);
            var d2 = new Date(this.FechaTermino);
            var diff = d2.getTime() - d1.getTime();

            var daydiff = diff / (1000 * 60 * 60 * 24);
            return daydiff;
            }else{
                return 0;
            }
        },
        diasDisponiblesTotales(){
            return this.DiasDisponibles + this.diasVacacionesActuales;
        }

    },
    props: {
        userData: Object
    },
    methods: {
        calcularDiasDisponiblesTotales(){
            if(this.FechaInicio != null && this.FechaTermino != null){
                var d1 = new Date(this.FechaInicio);
            var d2 = new Date(this.FechaTermino);
            var diff = d2.getTime() - d1.getTime();

            var daydiff = diff / (1000 * 60 * 60 * 24);
            this.DiasTotablesAsignables = this.DiasDisponibles + daydiff;
            }else{
                this.DiasTotablesAsignables = this.DiasDisponibles;
            }
        }
        ,
        revisarFecha(date) {
            console.log("fecha a verificar", date)
            if (this.FechaInicio > this.FechaTermino) {
                this.FechaTermino = "";
            }
        },
        onContextInicio(ctx) {

            // Setear fecha a su version formateada de dd/mm/yyyy
            this.FechaInicioFormatted = ctx.selectedFormatted

        },
        onContextTermino(ctx) {

            // Setear fecha a su version formateada de dd/mm/yyyy
            this.FechaTerminoFormatted = ctx.selectedFormatted

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

                    var data = {
                        fecha_inicio_vacaciones: this.FechaInicioFormatted,
                        fecha_termino_vacaciones: this.FechaTerminoFormatted,
                        rut_empleado: this.Rut
                    }
                    console.log("data a enviar", data)
                    disponibilidadService.editarFechas(data).then((response) => {
                        console.log("respuesta axios", response)
                        if (response.request.status == 200) {
                            this.$bvToast.toast(`Cambio de fechas exitosa`, {
                                title: 'Exito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })
                            this.$emit('refrescar');
                            this.$bvModal.hide('modal-editar-fechas');
                        } else {
                            this.$bvToast.toast(`Error al cambiar fechas`, {
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
    data() {
        return {
            DiasDisponibles: 0,
            DiasTotablesAsignables: 0,
            CargandoArchivos: false,
            busy: false,
            Archivo: null,
            FechaInicio: "",
            FechaTermino: "",
            FechaInicioFormatted: "",
            FechaTerminoFormatted: "",
        }
    },
}
</script>

<style lang="">

</style>
