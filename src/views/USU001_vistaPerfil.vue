<template>
<div class="pb-2 d-flex justify-content-center">
    <b-col class="col-8">
<div style="height:50px"></div>
        <b-card header="Detalles" class="text-center">
          <template v-if="Rol == 0">
            <b-row class="pb-2 d-flex justify-content-center">
          <b-col class="col-6">
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Nombre: </b-col>
              <b-col class="col-7">{{ Nombre }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Apellidos: </b-col>
              <b-col class="col-7">{{ Apellidos }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Correo: </b-col>
              <b-col class="col-7">{{ Correo }}</b-col>
            </b-row>
          </b-col>

         
        </b-row>
          </template>
         
          <template v-else-if="Rol == 5">
            <b-row class="pb-2 d-flex justify-content-center">
          <b-col class="col-6">
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Nombre: </b-col>
              <b-col class="col-7">{{ Nombre }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Apellidos: </b-col>
              <b-col class="col-7">{{ Apellidos }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Rut: </b-col>
              <b-col class="col-7">{{ Rut }}</b-col>
            </b-row>
          </b-col>
          <b-col class="col-6">
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Teléfono móvil: </b-col>
              <b-col class="col-7">{{ Movil }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Correo: </b-col>
              <b-col class="col-7">{{ Correo }}</b-col>
            </b-row>
          </b-col>
         
        </b-row>
          </template>
          <template v-else>
            <b-row class="pb-2 d-flex justify-content-center">
          <b-col class="col-6">
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Nombre: </b-col>
              <b-col class="col-7">{{ Nombre }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Apellidos: </b-col>
              <b-col class="col-7">{{ Apellidos }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Rut: </b-col>
              <b-col class="col-7">{{ Rut }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Correo: </b-col>
              <b-col class="col-7">{{ Correo }}</b-col>
            </b-row>
          </b-col>
          <b-col class="col-6">
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Rol: </b-col>
              <b-col class="col-7">{{ Rol_descripcion }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Teléfono móvil: </b-col>
              <b-col class="col-7">{{ Movil }}</b-col>
            </b-row>
            <b-row style="border-bottom: 1px solid var(--lsa-light-gray); padding:3px">
              <b-col class="col-5" style="font-weight:bold;"> Teléfono de emergencia: </b-col>
              <b-col class="col-7">  <template v-if="this.Emergencia == null">
                        Teléfono sin asignar.</template>
                        <template v-else>
                            {{ this.Emergencia }}</template></b-col>
            </b-row>
          </b-col>
         
        </b-row>
          </template>
        </b-card>
    </b-col>

</div>
</template>

<script>
// @ is an alias to /src

import userService from "@/helpers/api-services/Auth.service"

export default {
    data() {
        return {
            Rol: "",
            Rol_descripcion: "",
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

            userService.obtenerDetallesUsuario().then((response) => {
                if (response.status == 200 && response.data != null) {
                    console.log(response.data);
                    this.Rol = response.data.role;

                    if(this.Rol == 0){
                      this.Nombre = response.data.nombre;
                      this.Apellidos = response.data.apellido;
                      this.Correo = response.data.email;

                    }else if (response.data.rol != null){
                      this.Rol = 1;
                      this.Nombre = response.data.nombre;
                      this.Apellidos = response.data.apellido;
                      this.Correo = response.data.correo;
                      this.Rol_descripcion = response.data.rol;
                      this.Movil = response.data.telefono_movil;
                      this.Rut = response.data.rut_empleado;
                      this.Emergencia = response.data.Emergencia;

                    }else{
                      console.log("solicitante")
                      this.Rol = 5;
                      this.Nombre = response.data.nombre;
                      this.Apellidos = response.data.primer_apellido + " " + response.data.segundo_apellido;
                      this.Correo = response.data.correo;
                      this.Movil = response.data.telefono;
                      this.Rut = response.data.rut_solicitante;
                    }
                    this.CargandoArchivos = false;

                }
            })
        }

    }
}
</script>
