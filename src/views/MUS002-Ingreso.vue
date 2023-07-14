<template>
    <div>     
        <validation-observer ref="form">
            <modal_cantidadMuestra :n-muestras="nMuestras" :objetosSeleccionados="objetosSeleccionados" @datosIngresados="capturarDatos" @identificacionEliminada="identificadores" :identificaciones="identificacion" :parametros="prevP" :metodologias="prevM" />
            <div>            
                <b-card no-body>                
                    <b-row>                    
                        <b-col class="col-12">
                            <b-tabs no-fade v-model="tabIndex" align="center" card >
                                <b-row  class="d-flex justify-content-center">                       
                                    <b-col class="col-6">                                
                                        <b-tab title="Recepcionista">
                                            <div style="height:50px"></div>
                                            Datos del recepcionista
                                            <b-card>
                                                <b-row class="pb-2">
                                                    <b-col class="col-6">
                                                        <ValidationProvider name="Rut Recepcionista" rules="required|rut" v-slot="validationContext">
                                                            <label for="Rut Recepcionista-input">Rut:</label>
                                                            <b-form-input id="Rut Recepcionista-input" readonly v-model="recepcionistaRUT" :state="getValidationState(validationContext)"></b-form-input>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <ValidationProvider name="NombreRecepcionista" rules="required" v-slot="validationContext">
                                                            <label for="input-live">Recepcionista:</label>
                                                            <b-form-input v-model="recepcionista" readonly :state="getValidationState(validationContext)" placeholder="Seleccione un recepcionista"></b-form-input>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    </b-col>
                                                
                                                    <b-col class="col-6">
                                                        <ValidationProvider name="rut" rules="required|rut" v-slot="validationContext">
                                                            <label for="input-live">Rut solicitante:</label>
                                                            <div class="d-flex align-items-center">
                                                              <b-form-input id="input-live" v-model="rut" :state="getValidationState(validationContext)" @input="buscarYagregar"></b-form-input>
                                                              <div>
                                                                <!-- Eliminamos el botón de búsqueda -->
                                                              </div>
                                                            </div>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <b-alert :show="dismissCountDown" dismissible fade variant="danger" @dismiss-count-down="countDownChanged">
                                                            El rut del solicitante no existe en la base de datos!
                                                        </b-alert>
                                                    
                                                        <ValidationProvider name="solicitante" rules="required" v-slot="validationContext">
                                                            <label for="input-live">Nombre empresa:</label>
                                                            <b-form-select id="input-live" v-model="solicitante" :state="getValidationState(validationContext)" value-field="rut_empresa" text-field="nombre_empresa" @input="actualizarSelectedEmpresa">  
                                                                <option v-for="opcion in opcionesClientes" :key="opcion.rut_empresa" :value="opcion.rut_empresa">
                                                                {{opcion.nombre_empresa }}</option>
                                                            </b-form-select>                                                                                        
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <ValidationProvider name="Dirección Cliente" rules="required" v-slot="validationContext">
                                                            <label for="input-live">Dirección empresa:</label>
                                                            <b-form-select id="input-live" v-model="direccion" :options="opcionesDireccion" :state="getValidationState(validationContext)" text-field="direccionConCiudad" value-field="id_ciudad">
                                                            </b-form-select>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                            <template>
                                              <div>
                                                <div class="mb-3">
                                                  <b-button class="mt-3" v-b-toggle.my-collapse>Información previa</b-button>                                  
                                                </div>
                                            
                                                <b-collapse id="my-collapse">
                                                    <b-card title="Información ingresada previamente">
                                                      <ul class="left-aligned-list">                                        
                                                        <li>RUT recepcionista: {{ this.recepcionistaOG }}</li>
                                                        <li>RUT solicitante: {{ this.rutOG }}</li>
                                                        <li>Nombre empresa: {{ this.nombre_empresa }}</li>
                                                        <li>Direccion empresa: {{ this.direccionOG }}</li>                                        
                                                      </ul>
                                                    </b-card>
                                                </b-collapse>                                            
                                              </div>
                                            </template>
                                        </b-tab>
                                    
                                        <b-tab title="Muestra">
                                            Datos de la muestra
                                            <b-card>
                                                <b-row class="pb-2">
                                                    <b-col class="col-6">
                                                        <ValidationProvider name="nMuestras" rules="required|numeric" v-slot="validationContext">
                                                            <label for="input-live">N° de Muestras:</label>
                                                            <div class="d-flex align-items-center">
                                                                <b-form-input id="nMuestras-input" v-model="nMuestras" :state="getValidationState(validationContext)" type="number" min="0" aria-describedby="nMuestras-live-feedback"></b-form-input>
                                                                <div>
                                                                    <b-button class="ml-2" variant="secondary" size="md">
                                                                        <b-icon class="mt-1" icon="plus-circle-fill"></b-icon>
                                                                    </b-button>
                                                                </div>
                                                            </div>
                                                            <b-form-invalid-feedback id="nMuestras-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>                                                    
                                                    
                                                        <ValidationProvider name="fechaI" rules="required" v-slot="validationContext">
                                                            <label class="mt-1" for="input-live">Fecha de muestreo:</label>
                                                            <b-form-datepicker id="input-live" v-model="fecha" aria-describedby="input-live-help fechaI-live-feedback" :state="getValidationState(validationContext)" placeholder="Seleccione fecha de muestreo"></b-form-datepicker>
                                                            <b-form-invalid-feedback id="fechaI-live-feedback">{{validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <ValidationProvider name="horaI" rules="required" v-slot="validationContext">
                                                            <label class="mt-1" for="input-time">Hora de muestreo:</label>
                                                            <b-form-timepicker id="input-time" v-model="hora" :state="getValidationState(validationContext)" aria-describedby="input-live-help horaI-live-feedback" placeholder="Ingrese hora"></b-form-timepicker>
                                                            <b-form-invalid-feedback id="horaI-live-feedback">{{validationContext.errors[0] }}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <div>
                                                            <label class="mt-1" for="input-live">Fecha de Entrega:</label>
                                                            <b-form-datepicker id="input-live" v-model="fechaEntrega" placeholder="Seleccione una fecha de entrega" :min="currentDate"></b-form-datepicker>
                                                        </div>
                                                    
                                                        <ValidationProvider name="TipoPago" rules="required" v-slot="validationContext">
                                                            <label class="mt-1" for="input-live">Forma de pago:</label>
                                                            <b-form-select id="input-live" v-model="tipo_pago" :options="opcionesPago" aria-describedby="input-live-help TipoPago-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                                            <b-form-invalid-feedback id="TipoPago-live-feedback">{{validationContext.errors[0]}}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <ValidationProvider name="Valor Neto" rules="required" v-slot="validationContext">
                                                            <label class="mt-1" for="Valor Neto-input">Valor neto(UF):</label>
                                                            <b-form-input  id="Valor Neto-input" v-model="valor_neto" :state="getValidationState(validationContext)"></b-form-input>
                                                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    </b-col>
                                                
                                                    <b-col class="col-6">
                                                        <ValidationProvider name="muestreado" rules="required" v-slot="validationContext">
                                                            <label for="input-live">Muestreado por:</label>
                                                            <b-form-select class="mt-1" id="input-live" v-model="muestreado" :options="opcionesMuestreado" aria-describedby="input-live-help muestreado-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                                            <b-form-invalid-feedback id="muestreado-live-feedback">{{validationContext.errors[0]}}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <ValidationProvider name="prioridad" rules="required" v-slot="validationContext">
                                                            <label for="input-live">Prioridad:</label>
                                                            <b-form-select class="mt-1" id="input-live" v-model="prioridad" :options="opcionesPrioridad" aria-describedby="input-live-help prioridad-live-feedback" :state="getValidationState(validationContext)"></b-form-select>
                                                            <b-form-invalid-feedback id="prioridad-live-feedback">{{validationContext.errors[0]}}
                                                            </b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                        <ValidationProvider name="TipoMatriz" rules="required" v-slot="validationContext">
                                                            <label for="input-live">Tipo de Matriz:</label>
                                                            <b-form-select class="mt-1" id="input-live" v-model="TipoMatriz" aria-describedby="input-live-help TipoMatriz-live-feedback" :state="getValidationState(validationContext)" text-field="nombre_matriz" value-field="id_matriz">  <option v-for="opcion in opcionesMatriz" :key="opcion.id_matriz" :value="opcion.id_matriz">{{
                                                                opcion.nombre_matriz }}</option></b-form-select>
                                                            <b-form-invalid-feedback id="TipoMatriz-live-feedback">{{validationContext.errors[0]}}</b-form-invalid-feedback>
                                                        </ValidationProvider>                                                  
                                                    
                                                        <ValidationProvider name="Temperatura" rules="required" v-slot="validationContext">
                                                            <label for="input-live">Temperatura de transporte:</label>
                                                            <b-form-input class="mt-1" id="input-live" v-model="Temperatura" aria-describedby="input-live-help Temperatura-live-feedback" :state="getValidationState(validationContext)" placeholder="Ingrese Temperatura de la muestra" trim></b-form-input>
                                                            <b-form-invalid-feedback id="Temperatura-live-feedback">{{validationContext.errors[0]}}</b-form-invalid-feedback>
                                                        </ValidationProvider>
                                                    
                                                            <label class="mt-1" for="input-live">Cotización:</label>
                                                            <b-form-select id="input-live" v-model="cotizacion" :options="opcionesCotizacion" text-field="nombre_original_documento" value-field="id_cotizacion"></b-form-select>                                                                                                                                                                 
                                                    
                                                        <label class="mt-1" for="input-live">Observaciones:</label>
                                                        <b-form-textarea id="input-live" v-model="observaciones" aria-describedby="input-live-help observaciones-live-feedback"></b-form-textarea>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                            <template>
                                              <div>
                                                <div class="mb-3">
                                                  <b-button class="mt-3" v-b-toggle.my-collapse>Información previa</b-button>                                  
                                                </div>
                                            
                                                <b-collapse id="my-collapse">
                                                    <b-card title="Información ingresada previamente">
                                                    
                                                      <ul class="left-aligned-list">                                        
                                                        <li>N° de Muestras: {{ this.nMuestrasOG }}</li>
                                                        <li>Fecha de muestreo: {{ this.fechaOG }}</li>
                                                        <li>Hora de muestreo: {{ this.horaOG }}</li>
                                                        <li>Fecha de Entrega: {{ this.fechaEntregaOG }}</li>
                                                        <li>Muestreado por: {{ this.muestreadoOG }}</li>
                                                        <li>Prioridad: {{ this.prioridadOG }}</li>
                                                        <li>Tipo de matriz: {{ this.nombreMatrizOG }}</li>                                                        
                                                      </ul>
                                                    </b-card>
                                                </b-collapse>                                           
                                              </div>
                                            </template>
                                        </b-tab>
                                    
                                        <b-tab title="Transportista">Datos del Transportista
                                            <b-card>
                                                <b-row class="pb-2">
                                                    <b-col class="col-6">
                                                        <label for="input-live">Rut:</label>
                                                        <b-form-input id="transportistaRut-input" class="mb-1" v-model="transportistaRut" aria-describedby="transportistaRut-live-feedback"></b-form-input>                                        
                                                    
                                                        <label for="input-live">Telefono Movil:</label>
                                                        <div id="app">
                                                            <b-input-group v-for="(telefono, index) in telefonos_agregar" :key="index" class="mb-1">
                                                                <b-input-group-prepend is-text>
                                                                    +56 9
                                                                </b-input-group-prepend>
                                                                <b-form-input v-model="telefono.telefono_transportista" aria-describedby="input-live-help fono-live-feedback" placeholder=""></b-form-input>
                                                                <div>
                                                                    <b-button @click="addInput" v-if="index === telefonos_agregar.length - 1">+</b-button>
                                                                    <b-button @click="removeInput(index)" variant="danger" class="ml-2">
                                                                        <b-icon-trash-fill></b-icon-trash-fill>
                                                                    </b-button>
                                                                </div>
                                                            </b-input-group>
                                                            <div v-if="telefonos_agregar.length === 0">
                                                                No se han agregado teléfonos.
                                                                <b-button @click="addInput">+</b-button>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                
                                                    <b-col class="col-6">
                                                        <label for="input-live">Nombre y apellido:</label>
                                                        <b-form-input class="mb-1" id="input-live" v-model="transportista" aria-describedby="input-live-help transportista-live-feedback" placeholder="" trim></b-form-input>
                                                    
                                                        <label for="input-live">Patente:</label>
                                                        <b-form-input class="mb-1" id="input-live" v-model="patente" aria-describedby="input-live-help patente-live-feedback" placeholder="" trim></b-form-input>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                            <template>
                                                <div>
                                                  <div class="mb-3">
                                                    <b-button class="mt-3" v-b-toggle.my-collapse>Información previa</b-button>                                  
                                                  </div>
                                              
                                                  <b-collapse id="my-collapse">
                                                    <b-card title="Información ingresada previamente">
                                                      <ul class="left-aligned-list">
                                                        <li>Rut: {{ this.transportistaRutOG }}</li>
                                                        <li>Temperatura de transporte: {{ this.TemperaturaOG }}</li>
                                                        <li>Nombre del transportista: {{ this.transportistaOG }}</li>
                                                        <li>Patente: {{ this.patenteOG }}</li>
                                                        <li>
                                                          Teléfono(s):
                                                          <ul>
                                                            <li v-for="(telefono, index) in telefonos_agregarOG" :key="index">{{ telefono.telefono_transportista }}</li>
                                                          </ul>
                                                        </li>
                                                      </ul>
                                                    </b-card>
                                                  </b-collapse>
                                                </div>
                                            </template>                                       
                                        </b-tab>
                                    
                                        <b-tab title="Parámetros">Parámetros
                                            <b-card>
                                                <b-row>
                                                    <b-col class="col-6">
                                                        <b-form-group label="Seleccione una norma">
                                                            <b-form-select v-model="norma" text-field="nombre_norma" value-field="id_norma" @change="obtenerTablasNormas"><option v-for="opcion in opcionesNorma" :key="opcion.id_norma" :value="opcion.id_norma">{{
                                                                opcion.nombre_norma }}</option></b-form-select>
                                                        </b-form-group>
                                                    </b-col>
                                                
                                                    <b-col class="col-6">
                                                        <b-form-group label="Seleccione una tabla">
                                                            <b-form-select v-model="tabla" value-field="id_tabla" text-field="nombre_tabla" @change="actualizarParametrosTabla"><option v-for="opcion in opcionesTabla" :key="opcion.id_tabla.toString()" :value="opcion.id_tabla">{{
                                                                opcion.nombre_tabla }}</option></b-form-select>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>
                                            
                                                <b-row>
                                                    <b-col>
                                                        <b-form-group label="Seleccione un parámetro">
                                                            <div class="d-flex align-items-center">
                                                                <b-form-select v-model="parametroTablaSeleccionado" :options="opcionesParametro" placeholder="Seleccione un Parámetro" :disabled="parametroDeshabilitado" @change="agregarObjetosTablaSeleccionados"></b-form-select>
                                                                <div>
                                                                    <b-button class="ml-2" v-b-modal.modal-Agregar-Opciones>+</b-button>
                                                                </div>
                                                            </div>
                                                        </b-form-group>
                                                    </b-col>
                                                
                                                    <b-col>
                                                        <b-form-group label="Seleccione una metodología">
                                                            <b-form-select v-model="metodologiaSeleccionada" :options="opcionesMetodologiaTabla" placeholder="Seleccione una metodología" :disabled="metodologiaDeshabilitada" @change="agregarObjetosTablaSeleccionados" value-field="nombre_metodologia" text-field="nombre_metodologia"></b-form-select>
                                                        </b-form-group>
                                                    </b-col>
                                                </b-row>
                                            
                                                <b-row v-if="objetosSeleccionados.length > 0" class="mt-3">
                                                    <b-col>
                                                        <b-form-group label="Parámetros Seleccionados:">
                                                            <div v-for="(objetos, index) in objetosSeleccionados" :key="index" class="d-flex align-items-center objetos-item mb-3">
                                                                <b-input readonly :value="objetos.parametro" class="mr-2"></b-input>
                                                                <b-input readonly :value="objetos.metodologia" class="mr-2"></b-input>
                                                                <b-button variant="danger" @click="eliminarObjetosSeleccionados(index)" class="ml-2">
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
                                            <template>
                                              <div>
                                                <div class="mb-3">
                                                  <b-button class="mt-3" v-b-toggle.my-collapse>Información previa</b-button>                                  
                                                </div>
                                            
                                                <b-collapse id="my-collapse">
                                                    <b-card title="Información ingresada previamente">
                                                    
                                                      <ul class="left-aligned-list">                                        
                                                        <li>Nombre Norma: {{ this.nombreNormaOG }}</li>
                                                        <li>Nombre Tabla: {{ this.nombreTablaOG }}</li>                                        
                                                      </ul>
                                                    </b-card>
                                                </b-collapse>                            
                                            
                                              </div>
                                            </template>
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
                                    
                                        <b-tab title="Asignar analista">

                                            <b-card>
                                            <b-table :items="empleados" :fields="tableFields">                                               
                                                
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
                                                  <b-form-datepicker v-model="row.item.fecha_entrega" ></b-form-datepicker>
                                                </template> 

                                                <!--  <template #cell(analistasSeleccionados)="row">
                                                   <b-form-select
                                                    v-model="row.item.analistasSeleccionados"        
                                                    :options="opcionesAnalista"
                                                    value-field="rut_empleado"
                                                    text-field="nombre"
                                                    @change="imprimirSeleccion(row.item.analistasSeleccionados)"
                                                   ></b-form-select>
                                                </template> -->
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
                                </b-row>
                            </b-tabs>
                        </b-col>
                    </b-row>                
                </b-card>
                <!-- Control buttons-->
                <div class="text-center">
                    <b-button-group class="mt-2">
                        <b-button @click="tabIndex--">Atrás</b-button>
                        <b-button @click="tabIndex++">Siguiente</b-button>
                    </b-button-group>
                   <hr/>
                    <b-button @click="enviarFormulario()" variant="primary" size="xl" class="reactive-button" style="font-weight:bold;">
                        Recepcionar Muestra
                    </b-button>
                </div>
                <b-modal id="modal-Agregar-Opciones" ref="modal" :title="`Agregar parámetro a opciones`" size="lg" @shown="onModalShown">
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
                                <b-form-select v-model="parametroSeleccionado" :options="TodasopcionesParametro" placeholder="Seleccione un Parámetro" @change="agregarObjetosSeleccionados"></b-form-select>
                            </b-form-group>
                        </b-col>
                    
                        <b-col>
                            <b-form-group label="Seleccione una metodología">
                                <b-form-select v-model="metodologiaSeleccionada" :options="opcionesMetodologia" placeholder="Seleccione una metodología" :disabled="metodologiaDeshabilitada" @change="agregarObjetosSeleccionados"></b-form-select>
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
                        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
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
                                <b-form-select v-model="parametroSeleccionadoIngreso" :options="parametrosOptions" text-field="nombre_parametro" value-field="id_parametro"></b-form-select>
                            </b-form-group>
                        </b-col>                       
                    </b-row>

                    <b-row v-if="parametrosAnalista.length > 0" class="mt-3">
                        <b-col>
                            <b-form-group label="Parámetros Seleccionados:">
                                <div v-for="(param, index) in parametrosAnalista" :key="index" class="d-flex align-items-center objetos-item mb-3">
                                    <b-input readonly :value="param.parametro" class="mr-2"></b-input>                                    
                                    <b-button variant="danger" @click="eliminarParametrosSeleccionados(index)" class="ml-2">
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
                        <b-button @click="agregarParametro(filaSeleccionada)" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                          Agregar Parámetro
                        </b-button>
                        <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
                          Cerrar
                        </b-button>
                    </template>
                </b-modal>
            </div>
        </validation-observer>
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
            subMuestra_Analista : [],
            tablaItems : [],
            empleados: [],
            parametroSeleccionadoIngreso: '',
            parametrosAnalista: [],
            parametroTablaSeleccionado:'',

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
            tablaE : []
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

        this.buscarYagregar();
        
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
            .catch((error) => {
              console.error('Error al obtener los analistas:', error);
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


        direccion(newValue) {
            const direccionSeleccionada = this.opcionesDireccion.find(opcion => opcion.id_ciudad === newValue);
            if (direccionSeleccionada) {
                const direccion = direccionSeleccionada.direccion;
                console.log("Dirección seleccionada:", direccion);                
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
            this.empleados.push({
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
            const index = this.empleados.indexOf(fila);
            if (index !== -1) {
              if (Object.values(fila).some(value => value !== '' && value !== null && value !== undefined)) {
                this.empleados_eliminar.push(fila);
              }
              this.empleados.splice(index, 1);
              console.log("eliminar empleados: ", this.empleados_eliminar)
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
            console.log("nuevo array empleado: ", this.empleados)
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
                    this.detallesCotizaciones();

                } else {
                    this.alertaNOexiste = true;
                    this.dismissCountDown = this.dismissSecs
                }
            })
        },

        detallesCotizaciones(){
            const data = {
                rut_solicitante: this.rutSolicitante
            };
            SolicitanteService.CotizacionSolicitante(data).then((response) => {
                if (response.data != null && response.status === 200){
                    console.log("cotizaciones: ", response.data)
                    this.opcionesCotizacion = response.data.map(cotizacion => ({
                        id_cotizacion: cotizacion.id_cotizacion,
                        nombre_original_documento: cotizacion.nombre_original_documento
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

                    console.log("las matrices han guardado lo siguiente: ", this.parametros_agregar)
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

            identificacionEliminada.forEach(identificacion => {
              // Verificar si la submuestra ya existe en submuestra_eliminar
              const existe = this.submuestra_eliminar.some(submuestra => submuestra.identificador === identificacion);
              if (!existe) {
                this.submuestra_eliminar.push({ identificador: identificacion });
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
            const sonIguales = JSON.stringify(datos) === JSON.stringify(this.submuestra_agregar);

            if (sonIguales) {
            this.submuestra_agregar = [];
            } else {
                this.submuestra_agregar = datos;
            }  
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
        //this.observacionesOG = response.observaciones.map((obs) => obs.observaciones);
        this.prioridadOG = response.prioridad;
        this.transportistaRutOG = response.rut_transportista;
        this.transportistaOG = response.nombre_transportista;                       
        this.TemperaturaOG = response.temperatura_transporte;
        this.patenteOG = response.patente_vehiculo;
        this.telefonos_agregarOG = response.telefonos_transportistas;
        this.idParamOG = response.submuestras.map((idP) => idP.id_parametro);
        this.idMetOG = response.submuestras.map((idM) => idM.id_metodologia);
        this.normaOG = response.id_norma;
        this.tablaOG = response.id_tabla; 
        this.subMuestra = response.submuestras.map(submuestra=> ({
                        identificador: submuestra.identificador,
                        id_metodologia: submuestra.id_metodologia,
                        id_parametro: submuestra.id_parametro,
                        orden: submuestra.orden,
                        analistasSeleccionados: [],
                    }));
        this.empleados = response.empleados;


            //TAB RECEPCIONISTA
        this.rut = response.rut_solicitante;
        this.solicitante = response.nombre_empresa;
        this.direccion = response.direccion_empresa;
        
        
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
        this.telefonos_agregar = response.telefonos_transportistas;  
            

            //TAB PARAMETROS
        this.norma = response.id_norma;
        this.tabla = response.id_tabla;


            //TAB ASIGNACIÓN
        this.identificacion = response.submuestras.map((id) => id.identificador);         
           
        },

        enviarFormulario() {
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                } else {
                    const matricesFiltradas = this.parametros_agregar.slice(1);
                    
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
                        estado: 'Recepcionado',
                        observaciones: this.observaciones,
                        parametros_agregar: matricesFiltradas.map(matriz => ({
                            id_parametro: matriz.id_parametro,
                            id_metodologia: matriz.id_metodologia,
                        })),
                        id_matriz: this.TipoMatriz,
                        id_norma: this.norma,
                        id_tabla: this.id_tabla,
                        submuestras_agregar: this.submuestra_agregar,
                        submuestras_eliminar: this.subEliminar,
                        telefonos_eliminar: this.telefonos_eliminar,
                        parametros_eliminar: this.parametros_eliminar,
                        id_cotizacion: this.cotizacion,
                        tipo_pago: this.tipo_pago,
                        valor_neto: this.valor_neto,
                        empleados: this.empleados,
                        empleados_eliminar: this.empleados_eliminar                    
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
            });
        },
    }
}
</script>