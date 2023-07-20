<template>
    <div>
  
        <!-- <validation-observer ref="form"> -->
          <modal_cantidadMuestra :n-muestras="nMuestras" :objetosSeleccionados="objetosSeleccionados" @datosIngresados="capturarDatos" @identificacionEliminada="identificadores" :identificaciones="identificacion" :id_submuestra="id_submuestra" :parametros="prevP" :metodologias="prevM" />
          
            <modal_agregarMetodologia/>
            <modal_agregarParametro/>
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
                                                                        :state="getValidationState(validationContext)"
                                                                        @input="buscar">
                                                                    </b-form-input>                                                                
                                                                  </b-input-group>
                                                            </div>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0]
                                                            }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <b-alert :show="dismissCountDown" dismissible fade variant="danger"
                                                            @dismiss-count-down="countDownChanged">
                                                            El rut del solicitante no está registrado en la base de datos
                                                        </b-alert>
  
                                                        <ValidationProvider name="Nombre empresa" rules="required" v-slot="validationContext">
                                                              <label for="input-live">Nombre empresa:</label>                                                            
                                                              <b-form-select v-model="rut_empresa"  
                                                              :state="getValidationState(validationContext)" 
                                                              text-field="nombre_empresa" 
                                                              value-field="rut_empresa" 
                                                              @input="actualizarOpcionesDireccion">
                                                              <option v-for="opcion in opcionesEmpresa" :key="opcion.rut_empresa" :value="opcion.rut_empresa">
                                                              {{ opcion.nombre_empresa }}</option></b-form-select>                                                                                                                                               
                                                              <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <ValidationProvider name="Dirección Cliente" rules="required" v-slot="validationContext">
                                                              <label for="input-live">Dirección empresa:</label>
                                                              <b-form-select id="input-live" v-model="direccion" :state="getValidationState(validationContext)" text-field="direccionConCiudad" value-field="id_ciudad">
                                                                  <option v-for="opcion in opcionesDireccion" :key="opcion.id_ciudad" :value="opcion.id_ciudad">
                                                                      {{ opcion.direccionConCiudad }} 
                                                                  </option>
                                                              </b-form-select>
                                                              <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
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
                                                                    
                                                                </b-input-group>
  
                                                            </div>
                                                            <b-form-invalid-feedback id="nMuestras-live-feedback">{{
                                                                validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <ValidationProvider name="fechaI" rules="required"
                                                            v-slot="validationContext">
                                                            <label class="mt-1" for="input-live">Fecha de muestreo:</label>
                                                            <b-form-datepicker
                                                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
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
                                                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                                                :state="getValidationState(validationContext)"
                                                                id="input-live" v-model="fechaEntrega"
                                                                placeholder="Seleccione fecha"
                                                                :min="currentDate"></b-form-datepicker>
  
                                                            <b-form-invalid-feedback id="entrega-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <ValidationProvider name="Forma de Pago" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Forma de pago:</label>
                                                            <b-form-select id="input-live" v-model="tipo_pago"
                                                                :options="opcionesPago"
                                                                aria-describedby="input-live-help Forma de Pago-live-feedback"
                                                                :state="getValidationState(validationContext)"></b-form-select>
                                                            <b-form-invalid-feedback id="Forma de Pago-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <ValidationProvider name="Valor Neto" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Valor neto(UF):</label>
                                                            <div class="d-flex align-items-center">
                                                                <b-input-group size="sm">
                                                                    <b-form-input id="Valor Neto-input" v-model="valor_neto"
                                                                        :state="getValidationState(validationContext)"
                                                                        aria-describedby="Valor Neto-live-feedback"></b-form-input>                                                                  
                                                                </b-input-group>
                                                            </div>
                                                            <b-form-invalid-feedback id="Valor Neto-live-feedback">{{
                                                                validationContext.errors[0] }}</b-form-invalid-feedback>
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
                                                                text-field="nombre_matriz"
                                                                value-field="id_matriz"></b-form-select>
                                                            <b-form-invalid-feedback id="TipoMatriz-live-feedback">{{
                                                                validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <ValidationProvider name="Temperatura" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Temperatura (°C):</label>
                                                            <div class="d-flex align-items-center">
                                                                <b-input-group size="sm">
                                                                    <b-form-input id="Temperatura-input" v-model="Temperatura"
                                                                        :state="getValidationState(validationContext)"
                                                                        aria-describedby="Temperatura-live-feedback"></b-form-input>                                                                  
                                                                </b-input-group>
                                                            </div>
                                                            <b-form-invalid-feedback id="Temperatura-live-feedback">{{
                                                                validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <ValidationProvider name="Cotizacion" rules="required" v-slot="validationContext">
                                                            <label class="mt-1" for="input-live">Cotización:</label>
                                                            <b-form-select id="input-live" v-model="cotizacion" :options="opcionesCotizacion" text-field="idconNombre" value-field="id_cotizacion" aria-describedby="input-live-help Cotizacion-live-feedback" :state="getValidationState(validationContext)"></b-form-select> 
                                                            <b-form-invalid-feedback id="Cotizacion-live-feedback">{{validationContext.errors[0]}}</b-form-invalid-feedback>
                                                        </ValidationProvider>  
  
                                                        <label class="mt-1" for="input-live">Observaciones:</label>
                                                        <b-form-textarea id="input-live" v-model="observaciones" rows="1"
                                                            aria-describedby="input-live-help observaciones-live-feedback"></b-form-textarea>
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
                                                      <b-form-group label="Seleccione una norma">
                                                        <b-form-select v-model="norma" 
                                                        text-field="nombre_norma"
                                                        value-field="id_norma" 
                                                        @change="obtenerTablasNormas">
                                                        <option v-for="opcion in opcionesNorma" 
                                                        :key="opcion.id_norma" 
                                                        :value="opcion.id_norma">
                                                        {{opcion.nombre_norma}}</option></b-form-select>
                                                      </b-form-group>
                                                    </b-col>
  
                                                    <b-col class="col-6">
                                                      <b-form-group label="Seleccione una tabla">
                                                        <b-form-select v-model="tabla" 
                                                          value-field="id_tabla" 
                                                          text-field="nombre_tabla" 
                                                          @input="actualizarParametrosTabla">
                                                          <option v-for="opcion in opcionesTabla" 
                                                          :key="opcion.id_tabla.toString()" 
                                                          :value="opcion.id_tabla">
                                                          {{ opcion.nombre_tabla }}</option></b-form-select>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>
  
                                                <b-row>
                                                    <b-col>
  
                                                        <label for="input-live">Seleccione un parámetro</label>
                                                        <b-input-group>
  
                                                            <b-form-select v-model="parametroTablaSeleccionado"
                                                                :options="opcionesParametro"
                                                                placeholder="Seleccione un Parámetro"
                                                                :disabled="parametroDeshabilitado"
                                                                @change="agregarObjetosTablaSeleccionados"></b-form-select>
  
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
                                                                :options="opcionesMetodologiaTabla"
                                                                placeholder="Seleccione una metodología"
                                                                :disabled="metodologiaDeshabilitada"
                                                                @change="agregarObjetosTablaSeleccionados"
                                                                value-field="nombre_metodologia" 
                                                                text-field="nombre_metodologia"></b-form-select>
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
                                  <b-tab title="Asignar analista">
  
                                      <b-card>
                                      <b-table :items="EmpleadosArray" :fields="tableFields">                                               
  
                                          <template #cell(rut_empleado)="row">
                                              <b-form-select v-model="row.item.rut_empleado" :options="formattedOpcionesAnalista" value-field="rut_empleado" text-field="nombreCompleto"></b-form-select>
                                          </template>                                               
                                      
                                          <template #cell(nombre_parametro)="row">  
                                              <b-list-group v-if="row.item.nombre_parametro.length > 0">
                                                  <b-list-group-item v-if="row.item.nombre_parametro.length > 1" v-b-toggle="'toggle-' + row.index" style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">{{ row.item.nombre_parametro[0] }}
                                                    <b-icon style="position:absolute; right:0px; top:25%; color: #949494" icon="caret-down-fill"></b-icon>
                                                  </b-list-group-item>
                                                  <b-list-group-item v-if="row.item.nombre_parametro.length === 1" style="padding:2px; border: none; border-bottom: solid 1px #dbdbdb; ">{{ row.item.nombre_parametro[0] }}</b-list-group-item>
                                                  <div v-if="row.item.nombre_parametro.length > 1">
                                                    <b-collapse :id="'toggle-' + row.index">
                                                      <b-list-group-item style="padding:2px;  border: none; border-bottom: solid 1px #dbdbdb;" v-for="(parametro, index) in row.item.nombre_parametro.slice(1)" :key="index">{{ parametro }}</b-list-group-item>
                                                    </b-collapse>
                                                  </div>
                                              </b-list-group>
                                          </template>                                                
  
                                          <template #cell(orden_de_analisis)="row">
                                              <b-input v-model="row.item.orden_de_analisis" type="number" min="1" class="small-input"></b-input>
                                          </template>
                                      
                                          <template #cell(fecha_entrega_submuestra)="row">
                                            <b-form-datepicker locale="es" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" v-model="row.item.fecha_entrega" ></b-form-datepicker>
                                          </template> 
  
                                          <template #cell(accion)="row">
                                              <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                                                  <template #button-content>
                                                      <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
                                                  </template>
                                                  <b-dropdown-item v-if="row" @click="abrirParam(row.item)">
                                                       <b-icon icon="person-plus-fill" aria-hidden="true" class="mr-2"></b-icon>Agregar Parametro
                                                  </b-dropdown-item>
                                                  <b-dropdown-item v-if="row" @click="eliminarFila(row.item)">
                                                       <b-icon icon="trash-fill" aria-hidden="true" class="mr-2"></b-icon>Eliminar fila
                                                  </b-dropdown-item>                                                                                                          
                                              </b-dropdown>
                                          </template>
                                      </b-table>
                                      <b-button @click="agregarFila">+</b-button>
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
                                        Ingresar Muestra
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
  
            <b-modal centered id="modal-Agregar-Opciones" ref="modal" :title="`Agregar parámetro a opciones`" size="lg"
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
                        <label>Seleccione un parámetro</label>
                        <b-input-group>
                            
                            <b-form-select v-model="parametroSeleccionado" :options="TodasopcionesParametro"
                                placeholder="Seleccione un Parámetro" @change="agregarObjetosSeleccionados"></b-form-select>
                            <b-input-group-append>
                                <b-button size="sm" class="lsa-orange reactive-button" style=" border: none"
                                    v-b-modal.modal-Agregar-Parametro>
                                    Nuevo
                                    <b-icon style="color:white" icon="pencil-square"></b-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
  
                    <b-col>
                        <label>Seleccione una metodología</label>
                        <b-input-group>
                           
                            <b-form-select v-model="metodologiaSeleccionada" :options="opcionesMetodologia"
                                placeholder="Seleccione una metodología" :disabled="metodologiaDeshabilitada"
                                @change="agregarObjetosSeleccionados"></b-form-select>
                            <b-input-group-append>
                                <b-button size="sm" class="lsa-orange reactive-button" style="border: none"
                                    v-b-modal.modal-Agregar-Metodologia>
                                    Nuevo
                                    <b-icon style="color:white" icon="pencil-square"></b-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
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
            <b-modal id="modal-Agregar-Parametros" ref="modal" :title="`Agregar parámetro a analista`" size="lg">
                      <template #modal-header="{ close }">
                          <b-row class="d-flex justify-content-around">
                              <div class="pl-3">Asignar Parámetros a analista</div>
                          </b-row>
                          <button type="button" class="close" aria-label="Close" @click="close()">
                              <span aria-hidden="true" style="color:white">&times;</span>
                          </button>
                      </template>
                      <b-row>
                          <b-col>
                              <b-form-group label="Seleccione un parámetro">
                                  <b-form-select v-model="parametroSeleccionadoIngreso" :options="parametros_metodologias" text-field="nombre_parametro" value-field="id_parametro" @change="agregarParametro(filaSeleccionada)"></b-form-select>
                              </b-form-group>
                          </b-col>                       
                      </b-row>
  
                      <b-row v-if="filaSeleccionada && filaSeleccionada.id_parametro.length > 0" class="mt-3">
                          <b-col>
                              <b-form-group label="Parámetros Seleccionados:">
                                  <div v-for="(id_parametro, index) in filaSeleccionada.id_parametro" :key="index" class="d-flex align-items-center objetos-item mb-3">
                                      <b-input readonly :value="getParametroNombre(id_parametro)" class="mr-2"></b-input>                                    
                                      <b-button variant="danger" @click="eliminarParametro(filaSeleccionada, index)" class="ml-2">
                                          <b-icon-trash-fill></b-icon-trash-fill>
                                      </b-button>
                                  </div>
                              </b-form-group>
                          </b-col>
                      </b-row>
                  
                      <b-alert variant="danger" :show="alertaDuplicado" dismissible @dismissed="alertaDuplicado = false">
                          El Parametro ya se encuentra agregado.
                      </b-alert>
                  
                      <b-alert variant="success" :show="alertaExito" dismissible @dismissed="alertaExito = false">
                          Parámetro agregado con éxito!
                      </b-alert>
                      <!-- //////////////////////////////////////////MODAL-FOOTER////////////////////////////////////////////////////////////////////////////////// -->
                      <template #modal-footer="{ close }">                        
                          <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                            Cerrar
                          </b-button>
                      </template>
                  </b-modal> 
        </div>
        <!--  </validation-observer> -->
    </div>
  </template>

<style>
.left-aligned-list {
  text-align: left;
}
.left-aligned-list li {
  margin-bottom: 10px; /* Ajusta el margen inferior */
}
</style>

<script>
import MuestraService from '@/helpers/api-services/Muestra.Service';
import modal_cantidadMuestra from '@/components/recepcionMuestra/modal_cantidadMuestra.vue';
import ElementosService from '@/helpers/api-services/Elementos.service';
import PersonalService from '@/helpers/api-services/Personal.service';
//import EmpresaService from '@/helpers/api-services/Empresa.service';
import SolicitanteService from '@/helpers/api-services/Solicitante.service';

import modal_agregarParametro from '@/components/recepcionMuestra/modal_agregarParametro.vue';
import modal_agregarMetodologia from '@/components/recepcionMuestra/modal_agregarMetodologia.vue';
import {
    getUserInfo
} from "@/helpers/api-services/Auth.service";
import {
    isLoggedIn
} from "@/helpers/api-services/Auth.service";

export default {

    components: {
        modal_cantidadMuestra,
        modal_agregarMetodologia,
        modal_agregarParametro
    },

    data() {
        return {
            RUM : '',
            direccionOG : "",       
            rutOG : "",
            recepcionistaOG : "",
            nMuestrasOG : "",
            fechaOG : "",
            horaOG : "",
            fechaEntregaOG : "",
            TipoMatrizOG : "",
            muestreadoOG : "",
            observacionesOG : "",
            prioridadOG : "",
            transportistaRutOG : "",
            transportistaOG : "",                      
            TemperaturaOG : "",
            patenteOG : "",
            telefonos_agregarOG : "",
            idParamOG : "",
            idMetOG : "",
            normaOG : "",
            tablaOG : "",
            nombreMatrizOG : "",
            nombreNormaOG : "",
            nombreTablaOG : "",
            prevP : [],
            prevM : [],
            subMuestra : [],
            tablaArray : [],            
            tablaItems : [],
            empleados: [],
            parametroSeleccionadoIngreso: '',
            parametrosAnalista: [],
            parametroTablaSeleccionado:'',
            submuestrasOG : [],
            empleadosOG: [],

            rutSolicitante: '',
            recepcionista: '',
            recepcionistaRUT: '',
            nombre_empresa: '',
            solicitante: '',
            rut: '',
            tipo_pago: '',
            valor_neto: '',
            id_orden_compra: '',
            rut_empresa: '',
            metodologiaSeleccionada: '',
            objetosSeleccionados: [],
            direccion: '',
            direccion_empresa: '',
            muestreado: '',
            cotizacion: '',
            analistasOptions: ['Analista 1', 'Analista 2', 'Analista 3', 'Analista 4'],
            opcionesAnalista: [],
            opcionesCotizacion: [],
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
            opcionesPago: [{
                    value: 'Efectivo',
                    text: 'Efectivo'
                },
                {
                    value: 'Tarjeta de crédito',
                    text: 'Tarjeta de crédito'
                },
                {
                    value: 'Transferencia bancaria',
                    text: 'Transferencia bancaria'
                },
                {
                    value: 'Cheque',
                    text: 'Cheque'
                },
                {
                    value: 'Otro',
                    text: 'Otro'
                }
            ],
            opcionesOrdenCompra: [],
            TipoMatriz: null,
            opcionesMatriz: [],
            opcionesRecepcionistas: [],
            opcionesClientes: [],
            opcionesEmpresa: [],
            opcionesParametro: [],
            norma: null,
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
            id_ciudad: '',
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
            parametros_ya_en_sistema: [],
            parametros_eliminar: [],
            telefonos_eliminar: [],
            submuestra_eliminar: [{
                identificador: ''
            }],
            currentDate: new Date().toISOString().split('T')[0],
            subEliminar:[],
            analista: [],
            AnalistaAsignado: '',
            analistasSeleccionados: [],
            tableFields: [
                { key: 'rut_empleado', label: 'Analista' },                
                { key: 'orden_de_analisis', label: 'Orden de análisis'},                
                { key: 'nombre_parametro', label: 'Parámetro(s)'},              
                { key: 'fecha_entrega_submuestra', label: 'Fecha Entrega'},             
                { key: 'accion', label: 'Acción'} 
            ],
            filaSeleccionada: null,
            parametrosOptions: [],
            empleados_eliminar: [],
            opcionesMetodologiaTabla: [],
            met:[],
            tablaE : [],
            EmpleadosArray: [],
            empleados_agregar : [],
            nuevaobs: [],
            empresasDirecciones: [],
            datosCargados: false,
            empleados_objeto: [],
            recepcionista_incompleto: true,
            muestra_incompleto: true,
            transportista_incompleto: true,
            parametros_incompleto: true,
            revisado: false,
            id_submuestra: [],
            parametros_metodologias: [],
            empleados_originales: []
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

        this.parametros_ya_en_sistema = [];
        this.objetosSeleccionados = [];
        this.parametros_eliminar = [];
        
        this.RUM = this.$route.query.RUM;
        MuestraService.obtenerDatosMuestra(this.RUM).then((response)=>{
            console.log("Obteniedo detalles",response.data)
            this.datos = response.data;
            this.RellenarForm(response.data);
            this.buscar();             
            
            
            const parametros = response.data.parametros_metodologias;
            console.log("parametros(data): ", parametros)

            for (var i = 0; i < parametros.length; i++) {
                this.parametros_ya_en_sistema.push({
                    id_parametro: parametros[i].id_parametro,
                    id_metodologia: parametros[i].id_metodologia,
                    nombre_parametro: parametros[i].nombre_parametro,
                    nombre_metodologia: parametros[i].nombre_metodologia,
                });
            }
            console.log("ya en sistema: ", this.parametros_ya_en_sistema)
                    
            for (var v = 0; v < this.parametros_ya_en_sistema.length; v++) {
                this.objetosSeleccionados.push({
                    parametro: this.parametros_ya_en_sistema[v].nombre_parametro,
                    metodologia: this.parametros_ya_en_sistema[v].nombre_metodologia,
                    id_parametro: this.parametros_ya_en_sistema[v].id_parametro,
                    id_metodologia: this.parametros_ya_en_sistema[v].id_metodologia
                })
            }
            console.log("param en sistema: ", this.objetosSeleccionados)
            this.obtenerTablasNormas();
            this.actualizarParametrosTabla();



        }).catch(error => {
            console.error(error);
        });
    },
    
    computed: {
        formattedOpcionesAnalista() {
          return this.opcionesAnalista.map(analista => ({
            rut_empleado: analista.rut_empleado,
            nombreCompleto: `${analista.nombre} ${analista.apellido}`
          }));
        },        
    },

    mounted() {           
        
        this.obtenerParametro();       

        this.obtenerMatriz(), 
        
        this.obtenerNormas(),     
        
        
        

        PersonalService.obtenerTodosPersonal().then((response) => {
            console.log(response.data);
            if (response.data != null) {
                this.analistas = response.data;
                this.rutEmpleados = this.analistas.map((analista) => analista.rut_empleado);
                this.opcionesAnalista = this.analistas.filter((analista) => analista.rol === "Analista Químico" || analista.rol === "Químico").map((analista) => ({
                    rut_empleado: analista.rut_empleado,
                    nombre: analista.nombre,
                    apellido: analista.apellido
                }));        
            }
            console.log("opciones analista: ", this.opcionesAnalista);
        })
        
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
                if (this.parametroSeleccionado) {
                  const parametroData = this.metodologiasData.find(item => item.nombre_parametro === this.parametroSeleccionado);
                  this.opcionesMetodologiaTabla = parametroData.metodologias.map(metodologia => metodologia.nombre_metodologia);
                } else {
                  this.opcionesMetodologiaTabla = [];
                }
                
                this.metodologiaDeshabilitada = false; // Habilita el input 
            } else {
                this.metodologiaDeshabilitada = true;
            }
        },

        parametroTablaSeleccionado: function (newParametro){
            if(newParametro){
                this.actualizarMetodologiasTabla();              
                this.metodologiaDeshabilitada = false; // Habilita el input 
            } else {
                this.metodologiaDeshabilitada = true;            
            }
        },

        tabla: function (nuevoValor) {
            const tablaSeleccionada = this.tablaArray.find(tabla => tabla.id_tabla === nuevoValor);
            console.log("entrando al watcher: ", tablaSeleccionada)
            if (tablaSeleccionada) {
              const idTabla = tablaSeleccionada.id_tabla;
              console.log("ID de tabla seleccionada:", idTabla);
              this.id_tabla = idTabla;
              this.parametroDeshabilitado = false;
            } else {
              this.parametroDeshabilitado = true;
            }
        },
               /* direccion(newValue) {
            const direccionSeleccionada = this.opcionesDireccion.find(opcion => opcion.id_ciudad === newValue);
            if (direccionSeleccionada) {
                const direccion = direccionSeleccionada.direccion;
                console.log("Dirección seleccionada:", direccion);                
                this.direccion_empresa = direccion;
            } else {
                console.log("No se encontró la dirección seleccionada.");
            }
        },*/
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
            const telefonoEliminado = this.telefonos_agregar[index].telefono_transportista;
            if (telefonoEliminado !== "") {
              this.telefonos_eliminar.push({ telefono_transportista: telefonoEliminado });
            }                   
            this.telefonos_agregar.splice(index, 1);
        },

        obtenerNombreParametro(idParametro) {
          const parametro = this.metodologiasData.find(item => item.id_parametro === idParametro);
          return parametro ? parametro.nombre_parametro : '';
        },

        getParametroNombre(id_parametro) {
            const parametro = this.parametrosOptions.find(param => param.id_parametro === id_parametro);
            return parametro ? parametro.nombre_parametro : '';
        },

        obtenerNombreMetodologia(idMetodologia) {
          for (const parametro of this.metodologiasData) {
            const metodologia = parametro.metodologias.find(item => item.id_metodologia === idMetodologia);
            if (metodologia) {
              return metodologia.nombre_metodologia;
            }
          }
          return '';
        },      

        onModalShown() {
            this.alertaExito = false;
            this.alertaDuplicado = false;
        },

        agregarFila() {
            this.EmpleadosArray.push({
                RUM: this.RUM,
                estado: 'Sin iniciar',                
                orden_de_analisis: null,
                fecha_entrega: null,
                id_parametro: '',
                nombre_parametro: '',
                rut_empleado: null,
            });
        },

        eliminarFila(fila) {
            const index = this.EmpleadosArray.indexOf(fila);
            if (index !== -1) {
              if ( fila.id_parametro == '' || fila.rut_empleado == null ) {
                  this.EmpleadosArray.splice(index, 1);

              }else{
                  this.empleados_eliminar.push(fila);
                  this.EmpleadosArray.splice(index, 1);
              }   
    
            console.log("eliminar empleados: ", this.empleados_eliminar);
            }
        },
        
        eliminarParametro(filaSeleccionada, index) {
            filaSeleccionada.id_parametro.splice(index, 1); 
            filaSeleccionada.nombre_parametro.splice(index, 1);   
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        agregarParametro(filaSeleccionada) {
            // Obtener el ID del parámetro seleccionado
            const parametroId = this.parametroSeleccionadoIngreso;
            console.log('El parámetro ID a agregar a la fila es:', parametroId);

            // Buscar el parámetro en la lista de opciones
            const parametroSeleccionado = this.parametrosOptions.find(param => param.id_parametro === parametroId);
            
            // Almacenar información anterior en variables auxiliares
            if (!(Array.isArray(filaSeleccionada.id_parametro) && Array.isArray(filaSeleccionada.nombre_parametro))) {
                filaSeleccionada.id_parametro = [filaSeleccionada.id_parametro];
                filaSeleccionada.nombre_parametro = [filaSeleccionada.nombre_parametro];
            }                  
            
            if (filaSeleccionada.id_parametro.includes(parametroSeleccionado.id_parametro) &&
              filaSeleccionada.nombre_parametro.includes(parametroSeleccionado.nombre_parametro)
            ) {
              console.log('El parámetro ya existe en la fila.');
              this.alertaDuplicado = true;
              this.alertaExito = false;
            } else {
              // Agregar el nuevo valor a los arrays existentes
              filaSeleccionada.id_parametro.push(parametroSeleccionado.id_parametro);
              filaSeleccionada.nombre_parametro.push(parametroSeleccionado.nombre_parametro);
              this.alertaExito = true;
              this.alertaDuplicado = false;
            }

            filaSeleccionada.id_parametro = filaSeleccionada.id_parametro.filter(Boolean);
            filaSeleccionada.nombre_parametro = filaSeleccionada.nombre_parametro.filter(Boolean);
        
            console.log('Parámetro agregado a la fila:', filaSeleccionada);
            console.log("nuevo array empleado: ", this.EmpleadosArray);
            console.log("empleadoOG: ", this.empleadosOG);
            
            
        },

        empleadosCoinciden(){
            for (var i = 0; i < this.EmpleadosArray.length; i++) {
                var empleado = this.EmpleadosArray[i];
                console.log("empleados for: ", empleado)
                var idParametros = empleado.id_parametro;                

                for (var j = 0; j < idParametros.length; j++) {
                  var objeto = {
                    "rut_empleado": empleado.rut_empleado,
                    "orden_de_analisis": empleado.orden_de_analisis,   
                    "id_parametro": idParametros[j], 
                    "fecha_entrega": empleado.fecha_entrega,
                    "estado": empleado.estado                  
                    
                  };        


                  console.log("Objeto " + (j + 1) + ":", objeto);
                  
                  console.log("empleados objeto: ", this.empleados_objeto)
                  console.log("empleados originales: ", this.empleados)

                  const empleadosSeleccionados = this.empleados.map((empleado) => {
                    // Extraer las propiedades deseadas del objeto original
                    const { fecha_entrega, id_parametro, orden_de_analisis, rut_empleado } = empleado;

                    // Crear un nuevo objeto solo con las propiedades deseadas
                    return { fecha_entrega, id_parametro, orden_de_analisis, rut_empleado };
                 });

                  // Mostrar la nueva variable en la consola
                    console.log("empleados seleccionados:", empleadosSeleccionados);
                    this.empleados_originales = empleadosSeleccionados
                    const objetoExistente = this.empleados_objeto.some((obj) => {
                        return (
                            objeto.rut_empleado === obj.rut_empleado &&
                            objeto.orden_de_analisis === obj.orden_de_analisis &&
                            objeto.id_parametro === obj.id_parametro &&
                            objeto.fecha_entrega === obj.fecha_entrega
                        );
                    });
                    if (!objetoExistente) {
                      this.empleados_objeto.push(objeto);
                    }
                }                
            }
            // Comparar this.empleados_objeto con empleadosSeleccionados y obtener los objetos que no coinciden
            const objetosNoCoinciden = this.empleados_objeto.filter((objetoEmpleado) => {
              // Verificar si el objeto no coincide con ninguno de los objetos en empleadosSeleccionados
              return !this.empleados_originales.some((empleadoSeleccionado) => {
                // Comprobar si los valores coinciden en las propiedades que estamos evaluando
                return (
                  objetoEmpleado.fecha_entrega === empleadoSeleccionado.fecha_entrega &&
                  objetoEmpleado.id_parametro === empleadoSeleccionado.id_parametro &&
                  objetoEmpleado.orden_de_analisis === empleadoSeleccionado.orden_de_analisis &&
                  objetoEmpleado.rut_empleado === empleadoSeleccionado.rut_empleado
                );
              });
            });

            // Mostrar el nuevo array de objetos que no coinciden en la consola
            console.log("Objetos que no coinciden:", objetosNoCoinciden);

            this.empleados_objeto = objetosNoCoinciden

            console.log("Objetos empleaods que no coinciden:", this.empleados_objeto);




        },

        mapeotelefono() {
            this.telefonos_agregarOG = this.telefonos_agregarOG.map(fono => ({
  telefono_transportista: fono.telefono_transportista
}));
console.log("telefono_transportista nuevo:", this.telefonos_agregarOG);
        },


        telefonosCoinciden() {

            

if(this.telefonos_agregar === this.telefonos_agregarOG){

    console.log("coindicen", this.telefonos_agregarOG)
}else{

    console.log("NO coindicen", this.telefonos_agregar)
    
}




            /*const elementosNoRepetidos = submuestraArray.filter(objeto => (
                !this.submuestrasOG.some(elemento => (
                    elemento.identificador === objeto.identificador &&
                    elemento.orden === objeto.orden &&
                    elemento.id_parametro === objeto.id_parametro &&
                    elemento.id_metodologia === objeto.id_metodologia
                ))
                
            ));

            console.log("elementos no repetidos:", elementosNoRepetidos);
            

            elementosNoRepetidos.forEach(objeto => {
              this.submuestra_agregar.push({
                identificador: objeto.identificador,
                orden: objeto.orden,
                id_parametro: objeto.id_parametro,
                id_metodologia: objeto.id_metodologia
              });
            });
            
            console.log("submuestras_agregar: ", this.submuestra_agregar)*/
            
},


        

        repetido(){
            const elementosNoRepetidos = this.EmpleadosArray.filter(objeto => (
                !this.empleadosOG.some(elemento => (
                  elemento.RUM === objeto.RUM &&
                  elemento.rut_empleado === objeto.rut_empleado &&
                  elemento.orden_de_analisis === objeto.orden_de_analisis &&
                  elemento.id_parametro === objeto.id_parametro &&
                  elemento.nombre_parametro === objeto.nombre_parametro &&
                  elemento.fecha_entrega === objeto.fecha_entrega
                ))
            ));

            console.log("elementos no repetidos:", elementosNoRepetidos);

            elementosNoRepetidos.forEach(objeto => {
              this.empleados_agregar.push({
                RUM: objeto.RUM,
                rut_empleado: objeto.rut_empleado,
                orden_de_analisis: objeto.orden_de_analisis,
                id_parametro: objeto.id_parametro,
                nombre_parametro: objeto.nombre_parametro,
                fecha_entrega: objeto.fecha_entrega,
              });
            });

            console.log("empleados_agregar:", this.empleados_agregar);

        },

        modificado(){
            const empleadoModificadoString = JSON.stringify(this.EmpleadosArray);
            const haSidoModificado = !this.empleadosOG.some(elemento => {
              const elementoString = JSON.stringify(elemento);
              return elementoString === empleadoModificadoString;
            
            });
            
            console.log("modificaod:",haSidoModificado)
            
        },

        obs(){
            console.log(this.observacionesOG);           

             if (this.observacionesOG.length === 0) {
                this.nuevaobs = [{
                  fecha_observacion: '',
                  hora_observacion: '',
                  observaciones: this.observaciones,
                }];

                
                console.log("primero: ",this.nuevaobs)                
               
            }else{
            const fechaObs = this.observacionesOG[0].fecha_observacion;
            console.log("fecha observacion: ", fechaObs)  
            
            const partesFecha = fechaObs.split("/");
            const dia = partesFecha[0];
            const mes = partesFecha[1];
            const anio = partesFecha[2];
                    
            // Formatear la fecha en "yyyy-mm-dd"
            const fechaFormateada = `${anio}/${mes}/${dia}`;
            console.log(fechaFormateada);

            const horaObs = this.observacionesOG[0].hora_observacion;
            console.log("fecha observacion: ", horaObs)

            const observaciones = [{
                fecha_observacion: fechaObs,
                hora_observacion: horaObs,  
                observaciones: this.observaciones,             
                          
            }]

            if (observaciones === this.observacionesOG){
                this.nuevaobs = []
            }else{

                this.nuevaobs = observaciones;
                console.log("obs nueva: ",observaciones)
            }  
            
        }

        },

        buscar(){

            const data = {
                rut_solicitante: this.rut
            };

            MuestraService.obtenerDetallesSolicitante(data).then((response) =>{
                if(response.data != null && response.status === 200){
                    console.log("obteniendo detalles", response.data.detalles_empresas)
                    const empresasSolicitante = response.data.detalles_empresas.map(empresas => ({
                        nombre_empresa: empresas.nombre_empresa,
                        rut_empresa: empresas.rut_empresa
                    }))
                    console.log("empresas Solicitante: ", empresasSolicitante)
                    this.opcionesEmpresa = empresasSolicitante;
                    console.log("opciones empresas : ", this.opcionesEmpresa)

                    const empresasDirecciones = response.data.detalles_empresas.map(empresas => ({
                        nombre_empresa: empresas.nombre_empresa,
                        rut_empresa: empresas.rut_empresa,
                        nombre_ciudad: empresas.nombre_ciudad,
                        id_ciudad: empresas.id_ciudad,
                        direccion: empresas.direccion,
                    }));
                    console.log("empresas Solicitante: ", empresasDirecciones)
                    this.empresasDirecciones = empresasDirecciones;

                }
                this.actualizarOpcionesDireccion()
                this.detallesCotizaciones();
            })           
            console.log("rut:", data)         

        },      

        actualizarOpcionesDireccion() {
            // Filtrar las direcciones correspondientes a la empresa seleccionada
            console.log(this.rut_empresa);
            console.log("opciones direccion: ", this.opcionesDireccion);
                    
            if (this.rut_empresa) {
              console.log("entrando al if");
              const empresa = this.empresasDirecciones.find(
                (elemento) => elemento.rut_empresa === this.rut_empresa
              );
              const empresaArray = [];
              empresaArray.push(empresa);
              console.log(empresaArray);
              console.log("empresa: ", empresa);
              if (empresaArray) {
                const direccion = empresaArray.map((direccion) => ({
                  id_ciudad: direccion.id_ciudad,
                  direccion: direccion.direccion,
                  direccionConCiudad: `${direccion.nombre_ciudad} / ${direccion.direccion}`
                }))[0]; // Obtener el primer elemento del array
                console.log("direccion: ", direccion);
                this.opcionesDireccion = [direccion]; // Convertir la dirección en un nuevo array
                console.log("opciones direccion: ", this.opcionesDireccion);
                const direccionEmpresa = direccion.direccion;
                this.direccion_empresa = direccionEmpresa;
                console.log("direccion empresa: ", direccionEmpresa);

                
              }
            }
        },

        /*buscarYagregar() {            
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
        },*/

        detallesCotizaciones(){
            const data = {
                rut_solicitante: this.rut
            };
            SolicitanteService.CotizacionSolicitante(data).then((response) => {
                if (response.data != null && response.status === 200){
                    console.log("cotizaciones: ", response.data)
                    this.opcionesCotizacion = response.data.map(cotizacion => ({
                        id_cotizacion: cotizacion.id_cotizacion,
                        nombre_original_documento: cotizacion.nombre_original_documento,
                        idconNombre: `${cotizacion.id_cotizacion} - ${cotizacion.nombre_original_documento}`
                        
                    }))
                    console.log("Opc. cotizaciones: ", this.opcionesCotizacion)
                }  
            })
        },

        abrirParam(row) {        
            this.filaSeleccionada = row;
            this.$bvModal.show('modal-Agregar-Parametros');
            console.log("fila", row);
        },

        /*detallesSolicitante() {
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

                this.opcionesClientes = empresasAgrupadas.map(detalle => ({
                    rut_empresa: detalle.rut_empresa,
                    nombre_empresa: detalle.nombre_empresa,
                    nombre_ciudad: detalle.nombre_ciudad,
                    id_ciudad: detalle.id_ciudad,
                    direccion: detalle.direccion,
                }));
                console.log("opciones empresas", this.opcionesClientes);
                
            })
        },*/

        /*actualizarSelectedEmpresa() {

            console.log("entre a la funcion selected empresa")
            const empresaSeleccionada = this.opcionesEmpresa.find(empresa =>
                empresa.rut_empresa === this.rut_empresa
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
        },*/

        /*generarFechaHoraActual() {
                const now = new Date();
                const dia = now.getDate().toString().padStart(2, '0');
                const mes = (now.getMonth() + 1).toString().padStart(2, '0');
                const anio = now.getFullYear().toString();
                this.fecha = `${dia}/${mes}/${anio}`;
                this.hora = now.toLocaleTimeString();
            },*/

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
            console.log("param seleccionada: ", this.parametroSeleccionado)
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

                      // En caso de agregar un parametro que no está registrado en la BD
                    const parametroAntiguo = this.parametros_ya_en_sistema.find(param => param.nombre_metodologia == this.metodologiaSeleccionada.nombre_metodologia &&
                        param.nombre_parametro == this.parametroSeleccionado.nombre_parametro);
                        if (parametroAntiguo == null) {
                            if (this.parametroSeleccionado.id_parametro && this.metodologiaSeleccionada.id_metodologia) {
                                this.parametros_agregar.push({
                                    id_parametro: this.parametroSeleccionado.id_parametro,
                                    id_metodologia: this.metodologiaSeleccionada.id_metodologia,
                                });                                
                            }
                        } else {
                            this.parametros_eliminar = this.parametros_eliminar.filter(param => param.id_metodologia !== this.metodologiaSeleccionada.id_metodologia &&
                            param.id_parametro !== this.parametroSeleccionado.id_parametro &&
                            typeof param.id_metodologia !== 'undefined' &&
                            typeof param.id_parametro !== 'undefined');
                        }

                    console.log("las matrices han guardado lo siguiente: ", this.parametros_metodologias)
                    this.parametroSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                    this.alertaDuplicado = false;
                    this.alertaExito = true;
                }
            }
        },

        agregarObjetosTablaSeleccionados() {
            console.log("param seleccionada: ", this.parametroTablaSeleccionado)
            if  (this.parametroTablaSeleccionado && this.metodologiaSeleccionada) {
                const ParamExistente = this.objetosSeleccionados.find(objeto => objeto.parametro === this.parametroTablaSeleccionado);
                const MetExistente = this.objetosSeleccionados.find(objeto => objeto.metodologia === this.metodologiaSeleccionada);
                

                if (ParamExistente && MetExistente) {
                    this.alertaDuplicado = true;
                    this.parametroTablaSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                    this.alertaExito = false;
                } else {
                    const parametroData = this.metodologiasData.find(item => item.nombre_parametro === this.parametroTablaSeleccionado);
                    const metodologiaCompleta = parametroData.metodologias.find(metodologia => metodologia.nombre_metodologia === this.metodologiaSeleccionada);
                    console.log("parametroData:", parametroData)
                    console.log("metodologiaCompleta:", metodologiaCompleta)
                    this.objetosSeleccionados.push({
                        id_parametro: parametroData.id_parametro,
                        parametro: this.parametroTablaSeleccionado,
                        metodologia: metodologiaCompleta.nombre_metodologia,
                        id_metodologia: metodologiaCompleta.id_metodologia
                    });
                    this.parametros_agregar.push({
                        id_parametro: parametroData.id_parametro,
                        id_metodologia: metodologiaCompleta.id_metodologia,
                    });

                    this.parametros_metodologias.push({
                        id_parametro: parametroData.id_parametro,
                        nombre_parametro: this.parametroTablaSeleccionado,
                    });

                    console.log ("param met:",this.parametros_metodologias)

                      // En caso de agregar un parametro que no está registrado en la BD
                    const parametroAntiguo = this.parametros_ya_en_sistema.find(param => param.nombre_metodologia == this.metodologiaSeleccionada.nombre_metodologia &&
                        param.nombre_parametro == this.parametroTablaSeleccionado.nombre_parametro);
                        if (parametroAntiguo == null) {
                            if (this.parametroTablaSeleccionado.id_parametro && this.metodologiaSeleccionada.id_metodologia) {
                                this.parametros_agregar.push({
                                    id_parametro: this.parametroTablaSeleccionado.id_parametro,
                                    id_metodologia: this.metodologiaSeleccionada.id_metodologia,
                                });
                            }
                        } else {
                            this.parametros_eliminar = this.parametros_eliminar.filter(param => param.id_metodologia !== this.metodologiaSeleccionada.id_metodologia &&
                            param.id_parametro !== this.parametroTablaSeleccionado.id_parametro &&
                            typeof param.id_metodologia !== 'undefined' &&
                            typeof param.id_parametro !== 'undefined');
                        }

                    console.log("las matrices han guardado lo siguiente: ", this.parametros_agregar)
                    this.parametroTablaSeleccionado = '';
                    this.metodologiaSeleccionada = '';
                    this.alertaDuplicado = false;
                    this.alertaExito = true;
                }
            }
        },

        agregarParametroSeleccionado(){
            if (this.parametroSeleccionadoIngreso) {
                const ParamExistente = this.parametrosAnalista.find(objeto => objeto.id_parametro === this.parametroSeleccionadoIngreso);
    
                if (ParamExistente) {
                    this.alertaDuplicado = true;
                    this.parametroSeleccionadoIngreso = '';
                } else {
                    const parametroData = this.metodologiasData.find(item => item.nombre_parametro === this.parametroSeleccionadoIngreso);
                
                    this.parametrosAnalista.push({ 
                        id_parametro: parametroData.id_parametro,
                        parametro: this.parametroSeleccionadoIngreso, });             
                
                    this.alertaDuplicado = false;
                    console.log("parametros analista: ", this.parametrosAnalista)
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
                    this.parametrosOptions = response.data.map(parametro => ({
                        id_parametro: parametro.id_parametro,
                        nombre_parametro: parametro.nombre_parametro
                    }))
                    console.log("opcion", this.opcionesParametro)

                    // Buscar nombres de parámetro en base a los IDs
                    const nombresParametro = this.idParamOG.map((id) => {
                      const parametro = response.data.find((item) => item.id_parametro === id);
                      return parametro ? parametro.nombre_parametro : null;
                    });
                    console.log("nombres parametros: ", nombresParametro)
                    this.prevP = nombresParametro
                    console.log("nombres P: ", this.prevP)

                    // Buscar nombres de metodología en base a los IDs
                    const nombresMetodologia = this.idMetOG.map((id) => {
                      const metodologia = response.data.find((item) => item.metodologias.some((m) => m.id_metodologia === id));
                      return metodologia ? metodologia.metodologias.find((m) => m.id_metodologia === id).nombre_metodologia : null;
                    });
                    console.log("nombres metodologias: ", nombresMetodologia)
                    this.prevM = nombresMetodologia
                    console.log("nombres M: ", this.prevM)

                    const nuevaVariable = JSON.parse(JSON.stringify(this.empleados));
                    nuevaVariable.forEach(objeto => {
                      objeto.nombre_parametro = [objeto.nombre_parametro];
                      objeto.id_parametro = [objeto.id_parametro];
                      this.EmpleadosArray.push(objeto);                      
                    });
                    console.log("EmpleadosARRAY: ", this.EmpleadosArray);                   
                }
            });
        },

        eliminarObjetosSeleccionados(index) {
            console.log(this.objetosSeleccionados[index])
            const yaEnSistema = this.parametros_ya_en_sistema.find(param => param.nombre_metodologia == this.objetosSeleccionados[index].metodologia &&
                param.nombre_parametro == this.objetosSeleccionados[index].parametro);
            console.log(yaEnSistema)
            if (yaEnSistema != null) {

                this.parametros_eliminar.push({
                    id_parametro: yaEnSistema.id_parametro,
                    id_metodologia: yaEnSistema.id_metodologia
                })
              
            } else {
                this.parametros_agregar = this.parametros_agregar.filter(param => param.id_metodologia != this.objetosSeleccionados[index].id_metodologia &&
                    param.id_parametro != this.objetosSeleccionados[index].id_parametro)
                    console.log(this.parametros_agregar)
            }
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
       

        identificadores(datos) {
            console.log("identificador de submuestras capturados:", datos);

            const identificacionEliminada = datos.map(objeto => objeto);
            console.log("id:", identificacionEliminada);

            const subEliminarAntes = this.submuestra_eliminar.length - 1;

            identificacionEliminada.forEach(id_submuestra => {
              // Verificar si la submuestra ya existe en submuestra_eliminar
              const existe = this.submuestra_eliminar.some(submuestra => submuestra.id_submuestra === id_submuestra);
              if (!existe) {
                this.submuestra_eliminar.push({ id_submuestra: id_submuestra });
              }
            });
            console.log("submuestra_eliminar:", this.submuestra_eliminar);
        
            const subEliminar = this.submuestra_eliminar.slice(1);
            this.subEliminar = subEliminar
        
            console.log("sub eliminadas filtradas: ", subEliminar);
            console.log("sub eliminadas largo: ", subEliminar.length);
        
            const subEliminarDespues = subEliminar.length;
        
            if (subEliminarDespues > subEliminarAntes) {
              const cantidadCambios = subEliminarDespues - subEliminarAntes;
              this.nMuestras -= cantidadCambios;
              this.nMuestras = this.nMuestras.toString();
            }
        
            console.log("cantidad muestras: ", this.nMuestras);
        },

        capturarDatos(datos) {
            console.log("datos capturados:", datos);

            // Array para cada columna
            const identificacionArray = [];
            const ordenArray = [];            
            const idparametros = [];
            const idmetodologias = [];
            const submuestraArray = [];                        

            // Recorrer los datos y almacenarlos en las columnas correspondientes
            datos.forEach((objeto) => {                
                identificacionArray.push(objeto.identificador);
                ordenArray.push(objeto.orden);               
                idmetodologias.push(objeto.id_metodologia);
                idparametros.push(objeto.id_parametro);               
            });            

            datos.forEach((objeto) => {
                submuestraArray.push({
                    identificador: objeto.identificador,
                    orden: objeto.orden,
                    id_parametro: objeto.id_parametro,
                    id_metodologia: objeto.id_metodologia
                                });
            });

            console.log("submuestra_original: ", this.submuestrasOG)            
            console.log("submuestras: ", submuestraArray)                       

            for (let i = 0; i < this.submuestrasOG.length; i++) {
                const elementoRepetido = submuestraArray.find(objeto => (
                  objeto.identificador === this.submuestrasOG[i].identificador &&
                  objeto.orden === this.submuestrasOG[i].orden &&
                  objeto.id_parametro === this.submuestrasOG[i].id_parametro &&
                  objeto.id_metodologia === this.submuestrasOG[i].id_metodologia
                ));

                if (elementoRepetido) {
                  console.log("elemento repetido:", elementoRepetido);
                }
            }

            const elementosNoRepetidos = submuestraArray.filter(objeto => (
                !this.submuestrasOG.some(elemento => (
                    elemento.identificador === objeto.identificador &&
                    elemento.orden === objeto.orden &&
                    elemento.id_parametro === objeto.id_parametro &&
                    elemento.id_metodologia === objeto.id_metodologia
                ))
                
            ));

            console.log("elementos no repetidos:", elementosNoRepetidos);
            

            elementosNoRepetidos.forEach(objeto => {
              this.submuestra_agregar.push({
                identificador: objeto.identificador,
                orden: objeto.orden,
                id_parametro: objeto.id_parametro,
                id_metodologia: objeto.id_metodologia
              });
            });
            
            console.log("submuestras_agregar: ", this.submuestra_agregar)
            
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
                    const matrizSeleccionada = this.opcionesMatriz.find(matriz => matriz.id_matriz === this.TipoMatrizOG);
                    if (matrizSeleccionada) {
                        this.nombreMatrizOG = matrizSeleccionada.nombre_matriz;
                    }
                }
                console.log("opciones de la matriz: ", this.opcionesMatriz)
            });
        },

        obtenerNormas() {            
            ElementosService.obtenerNormas().then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo normas:", response.data);
                    const normas = response.data.map(norma => ({
                        id_norma: norma.id_norma,
                        nombre_norma: norma.nombre_norma
                    }));
                    this.opcionesNorma = normas;

                    const normaSeleccionada = this.opcionesNorma.find(norma => norma.id_norma === this.normaOG);
                    if (normaSeleccionada) {
                        this.nombreNormaOG = normaSeleccionada.nombre_norma;
                    }
                    console.log("Las Normas son:", this.opcionesNorma);
                    console.log("norma nombre: ", this.NormaOG)
                }
            });
        },

        obtenerTablasNormas() {
            const idNormaSeleccionada = this.norma;
            ElementosService.obtenerTablasNorma(idNormaSeleccionada).then((response) => {
                if (response.data != null && response.status === 200) {
                    console.log("Obteniendo tablas via norma:", response.data);

                    const tablaArray = [];
                    // Iterar sobre la respuesta y agrupar las tablas por id_tabla
                    response.data.forEach(tabla => {
                      const tablaExistente = tablaArray.find(t => t.id_tabla === tabla.id_tabla);
                    
                      if (tablaExistente) {
                        // Si ya existe una tabla con el mismo id_tabla, agregar los datos correspondientes
                        tablaExistente.parametros.push({
                          id_parametro: tabla.id_parametro,
                          nombre_parametro: tabla.nombre_parametro
                        });
                    
                        tablaExistente.metodologias.push({
                          id_metodologia: tabla.id_metodologia,
                          nombre_metodologia: tabla.nombre_metodologia
                        });
                      } else {
                        // Si no existe una tabla con el mismo id_tabla, crear un nuevo objeto
                        const nuevaTabla = {
                          id_tabla: tabla.id_tabla,
                          nombre_tabla: tabla.nombre_tabla,
                          parametros: [
                            {
                              id_parametro: tabla.id_parametro,
                              nombre_parametro: tabla.nombre_parametro
                            }
                          ],
                          metodologias: [
                            {
                              id_metodologia: tabla.id_metodologia,
                              nombre_metodologia: tabla.nombre_metodologia
                            }
                          ]
                        };
                        tablaArray.push(nuevaTabla);
                        this.opcionesTabla = tablaArray

                    console.log("opciones tabla: ",this.opcionesTabla)
                      }
                    });

                    console.log(tablaArray);
                    this.tablaArray = tablaArray;
                    
                }
            });
        },

        actualizarParametrosTabla() {
            const tablaSeleccionada = this.tabla;
            console.log("Tabla seleccionada:", tablaSeleccionada);    
            
            if (tablaSeleccionada) {
              const idTabla = tablaSeleccionada;
              console.log("ID de tabla seleccionada:", idTabla);
              this.id_tabla = idTabla;
              this.parametroDeshabilitado = false;
            } else {
              this.parametroDeshabilitado = true;
            }

            const tablaEncontrada = this.tablaArray.find(tabla => tabla.id_tabla === tablaSeleccionada);
            this.tablaE = tablaEncontrada            

            if (tablaEncontrada) {
                console.log("tabla encontrada: ", tablaEncontrada)
              const parametros = tablaEncontrada.parametros.map(parametro => ({
                id_parametro: parametro.id_parametro,
                nombre_parametro: parametro.nombre_parametro
              }));
          
              const metodologias = tablaEncontrada.metodologias.map(metodologia => ({
                id_metodologia: metodologia.id_metodologia,
                nombre_metodologia: metodologia.nombre_metodologia
              }));
              console.log("metodologias de la tabla seleccionada: ", metodologias)
               this.met = metodologias;
          
              this.parametrosTablaSeleccionada = parametros;
              this.opcionesParametro = parametros.map(parametro => parametro.nombre_parametro);
              this.opcionesMetodologiaTabla = metodologias.map(metodologia => metodologia.nombre_metodologia);                           
              
            } else {
              this.parametrosTablaSeleccionada = [];
              this.opcionesParametro = [];
              this.opcionesMetodologiaTabla = [];
            }        
        
            console.log("Parámetros de la tabla seleccionada:", this.parametrosTablaSeleccionada);
            
        },

        actualizarMetodologiasTabla(){
            console.log("parametrotablaseleccionado: ", this.parametroTablaSeleccionado)            

            const parametroSeleccionado = this.parametrosOptions.find(parametro => parametro.nombre_parametro === this.parametroTablaSeleccionado);
            console.log("parametro Seleccionado: ", parametroSeleccionado)
            if (parametroSeleccionado) {
                console.log("parametro Seleccionado: ", parametroSeleccionado)                  
                
              const metodologiasdelparametroseleccionado = this.metodologiasData.find(p => p.nombre_parametro === parametroSeleccionado.nombre_parametro);              

              if(metodologiasdelparametroseleccionado){

                console.log("nombre parametro encontrado:", metodologiasdelparametroseleccionado)

                const metodologiaEncontrada = metodologiasdelparametroseleccionado.metodologias

                if (metodologiaEncontrada){
                    console.log("metodologias totales del parametro encontrado:", metodologiaEncontrada)

                    console.log("met:", this.met.map(n => n.nombre_metodologia))

                    const opcionesM = metodologiaEncontrada.find(m => m.nombre_metodologia)                    

                    console.log("opcion encontrada: ", opcionesM)                    

                    this.opcionesMetodologiaTabla = [];

                    this.opcionesMetodologiaTabla.push({
                        nombre_metodologia: opcionesM.nombre_metodologia
               
                    });

                    console.log("opcion metodologia en tabla: ", this.opcionesMetodologiaTabla);
                }
              }         
              
            } 
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


        RellenarForm(response) {            
            //info anterior
        this.RUM = response.RUM;
        this.nombre_empresa = response.nombre_empresa;
        this.direccionOG = response.direccion_empresa;       
        this.rutOG = response.rut_solicitante;
        this.recepcionistaOG = response.rut_empleado;
        this.nMuestrasOG = response.cantidad_muestras.toString();
        this.fechaOG = response.fecha_muestreo;
        this.horaOG = response.hora_muestreo;
        this.fechaEntregaOG = response.fecha_entrega;
        this.TipoMatrizOG = response.id_matriz;
        this.muestreadoOG = response.muestreado_por;
        this.observacionesOG = response.observaciones
        this.prioridadOG = response.prioridad;
        this.transportistaRutOG = response.rut_transportista;
        this.transportistaOG = response.nombre_transportista;                       
        this.TemperaturaOG = response.temperatura_transporte;
        this.patenteOG = response.patente_vehiculo;
        this.telefonos_agregarOG = response.telefonos_transportista;
        this.mapeotelefono(),
        this.idParamOG = response.submuestras.map((idP) => idP.id_parametro);
        this.idMetOG = response.submuestras.map((idM) => idM.id_metodologia);
        this.normaOG = response.id_norma;
        this.tablaOG = response.id_tabla; 
        this.submuestrasOG = response.submuestras.map(submuestra => ({
            identificador:submuestra.identificador,
            orden: submuestra.orden,
            id_metodologia:submuestra.id_metodologia,            
            id_parametro:submuestra.id_parametro,            
        }));
        this.subMuestra = response.submuestras.map(submuestra=> ({
            identificador: submuestra.identificador,
            id_metodologia: submuestra.id_metodologia,
            id_parametro: submuestra.id_parametro,
            orden: submuestra.orden,
            analistasSeleccionados: [],
        }));        
        this.empleados = response.empleados;
        console.log("empleados: ", this.empleados)
        this.empleadosOG = response.empleados;
        this.parametros_metodologias = response.parametros_metodologias;
        console.log("parámetros_metodologias: ", this.parametros_metodologias)


            //TAB RECEPCIONISTA
        this.rut = response.rut_solicitante;
        this.solicitante = response.rut_empresa;
        this.direccion = response.id_ciudad;

        this.rut_empresa = response.rut_empresa;
        this.datosCargados = true;
        
        
            //TAB MUESTRA
        this.nMuestras = response.cantidad_muestras.toString();
        this.fecha = response.fecha_muestreo;
        this.hora = response.hora_muestreo;
        this.fechaEntrega = response.fecha_entrega;
        this.TipoMatriz = response.id_matriz;
        this.muestreado = response.muestreado_por;
        this.observaciones = response.observaciones.map(obs => obs.observaciones).join("\n");
        this.prioridad = response.prioridad;
        

            //TAB TRANSPORTISTA
        this.transportistaRut = response.rut_transportista;
        this.transportista = response.nombre_transportista;                       
        this.Temperatura = response.temperatura_transporte;
        this.patente = response.patente_vehiculo;
        this.telefonos_agregar = response.telefonos_transportista;  
            

            //TAB PARAMETROS
        this.norma = response.id_norma;
        this.tabla = response.id_tabla;


            //TAB ASIGNACIÓN
        this.identificacion = response.submuestras.map((id) => id.identificador);    
        this.id_submuestra = response.submuestras.map((id) => id.id_submuestra);
        console.log("id de las submuestras: ", this.id_submuestra);
           
           
        },

        async enviarFormulario() {
            const datosValidos = await this.validarFormularios();
            
            if (!datosValidos) {
                return;
            } else {
                this.repetido();
                this.empleadosCoinciden();
                this.telefonosCoinciden();
                this.obs();               
                const matricesFiltradas = this.parametros_agregar.slice(1);
                const submuestraFiltrada = this.submuestra_agregar.slice(1);
                const submuestra_eliminar = this.submuestra_eliminar.slice(1);
                
                
                var data = {
                    RUM: this.RUM,
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
                    estado: 'En Análisis',
                    observaciones: this.nuevaobs.map(obs=> ({
                        fecha_observacion: obs.fecha_observacion,
                        hora_observacion: obs.hora_observacion,
                        observaciones: obs.observaciones
                    })),
                    parametros_agregar: matricesFiltradas.map(matriz => ({
                        id_parametro: matriz.id_parametro,
                        id_metodologia: matriz.id_metodologia,
                    })),
                    id_matriz: this.TipoMatriz,
                    id_norma: this.norma,
                    id_tabla: this.id_tabla,
                    submuestras_agregar: submuestraFiltrada,
                    submuestras_eliminar: submuestra_eliminar,
                    telefonos_eliminar: this.telefonos_eliminar,
                    parametros_eliminar: this.parametros_eliminar,
                    id_cotizacion: this.cotizacion,
                    tipo_pago: this.tipo_pago,
                    valor_neto: this.valor_neto,
                    empleados_agregar: this.empleados_objeto,
                    empleados_eliminar: this.empleados_eliminar.map(objeto => ({
                        rut_empleado: objeto.rut_empleado,
                        orden_de_analisis: objeto.orden_de_analisis,
                        id_parametro: objeto.id_parametro,
                        fecha_entrega: objeto.fecha_entrega,
                        estado: objeto.estado
                    })),                   
                }
                console.log("data a enviar", data)
                MuestraService.actualizarMuestra(data).then((response) => {
                    console.log(response)
                    if (response != null) {
                        if (response.status == 200) {
                            this.$bvToast.toast(`Actualización de la muestra exitosa`, {
                                title: 'Exito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })                                
                        } 
                    } else {
                        this.$bvToast.toast(`Error al actualizar la muestra`, {
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