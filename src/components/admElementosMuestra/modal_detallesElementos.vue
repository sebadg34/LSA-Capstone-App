<template>
  <b-modal id="modal-detalle-elementos" ref="modal" :title="`Detalles Elementos`" size="xl">
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
        <strong>Matriz: </strong> {{ " " + nombre_matriz }}
      </b-list-group-item>
      <b-list-group-item class="p-0" v-for="parametro in parametros" :key="parametro.id_parametro">
        <b-list-group>
          <b-list-group-item>

            <strong>Parámetro:</strong> {{ " " + parametro.nombre_parametro }}
          </b-list-group-item>
          <b-list-group-item class="p-0">

            <b-list-group>
              <b-list-group-item style="font-weight: bold;">
                Metodologías
              </b-list-group-item>
              <b-list-group-item v-for="metodo in parametro.metodologias"
                :key="metodo.id_metodologia + parametro.id_parametro" class="p-0 d-flex justify-content-between">
                <b-list-group horizontal  style="width:100%" >

                  <b-list-group-item style="width:35%" class="d-flex align-items-center justify-content-between">
                    <span> {{ metodo.nombre_metodologia }}</span>

                    <b-popover placement="lefttop" :target="'button-' + metodo.id_metodologia + '-' + metodo.id_parametro"
                      title="Descripción metodología" triggers="focus">

                      <template v-if="metodo.detalle_metodologia != null">{{ metodo.detalle_metodologia }}</template>
                      <template v-else>
                        <div>La metodología no cuenta con una descripción actualmente.</div>
                      </template>
                    </b-popover>
                    <b-button class="boton-ojo-metodo"
                      :id="'button-' + metodo.id_metodologia + '-' + metodo.id_parametro">
                      <b-icon scale="0.9" icon="eye-fill" style="color:gray"></b-icon>
                    </b-button>

                  </b-list-group-item>
                  <b-list-group-item class="p-0" style="width:65%">
                    <b-list-group>
                      <b-list-group-item>
                        <strong>Analistas: </strong>
                      </b-list-group-item>
                      <b-list-group-item v-for="analista in metodo.analistas" :key="analista.rut_empleado" class="p-1">
                        {{analista.rut_empleado + " - " + analista.nombre + " " + analista.apellido }}
                      </b-list-group-item>
                    </b-list-group>

                  </b-list-group-item>

                </b-list-group>


              </b-list-group-item>
            </b-list-group>

          </b-list-group-item>
        </b-list-group>
        <hr/>
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
            if (existeParametro == null) {
              const parametroNuevo = {
                id_parametro: detalles.parametros[i].id_parametro,
                nombre_parametro: detalles.parametros[i].nombre_parametro,
                metodologias: []
              }

              detalles.parametros[i].metodologias.forEach(metodo => {
                parametroNuevo.metodologias.push({
                  id_metodologia: metodo.id_metodologia,
                  nombre_metodologia: metodo.nombre_metodologia,
                  detalle_metodologia: metodo.detalle_metodologia,
                  analistas: metodo.empleados
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
  