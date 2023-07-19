<template>
  <div>

      <!-- <validation-observer ref="form"> -->
        <modal_cantidadMuestra :n-muestras="nMuestras" :objetosSeleccionados="objetosSeleccionados" @datosIngresados="capturarDatos" @identificacionEliminada="identificadores" :identificaciones="identificacion" :parametros="prevP" :metodologias="prevM" />
        
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

                                                      <ValidationProvider name="Valor Neto" rules="required|numeric"
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

                                                      <ValidationProvider name="Temperatura" rules="required|numeric"
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
                                                        @change="actualizarParametrosTabla">
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
                                <b-form-select v-model="parametroSeleccionadoIngreso" :options="parametrosOptions" text-field="nombre_parametro" value-field="id_parametro" @change="agregarParametro(filaSeleccionada)"></b-form-select>
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


<script>



import MuestraService from '@/helpers/api-services/Muestra.Service';


export default {
  data() {
    return {
      RUM: '',
      recepcionista: '',
      empresa: '',
      direccion: '',
      solicitante: '',
      fecha: '',
      Hrs:'',
      cotizacion:'',
      muestreado:'',
      opcionesMuestreado: [
      { value: 'UCN', text: 'UCN-LSA' },
      { value: 'Cliente', text: 'Cliente' }],
      NMuestras:'',
      matriz:'',
      prioridad:'',
      fechaEntrega:'',
      transportistaRut:'',      
      pago:'',
      Temperatura:'',
      transportista:'',
      fono: '',
      patente: '',
      observaciones:'',
      opciones: [
        { valor: 'efectivo', texto: 'Efectivo' },
        { valor: 'tarjeta', texto: 'Tarjeta de crédito' },
        { valor: 'transferencia', texto: 'Transferencia bancaria' },
        { valor: 'cheque', texto: 'Cheque' },
        { valor: 'otro', texto: 'Otro' },
      ],
      opcionesPrioridad: [
            { value: 'Normal', text: 'Normal'},
            { value: 'Alta', text: 'Alta'}, 
            { value: 'Urgente', text: 'Urgente'}],
      Parametro: '',
      Norma: '',
      Tabla: '',
      datos: {},
      fechaRecepcion: '',
      HrsRecepcion: '',
      showModal: false,
      showAna: false,
      estado: '',
      Analista: '',
      recepcionistaRUT: '',
      empleados: [],
      tabIndex: 0,
      opcionesNorma: [],
      norma: '',
      opcionesTabla: [],
      tabla: '',
      opcionesParametro: [],
      ParametroSeleccionado:'',
      ParametrosSeleccionados: [],
      alertaDuplicado: false, 
      opcionesRecepcionistas: [],
      opcionesClientes: [],
      opcionesMatriz: [],
      rut: ''

    }
  },

  mounted(){

    

    MuestraService.obtenerTelefono(this.RUM).then((response) => {    
    console.log(response.data); 
    if (response != null) {
      this.fono = response.data[0].telefono_transportista;
    }
  });



  MuestraService.obtenerNombreEmpleados(this.RUM).then((response) => {    
    console.log("Los datos obtenidos de la muestra son:", response.data); 
    if (response != null) {
      this.empleados = response.data;
      console.log("el empleado son: ", this.empleados)

      const valorBuscado = this.recepcionistaRUT;
      console.log("El valor buscado es:", valorBuscado) 
      
      let nombreEncontrado = null;
      for (const empleadoId in this.empleados) {
        if (empleadoId === valorBuscado) {
          nombreEncontrado = this.empleados[empleadoId];
          break; // Se encontró el nombre, se sale del bucle
        }
      }

if (nombreEncontrado !== null) {
  console.log("El nombre correspondiente al identificador", valorBuscado, "es:", nombreEncontrado);
  this.recepcionista = nombreEncontrado
} else {
  console.log("No se encontró un empleado con el identificador", valorBuscado);
}


    }
  });

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
  this.Hrs = now.toLocaleTimeString();
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

RellenarForm(response) {

    this.direccion = response.direccion_empresa
    this.transportistaRut = response.rut_transportista
    this.solicitante = response.nombre_solicitante
    this.empresa = response.nombre_solicitante
    this.fechaEntrega = response.fecha_entrega
    this.fechaRecepcion = response.fecha_ingreso
    this.HrsRecepcion = response.hora_ingreso
    this.matriz = response.matriz
    this.muestreado = response.muestreado_por
    this.Temperatura = response.temperatura_transporte
    this.patente = response.patente_vehiculo
    this.fono = response.fono
    this.transportista = response.nombre_transportista
    this.prioridad = response.prioridad
    this.NMuestras = response.cantidad_muestras
    this.recepcionistaRUT = response.rut_empleado
    
  },

  enviarFormulario(){

    var data = {
      //DATOS GENERALES
                      RUM: this.RUM,
                      recepcionista: this.recepcionista,
                      nombre_empresa: this.solicitante, //OJITO CON ESTE
                      direccion_empresa: this.direccion,
                      nombre_solicitante: this.solicitante,
                      tipo_pago: this.pago,
                      fecha_ingreso: this.fechaRecepcion,
                      hora_ingreso: this.HrsRecepcion,
      //DATOS MUESTRA
                      fecha_muestreo: this.fecha,
                      hora_muestreo: this.Hrs,
                      //TODO: cotizacion: this.cotizacion
                      muestreado_por: this.muestreado,
                      matriz: this.matriz,
                      //cantidad_muestras: this.nMuestras,
                      prioridad: this.prioridad,                       
                      fecha_entrega: this.fechaEntrega,
      //DATOS TRANSPORTE
                      rut_transportista: this.transportistaRut,
                      nombre_transportista: this.transportista,
                      temperatura_transporte: this.Temperatura,                     
                      patente_vehiculo: this.patente,                           
                      //telefono_transportista: this.fono,       
                      estado: 'En Análisis',                       
                    }

                    console.log("DATOS A ENVIAR:", data)
                    console.log("RUM A ENVIAR:" + this.RUM)

                    MuestraService.actualizarMuestra(data).then((response) => {
                      console.log("data enviada", response.data)  
                      console.log(response)
                        
                        if (response != null) {
                            if (response.status == 200) {
                                this.$bvToast.toast(`Muestra actualizada correctamente`, {
                                    title: 'Exito',
                                    toaster: 'b-toaster-top-center',
                                    solid: true,
                                    variant: "success",
                                    appendToast: true
                                })                                
                            }                            
                            
                        } else {
                            this.$bvToast.toast(`Error al actualizar muestra`, {
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
  created(){
    this.RUM = this.$route.query.RUM;
    MuestraService.obtenerDatosMuestra(this.RUM).then((response)=>{
      console.log(response)
      this.datos = response.data;
      this.RellenarForm(response.data);

      const rutEmpleado = response.data.rut_empleado;
      MuestraService.obtenerNombreEmpleados(rutEmpleado)



    }).catch(error => {
        console.error(error);
      });
    

  }



}
</script>