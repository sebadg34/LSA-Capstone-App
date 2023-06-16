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
  
      <div class="p-3">        
        <b-row class="pb-2">
        <b-col class="col-10">
      
        <div>
            Nombre Matriz: <span>{{ nombreMatriz }}</span>
        </div>

        <div>
            Parámetro(s) Asignado(s):
            <ul>
                <li v-for="parametro in listaParametros" :key="parametro.id">
                    {{ parametro }}
                </li>
            </ul>
        </div>

        <div>
            Metodología(s):
            <ul>
                <li v-for="metodologia in listaMetodologias" :key="metodologia.id">
                    {{ metodologia }}
                </li>
            </ul>
        </div>

        <div>
            Empleado(s):
            <ul>
                <li v-for="empleado in listaEmpleados" :key="empleado.id">
                    {{ empleado.nombre }} {{ empleado.apellido }} <span :style="{ color: getColor(empleado) }">({{ empleado.metodologia }})</span>
                </li>
            </ul>
        </div>
        </b-col>
        </b-row>
      </div>
  
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
        listaParametros: [],
        nombreMatriz: '',
        id: '',
        listaMetodologias: [],
        listaEmpleados: [],
        empleadosProcesados: []
        
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
          console.log("id es: ",this.id)
  
          this.obtenerDetallesElementos();
        },
        deep: true
      }
    }
    }
</script>
  