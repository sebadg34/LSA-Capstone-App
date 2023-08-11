<template>
  <div>
<b-modal id="modal-cantidad" ref="modal" title="Cantidad de submuestras" size="xl" >
<template #modal-header="{ close }">
 <!-- Emulate built-in modal header close button action -->
 <b-row class="d-flex justify-content-around">
   <div class="pl-3">Cantidad de muestras</div>
 </b-row>
 <button type="button" class="close" aria-label="Close" @click="close()">
   <span aria-hidden="true" style="color:white">&times;</span>
 </button>
</template>
<div>
 <b-table :items="tablaItems" :fields="tablaFields">   
   <template #cell(identificacion)="row">
     <b-form-input v-model="row.item.identificacion" placeholder="Ingrese la identificación de la muestra."></b-form-input>
   </template>        
   <template #cell(PYM)="row">
  <b-list-group>
    <!-- Utilizamos la directiva 'v-b-toggle' para habilitar la funcionalidad de colapsar -->
    <!-- Establecemos 'visible' en true solo para el colapsable actual -->
    <b-list-group-item v-b-toggle="'collapse-pym-' + row.index" :visible="row.item.PYM.length > 0">
      <strong>{{ row.item.PYM[0].parametro }}</strong> - {{ row.item.PYM[0].metodologia }}
      <b-icon style="position:absolute; right:0px; top:25%; color: #949494" icon="caret-down-fill"></b-icon>
    </b-list-group-item>
    <!-- Agregamos un colapsable 'b-collapse' al grupo con un ID único basado en el índice de la fila -->
    <b-collapse :id="'collapse-pym-' + row.index">
      <!-- Iteramos sobre el resto de elementos del array 'row.item.PYM' -->
      <!-- Mostramos el parámetro y la metodología de cada elemento -->
      <template v-for="item in row.item.PYM.slice(1)">
        <b-list-group-item :key="item.id_parametro">
          <strong>{{ item.parametro }}</strong> - {{ item.metodologia }}
        </b-list-group-item>
      </template>
      <!-- Si 'row.item.PYM' está vacío o no es un array, mostramos un mensaje -->
      <template v-if="!Array.isArray(row.item.PYM) || row.item.PYM.length === 0">
        <b-list-group-item>No se han encontraron datos registrados.</b-list-group-item>
      </template>
    </b-collapse>
  </b-list-group>
</template>

   <template #cell(accion)="row">
     <b-dropdown right size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
         <template #button-content>
             <b-icon style="height: 80%; width: 80%; align-items: center;" icon="three-dots" variant="dark" aria-hidden="true"></b-icon>
         </template>
         <b-dropdown-item v-if="row" @click="abrirParam(row.item)">
              <b-icon icon="clipboard" aria-hidden="true" class="mr-2"></b-icon>Administrar parámetros
         </b-dropdown-item>
         <b-dropdown-item v-if="row" @click="eliminarSubmuestra(row.item, row.index)">
              <b-icon icon="trash-fill" aria-hidden="true" class="mr-2"></b-icon>Eliminar submuestra
         </b-dropdown-item>                                                                                                                     
     </b-dropdown>
   </template>      
 </b-table>
</div> 

<b-alert variant="success" :show="guardadoExitoso" dismissible @dismissed="guardadoExitoso = false">
  Se han guardado los datos con éxito.
</b-alert>

<template>
  <b-button @click="AgregarSubmuestra()" variant="primary" size="xl" class="float-left reactive-button" style="font-weight:bold">Agregar</b-button> 
</template>


<template #modal-footer="{ close }" >
  <b-button @click="guardarFormulario()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">Guardar</b-button>
  
  <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
    Cerrar
  </b-button>
</template>

</b-modal>

  <b-modal id="modal-Agregar-P" ref="m" :title="`Agregar parámetros a analistas`" size="lg">
    <template #modal-header="{ close }">
        <b-row class="d-flex justify-content-around">
            <div class="pl-3">Asignar parámetros a analistas</div>
        </b-row>
        <button type="button" class="close" aria-label="Close" @click="close()">
            <span aria-hidden="true" style="color:white">&times;</span>
        </button>
    </template>
    <b-row>
        <b-col>
            <b-form-group label="Seleccione un parámetro:">
                <b-form-select v-model="parametroSeleccionadoIngreso" :options="TodasopcionesParametro" text-field="nombre_parametro" value-field="id_parametro" @change="agregar(filaSeleccionada)"></b-form-select>
            </b-form-group>
        </b-col>

        <b-col>
            <b-form-group label="Seleccione una metodologia:">
                <b-form-select v-model="metodologiaSeleccionadoIngreso" :options="opcionesMetodologia" text-field="nombre_metodologia" value-field="id_metodologia" @change="agregar(filaSeleccionada)"></b-form-select>
            </b-form-group>
        </b-col>  
    </b-row>
    <b-row v-if="filaSeleccionada && filaSeleccionada.PYM.length > 0" class="mt-3">
      <b-col>
        <b-form-group label="Parámetros seleccionados:">
          <div v-for="(objeto, index) in filaSeleccionada.PYM" :key="index" class="d-flex align-items-center objetos-item mb-3">
            <b-input readonly :value="objeto.parametro" class="mr-2"></b-input>
            <b-input readonly :value="objeto.metodologia" class="mr-2"></b-input>                                     
            <b-button variant="danger" @click="eliminarElementoPYM(filaSeleccionada, index)" class="ml-2">
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
</template>

<script>
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {
data() {
return {
  parametrosOptions: [],
  metodologiasOptions: [],
  identificacion: '',
  orden: 0,
  identificacionesArray: [],
  parametros_metodologias: [],
  TodasopcionesParametro: [],
  objetossubSeleccionados: [],
  parametroSeleccionado: '',
  metodologiaSeleccionada: '',
  opcionesMetodologia: [],
  alertaDuplicado: false,
  alertaExito: false,
  alertaExiste: false,
  alertaNOexiste: false,
  metodologiaDeshabilitada: true,
  parametroSeleccionadoIngreso: '',
  filaSeleccionada: null,
  metodologiaSeleccionadoIngreso: '',
  metodologiasData: [],
  index: null,
  eliminar: [],
  guardadoExitoso: false,
  submuestra: '',
  elementosAgregados: []
};
},

props: {
nMuestras: {
  type: String,
  default: '',
},
objetosSeleccionados: {
  type: Array,
},
identificaciones: {
  type: Array,
},
sub: {
  type: Array
},
},

mounted(){
  this.$refs.modal.$on('show', () => {
    if (this.identificaciones.length > 0){
      this.identificacionesArray = JSON.parse(JSON.stringify(this.identificaciones));
      console.log('Identificaciones recibidas: ', this.identificacionesArray);
    }
  });
  this.obtenerParametro();
},

watch: {
objetosSeleccionados:{
 handler(nuevosObjetosSeleccionados) {
     const parametrosSet = new Set(nuevosObjetosSeleccionados.map(p => p.parametro));
     const metodologiasSet = new Set(nuevosObjetosSeleccionados.map(m => m.metodologia));
     this.parametrosOptions = [...parametrosSet];
     this.metodologiasOptions = [...metodologiasSet];
   },
   immediate: true
},

parametroSeleccionadoIngreso: function (newParametro) {
       if (newParametro) {
           this.actualizarMetodologias();
           this.metodologiaDeshabilitada = false; // Habilita el input 
       } else {
           this.metodologiaDeshabilitada = true;
       }
   },
},

computed: {
  tablaItems() {
    const items = [];
    const submuestras = this.sub; 
    console.log("computando :", submuestras)

    for (let i = 0; i < submuestras.length; i++) {
      const submuestra = submuestras[i];
      const identificacion = submuestra.identificador || ''; 

      items.push({
        orden: i + 1,
        identificacion,
        id_submuestra: submuestra.id_submuestra,        
        PYM: submuestra.PYM 
      });
    }
    
    return items;
    
  },

  tablaFields() {
    const fields = [
      { key: 'orden', label: 'Orden', thClass: 'text-center', tdClass: 'text-center', editable: true },
      { key: 'identificacion', label: 'Identificación', thClass: 'text-center', tdClass: 'item-center' },
    ];
    if (this.sub.length > 0) { // Reemplaza 'tuArrayDeDatos' con el nombre de tu array de datos
      fields.push({ key: 'PYM', label: 'Parámetros y metodologías', thClass: 'text-center', tdClass: 'item-center' });
      fields.push({ key: 'accion', label: 'Acción', thClass: 'text-center', tdClass: 'item-center' });
    }
    return fields;
  },      
},

methods: {
  guardarFormulario() {
  const datosIngresados = this.tablaItems.map((item) => {        

   // Capturamos los id_parametro e id_metodologia del PYM
    const PYM = item.PYM.map(pymItem => ({
      id_parametro : pymItem.id_parametro,
      id_metodologia : pymItem.id_metodologia
    }));         

    return {
      id_submuestra: item.id_submuestra,
      identificador: item.identificacion,
      orden: item.orden,     
      parametros_agregar: PYM              
    };
  });
  console.log("dato a enviar: ", datosIngresados);

  this.$emit('datosIngresados', datosIngresados);
  this.$emit('eliminados', this.eliminar);
  this.$emit('agregar-sub-param', this.elementosAgregados);
  this.$bvToast.toast(`Identificadores guardados con éxito.`, {
    title: 'Identificadores Guardados',
    toaster: 'b-toaster-top-center',
    solid: true,
    variant: "success",
    appendToast: true
  }) 
},

eliminarElementoPYM(filaSeleccionada, index) {
  // Obtenemos el elemento eliminado antes de hacer el slice
  const elementoEliminado = filaSeleccionada.PYM[index];

  if (filaSeleccionada.PYM.length === 1) {        
        console.log("No se puede eliminar el último elemento PYM");
        return;
    }
  
  // Guardar valores específicos para mostrar en variables
  const id_metodologia = elementoEliminado.id_metodologia;
  const id_parametro = elementoEliminado.id_parametro;
  const id_submuestra = filaSeleccionada.id_submuestra;  
  
  // Hacemos un slice del array PYM para eliminar el elemento en el índice dado
  filaSeleccionada.PYM = [...filaSeleccionada.PYM.slice(0, index), ...filaSeleccionada.PYM.slice(index + 1)];
  
  // Agregamos solo los datos específicos a la lista de eliminados
  this.eliminar.push({ id_submuestra, id_parametro, id_metodologia });
  
  console.log("id_submuestra: ", id_submuestra);
  console.log("id_parametro: ", id_parametro);
  console.log("id_metodologia: ", id_metodologia);    
  console.log("Elemento eliminado: ", elementoEliminado);
  console.log("Parametros Eliminados de la submuestra: ", this.eliminar);
},

eliminarSubmuestra(filaSeleccionada, index) {
  const submuestraEliminada = filaSeleccionada.id_submuestra
  console.log("submuestraEliminada: ", submuestraEliminada)
  console.log("Index:", index)
  this.$emit('eliminar-fila', filaSeleccionada, index);
},

AgregarSubmuestra(){
  this.$emit('agregar-submuestra');
},

abrirParam(row) {
  this.filaSeleccionada = row;
  this.$bvModal.show('modal-Agregar-P');
  console.log("fila", this.filaSeleccionada);
},

onModalShown() {
  this.alertaExito = false;
  this.alertaDuplicado = false;
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
      this.opcionesMet = this.metodologiasData.flatMap(met => met.metodologias);
      console.log("Metodologia opc: ", this.opcionesMet);
      console.log("Metodologia Data: ", this.metodologiasData)
      this.opcionesParametro = response.data.map(item => item.nombre_parametro);
      this.TodasopcionesParametro = response.data.map(item => ({ 
        id_parametro: item.id_parametro,
        nombre_parametro: item.nombre_parametro
      }));
      console.log("opcion", this.opcionesParametro)
   }
 });
},
 
agregarObjetosSeleccionados() {
  if (this.parametroSeleccionado && this.metodologiaSeleccionada) {
    const ParamExistente = this.objetossubSeleccionados.find(objeto => objeto.parametro === this.parametroSeleccionado);
    const MetExistente = this.objetossubSeleccionados.find(objeto => objeto.metodologia === this.metodologiaSeleccionada);
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
      this.objetossubSeleccionados.push({
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

agregar(filaSeleccionada) {  

  if( this.parametroSeleccionadoIngreso && this.metodologiaSeleccionadoIngreso){
    console.log("objetos seleccionados: ", this.parametroSeleccionadoIngreso , this.metodologiaSeleccionadoIngreso)
    const ParamExistente = this.filaSeleccionada.PYM.find(objeto => objeto.id_parametro === this.parametroSeleccionadoIngreso);
    const MetExistente = this.filaSeleccionada.PYM.find(objeto => objeto.metodologia === this.metodologiaSeleccionadoIngreso);
   
   if (ParamExistente && MetExistente) {
      this.alertaDuplicado = true;
      this.parametroSeleccionadoIngreso = '';
      this.metodologiaSeleccionadoIngreso = '';
      this.alertaExito = false;
      console.log("duplicados", ParamExistente , MetExistente)
    }
    else{
      const parametroData = this.metodologiasData.find(item => item.id_parametro === this.parametroSeleccionadoIngreso);
      const metodologiaCompleta = parametroData.metodologias.find(metodologia => metodologia.nombre_metodologia === this.metodologiaSeleccionadoIngreso);
      console.log("parametroData:", parametroData)
      console.log("metodologiaCompleta:", metodologiaCompleta)
      const nuevoElemento = {
        id_parametro: this.parametroSeleccionadoIngreso,
        id_metodologia: metodologiaCompleta.id_metodologia,
        parametro: parametroData.nombre_parametro,
        metodologia: metodologiaCompleta.nombre_metodologia,      
        };
        this.elementosAgregados.push({
          id_submuestra: filaSeleccionada.id_submuestra,
          id_parametro: nuevoElemento.id_parametro,
          id_metodologia: nuevoElemento.id_metodologia     
        });

    console.log("elementos agregados: ", this.elementosAgregados)      

// Llamamos al método para agregar el nuevo elemento a la fila seleccionada
      this.agregarElementoPYM(filaSeleccionada, nuevoElemento);
      console.log("nueva fila : ", filaSeleccionada.PYM)
      this.alertaExito = true;
      this.alertaDuplicado = false;
      this.parametroSeleccionadoIngreso = '';
      this.metodologiaSeleccionadoIngreso = '';      
    }
  }     
},

agregarElementoPYM(filaSeleccionada, nuevoElemento) {
  // Copiar
  const nuevoPYM = [...filaSeleccionada.PYM];

  // Agregar
  nuevoPYM.push(nuevoElemento);  

  // Asignar
  filaSeleccionada.PYM = nuevoPYM;
},

actualizarMetodologias() {
  const parametro = this.parametroSeleccionadoIngreso;
  // Buscar el objeto correspondiente al parámetro seleccionado en metodologiasData
  console.log("Metodologia Data 2: ", this.metodologiasData)
  const parametroData = this.metodologiasData.find(item => item.id_parametro === parametro);
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
},  
};
</script> 