<template>



  <b-row class="d-flex justify-content-center">
    <b-col class="col-8">

      <b-col class="col-6">
      <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;">Nombre completo:</b-col>
              <b-col class="col-7">{{ this.Nombre }} {{ this.Apellidos }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> RUT:</b-col>
              <b-col class="col-7">{{ this.Rut }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Correo:</b-col>
              <b-col class="col-7">{{ this.Correo }}</b-col>
            </b-row>

          </b-col>
       
        <b-row>
            <b-col class="col-6">
                <div>
                    <strong> Teléfono móvil:</strong> <span>{{ this.Movil }}</span>
                </div>
                <div>
                    <strong> Teléfono de emergencia: </strong> <span>
                        <template v-if="this.Emergencia == null">
                        Teléfono sin asignar.</template>
                        <template v-else>
                            {{ this.Emergencia }}</template>
                    
                    </span>
                </div>
            </b-col>
            <b-col class="col-6">
                <div>
                    <strong>Cargo: </strong> <span>{{ this.Cargo }}</span>
                </div>
                <div>
                    <strong> Tipo de trabajador: </strong> <span>{{ this.Tipo }}</span>
                </div>
            </b-col>
        </b-row>
        <br />
        <template v-if="Areas.length > 0">
            <b-list-group horizontal>
        <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:40%;font-weight: bold; padding-top: 2px;  padding-bottom: 2px;">Áreas</b-list-group-item>

        <b-list-group-item class="d-flex align-items-center justify-content-center" style="width:60%;font-weight: bold;  padding-top: 2px;  padding-bottom: 2px;">Tipos de análisis</b-list-group-item>
       
    </b-list-group>
            <b-list-group>
                <b-list-group v-for="area in Areas" :key="area.id_area" horizontal>
                    <b-list-group-item class="d-flex align-items-center justify-content-center" style="padding:0px; width:40%">
                        <strong>{{ area.nombre_area }} </strong>
                    </b-list-group-item>
                    <b-list-group-item  style="padding:0px; width:60%">
                        <b-list-group flush>
                            <b-list-group-item style="padding-top:8px; padding-bottom:8px" class="d-flex align-items-center" v-for="(analisis, index) in area.tipos_analisis" :key="index">
                                {{ analisis.tipo_analisis }}
                            </b-list-group-item>
                        </b-list-group>
                    </b-list-group-item>
                </b-list-group>
            </b-list-group>
        </template>

        <hr />
        <div v-if="Documentos.length == 0 && CargandoArchivos == false">
            <b-list-group-item>
                <div class="text-center lsa-light-blue-text my-2 row">
                    <div class="col">
                        <b-icon icon="file-earmark-break" animation="fade" variant="secondary"></b-icon>
                        <div style="font-weight:bold; color:gray">No hay documentos registrados para mostrar.</div>
                    </div>

                </div>
            </b-list-group-item>
        </div>
        <div>
            <div v-if="CargandoArchivos" class="text-center lsa-orange-text my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong> Cargando...</strong>
            </div>

            <b-row v-if="Documentos.length != 0" class="mx-auto col-xl-8 col-lg-9 col-md-10 col-12">
                <div class="col-12"
                    style="background-color: white;height:50px; border-top:2px solid var(--ucn-light-gray); font-weight: bold;">
                    <b-list-group>
                        <b-list-group-item class="d-flex justify-content-between"
                            style="padding-right:5px; padding-left:5px">
                            <div>Fecha de subida</div>
                            <div>Archivos adjuntos</div>
                            <div>Acción</div>
                        </b-list-group-item>

                    </b-list-group>
                </div>
                <div class="col-12" style="background-color: white; ">

                    <b-list-group>
                        <b-list-group-item v-for="file in Documentos" :key="file.id" style="padding:5px"
                            class="d-flex justify-content-between">
                            <div>
                                {{ file.fecha_subida }}
                            </div>
                            <div>
                                {{ file.nombre_original_documento }}
                            </div>
                            <div class="d-flex justify-content-around">
                                <b-button variant="info" @click="descargarArchivo(file)"
                                    style=" heigth: 33px; width: 33px; border-style: none; padding: 0px; background-color: white;">
                                    <b-icon-download scale="1" variant="info"></b-icon-download>
                                </b-button>

                                <b-button variant="danger" @click="borrarArchivo(file)"
                                    style=" height: 23px; width: 23px; border-style: none; padding: 0px; aspect-ratio: 1;">
                                    <b-icon scale="0.7" icon="trash-fill"></b-icon>
                                </b-button>
                            </div>

                        </b-list-group-item>
                    </b-list-group>

                    <br>
                </div>
            </b-row>

        </div>


  </b-col>
</b-row>

</template>

<script>
// @ is an alias to /src

import {
  getUserInfo
} from "@/helpers/api-services/Auth.service";
import personalService from "@/helpers/api-services/Personal.service"
import solicitanteService from "@/helpers/api-services/Solicitante.service"

export default {
  data() {
    return {
      EsEmpleado: false,
      EsSolicitante: false,
      CargandoArchivos: false,
      Nombre: "",
      Rut: "",
      Correo: "",
      Apellidos: "",
      Movil: "",
      Emergencia: "",
      Cargo: "",
      Tipo: "",
      Documentos: "",
      Areas: [],
      tipos: [{
        value: 'Practicante',
        text: 'Practicante'
      },
      {
        value: 'Contrato Plazo Fijo',
        text: 'Contrato Plazo Fijo'
      },
      {
        value: 'Contrato Plazo Indefinido',
        text: 'Contrato Plazo Indefinido'
      },
      {
        value: 'Contrato Honorario',
        text: 'Contrato Honorario'
      },
      ],
      cargos: [{
        value: 'Gerente',
        text: 'Gerente'
      },
      {
        value: 'Jefe(a) de Laboratorio',
        text: 'Jefe(a) de laboratorio'
      },
      {
        value: 'Supervisor(a)',
        text: 'Supervisor(a)'
      },
      {
        value: 'Administrador(a) de Finanzas',
        text: 'Administrador(a) de Finanzas'
      },
      {
        value: 'Analista Químico',
        text: 'Analista Químico'
      },
      {
        value: 'Químico',
        text: 'Químico'
      },
      ],
    }
  },
  mounted() {
    this.obtenerInfoPerfil();
  },
  methods: {
    obtenerInfoPerfil() {
      var userInfo = getUserInfo();
      console.log(userInfo)
      // personal
      if (userInfo.rut != null) {
        this.EsEmpleado = true;
        personalService.obtenerDetallesPersonal(userInfo.rut).then((response) => {
          if (response.status == 200 && response.data != null) {
            console.log(response.data);

            this.Nombre = response.data.nombre;
            this.Rut = response.data.rut_empleado;
            this.Correo = response.data.correo;
            this.Apellidos = response.data.apellido;
            this.Movil = response.data.telefono_movil;
            this.Emergencia = response.data.telefono_emergencia;
            this.Cargo = response.data.rol;
            this.Tipo = response.data.tipo_trabajador;


            this.Documentos = response.data.documentos;
            const areasData = response.data.areas;
            for (var i = 0; i < areasData.length; i++) {
              const existeArea = this.Areas.find(area => area.id_area == areasData[i].id_area);
              if (existeArea == null) {
                this.Areas.push({
                  id_area: areasData[i].id_area,
                  nombre_area: areasData[i].nombre_area,
                  tipos_analisis: [{
                    tipo_analisis: areasData[i].tipo_analisis
                  }]
                })
              } else {
                existeArea.tipos_analisis.push({
                  tipo_analisis: areasData[i].tipo_analisis
                })
              }
            }
            this.CargandoArchivos = false;



          }
        })
      } else if (userInfo.rut_solicitante != null) {
        solicitanteService.obtenerDetallesSolicitante(userInfo.rut_solicitante).then((response) => {
          if (response.status == 200 && response.data != null) {
            console.log(response.data);
          }
        })
      }
    }
  }
}
</script>
