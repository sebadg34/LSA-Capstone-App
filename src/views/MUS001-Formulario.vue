<template>
    <div>

        <!-- <validation-observer ref="form"> -->
        <modal_cantidadMuestra :n-muestras="nMuestras" :objetosSeleccionados="objetosSeleccionados"
            @datosIngresados="capturarDatos" :identificaciones="identificacion" />
        <div>

            <b-card no-body>
                <div style="height:20px"></div>
                <b-row class="d-flex justify-content-center">
                    <b-col class="col-8">
                        <b-tabs active-nav-item-class="lsa-orange" no-fade v-model="tabIndex" pills card vertical
                            style="height:65vh">
                            <b-row class="d-flex justify-content-center">
                                <b-col class="col-12">

                                    <b-tab title="Recepcionista">
                                        <template #title>
                                            <b-col class="col-12">
                                                <b-row class="d-flex justify-content-between">
                                                    <b-icon v-if="!recepcionista_incompleto" icon="check-square"></b-icon>
                                                    <b-icon v-else-if="revisado" icon="exclamation-square"></b-icon>
                                                    <b-icon v-else icon="arrow-right-short"></b-icon>
                                                    <strong style="padding-left:30px">Recepcionista</strong>
                                                </b-row>
                                            </b-col>
                                        </template>
                                        <validation-observer ref="valrecepcionista">

                                            <strong> Datos del recepcionista </strong>
                                            <b-card>
                                                <b-row class="pb-2">
                                                    <b-col class="col-6">
                                                        <ValidationProvider name="Rut Recepcionista" rules="required|rut"
                                                            v-slot="validationContext">
                                                            <label for="RutRecepcionista-input">Rut:</label>
                                                            <b-form-input id="Rut Recepcionista-input" readonly
                                                                v-model="recepcionistaRUT"
                                                                :state="getValidationState(validationContext)"></b-form-input>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0]
                                                            }}</b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <ValidationProvider name="NombreRecepcionista" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Recepcionista:</label>
                                                            <b-form-input v-model="recepcionista" readonly
                                                                :state="getValidationState(validationContext)"
                                                                placeholder="Seleccione un recepcionista"></b-form-input>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0]
                                                            }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    </b-col>

                                                    <b-col class="col-6">
                                                        <ValidationProvider name="rut" rules="required|rut"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Rut solicitante:</label>
                                                            <div class="d-flex align-items-center ">
                                                                <b-input-group size="sm">
                                                                    <b-form-input id="input-live" v-model="rut"
                                                                        :state="getValidationState(validationContext)">
                                                                    </b-form-input>

                                                                    <b-input-group-append>
                                                                        <b-button class=" lsa-orange reactive-button"
                                                                            style="aspect-ratio: 1; border:none"
                                                                            @click="buscarYagregar()">
                                                                            <b-icon icon="search"></b-icon>
                                                                        </b-button>

                                                                    </b-input-group-append>

                                                                </b-input-group>

                                                            </div>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0]
                                                            }}</b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <b-alert :show="dismissCountDown" dismissible fade variant="danger"
                                                            @dismiss-count-down="countDownChanged">
                                                            El rut del solicitante no está registrado en la base de datos
                                                        </b-alert>

                                                        <ValidationProvider name="solicitante" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Nombre empresa:</label>
                                                            <b-form-select :disabled="!rutSolicitante" v-model="solicitante"
                                                                :state="getValidationState(validationContext)"
                                                                :options="opcionesClientes" value-field="rut_empresa"
                                                                text-field="nombre_empresa"
                                                                @input="actualizarSelectedEmpresa"></b-form-select>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0]
                                                            }}</b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <ValidationProvider name="Dirección Cliente" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Dirección empresa:</label>
                                                            <b-form-select :disabled="!rut_empresa" id="input-live"
                                                                v-model="direccion" :options="opcionesDireccion"
                                                                :state="getValidationState(validationContext)"
                                                                text-field="direccionConCiudad" value-field="id_ciudad">
                                                            </b-form-select>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0]
                                                            }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                        </validation-observer>
                                    </b-tab>

                                    <b-tab title="Muestra">
                                        <strong> Datos de la muestra</strong>
                                        <template #title>
                                            <b-col class="col-12">
                                                <b-row class="d-flex justify-content-between">

                                                    <b-icon v-if="!muestra_incompleto" icon="check-square"></b-icon>
                                                    <b-icon v-else-if="revisado" icon="exclamation-square"></b-icon>
                                                    <b-icon v-else icon="arrow-right-short"></b-icon>
                                                    <strong style="padding-left:30px">Muestra</strong>
                                                </b-row>
                                            </b-col>
                                        </template>
                                        <validation-observer ref="valmuestra">

                                            <b-card>
                                                <b-row class="pb-2">
                                                    <b-col class="col-6">
                                                        <ValidationProvider name="nMuestras" rules="required|numeric"
                                                            v-slot="validationContext">
                                                            <label for="input-live">N° de Muestras:</label>
                                                            <div class="d-flex align-items-center">
                                                                <b-input-group size="sm">

                                                                    <b-form-input id="nMuestras-input" v-model="nMuestras"
                                                                        :state="getValidationState(validationContext)"
                                                                        aria-describedby="nMuestras-live-feedback"></b-form-input>
                                                                    <b-input-group-append>
                                                                        <b-button style="aspect-ratio: 1; border:none"
                                                                            :disabled="!nMuestras"
                                                                            class="lsa-orange reactive-button"
                                                                            @click="agregar()" variant="secondary"
                                                                            size="md">
                                                                            <b-icon class="mt-1"
                                                                                icon="plus-circle-fill"></b-icon>
                                                                        </b-button>
                                                                    </b-input-group-append>
                                                                </b-input-group>

                                                            </div>
                                                            <b-form-invalid-feedback id="nMuestras-live-feedback">{{
                                                                validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <ValidationProvider name="fechaI" rules="required"
                                                            v-slot="validationContext">
                                                            <label class="mt-1" for="input-live">Fecha de muestreo:</label>
                                                            <b-form-datepicker
                                                                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                                                                id="input-live" v-model="fecha"
                                                                aria-describedby="input-live-help fechaI-live-feedback"
                                                                :state="getValidationState(validationContext)"
                                                                placeholder="Seleccione fecha"></b-form-datepicker>
                                                            <b-form-invalid-feedback id="fechaI-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <ValidationProvider name="hora" rules="required"
                                                            v-slot="validationContext">
                                                            <label class="mt-1" for="input-time">Hora de muestreo:</label>
                                                            <b-form-timepicker id="input-time" v-model="hora"
                                                                :state="getValidationState(validationContext)"
                                                                aria-describedby="input-live-help horaI-live-feedback"
                                                                placeholder="Ingrese hora"></b-form-timepicker>
                                                            <b-form-invalid-feedback id="horaI-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>


                                                        <ValidationProvider name="entrega" rules="required"
                                                            v-slot="validationContext"><label class="mt-1"
                                                                for="input-live">Fecha de Entrega:</label>
                                                            <b-form-datepicker
                                                                :state="getValidationState(validationContext)"
                                                                id="input-live" v-model="fechaEntrega"
                                                                placeholder="Seleccione fecha"
                                                                :min="currentDate"></b-form-datepicker>

                                                            <b-form-invalid-feedback id="entrega-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    </b-col>

                                                    <b-col class="col-6">
                                                        <ValidationProvider name="muestreado" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Muestreado por:</label>
                                                            <b-form-select id="input-live" v-model="muestreado"
                                                                :options="opcionesMuestreado"
                                                                aria-describedby="input-live-help muestreado-live-feedback"
                                                                :state="getValidationState(validationContext)"></b-form-select>
                                                            <b-form-invalid-feedback id="muestreado-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <ValidationProvider name="prioridad" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Prioridad:</label>
                                                            <b-form-select class="mt-1" id="input-live" v-model="prioridad"
                                                                :options="opcionesPrioridad"
                                                                aria-describedby="input-live-help prioridad-live-feedback"
                                                                :state="getValidationState(validationContext)"></b-form-select>
                                                            <b-form-invalid-feedback id="prioridad-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <ValidationProvider name="TipoMatriz" rules="required"
                                                            v-slot="validationContext">
                                                            <label class="mt-1" for="input-live">Tipo de Matriz:</label>
                                                            <b-form-select id="input-live" v-model="TipoMatriz"
                                                                :options="opcionesMatriz"
                                                                aria-describedby="input-live-help TipoMatriz-live-feedback"
                                                                :state="getValidationState(validationContext)"
                                                                text-field="nombre_matriz" value-field="id_matriz"
                                                            ></b-form-select>
                                                            <b-form-invalid-feedback id="TipoMatriz-live-feedback">{{
                                                                validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>

                                                        <label class="mt-1" for="input-live">Observaciones:</label>
                                                        <b-form-textarea id="input-live" v-model="observaciones"
                                                          rows="1"  aria-describedby="input-live-help observaciones-live-feedback"></b-form-textarea>
                                                    </b-col>
                                                </b-row>
                                            </b-card>

                                        </validation-observer>
                                    </b-tab>

                                    <b-tab title="Transportista">
                                        <strong>Datos del Transportista</strong>

                                        <template #title>
                                            <b-col class="col-12">
                                                <b-row class="d-flex justify-content-between">
                                                    <b-icon v-if="!transportista_incompleto" icon="check-square"></b-icon>
                                                    <b-icon v-else-if="revisado" icon="exclamation-square"></b-icon>
                                                    <b-icon v-else icon="arrow-right-short"></b-icon>
                                                    <strong style="padding-left:30px">Datos del Transportista</strong>
                                                </b-row>
                                            </b-col>
                                        </template>
                                        <validation-observer ref="valtransportista">

                                            <b-card>
                                                <b-row class="pb-2">
                                                    <b-col class="col-6">
                                                        <label for="input-live">Rut:</label>
                                                        <b-form-input id="transportistaRut-input" class="mb-1"
                                                            v-model="transportistaRut"
                                                            aria-describedby="transportistaRut-live-feedback"></b-form-input>

                                                        <label for="input-live">Temperatura de transporte:</label>
                                                        <b-form-input class="mb-1" id="input-live" v-model="Temperatura"
                                                            aria-describedby="input-live-help Temperatura-live-feedback"
                                                            placeholder="Ingrese temperatura en C°" trim></b-form-input>

                                                        <label for="input-live">Telefono Movil:</label>

                                                        <b-input-group v-for="(telefono, index) in telefonos_agregar"
                                                            :key="index" class="mb-1">
                                                            <b-input-group-prepend is-text>
                                                                +56 9
                                                            </b-input-group-prepend>
                                                            <b-form-input v-model="telefono.telefono_transportista"
                                                                aria-describedby="input-live-help fono-live-feedback"
                                                                placeholder=""></b-form-input>

                                                            <b-input-group-append>
                                                                <b-button size="sm" class="lsa-green reactive-button"
                                                                    style="aspect-ratio:1; border: none" @click="addInput"
                                                                    v-if="index === telefonos_agregar.length - 1">
                                                                    <b-icon class="mt-1" icon="plus-circle-fill"></b-icon>
                                                                </b-button>
                                                                <b-button @click="removeInput(index)" variant="danger"
                                                                    size="sm" class=" reactive-button"
                                                                    style="aspect-ratio: 1; border: none;">
                                                                    <b-icon-trash-fill></b-icon-trash-fill>
                                                                </b-button>
                                                            </b-input-group-append>

                                                        </b-input-group>
                                                        <div v-if="telefonos_agregar.length === 0">
                                                            No se han agregado teléfonos.
                                                            <b-button size="sm" class="lsa-green reactive-button"
                                                                style="aspect-ratio:1; border: none" @click="addInput">
                                                                <b-icon class="mt-1" icon="plus-circle-fill"></b-icon>
                                                            </b-button>
                                                        </div>

                                                    </b-col>

                                                    <b-col class="col-6">
                                                        <label for="input-live">Nombre y apellido:</label>
                                                        <b-form-input class="mb-1" id="input-live" v-model="transportista"
                                                            aria-describedby="input-live-help transportista-live-feedback"
                                                            placeholder="" trim></b-form-input>

                                                        <label for="input-live">Patente:</label>
                                                        <b-form-input class="mb-1" id="input-live" v-model="patente"
                                                            aria-describedby="input-live-help patente-live-feedback"
                                                            placeholder="" trim></b-form-input>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                        </validation-observer>
                                    </b-tab>

                                    <b-tab title="Parámetros">
                                        <strong> Parámetros</strong>

                                        <template #title>
                                            <b-col class="col-12">
                                                <b-row class="d-flex justify-content-between">

                                                    <b-icon v-if="!parametros_incompleto" icon="check-square"></b-icon>
                                                    <b-icon v-else-if="revisado" icon="exclamation-square"></b-icon>
                                                    <b-icon v-else icon="arrow-right-short"></b-icon>
                                                    <strong style="padding-left:30px">Parámetros</strong>
                                                </b-row>
                                            </b-col>
                                        </template>

                                        <validation-observer ref="valparametros">

                                            <b-card>
                                                <b-row>
                                                    <b-col class="col-6">
                                                        <ValidationProvider name="norma" rules="required"
                                                            v-slot="validationContext">
                                                            <b-form-group label="Seleccione una norma">
                                                                <b-form-select
                                                                    :state="getValidationState(validationContext)"
                                                                    v-model="norma"
                                                                    :options="opcionesNorma" text-field="nombre"
                                                                    value-field="id"
                                                                    @change="obtenerTablasNormas"></b-form-select>
                                                                <b-form-invalid-feedback id="norma-live-feedback">{{
                                                                    validationContext.errors[0] }}</b-form-invalid-feedback>
                                                            </b-form-group>

                                                        </ValidationProvider>
                                                    </b-col>

                                                    <b-col class="col-6">
                                                        <b-form-group label="Seleccione una tabla">
                                                            <b-form-select :disabled="!norma" v-model="tabla"
                                                                :options="opcionesTabla" value-field="id"
                                                                @change="actualizarParametrosTabla"></b-form-select>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>

                                                <b-row>
                                                    <b-col>

                                                        <label for="input-live">Seleccione un parámetro</label>
                                                        <b-input-group>

                                                            <b-form-select v-model="parametroSeleccionado"
                                                                :options="opcionesParametro"
                                                                placeholder="Seleccione un Parámetro"
                                                                :disabled="parametroDeshabilitado"
                                                                @change="agregarObjetosSeleccionados"></b-form-select>

                                                            <b-input-group-append>
                                                                <b-button size="sm" class="lsa-orange reactive-button"
                                                                    style="aspect-ratio:1; border: none"
                                                                    v-b-modal.modal-Agregar-Opciones>
                                                                    <b-icon style="color:white"
                                                                        icon="plus-circle-fill"></b-icon>
                                                                </b-button>
                                                            </b-input-group-append>

                                                        </b-input-group>
                                                    </b-col>

                                                    <b-col>
                                                        <label for="input-live">Seleccione una metodología</label>
                                                        <b-form-group>
                                                            <b-form-select v-model="metodologiaSeleccionada"
                                                                :options="opcionesMetodologia"
                                                                placeholder="Seleccione una metodología"
                                                                :disabled="metodologiaDeshabilitada"
                                                                @change="agregarObjetosSeleccionados"></b-form-select>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>

                                                <b-row v-if="objetosSeleccionados.length > 0" class="mt-3">
                                                    <b-col>
                                                        <b-form-group label="Parámetros Seleccionados:">
                                                            <div v-for="(objetos, index) in objetosSeleccionados"
                                                                :key="index"
                                                                class="d-flex align-items-center objetos-item mb-3">
                                                                <b-input readonly :value="objetos.parametro"
                                                                    class="mr-2"></b-input>
                                                                <b-input readonly :value="objetos.metodologia"
                                                                    class="mr-2"></b-input>
                                                                <b-button variant="danger"
                                                                    @click="eliminarObjetosSeleccionados(index)"
                                                                    class="ml-2">
                                                                    <b-icon-trash-fill></b-icon-trash-fill>
                                                                </b-button>
                                                            </div>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>

                                                <b-alert variant="danger" :show="alertaDuplicado" dismissible
                                                    @dismissed="alertaDuplicado = false">
                                                    El parámetro ya fue agregado.
                                                </b-alert>
                                            </b-card>
                                        </validation-observer>
                                    </b-tab>

                                    <b-tab title="Asignar parámetros a muestras">
                                        <strong> Asignar parámetros a muestras</strong>

                                        <template #title>
                                            <b-col class="col-12">
                                                <b-row class="d-flex justify-content-end">

                                                    <strong style="padding-left:30px">parámetros de muestras</strong>
                                                </b-row>
                                            </b-col>
                                        </template>

                                        <b-card>
                                            <div class="mt-5">
                                                <b-button class="lsa-orange reactive-button" @click="agregar()"
                                                    style="border: none" pill size="md">
                                                    Asignar códigos de parámetros
                                                    <b-icon icon="plus-circle-fill"></b-icon>
                                                </b-button>
                                            </div>
                                        </b-card>
                                    </b-tab>

                                </b-col>
                                <div style="position:absolute; right:20px; bottom:15px; width:45%">
                                    <b-row class=" d-flex justify-content-between">
                                        <b-col class="col-6">
                                            <b-button block class="lsa-blue reactive-button" pill
                                                @click="tabIndex--">Atrás</b-button>
                                        </b-col>
                                        <b-col class="col-6">
                                            <b-button block class="lsa-blue reactive-button" pill
                                                @click="tabIndex++">Siguiente</b-button>
                                        </b-col>

                                    </b-row>

                                    <b-button @click="enviarFormulario()" variant="primary" size="xl"
                                        class="reactive-button lsa-light-blue"
                                        style="font-weight:bold; margin-top:30px; position:absolute; width:100%; right:0px">
                                        Recepcionar Muestra
                                    </b-button>
                                </div>
                            </b-row>

                        </b-tabs>
                    </b-col>

                </b-row>

            </b-card>
            <!--
                <b-row class="d-flex justify-content-center mt-2">
                    <b-col class="col-10">
                        <b-button @click="enviarFormulario()" variant="primary" size="xl"
                                                    class="reactive-button" style="font-weight:bold;">
                                                    Recepcionar Muestra
                                                </b-button>
                    </b-col>
                </b-row>
                -->
            <!-- Control buttons-->

            <b-modal id="modal-Agregar-Opciones" ref="modal" :title="`Agregar parámetro a opciones`" size="lg"
                @shown="onModalShown">
                <template #modal-header="{ close }">
                    <b-row class="d-flex justify-content-around">
                        <div class="pl-3">Agregar Parámetros</div>
                    </b-row>
                    <button type="button" class="close" aria-label="Close" @click="close()">
                        <span aria-hidden="true" style="color:white">&times;</span>
                    </button>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group label="Seleccione un parámetro">
                            <b-form-select v-model="parametroSeleccionado" :options="TodasopcionesParametro"
                                placeholder="Seleccione un Parámetro" @change="agregarObjetosSeleccionados"></b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col>
                        <b-form-group label="Seleccione una metodología">
                            <b-form-select v-model="metodologiaSeleccionada" :options="opcionesMetodologia"
                                placeholder="Seleccione una metodología" :disabled="metodologiaDeshabilitada"
                                @change="agregarObjetosSeleccionados"></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
                    Los Parametros y Metodologias ya se encuentran agregados
                </b-alert>

                <b-alert variant="success" :show="alertaExito" dismissible @dismissed="alertaExito = false">
                    Parámetro y metodología agregada con éxito!
                </b-alert>
                <!-- //////////////////////////////////////////MODAL-FOOTER////////////////////////////////////////////////////////////////////////////////// -->
                <template #modal-footer="{ close }">
                    <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button"
                        style="font-weight:bold">
                        Cerrar
                    </b-button>
                </template>
            </b-modal>
        </div>
        <!--  </validation-observer> -->
    </div>
</template>

<script>
import MuestraService from '@/helpers/api-services/Muestra.Service';
import modal_cantidadMuestra from '@/components/recepcionMuestra/modal_cantidadMuestra.vue';
import ElementosService from '@/helpers/api-services/Elementos.service';
import PersonalService from '@/helpers/api-services/Personal.service';
//import EmpresaService from '@/helpers/api-services/Empresa.service';
import SolicitanteService from '@/helpers/api-services/Solicitante.service';
import {
    getUserInfo
} from "@/helpers/api-services/Auth.service";
import {
    isLoggedIn
} from "@/helpers/api-services/Auth.service";

export default {

    components: {
        modal_cantidadMuestra
    },

    data() {
        return {
            rutSolicitante: '',
            recepcionista: '',
            recepcionistaRUT: '',
            nombre_empresa: '',
            solicitante: '',
            rut: '',
            rut_empresa: '',
            metodologiaSeleccionada: '',
            objetosSeleccionados: [],
            direccion: '',
            direccion_empresa: '',
            muestreado: '',
            opcionesDireccion: [],
            opcionesMuestreado: [{
                value: 'UCN-LSA',
                text: 'UCN-LSA'
            },
            {
                value: 'Cliente',
                text: 'Cliente'
            }
            ],
            prioridad: null,
            opcionesPrioridad: [{
                value: 'Normal',
                text: 'Normal'
            },
            {
                value: 'Alta',
                text: 'Alta'
            },
            {
                value: 'Urgente',
                text: 'Urgente'
            }
            ],
            TipoMatriz: null,
            opcionesMatriz: [],
            opcionesRecepcionistas: [],
            opcionesClientes: [],
            opcionesParametro: [],
            norma: '',
            opcionesNorma: [],
            tabla: '',
            opcionesTabla: [],
            parametroSeleccionado: '',
            ParametrosSeleccionados: [],
            parametros: [],
            alertaDuplicado: false,
            alertaExito: false,
            alertaExiste: false,
            alertaNOexiste: false,
            transportista: '',
            Temperatura: '',
            transportistaRut: '',
            fono: '',
            fechaEntrega: '',
            observaciones: '',
            nMuestras: null,
            muestras: [],
            fecha: "",
            hora: "",
            patente: "",
            estado: null,
            tabIndex: 0,
            identificacion: [],
            telefonos_agregar: [],
            TodasopcionesParametro: [],
            submuestra_agregar: [{
                identificador: '',
                orden: '',
                id_parametro: '',
                id_metodologia: '',
            }],
            userData: '',
            dismissSecs: 2,
            dismissCountDown: 0,
            parametrosTablaSeleccionada: [],
            opcionesMetodologia: [],
            metodologiaDeshabilitada: true,
            parametroDeshabilitado: true,
            metodologias: [],
            metodologiasData: [],
            parametros_agregar: [{
                id_parametro: '',
                id_metodologia: '',
            }],
            selectedEmpresa: {
                id_ciudad: '',
                nombre_ciudad: '',
                direccion: ''
            },
            id_tabla: '',
            currentDate: new Date().toISOString().split('T')[0],
            recepcionista_incompleto: true,
            muestra_incompleto: true,
            transportista_incompleto: true,
            parametros_incompleto: true,
            revisado: false

        };
    },

    async created() {
        if (isLoggedIn()) {
            console.log('checkenado user info');
            this.userData = getUserInfo();
            console.log('data user', this.userData);
            this.recepcionista = `${this.userData.nombre} ${this.userData.apellido}`;
            this.recepcionistaRUT = `${this.userData.rut}`;
        }
    },

    mounted() {

        this.obtenerParametro();

        this.obtenerMatriz(),

        this.obtenerNormas(),

            PersonalService.obtenerTodosPersonal().then((response) => {
                console.log(response.data);
                if (response != null && response.status === 200) {
                    this.recepcionistas = response.data
                    console.log("Los recepcionistas son: ", this.recepcionistas);
                }
            });
        /*EmpresaService.obtenerTodasEmpresa().then((response) => {
            console.log(response.data);
            if (response != null) {
                this.empresas = response.data;
                this.opcionesClientes = this.empresas.map((empresa) => empresa.nombre_empresa);
                console.log("Los clientes son: ", this.opcionesClientes);
            }
        });*/
    },

    watch: {
        /*recepcionista(newValue) {                
                const recepcionistaSeleccionado = this.recepcionistas.find((recepcionista) => `${recepcionista.nombre} ${recepcionista.apellido}` === newValue);                
                if (recepcionistaSeleccionado) {                    
                    this.recepcionistaRUT = recepcionistaSeleccionado.rut_empleado;                    
                }
            },*/

        /*solicitante(newValue) {                
            const empresaSeleccionada = this.empresas.find((empresa) => empresa.nombre_empresa === newValue);
            if (empresaSeleccionada) {
                this.rut = empresaSeleccionada.rut_empresa;
            }
        },*/

        parametroSeleccionado: function (newParametro) {
            if (newParametro) {
                this.actualizarMetodologias();
                this.metodologiaDeshabilitada = false; // Habilita el input 
            } else {
                this.metodologiaDeshabilitada = true;
            }
        },

        tabla: function (nuevoValor) {
            const tablaSeleccionada = this.tablasProcesadas.find(tabla => tabla.nombre_tabla === nuevoValor);
            if (tablaSeleccionada) {
                const idTabla = tablaSeleccionada.id_tablas[0]; // Suponiendo que solo haya una id_tabla por cada nombre_tabla
                console.log("ID de tabla seleccionada:", idTabla);
                this.id_tabla = idTabla
                this.parametroDeshabilitado = false;
            } else {
                this.parametroDeshabilitado = true;
            }
        },

        direccion(newValue) {
            const direccionSeleccionada = this.opcionesDireccion.find(opcion => opcion.id_ciudad === newValue);
            if (direccionSeleccionada) {
                const direccion = direccionSeleccionada.direccion;
                console.log("Dirección seleccionada:", direccion);
                // Realiza cualquier otra acción necesaria con la dirección seleccionada
                this.direccion_empresa = direccion;
            } else {
                console.log("No se encontró la dirección seleccionada.");
            }
        },
    },

    methods: {
        getValidationState({
            dirty,
            validated,
            valid = null
        }) {
            return dirty || validated ? valid : null;
        },

        addInput() {
            this.telefonos_agregar.push({
                telefono_transportista: ''
            }); // Agregar un nuevo objeto con valor vacío
        },

        removeInput(index) {
            this.telefonos_agregar.splice(index, 1); // Eliminar el input del array "telefonos"
        },

        onModalShown() {
            this.alertaExito = false;
            this.alertaDuplicado = false;
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        buscarYagregar() {
            SolicitanteService.obtenerTodosSolicitantes().then((response) => {
                if (response.data != null && response.status === 200) {
                    this.solicitante = response.data;
                }
                const rutCliente = this.rut;
                const solicitanteEncontrado = this.solicitante.find(s => s.rut_solicitante === rutCliente);
                if (solicitanteEncontrado) {
                    this.rutSolicitante = solicitanteEncontrado.rut_solicitante;
                    console.log('Rut solicitante encontrado:', this.rutSolicitante);
                    this.detallesSolicitante();
                } else {
                    this.alertaNOexiste = true;
                    this.dismissCountDown = this.dismissSecs
                }
            })
        },

        detallesSolicitante() {
            console.log("rut a obtener: ", this.rutSolicitante)
            const data = {
                rut_solicitante: this.rutSolicitante
            };

            console.log("id a obtener: ", data)
            MuestraService.obtenerDetallesSolicitante(data).then((response) => {
                console.log("ObteniendoDetalles", response.data);
                const empresas = response.data.detalles_empresas.map(detalle => ({
                    rut_empresa: detalle.rut_empresa,
                    nombre_empresa: detalle.nombre_empresa,
                    nombre_ciudad: detalle.nombre_ciudad,
                    id_ciudad: detalle.id_ciudad,
                    direccion: detalle.direccion,
                }));
                const empresasAgrupadas = response.data.detalles_empresas.reduce((agrupadas, empresa) => {
                    // Verificar si la empresa ya existe en el array agrupadas
                    const empresaExistente = agrupadas.find(e => e.rut_empresa === empresa.rut_empresa || e.nombre_empresa === empresa.nombre_empresa);

                    if (empresaExistente) {
                        // La empresa ya existe, mezclar los datos
                        if (!empresaExistente.id_ciudad.includes(empresa.id_ciudad)) {
                            // Agregar el id_ciudad si no está presente en el array
                            empresaExistente.id_ciudad.push(empresa.id_ciudad);
                        }

                        if (!empresaExistente.nombre_ciudad.includes(empresa.nombre_ciudad)) {
                            // Agregar el nombre_ciudad si no está presente en el array
                            empresaExistente.nombre_ciudad.push(empresa.nombre_ciudad);
                        }

                        if (!empresaExistente.direccion.includes(empresa.direccion)) {
                            // Agregar la direccion si no está presente en el array
                            empresaExistente.direccion.push(empresa.direccion);
                        }
                    } else {
                        // La empresa no existe, agregarla al array agrupadas
                        empresa.id_ciudad = [empresa.id_ciudad]; // Convertir id_ciudad en un array
                        empresa.nombre_ciudad = [empresa.nombre_ciudad];
                        empresa.direccion = [empresa.direccion];
                        agrupadas.push(empresa);
                    }
                    return agrupadas;
                }, []);

                console.log("Empresas:", empresas);
                console.log("Empresas agrupadas:", empresasAgrupadas);

                this.opcionesClientes = empresasAgrupadas;
                console.log("opciones empresas", this.opcionesClientes);

                // Seleccionar la primera empresa de la lista por defecto
                if (this.opcionesClientes.length > 0) {
                    const primeraEmpresa = this.opcionesClientes[0];
                    this.selectedEmpresa.id_ciudad = primeraEmpresa.id_ciudad[0];
                    this.selectedEmpresa.nombre_ciudad = primeraEmpresa.nombre_ciudad[0];
                    this.selectedEmpresa.direccion = primeraEmpresa.direccion[0];
                }
            })
        },

        actualizarSelectedEmpresa() {
            const empresaSeleccionada = this.opcionesClientes.find(empresa =>
                empresa.rut_empresa === this.solicitante
            );
            if (empresaSeleccionada) {
                this.selectedEmpresa.id_ciudad = empresaSeleccionada.id_ciudad;
                this.selectedEmpresa.nombre_ciudad = empresaSeleccionada.nombre_ciudad;
                this.selectedEmpresa.direccion = empresaSeleccionada.direccion;
                this.opcionesDireccion = empresaSeleccionada.id_ciudad.map((idCiudad, index) => ({
                    id_ciudad: idCiudad,
                    direccion: empresaSeleccionada.direccion[index],
                    direccionConCiudad: `${empresaSeleccionada.nombre_ciudad[index]} / ${empresaSeleccionada.direccion[index]}`
                }));
                const nombreEmpresaSeleccionada = empresaSeleccionada.nombre_empresa;
                console.log("Nombre de la empresa seleccionada: ", nombreEmpresaSeleccionada);
                this.nombre_empresa = nombreEmpresaSeleccionada;
                console.log("Nombre_empresa: ", this.nombre_empresa);

                const RUTEmpresaSeleccionada = empresaSeleccionada.rut_empresa;
                console.log("RUT de la empresa seleccionada: ", RUTEmpresaSeleccionada);
                this.rut_empresa = RUTEmpresaSeleccionada;
            }
        },

        /*generarFechaHoraActual() {
                const now = new Date();
                const dia = now.getDate().toString().padStart(2, '0');
                const mes = (now.getMonth() + 1).toString().padStart(2, '0');
                const anio = now.getFullYear().toString();
                this.fecha = `${dia}/${mes}/${anio}`;
                this.hora = now.toLocaleTimeString();
            },*/
        verificarValidacionTab(value) {
            console.log(value)
        },
        agregar() {
            console.log("abirnedo modal")
            this.submuestra_agregar = [{
                identificacion: '',
                orden: '',
            }],
                this.alertaExito = false;
            this.alertaDuplicado = false;
            this.$bvModal.show('modal-cantidad')
        },

        agregarObjetosSeleccionados() {
            if (this.parametroSeleccionado && this.metodologiaSeleccionada) {
                const ParamExistente = this.objetosSeleccionados.find(objeto => objeto.parametro === this.parametroSeleccionado);
                const MetExistente = this.objetosSeleccionados.find(objeto => objeto.metodologia === this.metodologiaSeleccionada);

                if (ParamExistente && MetExistente) {
                    this.alertaDuplicado = true;
                    this.parametroSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                    this.alertaExito = false;
                } else {
                    const parametroData = this.metodologiasData.find(item => item.nombre_parametro === this.parametroSeleccionado);
                    const metodologiaCompleta = parametroData.metodologias.find(metodologia => metodologia.nombre_metodologia === this.metodologiaSeleccionada);
                    console.log("parametroData:", parametroData)
                    console.log("metodologiaCompleta:", metodologiaCompleta)
                    this.objetosSeleccionados.push({
                        id_parametro: parametroData.id_parametro,
                        parametro: this.parametroSeleccionado,
                        metodologia: metodologiaCompleta.nombre_metodologia,
                        id_metodologia: metodologiaCompleta.id_metodologia
                    });
                    this.parametros_agregar.push({
                        id_parametro: parametroData.id_parametro,
                        id_metodologia: metodologiaCompleta.id_metodologia,
                    });
                    console.log("las matrices ahn guardado lo siguiente: ", this.parametros_agregar)
                    this.parametroSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                    this.alertaDuplicado = false;
                    this.alertaExito = true;
                }
            }
        },

        obtenerParametro() {
            ElementosService.obtenerParametros().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo Parametros: ", response.data);

                    // Almacenar los datos en metodologiasData
                    this.metodologiasData = response.data.map(item => ({
                        id_parametro: item.id_parametro,
                        nombre_parametro: item.nombre_parametro,
                        metodologias: item.metodologias.map(metodologia => ({
                            id_metodologia: metodologia.id_metodologia,
                            nombre_metodologia: metodologia.nombre_metodologia
                        }))
                    }));
                    console.log("Metodologia Data: ", this.metodologiasData)
                    this.opcionesParametro = response.data.map(item => item.nombre_parametro);
                    this.TodasopcionesParametro = response.data.map(item => item.nombre_parametro);
                    console.log("opcion", this.opcionesParametro)
                }
            });
        },

        eliminarObjetosSeleccionados(index) {
            this.objetosSeleccionados.splice(index, 1);
        },

        actualizarMetodologias() {
            const parametro = this.parametroSeleccionado;

            // Buscar el objeto correspondiente al parámetro seleccionado en metodologiasData
            console.log("Metodologia Data 2: ", this.metodologiasData)
            const parametroData = this.metodologiasData.find(item => item.nombre_parametro === parametro);

            console.log("Parámetro seleccionado:", parametro);
            console.log("Objeto del parámetro seleccionado:", parametroData);
            console.log("Metodologías del parámetro seleccionado:", parametroData.metodologias);

            this.metodologias = parametroData.metodologias
            console.log("Metodologías den array:", this.metodologias);

            this.opcionesMetodologia = this.metodologias.map(item => item.nombre_metodologia);
            console.log("opciones Metodologia:", this.opcionesMetodologia);

            /*if (parametroData.metodologias.length > 0) {
              // Obtener las metodologías asociadas al parámetro seleccionado
              const metodologias = parametroData.metodologias[0].metodologias;

              console.log("Metodologías asociadas al parámetro seleccionado:", metodologias);

              // Obtener solo los nombres de las metodologías
              this.opcionesMetodologia = metodologias.map(item => item.nombre_metodologia);
            } else {
              this.opcionesMetodologia = []; // No se encontraron metodologías para el parámetro seleccionado
            }*/
        },

        capturarDatos(datos) {
            console.log("datos capturados:", datos);

            // Array para cada columna
            const identificacionArray = [];
            const ordenArray = [];
            const parametrosArray = [];
            const idparametros = [];
            const idmetodologias = [];
            const metodologiasArray = [];

            // Recorrer los datos y almacenarlos en las columnas correspondientes
            datos.forEach((objeto) => {
                identificacionArray.push(objeto.identificacion);
                ordenArray.push(objeto.orden);
                parametrosArray.push(objeto.parametros);
                idparametros.push(objeto.id_parametro);
                idmetodologias.push(objeto.id_metodologia);
                metodologiasArray.push(objeto.metodologias);
            });

            datos.forEach((objeto) => {
                this.submuestra_agregar.push({
                    identificador: objeto.identificacion,
                    orden: objeto.orden,
                    id_parametro: objeto.id_parametro,
                    id_metodologia: objeto.id_metodologia
                });
            });
            console.log("submuestra_agregar:", this.submuestra_agregar);

            // Asignar los arrays a las variables del componente
            this.identificacion = identificacionArray;
            this.orden = ordenArray;
            this.parametros = parametrosArray;
            this.id_parametro = idparametros;
            this.id_metodologia = idmetodologias;
            console.log("identificacion:", this.identificacion);
            console.log("idPARAM:", this.id_parametro);
            console.log("idMET:", this.id_metodologia);
        },

        obtenerMatriz() {
            ElementosService.obtenerMatriz().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo Matrices: ", response.data);
                    // Mapear los datos de las matrices a las opciones del select
                    this.opcionesMatriz = response.data.map(matriz => ({
                        id_matriz: matriz.id_matriz,
                        nombre_matriz: matriz.nombre_matriz
                    }));
                }
                console.log("opciones de la matriz: ", this.opcionesMatriz)
            });
        },

        obtenerNormas() {            
            ElementosService.obtenerNormas().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo normas:", response.data);
                    const normas = response.data.map(norma => ({
                        id: norma.id_norma,
                        nombre: norma.nombre_norma
                    }));
                    this.opcionesNorma = normas;
                    console.log("Las Normas son:", this.opcionesNorma);
                }
            });
        },

        obtenerTablasNormas() {
            const idNormaSeleccionada = this.norma;
            ElementosService.obtenerTablasNorma(idNormaSeleccionada).then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo tablas via norma:", response.data);

                    // Almacena las tablas agrupadas por nombre
                    const tablasAgrupadas = {};

                    // agrupar las tablas por nombre
                    response.data.forEach((tabla) => {
                        const nombreTabla = tabla.nombre_tabla;
                        const nombreParametro = tabla.nombre_parametro;

                        // Verificar si la tabla ya está en el objeto tablasAgrupadas
                        if (!tablasAgrupadas[nombreTabla]) {
                            // Si la tabla no existe, crear un nuevo objeto con el nombre de la tabla
                            tablasAgrupadas[nombreTabla] = {
                                nombre_tabla: nombreTabla,
                                id_tablas: [],
                                parametros: [],
                            };
                        }
                        // Agregar el id_tabla y el nombre_parametro a la tabla correspondiente en tablasAgrupadas
                        tablasAgrupadas[nombreTabla].id_tablas.push(tabla.id_tabla);
                        tablasAgrupadas[nombreTabla].parametros.push(nombreParametro);
                    });
                    // convertir  en un array
                    const tablasProcesadas = Object.values(tablasAgrupadas);

                    console.log("Tablas procesadas:", tablasProcesadas);

                    // Asignar las tablas procesadas a opcionesTabla
                    this.opcionesTabla = tablasProcesadas.map((tabla) => tabla.nombre_tabla);

                    // Asignar tablasProcesadas a this.tablasProcesadas
                    this.tablasProcesadas = tablasProcesadas;
                }
            });
        },

        actualizarParametrosTabla() {
            const tablaSeleccionada = this.tabla;
            // Buscar la tabla seleccionada en tablasProcesadas
            const tablaProcesada = this.tablasProcesadas.find(tabla => tabla.nombre_tabla === tablaSeleccionada);

            if (tablaProcesada) {
                const parametrosUnicos = Array.from(new Set(tablaProcesada.parametros)); // Eliminar duplicados
                this.parametrosTablaSeleccionada = parametrosUnicos.map(parametro => ({
                    nombre_parametro: parametro
                }));
                this.opcionesParametro = parametrosUnicos;
            } else {
                // Si la tabla seleccionada no se encuentra en tablasProcesadas, limpiar los parámetros
                this.parametrosTablaSeleccionada = [];
                this.opcionesParametro = [];
            }
            console.log("param", this.parametrosTablaSeleccionada);
        },

        async validarFormularios() {
            const recepValido = await this.$refs.valrecepcionista.validate();
            const muestValido = await this.$refs.valmuestra.validate()
            const transValido = await this.$refs.valtransportista.validate();
            const paramValido = await this.$refs.valparametros.validate();

            if (recepValido && muestValido && transValido && paramValido) {
                this.recepcionista_incompleto = false;
                this.muestra_incompleto = false;
                this.transportista_incompleto = false;
                this.parametros_incompleto = false;
                this.revisado = true;
                return true;
            } else {

                this.recepcionista_incompleto = !recepValido;
                this.muestra_incompleto = !muestValido;
                this.transportista_incompleto = !transValido;
                this.parametros_incompleto = !paramValido;
                this.revisado = true;
                return false;
            }
        },
        async enviarFormulario() {

            const datosValidos = await this.validarFormularios();

            if (!datosValidos) {
                return;
            } else {
                const matricesFiltradas = this.parametros_agregar.slice(1);
                const parametrosFiltrados = this.submuestra_agregar.slice(1);
                var data = {
                    rut_empresa: this.rut_empresa,
                    rut_empleado: this.recepcionistaRUT,
                    nombre_empresa: this.nombre_empresa,
                    id_ciudad: this.direccion,
                    direccion_empresa: this.direccion_empresa,
                    rut_solicitante: this.rut,
                    muestreado_por: this.muestreado,
                    cantidad_muestras: this.nMuestras,
                    prioridad: this.prioridad,
                    temperatura_transporte: this.Temperatura,
                    fecha_entrega: this.fechaEntrega,
                    fecha_muestreo: this.fecha,
                    hora_muestreo: this.hora,
                    rut_transportista: this.transportistaRut,
                    nombre_transportista: this.transportista,
                    patente_vehiculo: this.patente,
                    telefonos_agregar: this.telefonos_agregar,
                    estado: 'Recepcionado',
                    observaciones: this.observaciones,
                    parametros_agregar: matricesFiltradas.map(matriz => ({
                        id_parametro: matriz.id_parametro,
                        id_metodologia: matriz.id_metodologia,
                    })),
                    id_matriz: this.TipoMatriz,
                    id_norma: this.norma,
                    id_tabla: this.id_tabla,
                    submuestras_agregar: parametrosFiltrados
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
                        this.fecha = '';
                        this.hora = '';
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

        },
    }
}
</script>
