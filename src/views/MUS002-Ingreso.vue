<template>
    <div>
  
        <!-- <validation-observer ref="form"> -->
          <modal_cantidadMuestra :n-muestras="nMuestras" :objetosSeleccionados="objetosSeleccionados" :sub="sub" @datosIngresados="capturarDatos" @eliminados="SubEliminadas" @identificacionEliminada="identificadores" :identificaciones="identificacion" :id_submuestra="id_submuestra" :parametros="prevP" :metodologias="prevM" />
          
            <modal_agregarMetodologia/>
            <modal_agregarParametro/>
        <div> 
            <b-card no-body>
                <div style="height:20px"></div>

                <div class="rum-container">
                    <strong class="rum-label">RUM: </strong>
                    <span class="rum-number">{{ RUM }}</span>
                </div>
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
                                                            <label for="RutRecepcionista-input">RUT:</label>
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
  
                                                        <b-alert :show="dismissCountDown" dismissible fade variant="danger"
                                                            @dismiss-count-down="countDownChanged">
                                                            El RUT del solicitante no está registrado en la base de datos.
                                                        </b-alert>                                                
  
                                                        <ValidationProvider name="Nombre de la empresa" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Nombre de la empresa:</label>
                                                            <div class="d-flex align-items-center ">
                                                                <b-input-group>
                                                                    <b-form-select id="input-live" v-model="solicitante"                                                                        
                                                                        :state="getValidationState(validationContext)"
                                                                        :options="opcionesEmpresa"                                                                        
                                                                        text-field="nombre_empresa" value-field="rut_empresa"
                                                                        @input="actualizarSelectedEmpresa()"                                                                     
                                                                        >
                                                                    </b-form-select>                                                                    
                                                                </b-input-group>
                                                            </div>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0]
                                                            }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        <ValidationProvider name="Dirección Cliente" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Dirección de la empresa:</label>
                                                            <b-form-select id="input-live"
                                                                v-model="direccion" 
                                                                :state="getValidationState(validationContext)"
                                                                text-field="direccionConCiudad" value-field="id_ciudad">
                                                                
                                                                <option v-for="opcion in opcionesDireccion" :key="opcion.id_ciudad" :value="opcion.id_ciudad">
                                                                    {{ opcion.direccionConCiudad }} 
                                                                </option>

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
                                                            <label for="input-live">N° de muestras:</label>
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

                                                        <label for="input-live">Fecha de recepción:</label>
                                                        <b-form-datepicker
                                                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                                                            id="input-live" v-model="fecha_recepcion"
                                                            aria-describedby="input-live-help fechaI-live-feedback"
                                                            placeholder="Seleccione fecha">
                                                        </b-form-datepicker>

                                                        <label for="input-time">Hora de recepción:</label>
                                                        <b-form-timepicker id="input-time" v-model="hora_recepcion"
                                                            aria-describedby="input-live-help horaI-live-feedback"
                                                            placeholder="Ingrese hora">
                                                        </b-form-timepicker>
  
                                                        
                                                            <label class="mt-1" for="input-live">Fecha de muestreo:</label>
                                                            <b-form-datepicker
                                                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                                                id="input-live" v-model="fecha"                                                                
                                                                placeholder="Seleccione fecha"></b-form-datepicker>
                                                           
  
                                                        
                                                            <label class="mt-1" for="input-time">Hora de muestreo:</label>
                                                            <b-form-timepicker id="input-time" v-model="hora"                                                                
                                                                placeholder="Ingrese hora">
                                                            </b-form-timepicker>
                                                            
  
                                                        <ValidationProvider name="entrega" rules="required"
                                                            v-slot="validationContext"><label class="mt-1"
                                                                for="input-live">Fecha de entrega:</label>
                                                            <b-form-datepicker
                                                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                                                :state="getValidationState(validationContext)"
                                                                id="input-live" v-model="fechaEntrega"
                                                                placeholder="Seleccione la fecha de entrega:"
                                                                :min="currentDate"></b-form-datepicker>
  
                                                            <b-form-invalid-feedback id="entrega-live-feedback">{{
                                                                validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
  
                                                        
                                                            <label for="input-live">Forma de pago:</label>
                                                            <b-form-select id="input-live" v-model="tipo_pago"
                                                                :options="opcionesPago"
                                                                aria-describedby="input-live-help Forma de Pago-live-feedback"
                                                                ></b-form-select>
                                                            
  
                                                        <ValidationProvider name="Valor Neto" rules="required"
                                                            v-slot="validationContext">
                                                            <label for="input-live">Valor neto (UF):</label>
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
                                                            <label class="mt-1" for="input-live">Tipo de matriz:</label>
                                                            <b-form-select id="input-live" v-model="TipoMatriz"
                                                                :options="opcionesMatriz"
                                                                aria-describedby="input-live-help TipoMatriz-live-feedback"
                                                                :state="getValidationState(validationContext)"
                                                                text-field="nombre_matriz"
                                                                value-field="id_matriz"></b-form-select>
                                                            <b-form-invalid-feedback id="TipoMatriz-live-feedback">{{
                                                                validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>  
                                                       
                                                        <label for="input-live">Temperatura (°C):</label>
                                                        <div class="d-flex align-items-center">
                                                            <b-input-group size="sm">
                                                                <b-form-input id="Temperatura-input" v-model="Temperatura"                                                                       
                                                                    aria-describedby="Temperatura-live-feedback"></b-form-input>                                                                  
                                                            </b-input-group>
                                                        </div>                             
  
                                                        <label class="mt-1" for="input-live">Cotización:</label>
                                                        <b-form-select id="input-live" v-model="cotizacion" text-field="idconNombre" value-field="id_cotizacion" aria-describedby="input-live-help Cotizacion-live-feedback">
                                                            <option v-for="opcion in opcionesCotizacion" :key="opcion.id_cotizacion" :value="opcion.id_cotizacion">
                                                          {{ opcion.idconNombre }}</option>
                                                        </b-form-select>                                                             
  
                                                        <label class="mt-1" for="input-live">Observaciones:</label>
                                                        <b-form-textarea id="input-live" v-model="observaciones" rows="1"
                                                            aria-describedby="input-live-help observaciones-live-feedback"></b-form-textarea>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
  
                                        </validation-observer>
                                    </b-tab>
  
                                    <b-tab title="Transportista">
                                        <strong>Datos del transportista</strong>
  
                                        <template #title>
                                            <b-col class="col-12">
                                                <b-row class="d-flex justify-content-between">
                                                    <b-icon v-if="!transportista_incompleto" icon="check-square"></b-icon>
                                                    <b-icon v-else-if="revisado" icon="exclamation-square"></b-icon>
                                                    <b-icon v-else icon="arrow-right-short"></b-icon>
                                                    <strong style="padding-left:30px">Datos del transportista</strong>
                                                </b-row>
                                            </b-col>
                                        </template>
                                        <validation-observer ref="valtransportista">
  
                                            <b-card>
                                                <b-row class="pb-2">
                                                    <b-col class="col-6">
                                                        <label for="input-live">RUT:</label>
                                                        <b-form-input id="transportistaRut-input" class="mb-1"
                                                            v-model="transportistaRut"
                                                            aria-describedby="transportistaRut-live-feedback"></b-form-input>
  
                                                                                             
                                                        <label for="input-live">Teléfono móvil:</label>
  
                                                        <b-input-group v-for="(telefono, index) in telefonos_agregar"
                                                            :key="index" class="mb-1">
                                                            <b-input-group-prepend is-text>
                                                                +56 9
                                                            </b-input-group-prepend>
                                                            <b-form-input readonly v-model="telefono.telefono_transportista"
                                                                aria-describedby="input-live-help fono-live-feedback"
                                                                placeholder="">
                                                            </b-form-input>  
  
                                                        </b-input-group>
                                                        <div v-if="telefonos_agregar.length === 0">
                                                            No se han agregado teléfonos.                                                            
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
                                                        <b-input-group>
                                                        <b-form-select v-model="norma" 
                                                            text-field="nombre_norma"
                                                            value-field="id_norma" 
                                                            @change="obtenerTablasNormas">
                                                            <option v-for="opcion in opcionesNorma" 
                                                            :key="opcion.id_norma" 
                                                            :value="opcion.id_norma">
                                                            {{opcion.nombre_norma}}</option>
                                                        </b-form-select>
                                                        <b-input-group-append>
                                                                <b-button size="sm" class="lsa-orange reactive-button"
                                                                    style="aspect-ratio:1;"
                                                                    @click="PushParametrosMetodologias()">
                                                                    <b-icon style="color:white"
                                                                        icon="box-arrow-in-down-left"></b-icon>
                                                                </b-button>
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                      </b-form-group>
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
  
                                                        <label for="input-live">Seleccione un parámetro:</label>
                                                        <b-input-group>
  
                                                            <b-form-select v-model="parametroTablaSeleccionado"
                                                                :options="opcionesParametro"
                                                                placeholder="Seleccione un Parámetro"
                                                                :disabled="parametroDeshabilitado"
                                                                @change="agregarObjetosTablaSeleccionados"></b-form-select>
  
                                                            <b-input-group-append>
                                                                <b-button size="sm" class="lsa-orange reactive-button"
                                                                    style="aspect-ratio:1;"
                                                                    v-b-modal.modal-Agregar-Opciones>
                                                                    <b-icon style="color:white"
                                                                        icon="plus-circle-fill"></b-icon>
                                                                </b-button>
                                                            </b-input-group-append>
  
                                                        </b-input-group>
                                                    </b-col>
  
                                                    <b-col>
                                                        <label for="input-live">Seleccione una metodología:</label>
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
                                                        <label style="font-weight: bold;">Parámetros seleccionados:</label>
                                                            <b-form-group label-size="sm"
                                                                style="overflow-y: scroll; height: 250px; border:1px solid lightgray;"
                                                                >
                                                                <b-list-group horizontal
                                                                    v-for="(objetos, index) in objetosSeleccionados"
                                                                    :key="index" >
                                                                    <b-list-group-item class="d-flex align-items-center justify-content-center"  style="width:45%; padding:2px; height:40px">
                                                                        {{ objetos.parametro }}
                                                                    </b-list-group-item>
                                                                    <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:45%; padding:2px; height:40px">
                                                                        {{ objetos.metodologia }}
                                                                    </b-list-group-item>
                                                                    <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:10%; padding:2px; height:40px">
                                                                        <b-button  class="reactive-button d-flex align-items-center justify-content-center" variant="danger" style="height:30px; width:30px;"
                                                                            @click="eliminarObjetosSeleccionados(index)"
                                                                            >
                                                                           <b-icon scale="0.8" icon="trash-fill"></b-icon>
                                                                        </b-button>
                                                                    </b-list-group-item>

                                                                </b-list-group>
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
  
                                    <b-tab title="Asignar identificadores a la muestra">
                                                                            
  
                                        <template #title>
                                            <b-col class="col-12">
                                                <b-row class="d-flex justify-content-end">
                                                    <b-icon icon="arrow-right-short"></b-icon>
                                                    
  
                                                    <strong style="padding-left:30px"> Asignar identificadores a la muestra</strong>
                                                </b-row>
                                            </b-col>
                                        </template>
  
                                        <b-card>
                                            <div class="mt-5">
                                                <b-button class="lsa-orange reactive-button" @click="agregar()"
                                                    style="border: none" pill size="md">
                                                    Asignar identificadores a la muestra
                                                    <b-icon icon="plus-circle-fill"></b-icon>
                                                </b-button>
                                            </div>
                                        </b-card>
                                    </b-tab>
                                  <b-tab title="Asignar analista">
                                    <template #title>
                                        <b-col class="col-12">
                                            <b-row class="d-flex justify-content-end">
                                                <b-icon icon="arrow-right-short"></b-icon>                       

                                                <strong style="padding-left:146px"> Asignar analista</strong>
                                            </b-row>
                                        </b-col>
                                    </template>
  
                                      <b-card>
                                      <b-table :items="empleadosAgrupados" :fields="tableFields">                                               
  
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
                                                       <b-icon icon="person-plus-fill" aria-hidden="true" class="mr-2"></b-icon>Agregar parámetro
                                                  </b-dropdown-item>
                                                  <b-dropdown-item v-if="row" @click="eliminarFila(row.item)">
                                                       <b-icon icon="trash-fill" aria-hidden="true" class="mr-2"></b-icon>Eliminar fila
                                                  </b-dropdown-item>                                                                                                          
                                              </b-dropdown>
                                          </template>
                                      </b-table>
                                      <b-button size="sm" class="lsa-orange reactive-button"
                                                                    style="aspect-ratio:1;" @click="agregarFila"><b-icon style="color:white"
                                                                        icon="plus-circle-fill"></b-icon></b-button>
                                      
                                      </b-card>
                                  </b-tab>
  
                                </b-col>
                                <div style="position:absolute; right:20px; bottom:15px; width:45%">
                                    <b-row class="d-flex justify-content-between">
                                      <b-col class="col-6">
                                        <b-button v-if="tabIndex > 0" block class="lsa-blue reactive-button" pill @click="goToPreviousTab">Atrás</b-button>
                                      </b-col>
                                      <b-col class="col-6">
                                        <b-button v-if="shouldShowNextButton()" block class="lsa-blue reactive-button" pill @click="goToNextTab">Siguiente</b-button>
                                      </b-col>
                                    </b-row>
  
                                    <b-button @click="enviarFormulario()" variant="primary" size="xl"
                                        class="reactive-button lsa-light-blue"
                                        style="font-weight:bold; margin-top:30px; position:absolute; width:100%; right:0px">
                                        Ingresar muestra
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
                        <div class="pl-3">Agregar parámetros:</div>
                    </b-row>
                    <button type="button" class="close" aria-label="Close" @click="close()">
                        <span aria-hidden="true" style="color:white">&times;</span>
                    </button>
                </template>
                <b-row>
                    <b-col>
                        <label>Seleccione un parámetro:</label>
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
                        <label>Seleccione una metodología:</label>
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
                    Los parámetros y metodologías ya se encuentran agregados.
                </b-alert>
  
                <b-alert variant="success" :show="alertaExito" dismissible @dismissed="alertaExito = false">
                    Parámetro y metodología agregados con éxito.
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
                              <div class="pl-3">Asignar parámetros a analista</div>
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
                          El parámetro ya se encuentra agregado.
                      </b-alert>
                  
                      <b-alert variant="success" :show="alertaExito" dismissible @dismissed="alertaExito = false">
                          Parámetro agregado con éxito.
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
            submuestra_agregar: [],
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
            empleados_originales: [],
            emp: [],
            diferentes: [],
            empleadosNuevos: [],
            sub : [],
            empleadosAgrupados: [],
            empleadosDesagrupados: [],
            parametro_submuestra_eliminar: [],
            hora_recepcion: '',
            fecha_recepcion: '',
            totalTabs: 6,
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
            //this.actualizarParametrosTabla();

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
        
        this.obtenerEmpresas(),       

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
        
        obtenerEmpresas () {
            MuestraService.obtenerEmpresas().then((response) => {
                console.log("obteniendo empresas",response.data)
                const empresas = response.data;
                this.opcionesEmpresa = empresas;
            })

        },

        goToPreviousTab() {
            if (this.tabIndex > 0) {
                this.tabIndex--;
            }
        },

        goToNextTab() {
            if (this.tabIndex < this.totalTabs - 1) {
                this.tabIndex++;
            }
        },

        shouldShowNextButton() {
            return this.tabIndex < this.totalTabs - 1;
        },

        onModalShown() {
            this.alertaExito = false;
            this.alertaDuplicado = false;
        },

        agregarFila() {
            this.empleadosAgrupados.push({ //empleadosAgrupados
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
          const index = this.empleadosAgrupados.indexOf(fila);
          if (index !== -1) {
            if (fila.id_parametro === '' || fila.rut_empleado === null) {
              this.empleadosAgrupados.splice(index, 1);
            } else {
              const idParametroUnico = Array.isArray(fila.id_parametro) ? fila.id_parametro[0] : fila.id_parametro;
              const nombreParametroUnico = Array.isArray(fila.nombre_parametro) ? fila.nombre_parametro[0] : fila.nombe_parametro;
            
              const empleadoConParametroUnico = {
                ...fila,
                id_parametro: idParametroUnico,
                nombre_parametro: nombreParametroUnico
              };

              // Verificar si el objeto está presente en this.empleados
              const empleadoEncontrado = this.empleados.find((empleado) => {
                return this.sonObjetosIguales(empleado, empleadoConParametroUnico);
              });

              if (empleadoEncontrado) {
                this.empleados_eliminar.push(empleadoConParametroUnico);
                this.empleadosAgrupados.splice(index, 1);
              } else {
                console.log("La eliminación será solo visual ya que el elemento no existe en la BD.");
                this.empleadosAgrupados.splice(index, 1);
                // No hacemos el push a this.empleados_eliminar
              }
            }
            console.log("empleados eliminados: ", this.empleados_eliminar);
          }
        },

        // Función para verificar si dos objetos son iguales
        sonObjetosIguales(objeto1, objeto2) {
          const keys1 = Object.keys(objeto1);
          const keys2 = Object.keys(objeto2);
        
          if (keys1.length !== keys2.length) {
            return false;
          }
      
          for (const key of keys1) {
            if (objeto1[key] !== objeto2[key]) {
              return false;
            }
          }
      
          return true;
        },
        
        eliminarParametro(filaSeleccionada, index) {
          const parametroEliminado = {
            RUM: filaSeleccionada.RUM,
            estado: filaSeleccionada.estado,
            fecha_entrega: filaSeleccionada.fecha_entrega,
            id_parametro: filaSeleccionada.id_parametro[index],
            nombre_parametro: filaSeleccionada.nombre_parametro[index],
            orden_de_analisis: filaSeleccionada.orden_de_analisis,
            rut_empleado: filaSeleccionada.rut_empleado,
          };
      
          // Verificar si el objeto parametroEliminado existe en this.empleados
          const parametroEncontrado = this.empleados.find((empleado) => {
            return this.sonObjetosIguales(empleado, parametroEliminado);
          });
      
          if (parametroEncontrado) {
            filaSeleccionada.id_parametro.splice(index, 1); 
            filaSeleccionada.nombre_parametro.splice(index, 1); 
        
            console.log("parametro eliminado: ", parametroEliminado);
            this.empleados_eliminar.push(parametroEliminado);
            console.log("empleados_eliminar: ", this.empleados_eliminar);
          } else {
            console.log("La eliminación del parámetro será solo visual ya que no existe en la BD.");
            filaSeleccionada.id_parametro.splice(index, 1); 
            filaSeleccionada.nombre_parametro.splice(index, 1);
          }
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
            for (var i = 0; i < this.EmpleadosArray.length; i++) { //empleadosAgrupados
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

            //this.empleados_agregar.push(...this.empleados_objeto)

            console.log("Objetos empleados agregar:", this.empleados_agregar);          

            console.log("empleadosDesagrupados nuevos:", this.empleadosDesagrupados);

            console.log("empleados:", this.empleados);




            const empleados_original = this.empleados.map((empleado, index) => ({
              ...empleado,
              id_aux: index + 1 // El índice + 1 se usará como id_aux autoincremental
            }));

            console.log("empleados en BD: ",empleados_original);



            this.empleadosNuevos = this.empleadosDesagrupados.map(empleados => ({
                rut_empleado: empleados.rut_empleado,
                orden_de_analisis: empleados.orden_de_analisis,
                id_parametro: empleados.id_parametro,
                nombre_parametro: empleados.nombre_parametro,
                fecha_entrega: empleados.fecha_entrega

            }));        

            const nuevoArray = this.empleadosNuevos.map(empleado => {
            // Creamos un nuevo objeto con las mismas propiedades del objeto original
                const nuevoEmpleado = {
                    ...empleado,
                };
              // Verificamos si el campo 'id_parametro' es un array
              if (Array.isArray(empleado.id_parametro)) {
                // Asignamos el primer valor del array 'id_parametro' al campo 'id_parametro' del nuevo objeto
                nuevoEmpleado.id_parametro = empleado.id_parametro[0];
              }          
              return nuevoEmpleado;
            });
            
            console.log(" nuevo array empleados: ", nuevoArray)

            const empleados = nuevoArray.map((empleado, index) => ({
                ...empleado,
                id_aux: index + 1 // El índice + 1 se usará como id_aux autoincremental
            }));

            console.log("nuevos empleados: ",empleados);

            // Función para comparar dos empleados por su id_aux
            function compararEmpleadosPorIdAux(empleado1, empleado2) {
              return empleado1.id_aux === empleado2.id_aux;
            }

            // Función para comparar dos empleados por sus propiedades restantes (fecha_entrega, rut_empleado, id_parametro)
            function compararEmpleadosPorPropiedades(empleado1, empleado2) {
              return (
                empleado1.rut_empleado === empleado2.rut_empleado &&
                empleado1.orden_de_analisis === empleado2.orden_de_analisis &&
                empleado1.id_parametro === empleado2.id_parametro &&
                empleado1.fecha_entrega === empleado2.fecha_entrega   
              );
            }

            // Filtrar los empleados diferentes
            const empleadosDiferentes = empleados.filter(empleado => {
              // Buscar el empleado correspondiente en empleados_original con el mismo id_aux
              const empleadoCorrespondiente = empleados_original.find(e => compararEmpleadosPorIdAux(empleado, e));
            
              // Si no se encontró el empleado en empleados_original, significa que es diferente
              if (!empleadoCorrespondiente) {
                return true;
              }
              console.log("empleado correspondiente: ", empleadoCorrespondiente);
          
              // Comparar las propiedades restantes para asegurarse de que son iguales
              return !compararEmpleadosPorPropiedades(empleado, empleadoCorrespondiente);


            });

            console.log("Empleados diferentes:", empleadosDiferentes);
            this.empleados_agregar = [];
            this.empleados_agregar.push(...empleadosDiferentes);

            console.log("Nuevos Empleados agregar:", this.empleados_agregar);
            // Mostrar el objeto correspondiente en empleados_original para cada empleado en empleadosDiferentes
            empleadosDiferentes.forEach(empleado => {
              const empleadoCorrespondiente = empleados_original.find(e => compararEmpleadosPorIdAux(empleado, e));
              console.log("Objeto en empleados_original:", empleadoCorrespondiente);
              this.empleados_eliminar.push(empleadoCorrespondiente)
              console.log("empleados eliminar: ",this.empleados_eliminar)            
            });
        },

        mapeotelefono() {
            this.telefonos_agregarOG = this.telefonos_agregarOG.map(fono => ({
                telefono_transportista: fono.telefono_transportista
            }));
            console.log("telefono_transportista nuevo:", this.telefonos_agregarOG);
        },


        /*telefonosCoinciden() {
            if(this.telefonos_agregar === this.telefonos_agregarOG) {
                console.log("coindicen", this.telefonos_agregarOG)
            }
            else {
                console.log("NO coindicen", this.telefonos_agregar)    
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
        },*/       

        repetido(){
            // Desagrupar los elementos dentro del array empleadosAgrupados
            const empleadosDesagrupados = this.empleadosAgrupados.flatMap(empleado => {
              const empleadosIndividuales = empleado.id_parametro.map((idParametro, index) => ({
                RUM: empleado.RUM,
                estado: empleado.estado,
                fecha_entrega: empleado.fecha_entrega,
                id_parametro: idParametro,
                nombre_parametro: empleado.nombre_parametro[index],
                orden_de_analisis: empleado.orden_de_analisis,
                rut_empleado: empleado.rut_empleado,
              }));          
              return empleadosIndividuales;
            });

            // Ahora empleadosDesagrupados contendrá los 8 elementos desagrupados
            console.log("empleados desagrupados: ", empleadosDesagrupados);

            this.empleadosDesagrupados = empleadosDesagrupados;
            const elementosNoRepetidos = this.empleadosAgrupados.filter(objeto => (
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

        /*modificado(){
            const empleadoModificadoString = JSON.stringify(this.EmpleadosArray);
            const haSidoModificado = !this.empleadosOG.some(elemento => {
              const elementoString = JSON.stringify(elemento);
              return elementoString === empleadoModificadoString;
            
            });
            
            console.log("modificaod:",haSidoModificado)
            
        },*/

        obs(){
            console.log(this.observacionesOG);           

            if (this.observacionesOG.length === 0) {
                this.nuevaobs = [{
                  fecha_observacion: '',
                  hora_observacion: '',
                  observaciones: this.observaciones,
                }];                
                console.log("primero: ",this.nuevaobs)              
            }   
            else{
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

        /*actualizarOpcionesDireccion() {
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
        },/*

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

        actualizarSelectedEmpresa() {

            console.log("empresa:", this.solicitante)
            const nombreEmpresa = this.opcionesEmpresa.find(objeto => objeto.rut_empresa === this.solicitante);
            console.log("empresa:", nombreEmpresa)
            let nombreEmpresaEncontrada = "";
            if (nombreEmpresa) {
            nombreEmpresaEncontrada = nombreEmpresa.nombre_empresa;
            this.nombre_empresa = nombreEmpresaEncontrada;
            }

            console.log("Nombre de la empresa encontrada:", nombreEmpresaEncontrada);


            MuestraService.obtenerEmpresas().then((response) => {
                console.log("obteniendo empresas",response.data)
                const empresas = response.data;
                const direccion = empresas.flatMap(direccion => direccion.ciudades_direcciones);
                console.log("direccion : ", direccion)
            

                const direccionCiudad = direccion.map(c => c.direccion);
                const nombre_ciudad = direccion.map(c => c.nombre_ciudad);
                this.opcionesDireccion = direccion.map(opc => ({
                    id_ciudad: opc.id_ciudad,
                    nombre_ciudad: opc.nombre_ciudad,
                    direccion: opc.direccion,
                    direccionConCiudad: `${nombre_ciudad} / ${direccionCiudad}`               
                
                }))
                console.log("opciones direccion : ", direccionCiudad);
                this.direccion_empresa = direccionCiudad.toString();
            });
            const data = {
                rut_empresa: this.solicitante
            };

            MuestraService.obtenerCotizacionEmpresa(data).then((response) => {
                if (response.data != null && response.status === 200){
                    console.log("cotizaciones: ", response.data)
                    this.opcionesCotizacion = response.data.map(cotizacion => ({
                        id_cotizacion: cotizacion.id_cotizacion,
                        nombre_original_documento: cotizacion.nombre_original_documento,
                        idconNombre: `${cotizacion.id_cotizacion} - ${cotizacion.nombre_original_documento}`

                    }))
                    console.log("Opc. cotizaciones: ", this.opcionesCotizacion)
                    this.id_cotizacion = response.data.flatMap(id => id.id_cotizacion)
                } 
            })
        },

        agregar() {
            console.log("abirnedo modal");                       
            this.alertaExito = false;
            this.alertaDuplicado = false;
            this.$bvModal.show('modal-cantidad');
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
            const parametrosAgregar = [];            
            const idparametros = [];
            const idmetodologias = [];
            const submuestraArray = [];  
            const id_submuestra = [];                      

            // Recorrer los datos y almacenarlos en las columnas correspondientes
            datos.forEach((objeto) => {
                id_submuestra.push(objeto.id_submuestra)              
                identificacionArray.push(objeto.identificador);
                ordenArray.push(objeto.orden);               
                idmetodologias.push(objeto.id_metodologia);
                idparametros.push(objeto.id_parametro);
                parametrosAgregar.push(objeto.parametros_agregar);
                               
            });            

            datos.forEach((objeto) => {
                submuestraArray.push({
                    id_submuestra: objeto.id_submuestra,
                    identificador: objeto.identificador,
                    orden: objeto.orden,                    
                    parametros_agregar: objeto.parametros_agregar
                });
            });

            console.log("submuestra_original: ", this.submuestrasOG)            
            console.log("submuestras: ", submuestraArray) 
            
            const submuestraArrayTransformado = submuestraArray.map(submuestra => {
              const parametros = submuestra.parametros_agregar.map(parametro => ({
                id_submuestra: submuestra.id_submuestra,
                identificador: submuestra.identificador,
                orden: submuestra.orden,
                id_parametro: parametro.id_parametro,
                id_metodologia: parametro.id_metodologia,                
              }));
              return parametros;
            }).flat();

            console.log("submuestraArrayTransformado:", submuestraArrayTransformado);

                        for (let i = 0; i < this.submuestrasOG.length; i++) {
              const elementoRepetido = submuestraArrayTransformado.find(objeto => (
                objeto.identificador === this.submuestrasOG[i].identificador &&
                objeto.orden === this.submuestrasOG[i].orden &&
                JSON.stringify(objeto.id_parametro) === JSON.stringify(this.submuestrasOG[i].id_parametro)
              ));
                        
              if (elementoRepetido) {
                console.log("Elemento repetido:", elementoRepetido);
              }
            }

            const elementosNoRepetidos = submuestraArrayTransformado.filter(objeto => (
              !this.submuestrasOG.some(elemento => (
                elemento.identificador === objeto.identificador &&
                elemento.orden === objeto.orden &&
                JSON.stringify(objeto.id_parametro) === JSON.stringify(elemento.id_parametro)
              ))
            ));

            console.log("elementos no repetidos:", elementosNoRepetidos);           

            elementosNoRepetidos.forEach(objeto => {
              this.submuestra_agregar.push({
                id_submuestra: objeto.id_submuestra,
                identificador: objeto.identificador,
                orden: objeto.orden,
                parametros_agregar: [{
                    id_parametro: objeto.id_parametro,
                    id_metodologia: objeto.id_metodologia }]                
              });
            });
            
            console.log("submuestras_agregar: ", this.submuestra_agregar)
            
        },

        SubEliminadas(datos){
            console.log("datos capturados a eliminar:", datos);

            this.parametro_submuestra_eliminar = datos;

            console.log("parametros de submuestras a eliminar:", this.parametro_submuestra_eliminar);            
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

                    // Almacena las tablas agrupadas por nombre
                    const tablasAgrupadas = {};

                    // agrupar las tablas por nombre
                    response.data.forEach((tabla) => {
                        const nombreTabla = tabla.nombre_tabla;
                        const nombreParametro = tabla.nombre_parametro;
                        const idParametro = tabla.id_parametro;
                        const idMetodologia = tabla.id_metodologia;
                        const nombreMetodologia = tabla.nombre_metodologia;

                        // Verificar si la tabla ya está en el objeto tablasAgrupadas
                        if (!tablasAgrupadas[nombreTabla]) {
                            // Si la tabla no existe, crear un nuevo objeto con el nombre de la tabla
                            tablasAgrupadas[nombreTabla] = {
                                nombre_tabla: nombreTabla,
                                id_tablas: [],
                                parametros: [],
                                id_parametro: [],
                                id_metodologia: [],
                                metodologias: []
                            };
                        }
                        // Agregar el id_tabla y el nombre_parametro a la tabla correspondiente en tablasAgrupadas
                        tablasAgrupadas[nombreTabla].id_tablas.push(tabla.id_tabla);
                        tablasAgrupadas[nombreTabla].parametros.push(nombreParametro);
                        tablasAgrupadas[nombreTabla].id_parametro.push(idParametro);
                        tablasAgrupadas[nombreTabla].id_metodologia.push(idMetodologia);
                        tablasAgrupadas[nombreTabla].metodologias.push(nombreMetodologia)
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

        PushParametrosMetodologias() {
            
            function esDuplicado(parametrosYMetodologias, parametro, metodologia) {
                return parametrosYMetodologias.some((item) => item.parametro === parametro && item.metodologia === metodologia);
            }

            let parametrosYMetodologias = [];

            // Recorrer cada tabla procesada
            for (const tabla of this.tablasProcesadas) {
                // Recuperar los arrays de id_parametro y metodologias de la tabla actual
                const idParametro = tabla.id_parametro;
                const parametros = tabla.parametros;
                const metodologias = tabla.metodologias;
                const idMetodologias = tabla.id_metodologia;
                
                // Agregar los parámetros y metodologías de la tabla actual a la variable principal
                for (let i = 0; i < parametros.length; i++) {
                    const parametro = parametros[i];
                    const metodologia = metodologias[i];
                    const id_parametro = idParametro[i];
                    const id_metodologia = idMetodologias[i];
                    
                    // Verificar si el parámetro y la metodología ya existen en la variable "parametrosYMetodologias"
                    if (!esDuplicado(parametrosYMetodologias, parametro, metodologia)) {
                        parametrosYMetodologias.push({
                            id_parametro: id_parametro,
                            parametro: parametro,
                            metodologia: metodologia,
                            id_metodologia: id_metodologia
                        });
                    }
                }
            }
            console.log("parametros y metodologias de las tablas: ", parametrosYMetodologias);
            // Asegurarnos de no agregar duplicados a "this.objetosSeleccionados"
            const objetosNoDuplicados = parametrosYMetodologias.filter((item) => !esDuplicado(this.objetosSeleccionados, item.parametro, item.metodologia));
            this.objetosSeleccionados.push(...objetosNoDuplicados); 
            const IDNoDuplicados = parametrosYMetodologias.filter((item) => !esDuplicado(this.objetosSeleccionados, item.id_parametro, item.id_metodologia));
            this.parametros_agregar.push(...IDNoDuplicados);
            this.parametros_metodologias = [];
            console.log("las matrices se vacian: ", this.parametros_metodologias)

            this.parametros_metodologias = []; // Reiniciar la matriz

            // Recorrer los objetos no duplicados y construir la estructura necesaria
            parametrosYMetodologias.forEach((item) => {
                const parametroMetodologia = {
                    id_parametro: item.id_parametro,
                    nombre_parametro: item.parametro
                };
                this.parametros_metodologias.push(parametroMetodologia);
            });    
            console.log("las matrices se actualizan: ", this.parametros_metodologias)         

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
            this.fecha_recepcion = response.fecha_ingreso;
            this.hora_recepcion = response.hora_ingreso;
            //this.tablaOG = response.id_tabla; 
            this.submuestrasOG = response.submuestras.map(sub => ({
                id_submuestra: sub.id_submuestra,
                identificador: sub.identificador,
                orden: sub.orden,
                id_parametro: sub.id_parametro,
                id_metodologia: sub.id_metodologia
            }));

            // Convertir los objetos reactivos en objetos planos
            this.submuestrasOG = JSON.parse(JSON.stringify(this.submuestrasOG));

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
            console.log("parámetros_metodologias: ", this.parametros_metodologias);
            this.sub = response.submuestras.reduce((result, current) => {
                const index = result.findIndex((item) => item.id_submuestra === current.id_submuestra);
                const PYMObj = {
                    metodologia: current.nombre_metodologia,
                    parametro: current.nombre_parametro,
                    id_metodologia: current.id_metodologia,
                    id_parametro: current.id_parametro,
                };
                if (index === -1) {
                    result.push({
                        RUM: current.RUM,
                        detalle_metodologia: [current.detalle_metodologia],
                        id_metodologia: [current.id_metodologia],
                        id_parametro: [current.id_parametro],
                        id_submuestra: current.id_submuestra,
                        identificador: current.identificador,
                        orden: current.orden,
                        PYM: [PYMObj], // Agregamos el array PYM con el primer objeto PYM
                    });
                } 
                else {
                    result[index].detalle_metodologia.push(current.detalle_metodologia);
                    result[index].id_metodologia.push(current.id_metodologia);
                    result[index].id_parametro.push(current.id_parametro);
                    result[index].PYM.push(PYMObj); // Agregamos el objeto PYM al array PYM existente
                }
                return result;
            }, []);

            console.log("sub:", this.sub);

            this.sub = this.sub.map(sub => ({
                id_submuestra: sub.id_submuestra,
                orden: sub.orden,
                identificador: sub.identificador,
                PYM: sub.PYM
            }))
            console.log("sub:", this.sub);

                //TAB RECEPCIONISTA
            this.rut = response.rut_solicitante; // por cambios no se utiliza en la tab
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
            this.cotizacion = response.id_cotizacion;       


                //TAB TRANSPORTISTA
            this.transportistaRut = response.rut_transportista;
            this.transportista = response.nombre_transportista;                       
            this.Temperatura = response.temperatura_transporte;
            this.patente = response.patente_vehiculo;
            this.telefonos_agregar = response.telefonos_transportista;  


                //TAB PARAMETROS
            this.norma = response.id_norma;
            //this.tabla = response.id_tabla;


                //TAB ASIGNACIÓN
            this.identificacion = response.submuestras.map((id) => id.identificador);    
            this.id_submuestra = response.submuestras.map((id) => id.id_submuestra);
            console.log("id de las submuestras: ", this.id_submuestra);

            this.emp = response.empleados.map(empleados => ({
                rut_empleado: empleados.rut_empleado,
                orden_de_analisis: empleados.orden_de_analisis,
                id_parametro: empleados.id_parametro,
                fecha_entrega: empleados.fecha_entrega

            }));

            // Supongamos que tienes un array de empleados llamado "response.empleados" que contiene todos los datos

            const empleadosAgrupados = response.empleados.reduce((grupo, empleado) => {
                const { rut_empleado } = empleado;
                const clave = rut_empleado;
                if (!grupo[clave]) {
                    grupo[clave] = {
                        RUM: empleado.RUM,
                        estado: empleado.estado,
                        fecha_entrega: empleado.fecha_entrega,
                        id_parametro: [empleado.id_parametro],
                        nombre_parametro: [empleado.nombre_parametro],
                        orden_de_analisis: empleado.orden_de_analisis,
                        rut_empleado: rut_empleado
                    };
                } 
                else {
                    grupo[clave].id_parametro.push(empleado.id_parametro);
                    grupo[clave].nombre_parametro.push(empleado.nombre_parametro);
                }      
                return grupo;
            }, {});

            // Convertir el objeto de empleados agrupados en un array
            const empleadosAgrupadosArray = Object.values(empleadosAgrupados);

            // Ordenar el array "empleadosAgrupadosArray" por la propiedad "orden_de_analisis"
            empleadosAgrupadosArray.sort((a, b) => a.orden_de_analisis - b.orden_de_analisis);

            console.log("Empleados agrupados:", empleadosAgrupadosArray);
            this.empleadosAgrupados = empleadosAgrupadosArray;           
        },          

        async enviarFormulario() {
            const datosValidos = await this.validarFormularios();
            
            if (!datosValidos) {
                return;
            } else {
                this.repetido();
                this.empleadosCoinciden();
                //this.telefonosCoinciden();
                this.obs();
                
                               
                const matricesFiltradas = this.parametros_agregar.slice(1);
                //const submuestraFiltrada = this.submuestra_agregar.slice(1);
                //const submuestra_eliminar = this.submuestra_eliminar.slice(1);
                
                
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
                    fecha_ingreso: this.fecha_recepcion,
                    hora_ingreso: this.hora_recepcion,
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
                    submuestras_agregar: this.submuestra_agregar,
                    //submuestras_eliminar: this.submuestra_eliminar,
                    parametro_submuestra_eliminar: this.parametro_submuestra_eliminar,
                    telefonos_eliminar: this.telefonos_eliminar,
                    parametros_eliminar: this.parametros_eliminar,
                    id_cotizacion: this.cotizacion,
                    tipo_pago: this.tipo_pago,
                    valor_neto: this.valor_neto,
                    empleados_agregar: this.empleados_agregar.map(objeto => ({
                        rut_empleado: objeto.rut_empleado,
                        orden_de_analisis: objeto.orden_de_analisis,
                        id_parametro: objeto.id_parametro,
                        fecha_entrega: objeto.fecha_entrega,                        
                    })),
                    empleados_eliminar: this.empleados_eliminar.map(objeto => ({
                        rut_empleado: objeto.rut_empleado,
                        orden_de_analisis: objeto.orden_de_analisis,
                        id_parametro: objeto.id_parametro,
                        fecha_entrega: objeto.fecha_entrega,
                        estado: "Sin iniciar"
                    })),                   
                }
                console.log("data a enviar", data)
                MuestraService.actualizarMuestra(data).then((response) => {
                    console.log(response)
                    if (response != null) {
                        if (response.status == 200) {
                            this.$bvToast.toast(`Ingreso de la muestra exitoso.`, {
                                title: 'Éxito',
                                toaster: 'b-toaster-top-center',
                                solid: true,
                                variant: "success",
                                appendToast: true
                            })                                
                        } 

                        /*setTimeout(() => {
                            const baseUrl = window.location.origin; // Obtiene la parte de la URL antes del path
                            const extension = '/supervisor/admmuestra'; // Extensión Path a redirigir
                            
                            window.location.href = baseUrl + extension;
                        }, 2000); */
                    } 
                    else {
                        this.$bvToast.toast(`Error al ingresar la muestra.`, {
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