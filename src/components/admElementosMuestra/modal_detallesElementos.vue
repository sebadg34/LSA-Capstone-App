<template>
  <b-modal id="modal-detalle-elementos" ref="modal" :title="`Detalles Elementos`" size="lg">
    <template #modal-header="{ close }">
      <b-row class="d-flex justify-content-around">
        <div class="pl-3">Detalles del Elemento</div>
      </b-row>

      <button type="button" class="close" aria-label="Close" @click="close()">
        <span aria-hidden="true" style="color:white">&times;</span>
      </button>
    </template>


    <b-list-group>
      <b-list-group-item>
      <strong>Matriz: </strong>  {{ " "+ nombre_matriz }}
      </b-list-group-item>
      <b-list-group-item class="p-0">
        <b-list-group>
          <b-list-group-item v-for="parametro in parametros" :key="parametro.id_parametro">
            {{ parametro.nombre_parametro }}
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>


    <template #modal-footer="{ close }">
      <b-button @click="close()" variant="primary" size="xl" class="float-right reactive-button" style="font-weight:bold">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

  
<script>
import ElementosService from '@/helpers/api-services/Elementos.service';

export default {
  props: {
    detallesData: Object
  },
  data() {
    return {
      Nombre: '',
      nombre_matriz: '',
      matriz: {
        nombre_matriz: ""
      },
      id: '',
      parametros: []


    }
  },

  methods: {
    getColor(empleado) {
      const repetidas = this.listaEmpleados.filter(e => e.metodologia === empleado.metodologia);
      if (repetidas.length > 1) {
        return 'red'; // Cambiar el color a rojo si la metodología está repetida
      } else {
        return 'green'; // Mantener el color verde si la metodología no está repetida
      }
    },
    obtenerDetallesElementos() {
      const data = {
        id_matriz: this.id
      };

      ElementosService.obtenerDetallesElementos(data).then((response) => {

        if (response.status === 200) {

          const detalles = response.data;
          this.nombre_matriz = detalles.nombre_matriz;

          for (var i = 0; i < detalles.parametros.length; i++) {
            const existeParametro = this.parametros.find(param => param.id_parametro == detalles.parametros[i].id_parametro);
            if(existeParametro == null){
              const parametroNuevo = {
                id_parametro: detalles.parametros[i].id_parametro,
              nombre_parametro: detalles.parametros[i].nombre_parametro,
              metodologias: []
              }

            detalles.parametros[i].metodologias.forEach(metodo => {
              parametroNuevo.metodologias.push({
                id_metodologia: metodo.id_metodologia,
                nombre_metodologia: metodo.nombre_metodologia
              })
            });
            this.parametros.push(parametroNuevo)

            }
           
          }




          /** 
          
                              console.log("Obteniendo detalles de los elementos:" , response.data);
          
                              this.nombreMatriz = response.data.nombre_matriz;        
                              this.listaParametros = response.data.parametros.map((parametro) => parametro.nombre_parametro);
          
                              const listaMetodologias = [];
                              response.data.parametros.forEach((parametro) => {
                                  parametro.metodologias.forEach((metodologia) => {
                                      listaMetodologias.push(metodologia.nombre_metodologia);
                                  });
                              });
                              this.listaMetodologias = listaMetodologias;
                 
                              const listaEmpleados = [];
                              response.data.parametros.forEach((parametro) => {
                                  parametro.metodologias.forEach((metodologia) => {
                                      metodologia.empleados.forEach((empleado) => {
                                          listaEmpleados.push({
                                              nombre: empleado.nombre,
                                              apellido: empleado.apellido,
                                              metodologia: metodologia.nombre_metodologia
                                          });
                                      });
                                  });
                              });
                              this.listaEmpleados = listaEmpleados;
          
          */

        }
      });
    }
  },

  watch: {
    detallesData: {
      handler() {
        console.log("detallesData actualizada", this.detallesData);

        this.Nombre = this.detallesData.nombre_matriz;
        this.id = this.detallesData.id_matriz;
        console.log("id es: ", this.id)

        this.obtenerDetallesElementos();
      },
      deep: true
    }
  }
}
</script>
  