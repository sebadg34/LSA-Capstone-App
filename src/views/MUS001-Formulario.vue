<template>
    <validation-observer ref="form">
        <modal_cantidadMuestra :n-muestras="nMuestras" @datosIngresados="capturarDatos"/>
        <div>
            <b-card no-body>
                <b-tabs v-model="tabIndex" small card>
                    <b-tab title="Recepcionista">Datos del recepcionista
                        <b-card>
                            <b-row class="pb-2">
                                <b-col class="col-6">
                                    <label for="Rut Recepcionista-input">Rut:</label>
                                    <ValidationProvider name="Rut Recepcionista" rules="required|rut" v-slot="validationContext">
                                      <b-form-input id="Rut Recepcionista-input" readonly class="mb-1" v-model="recepcionistaRUT" :state="getValidationState(validationContext)"></b-form-input>
                                      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                    </ValidationProvider>

                                    <label for="input-live">Recepcionista:</label>
                                    <ValidationProvider name="NombreRecepcionista" rules="required" v-slot="validationContext">
                                      <b-form-select v-model="recepcionista" :state="getValidationState(validationContext)" :options="opcionesRecepcionistas" placeholder="Seleccione un recepcionista" ></b-form-select>
                                      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                    </ValidationProvider>
                                </b-col>

                                <b-col class="col-6">
                                    <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">
                                      <label for="input-live">Rut Cliente:</label>
                                      <b-form-input class="mb-1" id="input-live" readonly v-model="rut" :state="getValidationState(validationContext)"></b-form-input>
                                      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                    </ValidationProvider>

                                    <ValidationProvider name="solicitante" rules="required" v-slot="validationContext">
                                      <label for="input-live">Cliente:</label>
                                      <b-form-select v-model="solicitante" :state="getValidationState(validationContext)" :options="opcionesClientes" placeholder="Seleccione un Cliente" ></b-form-select>
                                      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                    </ValidationProvider> 
          
                                    <ValidationProvider name="Dirección Cliente" rules="required" v-slot="validationContext">
                                      <label for="input-live">Dirección Cliente:</label>
                                      <b-form-input class="mb-1" id="input-live" v-model="direccion" :state="getValidationState(validationContext)"></b-form-input>
                                      <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                    </ValidationProvider> 
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-tab>

                    <b-tab title="Muestra">
                        Datos de la muestra
                        <b-card>
                            <b-row class="pb-2">
                                <b-col class="col-6">               
                                    <ValidationProvider name="nMuestras" rules="required|numeric" v-slot="validationContext">
                                        <label for="input-live">N° de Muestras:</label>
                                        <div class="d-flex align-items-center">    
                                            <b-form-input id="nMuestras-input" v-model="nMuestras" :state="getValidationState(validationContext)" aria-describedby="nMuestras-live-feedback"></b-form-input>
                                            <b-button @click="agregar()" variant="secondary" size="md">
                                                <b-icon class="mt-1" icon="plus-circle-fill"></b-icon>                                                
                                            </b-button>
                                        </div>
                                        <b-form-invalid-feedback id="nMuestras-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                    </ValidationProvider>
                
                                    <ValidationProvider name="fechaI" rules="required" v-slot="validationContext">
                                        <label class="mt-1" for="input-live">Fecha de Ingreso:</label>                                          
                                        <b-form-input class="mb-1" id="input-live" readonly v-model="fecha" aria-describedby="input-live-help fechaI-live-feedback" :state="getValidationState(validationContext)" placeholder="Presione el boton para agregar fecha"></b-form-input>
                                        <b-form-invalid-feedback id="fechaI-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>                    
                                    </ValidationProvider>               

                                    <ValidationProvider name="horaI" rules="required" v-slot="validationContext">
                                        <label for="input-live">Hora de Ingreso:</label>
                                        <b-form-input class="mb-1" id="input-live" readonly :state="getValidationState(validationContext)" v-model="hora" aria-describedby="input-live-help horaI-live-feedback" placeholder="Presione el botón para agregar Hra." trim></b-form-input>
                                        <b-form-invalid-feedback id="horaI-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>  
                
                                    <div>
                                        <b-button class="sm" @click="generarFechaHoraActual()">Generar Fecha & Hora de Recepción</b-button>
                                    </div>                                   
                                </b-col>
            
                                <b-col class="col-6">
                                    <ValidationProvider name="muestreado" rules="required" v-slot="validationContext">
                                        <label for="input-live">Muestreado por:</label>
                                        <b-form-select class="mt-1" id="input-live" v-model="muestreado" :options="opcionesMuestreado" aria-describedby="input-live-help muestreado-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                        <b-form-invalid-feedback id="muestreado-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>

                                    <ValidationProvider name="prioridad" rules="required" v-slot="validationContext">
                                        <label class="mt-1" for="input-live">Prioridad:</label>                    
                                        <b-form-select id="input-live" v-model="prioridad" :options="opcionesPrioridad" aria-describedby="input-live-help prioridad-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                        <b-form-invalid-feedback id="prioridad-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>
                                
                                    <ValidationProvider name="TipoMatriz" rules="required" v-slot="validationContext">
                                        <label class="mt-1" for="input-live">Tipo de Matriz:</label>
                                        <b-form-select id="input-live" v-model="TipoMatriz" :options="opcionesMatriz" aria-describedby="input-live-help TipoMatriz-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                        <b-form-invalid-feedback id="TipoMatriz-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>
                                
                                    <ValidationProvider name="observaciones" rules="required" v-slot="validationContext">
                                        <label class="mt-3" for="input-live">Observaciones:</label>
                                        <b-form-textarea id="input-live" v-model="observaciones" aria-describedby="input-live-help observaciones-live-feedback" :state="getValidationState(validationContext)"></b-form-textarea>
                                        <b-form-invalid-feedback id="observaciones-live-feedback">{{
                                            validationContext.errors[0] }}
                                        </b-form-invalid-feedback>
                                    </ValidationProvider>                
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-tab>
        
                    <b-tab title="Transportista">Datos del Transportista
                        <b-card>
                            <b-row class="pb-2">
                                <b-col class="col-6">              
                                    <label for="input-live">Rut:</label>                                    
                                        <b-form-input id="transportistaRut-input" class="mb-1" v-model="transportistaRut" aria-describedby="transportistaRut-live-feedback"></b-form-input>                              
                                    <label for="input-live">Telefono Movil:</label>                                    
                                        <b-input-group class="mb-1">
                                            <b-input-group-prepend is-text>
                                                +56 9
                                            </b-input-group-prepend>
                                            <b-form-input id="input-live" v-model="fono" aria-describedby="input-live-help fono-live-feedback"  placeholder=""></b-form-input>                                            
                                        </b-input-group>                                   
                                        <label for="input-live">Temperatura de la muestra:</label>
                                        <b-form-input class="mb-1" id="input-live" v-model="Temperatura" aria-describedby="input-live-help Temperatura-live-feedback" placeholder="" trim></b-form-input>                                                          
                                </b-col>

                                <b-col class="col-6">                                    
                                    <label for="input-live">Nombre y apellido:</label>
                                    <b-form-input class="mb-1" id="input-live" v-model="transportista" aria-describedby="input-live-help transportista-live-feedback" placeholder="" trim></b-form-input>                                                                
                                
                                    <label for="input-live">Patente:</label>
                                    <b-form-input class="mb-1" id="input-live" v-model="patente" aria-describedby="input-live-help patente-live-feedback" placeholder="" trim></b-form-input>
                                    
                                    <b-form-group id="fechaE-group" label="Fecha de entrega:" class="my-form-group" label-for="fechaE-input">
                                        <b-form-datepicker id="fechaE-input" v-model="fechaEntrega"></b-form-datepicker>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-tab>

                    <b-tab title="Parámetros">Parámetros
                        <b-card>
                            <b-row>
                                <b-col class="col-6">
                                    <b-form-group label="Seleccione una norma">
                                        <b-form-select v-model="norma" :options="opcionesNorma" placeholder="Seleccione una Norma"></b-form-select>
                                    </b-form-group>
                                </b-col>

                                <b-col class="col-6">
                                    <b-form-group label="Seleccione una tabla">
                                        <b-form-select v-model="tabla" :options="opcionesTabla" placeholder="Seleccione una Norma"></b-form-select>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="col-6">
                                    <b-form-group label="Seleccione un parámetro">
                                        <b-form-select v-model="ParametroSeleccionado" :options="opcionesParametro" placeholder="Seleccione un Parámetro" @change="agregarParametroSeleccionado"></b-form-select>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            
                            <b-row v-if="ParametrosSeleccionados.length > 0" class="mt-3">
                                <b-col>
                                  <b-form-group label="Parametros seleccionados">
                                    <div v-for="(parametro, index) in ParametrosSeleccionados" :key="index" class="d-flex align-items-center analista-item">
                                      <b-input readonly :value="parametro.nombre"></b-input>
                                      <b-button variant="danger" @click="eliminarParametroSeleccionado(index)" class="ml-2">
                                        <b-icon-trash-fill></b-icon-trash-fill>
                                      </b-button>
                                    </div>
                                  </b-form-group>
                                </b-col>
                            </b-row>
                            <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
                                El parámetro ya fue agregado.
                            </b-alert>                            
                        </b-card>
                    </b-tab>
                    <b-tab title="Asignar parámetros a muestras">Asignar parámetros a muestras                        
                        <b-card>
                            <div class="mt-5">                            
                                <b-button @click="agregar()" variant="secondary" size="md">
                                    <b-icon class="mt-1" icon="plus-circle-fill"></b-icon>                                                
                                </b-button>   
                            </div>                           
                                                     
                        </b-card>
                    </b-tab>
                </b-tabs>
            </b-card>
            <!-- Control buttons-->
            <div class="text-center">
              <b-button-group class="mt-2">
                <b-button @click="tabIndex--">Atrás</b-button>
                <b-button @click="tabIndex++">Siguiente</b-button>
              </b-button-group>          
              <div class="text-muted">Current Tab: {{ tabIndex }}</div>
              <b-button @click="enviarFormulario()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold;">
                                Recepcionar Muestra
                            </b-button>  
            </div>
        </div>
    </validation-observer>
</template>

<script>

    import MuestraService from '@/helpers/api-services/Muestra.Service';
    import modal_cantidadMuestra from '@/components/recepcionMuestra/modal_cantidadMuestra.vue';
    import ElementosService from '@/helpers/api-services/Elementos.service';
    import PersonalService from '@/helpers/api-services/Personal.service';
    import EmpresaService from '@/helpers/api-services/Empresa.service';

    export default {

        components: {
            modal_cantidadMuestra   
        },
    

        data() {
            return {
                recepcionista: '',
                recepcionistaRUT: '',
                solicitante:'',
                rut: '',
                direccion: '',
                muestreado:'',
                opcionesMuestreado: [
                { value: 'UCN-LSA', text: 'UCN-LSA' },
                { value: 'Cliente', text: 'Cliente' }],
                prioridad: null,
                opcionesPrioridad: [
                { value: 'Normal', text: 'Normal'},
                { value: 'Alta', text: 'Alta'}, 
                { value: 'Urgente', text: 'Urgente'}],
                TipoMatriz: null,
                opcionesMatriz: [
                { value: 'Agua', text: 'Agua'},
                { value: 'Tierra', text: 'Tierra'}, 
                { value: 'Mineral', text: 'Mineral'}],
                opcionesRecepcionistas: [],
                opcionesClientes: [],
                opcionesParametro:[],
                norma: '',
                opcionesNorma: [],
                tabla: '',
                opcionesTabla:[],
                ParametroSeleccionado:'',
                ParametrosSeleccionados: [],
                parametros: '',
                alertaDuplicado: false,
                transportista:'',
                Temperatura:'',
                transportistaRut:'',
                fono:'',
                fechaEntrega: '',
                observaciones:'',
                nMuestras: null,
                muestras: [],            
                fecha: "",
                hora: "",
                patente: "",
                estado: null,
                tabIndex: 0,
                identificacion: ''            
            };
        }, 

        mounted(){

            this.obtenerParametros(),
            
            PersonalService.obtenerTodosPersonal().then((response) => {
                console.log(response.data);
                if (response != null) {
                    this.recepcionistas = response.data
                    this.opcionesRecepcionistas = this.recepcionistas.map((recepcionista) => recepcionista.nombre + " " + recepcionista.apellido);
                    console.log("Los recepcionistas son: " , this.opcionesRecepcionistas);
                 }
            }),

            EmpresaService.obtenerTodasEmpresa().then((response) => {
                console.log(response.data);
                if (response != null) {
                this.empresas = response.data;
                this.opcionesClientes = this.empresas.map((empresa) => empresa.nombre_empresa);
                console.log("Los clientes son: ", this.opcionesClientes);
                }
            });
        },
        
        watch: {
            recepcionista(newValue) {                
                const recepcionistaSeleccionado = this.recepcionistas.find((recepcionista) => `${recepcionista.nombre} ${recepcionista.apellido}` === newValue);                
                if (recepcionistaSeleccionado) {                    
                    this.recepcionistaRUT = recepcionistaSeleccionado.rut_empleado;
                    
                }
            },

            solicitante(newValue) {                
                const empresaSeleccionada = this.empresas.find((empresa) => empresa.nombre_empresa === newValue);
                if (empresaSeleccionada) {
                    this.rut = empresaSeleccionada.rut_empresa;
                }
            }
        },

        methods: {

            getValidationState({
                dirty,
                validated,
                valid = null
            })
            {
                return dirty || validated ? valid : null;
            },  
        
            generarFechaHoraActual() {
                const now = new Date();
                const dia = now.getDate().toString().padStart(2, '0');
                const mes = (now.getMonth() + 1).toString().padStart(2, '0');
                const anio = now.getFullYear().toString();
                this.fecha = `${dia}/${mes}/${anio}`;
                this.hora = now.toLocaleTimeString();
            },

            agregar(){
                console.log("abirnedo modal")
                this.$bvModal.show('modal-cantidad')
            },

            agregarParametroSeleccionado() {
                if (this.ParametroSeleccionado) {
                    const parametroExistente = this.ParametrosSeleccionados.find(
                    (parametro) => parametro.nombre === this.AnalistaAsignado
                    );
                    if (parametroExistente) {
                        this.alertaDuplicado = true;
                    } else {
                        const ParametroSeleccionado = this.analistas.find((analista) => analista.nombre === this.AnalistaAsignado);
                        const metodologia = ParametroSeleccionado.nombre_metodologia;
                        this.ParametrosSeleccionados.push({nombre: this.ParametroSeleccionado});
                        console.log("esta es la metodologia: ", metodologia)
                        this.ParametroSeleccionado = '';
                        this.alertaDuplicado = false;
                    }
                }
            },

            obtenerParametros(){
                ElementosService.obtenerParametros().then((response) => {
                    if (response.data != null && response.status === 200){
                        console.log(response.data)
                    }                    
                })
            },
            
            capturarDatos(datos) {      
                this.parametros = datos.parametros;
                this.identificacion = datos.identificacion;
                this.orden = datos.orden;
                console.log("datos:", this.identificacion)                
            },

            enviarFormulario() {

                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    } else { 

                        var data = {
                            recepcionista: this.recepcionista,
                            nombre_empresa: this.solicitante,
                            direccion_empresa: this.direccion,
                            nombre_solicitante: this.solicitante,
                            muestreado_por: this.muestreado,
                            matriz: this.TipoMatriz,
                            cantidad_muestras: this.nMuestras,
                            prioridad: this.prioridad,                      
                            temperatura_transporte: this.Temperatura,
                            fecha_entrega: this.fechaEntrega,
                            nombre_transportista: this.transportista,
                            patente_vehiculo: this.patente,
                            rut_transportista: this.transportistaRut,
                            rut_empleado: this.recepcionistaRUT,       
                            telefono_transportista: this.fono,       
                            estado: 'Recepcionado',
                            observaciones: this.observaciones,
                            fecha_ingreso: this.fecha,
                            hora_ingreso: this.hora,
                            identificacion: this.identificacion,

                        }
                            
                            console.log("data a enviar", data)
                            MuestraService.ingresarMuestra(data).then((response) => {
                                console.log(response)
                                if (response != null) {
                                    if (response.status == 200) {
                                        this.$bvToast.toast(`Creación de la muestra exitosa`, {
                                            title: 'Exito',
                                            toaster: 'b-toaster-top-center',
                                            solid: true,
                                            variant: "success",
                                            appendToast: true
                                        })                                
                                    }
                                
                                    this.recepcionista = '';
                                    this.recepcionistaRUT = '';
                                    this.solicitante = '';
                                    this.rut = '';
                                    this.direccion = '';
                                    this.muestreado = '';
                                    this.prioridad = null;
                                    this.TipoMatriz = null;
                                    this.nMuestras = null;
                                    this.Temperatura = '';
                                    this.fechaEntrega = '';
                                    this.transportista = '';
                                    this.patente = '';
                                    this.transportistaRut = '';
                                    this.fono = '';
                                    this.observaciones = '';                    

                                } else {
                                    this.$bvToast.toast(`Error al agregar muestra`, {
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
            },     
    }
}
</script>